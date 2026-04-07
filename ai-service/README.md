# WebOS AI Service

This service provides AI chat functionality for WebOS using various AI providers.

## Supported AI Providers

### 1. OpenAI (Default - Recommended)
- **Model**: GPT-3.5-turbo or GPT-4o-mini
- **Cost**: Pay-as-you-go (GPT-3.5-turbo is very affordable)
- **Setup**: Get API key from https://platform.openai.com/api-keys
- **File**: `main.py` (current)
- **Requirements**: `requirements.txt` (current)

### 2. Groq (Free Alternative)
- **Model**: Llama 3.1 70B
- **Cost**: FREE with generous limits
- **Setup**: Get free API key from https://console.groq.com/
- **File**: `main_groq.py` (rename to `main.py`)
- **Requirements**: `requirements_groq.txt` (rename to `requirements.txt`)

## Quick Setup

### Option 1: OpenAI (Default)

1. Get API key from https://platform.openai.com/api-keys
2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   PORT=8000
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run:
   ```bash
   python main.py
   ```

### Option 2: Groq (Free)

1. Get FREE API key from https://console.groq.com/
2. Rename files:
   ```bash
   mv main.py main_openai.py
   mv main_groq.py main.py
   mv requirements.txt requirements_openai.txt
   mv requirements_groq.txt requirements.txt
   ```
3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Add your Groq API key:
   ```
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   PORT=8000
   ```
5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Run:
   ```bash
   python main.py
   ```

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

## Models Comparison

| Provider | Model | Cost | Speed | Quality |
|----------|-------|------|-------|---------|
| OpenAI | GPT-3.5-turbo | $0.0005/1K tokens | Fast | Good |
| OpenAI | GPT-4o-mini | $0.00015/1K tokens | Fast | Better |
| Groq | Llama 3.1 70B | FREE | Very Fast | Good |

## Recommendation

- **For Development**: Use Groq (free and fast)
- **For Production**: Use OpenAI GPT-4o-mini (best quality, very affordable)

## Getting API Keys

### OpenAI
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Go to API Keys section
4. Create new secret key
5. Copy the key (starts with `sk-`)

### Groq (FREE)
1. Go to https://console.groq.com/
2. Sign up with Google/GitHub
3. Go to API Keys section
4. Create new API key
5. Copy the key (starts with `gsk_`)

## Troubleshooting

### "Invalid API key"
- Check your API key is correct in `.env`
- Make sure there are no extra spaces
- Verify the key is active in the provider's dashboard

### "Rate limit exceeded"
- OpenAI: Add payment method or wait
- Groq: Wait for rate limit to reset (very generous limits)

### "Module not found"
- Make sure you installed dependencies: `pip install -r requirements.txt`
- Check you're using the correct requirements file for your provider

## Environment Variables

```bash
# For OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# For Groq
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Common
PORT=8000
```

## Notes

- The service runs on port 8000 by default
- All responses are streamed using Server-Sent Events (SSE)
- Context from terminal/editor is automatically included in prompts
- Both providers support streaming responses
