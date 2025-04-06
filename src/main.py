from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from uuid import uuid4

import google.generativeai as genai

from src.prompt import get_prompt

# Load environment variables from .env file
load_dotenv()
# Set up the Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize the Generative Model
model = genai.GenerativeModel("gemini-1.5-flash")

# Dictionary to store chat sessions
chat_sessions = {}

# Initialize FastAPI app
app = FastAPI()

# CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
)

# Define the request model for the chat endpoint
class ChatRequest(BaseModel):
    plant_type: str
    plant_name: str
    user_message: str
    session_id: str | None = None

# Define the response model for the chat endpoint
@app.post("/chat")
async def chat(request: ChatRequest):
    session_id = request.session_id or str(uuid4())

    if session_id in chat_sessions:
        chat = chat_sessions[session_id]
    else:
        initial_prompt = get_prompt(
            plant_type=request.plant_type,
            plant_name=request.plant_name
        )
        # Start a new chat session with the initial prompt
        chat = model.start_chat(history=[{"role": "user", "parts": [initial_prompt]}])
        # Store the chat session in the dictionary
        chat_sessions[session_id] = chat

    try:
        # Send the user message to the chat model and get the response
        response = chat.send_message(request.user_message)
        return {
            "response": response.text,
            "session_id": session_id
        }
    except Exception as e:
        print(f"Error processing chat: {e}")
        return {"error": str(e), "session_id": session_id}
