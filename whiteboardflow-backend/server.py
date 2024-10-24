import uvicorn
from fastapi import FastAPI, File, UploadFile
# from starlette.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

origins = [
    "https://localhost:3000"
]

app.add_middleware(
CORSMiddleware,
allow_origins=["*"], # Allows all origins
allow_credentials=True,
allow_methods=["*"], # Allows all methods
allow_headers=["*"], # Allows all headers
)
# app.add_middleware(CORSMiddleware, allow_origins=["*"])


@app.get("/hello")
def read_root():
    return {"test_data": ["data1", "data2"]}

@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}


# @app.post("/upload")
# async def create_upload_file(file: UploadFile):
#     return {"filename": file.filename}

if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
