import uvicorn
import shutil
import config.firebase_config

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routers.AI.ai_assistant import router as ai_router
from routers.firebase.questions import router as questions_router


app = FastAPI(debug=True)

origins = ["https://project-whiteboardflow-eowa.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/assistant")
app.include_router(questions_router, prefix="/questions")
#app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def read_root():
    return {"test_data": ["data1", "data2"]}


#if __name__ == "__main__":
# TODO Remove reload parameter in production
#   uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
