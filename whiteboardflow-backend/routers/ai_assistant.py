import openai

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

client = openai.OpenAI()


class AIData(BaseModel):
    question: str
    image: str
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

# @router.post("/get-response-image/")
# def get_ai_response_image(base64_image:str):
#     response = client.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[
#             {
#                 "role": "user",
#                 "content": [
#                     {
#                         "type": "text",
#                         "text": "What is in this image?",
#                     },
#                     {
#                         "type": "image_url",
#                         "image_url": {
#                             "url": f"data:image/jpeg;base64,{base64_image}"
#                         },
#                     },
#                 ],
#             }
#         ],
#     )
#     return {"message": response.choices[0].message.content}