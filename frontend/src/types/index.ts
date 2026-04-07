export interface FSNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  size?: number;
  children?: FSNode[];
  createdAt: number;
  modifiedAt: number;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  props?: Record<string, unknown>;
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<{ windowId: string }>;
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Theme {
  mode: 'dark' | 'light';
  wallpaper: string;
  accentColor: string;
}

export interface TerminalState {
  cwd: string;
  history: string[];
  historyIndex: number;
}

export interface EditorTab {
  id: string;
  path: string;
  content: string;
  isDirty: boolean;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
