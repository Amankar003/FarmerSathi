import Link from "next/link";
import { Leaf, Globe, Mail, MessageSquare, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-cream px-6 py-12 md:py-16 border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-primary border-[2px] border-cream rounded-lg p-2 shadow-[2px_2px_0px_0px_#FBF7EF]">
              <Leaf className="text-white" size={24} />
            </div>
            <h2 className="font-heading text-3xl tracking-wide text-cream uppercase mt-1">FarmerSathi</h2>
          </Link>
          <p className="text-gray-400 font-body text-sm mt-2">
            Your one-stop AI-powered smart farming assistant for better yield and growth.
          </p>
          <div className="flex gap-4 mt-2">
            <div className="p-2 bg-cream text-black rounded-full hover:bg-yellow-soft hover:-translate-y-1 transition-transform cursor-pointer"><Globe size={18} /></div>
            <div className="p-2 bg-cream text-black rounded-full hover:bg-yellow-soft hover:-translate-y-1 transition-transform cursor-pointer"><Mail size={18} /></div>
            <div className="p-2 bg-cream text-black rounded-full hover:bg-yellow-soft hover:-translate-y-1 transition-transform cursor-pointer"><MessageSquare size={18} /></div>
            <div className="p-2 bg-cream text-black rounded-full hover:bg-yellow-soft hover:-translate-y-1 transition-transform cursor-pointer"><Phone size={18} /></div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl text-green-light tracking-wide">Platform</h3>
            <Link href="/" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">Home</Link>
            <Link href="/krishilab" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">Krishi Lab</Link>
            <Link href="/agribot" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">AgriBot</Link>
            <Link href="/products" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">Dukaan</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-xl text-yellow-soft tracking-wide">Support</h3>
            <Link href="#" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">Help Center</Link>
            <Link href="#" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">Contact Us</Link>
            <Link href="#" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-cream transition-colors text-sm font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
        <p>
          AI-powered features for modern farming. Results from ML models should be used as guidance.
        </p>
        <p>© {new Date().getFullYear()} FarmerSathi. All rights reserved.</p>
      </div>
    </footer>
  );
}
