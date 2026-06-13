from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.models.chat import ChatRole

class ChatMessageBase(BaseModel):
    role: ChatRole
    content: str

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessageInDBBase(ChatMessageBase):
    id: int
    session_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ChatMessage(ChatMessageInDBBase):
    pass

class ChatSessionBase(BaseModel):
    title: Optional[str] = None

class ChatSessionCreate(ChatSessionBase):
    pass

class ChatSessionInDBBase(ChatSessionBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ChatSession(ChatSessionInDBBase):
    messages: List[ChatMessage] = []
