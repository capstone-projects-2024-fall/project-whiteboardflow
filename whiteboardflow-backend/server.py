import uvicorn
import shutil
import config.firebase_config

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers.AI.ai_assistant import router as ai_router

app = FastAPI(debug=False)  # Set debug=False for production

# CORS configuration to allow frontend from Vercel
origins = ["https://project-whiteboardflow-eowa.vercel.app"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers for different API endpoints
app.include_router(ai_router, prefix="/api")

# Serve static files (e.g., images)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return {"test_data": ["data1", "data2"]}

# For local development, you can still use uvicorn manually:
# if __name__ == "__main__":
#     uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
