import base64
import openai
import os

from fastapi import APIRouter
from pydantic import BaseModel
from firebase_admin import storage, auth

router = APIRouter()

client = openai.OpenAI()


class HintData(BaseModel):
    token: str
    question: str
    image: str


class AIData(HintData):
    transcript: str


dir = os.path.dirname(__file__)


@router.post("/get-hint/")
def get_hint(data: HintData):
    decoded_token = auth.verify_id_token(data.token)
    uid = decoded_token["uid"]

    image_data = get_firebase_image(uid)

    # Convert image to base64 encoding
    data.image = base64.b64encode(image_data).decode("utf-8")

    return get_ai_response(data, "hint_context")


@router.post("/get-result/")
def get_result(data: AIData):
    if not any([data.question, data.image, data.transcript]):
        raise ValueError(
            "At least one of 'question', 'image', or 'transcript' must be provided."
        )

    decoded_token = auth.verify_id_token(data.token)
    uid = decoded_token["uid"]

    image_data = get_firebase_image(uid)

    # Convert image to base64 encoding
    data.image = base64.b64encode(image_data).decode("utf-8")

    return get_ai_response(data, "result_context")


def get_ai_response(data: AIData, context_file: str):
    filename = os.path.join(dir, f"contexts/{context_file}.txt")
    
    transcript = ""
    
    if isinstance(data, AIData):
        transcript = data.transcript

    try:
        with open(filename, "r") as file:
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
                        "text": transcript,
                    },
                ],
            },
        ],
        max_tokens=600,
    )

    return {"message": response.choices[0].message.content}


def get_firebase_image(user_id):
    bucket = storage.bucket()
    blob = bucket.blob(f"user-files/{user_id}/static.png")
    image_data = blob.download_as_bytes()

    return image_data
