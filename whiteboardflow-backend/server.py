import uvicorn
import config.firebase_config # Initializes Firebase

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware

from routers.AI.ai_assistant import router as ai_router
from routers.database.questions import router as questions_router
from routers.database.history import router as history_router


app = FastAPI(debug=True)

origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/assistant", tags=["assistant"])
app.include_router(questions_router, prefix="/questions", tags=["questions"])
app.include_router(history_router, prefix="/history", tags=["history"])


if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
