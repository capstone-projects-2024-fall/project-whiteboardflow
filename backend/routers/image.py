import base64
import logging
import openai
import os
import shutil

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import HTMLResponse

router = APIRouter()
client = openai.OpenAI()
logger = logging.getLogger(__name__)

#This is where you upload an image
@router.post("/upload")
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

# This is where you visualize the image
@router.get("/images/{filename}", response_class=HTMLResponse)
def view_file(filename: str):
    return f"""
        <html>
            <body>
                <h1>Image Display</h1>
                <img src="/static/images/{filename}" alt="Uploaded Image" />
            </body>
        </html>
        """
