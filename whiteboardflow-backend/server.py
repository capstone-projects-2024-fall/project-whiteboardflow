import uvicorn
import logging
# Loads environment variables from settings (must be done before importing from
# 'ai_assistant')

from config.settings import Config
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routers.voice import router as voice_router
from routers.image import router as image_router
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
app.include_router(image_router, prefix="/api")
app.mount("/static", StaticFiles(directory="static"), name="static")



@app.get("/")
def read_root():
    return {"test_data": ["data1", "data2"]}


if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
