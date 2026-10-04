'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
    if (userInput.trim() === '') {
      alert('कृपया एक प्रश्न दर्ज करें');
      return;
    }

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
      console.error('Error fetching bot response:', error);
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
      <div className="flex justify-center items-center pt-[2rem] flex-col gap-[1rem]">
        <div className="below-sm:w-[95%] min-h-[70vh] bg-gray-900 w-[70%] rounded-[1rem] p-[1rem] overflow-hidden flex flex-col">
          <div className="allchat flex-1 h-[70vh] flex flex-col gap-[0.8rem] overflow-y-auto pr-2">
            {messages.map((msg, idx) => (
              <h2
                key={idx}
                className={`text-[2rem] flex gap-[0.5rem] ${
                  msg.role === 'bot'
                    ? 'items-center text-green-400'
                    : 'items-baseline font-semibold text-gray-400'
                }`}
              >
                {msg.role === 'bot' ? (
                  <AutoAwesomeIcon className="text-purple-400 !text-[2rem] shrink-0" />
                ) : (
                  <PersonIcon className="!text-[2rem] shrink-0" />
                )}
                <span>{msg.content}</span>
              </h2>
            ))}
            {loading && (
              <h2 className="text-[2rem] flex gap-[0.5rem] items-center text-green-400">
                <AutoAwesomeIcon className="text-purple-400 !text-[2rem] shrink-0" />
                <span>लोड हो रहा है...</span>
              </h2>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="below-sm:w-[95%] w-[70%] flex justify-center items-end gap-[1rem]">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
            className="w-[80%] text-gray-200 bg-transparent border-b-[2px] focus:outline-none text-[1.5rem] disabled:opacity-50"
            type="text"
            placeholder="प्रश्न दर्ज करें"
          />
          <SendIcon
            onClick={!loading ? handleSubmit : undefined}
            className={`!text-[2.5rem] rotate-[330deg] ${
              loading ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer text-white'
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
