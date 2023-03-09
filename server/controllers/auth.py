import os
import requests
from fastapi import HTTPException
from models.auth import LoginRequest, SignupRequest

def login(username: str, password: str):
    try:
        chat_engine_response = requests.get(
            "https://api.chatengine.io/users/me",
            headers={
                "Project-ID": os.getenv("PROJECT_ID"),
                "User-Name": username,
                "User-Secret": password,
            }
        )
        chat_engine_response.raise_for_status()
        
        return {"response": chat_engine_response.json()}
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
def signup(username: str, password: str):
    try:
        chat_engine_response = requests.post(
            "https://api.chatengine.io/users/",
            json={
                "username": username,
                "secret": password,
            },
            headers={"Private-Key": os.getenv("PRIVATE_KEY")}
        )
        chat_engine_response.raise_for_status()
        
        return {"response": chat_engine_response.json()}
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=400, detail=str(e))