from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class JournalEntryBase(BaseModel):
    stress_level: int
    sleep_quality: int
    study_burnout: int
    content: Optional[str] = None

class JournalEntryCreate(JournalEntryBase):
    pass

class JournalEntryInDBBase(JournalEntryBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class JournalEntry(JournalEntryInDBBase):
    pass
