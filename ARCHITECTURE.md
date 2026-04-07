# WebOS Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React Frontend (Port 3000)                │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │   Desktop   │  │ WindowManager│  │   Taskbar   │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘  │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │  Terminal   │  │ Code Editor  │  │File Explorer│  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Zustand State Management                 │  │  │
│  │  │  • windowStore  • fileSystemStore  • authStore  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Express Backend (Port 4000)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Routes: /api/auth  /api/files  /api/ai              │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Middleware: JWT Verification (Cognito)               │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Services: DynamoDB, Cognito, AI Proxy               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
            │                                    │
            │ AWS SDK                            │ HTTP/SSE
            ▼                                    ▼
┌──────────────────────┐          ┌──────────────────────────┐
│    AWS Services      │          │  FastAPI AI Service      │
│  ┌────────────────┐  │          │      (Port 8000)         │
│  │ Cognito        │  │          │  ┌────────────────────┐  │
│  │ User Pool      │  │          │  │ Anthropic Claude   │  │
│  └────────────────┘  │          │  │ API Integration    │  │
│  ┌────────────────┐  │          │  └────────────────────┘  │
│  │ DynamoDB       │  │          │  ┌────────────────────┐  │
│  │ webos-main     │  │          │  │ SSE Streaming      │  │
│  │ (Single Table) │  │          │  └────────────────────┘  │
│  └────────────────┘  │          └──────────────────────────┘
└──────────────────────┘
```

## Data Flow

### 1. Authentication Flow
```
User → Frontend (Login) → Backend (/api/auth/login)
                              ↓
                         AWS Cognito
                              ↓
                         JWT Token
                              ↓
                         Frontend (Store)
```

### 2. File System Operations
```
User Action → Frontend (Zustand) → Backend (/api/files)
                                       ↓
                                  DynamoDB
                                  (PK: user#id, SK: FS#path)
                                       ↓
                                  Response
                                       ↓
                              Frontend (Update Store)
```

### 3. AI Chat Flow
```
Terminal Command → Frontend → Backend (/api/ai/chat)
                                  ↓
                            AI Service (/chat)
                                  ↓
                            Claude API
                                  ↓
                            SSE Stream
                                  ↓
                            Backend (Proxy)
                                  ↓
                            Frontend (Display)
```

## Component Architecture

### Frontend Components

```
App.tsx
├── LoginScreen.tsx (if not authenticated)
└── Desktop.tsx (if authenticated)
    ├── WindowManager.tsx
    │   └── WindowFrame.tsx (for each window)
    │       └── App Component (Terminal, Editor, etc.)
    ├── AppLauncher.tsx
    └── Taskbar.tsx
```

### Zustand Stores

1. **windowStore**: Window lifecycle, z-index, focus management
2. **fileSystemStore**: File tree, CRUD operations
3. **authStore**: User session, token management
4. **editorStore**: Open tabs, active file
5. **themeStore**: Dark/light mode, wallpaper, accent color

### Backend Routes

1. **POST /api/auth/login**: Authenticate user with Cognito
2. **POST /api/auth/signup**: Create new user
3. **GET /api/auth/me**: Get current user info
4. **GET /api/files**: Load user's file system
5. **POST /api/files**: Create file/folder
6. **PATCH /api/files**: Update file content
7. **DELETE /api/files**: Delete file/folder
8. **POST /api/ai/chat**: Proxy to AI service with SSE

## Database Schema (DynamoDB)

### Single Table Design

| PK         | SK                              | Attributes                    |
|------------|---------------------------------|-------------------------------|
| user#123   | PROFILE                         | name, email, avatar           |
| user#123   | SETTINGS                        | theme, wallpaper, accent      |
| user#123   | FS#/home                        | type, name, createdAt         |
| user#123   | FS#/home/documents              | type, name, createdAt         |
| user#123   | FS#/home/documents/file.txt     | type, name, content, size     |

### Access Patterns

1. Get user profile: `PK = user#123 AND SK = PROFILE`
2. Get all files: `PK = user#123 AND begins_with(SK, 'FS#')`
3. Get specific file: `PK = user#123 AND SK = FS#/path/to/file`

## Security

### Authentication
- JWT tokens from AWS Cognito
- Token verification on every backend request
- No direct AWS calls from frontend

### Authorization
- User ID extracted from JWT
- All data queries scoped to user ID
- DynamoDB partition key includes user ID

### Data Isolation
- Each user has separate partition in DynamoDB
- File system paths include user ID
- No cross-user data access

## Performance Optimizations

### Frontend
- Code splitting by route
- Lazy loading of Monaco Editor
- Debounced auto-save (2s)
- Virtual scrolling for large file lists

### Backend
- Connection pooling for DynamoDB
- JWT verification caching
- Streaming responses for AI

### Database
- On-demand billing (scales automatically)
- Single table design (fewer queries)
- Efficient key structure for queries

## Scalability

### Horizontal Scaling
- Frontend: Static files on CDN (Vercel)
- Backend: Stateless, can run multiple instances
- AI Service: Stateless, can run multiple instances

### Vertical Scaling
- DynamoDB: On-demand, auto-scales
- Cognito: Managed service, auto-scales

## Monitoring & Logging

### Frontend
- Console errors logged
- User actions tracked
- Performance metrics

### Backend
- Request/response logging
- Error tracking
- AWS CloudWatch integration

### AI Service
- Request logging
- Token usage tracking
- Error monitoring

## Future Enhancements

1. **Real-time Collaboration**: WebSocket for multi-user editing
2. **File Sharing**: Share files between users
3. **Plugins**: Extensible app system
4. **Mobile Support**: Responsive design for tablets
5. **Offline Mode**: Service worker for offline access
6. **Search**: Full-text search across files
7. **Notifications**: System notification API
8. **Keyboard Shortcuts**: Global hotkeys
9. **Themes**: Customizable color schemes
10. **Analytics**: Usage tracking and insights
