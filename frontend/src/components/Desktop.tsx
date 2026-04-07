import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { useAuthStore } from '../stores/authStore';
import { useFileSystemStore } from '../stores/fileSystemStore';
import WindowManager from './WindowManager';
import Taskbar from './Taskbar';
import AppLauncher from './AppLauncher';

export default function Desktop() {
  const { wallpaper, mode } = useThemeStore();
  const { loadFileSystem } = useFileSystemStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      loadFileSystem();
    }
  }, [isAuthenticated, loadFileSystem]);

  return (
    <div
      className={`h-screen w-screen overflow-hidden ${mode === 'dark' ? 'dark' : ''}`}
      style={{ background: wallpaper }}
    >
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 relative">
          <WindowManager />
          <AppLauncher />
        </div>
        <Taskbar />
      </div>
    </div>
  );
}
