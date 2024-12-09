import base64
import openai
import os

from fastapi import APIRouter, Depends

from routers.AI.base_models import HintData, AIData
from routers.database.utils import get_firebase_image
from routers.dependencies import get_current_user

dir = os.path.dirname(__file__)

router = APIRouter()
client = openai.OpenAI()


@router.post("/hint/")
def get_hint(data: HintData, current_user: dict = Depends(get_current_user)):
    """
    Gets a hint response from OpenAI based on the question and image passed
    in `data`.

    Args:
        data (HintData): The hint request data.

    Returns:
        dict: The hint response generated from OpenAI
        API.
    """
    image_data = get_firebase_image(current_user.uid)
    data.image = base64.b64encode(image_data).decode("utf-8")
    return get_ai_response(data, "hint_context")


@router.post("/result/")
def get_result(data: AIData, current_user: dict = Depends(get_current_user)):
    image_data = get_firebase_image(current_user.uid)
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
        max_tokens=1000,
    )

    return {"message": response.choices[0].message.content}
