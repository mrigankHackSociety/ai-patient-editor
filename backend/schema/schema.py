from pydantic import BaseModel, Field

class UserPatentInteraction(BaseModel):
    userInteraction: str | None = None
    editorData: str
    instruction: str

class UserInteractionResponse(BaseModel):
    success: bool
    data: dict[str, str] = Field(default_factory=dict)
