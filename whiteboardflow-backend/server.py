import uvicorn
import shutil
import os

# fastapi
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(debug=True)
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
