import random

from config.firebase_config import db
from fastapi import APIRouter

router = APIRouter()

questions_ref = db.collection("questions")
docs = questions_ref.stream()
question_list = [doc.to_dict() for doc in docs]


@router.get("/random/")
def get_random_question():
    # Select a random question
    random_question = random.choice(question_list)
    return {"question": random_question}


@router.get("/all")
def get_question_list():
    docs = questions_ref.stream()
    question_list = [doc.to_dict() for doc in docs]
    return {"question_list": question_list}
