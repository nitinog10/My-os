import { create } from 'zustand';
import { FSNode } from '../types';
import axios from 'axios';

interface FileSystemStore {
  root: FSNode | null;
  isLoading: boolean;
  loadFileSystem: () => Promise<void>;
  createFile: (path: string, content?: string) => Promise<void>;
  createFolder: (path: string) => Promise<void>;
  deleteNode: (path: string) => Promise<void>;
  updateFile: (path: string, content: string) => Promise<void>;
  renameNode: (oldPath: string, newPath: string) => Promise<void>;
  getNode: (path: string) => FSNode | null;
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

export const useFileSystemStore = create<FileSystemStore>((set, get) => ({
  root: null,
  isLoading: false,

  loadFileSystem: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/files', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ root: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to load file system:', error);
      set({ isLoading: false });
    }
  },

  createFile: async (path, content = '') => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/files',
        { path, type: 'file', content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await get().loadFileSystem();
    } catch (error) {
      console.error('Failed to create file:', error);
    }
  },

  createFolder: async (path) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/files',
        { path, type: 'folder' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await get().loadFileSystem();
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  },

  deleteNode: async (path) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/files?path=${encodeURIComponent(path)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await get().loadFileSystem();
    } catch (error) {
      console.error('Failed to delete node:', error);
    }
  },

  updateFile: async (path, content) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        '/api/files',
        { path, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await get().loadFileSystem();
    } catch (error) {
      console.error('Failed to update file:', error);
    }
  },

  renameNode: async (oldPath, newPath) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        '/api/files/rename',
        { oldPath, newPath },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await get().loadFileSystem();
    } catch (error) {
      console.error('Failed to rename node:', error);
    }
  },

  getNode: (path) => {
    return findNode(get().root, path);
  },
}));
