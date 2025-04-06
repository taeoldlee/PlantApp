from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from uuid import uuid4

import google.generativeai as genai

from src.prompt import get_prompt

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

chat_sessions = {}
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
)

class ChatRequest(BaseModel):
    plant_type: str
    plant_name: str
    user_message: str
    session_id: str | None = None

@app.post("/chat")
async def chat(request: ChatRequest):
    session_id = request.session_id or str(uuid4())

    if session_id in chat_sessions:
        chat = chat_sessions[session_id]
    else:
        initial_prompt = get_prompt(plant_type=request.plant_type, plant_name=request.plant_name)
        chat = model.start_chat(history=[{"role": "user", "parts": [initial_prompt]}])
        chat_sessions[session_id] = chat

    try:
        # Append the new user message to the history
        chat.history.append({"role": "user", "parts": [request.user_message]})

        # Send the new message and get the response
        response = chat.send_message(request.user_message)

        # Append the assistant's response to the history
        chat.history.append({"role": "assistant", "parts": [response.text]})

        # Update the session with the new history
        chat_sessions[session_id] = chat

        return {
            "response": response.text,
            "session_id": session_id
        }
    except Exception as e:
        print(f"Error processing chat: {e}")
        return {"error": str(e), "session_id": session_id}