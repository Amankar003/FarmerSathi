"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ShoppingCart, Check, Zap, Star, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id?: number;
  name: string;
  description: string;
  price: string | number;
  image: string | StaticImageData;
  rating?: number;
  reviews?: number;
  badge?: string;
}

export default function ProductCard({ 
  name, 
  description, 
  price, 
  image,
  rating = 4.8,
  reviews = 94,
  badge = "Certified"
}: ProductCardProps) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  const numPrice = typeof price === "number" ? price : parseInt(price.toString(), 10) || 199;
  const originalPrice = Math.round(numPrice * 1.28);
  const discountPercent = Math.round(((originalPrice - numPrice) / originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="card-brutal bg-white w-full max-w-[320px] overflow-hidden flex flex-col p-0 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#111] relative border-3 border-black rounded-2xl">
      
      {/* Top Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-yellow-soft border-2 border-black text-black font-bold text-[11px] px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_#111] flex items-center gap-1">
          <ShieldCheck size={12} className="text-black" />
          {badge}
        </span>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-red-soft text-black font-bold text-xs px-2 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_#111] transform rotate-3">
          {discountPercent}% OFF
        </span>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden h-[210px] w-full bg-cream/50 border-b-3 border-black">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>
      
      {/* Body Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1 bg-white">
        
        {/* Rating and Stock */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1 text-black bg-yellow-100 border border-black/20 px-2 py-0.5 rounded-full">
            <Star size={12} className="fill-orange-accent text-orange-accent" />
            <span className="font-bold">{rating}</span>
            <span className="text-black/50">({reviews})</span>
          </div>
          <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
            In Stock
          </span>
        </div>

        {/* Product Title & Description */}
        <div>
          <h3 className="font-heading text-lg text-black mb-1 line-clamp-1 leading-snug group-hover:text-green-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-black/60 font-medium line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-heading text-2xl text-black">
            ₹{numPrice}
          </span>
          <span className="text-xs text-black/40 line-through font-semibold">
            ₹{originalPrice}
          </span>
          <span className="text-[10px] font-bold text-green-700">
            Save ₹{originalPrice - numPrice}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-3 border-t-2 border-black/10">
          <button 
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#111] transition-all cursor-pointer ${
              isAdded 
                ? "bg-green-primary text-white shadow-none translate-x-[1px] translate-y-[1px]" 
                : "bg-cream hover:bg-yellow-soft/50 text-black hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
            }`}
          >
            {isAdded ? (
              <>
                <Check size={14} className="stroke-3" /> Added!
              </>
            ) : (
              <>
                <ShoppingCart size={14} /> Add to Cart
              </>
            )}
          </button>

          <button 
            onClick={() => router.push("/products")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-primary hover:bg-green-600 text-white font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#111] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
          >
            <Zap size={14} className="fill-white" /> Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}
