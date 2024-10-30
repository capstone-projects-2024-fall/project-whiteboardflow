import openai

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

client = openai.OpenAI()


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
        
In your response, you will act as the interviewer. Give me feedback on how
correct my answer was (if my answer was incorrect, tell me what I could have
done to improve), and also different ways that the problem possibly could have 
been solved (if there are any).
"""

@router.post("/get-response/")
def get_ai_response(data: AIData):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": chat_context},
            {"role": "user", "content": data.question},
            {"role": "user", "content": data.image},
            {"role": "user", "content": data.transcript},
        ],
        max_tokens=1000,
    )

    return {"message": response.choices[0].message.content}
