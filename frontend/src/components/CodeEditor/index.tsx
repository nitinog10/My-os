import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '../../stores/editorStore';
import { useFileSystemStore } from '../../stores/fileSystemStore';
import { X } from 'lucide-react';

interface CodeEditorProps {
  windowId: string;
}

export default function CodeEditor({ windowId }: CodeEditorProps) {
  const { tabs, activeTabId, closeTab, setActiveTab, updateTabContent, markTabClean } = useEditorStore();
  const { updateFile } = useFileSystemStore();
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const activeTab = tabs.find((t) => t.id === activeTabId);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (!activeTab || value === undefined) return;
    
    updateTabContent(activeTab.id, value);

    // Auto-save after 2 seconds of inactivity
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(async () => {
      await updateFile(activeTab.path, value);
      markTabClean(activeTab.id);
    }, 2000);
  };

  const getLanguage = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      jsx: 'javascript',
      tsx: 'typescript',
      py: 'python',
      json: 'json',
      md: 'markdown',
      txt: 'plaintext',
      html: 'html',
      css: 'css',
    };
    return langMap[ext || ''] || 'plaintext';
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-900">
      {/* Tab Bar */}
      <div className="h-10 bg-gray-800 flex items-center gap-1 px-2 overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-t cursor-pointer transition-colors ${
              tab.id === activeTabId
                ? 'bg-gray-900 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="text-sm">
              {tab.path.split('/').pop()}
              {tab.isDirty && '*'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="hover:bg-gray-600 rounded p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1">
        {activeTab ? (
          <Editor
            height="100%"
            language={getLanguage(activeTab.path)}
            value={activeTab.content}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No file open
          </div>
        )}
      </div>
    </div>
  );
}
