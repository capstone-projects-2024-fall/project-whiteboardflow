import random

from fastapi import APIRouter
from firebase_admin import firestore

router = APIRouter()

db = firestore.client()
questions_ref = db.collection("questions")
docs = questions_ref.stream()
question_list = [doc.to_dict() for doc in docs]


@router.get("/get-random-question/")
def get_random_question():
    # Select a random question
    random_question = random.choice(question_list)
    return {"question": random_question}
