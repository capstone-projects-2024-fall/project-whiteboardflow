from flask import Flask

app = Flask(__name__)

@app.route("/hello")
def hello():
  return {"test_data": ["data1", "data2"]}

if __name__ == "__main__":
  app.run(debug=True)