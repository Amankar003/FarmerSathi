"use client";

import axios from "axios";
import React, { useState } from "react";

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
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
    <div className="w-full flex justify-center items-center py-[2rem]">
      <div className="glass-card p-12 w-full max-w-4xl text-center">
        <h2 className="section-title text-white">
          Smart Soil Analysis
        </h2>
        <p className="section-subtitle mx-auto mb-10">
          Enter your soil properties and weather conditions to get the most suitable crop recommendation powered by Machine Learning.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-[1.4rem] text-gray-300 font-medium">Nitrogen (N)</label>
            <input
              type="number"
              name="nitrogen"
              placeholder="e.g. 80"
              value={formData.nitrogen}
              onChange={handleChange}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[1.4rem] text-gray-300 font-medium">Phosphorus (P)</label>
            <input
              type="number"
              name="phosphorus"
              placeholder="e.g. 40"
              value={formData.phosphorus}
              onChange={handleChange}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[1.4rem] text-gray-300 font-medium">Potassium (K)</label>
            <input
              type="number"
              name="potassium"
              placeholder="e.g. 40"
              value={formData.potassium}
              onChange={handleChange}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[1.4rem] text-gray-300 font-medium">pH Level (0-14)</label>
            <input
              type="number"
              step="0.1"
              name="ph"
              placeholder="e.g. 6.5"
              value={formData.ph}
              onChange={handleChange}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[1.4rem] text-gray-300 font-medium">Humidity (%)</label>
            <input
              type="number"
              name="humidity"
              placeholder="e.g. 82"
              value={formData.humidity}
              onChange={handleChange}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[1.4rem] text-gray-300 font-medium">Temperature (°C)</label>
            <input
              type="number"
              step="0.1"
              name="temperature"
              placeholder="e.g. 23"
              value={formData.temperature}
              onChange={handleChange}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[1.4rem] text-gray-300 font-medium">Rainfall (mm)</label>
            <input
              type="number"
              name="rainfall"
              placeholder="e.g. 200"
              value={formData.rainfall}
              onChange={handleChange}
              required
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all"
            />
          </div>

          <div className="col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex justify-center items-center gap-4 py-4 disabled:opacity-70"
            >
              {loading ? "Analyzing..." : "Predict Optimal Crop"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-8 text-center text-red-400 font-medium text-[1.6rem]">
            {error}
          </p>
        )}

        {predictedCrop && (
          <div className="mt-10 p-8 rounded-2xl bg-[rgba(212,163,115,0.1)] border border-[rgba(212,163,115,0.3)] animation-fadeInUp">
            <h3 className="text-[1.8rem] text-gray-300 mb-2">Recommended Crop</h3>
            <p className="text-[4rem] font-bold gradient-text-gold font-serif">
              {predictedCrop}
            </p>
            <p className="text-[1.4rem] text-[#52B788] mt-2">
              Confidence: {confidence}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;