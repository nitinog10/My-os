import { create } from 'zustand';
import { EditorTab } from '../types';

interface EditorStore {
  tabs: EditorTab[];
  activeTabId: string | null;
  openFile: (path: string, content: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTabContent: (id: string, content: string) => void;
  markTabClean: (id: string) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  tabs: [],
  activeTabId: null,

  openFile: (path, content) => {
    set((state) => {
      const existing = state.tabs.find((t) => t.path === path);
      if (existing) {
        return { activeTabId: existing.id };
      }
      const newTab: EditorTab = {
        id: `tab-${Date.now()}`,
        path,
        content,
        isDirty: false,
      };
      return { tabs: [...state.tabs, newTab], activeTabId: newTab.id };
    });
  },

  closeTab: (id) => {
    set((state) => {
      const newTabs = state.tabs.filter((t) => t.id !== id);
      const newActiveId =
        state.activeTabId === id
          ? newTabs.length > 0
            ? newTabs[newTabs.length - 1].id
            : null
          : state.activeTabId;
      return { tabs: newTabs, activeTabId: newActiveId };
    });
  },

  setActiveTab: (id) => set({ activeTabId: id }),

  updateTabContent: (id, content) => {
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, content, isDirty: true } : t)),
    }));
  },

  markTabClean: (id) => {
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === id ? { ...t, isDirty: false } : t)),
    }));
  },
}));
