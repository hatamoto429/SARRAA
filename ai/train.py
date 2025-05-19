import csv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

bad_rows = []

# 13686 - 12623 = 1.063 BAD ROWS

with open("datasets/XSS.csv", encoding="utf-8") as file:
    reader = csv.reader(file)
    for i, row in enumerate(reader, start=1):
        if len(row) != 2:
            bad_rows.append((i, row))

# Save bad rows to a new CSV
with open("datasets/broken_XSS_rows.csv", "w", newline='', encoding="utf-8") as out_file:
    writer = csv.writer(out_file)
    writer.writerow(["line_number", "content"])
    for i, row in bad_rows:
        writer.writerow([i, ','.join(row)])

print(f" Found {len(bad_rows)} malformed rows. Saved to 'datasets/broken_XSS_rows.csv'")
if bad_rows:
    print("Last 10 malformed rows:")
    for i, row in bad_rows[-10:]:
        print(f"Row {i}: {row}")

# Load Valid Data
df_raw = pd.read_csv("datasets/XSS.csv", header=None, quoting=3, encoding='utf-8', on_bad_lines='skip')
print(df_raw.head(10))

# Load dataset with column names
df = pd.read_csv(
    "datasets/XSS.csv",
    names=["text", "label"],
    encoding="utf-8"
)

# Drop rows where any value is missing (NaN)
df.dropna(inplace=True)

# Ensure 'text' column has no missing values
df['text'] = df['text'].fillna('')

# Convert label column to integer type
df['label'] = df['label'].astype(int)

# Optional: Check dataset size and class balance
print(f"\n Dataset size after cleanup: {len(df)}")
print("Class distribution:")
print(df['label'].value_counts())

# Split data into train and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.2, random_state=42
)

# Initialize TF-IDF vectorizer
vectorizer = TfidfVectorizer(
    lowercase=False,           # Keep original casing
    token_pattern=r'\S+'       # Tokenize on non-whitespace substrings
)

# Vectorize training and test data
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Initialize and train Random Forest classifier
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train_vec, y_train)

# Evaluate on test data
y_pred = clf.predict(X_test_vec)
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save vectorizer and model
joblib.dump(vectorizer, "models/vectorizer.joblib")
joblib.dump(clf, "models/model.joblib")

print("Model and vectorizer trained and saved.")
