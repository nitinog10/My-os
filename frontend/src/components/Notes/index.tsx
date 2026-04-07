import { useState } from 'react';
import { marked } from 'marked';
import { FileText } from 'lucide-react';

interface NotesProps {
  windowId: string;
}

export default function Notes({ windowId }: NotesProps) {
  const [content, setContent] = useState('# Welcome to Notes\n\nStart writing in Markdown...');

  const renderMarkdown = (text: string): string => {
    return marked(text) as string;
  };

  return (
    <div className="h-full w-full flex bg-gray-900">
      {/* Editor */}
      <div className="flex-1 flex flex-col border-r border-gray-700">
        <div className="h-10 bg-gray-800 flex items-center px-4 gap-2 border-b border-gray-700">
          <FileText size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">Editor</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-gray-900 text-gray-200 p-4 font-mono text-sm resize-none outline-none"
          placeholder="Write your notes in Markdown..."
        />
      </div>

      {/* Preview */}
      <div className="flex-1 flex flex-col">
        <div className="h-10 bg-gray-800 flex items-center px-4 gap-2 border-b border-gray-700">
          <FileText size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">Preview</span>
        </div>
        <div
          className="flex-1 bg-gray-900 text-gray-200 p-4 overflow-y-auto prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      </div>
    </div>
  );
}
