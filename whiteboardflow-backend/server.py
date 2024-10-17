import uvicorn

from fastapi import FastAPI

app = FastAPI()


@app.get("/hello")
def read_root():
    return {"test_data": ["data1", "data2"]}


if __name__ == "__main__":
    # TODO Remove reload parameter in production
    uvicorn.run("server:app", host="127.0.0.1", port=5000, reload=True)
