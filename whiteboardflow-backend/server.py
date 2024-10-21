import uvicorn
import f
from fastapi import FastAPI
import fastapi.middleware.cors
from fastapi.middleware.cors import CORSMiddleware
from routers.voice import router as voice_router


app = FastAPI(debug=True)
fastapi.middleware.cors(app)
origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(voice_router, prefix="/api")


@app.get("/")
def read_root():
    return {"test_data": ["data1", "data2"]}


if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=4398, reload=True)