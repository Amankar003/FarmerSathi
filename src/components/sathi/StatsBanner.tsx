"use client";

import { Leaf, Droplet, Sun, Wind, Sprout, Globe2, ShieldCheck, CheckCircle2 } from "lucide-react";

const STATS = [
  { value: "98%", label: "AI Accuracy", icon: Sprout },
  { value: "10,000+", label: "Farmers Joined", icon: Sun },
  { value: "50+", label: "Crops Supported", icon: Leaf },
  { value: "24/7", label: "AgriBot Support", icon: Wind },
  { value: "Live", label: "APMC Prices", icon: Droplet },
  { value: "12+", label: "Regional Languages", icon: Globe2 },
  { value: "₹0", label: "Platform Fee", icon: ShieldCheck },
  { value: "100%", label: "Certified Inputs", icon: CheckCircle2 },
];

export default function StatsBanner() {
  return (
    <section className="bg-black py-8 md:py-12 border-y-4 border-black relative overflow-hidden flex items-center">
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrolling-wrapper {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .scrolling-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Adding a subtle gradient mask for fade effect on edges */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: 'linear-gradient(90deg, #111 0%, transparent 10%, transparent 90%, #111 100%)'
      }}></div>

      <div className="scrolling-wrapper flex gap-6 md:gap-10 px-4 md:px-5">
        {/* We double the array to create a seamless infinite loop */}
        {[...STATS, ...STATS, ...STATS].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border-4 border-black rounded-2xl p-6 flex flex-col items-center justify-center min-w-[220px] shadow-[6px_6px_0px_0px_#F59F00] transition-transform transform hover:-translate-y-2 cursor-pointer">
              <Icon size={36} className="text-black mb-3" />
              <h4 className="font-heading text-4xl md:text-5xl mb-1">{stat.value}</h4>
              <p className="font-bold text-sm uppercase tracking-wider text-black/70 text-center">{stat.label}</p>
            </div>
          );
        })}
      </div>
      
    </section>
  );
}
