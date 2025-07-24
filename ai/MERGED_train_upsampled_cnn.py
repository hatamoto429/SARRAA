import os
import random
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# TensorFlow and Keras imports:
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense, Dropout
from keras.callbacks import EarlyStopping
from keras.layers import TextVectorization

# --- Set random seeds for reproducibility ---
SEED = 42
np.random.seed(SEED)
random.seed(SEED)
tf.random.set_seed(SEED)

# --- Configuration ---
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)
MAX_NUM_WORDS = 20000
MAX_SEQUENCE_LENGTH = 100
EMBEDDING_DIM = 100

# --- Load and clean datasets ---
xss_df = pd.read_csv(
    "datasets/XSS_fixed_enhanced_balanced.csv",
    header=None,
    names=["text", "label"],
    encoding="utf-8"
)
xss_df.dropna(inplace=True)
xss_df["label"] = xss_df["label"].astype(int)

sqli_df = pd.read_csv(
    "datasets/original_SQLi.csv",
    header=None,
    names=["text", "label"],
    encoding="utf-16",
    quotechar='"',
    engine='python'
)
sqli_df.dropna(inplace=True)
sqli_df["label"] = sqli_df["label"].astype(int)

# --- Balance datasets ---
max_size = len(sqli_df)
xss_df_balanced = xss_df.sample(n=max_size, replace=True, random_state=SEED)
df = pd.concat([xss_df_balanced, sqli_df], ignore_index=True)
df = df.sample(frac=1, random_state=SEED).reset_index(drop=True)

print(f"Loaded balanced combined dataset: {len(df)} rows")
print(df["label"].value_counts())

# --- Train/Val/Test split ---
train_val_texts, test_texts, train_val_labels, test_labels = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=SEED, stratify=df["label"]
)
train_texts, val_texts, train_labels, val_labels = train_test_split(
    train_val_texts, train_val_labels, test_size=0.1, random_state=SEED, stratify=train_val_labels
)

print(f"Split sizes: Train={len(train_texts)}, Val={len(val_texts)}, Test={len(test_texts)}")
print("Class distribution in full data:\n", df["label"].value_counts(normalize=True))

# --- Text preprocessing ---
vectorizer = TextVectorization(
    max_tokens=MAX_NUM_WORDS,
    output_sequence_length=MAX_SEQUENCE_LENGTH,
    standardize="lower_and_strip_punctuation",
    split="whitespace",
    output_mode="int"
)

vectorizer.adapt(train_texts)

# Apply vectorizer manually before training
X_train_pad = vectorizer(np.array([[t] for t in train_texts])).numpy()
X_val_pad = vectorizer(np.array([[t] for t in val_texts])).numpy()
X_test_pad = vectorizer(np.array([[t] for t in test_texts])).numpy()

y_train = np.array(train_labels)
y_val = np.array(val_labels)
y_test = np.array(test_labels)

# --- Build CNN model ---
model = Sequential([
    Embedding(input_dim=MAX_NUM_WORDS, output_dim=EMBEDDING_DIM),
    Conv1D(filters=128, kernel_size=5, activation='relu'),
    GlobalMaxPooling1D(),
    Dropout(0.5),
    Dense(10, activation='relu'),
    Dense(1, activation='sigmoid')  # Binary classification
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

# --- Train the model ---
early_stop = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

history = model.fit(
    X_train_pad, y_train,
    validation_data=(X_val_pad, y_val),
    epochs=10,
    batch_size=32,
    callbacks=[early_stop],
    verbose=2
)

# --- Evaluation ---
val_pred_prob = model.predict(X_val_pad)
val_pred = (val_pred_prob > 0.5).astype(int).flatten()

test_pred_prob = model.predict(X_test_pad)
test_pred = (test_pred_prob > 0.5).astype(int).flatten()

print("\nValidation Set Report:")
print(classification_report(y_val, val_pred))

print("\nTest Set Report:")
print(classification_report(y_test, test_pred))

# --- Save vectorizer and model ---
# Save vectorizer weights
vectorizer_config = {
    "config": vectorizer.get_config(),
    "weights": vectorizer.get_weights()
}
with open(os.path.join(MODEL_DIR, "CNN_M_upsample_vectorizer_config.json"), "w") as f:
    json.dump(vectorizer_config, f)

# Save model
model.save(os.path.join(MODEL_DIR, "CNN_M_upsample_model.keras"))

print("CNN model and vectorizer saved successfully.")
