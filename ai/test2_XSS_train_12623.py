import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

#df_raw = pd.read_csv("datasets/original_XSS.csv", header=None, quoting=3, encoding='utf-8', on_bad_lines='skip')
#print(df_raw.head(10))

# 12629 valid reads with original_XSS.csv
# 0 valid reads with broken xss
# 0 valid reads with valid xss

# Load raw text dataset with columns: 'text' and 'label'
df = pd.read_csv(
    "datasets/XSS_final_valid.csv",
    names=["text", "label"],
    encoding="utf-8",
    on_bad_lines="skip",
)

# Drop rows where any value is missing (NaN)
df.dropna(inplace=True)

# Ensure 'text' column has no missing values
df['text'] = df['text'].fillna('')

# Convert label column to integer type to avoid sklearn errors
df['label'] = df['label'].astype(int)

# Optional: Check dataset size and balance
print(f"Dataset size after cleanup: {len(df)}")
print("Class distribution:")
print(df['label'].value_counts())

# Split data into train and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.2, random_state=42
)

# Initialize TF-IDF vectorizer with custom token pattern
vectorizer = TfidfVectorizer(
    lowercase=False,           # Keep original casing important for code snippets
    token_pattern=r'\S+'       # Tokenize on non-whitespace substrings to preserve symbols
)

# Fit vectorizer on training data and transform training text into feature vectors
X_train_vec = vectorizer.fit_transform(X_train)

# Transform test data with the already fitted vectorizer
X_test_vec = vectorizer.transform(X_test)

# Initialize Random Forest classifier
clf = RandomForestClassifier(random_state=42)

# Train classifier on vectorized training data
clf.fit(X_train_vec, y_train)

# Predict on test data
y_pred = clf.predict(X_test_vec)

# Print classification metrics to evaluate model performance
print(classification_report(y_test, y_pred))

print(df['label'].value_counts(normalize=True))  # Class distribution ratio
print(f"Duplicates: {df.duplicated().sum()}")     # Number of duplicate rows

# Save vectorizer and model for later use in API or predictions
joblib.dump(vectorizer, "models/vectorizer.joblib")
joblib.dump(clf, "models/model.joblib")

print("Model and vectorizer trained and saved.")
