from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.api.deps import get_db, get_current_user
from app.schemas.chat import ChatSession, ChatSessionCreate, ChatMessage
from app.models.chat import ChatSession as ChatSessionModel, ChatMessage as ChatMessageModel, ChatRole
from app.models.user import User as UserModel
from app.services.ai.engine import generate_chat_response

router = APIRouter()

@router.post("/sessions", response_model=ChatSession)
async def create_chat_session(
    session_in: ChatSessionCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    db_obj = ChatSessionModel(
        user_id=current_user.id,
        title=session_in.title or "New Session"
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.get("/sessions", response_model=List[ChatSession])
async def read_chat_sessions(
    skip: int = 0, limit: int = 100, 
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    result = await db.execute(
        select(ChatSessionModel)
        .where(ChatSessionModel.user_id == current_user.id)
        .order_by(ChatSessionModel.created_at.desc())
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

@router.get("/sessions/{session_id}/messages", response_model=List[ChatMessage])
async def get_chat_messages(
    session_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    result = await db.execute(
        select(ChatMessageModel)
        .join(ChatSessionModel)
        .where(ChatSessionModel.id == session_id, ChatSessionModel.user_id == current_user.id)
        .order_by(ChatMessageModel.created_at.asc())
    )
    return result.scalars().all()

@router.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: int, db: AsyncSession = Depends(get_db)):
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            
            # 1. Save User Message
            user_msg = ChatMessageModel(session_id=session_id, role=ChatRole.USER, content=data)
            db.add(user_msg)
            await db.commit()
            
            # 2. Fetch history
            result = await db.execute(
                select(ChatMessageModel)
                .where(ChatMessageModel.session_id == session_id)
                .order_by(ChatMessageModel.created_at.asc())
                .limit(20)
            )
            history_msgs = result.scalars().all()
            history_dict = [{"role": m.role.value, "content": m.content} for m in history_msgs[:-1]] # exclude the just added user message
            
            # 3. Generate AI Response
            ai_text = await generate_chat_response(data, history_dict)
            
            # 4. Save AI Message
            ai_msg = ChatMessageModel(session_id=session_id, role=ChatRole.MODEL, content=ai_text)
            db.add(ai_msg)
            await db.commit()
            
            # 5. Send back to frontend
            await websocket.send_text(ai_text)
            
    except WebSocketDisconnect:
        print(f"Websocket disconnected for session {session_id}")
