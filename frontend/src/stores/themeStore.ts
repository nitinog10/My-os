import { create } from 'zustand';
import { Theme } from '../types';

interface ThemeStore extends Theme {
  setMode: (mode: 'dark' | 'light') => void;
  setWallpaper: (wallpaper: string) => void;
  setAccentColor: (color: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'dark',
  wallpaper: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  accentColor: '#667eea',

  setMode: (mode) => set({ mode }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setAccentColor: (accentColor) => set({ accentColor }),
}));
