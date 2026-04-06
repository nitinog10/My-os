# Spec: Browser App

## Feature
Embedded iframe browser with URL bar and navigation controls.

## Requirements
- [ ] URL input bar
- [ ] Back/Forward buttons (disabled for v1, just UI)
- [ ] Refresh button
- [ ] iframe renders external URLs
- [ ] CORS limitations acknowledged (some sites won't load)
- [ ] Default homepage: about:blank or custom WebOS welcome page
- [ ] Address bar updates on navigation (if possible)

## Tasks
1. Create Browser/index.tsx
2. Create Browser/AddressBar.tsx
3. Create Browser/NavigationControls.tsx
4. Wire URL input → load in iframe
5. Handle iframe load errors gracefully
6. Style: browser chrome with glassmorphism

## Acceptance Criteria
- Can load public URLs (e.g., example.com)
- Address bar accepts input
- Refresh reloads iframe
- Error message shown for blocked URLs
