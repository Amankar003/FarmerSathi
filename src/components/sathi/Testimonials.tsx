"use client";

import { Star, Quote, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ramesh Singh",
    location: "Ludhiana, Punjab",
    crop: "Wheat & Mustard (12 Acres)",
    text: "FarmerSathi's disease detection saved my wheat crop from yellow rust. I uploaded a single photo, and within 3 seconds it told me the exact fungicide and dosage. Saved me at least ₹45,000 in potential losses!",
    rating: 5,
    tag: "Saved ₹45,000",
    color: "bg-[#FFE066]",
  },
  {
    name: "Suresh Patel",
    location: "Rajkot, Gujarat",
    crop: "Cotton & Groundnut (8 Acres)",
    text: "AgriBot is incredible. It answers my questions in Gujarati and Hindi anytime I'm out in the field. When my cotton had bollworm, its remedy stopped the spread immediately. Feels like a free scientist on call.",
    rating: 5,
    tag: "24/7 AgriBot User",
    color: "bg-white",
  },
  {
    name: "Anand Kumar",
    location: "Muzaffarpur, Bihar",
    crop: "Paddy & Maize (6 Acres)",
    text: "The live APMC mandi prices help me negotiate with local traders without getting cheated. Plus, Dukaan delivered certified bio-fertilizers straight to our village post office with Cash on Delivery.",
    rating: 5,
    tag: "Genuine Dukaan Supplies",
    color: "bg-[#74C69D]",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-20 px-4 bg-green-primary border-t-3 border-black relative overflow-hidden">
      {/* Background Subtle Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "28px 28px" }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-3 bg-white px-3.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#111] transform -rotate-1">
              <span className="font-bold text-xs uppercase tracking-wider text-black">🌾 Kisaan Ki Awaaz</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white">
              Real Stories from <span className="text-yellow-soft underline decoration-black decoration-wavy decoration-2">Indian Farmlands</span>
            </h2>
            <p className="font-semibold text-white/90 text-base md:text-lg mt-2 max-w-xl">
              See how modern AI tools and certified agricultural inputs are transforming yields for smallholder farmers.
            </p>
          </div>

          <div className="bg-yellow-soft border-3 border-black rounded-2xl p-4 shadow-[5px_5px_0px_0px_#111] transform rotate-2 shrink-0">
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-black text-black" />
              ))}
            </div>
            <p className="font-heading text-base text-black">10,000+ Active Farmers</p>
            <p className="text-xs font-bold text-black/70">4.9 / 5 Average Satisfaction</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={idx} 
              className={`card-brutal ${testimonial.color} reveal flex flex-col justify-between border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#111] hover:shadow-[8px_8px_0px_0px_#111] hover:-translate-y-1 transition-all`}
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div>
                {/* Header within Card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-orange-accent text-orange-accent stroke-black stroke-2" />
                    ))}
                  </div>
                  <span className="bg-white/80 border border-black text-[11px] font-bold px-2 py-0.5 rounded-full text-black">
                    {testimonial.tag}
                  </span>
                </div>

                <div className="relative mb-6">
                  <Quote size={28} className="text-black/15 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="font-bold text-base md:text-lg text-black leading-relaxed relative z-10 pl-2">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
              
              {/* Farmer Info */}
              <div className="flex items-center gap-3 pt-4 border-t-2 border-black/15">
                <div className="w-11 h-11 bg-black text-white rounded-full border-2 border-black flex items-center justify-center font-heading text-xl shadow-[2px_2px_0px_0px_#FFE066]">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-heading text-base leading-none text-black truncate">{testimonial.name}</h4>
                    <CheckCircle2 size={14} className="text-green-700 shrink-0 fill-green-100" />
                  </div>
                  <p className="text-xs text-black/70 font-semibold truncate mt-0.5">{testimonial.location}</p>
                  <p className="text-[11px] text-black/50 font-medium truncate">{testimonial.crop}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
