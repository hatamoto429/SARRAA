from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import os

model = joblib.load("models/model.joblib")
vectorizer = joblib.load("models/vectorizer.joblib")

app = FastAPI()


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
