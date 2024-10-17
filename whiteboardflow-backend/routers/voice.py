from fastapi import APIRouter

router = APIRouter()

@router.get("/record/")
async def record():
    return {"message": "Recording"}
