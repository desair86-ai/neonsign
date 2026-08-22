"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { ButtonParticles } from "@/components/ui/button-particles";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowLeft 
} from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const shippingCost = cart.length > 0 ? 0 : 0; // Free shipping across India
  const finalTotal = cartTotal + shippingCost;

  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-brand-purple/30">
      <Header />

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-12 flex-1">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6eff86]/10 border border-[#6eff86]/30 text-[#6eff86] text-sm font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Workshop Cart</span>
            </div>
            <h1 
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              <span className="text-white">Your</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                Shopping Cart
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/products/customize-neon-signs"
              className="text-sm font-bold text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Customizing</span>
            </Link>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg border border-red-500/30 hover:border-red-500/50"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-12 text-center max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 bg-brand-purple/10 border border-brand-purple/30 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-purple shadow-[0_0_25px_rgba(117,46,255,0.3)]">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 
              className="text-2xl font-black mb-3 text-white"
              style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
            >
              Your Cart is Currently Empty
            </h2>
            <p 
              className="text-gray-400 mb-8 max-w-md mx-auto text-sm md:text-base"
              style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
            >
              Create your own bespoke illuminated artwork in our interactive workshop or explore our curated neon sign collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonParticles
                href="/products/customize-neon-signs"
                label="Customize A Neon Sign"
              />
              <Link
                href="/shop-neon-collection"
                className="px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-white text-white font-extrabold rounded-full transition-all text-sm uppercase tracking-wider"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                Browse Shop
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Cart Table */}
            <div className="w-full lg:w-2/3 flex flex-col">
              
              {/* Table Header (Desktop) */}
              <div className="hidden md:grid grid-cols-[auto_3fr_1fr_1.5fr_1fr] gap-4 items-center pb-4 border-b border-white/10 text-sm font-bold text-gray-400 uppercase tracking-wider">
                <div className="w-8"></div> {/* Spacer for remove icon */}
                <div className="pl-4">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Subtotal</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-white/10 border-b border-white/10">
                {cart.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col md:grid md:grid-cols-[auto_3fr_1fr_1.5fr_1fr] md:gap-4 md:items-center relative group">
                    
                    {/* Remove Icon (Desktop/Mobile top right) */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-6 right-0 md:static md:w-8 md:h-8 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors border border-gray-800 md:border-transparent hover:border-red-500/50 rounded-full"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Product Column (Image + Title) */}
                    <div className="flex items-center gap-4 pr-10 md:pr-0 pl-0 md:pl-4 mb-4 md:mb-0">
                      <div className="w-20 h-20 rounded-xl bg-black border border-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-inner">
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center p-2">
                            <Sparkles className="w-6 h-6 text-[#6eff86] mx-auto mb-1 animate-pulse" />
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <Link href={item.isCustom ? "/products/customize-neon-signs" : "#"} className="font-bold text-base text-white hover:text-brand-purple transition-colors truncate block">
                          {item.name}
                        </Link>
                        {item.customDetails && (
                          <div className="text-sm text-gray-400 mt-1 space-y-0.5">
                            <div>Font: <span className="text-gray-300">{item.customDetails.font}</span></div>
                            <div>Color: <span className="text-gray-300">{item.customDetails.color}</span></div>
                            <div>Size: <span className="text-gray-300">{item.customDetails.size}</span></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile Only: Price Header inline */}
                    <div className="md:hidden flex justify-between items-center text-sm mb-3">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-bold text-white">₹{item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>

                    {/* Price Column (Desktop) */}
                    <div className="hidden md:block text-center font-bold text-sm text-white">
                      ₹{item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>

                    {/* Mobile Only: Quantity Header inline */}
                    <div className="md:hidden flex justify-between items-center text-sm mb-3">
                      <span className="text-gray-500">Quantity:</span>
                      {/* Quantity Controls Mobile */}
                      <div className="flex items-center bg-black border border-gray-800 rounded px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-white px-2"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-white px-2"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>

                    {/* Quantity Column (Desktop) */}
                    <div className="hidden md:flex justify-center">
                      <div className="flex items-center bg-black border border-gray-800 rounded px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-white px-2"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-white px-2"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>

                    {/* Mobile Only: Subtotal Header inline */}
                    <div className="md:hidden flex justify-between items-center text-sm">
                      <span className="text-gray-500">Subtotal:</span>
                      <span className="font-bold text-white text-base">₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>

                    {/* Subtotal Column (Desktop) */}
                    <div className="hidden md:block text-right font-bold text-white text-base">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>

                  </div>
                ))}
              </div>

              {/* Actions Row (Coupon & Update Cart) */}
              <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex w-full sm:w-auto gap-3">
                  <input 
                    type="text" 
                    placeholder="Coupon code" 
                    className="w-full sm:w-48 bg-transparent border border-gray-800 focus:border-brand-purple rounded-full px-4 py-3 text-sm text-white outline-none"
                  />
                  <button className="px-6 py-3 border border-gray-800 hover:border-brand-purple rounded-full text-sm font-bold text-gray-300 hover:text-white transition-colors flex-shrink-0">
                    Apply coupon
                  </button>
                </div>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-800 hover:border-white rounded-full text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Update cart
                </button>
              </div>

            </div>

            {/* Right Column: Cart Totals */}
            <div className="w-full lg:w-1/3 bg-[#111111]/40 border border-gray-800 p-8">
              <h2 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-4">
                Cart totals
              </h2>

              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-400 font-bold">Subtotal</span>
                  <span className="font-bold text-white">
                    ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-gray-400 font-bold">Total</span>
                  <span className="text-xl font-black text-white">
                    ₹{finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="block w-full py-4 text-center bg-transparent border border-brand-purple hover:bg-brand-purple/10 text-white font-bold rounded-full transition-all text-sm uppercase tracking-wider"
              >
                Proceed to checkout
              </Link>
            </div>
            
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
