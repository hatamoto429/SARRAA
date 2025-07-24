import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
import joblib

# NEWEST VERSION

# CONFIG
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

# === STEP 1: LOAD & CLEAN BOTH DATASETS ===
xss_df = pd.read_csv("datasets/XSS_fixed_enhanced_balanced.csv", header=None, names=["text", "label"], encoding="utf-8")
xss_df.dropna(inplace=True)
xss_df["label"] = xss_df["label"].astype(int)

sqli_df = pd.read_csv("datasets/original_SQLi.csv", header=None, names=["text", "label"], encoding="utf-16", quotechar='"', engine='python')
sqli_df.dropna(inplace=True)
sqli_df["label"] = sqli_df["label"].astype(int)

# === BALANCE DATASETS BY UPSAMPLING XSS TO SQLi SIZE ===
max_size = len(sqli_df)
xss_df_balanced = xss_df.sample(n=max_size, replace=True, random_state=42)
sqli_df_balanced = sqli_df.copy()

# Combine balanced datasets
df = pd.concat([xss_df_balanced, sqli_df_balanced], ignore_index=True)
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"Loaded balanced combined dataset: {len(df)} rows")
print(df["label"].value_counts())

# === STEP 2: SPLIT DATA ===
train_val_texts, test_texts, train_val_labels, test_labels = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
)

train_texts, val_texts, train_labels, val_labels = train_test_split(
    train_val_texts, train_val_labels, test_size=0.1, random_state=42, stratify=train_val_labels
)

print(f"Split sizes: Train={len(train_texts)}, Val={len(val_texts)}, Test={len(test_texts)}")
print("Class distribution in full data:\n", df["label"].value_counts(normalize=True))

# === STEP 3: FEATURE EXTRACTION ===
vectorizer = TfidfVectorizer(
    lowercase=False,
    token_pattern=r'\S+'
)

X_train = vectorizer.fit_transform(train_texts)
X_val = vectorizer.transform(val_texts)
X_test = vectorizer.transform(test_texts)

# === STEP 4: TRAIN MODEL ===
#clf = RandomForestClassifier(random_state=42)
#clf = LogisticRegression(max_iter=1000, random_state=42)
clf = SVC(kernel="linear", random_state=42)
clf.fit(X_train, train_labels)


# === STEP 5: EVALUATE ===
val_pred = clf.predict(X_val)
test_pred = clf.predict(X_test)

print("\nValidation Set Report:")
print(classification_report(val_labels, val_pred))

print("\nTest Set Report:")
print(classification_report(test_labels, test_pred))

# === STEP 6: SAVE MODEL & VECTORIZER ===
joblib.dump(vectorizer, os.path.join(MODEL_DIR, "SVC_M_upsample_vectorizer.joblib"))
joblib.dump(clf, os.path.join(MODEL_DIR, "SVC_M_upsample_model.joblib"))

print("Model and vectorizer saved in 'models/'")
