"use client";
import { useSearchParams, useRouter } from "next/navigation";
import CropPricePrediction from "./LiveCrop";
import CropYield from "./CropYield";
import CropDisease from "./CropDisease ";
import { Scan, Sprout, TrendingUp, ArrowRight } from "lucide-react";

const TABS = [
  { id: "disease", label: "Crop Disease", icon: Scan, color: "#2F9E44", desc: "AI-powered leaf scanning" },
  { id: "yield", label: "Yield Prediction", icon: Sprout, color: "#F59F00", desc: "Smart soil analysis" },
  { id: "pricing", label: "Live Pricing", icon: TrendingUp, color: "#FF6B6B", desc: "Real-time APMC data" },
];

const Playground = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedComponent = searchParams.get("component") || "disease";

  const handleClick = (component: string) => {
    router.push(`?component=${component}`);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "yield":
        return <CropYield />;
      case "disease":
        return <CropDisease />;
      case "pricing":
        return <CropPricePrediction />;
      default:
        return <CropDisease />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
      
      {/* Premium Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedComponent === tab.id;
          return (
            <button
              key={tab.id}
              className={`relative rounded-2xl border-4 border-black p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? "bg-black text-white shadow-none translate-x-[3px] translate-y-[3px]"
                  : "bg-white text-black shadow-[6px_6px_0px_0px_#111] hover:shadow-[8px_8px_0px_0px_#111] hover:-translate-y-1"
              }`}
              onClick={() => handleClick(tab.id)}
            >
              <div
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all ${
                  isActive ? "bg-white border-white/30" : "border-black"
                }`}
                style={{ backgroundColor: isActive ? tab.color : undefined }}
              >
                <Icon size={28} className={isActive ? "text-white" : "text-black"} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-xl leading-tight">{tab.label}</h4>
                <p className={`text-xs font-bold mt-0.5 ${isActive ? "text-white/70" : "text-black/50"}`}>
                  {tab.desc}
                </p>
              </div>
              <ArrowRight size={20} className={`shrink-0 transition-transform ${isActive ? "translate-x-1 text-white/60" : "text-black/30"}`} />
            </button>
          );
        })}
      </div>

      {/* Active Tab Indicator */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: TABS.find(t => t.id === selectedComponent)?.color }} />
        <span className="font-bold text-sm text-black/60 uppercase tracking-wider">
          {TABS.find(t => t.id === selectedComponent)?.label} — Active
        </span>
        <div className="flex-1 h-0.5 bg-black/10 rounded-full" />
      </div>

      {/* Component View */}
      <div className="reveal">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Playground;
