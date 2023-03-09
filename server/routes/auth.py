from fastapi import APIRouter
from controllers.auth import login, signup
from models.auth import LoginRequest, SignupRequest

router = APIRouter()

@router.post("/login")
async def login_user(request: LoginRequest):
    return login(request.username, request.password)

@router.post("/signup")
async def signup_user(request: SignupRequest):
    return signup(request.username, request.password)