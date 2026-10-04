'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const Page = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'नमस्ते! मैं आपका फ़ार्मर साथी हूँ, आपकी क्या मदद कर सकता हूँ?',
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
    } catch (error) {
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

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center py-[4rem] flex-col gap-[2rem] px-[2rem] min-h-[90vh]">
        
        <div className="text-center mb-[1rem]">
            <h1 className="section-title gradient-text-green inline-flex items-center gap-4">
                <SmartToyIcon sx={{ fontSize: 40 }} /> AgriBot
            </h1>
            <p className="text-[1.6rem] text-gray-400">आपका स्मार्ट कृषि सहायक (Your Smart Farming Assistant)</p>
        </div>

        <div className="glass-card w-full max-w-[90rem] h-[65vh] flex flex-col overflow-hidden relative">
          
          <div className="flex-1 overflow-y-auto p-[3rem] flex flex-col gap-[2rem] scroll-smooth">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                    className={`max-w-[75%] p-[1.5rem] rounded-2xl text-[1.5rem] leading-[1.6] shadow-lg ${
                        msg.role === 'bot' 
                        ? 'bg-[rgba(45,106,79,0.3)] border border-[rgba(82,183,136,0.3)] text-[#F0F7F4] rounded-tl-none' 
                        : 'bg-[rgba(212,163,115,0.2)] border border-[rgba(233,196,106,0.3)] text-white rounded-tr-none'
                    }`}
                >
                    {msg.role === 'bot' && (
                        <AutoAwesomeIcon className="text-[#E9C46A] !text-[1.8rem] mb-1 mr-2 inline-block" />
                    )}
                    <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                </div>
              </div>
            ))}
            
            {loading && (
               <div className="flex w-full justify-start">
               <div className="max-w-[75%] p-[1.5rem] rounded-2xl bg-[rgba(45,106,79,0.3)] border border-[rgba(82,183,136,0.3)] text-[#E9C46A] rounded-tl-none flex items-center gap-3">
                   <AutoAwesomeIcon className="animate-spin !text-[1.8rem]" />
                   <span className="text-[1.4rem]">विचार कर रहा है...</span>
               </div>
             </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-[2rem] bg-[rgba(6,13,8,0.8)] border-t border-[rgba(82,183,136,0.2)]">
            <div className="flex justify-between items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(82,183,136,0.3)] rounded-full p-[0.5rem] pl-[2rem] focus-within:border-[#E9C46A] transition-colors">
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
                className="w-full text-white bg-transparent border-none focus:outline-none text-[1.6rem] disabled:opacity-50 font-inter"
                type="text"
                placeholder="अपना सवाल यहाँ लिखें..."
              />
              <button
                onClick={!loading ? handleSubmit : undefined}
                disabled={loading}
                className={`w-[5rem] h-[5rem] rounded-full flex justify-center items-center transition-all ${
                  loading || !userInput.trim() ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-[#2D6A4F] to-[#40916C] hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(82,183,136,0.5)]'
                }`}
              >
                <SendIcon className="!text-[2rem] text-white ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
