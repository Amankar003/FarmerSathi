"use client";

import Header from "@/components/sathi/Header";
import Hero from "@/components/sathi/Hero";
import StatsBanner from "@/components/sathi/StatsBanner";
import FeaturesSection from "@/components/sathi/FeaturesSection";
import HowItWorksAI from "@/components/sathi/HowItWorksAI";
import AgriBotPreview from "@/components/sathi/AgriBotPreview";
import HomeProducts from "@/components/sathi/HomeProducts";
import Testimonials from "@/components/sathi/Testimonials";
import FAQ from "@/components/sathi/FAQ";
import CTASection from "@/components/sathi/CTASection";
import Footer from "@/components/sathi/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-cream selection:bg-yellow-soft selection:text-black font-body">
      <Header />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <StatsBanner />
        <FeaturesSection />
        <HowItWorksAI />
        <AgriBotPreview />
        <HomeProducts />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}