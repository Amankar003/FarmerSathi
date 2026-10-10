"use client";

import axios from "axios";
import React, { useState } from "react";
import { Sprout, Loader2, FlaskConical } from "lucide-react";

const FIELDS = [
  { name: "nitrogen", label: "Nitrogen (N)", placeholder: "e.g. 80", step: "1" },
  { name: "phosphorus", label: "Phosphorus (P)", placeholder: "e.g. 40", step: "1" },
  { name: "potassium", label: "Potassium (K)", placeholder: "e.g. 40", step: "1" },
  { name: "ph", label: "pH Level (0-14)", placeholder: "e.g. 6.5", step: "0.1" },
  { name: "humidity", label: "Humidity (%)", placeholder: "e.g. 82", step: "1" },
  { name: "temperature", label: "Temperature (°C)", placeholder: "e.g. 23", step: "0.1" },
];

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: "", phosphorus: "", potassium: "",
    temperature: "", humidity: "", ph: "", rainfall: "",
  });

  const [predictedCrop, setPredictedCrop] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPredictedCrop("");
    
    try {
      const response = await axios.post("http://localhost:8000/predict", {
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      });
      
      setPredictedCrop(response.data.prediction);
      setConfidence(response.data.confidence);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch prediction. Is the ML backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card-brutal bg-white w-full max-w-3xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-primary border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#111]">
            <FlaskConical className="text-white" size={24} />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl">Smart Soil Analysis</h2>
        </div>
        <p className="font-semibold text-black/70 mb-8">
          Enter your soil properties and weather conditions to get the most suitable crop recommendation.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.map((field) => (
              <div key={field.name}>
                <label className="block font-bold mb-2 text-sm">{field.label}</label>
                <input
                  type="number"
                  name={field.name}
                  step={field.step}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="input-brutal"
                />
              </div>
            ))}
          </div>

          {/* Rainfall - full width */}
          <div>
            <label className="block font-bold mb-2 text-sm">Rainfall (mm)</label>
            <input
              type="number"
              name="rainfall"
              placeholder="e.g. 200"
              value={formData.rainfall}
              onChange={handleChange}
              required
              className="input-brutal"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-brutal-green w-full mt-2"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" /> Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sprout size={20} /> Predict Optimal Crop
              </span>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-soft/20 border-brutal rounded-xl text-center">
            <p className="font-bold text-red-600">{error}</p>
          </div>
        )}

        {predictedCrop && (
          <div className="mt-6 p-6 bg-yellow-soft/30 border-brutal rounded-xl text-center reveal">
            <p className="font-bold text-sm text-black/60 mb-1 uppercase tracking-wider">Recommended Crop</p>
            <h3 className="font-heading text-5xl text-green-primary mb-2">{predictedCrop}</h3>
            <div className="inline-block sticker !transform-none !rotate-0">
              Confidence: {confidence}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;