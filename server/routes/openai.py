import os
import requests
from fastapi import APIRouter

router = APIRouter()

@router.post("/text")
async def generate_text(text: str, activeChatId: str):
    try:
        response = requests.post(
            "https://api.openai.com/v1/engines/text-davinci-002/completions",
            json={
                "prompt": text,
                "temperature": 0.5,
                "max_tokens": 2048,
                "top_p": 1,
                "frequency_penalty": 0.5,
                "presence_penalty": 0,
            },
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
            },
        )
        response.raise_for_status()

        chat_engine_response = requests.post(
            f"https://api.chatengine.io/chats/{activeChatId}/messages/",
            json={"text": response.json()["choices"][0]["text"]},
            headers={
                "Project-ID": os.getenv("PROJECT_ID"),
                "User-Name": os.getenv("BOT_USER_NAME"),
                "User-Secret": os.getenv("BOT_USER_SECRET"),
            },
        )
        chat_engine_response.raise_for_status()

        return {"text": response.json()["choices"][0]["text"]}
    except requests.exceptions.HTTPError as e:
        return {"error": str(e)}

@router.post("/code")
async def generate_code(text: str, activeChatId: str):
    try:
        response = requests.post(
            "https://api.openai.com/v1/engines/code-davinci-002/completions",
            json={
                "prompt": text,
                "temperature": 0.5,
                "max_tokens": 2048,
                "top_p": 1,
                "frequency_penalty": 0.5,
                "presence_penalty": 0,
            },
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
            },
        )
        response.raise_for_status()

        chat_engine_response = requests.post(
            f"https://api.chatengine.io/chats/{activeChatId}/messages/",
            json={"text": response.json()["choices"][0]["text"]},
            headers={
                "Project-ID": os.getenv("PROJECT_ID"),
                "User-Name": os.getenv("BOT_USER_NAME"),
                "User-Secret": os.getenv("BOT_USER_SECRET"),
            },
        )
        chat_engine_response.raise_for_status()

        return {"text": response.json()["choices"][0]["text"]}
    except requests.exceptions.HTTPError as e:
        return {"error": str(e)}

@router.post("/assist")
async def assist(text: str):
    try:
        response = requests.post(
            "https://api.openai.com/v1/engines/text-davinci-002/completions",
            json={
                "prompt": f"Finish my thought: {text}",
                "temperature": 0.5,
                "max_tokens": 1024,
                "top_p": 1,
                "frequency_penalty": 0.5,
                "presence_penalty": 0,
            },
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
            },
        )
        response.raise_for_status()

        return {"text": response.json()["choices"][0]["text"]}
    except requests.exceptions.HTTPError as e:
        return {"error": str(e)}
