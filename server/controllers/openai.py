import os
import openai
from fastapi import HTTPException
from httpx import AsyncClient
from typing import Any, Dict
from dotenv import load_dotenv
from models.openai import TextRequest, CodeRequest, AssistRequest

load_dotenv()

async def text(request: TextRequest) -> Dict[str, Any]:
    try:
        response = await openai.create_chat_completion(
            model="gpt-3.5-turbo",
            prompt=[
                {"text": "You are a helpful assistan.", "user": False},
                {"text": request.text, "user": True},
            ],
        )
        
        message = response.choices[0].text.strip()
        
        async with AsyncClient as client:
            response = await client.post(
                f"https://api.chatengine.io/chats/{request.activeChatId}/messages/",
                json={"text": message},
                headers={
                    "Project-ID": os.getenv("PROJECT_ID"),
                    "User-Name": os.getenv("BOT_USER_NAME"),
                    "User-Secret": os.getenv("BOT_USER_SECRET"),
                }
            )
        return {"text": message}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
async def code(request: CodeRequest) -> Dict[str, Any]:
    try:
        response = await openai.create_chat_completion(
            model="gpt-3.5-turbo",
            prompt=[
                {"text": "You are an assistant coder who responds with only code and no explanations.", "user": False},
                {"text": request.text, "user": True},
            ],
        )
        
        message = response.choices[0].text.strip()
        
        async with AsyncClient() as client:
            response = await client.post(
                f"https://api.chatengine.io/chats/{request.activeChatId}/messages/",
                json={"text": message},
                headers={
                    "Project-ID": os.getenv("PROJECT_ID"),
                    "User-Name": os.getenv("BOT_USER_NAME"),
                    "User-Secret": os.getenv("BOT_USER_SECRET"),
                },
            )
            
        return {"text": message}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
async def assist(request: AssistRequest) -> Dict[str, Any]:
    try:
        response = await openai.create_chat_completion(
            model="gpt-3.5-turbo",
            prompt=[
                {"text": "You are a helpful assistant that serves to only complete user's thoughts or sentences.", "user": False},
                {"text": f"Finish my thought: {request.text}", "user": True},
            ],
        )
        
        message = response.choices[0].text.strip()
        
        return {"text": message}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))