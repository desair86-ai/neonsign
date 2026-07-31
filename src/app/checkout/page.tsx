"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { useCart } from "@/lib/CartContext";
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  MapPin, 
  User, 
  Mail, 
  Phone 
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "razorpay", // Razorpay / UPI / Direct
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill in all required delivery and contact details.");
      return;
    }

    setIsProcessing(true);

    // Simulate order placement and save to localStorage for customer account
    setTimeout(() => {
      const generatedOrderId = `NEON-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        id: generatedOrderId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        items: [...cart],
        total: cartTotal,
        customer: { ...form },
        status: "In Production",
      };

      try {
        const existing = localStorage.getItem("neon_past_orders");
        const orders = existing ? JSON.parse(existing) : [];
        localStorage.setItem("neon_past_orders", JSON.stringify([newOrder, ...orders]));
      } catch (err) {
        console.error("Failed to save order to localStorage", err);
      }

      setOrderId(generatedOrderId);
      setIsSubmitted(true);
      setIsProcessing(false);
      clearCart();
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-brand-purple/30">
        <Header />

        <div className="max-w-3xl w-full mx-auto px-4 py-16 text-center flex-1">
          <div className="bg-[#111111] border-2 border-[#6eff86]/60 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(110,255,134,0.25)] space-y-6">
            <div className="w-24 h-24 bg-[#6eff86]/10 border-2 border-[#6eff86] rounded-full flex items-center justify-center mx-auto text-[#6eff86] shadow-[0_0_30px_rgba(110,255,134,0.6)]">
              <CheckCircle2 className="w-12 h-12 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#6eff86]">
                Order Confirmed!
              </span>
              <h1 
                className="text-3xl md:text-5xl font-black text-white"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                Thank You for Your Order
              </h1>
              <p 
                className="text-gray-300 text-sm md:text-base max-w-md mx-auto"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                Your order <strong className="text-[#6eff86]">#{orderId}</strong> has been received and is now entering our custom workshop queue.
              </p>
            </div>

            <div className="bg-black/60 border border-gray-800 rounded-2xl p-6 text-left space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Customer Name:</span>
                <span className="font-bold text-white">{form.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Delivery Address:</span>
                <span className="font-bold text-white text-right">{form.address}, {form.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Production & Delivery:</span>
                <span className="font-bold text-[#6eff86]">7 – 10 Days</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/customer"
                className="px-8 py-4 bg-brand-purple text-white font-extrabold rounded-full shadow-[0_0_25px_rgba(117,46,255,0.6)] hover:scale-105 transition-all text-sm uppercase tracking-wider"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                View My Account & Orders
              </Link>
              <Link
                href="/products/customize-neon-signs"
                className="px-8 py-4 bg-[#6eff86] text-black font-extrabold rounded-full shadow-[0_0_25px_rgba(110,255,134,0.6)] hover:scale-105 transition-all text-sm uppercase tracking-wider"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                Design Another Neon Sign
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-brand-purple/30">
      <Header />

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-12 flex-1">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6eff86]/10 border border-[#6eff86]/30 text-[#6eff86] text-xs font-black uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL Secure Studio Checkout</span>
            </div>
            <h1 
              className="text-3xl md:text-5xl font-black tracking-tight text-white"
              style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
            >
              Checkout & Delivery
            </h1>
          </div>

          <Link
            href="/cart"
            className="text-sm font-bold text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Checkout Form (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 
                className="text-xl font-black flex items-center gap-2 border-b border-white/10 pb-4 text-white"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                <User className="w-5 h-5 text-brand-purple" />
                <span>1. Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Mobile Phone (For SMS/WhatsApp Delivery Updates) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 
                className="text-xl font-black flex items-center gap-2 border-b border-white/10 pb-4 text-white"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                <MapPin className="w-5 h-5 text-brand-purple" />
                <span>2. Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Street Address / Apartment / Landmark *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Flat 402, Green Tower, MG Road"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="400001"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 
                className="text-xl font-black flex items-center gap-2 border-b border-white/10 pb-4 text-white"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                <CreditCard className="w-5 h-5 text-[#6eff86]" />
                <span>3. Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className={`border-2 rounded-2xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 text-center transition-all ${form.paymentMethod === 'razorpay' ? 'border-[#6eff86] bg-[#6eff86]/10 text-white' : 'border-gray-800 bg-black text-gray-400'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={form.paymentMethod === 'razorpay'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="font-bold text-sm" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Razorpay / UPI</span>
                  <span className="text-[10px] text-gray-400">Cards, GPay, PhonePe</span>
                </label>

                <label className={`border-2 rounded-2xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 text-center transition-all ${form.paymentMethod === 'card' ? 'border-[#6eff86] bg-[#6eff86]/10 text-white' : 'border-gray-800 bg-black text-gray-400'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="font-bold text-sm" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Credit / Debit Card</span>
                  <span className="text-[10px] text-gray-400">Visa, Mastercard, RuPay</span>
                </label>

                <label className={`border-2 rounded-2xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 text-center transition-all ${form.paymentMethod === 'cod' ? 'border-[#6eff86] bg-[#6eff86]/10 text-white' : 'border-gray-800 bg-black text-gray-400'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="font-bold text-sm" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Cash on Delivery</span>
                  <span className="text-[10px] text-gray-400">Pay upon delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Order Summary Column */}
          <div className="bg-[#111111] border-2 border-brand-purple/50 rounded-3xl p-6 md:p-8 shadow-[0_0_35px_rgba(117,46,255,0.25)] space-y-6 sticky top-24">
            <h2 
              className="text-xl font-black border-b border-white/10 pb-4 text-white"
              style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
            >
              Order Review
            </h2>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <div className="min-w-0 flex-1 pr-4">
                    <div 
                      className="font-bold text-white truncate"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-extrabold text-[#6eff86]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm border-t border-white/10 pt-4">
              <div className="flex justify-between text-gray-300">
                <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Subtotal</span>
                <span className="font-bold text-white" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                  ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>Express Shipping (India)</span>
                <span className="font-extrabold text-[#6eff86]" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                  FREE
                </span>
              </div>

              <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                <span 
                  className="text-base font-black text-white uppercase tracking-wider"
                  style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                >
                  Total Due
                </span>
                <span 
                  className="text-2xl font-black text-[#6eff86] drop-shadow-[0_0_12px_rgba(110,255,134,0.6)]"
                  style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                >
                  ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || cart.length === 0}
              className="w-full py-4 bg-gradient-to-r from-brand-purple to-[#9d4edd] hover:from-[#853aff] hover:to-[#a95dff] text-white font-black rounded-full shadow-[0_0_25px_rgba(117,46,255,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
            >
              {isProcessing ? "Processing Order..." : `Place Order (₹${cartTotal.toLocaleString("en-IN")})`}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#6eff86]" />
              <span style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                2-Year Replacement Guarantee & Insurance Included
              </span>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
