"use client";

import { useState } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCheck, 
  Languages, 
  Mic, 
  Volume2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Wifi,
  Battery
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  tags?: string[];
  audioNote?: boolean;
}

const SAMPLE_CONVERSATIONS: Record<string, { prompt: string; label: string; botReply: string; tags: string[] }[]> = {
  hindi: [
    {
      label: "🌾 गेहूँ के पीले पत्ते",
      prompt: "गेहूँ की पत्तियों में पीलापन आ रहा है, क्या समाधान है?",
      botReply: "नमस्ते किसान भाई! गेहूँ में पीलापन मुख्य रूप से नाइट्रोजन या जिंक की कमी से होता है। 1) प्रति एकड़ 25-30 किग्रा यूरिया की टॉप ड्रेसिंग करें। 2) 0.5% जिंक सल्फेट (21%) + 2.5 किग्रा यूरिया का 100 लीटर पानी में छिड़काव करें। KrishiLab में फोटो भेजकर सटीक जांच भी कर सकते हैं!",
      tags: ["नाइट्रोजन कमी", "जिंक सल्फेट", "KrishiLab"]
    },
    {
      label: "🐛 धान में तना छेदक",
      prompt: "धान की फसल में तना छेदक (Stem Borer) का प्रकोप है, क्या करें?",
      botReply: "तना छेदक के लिए कार्टाप हाइड्रोक्लोराइड 4% GR 7-8 किग्रा प्रति एकड़ खेत में बालू के साथ मिलाकर डालें, या क्लोरेंट्रानिलिप्रोल (Coragen) 60 मिली प्रति एकड़ 150 लीटर पानी में मिलाकर स्प्रे करें।",
      tags: ["कीट नियंत्रण", "धान सुरक्षा"]
    },
    {
      label: "🌧️ बारिश में खाद प्रबंधन",
      prompt: "क्या बारिश के मौसम में खेत में यूरिया डालना सही है?",
      botReply: "हल्की नमी में यूरिया डालना लाभदायक है, परंतु भारी बारिश या खेत में पानी भरा होने पर यूरिया न डालें, अन्यथा बहकर नष्ट हो जाएगा। जल निकासी के बाद ही खाद का प्रयोग करें।",
      tags: ["खाद प्रबंधन", "मौसम सलाह"]
    },
    {
      label: "💧 टमाटर में ड्रिप सिंचाई",
      prompt: "टमाटर में ड्रिप सिंचाई का सही समय और अवधि क्या है?",
      botReply: "टमाटर की फसल में सुबह 7 से 9 बजे के बीच 45-60 मिनट ड्रिप चलाएं। मिट्टी में 70% नमी बनाए रखें, फूल आने के समय अधिक पानी देने से बचें।",
      tags: ["ड्रिप सिंचाई", "सब्जी देखभाल"]
    }
  ],
  english: [
    {
      label: "🌾 Yellow Wheat Leaves",
      prompt: "My wheat crop leaves are turning yellow, what should I do?",
      botReply: "Hello Kisan brother! Yellowing in wheat is mostly caused by Nitrogen or Zinc deficiency. 1) Top dress with 25-30 kg Urea per acre. 2) Foliar spray of 0.5% Zinc Sulphate (21%) + 2.5 kg Urea in 100L water. You can also upload a photo on KrishiLab for AI disease scanning!",
      tags: ["Nitrogen Deficiency", "Zinc Sulphate", "KrishiLab"]
    },
    {
      label: "🐛 Pest in Paddy",
      prompt: "Paddy crop is infected by stem borer. Immediate solution?",
      botReply: "For stem borer, apply Cartap Hydrochloride 4% GR @ 7-8 kg/acre or spray Chlorantraniliprole 18.5% SC @ 60ml in 150L water per acre during morning hours for best results.",
      tags: ["Pest Control", "Paddy Care"]
    },
    {
      label: "🌧️ Fertilizer in Rain",
      prompt: "Should I apply urea fertilizer during rainy days?",
      botReply: "Light moisture is great, but avoid applying urea during heavy rains or flooded fields to prevent leaching. Apply only after proper drainage.",
      tags: ["Fertilizer Guide", "Weather Tips"]
    },
    {
      label: "💧 Drip Irrigation Timing",
      prompt: "What is the optimal drip irrigation schedule for tomato?",
      botReply: "For tomato crops in loamy soil, run drip irrigation for 45-60 minutes every alternate day during morning hours (7-9 AM). Maintain 70% soil moisture.",
      tags: ["Drip Irrigation", "Tomato Care"]
    }
  ]
};

export default function AgriBotPreview() {
  const router = useRouter();
  const [lang, setLang] = useState<"hindi" | "english">("hindi");
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "user",
      text: "गेहूँ की पत्तियों में पीलापन आ रहा है, क्या समाधान है?",
      time: "09:41 AM"
    },
    {
      id: "2",
      sender: "bot",
      text: "नमस्ते किसान भाई! गेहूँ में पीलापन मुख्य रूप से नाइट्रोजन या जिंक की कमी से होता है। 1) प्रति एकड़ 25-30 किग्रा यूरिया की टॉप ड्रेसिंग करें। 2) 0.5% जिंक सल्फेट का छिड़काव करें। KrishiLab में फोटो भेजकर सटीक जांच भी कर सकते हैं!",
      time: "09:41 AM",
      tags: ["नाइट्रोजन कमी", "जिंक सल्फेट", "KrishiLab"],
      audioNote: true
    }
  ]);

  const activePrompts = SAMPLE_CONVERSATIONS[lang];

  const handleSelectPrompt = (promptItem: typeof activePrompts[0]) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: promptItem.prompt,
      time: "Just now"
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: promptItem.botReply,
        time: "Just now",
        tags: promptItem.tags,
        audioNote: true
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      time: "Just now"
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: lang === "hindi" 
          ? `मैंने आपका प्रश्न समझ लिया है: "${userText}"। हमारे एग्रोनॉमी मॉडल के अनुसार, खेत की मिट्टी में नमी स्तर जांचें और संतुलित NPK पोषक तत्वों का छिड़काव करें। अधिक गहन परामर्श के लिए AgriBot रूम में आएं!`
          : `I analyzed your query: "${userText}". Based on current agronomy models, check soil moisture levels and apply balanced NPK nutrients. Open the full AgriBot chat for detailed advisory!`,
        time: "Just now",
        tags: ["AI Advisory", "KrishiLab"]
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-cream border-t-3 border-black relative overflow-hidden">
      {/* Decorative farm elements */}
      <div className="absolute top-10 left-6 text-7xl opacity-10 select-none pointer-events-none hidden lg:block">🌱</div>
      <div className="absolute bottom-10 right-8 text-7xl opacity-10 select-none pointer-events-none hidden lg:block">🌾</div>

      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-soft border-2 border-black rounded-full font-bold text-sm shadow-[2px_2px_0px_0px_#111] mb-4 transform -rotate-1">
            <Zap size={16} className="text-black fill-yellow-soft" />
            <span className="uppercase tracking-wider">AI Powered Farm Assistant</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-black max-w-3xl leading-tight">
            Meet <span className="text-green-primary underline decoration-black decoration-wavy decoration-2">AgriBot</span>: Your 24/7 Agri Scientist
          </h2>
          <p className="font-medium text-black/70 text-base sm:text-lg md:text-xl max-w-2xl mt-3">
            Ask any agricultural question in your mother tongue. Instant, certified, and practical answers for every Indian crop.
          </p>
        </div>

        {/* 2-Column Split: Left Side Increased Breadth (lg:col-span-7) + Right Side Exact iPhone Dimensions (lg:col-span-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Increased breadth: 7 of 12 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6 reveal">
            
            {/* Value Highlights Card - Spacious & Broad */}
            <div className="bg-white border-3 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_0px_#111]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <h3 className="font-heading text-2xl sm:text-3xl text-black flex items-center gap-2">
                  <Sparkles className="text-orange-accent" size={26} /> Why Farmers Love AgriBot
                </h3>
                <span className="self-start sm:self-auto bg-green-100 text-green-800 border border-green-300 text-xs font-bold px-2.5 py-1 rounded-full">
                  100% Free Service
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2 p-3.5 bg-cream/60 border-2 border-black/15 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-green-primary/10 border-2 border-black flex items-center justify-center shrink-0">
                    <Languages size={18} className="text-green-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-black">Multilingual & Voice</h4>
                    <p className="text-xs text-black/70 font-medium mt-1 leading-snug">
                      Speaks Hindi, Hinglish, Punjabi, Gujarati & English natively with audio notes.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-3.5 bg-cream/60 border-2 border-black/15 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-yellow-soft/50 border-2 border-black flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} className="text-orange-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-black">ICAR Agronomy Validated</h4>
                    <p className="text-xs text-black/70 font-medium mt-1 leading-snug">
                      Fungicide, pesticide and fertilizer dosages strictly verified with ICAR research.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-3.5 bg-cream/60 border-2 border-black/15 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-red-soft/20 border-2 border-black flex items-center justify-center shrink-0">
                    <Zap size={18} className="text-red-soft" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-black">Instant Triage & Sync</h4>
                    <p className="text-xs text-black/70 font-medium mt-1 leading-snug">
                      Directly syncs leaf diagnosis with live APMC mandi prices and season alerts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick stats pills */}
              <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t-2 border-black/10 text-xs font-bold text-black/80">
                <span className="bg-yellow-soft/50 border border-black px-2.5 py-1 rounded-md">⚡ Instant reply in &lt;1 second</span>
                <span className="bg-green-100 border border-black px-2.5 py-1 rounded-md">🌿 80+ Crop Varieties</span>
                <span className="bg-white border border-black px-2.5 py-1 rounded-md">📱 Works on 2G/3G low data</span>
              </div>
            </div>

            {/* Interactive Prompt Simulator Bench - Broad layout */}
            <div className="bg-yellow-soft border-3 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_0px_#111]">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-primary animate-ping" />
                  <span className="font-heading text-lg sm:text-xl text-black">
                    Try Asking a Question:
                  </span>
                </div>

                {/* Language Switch */}
                <div className="flex bg-white border-2 border-black rounded-full p-0.5 text-xs font-bold shadow-[1px_1px_0px_0px_#111]">
                  <button 
                    onClick={() => setLang("hindi")}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === "hindi" ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}
                  >
                    हिंदी
                  </button>
                  <button 
                    onClick={() => setLang("english")}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer ${lang === "english" ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}
                  >
                    English
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-black/80 mb-4">
                Click any real farmer question below to test the live AI simulation on the iPhone:
              </p>

              {/* 2-Column Grid of Prompts for the increased breadth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPrompt(p)}
                    className="w-full text-left bg-white hover:bg-white/95 border-2 border-black rounded-xl p-3 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-1">{p.label}</span>
                    <ArrowRight size={14} className="text-black/50 group-hover:text-black group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => router.push("/agribot")}
                className="btn-brutal-green text-lg px-8 py-3.5 flex-1 shadow-[5px_5px_0px_0px_#111] cursor-pointer"
              >
                Launch Full AgriBot Room <ArrowRight className="ml-2" size={20} />
              </button>
              <div className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-3 border-black rounded-xl text-xs sm:text-sm font-bold shadow-[3px_3px_0px_0px_#111]">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span>1,400+ farmers online now</span>
              </div>
            </div>

          </div>

          {/* Right Column: Exact iPhone Dimensions (365px x 740px, 19.5:9 ratio, Dynamic Island, Side Buttons) */}
          <div className="lg:col-span-5 flex justify-center items-center reveal">
            
            {/* Outer iPhone Physical Housing */}
            <div className="relative select-none">
              
              {/* iPhone Hardware Side Buttons */}
              {/* Left Side: Ring/Silent Action Button */}
              <div className="absolute -left-[6px] top-24 w-[6px] h-8 bg-black rounded-l-md border-y border-l border-black/40" />
              {/* Left Side: Volume Up Button */}
              <div className="absolute -left-[6px] top-36 w-[6px] h-12 bg-black rounded-l-md border-y border-l border-black/40" />
              {/* Left Side: Volume Down Button */}
              <div className="absolute -left-[6px] top-52 w-[6px] h-12 bg-black rounded-l-md border-y border-l border-black/40" />
              {/* Right Side: Power / Lock Button */}
              <div className="absolute -right-[6px] top-40 w-[6px] h-16 bg-black rounded-r-md border-y border-r border-black/40" />

              {/* iPhone Bezel Chassis: Exact dimensions (365px width x 740px height) */}
              <div className="w-[340px] sm:w-[365px] h-[700px] sm:h-[740px] bg-black border-4 border-black rounded-[48px] sm:rounded-[52px] p-[9px] shadow-[8px_8px_0px_0px_#111] flex flex-col relative transition-all">
                
                {/* iPhone Inner Screen Frame */}
                <div className="w-full h-full bg-[#F8F9FA] rounded-[38px] sm:rounded-[42px] overflow-hidden flex flex-col relative border border-black/30">
                  
                  {/* Dynamic Island Component (Centered Apple Pill) */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-full z-30 flex items-center justify-between px-2.5 pointer-events-none shadow-xs">
                    {/* Front Camera Lens with realistic glass reflection */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#161616] border border-gray-700/60 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                    </div>
                    {/* Sensor Dot */}
                    <div className="w-2 h-2 rounded-full bg-[#181818]" />
                  </div>

                  {/* iOS Status Bar */}
                  <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-bold text-black border-b border-black/10 select-none z-20">
                    <span className="font-semibold tracking-tight">9:41</span>
                    {/* Spacer for Dynamic Island */}
                    <div className="w-28" />
                    <div className="flex items-center gap-1.5">
                      {/* Signal Bars */}
                      <div className="flex items-end gap-0.5 h-2.5">
                        <span className="w-0.5 h-1 bg-black rounded-xs"></span>
                        <span className="w-0.5 h-1.5 bg-black rounded-xs"></span>
                        <span className="w-0.5 h-2 bg-black rounded-xs"></span>
                        <span className="w-0.5 h-2.5 bg-black rounded-xs"></span>
                      </div>
                      <span className="text-[10px] font-bold">5G</span>
                      {/* Battery Icon */}
                      <div className="w-5 h-2.5 border border-black rounded-xs p-0.5 flex items-center">
                        <div className="w-full h-full bg-green-500 rounded-2xs"></div>
                      </div>
                    </div>
                  </div>

                  {/* Chat App Header Bar */}
                  <div className="bg-white px-3.5 py-2.5 border-b-2 border-black flex items-center justify-between shadow-xs z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-green-primary border-2 border-black flex items-center justify-center text-white font-bold shadow-[1px_1px_0px_0px_#111]">
                          <Bot size={20} />
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-heading text-base leading-none text-black">AgriBot</h4>
                          <span className="bg-green-100 text-green-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-green-300">AI</span>
                        </div>
                        <p className="text-[10px] font-semibold text-green-700 flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          Active • Instant
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => router.push("/agribot")}
                      className="text-[11px] font-bold bg-yellow-soft hover:bg-yellow-300 border-2 border-black px-2.5 py-1 rounded-lg transition-colors shadow-[1px_1px_0px_0px_#111] cursor-pointer"
                    >
                      Open App
                    </button>
                  </div>

                  {/* Chat Scroll Conversation View */}
                  <div className="flex-1 p-3.5 overflow-y-auto flex flex-col gap-3 bg-cream/30">
                    
                    {/* Security/Trust Notification Banner */}
                    <div className="mx-auto bg-white/90 border border-black/20 rounded-full px-3 py-1 text-[10px] font-semibold text-black/70 flex items-center gap-1.5 shadow-2xs">
                      <ShieldCheck size={12} className="text-green-primary" /> End-to-end Agronomy Verified
                    </div>

                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl p-3 border-2 border-black text-xs leading-relaxed transition-all ${
                            m.sender === "user"
                              ? "bg-yellow-soft rounded-tr-none shadow-[2px_2px_0px_0px_#111] font-semibold text-black"
                              : "bg-white rounded-tl-none shadow-[2px_2px_0px_0px_#111] text-black"
                          }`}
                        >
                          <p>{m.text}</p>

                          {/* Audio Note Simulation for Bot */}
                          {m.audioNote && (
                            <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between gap-2">
                              <button 
                                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                                className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 hover:bg-green-100 border border-black rounded-md text-[10px] font-bold text-green-900 transition-colors cursor-pointer"
                              >
                                <Volume2 size={11} className={isPlayingAudio ? "text-green-600 animate-pulse" : "text-black"} />
                                <span>{isPlayingAudio ? "Playing Salah..." : "Listen Audio Note (0:18)"}</span>
                              </button>
                              <span className="text-[9px] text-black/50 font-medium">MP3</span>
                            </div>
                          )}

                          {/* Tags */}
                          {m.tags && m.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {m.tags.map((t, i) => (
                                <span 
                                  key={i} 
                                  className="bg-cream border border-black/30 text-[9px] font-bold px-1.5 py-0.5 rounded text-black/70"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mt-1 px-1">
                          <span className="text-[9px] text-black/50 font-medium">{m.time}</span>
                          {m.sender === "user" && <CheckCheck size={11} className="text-green-primary" />}
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex items-center gap-1.5 self-start bg-white border-2 border-black rounded-2xl rounded-tl-none px-3 py-1.5 shadow-[2px_2px_0px_0px_#111]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                        <span className="text-[10px] font-bold text-black/60 ml-1">AgriBot typing...</span>
                      </div>
                    )}
                  </div>

                  {/* Chat Input Bar */}
                  <form 
                    onSubmit={handleSendCustom}
                    className="bg-white p-2.5 border-t-2 border-black flex items-center gap-1.5"
                  >
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder={lang === "hindi" ? "फसल से संबंधित प्रश्न यहाँ लिखें..." : "Ask your crop question here..."}
                        className="w-full bg-cream border-2 border-black rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-green-primary pr-8"
                      />
                      <button 
                        type="button" 
                        onClick={() => alert("Voice input is active in the full AgriBot chat room!")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-black/60 hover:text-black cursor-pointer"
                        title="Voice Input"
                      >
                        <Mic size={14} />
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-8 h-8 rounded-xl bg-green-primary hover:bg-green-600 border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#111] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer shrink-0"
                      title="Send Message"
                    >
                      <Send size={14} />
                    </button>
                  </form>

                  {/* iOS Home Indicator Bar */}
                  <div className="w-32 h-1 bg-black/35 rounded-full mx-auto my-1.5 shrink-0 select-none" />

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
