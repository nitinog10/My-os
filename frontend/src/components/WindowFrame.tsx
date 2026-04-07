import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowStore } from '../stores/windowStore';
import { WindowState, AppDefinition } from '../types';

interface WindowFrameProps {
  window: WindowState;
  app: AppDefinition;
}

export default function WindowFrame({ window, app }: WindowFrameProps) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize } =
    useWindowStore();

  if (window.isMinimized) return null;

  const Component = app.component;

  return (
    <Rnd
      position={{ x: window.x, y: window.y }}
      size={{
        width: window.isMaximized ? '100vw' : window.width,
        height: window.isMaximized ? 'calc(100vh - 48px)' : window.height,
      }}
      onDragStop={(e, d) => updateWindowPosition(window.id, d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(window.id, parseInt(ref.style.width), parseInt(ref.style.height));
        updateWindowPosition(window.id, position.x, position.y);
      }}
      minWidth={app.minWidth || 400}
      minHeight={app.minHeight || 300}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: window.zIndex }}
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`h-full w-full flex flex-col rounded-lg overflow-hidden shadow-2xl ${
          window.isFocused ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => focusWindow(window.id)}
      >
        {/* Title Bar */}
        <div className="window-drag-handle h-10 bg-gray-800/90 backdrop-blur-md flex items-center justify-between px-4 cursor-move">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{window.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(window.id);
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <Minus size={16} className="text-gray-300" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(window.id);
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              {window.isMaximized ? (
                <Minimize2 size={16} className="text-gray-300" />
              ) : (
                <Maximize2 size={16} className="text-gray-300" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              className="p-1 hover:bg-red-600 rounded transition-colors"
            >
              <X size={16} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-900/95 backdrop-blur-md overflow-hidden">
          <Component windowId={window.id} />
        </div>
      </motion.div>
    </Rnd>
  );
}
