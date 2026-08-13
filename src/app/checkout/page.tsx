"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { ButtonParticles } from "@/components/ui/button-particles";
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
              >
                <span className="text-white">Thank</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                  You for Your Order
                </span>
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
              <ButtonParticles
                href="/customer"
                label="View My Account & Orders"
              />
              <ButtonParticles
                href="/products/customize-neon-signs"
                label="Design Another Neon Sign"
              />
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
            >
              <span className="text-white">Checkout</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                & Delivery
              </span>
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Checkout Form (Billing Details) */}
          <div className="space-y-10">
            
            {/* Coupon Toggle (if needed) */}
            <div className="bg-[#111111]/40 border-t border-brand-purple/50 p-4 text-sm text-gray-300">
              <span className="text-gray-400">Have a coupon?</span> <Link href="/cart" className="text-white hover:text-brand-purple underline transition-colors">Click here to enter your code</Link>
            </div>

            {/* Billing details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                Billing details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={form.fullName.split(" ")[0] || ""}
                    onChange={(e) => setForm({...form, fullName: `${e.target.value} ${form.fullName.split(" ").slice(1).join(" ")}`.trim()})}
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={form.fullName.split(" ").slice(1).join(" ") || ""}
                    onChange={(e) => setForm({...form, fullName: `${form.fullName.split(" ")[0] || ""} ${e.target.value}`.trim()})}
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    disabled
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded px-4 py-3 text-white text-sm outline-none opacity-80"
                  >
                    <option>India</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number and street name"
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6 pt-4">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                Additional information
              </h2>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400">
                  Order notes (optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-[#6eff86] rounded px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Order Summary Column */}
          <div className="bg-[#111111]/40 border border-gray-800 p-8 sticky top-24">
            <h2 className="text-2xl font-black text-white mb-6">
              Your order
            </h2>

            {/* Order Table */}
            <div className="border-b border-white/10 pb-4 mb-4">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="min-w-0 flex-1 pr-4 text-gray-300">
                      {item.name} <span className="text-gray-500">× {item.quantity}</span>
                    </div>
                    <div className="font-bold text-white">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-gray-400 border-b border-white/10 pb-4">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold text-white">
                  ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="font-bold text-white">Total</span>
                <span className="text-xl font-black text-white">
                  ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-[#0a0a0a] border border-gray-800 p-4 mb-6 text-sm text-gray-400">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={form.paymentMethod === 'razorpay'}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div>
                  <span className="font-bold text-white block mb-1">Razorpay (Cards, NetBanking, Wallet, UPI)</span>
                  <span className="text-xs">Securely pay via Razorpay. Powered by WooCommerce.</span>
                </div>
              </label>
            </div>

            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>

            <label className="flex items-center gap-2 cursor-pointer mb-6 text-sm text-gray-300">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-black text-[#6eff86] focus:ring-[#6eff86] focus:ring-offset-black" />
              <span>Subscribe to our Newsletter</span>
            </label>

            <button
              type="submit"
              disabled={isProcessing || cart.length === 0}
              className="w-full py-4 bg-transparent border border-gray-700 hover:border-white text-white font-bold rounded-full transition-all text-sm uppercase tracking-wider disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Place order"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
