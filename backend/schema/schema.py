from pydantic import BaseModel, Field

class UserPatentInteraction(BaseModel):
    userInteraction: str | None = None
    editorData: str
    instruction: str = ""

class PatentInteractionResponse(BaseModel):
    success: bool
    data: str = ""
