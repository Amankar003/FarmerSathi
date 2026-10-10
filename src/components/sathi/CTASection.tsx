"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="px-4 py-20 bg-cream flex justify-center items-center reveal">
      <div className="bg-orange-accent border-4 border-black rounded-3xl p-8 md:p-16 max-w-5xl w-full text-center shadow-[12px_12px_0px_0px_#111] relative overflow-hidden">
        
        {/* Decorations */}
        <div className="absolute top-4 left-4 sticker -rotate-12 bg-white text-sm">Free to use!</div>
        <div className="absolute bottom-8 right-8 text-6xl opacity-20 transform rotate-45">🚜</div>
        
        <h2 className="font-heading text-5xl md:text-6xl mb-6 text-black relative z-10">
          Ready to Modernize Your Farm?
        </h2>
        <p className="font-bold text-xl text-black/80 max-w-2xl mx-auto mb-10 relative z-10">
          Join thousands of smart farmers who are increasing their crop yield and preventing diseases with FarmerSathi.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <button 
            onClick={() => router.push("/krishilab")}
            className="btn-brutal-green text-xl px-10 py-4 shadow-[6px_6px_0px_0px_#111]"
          >
            Try Krishi Lab <ArrowRight className="ml-2" />
          </button>
          <button 
            onClick={() => router.push("/sign-up")}
            className="btn-brutal bg-white text-black text-xl px-10 py-4 shadow-[6px_6px_0px_0px_#111]"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </section>
  );
}
