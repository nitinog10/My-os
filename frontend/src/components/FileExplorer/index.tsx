import { useState } from 'react';
import { useFileSystemStore } from '../../stores/fileSystemStore';
import { useEditorStore } from '../../stores/editorStore';
import { useWindowStore } from '../../stores/windowStore';
import TreeNode from './TreeNode';
import { Folder } from 'lucide-react';

interface FileExplorerProps {
  windowId: string;
}

export default function FileExplorer({ windowId }: FileExplorerProps) {
  const { root } = useFileSystemStore();
  const { openFile } = useEditorStore();
  const { openWindow } = useWindowStore();
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['/home']));

  const handleFileDoubleClick = (path: string, content: string) => {
    // Open in code editor
    openFile(path, content);
    // Open code editor window if not already open
    openWindow('editor', 'Code Editor');
  };

  const toggleExpand = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  if (!root) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400">
        Loading file system...
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-900 text-gray-200 overflow-y-auto p-4">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <Folder size={20} />
        <span>File Explorer</span>
      </div>
      
      <TreeNode
        node={root}
        level={0}
        expandedPaths={expandedPaths}
        onToggleExpand={toggleExpand}
        onFileDoubleClick={handleFileDoubleClick}
      />
    </div>
  );
}
