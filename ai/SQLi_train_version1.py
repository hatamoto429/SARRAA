import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# Distribution:
# 22.304 benign payloads
# 11.411 malicious payloads
# 45 unset payloads ? FIX
# total - 33.760

# === CONFIG ===
INPUT_CSV = "datasets/original_SQLi.csv"
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

# === STEP 1: LOAD & CLEAN DATA ===
df = pd.read_csv(INPUT_CSV, header=None, names=["text", "label"], encoding="utf-16")
df.dropna(inplace=True)
df["label"] = df["label"].astype(int)

print(f" Loaded dataset: {len(df)} rows")
print(df["label"].value_counts())

# === STEP 2: TRAIN/VAL/TEST SPLIT ===
train_val_texts, test_texts, train_val_labels, test_labels = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
)

train_texts, val_texts, train_labels, val_labels = train_test_split(
    train_val_texts, train_val_labels, test_size=0.1, random_state=42, stratify=train_val_labels
)

print(f"📊 Split sizes: Train={len(train_texts)}, Val={len(val_texts)}, Test={len(test_texts)}")

# === STEP 3: FEATURE EXTRACTION ===
vectorizer = TfidfVectorizer(
    lowercase=False,
    token_pattern=r'\S+'
)

X_train = vectorizer.fit_transform(train_texts)
X_val = vectorizer.transform(val_texts)
X_test = vectorizer.transform(test_texts)

# Add extraction of invalid rows and save them

# === STEP 4: TRAIN MODEL ===
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, train_labels)

# === STEP 5: EVALUATE ===
val_pred = clf.predict(X_val)
test_pred = clf.predict(X_test)

print("\n🧪 Validation Set Report:")
print(classification_report(val_labels, val_pred))

print("\n🧪 Test Set Report:")
print(classification_report(test_labels, test_pred))

# === STEP 6: SAVE MODEL & VECTORIZER ===
joblib.dump(vectorizer, os.path.join(MODEL_DIR, "SQL_vectorizer.joblib"))
joblib.dump(clf, os.path.join(MODEL_DIR, "SQL_model.joblib"))

print(" Model and vectorizer saved in 'models/'")
