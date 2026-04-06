# Spec: AI Assistant (Claude-powered)

## Feature
Context-aware AI chat panel docked to the desktop, powered by Claude API via FastAPI microservice.

## Requirements
- [ ] Floating panel: toggle open/close from taskbar
- [ ] Chat UI: message bubbles, user + assistant sides
- [ ] Streamed responses (SSE)
- [ ] Context sent with every message:
  - current open file + content
  - current terminal cwd + last 10 commands
  - current error (if terminal shows error)
- [ ] Capabilities:
  - Explain code / errors
  - Write / refactor code
  - Suggest terminal commands
  - Answer general questions
- [ ] "Insert to Editor" button on code blocks in response
- [ ] "Run in Terminal" button on command suggestions
- [ ] Conversation history maintained per session

## FastAPI Endpoint
POST /chat/stream
Body: { messages[], context: { file, cwd, recentCommands } }
Response: SSE stream of text chunks

## Tasks
1. Scaffold ai-service/ with FastAPI + requirements.txt
2. Create claude_client.py with streaming support
3. Create chat.py route with SSE response
4. Create AIAssistant/index.tsx chat UI component
5. Create AIAssistant/MessageBubble.tsx
6. Create AIAssistant/CodeBlock.tsx with Insert + Run buttons
7. Wire "Insert to Editor" → write to active Monaco tab
8. Wire "Run in Terminal" → inject command into terminal
9. Create backend proxy route: POST /api/ai/chat → ai-service

## Acceptance Criteria
- Response streams in real time (no waiting for full response)
- Code blocks render with syntax highlighting
- Insert to Editor places code at cursor position
- Context (open file) is visible to Claude in its response
