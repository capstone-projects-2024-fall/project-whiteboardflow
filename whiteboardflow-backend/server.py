import uvicorn
import shutil
import os

# Loads environment variables from settings (must be done before importing from
# 'ai_assistant')
from config.settings import Config

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from routers.voice import router as voice_router
from routers.ai_assistant import router as ai_router


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

from fastapi import FastAPI, UploadFile, File
import shutil
import base64
import os

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Save the original file
    file_location = f"static/images/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Convert the file to a base64 string
    with open(file_location, "rb") as image_file:
        base64_string = base64.b64encode(image_file.read()).decode("utf-8")

    # Save base64 string as a .txt file for reference, if needed
    base64_file_location = f"static/images/{file.filename}.txt"
    with open(base64_file_location, "w") as text_file:
        text_file.write(f"data:image/png;base64,{base64_string}")

    # Return file details and base64 string
    return {
        "filename": file.filename,
        "url": f"/static/images/{file.filename}",
        "base64": f"data:image/png;base64,{base64_string}"
    }


@app.get("/images/{filename}", response_class=HTMLResponse)
def view_file(filename: str):
    base64_file_path = f"static/images/{filename}.txt"

    # Check if the base64 file exists
    if not os.path.exists(base64_file_path):
        return HTMLResponse("<h1>Image not found</h1>", status_code=404)

    # Read the base64 content
    with open(base64_file_path, "r") as file:
        base64_image = file.read()

    # Embed the base64 image data in HTML
    return f"""
    <html>
        <body>
            <h1>Image Display</h1>
            <img src="{base64_image}" alt="Uploaded Image" />
        </body>
    </html>
    """


@app.get("/")
def read_root():
    return {"test_data": ["data1", "data2"]}


if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
