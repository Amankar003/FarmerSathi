"use client";

import { useState } from "react";
import { 
  Plus, 
  Minus, 
  Search, 
  MessageCircle, 
  Sparkles, 
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Bot
} from "lucide-react";
import { useRouter } from "next/navigation";

interface FAQItem {
  id: number;
  category: "all" | "ai" | "agribot" | "dukaan";
  badge: string;
  q: string;
  a: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 1,
    category: "ai",
    badge: "100% Free",
    q: "Do I need to pay any subscription fee to use FarmerSathi AI?",
    a: "No! All core FarmerSathi features—including KrishiLab crop disease diagnosis, yield prediction models, and the 24/7 AgriBot assistant—are completely free of cost for all farmers across India. Our mission is to democratize modern agronomy for every kisaan.",
  },
  {
    id: 2,
    category: "ai",
    badge: "KrishiLab",
    q: "How accurate is the KrishiLab crop disease detection?",
    a: "Our deep learning vision model is trained on over 500,000+ validated plant leaf datasets covering 80+ crop diseases common in Indian agriculture. It achieves an accuracy rate exceeding 95% under standard natural sunlight. For best results, capture a clear close-up of both infected and healthy leaf portions.",
  },
  {
    id: 3,
    category: "agribot",
    badge: "AgriBot",
    q: "Which languages and dialects does AgriBot understand?",
    a: "AgriBot natively supports Hindi, English, Hinglish, Punjabi, and Marathi. You can write your questions naturally or speak via voice input. The AI understands regional farming terminologies, local crop varieties, and seasonal pest names.",
  },
  {
    id: 4,
    category: "dukaan",
    badge: "Dukaan",
    q: "How does product delivery work on FarmerSathi Dukaan?",
    a: "Products ordered through Dukaan are fulfilled directly by verified agricultural cooperatives and licensed seed suppliers. We offer doorstep farm delivery covering over 40,000 Indian pin codes, with Cash on Delivery (COD) available so you only pay after physical inspection.",
  },
  {
    id: 5,
    category: "ai",
    badge: "Connectivity",
    q: "Does FarmerSathi work smoothly on slow 2G/3G mobile internet in villages?",
    a: "Yes! The entire FarmerSathi web platform is engineered with ultra-lightweight asset payloads and progressive caching. Even in remote farmland areas with spotty 2G or 3G signal, diagnosis results and mandi rates load within seconds.",
  },
  {
    id: 6,
    category: "dukaan",
    badge: "Mandi & Prices",
    q: "How frequently are APMC mandi rates updated?",
    a: "Our mandi commodity tickers are synchronized daily with official government APMC databases (Agmarknet) across states including Punjab, Haryana, UP, MP, Maharashtra, and Bihar. You get verified minimum, maximum, and modal prices.",
  },
  {
    id: 7,
    category: "dukaan",
    badge: "Quality Guarantee",
    q: "Are the seeds and fertilizers on Dukaan certified original?",
    a: "Every product listed on FarmerSathi Dukaan undergoes mandatory batch testing and certification checks. We do not allow counterfeit or unverified brands. You receive 100% genuine products with expiry dates clearly stamped.",
  },
  {
    id: 8,
    category: "agribot",
    badge: "Dosage Advisory",
    q: "How does the AI determine the correct fertilizer dosage?",
    a: "When you share your land area (in bigha or acres) and crop stage, AgriBot and KrishiLab calculate customized NPK and micronutrient recommendations based on ICAR agronomy guidelines, preventing both under-fertilization and costly over-application.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "ai", label: "KrishiLab & AI" },
  { id: "agribot", label: "AgriBot Chat" },
  { id: "dukaan", label: "Dukaan & Orders" },
];

export default function FAQ() {
  const router = useRouter();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFAQs = FAQ_LIST.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    const matchesSearch = 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="w-full py-20 px-4 bg-cream border-t-3 border-black relative overflow-hidden">
      
      {/* Decorative background icons */}
      <div className="absolute top-12 right-8 text-8xl opacity-5 select-none pointer-events-none hidden lg:block">❓</div>
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Grid: Left Sticky Column + Right Interactive Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28 reveal">
            
            <div>
              <div className="inline-flex items-center gap-2 mb-3 bg-yellow-soft px-3.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#111] transform -rotate-1">
                <HelpCircle size={16} className="text-black" />
                <span className="font-bold text-xs uppercase tracking-wider text-black">Questions & Answers</span>
              </div>
              
              <h2 className="font-heading text-4xl sm:text-5xl text-black leading-tight">
                Got Questions? <br />
                <span className="text-orange-accent">We’ve Got Clear Answers.</span>
              </h2>

              <p className="font-medium text-black/70 text-base md:text-lg mt-3 leading-relaxed">
                Everything you need to know about our free AI tools, KrishiLab leaf scanning accuracy, and ordering from Dukaan.
              </p>
            </div>

            {/* Kisaan Help Box */}
            <div className="bg-white border-3 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_#111]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-primary border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#111]">
                  <Bot size={22} />
                </div>
                <div>
                  <h4 className="font-heading text-lg leading-none">Need Instant Help?</h4>
                  <p className="text-xs font-semibold text-green-700 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    AgriBot is live and ready
                  </p>
                </div>
              </div>

              <p className="text-xs text-black/70 font-medium mb-4 leading-relaxed">
                Have an urgent disease on your farm or need specific dosage calculations? Ask our AI assistant right now in your language.
              </p>

              <button
                onClick={() => router.push("/agribot")}
                className="w-full btn-brutal-green text-sm py-2.5 flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#111] cursor-pointer"
              >
                Ask AgriBot Directly <ArrowRight size={16} />
              </button>
            </div>

            {/* Quick Guarantee */}
            <div className="bg-yellow-soft/40 border-2 border-black rounded-xl p-4 flex items-center gap-3">
              <Sparkles className="text-orange-accent shrink-0" size={24} />
              <p className="text-xs font-bold text-black/80">
                100% Free Forever for Indian Farmers. No hidden fees or payment required for AI tools.
              </p>
            </div>

          </div>

          {/* Right Column: Search + Category Pills + Accordion (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 reveal">
            
            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. 'pricing', 'accuracy', 'languages')..."
                className="w-full bg-white border-3 border-black rounded-xl py-3 pl-11 pr-4 font-semibold text-sm shadow-[3px_3px_0px_0px_#111] focus:outline-none focus:ring-2 focus:ring-green-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-black/60 hover:text-black px-1.5 py-0.5 bg-gray-100 rounded border border-black/20"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-bold text-xs border-2 border-black whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === cat.id
                      ? "bg-black text-white shadow-[2px_2px_0px_0px_#FFE066]"
                      : "bg-white text-black hover:bg-yellow-soft/30 shadow-[1px_1px_0px_0px_#111]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion Cards */}
            <div className="flex flex-col gap-3.5 mt-2">
              {filteredFAQs.length === 0 ? (
                <div className="bg-white border-2 border-black rounded-xl p-8 text-center shadow-[4px_4px_0px_0px_#111]">
                  <p className="font-heading text-xl text-black mb-1">No matching questions found</p>
                  <p className="text-xs text-black/60 font-medium">Try searching for other terms or ask AgriBot directly.</p>
                </div>
              ) : (
                filteredFAQs.map((faq, idx) => {
                  const isOpen = openIdx === faq.id;
                  return (
                    <div 
                      key={faq.id} 
                      className={`border-3 border-black rounded-2xl overflow-hidden transition-all duration-200 ${
                        isOpen 
                          ? "bg-white shadow-[6px_6px_0px_0px_#111] translate-x-[-2px] translate-y-[-2px]" 
                          : "bg-white hover:bg-yellow-soft/10 shadow-[4px_4px_0px_0px_#111]"
                      }`}
                    >
                      <button 
                        className="w-full px-5 py-4.5 flex items-start justify-between font-bold text-left gap-4 focus:outline-none cursor-pointer"
                        onClick={() => setOpenIdx(isOpen ? null : faq.id)}
                      >
                        <div className="flex flex-col gap-1.5">
                          <span className="inline-block self-start bg-yellow-soft/80 border border-black text-black font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                            {faq.badge}
                          </span>
                          <span className="font-heading text-base md:text-lg text-black leading-snug">
                            {faq.q}
                          </span>
                        </div>
                        
                        <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                          isOpen ? "bg-orange-accent text-black rotate-180" : "bg-cream text-black"
                        }`}>
                          {isOpen ? <Minus size={18} className="stroke-3" /> : <Plus size={18} className="stroke-3" />}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t-2 border-black/10">
                          <p className="text-black/80 font-medium text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
