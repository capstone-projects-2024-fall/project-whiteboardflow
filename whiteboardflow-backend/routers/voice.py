import speech_recognition as sr

from fastapi import APIRouter

router = APIRouter()

recognizer = sr.Recognizer()
recognizer.energy_threshold = 0

@router.get("/record/")
def record():
    with sr.Microphone() as source:
        audio = recognizer.listen(source, phrase_time_limit=2)
    try:
        text = recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        text = "Google Speech Recognition could not understand audio"
    except sr.RequestError as e:
        text = f"Could not request results from Google Speech Recognition service; {e}"

    return {"message": text}
