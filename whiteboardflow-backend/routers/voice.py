import speech_recognition as sr
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import time

router = APIRouter()
recognizer = sr.Recognizer()

def event_stream():
    time.sleep(5)
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source)
        print("recording actually started")
        yield "data: recording_started\n\n"
        audio = recognizer.listen(source)
    try:
        text = recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        text = "Google Speech Recognition could not understand audio"
    except sr.RequestError as e:
        text = f"Could not request results from Google Speech Recognition service; {e}"
    
    # Finally, send the transcription result
    print("recording stopped")
    yield f"data: {text}\n\n"

@router.get("/record/")
async def record():
    print("record function")
    return StreamingResponse(event_stream(), media_type="text/event-stream")
