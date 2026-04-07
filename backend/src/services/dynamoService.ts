import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { FSNode } from '../types/index.js';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE || 'webos-main';

export async function getUserFileSystem(userId: string): Promise<FSNode | null> {
  try {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': `user#${userId}`,
          ':sk': 'FS#',
        },
      })
    );

    if (!result.Items || result.Items.length === 0) {
      // Return default file system
      return createDefaultFileSystem();
    }

    // Reconstruct file tree from flat items
    return reconstructFileTree(result.Items);
  } catch (error) {
    console.error('Error loading file system:', error);
    return null;
  }
}

export async function saveFileNode(userId: string, node: FSNode): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `user#${userId}`,
        SK: `FS#${node.path}`,
        type: node.type,
        name: node.name,
        path: node.path,
        content: node.content,
        size: node.size,
        createdAt: node.createdAt,
        modifiedAt: node.modifiedAt,
      },
    })
  );
}

export async function deleteFileNode(userId: string, path: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `user#${userId}`,
        SK: `FS#${path}`,
      },
    })
  );
}

function createDefaultFileSystem(): FSNode {
  return {
    name: 'home',
    type: 'folder',
    path: '/home',
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    children: [
      {
        name: 'documents',
        type: 'folder',
        path: '/home/documents',
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        children: [
          {
            name: 'welcome.txt',
            type: 'file',
            path: '/home/documents/welcome.txt',
            content: 'Welcome to WebOS!\n\nThis is your personal operating system in the browser.',
            size: 75,
            createdAt: Date.now(),
            modifiedAt: Date.now(),
          },
        ],
      },
      {
        name: 'projects',
        type: 'folder',
        path: '/home/projects',
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        children: [],
      },
    ],
  };
}

function reconstructFileTree(items: any[]): FSNode {
  const nodeMap = new Map<string, FSNode>();

  // Create all nodes
  items.forEach((item) => {
    nodeMap.set(item.path, {
      name: item.name,
      type: item.type,
      path: item.path,
      content: item.content,
      size: item.size,
      createdAt: item.createdAt,
      modifiedAt: item.modifiedAt,
      children: item.type === 'folder' ? [] : undefined,
    });
  });

  // Build tree structure
  let root: FSNode | null = null;
  nodeMap.forEach((node) => {
    if (node.path === '/home') {
      root = node;
    } else {
      const parentPath = node.path.substring(0, node.path.lastIndexOf('/')) || '/home';
      const parent = nodeMap.get(parentPath);
      if (parent && parent.children) {
        parent.children.push(node);
      }
    }
  });

  return root || createDefaultFileSystem();
}
