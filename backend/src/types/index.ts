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

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthRequest extends Express.Request {
  userId?: string;
}
