from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from config.firebase_config import db
from routers.dependencies import get_current_user

router = APIRouter()


class HistoryEntry(BaseModel):
    question: str
    questionId: str
    transcript: str
    response: str
    completionTime: str
    sessionId: str


@router.get("/history/")
async def get_history(current_user: dict = Depends(get_current_user)):
    user_id = current_user.uid
    history_ref = db.collection("users").document(user_id).collection("history")
    docs = history_ref.stream()

    history_entries = []
    for doc in docs:
        history_entries.append(doc.to_dict())

    return {"message": history_entries}


# Get a specific history entry by sessionId
@router.get("/history/{session_id}")
async def get_history_entry(
    session_id: str, current_user: dict = Depends(get_current_user)
):
    user_id = current_user.uid
    history_ref = db.collection("users").document(user_id).collection("history")

    doc = history_ref.document(session_id).get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="History entry not found")

    return {"message": doc.to_dict()}


@router.post("/history/")
async def add_history_entry(
    entry: HistoryEntry, current_user: dict = Depends(get_current_user)
):
    user_id = current_user.uid
    history_ref = db.collection("users").document(user_id).collection("history")

    entry_data = entry.model_dump()
    history_ref.document(entry.sessionId).set(entry_data)

    return {"message": "success"}
