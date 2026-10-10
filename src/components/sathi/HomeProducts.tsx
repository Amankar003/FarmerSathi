"use client";

import { useState } from "react";
import { productdata } from "@/app/data/productdata";
import ProductCard from "@/components/ProductCard";
import { 
  ArrowRight, 
  Store, 
  Truck, 
  ShieldCheck, 
  Banknote, 
  Sparkles,
  Tag
} from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { id: "all", label: "🌾 All Products" },
  { id: "organic", label: "🌱 Organic Compost" },
  { id: "chemical", label: "⚡ High Nitrogen & DAP" },
  { id: "nutrition", label: "🧪 Plant Nutrition" },
];

const PERKS = [
  { icon: Truck, title: "Doorstep Farm Delivery", desc: "Delivered directly to 40,000+ pin codes" },
  { icon: ShieldCheck, title: "100% Certified Authentic", desc: "Direct from verified agri cooperatives" },
  { icon: Banknote, title: "Cash On Delivery (COD)", desc: "Pay only after inspecting your bag" },
  { icon: Sparkles, title: "AI Dosage Advisory", desc: "Custom spray guidance with every order" },
];

export default function HomeProducts() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter products based on selected category
  const filteredProducts = productdata.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "organic") {
      return item.productname.toLowerCase().includes("organic") || item.productname.toLowerCase().includes("vermi");
    }
    if (activeCategory === "chemical") {
      return item.productname.toLowerCase().includes("dap") || item.productname.toLowerCase().includes("urea") || item.productname.toLowerCase().includes("npk");
    }
    if (activeCategory === "nutrition") {
      return item.productname.toLowerCase().includes("bone") || item.productname.toLowerCase().includes("stick") || item.productname.toLowerCase().includes("plant food");
    }
    return true;
  }).slice(0, 4);

  return (
    <section className="w-full py-20 px-4 bg-[#F4F9F2] border-t-3 border-black relative overflow-hidden">
      
      {/* Decorative Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#111 2px, transparent 2px)", 
          backgroundSize: "28px 28px" 
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 reveal">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 bg-yellow-soft px-3.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#111] transform -rotate-1">
              <Store size={16} className="text-black" />
              <span className="font-bold text-xs uppercase tracking-wider text-black">FarmerSathi Dukaan (दुकान)</span>
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl text-black">
              Top Recommended <span className="text-green-primary">Agri Supplies</span>
            </h2>
            
            <p className="font-medium text-black/70 text-base md:text-lg mt-2 max-w-2xl">
              Certified seeds, organic compost, and fertilizers chosen to match your soil health. Genuine quality with AI prescription assistance.
            </p>
          </div>
          
          <button 
            onClick={() => router.push("/products")}
            className="btn-brutal bg-white hover:bg-yellow-soft text-black shrink-0 hidden md:flex items-center gap-2 shadow-[4px_4px_0px_0px_#111] text-base cursor-pointer"
          >
            Explore Full Dukaan (50+ Items) <ArrowRight size={18} />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm border-2 border-black whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-black text-white shadow-[3px_3px_0px_0px_#F59F00] -translate-y-0.5"
                  : "bg-white text-black hover:bg-cream shadow-[2px_2px_0px_0px_#111]"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <div className="ml-auto hidden lg:flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-100 border border-green-300 px-3 py-1.5 rounded-lg">
            <Tag size={14} /> Season Sale: Up to 30% OFF
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {filteredProducts.map((product, idx) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                id={product.id}
                name={product.productname}
                description={product.desc}
                price={product.price}
                image={product.img}
                rating={4.8}
                reviews={80 + (idx * 17)}
                badge={idx === 0 ? "Best Seller" : idx === 1 ? "Govt. Approved" : "AI Choice"}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden reveal">
          <button 
            onClick={() => router.push("/products")}
            className="btn-brutal bg-white text-black w-full text-base py-3 shadow-[4px_4px_0px_0px_#111]"
          >
            Explore Full Dukaan <ArrowRight className="ml-2" size={18} />
          </button>
        </div>

        {/* Trust & Guarantee Banner Bar */}
        <div className="mt-14 bg-white border-3 border-black rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#111] reveal">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-yellow-soft/50 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#111]">
                    <Icon size={22} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-black">{perk.title}</h4>
                    <p className="text-xs text-black/60 font-medium mt-0.5 leading-snug">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
