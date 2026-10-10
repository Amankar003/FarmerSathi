"use client";

import { Sprout, Bug, Bot } from "lucide-react";
import Link from "next/link";

const TOOLS = [
  {
    id: "disease",
    title: "Crop Disease Detection",
    desc: "Upload plant images to identify issues early and get practical treatment guidance.",
    icon: Bug,
    link: "/krishilab?component=disease",
    color: "bg-[#FFE066]",
  },
  {
    id: "yield",
    title: "Yield Forecast",
    desc: "Understand expected output based on soil, weather, and crop conditions before planting.",
    icon: Sprout,
    link: "/krishilab?component=yield",
    color: "bg-[#74C69D]",
  },
  {
    id: "agribot",
    title: "AgriBot Assistant",
    desc: "Ask farming questions anytime and get quick, relevant guidance in your own language.",
    icon: Bot,
    link: "/agribot",
    color: "bg-white",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-4 py-16 max-w-6xl mx-auto w-full reveal relative">
      <h3 className="font-heading text-4xl md:text-5xl mb-4 text-center">Smart Farming Support</h3>
      <p className="text-center font-bold text-gray-700 mb-10 max-w-2xl mx-auto">
        FarmerSaathi brings the tools that matter most to farmers into one simple platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.id} href={tool.link} className={`card-brutal ${tool.color} hover:-translate-y-2 transition-transform duration-300 flex flex-col items-start gap-4 cursor-pointer relative overflow-hidden group`}>
              <div className="bg-white border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_#111]">
                <Icon size={32} className="text-black" />
              </div>
              <div>
                <h4 className="font-heading text-2xl mb-2">{tool.title}</h4>
                <p className="font-semibold text-black/80">{tool.desc}</p>
              </div>
              <div className="mt-auto pt-4 flex items-center gap-2 font-bold uppercase tracking-wider text-sm group-hover:underline">
                Try Now &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
