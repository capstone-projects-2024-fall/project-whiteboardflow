import base64
import openai
import firebase_admin

from fastapi import APIRouter
from pydantic import BaseModel
from firebase_admin import credentials, storage
from config.settings import Config

router = APIRouter()

client = openai.OpenAI()

cred = credentials.Certificate(Config.FIREBASE_SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred, {"storageBucket": Config.FIREBASE_STORAGE_BUCKET})


class AIData(BaseModel):
    question: str
    image: str  # TODO Change data type once we know what we're sending here
    transcript: str


chat_context = """
I am doing a whiteboard mock interview for a job related to computer science. 
I am going to give you a question, image, and transcript. Here are the details 
about those three items:

    - Question: The question that I am being asked to answer.
    - Image: The work that I have written on a whiteboard to show my answer.
    - Transcript: The verbal explanation that I gave to describe my thought
        process while answering this problem.
        
Analyze the image and transcript in your response. What is in the image? If my
answer was wrong, show me what I did wrong. Don't give me the answer.
"""

additional_context = """Give me different ways that the problem could have been
solved, if there are any."""  # TODO


@router.post("/get-response/")
def get_response(data: AIData):
    if not any([data.question, data.image, data.transcript]):
        raise ValueError(
            "At least one of 'question', 'image', or 'transcript' must be provided."
        )

    image_data = get_firebase_image()

    # Convert image to base64 encoding
    data.image = base64.b64encode(image_data).decode("utf-8")

    return get_ai_response(data)


def get_ai_response(data: AIData):
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
        max_tokens=1000,
    )

    return {"message": response.choices[0].message.content}


def get_firebase_image():
    # Reference to your storage bucket
    bucket = storage.bucket()

    # Get the blob (file) in the bucket
    blob = bucket.blob("images/static.png")

    # Download the image content as a byte array
    image_data = blob.download_as_bytes()

    return image_data
