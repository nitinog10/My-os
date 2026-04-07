import { appRegistry } from '../utils/appRegistry';
import { useWindowStore } from '../stores/windowStore';

export default function AppLauncher() {
  const { openWindow } = useWindowStore();

  return (
    <div className="absolute bottom-16 left-4 flex flex-col gap-3">
      {appRegistry.map((app) => (
        <button
          key={app.id}
          onClick={() => openWindow(app.id, app.name)}
          className="w-16 h-16 bg-gray-800/80 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-gray-700/80 transition-all hover:scale-110 shadow-lg"
          title={app.name}
        >
          <span className="text-3xl">{app.icon}</span>
        </button>
      ))}
    </div>
  );
}
