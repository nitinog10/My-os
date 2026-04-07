# WebOS File Index

Complete index of all project files with descriptions.

## 📁 Root Directory

| File | Description |
|------|-------------|
| `README.md` | Project overview, features, tech stack |
| `QUICKSTART.md` | 5-minute quick start guide |
| `SETUP.md` | Detailed setup instructions |
| `ARCHITECTURE.md` | System architecture and data flow |
| `FEATURES.md` | Complete feature checklist |
| `DEVELOPER_GUIDE.md` | Development guidelines and patterns |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CHANGELOG.md` | Version history and changes |
| `PROJECT_STATUS.md` | Current project status tracking |
| `SUMMARY.md` | Complete implementation summary |
| `FILE_INDEX.md` | This file - complete file index |
| `LICENSE` | MIT License |
| `package.json` | Root package.json with scripts |
| `.gitignore` | Git ignore patterns |

## 📁 Frontend (`frontend/`)

### Configuration Files
| File | Description |
|------|-------------|
| `package.json` | Frontend dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration |
| `vercel.json` | Vercel deployment configuration |
| `.env.example` | Environment variables template |
| `.gitignore` | Frontend-specific ignore patterns |
| `index.html` | HTML entry point |

### Source Files (`frontend/src/`)

#### Main Files
| File | Description |
|------|-------------|
| `main.tsx` | Application entry point |
| `App.tsx` | Root component with auth routing |
| `style.css` | Global styles with Tailwind |

#### Components (`frontend/src/components/`)
| File | Description |
|------|-------------|
| `Desktop.tsx` | Main desktop environment |
| `WindowManager.tsx` | Manages all open windows |
| `WindowFrame.tsx` | Individual window wrapper with controls |
| `Taskbar.tsx` | Bottom taskbar with open windows |
| `AppLauncher.tsx` | App icon launcher |
| `LoginScreen.tsx` | Login/signup screen |

#### Terminal App (`frontend/src/components/Terminal/`)
| File | Description |
|------|-------------|
| `index.tsx` | Terminal component with command execution |

#### Code Editor App (`frontend/src/components/CodeEditor/`)
| File | Description |
|------|-------------|
| `index.tsx` | Monaco editor with multi-tab support |

#### File Explorer App (`frontend/src/components/FileExplorer/`)
| File | Description |
|------|-------------|
| `index.tsx` | Main file explorer component |
| `TreeNode.tsx` | Recursive tree node component |

#### Notes App (`frontend/src/components/Notes/`)
| File | Description |
|------|-------------|
| `index.tsx` | Markdown editor with live preview |

#### Stores (`frontend/src/stores/`)
| File | Description |
|------|-------------|
| `windowStore.ts` | Window lifecycle and management |
| `fileSystemStore.ts` | File system state and operations |
| `authStore.ts` | Authentication state |
| `editorStore.ts` | Code editor tabs and state |
| `themeStore.ts` | Theme and appearance settings |

#### Types (`frontend/src/types/`)
| File | Description |
|------|-------------|
| `index.ts` | All TypeScript type definitions |

#### Utils (`frontend/src/utils/`)
| File | Description |
|------|-------------|
| `appRegistry.ts` | App definitions and registry |
| `commandExecutor.ts` | Terminal command execution logic |

## 📁 Backend (`backend/`)

### Configuration Files
| File | Description |
|------|-------------|
| `package.json` | Backend dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `.env.example` | Environment variables template |
| `Procfile` | Deployment process file |

### Source Files (`backend/src/`)

#### Main Files
| File | Description |
|------|-------------|
| `server.ts` | Express server setup and routes |

#### Routes (`backend/src/routes/`)
| File | Description |
|------|-------------|
| `auth.ts` | Authentication routes (login, signup, me) |
| `files.ts` | File system CRUD routes |
| `ai.ts` | AI chat proxy route with SSE |

#### Services (`backend/src/services/`)
| File | Description |
|------|-------------|
| `dynamoService.ts` | DynamoDB operations and queries |

#### Middleware (`backend/src/middleware/`)
| File | Description |
|------|-------------|
| `authMiddleware.ts` | JWT verification middleware |

#### Types (`backend/src/types/`)
| File | Description |
|------|-------------|
| `index.ts` | Backend TypeScript type definitions |

## 📁 AI Service (`ai-service/`)

| File | Description |
|------|-------------|
| `main.py` | FastAPI server with Claude integration |
| `requirements.txt` | Python dependencies |
| `.env.example` | Environment variables template |
| `Procfile` | Deployment process file |

## 📁 Configuration (`/.kiro/`)

### Specs (`/.kiro/specs/`)
| File | Description |
|------|-------------|
| `01-desktop-shell.md` | Desktop shell specification |
| `02-virtual-filesystem.md` | File system specification |
| `03-terminal-app.md` | Terminal app specification |
| `04-code-editor-app.md` | Code editor specification |
| `05-file-explorer-app.md` | File explorer specification |
| `06-notes-app.md` | Notes app specification |
| `07-browser-app.md` | Browser app specification |
| `08-auth-cognito.md` | Authentication specification |
| `09-dynamo-persistence.md` | Database specification |
| `10-ai-assistant.md` | AI assistant specification |
| `11-advanced-features.md` | Advanced features specification |

### Steering (`/.kiro/steering/`)
| File | Description |
|------|-------------|
| `architecture.md` | Architecture rules and patterns |
| `dynamo-schema.md` | DynamoDB schema design |
| `product.md` | Product overview and goals |
| `tech-stack.md` | Technology stack details |

## 📊 File Statistics

### By Type
| Type | Count | Purpose |
|------|-------|---------|
| Documentation | 14 | Project documentation |
| TypeScript | 25+ | Frontend/backend code |
| Python | 1 | AI service |
| Config | 15+ | Build and deployment |
| Markdown | 25+ | Docs and specs |

### By Directory
| Directory | Files | Lines of Code |
|-----------|-------|---------------|
| `frontend/src/` | 25+ | ~2,500 |
| `backend/src/` | 10+ | ~800 |
| `ai-service/` | 2 | ~100 |
| Documentation | 14 | ~3,000 |
| **Total** | **51+** | **~6,400** |

## 🎯 Key Files for Different Tasks

### Getting Started
1. `README.md` - Project overview
2. `QUICKSTART.md` - Quick setup
3. `SETUP.md` - Detailed setup

### Development
1. `DEVELOPER_GUIDE.md` - Development patterns
2. `ARCHITECTURE.md` - System design
3. `frontend/src/utils/appRegistry.ts` - Add new apps

### Contributing
1. `CONTRIBUTING.md` - Contribution guidelines
2. `FEATURES.md` - Feature status
3. `PROJECT_STATUS.md` - Current progress

### Deployment
1. `frontend/vercel.json` - Frontend deployment
2. `backend/Procfile` - Backend deployment
3. `ai-service/Procfile` - AI service deployment

### Configuration
1. `frontend/.env.example` - Frontend env vars
2. `backend/.env.example` - Backend env vars
3. `ai-service/.env.example` - AI service env vars

## 🔍 Finding Specific Code

### Adding a New App
- Register in: `frontend/src/utils/appRegistry.ts`
- Create component in: `frontend/src/components/YourApp/`

### Adding a Backend Route
- Create route in: `backend/src/routes/yourRoute.ts`
- Register in: `backend/src/server.ts`

### Adding a Terminal Command
- Edit: `frontend/src/utils/commandExecutor.ts`

### Modifying State
- Edit stores in: `frontend/src/stores/`

### Changing UI Styles
- Global styles: `frontend/src/style.css`
- Tailwind config: `frontend/tailwind.config.js`

### Database Operations
- Edit: `backend/src/services/dynamoService.ts`

### AI Integration
- Frontend: `frontend/src/stores/` (future aiStore)
- Backend: `backend/src/routes/ai.ts`
- Service: `ai-service/main.py`

## 📚 Documentation Hierarchy

```
README.md (Start here)
├── QUICKSTART.md (Quick setup)
├── SETUP.md (Detailed setup)
├── ARCHITECTURE.md (System design)
├── FEATURES.md (Feature list)
├── DEVELOPER_GUIDE.md (Development)
├── CONTRIBUTING.md (Contributing)
├── PROJECT_STATUS.md (Status)
├── CHANGELOG.md (History)
├── SUMMARY.md (Overview)
└── FILE_INDEX.md (This file)
```

## 🎓 Learning Path

### Beginner
1. Read `README.md`
2. Follow `QUICKSTART.md`
3. Explore the UI
4. Read `FEATURES.md`

### Intermediate
1. Read `ARCHITECTURE.md`
2. Study `DEVELOPER_GUIDE.md`
3. Explore source code
4. Try adding a feature

### Advanced
1. Read all specs in `.kiro/specs/`
2. Study state management patterns
3. Understand AWS integration
4. Contribute new features

## 🔗 Related Files

### Authentication Flow
- `frontend/src/components/LoginScreen.tsx`
- `frontend/src/stores/authStore.ts`
- `backend/src/routes/auth.ts`
- `backend/src/middleware/authMiddleware.ts`

### File System
- `frontend/src/stores/fileSystemStore.ts`
- `frontend/src/components/FileExplorer/`
- `backend/src/routes/files.ts`
- `backend/src/services/dynamoService.ts`

### Window Management
- `frontend/src/stores/windowStore.ts`
- `frontend/src/components/WindowManager.tsx`
- `frontend/src/components/WindowFrame.tsx`

### Apps
- `frontend/src/utils/appRegistry.ts` (registry)
- `frontend/src/components/Terminal/` (terminal)
- `frontend/src/components/CodeEditor/` (editor)
- `frontend/src/components/FileExplorer/` (files)
- `frontend/src/components/Notes/` (notes)

## 📝 Notes

- All TypeScript files use strict mode
- All components use functional React with hooks
- All styling uses Tailwind CSS
- All state management uses Zustand
- All API calls go through backend (no direct AWS)

## 🔄 Last Updated

**Date**: April 7, 2026
**Version**: 1.0.0
**Total Files**: 51+
**Total Lines**: ~6,400

---

For more information, see the main `README.md` or `SUMMARY.md`.
