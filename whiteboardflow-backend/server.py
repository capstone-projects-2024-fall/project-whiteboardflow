import uvicorn
import shutil
import os
import openai
import base64
import logging
# Loads environment variables from settings (must be done before importing from
# 'ai_assistant')
from config.settings import Config

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from routers.voice import router as voice_router
from routers.ai_assistant import router as ai_router
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Use the logger
logger = logging.getLogger(__name__)

app = FastAPI(debug=True)

origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(voice_router, prefix="/api")
app.include_router(ai_router, prefix="/api")

app.mount("/static", StaticFiles(directory="static"), name="static")
client = openai.OpenAI()

""" This is where you upload an image """
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Saving and converting the image to base64
    file_location = f"static/images/{file.filename}"
    os.makedirs(os.path.dirname(file_location), exist_ok=True)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    with open(file_location, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode("utf-8")

    # Attempting to send the image for analysis
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
            {
            "role": "user",
            "content": [
                            {
                                "type": "text",
                                "text": "What is in this image?",
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_string}"
                                },
                            },
                        ],
                    }
                ],
            )
        if response.choices:
            ai_response = response.choices[0].message.content
            logger.info(f"AI Response: {ai_response}")
        else:
            ai_response = "No response generated"
            logger.info("No response generated from AI")
    except Exception as e:
        logger.error("Failed at OpenAI API call", exc_info=True)
        return {"error": str(e), "details": "Check model name, API key, and payload"}


    # Returning the results
    return {
        "filename": file.filename,
        "url": f"/static/images/{file.filename}",
        "base64": base64_string,
        "ai_response": ai_response
    }


""" This could visualize the uploaded image """
@app.get("/images/{filename}", response_class=HTMLResponse)
def view_file(filename: str):
    return f"""
    <html>
        <body>
            <h1>Image Display</h1>
            <img src="/static/{filename}" alt="Uploaded Image" />
        </body>
    </html>
    """


@app.get("/")
def read_root():
    return {"test_data": ["data1", "data2"]}


if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
