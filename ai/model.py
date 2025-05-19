from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

class SARRAA:
    def __init__(self):
        self.vectorizer = CountVectorizer(analyzer='char', ngram_range=(1, 3))
        self.classifier = LogisticRegression()

    def train(self, texts, labels):
        X = self.vectorizer.fit_transform(texts)
        self.classifier.fit(X, labels)

    def predict(self, texts):
        X = self.vectorizer.transform(texts)
        return self.classifier.predict(X)

    def save(self, path="model.pkl"):
        with open(path, "wb") as f:
            pickle.dump((self.vectorizer, self.classifier), f)

    def load(self, path="model.pkl"):
        with open(path, "rb") as f:
            self.vectorizer, self.classifier = pickle.load(f)
