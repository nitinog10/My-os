from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from anthropic import Anthropic
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    context: dict = {}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/chat")
async def chat(request: ChatRequest):
    async def generate():
        try:
            # Build context-aware prompt
            system_prompt = "You are a helpful AI assistant integrated into WebOS, a browser-based operating system."
            
            if request.context.get("openFile"):
                system_prompt += f"\n\nCurrently open file: {request.context['openFile']}"
            
            if request.context.get("cwd"):
                system_prompt += f"\nCurrent directory: {request.context['cwd']}"
            
            if request.context.get("error"):
                system_prompt += f"\nRecent error: {request.context['error']}"

            # Stream response from Claude
            with client.messages.stream(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": request.message}
                ],
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'content': text})}\n\n"
                
                yield "data: [DONE]\n\n"
        
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            yield f"data: {json.dumps({'error': error_msg})}\n\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
