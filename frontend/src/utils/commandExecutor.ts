import { FSNode } from '../types';

interface CommandResult {
  output: string;
  error?: boolean;
  newCwd?: string;
}

const findNode = (root: FSNode | null, path: string): FSNode | null => {
  if (!root) return null;
  if (root.path === path) return root;
  if (root.type === 'folder' && root.children) {
    for (const child of root.children) {
      const found = findNode(child, path);
      if (found) return found;
    }
  }
  return null;
};

const resolvePath = (cwd: string, path: string): string => {
  if (path.startsWith('/')) return path;
  if (path === '..') {
    const parts = cwd.split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/');
  }
  if (path === '.') return cwd;
  return cwd === '/' ? `/${path}` : `${cwd}/${path}`;
};

export async function executeCommand(
  cmd: string,
  cwd: string,
  root: FSNode | null
): Promise<CommandResult> {
  const parts = cmd.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  switch (command) {
    case 'help':
      return {
        output: `Available commands:
  ls [path]       - List directory contents
  cd <path>       - Change directory
  pwd             - Print working directory
  cat <file>      - Display file contents
  echo <text>     - Print text
  clear           - Clear terminal
  mkdir <name>    - Create directory (not implemented)
  touch <name>    - Create file (not implemented)
  rm <path>       - Remove file/folder (not implemented)
  ai <prompt>     - Ask AI assistant (not implemented)`,
      };

    case 'pwd':
      return { output: cwd };

    case 'clear':
      return { output: '' };

    case 'ls': {
      const targetPath = args[0] ? resolvePath(cwd, args[0]) : cwd;
      const node = findNode(root, targetPath);
      
      if (!node) {
        return { output: `ls: ${targetPath}: No such file or directory`, error: true };
      }
      
      if (node.type === 'file') {
        return { output: node.name };
      }
      
      if (!node.children || node.children.length === 0) {
        return { output: '' };
      }
      
      const items = node.children.map((child) => {
        const prefix = child.type === 'folder' ? '📁 ' : '📄 ';
        return `${prefix}${child.name}`;
      });
      
      return { output: items.join('\n') };
    }

    case 'cd': {
      if (!args[0]) {
        return { output: '', newCwd: '/home' };
      }
      
      const targetPath = resolvePath(cwd, args[0]);
      const node = findNode(root, targetPath);
      
      if (!node) {
        return { output: `cd: ${targetPath}: No such file or directory`, error: true };
      }
      
      if (node.type !== 'folder') {
        return { output: `cd: ${targetPath}: Not a directory`, error: true };
      }
      
      return { output: '', newCwd: targetPath };
    }

    case 'cat': {
      if (!args[0]) {
        return { output: 'cat: missing file operand', error: true };
      }
      
      const targetPath = resolvePath(cwd, args[0]);
      const node = findNode(root, targetPath);
      
      if (!node) {
        return { output: `cat: ${targetPath}: No such file or directory`, error: true };
      }
      
      if (node.type !== 'file') {
        return { output: `cat: ${targetPath}: Is a directory`, error: true };
      }
      
      return { output: node.content || '' };
    }

    case 'echo':
      return { output: args.join(' ') };

    case 'mkdir':
    case 'touch':
    case 'rm':
    case 'ai':
      return { output: `${command}: Not yet implemented`, error: true };

    default:
      return { output: `${command}: command not found`, error: true };
  }
}
