from fastapi import APIRouter
from controllers.openai import text, code, assist
from models.openai import TextRequest, CodeRequest, AssistRequest

router = APIRouter()

router.post("/text", response_model=dict)
async def post_text(request:TextRequest):
    return await text(request)

router.post("/code", response_model=dict)
async def post_code(request: CodeRequest):
    return await code(request)

router.post("/assist", response_model=dict)
async def post_assist(request: AssistRequest):
    return await assist(request)