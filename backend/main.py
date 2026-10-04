"""
FarmerSaathi - FastAPI Backend
Crop Yield/Recommendation Prediction using scikit-learn ML model.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os

app = FastAPI(
    title="FarmerSaathi ML Backend",
    description="Crop Recommendation API powered by Machine Learning",
    version="1.0.0",
)

# ── CORS - Allow Next.js frontend ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load ML Model & Label Encoder ──
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "crop_model.pkl")
ENCODER_PATH = os.path.join(os.path.dirname(__file__), "models", "label_encoder.pkl")

model = None
label_encoder = None


def load_model():
    global model, label_encoder
    if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH):
        model = joblib.load(MODEL_PATH)
        label_encoder = joblib.load(ENCODER_PATH)
        print("✅ Model loaded successfully!")
    else:
        print("⚠️  Model files not found. Run train_model.py first.")


@app.on_event("startup")
async def startup_event():
    load_model()


# ── Request/Response Models ──
class SoilData(BaseModel):
    nitrogen: float = Field(..., ge=0, le=200, description="Nitrogen content in soil (kg/ha)")
    phosphorus: float = Field(..., ge=0, le=200, description="Phosphorus content in soil (kg/ha)")
    potassium: float = Field(..., ge=0, le=300, description="Potassium content in soil (kg/ha)")
    temperature: float = Field(..., ge=-10, le=55, description="Temperature in Celsius")
    humidity: float = Field(..., ge=0, le=100, description="Relative humidity (%)")
    ph: float = Field(..., ge=0, le=14, description="Soil pH value")
    rainfall: float = Field(..., ge=0, le=500, description="Rainfall in mm")


class PredictionResponse(BaseModel):
    success: bool
    prediction: str
    confidence: float
    top_3: list[dict]


# ── Endpoints ──
@app.get("/")
async def root():
    return {
        "message": "🌾 FarmerSaathi ML Backend is running!",
        "status": "healthy",
        "model_loaded": model is not None,
    }


@app.get("/health")
async def health_check():
    return {"status": "ok", "model_loaded": model is not None}


@app.post("/predict", response_model=PredictionResponse)
async def predict_crop(data: SoilData):
    if model is None or label_encoder is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please train the model first by running train_model.py",
        )

    try:
        features = np.array(
            [[data.nitrogen, data.phosphorus, data.potassium,
              data.temperature, data.humidity, data.ph, data.rainfall]]
        )

        # Get prediction probabilities for top-3
        probabilities = model.predict_proba(features)[0]
        top_3_indices = np.argsort(probabilities)[-3:][::-1]

        prediction_index = top_3_indices[0]
        prediction_label = label_encoder.inverse_transform([prediction_index])[0]
        confidence = float(probabilities[prediction_index])

        top_3 = []
        for idx in top_3_indices:
            top_3.append({
                "crop": label_encoder.inverse_transform([idx])[0],
                "confidence": round(float(probabilities[idx]) * 100, 2),
            })

        return PredictionResponse(
            success=True,
            prediction=prediction_label,
            confidence=round(confidence * 100, 2),
            top_3=top_3,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
