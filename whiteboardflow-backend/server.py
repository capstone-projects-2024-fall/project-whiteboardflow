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

""" This is where you upload an image """
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"static/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "url": f"/static/{file.filename}"
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
    uvicorn.run("server:app", host="127.0.0.1", port=5000, reload=True)
