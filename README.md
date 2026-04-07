# WebOS - Browser-Based Operating System

A fully functional operating system simulation running in your browser, built with React, TypeScript, and AWS services.

## Features

- **Desktop Environment**: Glassmorphism UI with draggable, resizable windows
- **File System**: Virtual file system with DynamoDB persistence
- **Terminal**: Command-line interface with common Unix commands
- **Code Editor**: Monaco-based editor with syntax highlighting and auto-save
- **File Explorer**: Tree-view file browser with context menus
- **Notes App**: Markdown editor with live preview
- **AI Assistant**: Claude-powered AI integrated into the terminal
- **Authentication**: AWS Cognito user management
- **Multi-user**: Per-user data isolation and persistence

## Tech Stack

### Frontend
- React 18 + Vite + TypeScript
- Tailwind CSS (styling)
- Framer Motion (animations)
- Zustand (state management)
- react-rnd (window management)
- Monaco Editor (code editing)

### Backend
- Node.js + Express + TypeScript
- AWS SDK v3 (DynamoDB)
- AWS Cognito (authentication)
- REST API architecture

### AI Service
- Python 3.11 + FastAPI
- Anthropic Claude API
- Server-Sent Events (SSE) streaming

## Project Structure

```
webos/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── stores/        # Zustand stores
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utilities
│   └── package.json
├── backend/           # Express backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth middleware
│   │   └── types/         # TypeScript types
│   └── package.json
└── ai-service/        # FastAPI AI service
    ├── main.py
    └── requirements.txt
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- AWS Account (for Cognito and DynamoDB)

### 1. AWS Setup

#### DynamoDB Table
Create a table named `webos-main`:
- Partition Key: `PK` (String)
- Sort Key: `SK` (String)
- Billing: On-demand

#### Cognito User Pool
1. Create a User Pool in AWS Cognito
2. Enable email sign-in
3. Create an App Client (without client secret)
4. Note the User Pool ID and Client ID

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your AWS credentials
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your AWS credentials
npm run dev
```

Backend runs on `http://localhost:4000`

### 4. AI Service Setup

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Anthropic API key
python main.py
```

AI service runs on `http://localhost:8000`

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000
VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_COGNITO_REGION=us-east-1
```

### Backend (.env)
```
PORT=4000
AWS_REGION=us-east-1
DYNAMODB_TABLE=webos-main
COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
AI_SERVICE_URL=http://localhost:8000
```

### AI Service (.env)
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=8000
```

## Available Terminal Commands

- `ls [path]` - List directory contents
- `cd <path>` - Change directory
- `pwd` - Print working directory
- `cat <file>` - Display file contents
- `echo <text>` - Print text
- `clear` - Clear terminal
- `help` - Show available commands
- `ai <prompt>` - Ask AI assistant (coming soon)

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### AI Service Development
```bash
cd ai-service
python main.py
```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Backend & AI Service (Railway)
Both services can be deployed to Railway with automatic builds from Git.

## Architecture

- Frontend never calls AWS services directly
- All AWS operations go through the Express backend
- File system state lives in Zustand (runtime) + DynamoDB (persistence)
- Each app is a self-contained React component
- Windows managed by central WindowManager
- AI service is separate FastAPI process

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
