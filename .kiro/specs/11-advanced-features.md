# Spec: Advanced Features

## Feature
Polish and advanced functionality for production readiness.

## Requirements
- [ ] Settings app: theme picker, wallpaper upload, accent color
- [ ] Keyboard shortcuts (Ctrl+T = terminal, Ctrl+E = editor, etc.)
- [ ] Window snap zones (drag to edge = maximize/split)
- [ ] Notification system (toast messages)
- [ ] System tray icons (battery, wifi, volume - UI only)
- [ ] Desktop icon grid snap
- [ ] Multi-monitor support (stretch goal)
- [ ] Performance optimization (lazy load apps, virtualize file tree)
- [ ] Error boundaries for app crashes
- [ ] Loading states and skeletons

## Tasks
1. Create Settings/index.tsx
2. Implement keyboard shortcut system (useEffect + event listeners)
3. Create NotificationManager component + notificationStore
4. Add window snap detection to WindowFrame
5. Implement desktop icon grid snapping
6. Add React.lazy for app components
7. Add error boundaries around each app
8. Optimize file tree rendering (react-window)
9. Add loading spinners to async operations
10. Create SystemTray component with mock icons

## Acceptance Criteria
- Keyboard shortcuts work globally
- Notifications appear and auto-dismiss
- Window snapping feels smooth
- Settings persist across sessions
- No performance lag with 100+ files
