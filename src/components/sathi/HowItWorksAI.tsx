"use client";

import { Upload, Cpu, TrendingUp } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Upload & Ask",
    desc: "Click a picture of your crop or type your question in AgriBot.",
    icon: Upload,
    color: "bg-[#FFE066]",
  },
  {
    num: "02",
    title: "AI Analysis",
    desc: "Our machine learning models instantly analyze the data to find issues.",
    icon: Cpu,
    color: "bg-[#74C69D]",
  },
  {
    num: "03",
    title: "Boost Yield",
    desc: "Get actionable advice and buy recommended products from Dukaan.",
    icon: TrendingUp,
    color: "bg-[#FF6B6B]",
  },
];

export default function HowItWorksAI() {
  return (
    <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto w-full relative border-t-3 border-black bg-cream">
      {/* Decorative Sparkle */}
      <svg className="absolute top-12 right-10 w-8 h-8 text-orange-accent animate-spin-slow hidden md:block" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
      </svg>

      <div className="text-center mb-16 reveal">
        <h3 className="font-heading text-4xl md:text-5xl mb-4">How It Works</h3>
        <p className="font-bold text-gray-700 max-w-xl mx-auto text-lg">
          Smart farming in three incredibly simple steps. No technical knowledge required.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-24 right-24 h-1 bg-black/20 -z-10 border-t-2 border-dashed border-black" />

        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center text-center reveal group" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className={`w-24 h-24 ${step.color} border-3 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_#111] mb-6 z-10 transition-transform group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_0px_#111]`}>
                <Icon size={40} className="text-black" />
              </div>
              <div className="bg-white border-2 border-black rounded-full px-4 py-1 font-heading text-xl shadow-[2px_2px_0px_0px_#111] mb-4">
                Step {step.num}
              </div>
              <h4 className="font-heading text-2xl mb-3">{step.title}</h4>
              <p className="font-semibold text-black/70 max-w-xs">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
