from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("models/model.joblib")
vectorizer = joblib.load("models/vectorizer.joblib")

class InputText(BaseModel):
    text: str

@app.post("/predict")
async def predict(input_data: InputText):
    raw_text = input_data.text
    # Convert raw text into features the model expects
    features = vectorizer.transform([raw_text])
    prediction = model.predict(features)
    label = "malicious" if prediction[0] == 1 else "benign"
    return {"prediction": label}
