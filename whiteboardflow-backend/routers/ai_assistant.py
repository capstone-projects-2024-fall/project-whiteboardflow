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
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": data.transcript},
        ],
        max_tokens=200,
    )

    return {"message": response.choices[0].message.content}
