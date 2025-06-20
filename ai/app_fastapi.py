from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os

# VERSION 1
#model = joblib.load("models/model.joblib")
#vectorizer = joblib.load("models/vectorizer.joblib")

# VERSION 2, improved
model = joblib.load("models/newmodel.joblib")
vectorizer = joblib.load("models/newvectorizer.joblib")

app = FastAPI()

# CORS Middleware to enable Vue frontend communication with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Local Host URL - http://localhost:5173/
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputText(BaseModel):
    text: str


@app.get("/")
def read_root():
    return {"message": "SARRAA API is running"}

@app.post("/predict")
def predict(input_data: InputText):
    raw_text = input_data.text
    features = vectorizer.transform([raw_text])
    prediction = model.predict(features)[0]
    label = "malicious" if prediction == 1 else "benign"
    return {
        "input": raw_text,
        "prediction": label,
        "class": int(prediction)
    }


# VM Pentesting hosting
# python -m uvicorn app_fastapi:app --reload --host 0.0.0.0 --port 8001

# Local Machine hosting
# python -m uvicorn app_fastapi:app --reload --port 8001
