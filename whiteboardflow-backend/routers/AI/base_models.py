from pydantic import BaseModel


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
