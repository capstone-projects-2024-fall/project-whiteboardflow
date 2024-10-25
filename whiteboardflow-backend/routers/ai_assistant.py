import openai

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

client = openai.OpenAI()


class AIData(BaseModel):
    question: str
    image: str  # TODO Change data type once we know what we're sending here
    transcript: str


@router.post("/get-response/")
def get_ai_response(data: AIData):
    print(data)
    return {"message": "Data received successfully"}
