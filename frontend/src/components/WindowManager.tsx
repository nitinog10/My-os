import { useWindowStore } from '../stores/windowStore';
import WindowFrame from './WindowFrame';
import { appRegistry } from '../utils/appRegistry';

export default function WindowManager() {
  const { windows } = useWindowStore();

  return (
    <>
      {windows.map((window) => {
        const app = appRegistry.find((a) => a.id === window.appId);
        if (!app) return null;

        return (
          <WindowFrame key={window.id} window={window} app={app} />
        );
      })}
    </>
  );
}
