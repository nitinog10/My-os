import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import { FSNode } from '../../types';

interface TreeNodeProps {
  node: FSNode;
  level: number;
  expandedPaths: Set<string>;
  onToggleExpand: (path: string) => void;
  onFileDoubleClick: (path: string, content: string) => void;
}

export default function TreeNode({
  node,
  level,
  expandedPaths,
  onToggleExpand,
  onFileDoubleClick,
}: TreeNodeProps) {
  const isExpanded = expandedPaths.has(node.path);
  const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

  const handleClick = () => {
    if (node.type === 'folder') {
      onToggleExpand(node.path);
    }
  };

  const handleDoubleClick = () => {
    if (node.type === 'file') {
      onFileDoubleClick(node.path, node.content || '');
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 py-1 px-2 hover:bg-gray-800 rounded cursor-pointer"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {node.type === 'folder' && (
          <span className="text-gray-400">
            {hasChildren && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
            {!hasChildren && <span className="w-4" />}
          </span>
        )}
        {node.type === 'folder' ? (
          <Folder size={16} className="text-blue-400" />
        ) : (
          <File size={16} className="text-gray-400" />
        )}
        <span className="text-sm">{node.name}</span>
      </div>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              level={level + 1}
              expandedPaths={expandedPaths}
              onToggleExpand={onToggleExpand}
              onFileDoubleClick={onFileDoubleClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
