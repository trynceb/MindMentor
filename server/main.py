from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import openai
import logging
from dotenv import load_dotenv
from routes.auth import router as auth_router
from routes.openai import router as openai_router


# CONFIGURATIONS
load_dotenv()
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])
openai.api_key = os.getenv("OPENAI_API_KEY")

# ROUTES
app.include_router(openai_router, prefix='/openai' )
app.include_router(auth_router, prefix='/auth')

# SERVER SETUP
if __name__ == '__main__':
    logging.basicConfig(filename='error.log', level=logging.DEBUG)
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 9000)))
