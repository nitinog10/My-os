import { Clock, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useWindowStore } from '../stores/windowStore';
import { useState, useEffect } from 'react';

export default function Taskbar() {
  const { user, logout } = useAuthStore();
  const { windows, focusWindow } = useWindowStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-12 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 flex items-center justify-between px-4">
      {/* Left: Open Windows */}
      <div className="flex items-center gap-2">
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => focusWindow(window.id)}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              window.isFocused
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* Right: System Tray */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <Clock size={16} />
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <span>{user?.name}</span>
          <button
            onClick={logout}
            className="p-1.5 hover:bg-gray-800 rounded transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
