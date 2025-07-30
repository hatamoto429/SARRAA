from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from keras.src.layers import TextVectorization
from pydantic import BaseModel
import os
import joblib
from keras.models import load_model
import json
import tensorflow as tf

# TESTING VERSIONS ------------------------------
# XSS VERSION
# model = joblib.load("models/XSS_model.joblib")
# vectorizer = joblib.load("models/XSS_vectorizer.joblib")

# SQLi VERSION
# model = joblib.load("models/SQL_model.joblib")
# vectorizer = joblib.load("models/SQL_vectorizer.joblib")

# Random Forest TEST Model
# model = joblib.load("models/LR_M_upsample_model.joblib")
# vectorizer = joblib.load("models/LR_M_upsample_vectorizer.joblib")
# ------------------------------------------------

# MERGED VERSIONS --------------------------------
# Linear Regression Model ---
# model = joblib.load("models/LR_M_upsample_model.joblib")
# vectorizer = joblib.load("models/LR_M_upsample_vectorizer.joblib")

# Support Vector Machine Model ---
# model = joblib.load("models/SVM_M_upsample_model.joblib")
# vectorizer = joblib.load("models/SVM_M_upsample_vectorizer.joblib")

# Convolutional Neural Network Model ---
model = load_model("models/CNN_M_upsample_model.keras")

# Load vectorizer config -
with open("models/CNN_M_upsample_vectorizer_config.json", "r") as f:
    vec_data = json.load(f)

vectorizer = TextVectorization.from_config(vec_data["config"])

# Load vocabulary -
with open("models/CNN_M_upsample_vectorizer_vocab.json", "r", encoding="utf-8") as f:
    vocab = json.load(f)

vectorizer.set_vocabulary(vocab)
# -----------------------------------------------

app = FastAPI()

# CORS Middleware to enable Vue frontend communication with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InputText(BaseModel):
    text: str


@app.get("/")
def read_root():
    return {"message": "SARRAA API is running"}

# Predict with LR, SVC -----------------------------------------
#@app.post("/predict")
#def predict(input_data: InputText):
#    raw_text = input_data.text
#    features = vectorizer.transform([raw_text])
#    prediction = model.predict(features)[0]
#    label = "malicious" if prediction == 1 else "benign"
#    return {
#        "input": raw_text,
#        "prediction": label,
#        "class": int(prediction)
#    }
# -----------------------------------------


# Predict with CNN -----------------------------------------
@app.post("/predict")
def predict(input_data: InputText):
    raw_text = input_data.text
    # Use TextVectorization layer to transform input text
    features = vectorizer(tf.constant([raw_text]))
    prediction_prob = model.predict(features)
    prediction = (prediction_prob > 0.5).astype(int)[0][0]
    label = "malicious" if prediction == 1 else "benign"
    return {
        "input": raw_text,
        "prediction": label,
        "class": int(prediction)
    }
# -----------------------------------------

# VM Pentesting hosting
# python -m uvicorn app_fastapi:app --reload --host 0.0.0.0 --port 8001

# Local Machine hosting
# python -m uvicorn app_fastapi:app --reload --port 8001
