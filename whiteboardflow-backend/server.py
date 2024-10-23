import uvicorn
from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.get("/hello")
def read_root():
    return {"test_data": ["data1", "data2"]}

@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}

if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
