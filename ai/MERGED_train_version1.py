import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# CONFIG
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

# === STEP 1: LOAD & CLEAN BOTH DATASETS ===

# Load XSS dataset
xss_df = pd.read_csv("datasets/XSS_fixed_enhanced_balanced.csv", header=None, names=["text", "label"], encoding="utf-8")
xss_df.dropna(inplace=True)
xss_df["label"] = xss_df["label"].astype(int)

# Load SQLi dataset
sqli_df = pd.read_csv("datasets/original_SQLi.csv", header=None, names=["text", "label"], encoding="utf-16", quotechar='"', engine='python')
sqli_df.dropna(inplace=True)
sqli_df["label"] = sqli_df["label"].astype(int)

# Combine both datasets
df = pd.concat([xss_df, sqli_df], ignore_index=True)

# Shuffle merged dataframe
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

print(f" Loaded combined dataset: {len(df)} rows")
print(df["label"].value_counts())

# === STEP 2: TRAIN/VAL/TEST SPLIT ===
train_val_texts, test_texts, train_val_labels, test_labels = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
)

train_texts, val_texts, train_labels, val_labels = train_test_split(
    train_val_texts, train_val_labels, test_size=0.1, random_state=42, stratify=train_val_labels
)

print(f"📊 Split sizes: Train={len(train_texts)}, Val={len(val_texts)}, Test={len(test_texts)}")

# Balance check
print(df["label"].value_counts(normalize=True))

# === STEP 3: FEATURE EXTRACTION ===
vectorizer = TfidfVectorizer(
    lowercase=False,
    token_pattern=r'\S+'
)

X_train = vectorizer.fit_transform(train_texts)
X_val = vectorizer.transform(val_texts)
X_test = vectorizer.transform(test_texts)

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
joblib.dump(vectorizer, os.path.join(MODEL_DIR, "MERGED_vectorizer.joblib"))
joblib.dump(clf, os.path.join(MODEL_DIR, "MERGED_model.joblib"))

print(" Model and vectorizer saved in 'models/'")
