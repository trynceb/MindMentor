from pydantic import BaseModel

class TextRequest(BaseModel):
    text: str
    activeChatId: str
    
class CodeRequest(BaseModel):
    text: str
    activeChatId: str
    
class AssistRequest(BaseModel):
    text: str