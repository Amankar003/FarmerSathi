"use client"
import Image from 'next/image';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface ProductCardProps {
  name: string;
  description: string;
  price: string | number;
  image: string;
}

export default function ProductCard({ name, description, price, image }: ProductCardProps) {
  
  return (
    <div className="glass-card w-[30rem] overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden h-[25rem]">
        <Image
          src={image || "../assets/Image1.jpg"} 
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,26,16,1)] to-transparent opacity-80" />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D4A373] to-[#E9C46A] px-4 py-1 rounded-full shadow-[0_0_15px_rgba(233,196,106,0.4)]">
            <span className="text-[#0B1D0F] font-bold text-[1.4rem]">₹{price}</span>
        </div>
      </div>
      
      <div className="p-[2rem] flex flex-col gap-[1.5rem] bg-[rgba(11,26,16,0.8)] flex-1">
        <div>
            <h1 className="text-[2.2rem] font-bold text-[#F0F7F4] font-serif mb-2 line-clamp-1">{name}</h1>
            <p className="text-[1.3rem] text-[#A8C5B5] line-clamp-2 leading-relaxed">{description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-[1rem] border-t border-[rgba(82,183,136,0.2)]">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white font-medium rounded-xl hover:shadow-[0_0_15px_rgba(82,183,136,0.4)] transition-all text-[1.3rem]">
              <ShoppingCartIcon sx={{ fontSize: 18 }} /> Add
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[#E9C46A] text-[#E9C46A] font-medium rounded-xl hover:bg-[rgba(233,196,106,0.1)] transition-all text-[1.3rem]">
              <AccountBalanceWalletIcon sx={{ fontSize: 18 }} /> Buy Now
            </button>
        </div>
      </div>
    </div>
  );
}
