from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.api.deps import get_db, get_current_user
from app.schemas.journal import JournalEntry, JournalEntryCreate
from app.models.journal import JournalEntry as JournalEntryModel
from app.models.user import User as UserModel

router = APIRouter()

@router.post("/", response_model=JournalEntry)
async def create_journal_entry(
    entry_in: JournalEntryCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    db_obj = JournalEntryModel(
        user_id=current_user.id,
        stress_level=entry_in.stress_level,
        sleep_quality=entry_in.sleep_quality,
        study_burnout=entry_in.study_burnout,
        content=entry_in.content
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[JournalEntry])
async def read_journal_entries(
    skip: int = 0, limit: int = 100, 
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    result = await db.execute(
        select(JournalEntryModel)
        .where(JournalEntryModel.user_id == current_user.id)
        .order_by(JournalEntryModel.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()
