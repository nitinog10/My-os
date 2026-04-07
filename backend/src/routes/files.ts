import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.js';
import { getUserFileSystem, saveFileNode, deleteFileNode } from '../services/dynamoService.js';
import { FSNode } from '../types/index.js';

const router = Router();

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const fileSystem = await getUserFileSystem(req.userId!);
    res.json(fileSystem);
  } catch (error) {
    console.error('Error loading file system:', error);
    res.status(500).json({ error: 'Failed to load file system' });
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { path, type, content } = req.body;
    
    const node: FSNode = {
      name: path.split('/').pop() || '',
      type,
      path,
      content: type === 'file' ? content : undefined,
      size: type === 'file' ? (content?.length || 0) : undefined,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      children: type === 'folder' ? [] : undefined,
    };

    await saveFileNode(req.userId!, node);
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating node:', error);
    res.status(500).json({ error: 'Failed to create node' });
  }
});

router.delete('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { path } = req.query;
    await deleteFileNode(req.userId!, path as string);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting node:', error);
    res.status(500).json({ error: 'Failed to delete node' });
  }
});

router.patch('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { path, content } = req.body;
    
    // Get existing node and update it
    const fileSystem = await getUserFileSystem(req.userId!);
    // In production, implement proper node lookup and update
    
    const node: FSNode = {
      name: path.split('/').pop() || '',
      type: 'file',
      path,
      content,
      size: content?.length || 0,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    };

    await saveFileNode(req.userId!, node);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).json({ error: 'Failed to update file' });
  }
});

export default router;
