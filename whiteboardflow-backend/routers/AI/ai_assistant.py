import base64
import openai

from fastapi import APIRouter
from pydantic import BaseModel
from firebase_admin import storage

router = APIRouter()

client = openai.OpenAI()

class AIData(BaseModel):
    question: str
    image: str
    transcript: str

@router.post("/get-result/")
def get_result(data: AIData):
    if not any([data.question, data.image, data.transcript]):
        raise ValueError(
            "At least one of 'question', 'image', or 'transcript' must be provided."
        )

    image_data = get_firebase_image()

    # Convert image to base64 encoding
    data.image = base64.b64encode(image_data).decode("utf-8")

    return get_ai_result(data)


def get_ai_result(data: AIData):
    try:
        with open("contexts/result_context.txt", "r") as file:
            chat_context = file.read()
    except IOError as e:
        print(e)
        return
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": chat_context},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": data.question,
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{data.image}"},
                    },
                    {
                        "type": "text",
                        "text": data.transcript,
                    },
                ],
            },
        ],
        max_tokens=600,
    )

    return {"message": response.choices[0].message.content}


def get_firebase_image():
    bucket = storage.bucket()
    blob = bucket.blob("images/static.png")
    image_data = blob.download_as_bytes()

    return image_data
