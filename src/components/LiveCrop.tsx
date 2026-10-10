"use client";

import React, { useState } from "react";
import axios from "axios";
import { TrendingUp, Loader2, Search } from "lucide-react";

interface PriceData {
  State: string;
  "APMC's": string;
  Commodity: string;
  "Min Price": string;
  "Modal Price": string;
  "Max Price": string;
}

const STATES = [
  "All States", "ANDHRA PRADESH", "CHHATTISGARH", "GUJARAT", "HARYANA", "HIMACHAL PRADESH",
  "JAMMU AND KASHMIR", "KARNATAKA", "MADHYA PRADESH", "MAHARASHTRA", "NAGALAND", "ODISHA",
  "PUNJAB", "RAJASTHAN", "TAMIL NADU", "TELANGANA", "TRIPURA", "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL"
];

const COMMODITIES = [
  "All Commodities", "TOMATO", "POTATO", "ONION", "WHEAT", "COTTON", "CHILLI", "BANANA",
  "MANGO", "GRAPES", "PAPAYA", "MUSTARD SEED", "JOWAR", "BAJRA", "BARLEY (JAU)", "GARLIC",
  "GINGER", "TURMERIC BULB", "TURMERIC FINGER", "CABBAGE", "CAULIFLOWER", "BRINJAL",
  "GREEN CHILLI", "CAPSICUM", "CUCUMBER", "PUMPKIN", "SPINACH (PALAK)", "CARROT",
  "POMEGRANATE", "APPLE", "WATER MELON", "LEMON", "SOYABEANS", "GROUND NUT",
  "CASTOR SEED", "SESAME SEED", "CUMMIN", "CORIANDAR"
];

const CropPricePrediction: React.FC = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCommodity, setSelectedCommodity] = useState("All Commodities");
  const [priceData, setPriceData] = useState<PriceData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/getdata", {
        state: selectedState,
        commodity: selectedCommodity
      });
      setPriceData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPriceData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card-brutal bg-white w-full max-w-5xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-accent border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#111]">
            <TrendingUp className="text-black" size={24} />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl">Live Crop Prices</h2>
        </div>
        <p className="font-semibold text-black/70 mb-8">
          Get real-time agricultural commodity prices from APMCs across India.
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-bold mb-2 text-sm">Select State</label>
            <select
              className="input-brutal cursor-pointer"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {STATES.map(state => <option key={state}>{state}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2 text-sm">Select Commodity</label>
            <select
              className="input-brutal cursor-pointer"
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              {COMMODITIES.map(commodity => <option key={commodity}>{commodity}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-brutal-orange w-full md:w-auto mb-6"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={20} className="animate-spin" /> Fetching...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search size={20} /> Get Market Prices
            </span>
          )}
        </button>

        {/* No Data */}
        {priceData !== null && priceData.length === 0 && !loading && (
          <div className="p-5 bg-red-soft/15 border-brutal rounded-xl text-center">
            <p className="font-bold text-red-600">No price data available for the selected criteria.</p>
          </div>
        )}

        {/* Results Table */}
        {priceData && priceData.length > 0 && (
          <div className="overflow-x-auto border-brutal rounded-xl reveal">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-black text-cream font-heading text-base">
                  <th className="px-4 py-3">APMC</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Commodity</th>
                  <th className="px-4 py-3 text-green-light">Min ₹</th>
                  <th className="px-4 py-3 text-yellow-soft">Modal ₹</th>
                  <th className="px-4 py-3 text-orange-accent">Max ₹</th>
                </tr>
              </thead>
              <tbody>
                {priceData.map((entry, idx) => (
                  <tr key={idx} className={`border-t-2 border-black/10 transition-colors hover:bg-yellow-soft/20 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-cream'
                  }`}>
                    <td className="px-4 py-3">{entry["APMC's"]}</td>
                    <td className="px-4 py-3">{entry.State}</td>
                    <td className="px-4 py-3 font-bold">{entry.Commodity}</td>
                    <td className="px-4 py-3 font-bold text-green-primary">{entry["Min Price"]}</td>
                    <td className="px-4 py-3 font-bold text-orange-accent">{entry["Modal Price"]}</td>
                    <td className="px-4 py-3 font-bold text-red-soft">{entry["Max Price"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPricePrediction;
