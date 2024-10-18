import speech_recognition as sr

from fastapi import APIRouter

router = APIRouter()

recognizer = sr.Recognizer()


@router.get("/record/")
def record():
    with sr.Microphone() as source:
        audio = recognizer.listen(source)
    try:
        text = recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        text = "Google Speech Recognition could not understand audio"
    except sr.RequestError as e:
        text = f"Could not request results from Google Speech Recognition service; {e}"

    return {"message": text}
