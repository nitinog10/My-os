"""
Alternative AI service using Groq (Free tier available)
To use: Rename this file to main.py and update requirements.txt
Get free API key from: https://console.groq.com/
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from groq import Groq
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

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

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

            # Stream response from Groq (using Llama 3.1 70B)
            stream = client.chat.completions.create(
                model="llama-3.1-70b-versatile",  # Fast and free
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": request.message}
                ],
                stream=True,
                max_tokens=2000
            )

            for chunk in stream:
                if chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    yield f"data: {json.dumps({'content': content})}\n\n"
            
            yield "data: [DONE]\n\n"
        
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            yield f"data: {json.dumps({'error': error_msg})}\n\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
