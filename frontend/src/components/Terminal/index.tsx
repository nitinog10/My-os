import { useState, useRef, useEffect } from 'react';
import { executeCommand } from '../../utils/commandExecutor';
import { useFileSystemStore } from '../../stores/fileSystemStore';

interface TerminalProps {
  windowId: string;
}

export default function Terminal({ windowId }: TerminalProps) {
  const [cwd, setCwd] = useState('/home');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<Array<{ type: 'command' | 'output' | 'error'; text: string }>>([
    { type: 'output', text: 'WebOS Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { root } = useFileSystemStore();

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    setOutput((prev) => [...prev, { type: 'command', text: `${cwd} $ ${cmd}` }]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');

    const result = await executeCommand(cmd, cwd, root);
    
    if (result.newCwd) {
      setCwd(result.newCwd);
    }

    if (result.output) {
      setOutput((prev) => [
        ...prev,
        { type: result.error ? 'error' : 'output', text: result.output },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="h-full w-full bg-gray-950 text-green-400 font-mono text-sm p-4 flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={outputRef} className="flex-1 overflow-y-auto mb-2 space-y-1">
        {output.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'command'
                ? 'text-blue-400'
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-green-400'
            }
          >
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-blue-400">{cwd} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </form>
    </div>
  );
}
