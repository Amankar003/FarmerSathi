import React, { useState } from "react";
import axios from "axios";

interface PriceData {
  State: string;
  "APMC's": string;
  Commodity: string;
  "Min Price": string;
  "Modal Price": string;
  "Max Price": string;
}

const CropPricePrediction: React.FC = () => {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCommodity, setSelectedCommodity] = useState("All Commodities");
  const [priceData, setPriceData] = useState<PriceData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const states = [
    "All States", "ANDHRA PRADESH", "CHHATTISGARH", "GUJARAT", "HARYANA", "HIMACHAL PRADESH",
    "JAMMU AND KASHMIR", "KARNATAKA", "MADHYA PRADESH", "MAHARASHTRA", "NAGALAND", "ODISHA",
    "PUNJAB", "RAJASTHAN", "TAMIL NADU", "TELANGANA", "TRIPURA", "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL"
  ];

  const commodities = [
    "All Commodities", "MOUSAMBI", "CHILLI-5", "CHILLI-TEJA", "CHILLI-THAALU", "CHILLI BADIGA", "CHILLI-334",
    "CHILLI -SHARK 1", "CHILLI- ARMOUR", "CHILLI-4884", "CHILLI-341", "CHILLI-DEVANURU DELUX", "CHILLI-273",
    "TOMATO", "TURMERIC BULB", "GROUND NUT", "TURMERIC FINGER", "CABBAGE", "BEANS -CLUSTER", "POTATO", "BRINJAL",
    "CAULIFLOWER", "GREEN CHILLI", "RIDGE GOURD (TURAI)", "LEMON", "BANANA BHUSHAVALI", "BANANA KARPURA",
    "BANANA WHITE CHAKRAKELI", "BANANA AMRUTHAPANI", "BANANA BONTHA", "BANANA RED CHAKRAKELI", "SWARNA PADDY",
    "PADDY COMMON", "PADDY IR64 NEW", "MAHUA", "PADDY-IR.64", "PADDY-MTU 1010", "CHANA (BENGAL GRAM)", "WHEAT",
    "PADDY-MAHAMAYA", "PADDY-BPT", "PADDY SAMBA MASURI", "CHANA GRAM", "MASOOR", "COTTON", "ONION",
    "BANANA ANNAN", "MANGO", "CHILLIES", "GRAPES", "PAPAYA", "MUSTARD SEED", "ISABGOL", "BHINDI (LADIES FINGER)",
    "BOTTLE GOURDE", "BOTTLE GOURD", "CHIKOOS", "JOWAR", "CASTOR SEED", "BAJRA", "PADDY LOCAL", "TUR/ARHAR-WHITE",
    "TUR/ARHAR", "CHANA (BENGAL GRAM)-DESI", "CORIANDAR", "GREEN GRAM LOCAL", "CUMMIN", "SOUNF",
    "SOYA SEEDS (WHITE)", "SOYABEANS", "SESAME SEED", "PADDY 6444", "POINTED GOURD (PARWAL)", "ONION RED",
    "ONION WHITE", "AMERICAN-COTTON", "BARLEY (JAU)", "GUAR SEEDS", "MUSTARD", "POMEGRANATE", "PUMPKIN",
    "PEAS GREEN", "SPONGE GOURD", "SWEET LEMON (MOSAMBI)", "APPLE", "CUCUMBER", "MUSK MELON", "PLUM",
    "WATER MELON", "SPINACH (PALAK)", "GINGER", "SQUASH", "CAPSICUM", "CORIANDER LEAVES", "LADY FINGER", "PEACH",
    "FRENCH BEAN", "GARLIC", "CARROT"
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        state: selectedState,
        commodity: selectedCommodity
      };
      // Placeholder for your actual price API
      const response = await axios.post("http://localhost:5000/getdata", payload);
      setPriceData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPriceData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-[2rem]">
      <div className="glass-card p-12 w-full max-w-5xl text-center">
        <h2 className="section-title text-white">
          Live Crop Prices
        </h2>
        <p className="section-subtitle mx-auto mb-10">
          Get real-time agricultural commodity prices from APMCs across India to make informed trading decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="flex flex-col text-left gap-3">
            <label className="text-[1.5rem] text-gray-300 font-medium">Select State</label>
            <select
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all cursor-pointer"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {states.map(state => <option className="bg-[#0B1D0F]" key={state}>{state}</option>)}
            </select>
          </div>

          <div className="flex flex-col text-left gap-3">
            <label className="text-[1.5rem] text-gray-300 font-medium">Select Commodity</label>
            <select
              className="bg-[rgba(255,255,255,0.04)] border border-[rgba(82,183,136,0.3)] text-white text-[1.5rem] rounded-xl p-4 focus:outline-none focus:border-[#E9C46A] transition-all cursor-pointer"
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              {commodities.map(commodity => <option className="bg-[#0B1D0F]" key={commodity}>{commodity}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full md:w-auto px-12 py-4 mb-10 disabled:opacity-70"
        >
          {loading ? "Fetching Prices..." : "Get Market Prices"}
        </button>

        {priceData !== null && priceData.length === 0 && !loading && (
          <div className="p-6 rounded-xl bg-[rgba(255,0,0,0.1)] border border-[rgba(255,0,0,0.2)]">
            <p className="text-red-400 font-medium text-[1.6rem]">No price data available for the selected criteria at this moment.</p>
          </div>
        )}

        {priceData && priceData.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-[rgba(82,183,136,0.2)]">
            <table className="table-auto w-full text-left border-collapse text-[1.4rem]">
              <thead className="bg-[rgba(45,106,79,0.5)] text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold border-b border-[rgba(82,183,136,0.2)]">APMC</th>
                  <th className="px-6 py-4 font-semibold border-b border-[rgba(82,183,136,0.2)]">State</th>
                  <th className="px-6 py-4 font-semibold border-b border-[rgba(82,183,136,0.2)]">Commodity</th>
                  <th className="px-6 py-4 font-semibold border-b border-[rgba(82,183,136,0.2)] text-[#95D5B2]">Min Price (₹)</th>
                  <th className="px-6 py-4 font-semibold border-b border-[rgba(82,183,136,0.2)] text-[#E9C46A]">Modal Price (₹)</th>
                  <th className="px-6 py-4 font-semibold border-b border-[rgba(82,183,136,0.2)] text-[#D4A373]">Max Price (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(82,183,136,0.1)]">
                {priceData.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                    <td className="px-6 py-4 text-gray-300">{entry["APMC's"]}</td>
                    <td className="px-6 py-4 text-gray-300">{entry.State}</td>
                    <td className="px-6 py-4 font-medium text-white">{entry.Commodity}</td>
                    <td className="px-6 py-4 text-[#95D5B2]">{entry["Min Price"]}</td>
                    <td className="px-6 py-4 font-bold text-[#E9C46A]">{entry["Modal Price"]}</td>
                    <td className="px-6 py-4 text-[#D4A373]">{entry["Max Price"]}</td>
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
