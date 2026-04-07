# WebOS AI Service

This service provides AI chat functionality for WebOS using OpenAI.

## Setup

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up or log in
3. Go to API Keys section
4. Create new secret key
5. Copy the key (starts with `sk-`)

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API key:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=8000
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Service

```bash
python main.py
```

The service will run on http://localhost:8000

## Testing

Test the service:
```bash
curl http://localhost:8000/health
```

Should return:
```json
{"status":"ok"}
```

## API Endpoints

### GET /health
Health check endpoint

### POST /chat
Chat with AI assistant

Request body:
```json
{
  "message": "Hello, how are you?",
  "context": {
    "openFile": "/home/documents/file.txt",
    "cwd": "/home",
    "error": "Some error message"
  }
}
```

Response: Server-Sent Events (SSE) stream

## Models

- **Default**: GPT-3.5-turbo (fast and affordable)
- **Alternative**: GPT-4o-mini (better quality, still affordable)

To change model, edit `main.py` and update the `model` parameter.

## Troubleshooting

### "Invalid API key"
- Check your API key is correct in `.env`
- Make sure there are no extra spaces
- Verify the key is active in OpenAI dashboard

### "Rate limit exceeded"
- Add payment method in OpenAI dashboard
- Or wait for rate limit to reset

### "Module not found"
- Install dependencies: `pip install -r requirements.txt`
- Make sure you're in the ai-service directory

## Cost

OpenAI pricing (as of 2024):
- GPT-3.5-turbo: $0.0005 per 1K tokens (very affordable)
- GPT-4o-mini: $0.00015 per 1K tokens (even cheaper!)

For typical usage, costs are minimal (a few cents per day).
