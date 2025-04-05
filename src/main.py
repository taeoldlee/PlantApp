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

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


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

    initial_prompt = get_prompt(plant_type=request.plant_type, plant_name=request.plant_name)

    chat = client.models.Chat(session_id=session_id, initial_prompt=initial_prompt)


    if session_id in chat_sessions:
        chat = chat_sessions[session_id]
    else:
        system_prompt = get_prompt(request.plant_type, request.plant_name)
        chat = model.start_chat(history=[{"role": "system", "parts": [system_prompt]}])
        chat_sessions[session_id] = chat

    response = chat.send_message(request.user_message)

    return {
        "response": response.text,
        "session_id": session_id
    }