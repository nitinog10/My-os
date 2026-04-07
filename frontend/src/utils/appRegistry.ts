import { AppDefinition } from '../types';
import Terminal from '../components/Terminal';
import CodeEditor from '../components/CodeEditor';
import FileExplorer from '../components/FileExplorer';
import Notes from '../components/Notes';

export const appRegistry: AppDefinition[] = [
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '💻',
    component: Terminal,
    defaultWidth: 800,
    defaultHeight: 500,
    minWidth: 400,
    minHeight: 300,
  },
  {
    id: 'editor',
    name: 'Code Editor',
    icon: '📝',
    component: CodeEditor,
    defaultWidth: 900,
    defaultHeight: 600,
    minWidth: 500,
    minHeight: 400,
  },
  {
    id: 'files',
    name: 'Files',
    icon: '📁',
    component: FileExplorer,
    defaultWidth: 600,
    defaultHeight: 500,
    minWidth: 300,
    minHeight: 400,
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: '📋',
    component: Notes,
    defaultWidth: 900,
    defaultHeight: 600,
    minWidth: 600,
    minHeight: 400,
  },
];
