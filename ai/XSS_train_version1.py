import csv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib
import os

# With original_XSS.csv
# 12741 valid reads with xss, 941 broken saved

# With XSS_fixed.csv
# 13676 valid rows with xss new, 6 broken saved

# OLD, Dont Use

# === STEP 1: CLEAN AND LOAD DATA ===

INPUT_CSV = "datasets/XSS_fixed.csv"
VALID_CSV = "datasets/XSS_tmp_valid.csv"
BROKEN_CSV = "datasets/XSS_tmp_invalid.csv"
MODEL_DIR = "models"

# Ensure model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

# Clean input file and separate valid/broken rows
good_rows, bad_rows = [], []
with open(INPUT_CSV, encoding="utf-8") as file:
    reader = csv.reader(file)
    for i, row in enumerate(reader, start=1):
        if len(row) == 2:
            good_rows.append(row)
        else:
            bad_rows.append((i, row))

# Save valid and broken rows
with open(VALID_CSV, "w", newline='', encoding="utf-8") as vf:
    writer = csv.writer(vf)
    writer.writerows(good_rows)

with open(BROKEN_CSV, "w", newline='', encoding="utf-8") as bf:
    writer = csv.writer(bf)
    writer.writerow(["line_number", "data"])
    writer.writerows(bad_rows)

# Save cleaned script for further processing
print(f"Saved {len(good_rows)} valid rows to '{VALID_CSV}'")
print(f"Saved {len(bad_rows)} broken rows to '{BROKEN_CSV}'")

# Load cleaned valid data
df = pd.read_csv(
    VALID_CSV,
    names=["text", "label"],
    encoding="utf-8"
)

# === STEP 2: PREPROCESS ===

df.dropna(inplace=True)  # Drop any remaining NaNs
df["label"] = df["label"].astype(int)  # Ensure labels are integers

print(f"\nDataset size after cleanup: {len(df)}")
print("Class distribution:")
print(df["label"].value_counts())

# === STEP 3: TRAIN/TEST SPLIT ===

X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=42
)

# === STEP 4: VECTORIZE TEXT ===

vectorizer = TfidfVectorizer(
    lowercase=False,           # Retain original casing
    token_pattern=r'\S+'       # Tokenize on non-whitespace substrings
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# === STEP 5: TRAIN MODEL ===

clf = RandomForestClassifier(random_state=42)
clf.fit(X_train_vec, y_train)

# === STEP 6: EVALUATE ===

y_pred = clf.predict(X_test_vec)
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# === STEP 7: SAVE MODEL ===

joblib.dump(vectorizer, os.path.join(MODEL_DIR, "XSS_vectorizer_1.joblib"))
joblib.dump(clf, os.path.join(MODEL_DIR, "XSS_model_1.joblib"))

print("✅ Model and vectorizer trained and saved to 'models/'")
