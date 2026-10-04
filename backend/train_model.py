"""
Train a Crop Recommendation Model using scikit-learn.
Uses a synthetic dataset based on the classic Crop Recommendation Dataset structure.
Features: Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# ── Synthetic dataset based on real-world crop recommendation patterns ──
np.random.seed(42)

crop_profiles = {
    "Rice":       {"N": (80, 20), "P": (40, 10), "K": (40, 10), "temp": (23, 3), "humidity": (82, 5), "ph": (6.5, 0.5), "rainfall": (200, 30)},
    "Wheat":      {"N": (80, 15), "P": (45, 10), "K": (45, 10), "temp": (22, 3), "humidity": (60, 10), "ph": (7.0, 0.5), "rainfall": (80, 20)},
    "Maize":      {"N": (80, 15), "P": (40, 10), "K": (20, 5),  "temp": (23, 3), "humidity": (65, 10), "ph": (6.5, 0.5), "rainfall": (80, 20)},
    "Cotton":     {"N": (120, 20),"P": (40, 10), "K": (20, 5),  "temp": (25, 3), "humidity": (60, 10), "ph": (7.0, 0.5), "rainfall": (80, 20)},
    "Jute":       {"N": (80, 15), "P": (40, 10), "K": (40, 10), "temp": (25, 3), "humidity": (80, 5),  "ph": (7.0, 0.5), "rainfall": (175, 25)},
    "Coffee":     {"N": (100, 15),"P": (20, 5),  "K": (30, 5),  "temp": (25, 3), "humidity": (60, 10), "ph": (6.5, 0.5), "rainfall": (150, 30)},
    "Coconut":    {"N": (20, 5),  "P": (10, 5),  "K": (30, 10), "temp": (27, 3), "humidity": (90, 5),  "ph": (6.0, 0.5), "rainfall": (150, 30)},
    "Papaya":     {"N": (50, 10), "P": (55, 10), "K": (50, 10), "temp": (30, 5), "humidity": (90, 5),  "ph": (6.5, 0.5), "rainfall": (140, 30)},
    "Orange":     {"N": (20, 5),  "P": (10, 5),  "K": (10, 5),  "temp": (22, 3), "humidity": (90, 5),  "ph": (7.0, 0.5), "rainfall": (110, 20)},
    "Apple":      {"N": (20, 5),  "P": (130, 20),"K": (200, 30),"temp": (22, 3), "humidity": (90, 5),  "ph": (6.0, 0.5), "rainfall": (110, 20)},
    "Mango":      {"N": (20, 5),  "P": (20, 5),  "K": (30, 10), "temp": (30, 3), "humidity": (50, 10), "ph": (6.0, 0.5), "rainfall": (90, 20)},
    "Grapes":     {"N": (20, 5),  "P": (125, 20),"K": (200, 30),"temp": (25, 5), "humidity": (80, 5),  "ph": (6.0, 0.5), "rainfall": (70, 15)},
    "Watermelon": {"N": (100, 15),"P": (10, 5),  "K": (50, 10), "temp": (25, 3), "humidity": (85, 5),  "ph": (6.5, 0.5), "rainfall": (50, 15)},
    "Muskmelon":  {"N": (100, 15),"P": (10, 5),  "K": (50, 10), "temp": (28, 3), "humidity": (90, 5),  "ph": (6.5, 0.5), "rainfall": (25, 10)},
    "Banana":     {"N": (100, 15),"P": (75, 15), "K": (50, 10), "temp": (27, 3), "humidity": (80, 5),  "ph": (6.0, 0.5), "rainfall": (100, 20)},
    "Pomegranate":{"N": (20, 5),  "P": (10, 5),  "K": (40, 10), "temp": (22, 3), "humidity": (90, 5),  "ph": (6.5, 0.5), "rainfall": (40, 10)},
    "Lentil":     {"N": (20, 5),  "P": (60, 10), "K": (20, 5),  "temp": (22, 3), "humidity": (50, 10), "ph": (7.0, 0.5), "rainfall": (45, 10)},
    "BlackGram":  {"N": (40, 10), "P": (60, 10), "K": (20, 5),  "temp": (28, 3), "humidity": (65, 10), "ph": (7.0, 0.5), "rainfall": (65, 15)},
    "MungBean":   {"N": (20, 5),  "P": (45, 10), "K": (20, 5),  "temp": (28, 3), "humidity": (85, 5),  "ph": (6.5, 0.5), "rainfall": (45, 15)},
    "Chickpea":   {"N": (40, 10), "P": (60, 10), "K": (80, 15), "temp": (18, 3), "humidity": (17, 5),  "ph": (7.0, 0.5), "rainfall": (75, 15)},
    "KidneyBeans":{"N": (20, 5),  "P": (60, 10), "K": (20, 5),  "temp": (20, 3), "humidity": (20, 5),  "ph": (6.0, 0.5), "rainfall": (105, 20)},
    "PigeonPeas": {"N": (20, 5),  "P": (60, 10), "K": (20, 5),  "temp": (27, 3), "humidity": (50, 10), "ph": (6.0, 0.5), "rainfall": (140, 25)},
}

SAMPLES_PER_CROP = 100

data = []
for crop, params in crop_profiles.items():
    for _ in range(SAMPLES_PER_CROP):
        row = {
            "N": max(0, np.random.normal(params["N"][0], params["N"][1])),
            "P": max(0, np.random.normal(params["P"][0], params["P"][1])),
            "K": max(0, np.random.normal(params["K"][0], params["K"][1])),
            "temperature": max(0, np.random.normal(params["temp"][0], params["temp"][1])),
            "humidity": np.clip(np.random.normal(params["humidity"][0], params["humidity"][1]), 0, 100),
            "ph": np.clip(np.random.normal(params["ph"][0], params["ph"][1]), 0, 14),
            "rainfall": max(0, np.random.normal(params["rainfall"][0], params["rainfall"][1])),
            "label": crop,
        }
        data.append(row)

df = pd.DataFrame(data)

# ── Prepare features and labels ──
X = df[["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]]
y = df["label"]

le = LabelEncoder()
y_encoded = le.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# ── Train RandomForest ──
model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
model.fit(X_train, y_train)

# ── Evaluate ──
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\n{'='*50}")
print(f"  Model Training Complete!")
print(f"  Accuracy: {accuracy * 100:.2f}%")
print(f"{'='*50}\n")
print(classification_report(y_test, y_pred, target_names=le.classes_))

# ── Save model and label encoder ──
os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/crop_model.pkl")
joblib.dump(le, "models/label_encoder.pkl")
print("✅ Model saved to models/crop_model.pkl")
print("✅ Label encoder saved to models/label_encoder.pkl")
