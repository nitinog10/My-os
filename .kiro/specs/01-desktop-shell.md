# Spec: Desktop Shell

## Feature
The main OS environment — desktop canvas, window system, taskbar, app launcher.

## Requirements
- [ ] Desktop fills full viewport, no scroll
- [ ] Wallpaper layer (configurable image or gradient)
- [ ] Desktop icons (double-click opens app)
- [ ] Draggable + resizable windows via react-rnd
- [ ] Window z-index management (click to focus = bring to front)
- [ ] Window states: normal, minimized, maximized, closed
- [ ] Window open/close animations via Framer Motion
- [ ] Taskbar fixed to bottom: running apps + clock + system tray
- [ ] App Launcher (Start menu): icon grid + search, opens on button click
- [ ] Launcher slide-up animation
- [ ] Theme: dark glassmorphism (backdrop-blur, semi-transparent panels)
- [ ] Zustand slices: windowStore, themeStore

## Tasks
1. Scaffold Vite + React + TS + Tailwind + Framer Motion + Zustand + react-rnd
2. Create Desktop.tsx (root canvas)
3. Create WindowFrame.tsx (react-rnd wrapper + controls)
4. Create WindowManager.tsx (renders all open windows from store)
5. Create windowStore.ts (openWindow, closeWindow, minimizeWindow, focusWindow)
6. Create Taskbar.tsx + TaskbarClock.tsx
7. Create AppLauncher.tsx with appRegistry integration
8. Create appRegistry.ts (id, name, icon, component mapping)
9. Wire double-click on desktop icons → openWindow action
10. Apply glassmorphism theme via Tailwind config

## Acceptance Criteria
- Can open 3+ windows simultaneously
- Windows stack correctly by focus
- Taskbar reflects running apps in real time
- Launcher opens/closes with animation
- Dark mode applied globally
