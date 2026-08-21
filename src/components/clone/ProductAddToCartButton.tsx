"use client";

import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { ShoppingBag, Check } from 'lucide-react';
import { ButtonParticles } from '@/components/ui/button-particles';

export default function ProductAddToCartButton({ product }: { product: { name: string, price: number, image: string } }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      isCustom: false,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg ${
        added 
          ? 'bg-[#6eff86] text-black shadow-[0_0_20px_rgba(110,255,134,0.6)]'
          : 'bg-gradient-to-r from-[#752eff] to-[#bca9ff] hover:from-[#bca9ff] hover:to-[#752eff] text-white'
      }`}
    >
      {added ? (
        <>
          <Check className="w-6 h-6" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="w-6 h-6" />
          Add to Cart
        </>
      )}
    </button>
  );
}
