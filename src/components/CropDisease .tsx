'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Upload, AlertTriangle, Loader2, Sparkles } from 'lucide-react';

interface SimilarImage {
  id: string;
  url_small: string;
  license_name: string;
  citation: string;
}

interface DiseaseSuggestion {
  id: string;
  name: string;
  probability: number;
  similar_images: SimilarImage[];
}

interface DiseaseResult {
  result: {
    disease: {
      suggestions: DiseaseSuggestion[];
    };
  };
}

const CropDisease = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!file) return alert('Please upload an image');
    setLoading(true);
    try {
      const base64Image = await getBase64(file);
      const response = await axios.post(
        'https://plant.id/api/v3/health_assessment',
        {
          images: [base64Image],
          latitude: 40.7128,
          longitude: -74.006,
          similar_images: true,
        },
        {
          headers: {
            'Api-Key': process.env.NEXT_PUBLIC_PLANTID!,
            'Content-Type': 'application/json',
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert('Something went wrong while predicting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Upload Card */}
      <div className="card-brutal bg-white w-full max-w-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-primary border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#111]">
            <Upload className="text-white" size={24} />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl">Crop Disease Detection</h2>
        </div>

        <p className="font-semibold text-black/70 mb-6">
          Upload a photo of your plant leaf and our AI will identify diseases instantly.
        </p>

        {/* Upload Area */}
        <label className="block cursor-pointer mb-4">
          <div className={`border-3 border-dashed rounded-xl p-8 text-center transition-all hover:bg-yellow-soft/20 ${
            preview ? 'border-green-primary bg-green-primary/5' : 'border-black/30'
          }`}>
            {preview ? (
              <div className="flex flex-col items-center gap-3">
                <img src={preview} alt="Preview" className="max-h-48 rounded-lg border-brutal" />
                <span className="font-bold text-green-primary text-sm">✓ Image selected — click to change</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <Upload size={40} className="text-black/40" />
                <span className="font-bold text-black/60">Click to upload plant image</span>
                <span className="text-sm text-black/40">JPG, PNG up to 10MB</span>
              </div>
            )}
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        <button
          className="btn-brutal-green w-full"
          onClick={handleSubmit}
          disabled={loading || !file}
          style={{ opacity: loading || !file ? 0.6 : 1 }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={20} className="animate-spin" /> Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles size={20} /> Predict Disease
            </span>
          )}
        </button>
      </div>

      {/* Results */}
      {result?.result?.disease?.suggestions?.length ? (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 reveal">
          {result.result.disease.suggestions.map((disease) => (
            <div key={disease.id} className="card-brutal bg-white p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-orange-accent border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#111] shrink-0">
                  <AlertTriangle size={20} className="text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-xl">{disease.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 flex-1 bg-black/10 rounded-full border border-black/20 overflow-hidden">
                      <div 
                        className="h-full bg-green-primary rounded-full transition-all"
                        style={{ width: `${disease.probability * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-sm text-green-primary">
                      {(disease.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {disease.similar_images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {disease.similar_images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url_small}
                      alt="Similar"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-black shrink-0 hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CropDisease;
