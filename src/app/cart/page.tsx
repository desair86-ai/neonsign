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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6eff86]/10 border border-[#6eff86]/30 text-[#6eff86] text-xs font-black uppercase tracking-wider mb-2">
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
                className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg border border-red-500/30 hover:border-red-500/50"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Cart Contents */}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left Items Column (2 cols width on large screens) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#111111] border border-gray-800 hover:border-gray-700 rounded-2xl p-5 md:p-6 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative group"
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-20 h-20 rounded-xl bg-black border border-gray-800 flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-inner">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-2">
                          <Sparkles className="w-6 h-6 text-[#6eff86] mx-auto mb-1 animate-pulse" />
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Neon</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {item.isCustom && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                            Custom Studio
                          </span>
                        )}
                        <h3 
                          className="font-black text-lg text-white truncate"
                          style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                        >
                          {item.name}
                        </h3>
                      </div>

                      {item.customDetails && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-400">
                          <div>
                            <span className="text-gray-500">Font:</span>{" "}
                            <strong className="text-gray-300">{item.customDetails.font}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500">Color:</span>{" "}
                            <strong className="text-[#6eff86]">{item.customDetails.color}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500">Size:</span>{" "}
                            <strong className="text-gray-300">{item.customDetails.size}</strong>
                          </div>
                          {item.customDetails.backboard && (
                            <div>
                              <span className="text-gray-500">Backboard:</span>{" "}
                              <strong className="text-gray-300">{item.customDetails.backboard}</strong>
                            </div>
                          )}
                          {item.customDetails.usage && (
                            <div>
                              <span className="text-gray-500">Usage:</span>{" "}
                              <strong className="text-gray-300">{item.customDetails.usage}</strong>
                            </div>
                          )}
                        </div>
                      )}

                      <div 
                        className="text-sm font-bold text-[#6eff86]"
                        style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                      >
                        ₹{item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
                    <div className="flex items-center bg-black border border-gray-800 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-gray-300 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span 
                        className="w-10 text-center font-bold text-sm text-white"
                        style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-gray-300 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <div 
                        className="font-extrabold text-base text-white"
                        style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                      >
                        ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Summary Column */}
            <div className="bg-[#111111] border-2 border-brand-purple/50 rounded-3xl p-6 md:p-8 shadow-[0_0_35px_rgba(117,46,255,0.25)] space-y-6 sticky top-24">
              <h2 
                className="text-xl font-black border-b border-white/10 pb-4 text-white"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Subtotal</span>
                  <span className="font-bold text-white" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                    ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Shipping across India</span>
                  <span className="font-extrabold text-[#6eff86]" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                    FREE
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Warranty & Insurance</span>
                  <span className="font-extrabold text-[#6eff86]" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                    2-Year Included
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                  <span 
                    className="text-base font-black text-white uppercase tracking-wider"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Estimated Total
                  </span>
                  <span 
                    className="text-2xl font-black text-[#6eff86] drop-shadow-[0_0_12px_rgba(110,255,134,0.6)]"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    ₹{finalTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <ButtonParticles
                href="/checkout"
                className="w-full"
                label="Proceed to Checkout"
                icon={<ArrowRight className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-[#6eff86]" />}
              />

              {/* Guarantees Box */}
              <div className="bg-black/50 border border-gray-800 rounded-2xl p-4 space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#6eff86] flex-shrink-0" />
                  <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                    2-Year Full Manufacturer Warranty Included
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#6eff86] flex-shrink-0" />
                  <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                    Free Express Shipping across India (7-10 days)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
