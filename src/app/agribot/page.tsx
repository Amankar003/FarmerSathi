'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/sathi/Header';
import Footer from '@/components/sathi/Footer';
import { Send, Bot, Sparkles, Loader2, User, Languages, ShieldCheck, Zap, Volume2, ArrowRight, MessageSquare } from 'lucide-react';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const QUICK_PROMPTS = [
  { emoji: "🌾", text: "गेहूं में पीलापन क्यों आ रहा है?" },
  { emoji: "🐛", text: "धान में तना छेदक का इलाज बताओ" },
  { emoji: "💧", text: "टमाटर में ड्रिप सिंचाई कब करें?" },
  { emoji: "🌧️", text: "बारिश में यूरिया डालना सही है?" },
];

const Page = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'नमस्ते! मैं आपका फ़ार्मर साथी हूँ 🌱\n\nमुझसे कोई भी कृषि सवाल पूछें — फसल रोग, खाद प्रबंधन, सिंचाई, या मंडी भाव। मैं हिंदी और English दोनों में मदद कर सकता हूँ!',
    },
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async () => {
    if (userInput.trim() === '') return;

    const currentQuery = userInput;
    setMessages((prev) => [...prev, { role: 'user', content: currentQuery }]);
    setUserInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/getchatbotdata', { query: currentQuery });
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: res.data.answer || 'माफ़ कीजिए, मैं समझ नहीं पाया।' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'सर्वर से जवाब प्राप्त नहीं हो पाया। कृपया पुनः प्रयास करें।' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleQuickPrompt = (text: string) => {
    setUserInput(text);
  };

  return (
    <div className="page-wrapper flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex flex-col">
        
        {/* Title */}
        <div className="text-center mb-6 reveal pt-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="bg-[#7048E8] border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#111]">
              <Bot className="text-white" size={28} />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl">AGRIBOT</h1>
          </div>
          <p className="font-bold text-black/60">
            आपका स्मार्ट कृषि सहायक — Your Smart Farming Assistant
          </p>
        </div>

        {/* Chat Section */}
        <section className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 pb-8 md:pb-12">
          
          {/* Chat Container */}
          <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_#111] flex-1 flex flex-col overflow-hidden" style={{ maxHeight: '70vh' }}>
            
            {/* Chat Header */}
            <div className="bg-cream border-b-3 border-black px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7048E8] border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#111]">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-lg leading-none">AgriBot</h4>
                    <span className="bg-[#2F9E44] text-white text-[10px] font-bold px-2 py-0.5 rounded border border-black">AI</span>
                  </div>
                  <p className="text-xs font-bold text-[#2F9E44] flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E44] animate-pulse" />
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <div className="text-xs font-bold text-black/50 bg-white border-2 border-black/20 rounded-lg px-3 py-1.5">
                🔒 End-to-end verified
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-4 bg-[#FAFAFA]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex w-full ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`shrink-0 w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#111] ${
                      msg.role === 'bot' ? 'bg-[#7048E8]' : 'bg-[#F59F00]'
                    }`}>
                      {msg.role === 'bot' 
                        ? <Sparkles size={18} className="text-white" />
                        : <User size={18} className="text-black" />
                      }
                    </div>
                    
                    {/* Bubble */}
                    <div className={`p-4 rounded-2xl border-2 border-black text-sm leading-relaxed font-medium ${
                      msg.role === 'bot'
                        ? 'bg-white rounded-tl-none shadow-[3px_3px_0px_0px_#111]'
                        : 'bg-[#FFE066] rounded-tr-none shadow-[3px_3px_0px_0px_#111]'
                    }`}>
                      <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex w-full justify-start">
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="shrink-0 w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center bg-[#7048E8] shadow-[2px_2px_0px_0px_#111]">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <div className="p-4 rounded-2xl border-2 border-black bg-white rounded-tl-none shadow-[3px_3px_0px_0px_#111] flex items-center gap-3">
                      <Loader2 size={18} className="animate-spin text-[#7048E8]" />
                      <span className="text-sm font-bold text-[#7048E8]">सोच रहा हूँ...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-5 py-3 border-t-2 border-black/10 bg-white">
                <p className="text-xs font-bold text-black/50 mb-2 uppercase tracking-wider">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="bg-cream border-2 border-black rounded-xl px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_0px_#111] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{prompt.emoji}</span>
                      <span className="truncate max-w-[180px]">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-4 border-t-3 border-black bg-white">
              <div className="flex gap-3">
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={loading}
                  className="flex-1 bg-cream border-3 border-black rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#7048E8] focus:ring-offset-1 placeholder:text-black/40"
                  type="text"
                  placeholder="अपना सवाल यहाँ लिखें / Type your question..."
                />
                <button
                  onClick={!loading ? handleSubmit : undefined}
                  disabled={loading || !userInput.trim()}
                  className={`w-12 h-12 rounded-xl border-3 border-black flex justify-center items-center transition-all shrink-0 ${
                    loading || !userInput.trim()
                      ? 'bg-black/20 cursor-not-allowed'
                      : 'bg-[#7048E8] hover:shadow-[3px_3px_0px_0px_#111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer shadow-[3px_3px_0px_0px_#111]'
                  }`}
                >
                  <Send size={20} className="text-white ml-0.5" />
                </button>
              </div>
            </div>
          </div>

        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Page;
