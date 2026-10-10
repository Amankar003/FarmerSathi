"use client";

import React from 'react';
import { ArrowRight, Star, Leaf, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Importing the image
import heroImg from "@/assets/images/aboutImage.jpg";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FBF7EF] py-16">
      
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-5%',
        width: '600px',
        height: '600px',
        backgroundColor: '#74C69D',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        border: '6px solid #111',
        boxShadow: '12px 12px 0px 0px #111',
        zIndex: 0,
        animation: 'blob 10s ease-in-out infinite alternate-reverse'
      }} />

      <style>{`
        @keyframes blob {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg); }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(10deg); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Prev B Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-[#FFE066] border-2 border-[#111] px-4 py-1.5 rounded-full font-bold text-sm shadow-[2px_2px_0px_0px_#111] transform -rotate-2 mb-6">
            <span>🚜 Bharat's Smart Agritech</span>
            <span className="bg-[#FF6B6B] text-white text-[0.65rem] px-2 py-0.5 rounded">NEW</span>
          </div>

          <div className="relative mb-6">
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-black">
              DESI KISAAN, <br />
              <span className="text-[#2F9E44] relative inline-block">
                MODERN TAKNEEK
              </span> <br />
              HAR KHET ME.
            </h1>

            <div className="absolute -top-6 -right-2 sm:-right-8 transform rotate-12 bg-[#FFE066] border-2 border-black shadow-[3px_3px_0px_0px_#111] px-3 py-1 text-sm sm:text-base font-bold whitespace-nowrap">
              ⚡ Made for Bharat
            </div>
          </div>

          <p className="text-lg font-medium text-black/75 mb-8 max-w-lg leading-relaxed">
            The all-in-one AI ecosystem for modern Indian growers: scan crop diseases with KrishiLab, get 24/7 advisory with AgriBot, and order certified supplies.
          </p>

          {/* Metric Counter Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg mb-8">
            <div className="bg-white border-2 border-black rounded-xl p-2 sm:p-3 text-center shadow-[3px_3px_0px_0px_#111]">
              <span className="font-heading text-2xl sm:text-3xl text-[#2F9E44]">80+</span>
              <p className="text-[0.65rem] sm:text-xs font-bold text-black/70 leading-tight">Diseases<br/>Detected</p>
            </div>
            <div className="bg-white border-2 border-black rounded-xl p-2 sm:p-3 text-center shadow-[3px_3px_0px_0px_#111]">
              <span className="font-heading text-2xl sm:text-3xl text-[#F59F00]">12+</span>
              <p className="text-[0.65rem] sm:text-xs font-bold text-black/70 leading-tight">Regional<br/>Languages</p>
            </div>
            <div className="bg-[#FFE066] border-2 border-black rounded-xl p-2 sm:p-3 text-center shadow-[3px_3px_0px_0px_#111]">
              <span className="font-heading text-2xl sm:text-3xl text-black">₹0</span>
              <p className="text-[0.65rem] sm:text-xs font-bold text-black leading-tight">AI Cost<br/>Forever</p>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full mb-8">
            <button 
              onClick={() => router.push("/krishilab")}
              className="btn-brutal-green text-lg px-6 sm:px-8 py-3 flex items-center justify-center gap-2"
            >
              Explore Features <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => router.push("/products")}
              className="btn-brutal bg-white text-lg px-6 sm:px-8 py-3 flex items-center justify-center gap-2"
            >
              Shop Dukaan 🛒
            </button>
          </div>

          {/* Social Proof with Avatars */}
          <div className="flex items-center justify-center lg:justify-start gap-4 text-sm font-bold mt-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((num, i) => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${num + 10}`} 
                  alt={`Farmer ${num}`}
                  className="w-10 h-10 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#111] object-cover"
                />
              ))}
            </div>
            <span className="text-black/80">Built for farmers to scale.</span>
          </div>
        </div>

        {/* Right Side: Organic Image Container (from Organic Blobs) */}
        <div className="relative flex justify-center items-center py-10 lg:py-0 w-full max-w-lg mx-auto lg:ml-auto h-full min-h-[400px]">
          
          <div style={{
            width: '100%',
            aspectRatio: '1/1',
            backgroundColor: '#FF6B6B',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            border: '6px solid #111',
            boxShadow: '12px 12px 0px 0px #111',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 10
          }}>
            <Image 
              src={heroImg} 
              alt="Farmer using technology" 
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          {/* Floating Organic Stats */}
          <div className="absolute top-[5%] -right-2 sm:-right-[5%] bg-white border-4 border-black p-3 sm:p-4 shadow-[6px_6px_0px_0px_#111] flex items-center gap-3 z-20 animate-float"
               style={{ borderRadius: '50% 50% 10% 50% / 50% 50% 10% 50%' }}>
             <Leaf size={28} className="text-[#2F9E44]" />
             <div className="font-black text-sm sm:text-base leading-tight">95%<br/>Accuracy</div>
          </div>

          <div className="absolute bottom-[10%] -left-2 sm:-left-[10%] bg-white border-4 border-black p-3 sm:p-4 shadow-[6px_6px_0px_0px_#111] flex items-center gap-3 z-20 animate-float"
               style={{ borderRadius: '10% 50% 50% 50% / 10% 50% 50% 50%', animationDelay: '1s' }}>
             <ShieldCheck size={28} className="text-[#7048E8]" />
             <div className="font-black text-sm sm:text-base leading-tight">100%<br/>Certified</div>
          </div>

        </div>

      </div>
    </section>
  );
}
