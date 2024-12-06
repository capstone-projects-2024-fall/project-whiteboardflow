import base64
import openai
import os

from fastapi import APIRouter
from pydantic import BaseModel
from firebase_admin import storage, auth

router = APIRouter()

client = openai.OpenAI()


class HintData(BaseModel):
    """
    A data model class to represent the data passed when the user requests a
    hint. 
    
    Attributes:
        token (str): Token used to identify user through their Firebase user
            ID. 
        question (str): The interview question.
        image (str): The image received from Firebase, base64 encoded as a
            string.
    """
    token: str
    session: str
    question: str
    image: str


class AIData(HintData):
    """
    AIData extends HintData to include a transcript of the user's verbal
    explanation.
    
    Attributes:
        transcript (str): The transcript text from the user's verbal
            explanation, used as additional context for the AI. 
    """
    transcript: str


dir = os.path.dirname(__file__)


@router.post("/hint/")
def get_hint(data: HintData):
    """
    Processes a hint request by verifying the user token, retrieving an
    associated image from Firebase, and generating a hint response. 

    Args:
        data (HintData): The hint request data, including a Firebase
            authorization token, question, and image placeholder.

    Returns:
        (dict[str, str | None] | None): The AI-generated hint response based on
            the provided question and image context.
    """
    decoded_token = auth.verify_id_token(data.token)
    uid = decoded_token["uid"]

    image_data = get_firebase_image(uid, data.session)

    # Convert image to base64 encoding
    data.image = base64.b64encode(image_data).decode("utf-8")

    return get_ai_response(data, "hint_context")


@router.post("/result/")
def get_result(data: AIData):
    if not any([data.question, data.image, data.transcript]):
        raise ValueError(
            "At least one of 'question', 'image', or 'transcript' must be provided."
        )

    decoded_token = auth.verify_id_token(data.token)
    uid = decoded_token["uid"]

    image_data = get_firebase_image(uid, data.session)

    # Convert image to base64 encoding
    data.image = base64.b64encode(image_data).decode("utf-8")

    return get_ai_response(data, "result_context")


def get_ai_response(data: AIData, context_file: str):
    """
    Generates a response from ChatGPT based on the inputted data and chat
    context. 

    Args:
        data (AIData): The AI-related data, including the user's question,
            image (base64-encoded), and transcript (optional), for which the AI
            will generate a response. 
        context_file (str): The filename of the context file containing a chat
        context for how the AI should respond.

    Returns:
        dict: A dictionary containing the AI's response message.

    Exceptions:
        - If the context file cannot be read (IOError), the function logs the
            error and returns `None`.
    """
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


def get_firebase_image(user_id, session_id):
    """
    Retrieves an image file associated with the specified user from Firebase
    Storage. 

    Args:
        user_id (str): The unique identifier for the user whose image is being
            retrieved. 

    Returns:
        bytes: The image data as a byte array, downloaded from Firebase
            Storage. 
    """
    bucket = storage.bucket()
    blob = bucket.blob(f"user-files/{user_id}/{session_id}/static.png")
    image_data = blob.download_as_bytes()

    return image_data
