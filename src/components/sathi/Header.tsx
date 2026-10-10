"use client";

import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b-[3px] border-black px-4 py-3 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-green-primary border-[2px] border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#111] transition-transform active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
          <Leaf className="text-white" size={24} />
        </div>
        <h1 className="font-heading text-2xl tracking-wide text-black uppercase mt-1">FarmerSathi</h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 font-bold text-lg">
        <Link href="/" className="hover:text-green-primary transition-colors">Home</Link>
        <Link href="/krishilab?component=disease" className="hover:text-orange-accent transition-colors">Krishi Lab</Link>
        <Link href="/agribot" className="hover:text-yellow-soft transition-colors">AgriBot</Link>
        <Link href="/products" className="hover:text-green-primary transition-colors">Dukaan</Link>
        
        <SignedOut>
          <Link href="/sign-in" className="btn-brutal bg-white text-black px-4 py-2 min-h-0 text-base">Sign In</Link>
        </SignedOut>
        <SignedIn>
          <Link href="/user-profile" className="btn-brutal bg-white text-black px-4 py-2 min-h-0 text-base">Profile</Link>
        </SignedIn>


      </nav>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden border-2 border-black rounded-lg p-2 bg-white shadow-[2px_2px_0px_0px_#111]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-cream border-b-[3px] border-black flex flex-col p-4 gap-4 font-bold md:hidden shadow-lg z-40">
          <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 border-b-2 border-black/10">Home</Link>
          <Link href="/krishilab?component=disease" onClick={() => setMenuOpen(false)} className="py-2 border-b-2 border-black/10">Krishi Lab</Link>
          <Link href="/agribot" onClick={() => setMenuOpen(false)} className="py-2 border-b-2 border-black/10">AgriBot</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="py-2 border-b-2 border-black/10">Dukaan</Link>
          
          <SignedOut>
            <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="py-2 border-b-2 border-black/10">Sign In</Link>
          </SignedOut>
          <SignedIn>
            <Link href="/user-profile" onClick={() => setMenuOpen(false)} className="py-2 border-b-2 border-black/10">Profile</Link>
          </SignedIn>


        </div>
      )}
    </header>
  );
}
