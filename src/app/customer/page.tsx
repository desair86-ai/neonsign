"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/clone/Header";
import { Footer } from "@/components/clone/Footer";
import { ButtonParticles } from "@/components/ui/button-particles";
import { useCustomerAuth } from "@/lib/CustomerAuthContext";
import { 
  User, 
  Package, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Phone, 
  KeyRound, 
  CheckCircle2, 
  ArrowLeft, 
  LogOut,
  Edit3
} from "lucide-react";

interface SavedOrder {
  id: string;
  date: string;
  total: number;
  status: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    customDetails?: {
      text?: string;
      font?: string;
      color?: string;
      size?: string;
      backboard?: string;
      usage?: string;
    };
  }>;
}

export default function CustomerAccountPage() {
  const { user, isLoggedIn, login, register, logout, updateProfile, resetPassword } = useCustomerAuth();

  // Auth Modal/Page UI State
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth Forms
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");

  // Customer Portal UI State
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("neon_past_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load past orders", e);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
    }
  }, [user]);

  // Handlers for Login / Register / Forgot Password
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!loginForm.email) {
      setAuthError("Please enter your email address.");
      return;
    }
    setIsSubmitting(true);
    const res = await login(loginForm.email, loginForm.password);
    setIsSubmitting(false);
    if (!res.success && res.error) {
      setAuthError(res.error);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!regForm.fullName || !regForm.email || !regForm.phone || !regForm.password) {
      setAuthError("Please fill in all required registration fields.");
      return;
    }
    if (regForm.password !== regForm.confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    const res = await register({
      fullName: regForm.fullName,
      email: regForm.email,
      phone: regForm.phone,
      password: regForm.password,
    });
    setIsSubmitting(false);
    if (!res.success && res.error) {
      setAuthError(res.error);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setResetMessage("");
    if (!forgotEmail) {
      setAuthError("Please enter your registered email address.");
      return;
    }
    setIsSubmitting(true);
    const res = await resetPassword(forgotEmail);
    setIsSubmitting(false);
    if (res.success) {
      setResetMessage(res.message);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await updateProfile({
      fullName: profileForm.fullName,
      phone: profileForm.phone,
      address: profileForm.address,
      city: profileForm.city,
      state: profileForm.state,
      pincode: profileForm.pincode,
    });
    setIsSubmitting(false);
    
    if (res.success) {
      setIsEditingProfile(false);
    } else {
      alert(res.error || "Failed to update profile.");
    }
  };

  const clearOrderHistory = () => {
    if (confirm("Clear all order history from this browser?")) {
      localStorage.removeItem("neon_past_orders");
      setOrders([]);
    }
  };

  // 1. IF CUSTOMER IS NOT LOGGED IN -> SHOW AUTHENTICATION WINDOW (LOGIN / REGISTER / FORGOT PASSWORD)
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-brand-purple/30">
        <Header />

        <div className="max-w-md w-full mx-auto px-4 py-16 flex-1 flex flex-col justify-center">
          <div className="bg-[#111111] border-2 border-brand-purple/50 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(117,46,255,0.25)] space-y-6 relative">
            {/* Header Icon */}
            <div className="w-16 h-16 bg-brand-purple/10 border-2 border-brand-purple/50 rounded-full flex items-center justify-center mx-auto text-brand-purple shadow-[0_0_20px_rgba(117,46,255,0.5)]">
              {authMode === "forgot" ? (
                <KeyRound className="w-8 h-8" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>

            {/* Title & Description */}
            <div className="text-center space-y-1">
              <h1 
                className="text-2xl md:text-3xl font-black text-white"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                {authMode === "login" && "Sign In to Your Account"}
                {authMode === "register" && "Create Customer Account"}
                {authMode === "forgot" && "Reset Your Password"}
              </h1>
              <p 
                className="text-xs text-gray-400"
                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
              >
                {authMode === "login" && "Access your saved orders, warranty & custom designs"}
                {authMode === "register" && "Register to save custom signs & enjoy express warranty tracking"}
                {authMode === "forgot" && "Enter your email to receive a secure password reset link"}
              </p>
            </div>

            {/* Error & Success Messages */}
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs text-center font-bold">
                {authError}
              </div>
            )}

            {resetMessage && (
              <div className="p-4 rounded-xl bg-[#6eff86]/10 border border-[#6eff86]/40 text-[#6eff86] text-xs text-center font-bold space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Password Reset Email Sent</span>
                </div>
                <p className="text-gray-200">{resetMessage}</p>
              </div>
            )}

            {/* LOGIN FORM */}
            {authMode === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label 
                      className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      <Lock className="w-3.5 h-3.5 text-brand-purple" />
                      <span>Password *</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("forgot");
                        setAuthError("");
                        setResetMessage("");
                      }}
                      className="text-xs font-bold text-[#6eff86] hover:underline"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl pl-4 pr-11 py-3 text-white text-sm outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                      title={showPassword ? "Hide Password" : "Show Password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-brand-purple to-[#9d4edd] hover:from-[#853aff] hover:to-[#a95dff] text-white font-black rounded-full shadow-[0_0_25px_rgba(117,46,255,0.6)] hover:scale-[1.02] transition-all text-sm uppercase tracking-wider disabled:opacity-50"
                  style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>

                <div className="pt-2 text-center">
                  <span className="text-xs text-gray-400">Don&apos;t have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError("");
                      setResetMessage("");
                    }}
                    className="text-xs font-bold text-[#6eff86] hover:underline"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Create New Account (Register)
                  </button>
                </div>
              </form>
            )}

            {/* REGISTER FORM */}
            {authMode === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    <User className="w-3.5 h-3.5 text-[#6eff86]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#6eff86]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#6eff86]" />
                    <span>Mobile Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label 
                      className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      <Lock className="w-3.5 h-3.5 text-[#6eff86]" />
                      <span>Password *</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={regForm.password}
                        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl pl-3.5 pr-10 py-3 text-white text-sm outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                        title={showPassword ? "Hide Password" : "Show Password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label 
                      className="text-xs font-bold uppercase tracking-wider text-gray-300"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      <span>Confirm *</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={regForm.confirmPassword}
                        onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl pl-3.5 pr-10 py-3 text-white text-sm outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                        title={showConfirmPassword ? "Hide Password" : "Show Password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <ButtonParticles
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  label={isSubmitting ? "Creating Account..." : "Create Account"}
                />

                <div className="pt-2 text-center">
                  <span className="text-xs text-gray-400">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                      setResetMessage("");
                    }}
                    className="text-xs font-bold text-[#6eff86] hover:underline"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Sign In Here
                  </button>
                </div>
              </form>
            )}

            {/* FORGOT PASSWORD FORM */}
            {authMode === "forgot" && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label 
                    className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Registered Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-brand-purple to-[#9d4edd] hover:from-[#853aff] hover:to-[#a95dff] text-white font-black rounded-full shadow-[0_0_25px_rgba(117,46,255,0.6)] hover:scale-[1.02] transition-all text-sm uppercase tracking-wider disabled:opacity-50"
                  style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                >
                  {isSubmitting ? "Sending Link..." : "Send Password Reset Link"}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                      setResetMessage("");
                    }}
                    className="text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center gap-1.5 mx-auto"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // 2. IF CUSTOMER IS LOGGED IN -> SHOW CUSTOMER ACCOUNT PORTAL
  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-brand-purple/30">
      <Header />

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-12 flex-1">
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-xs font-black uppercase tracking-wider mb-2">
              <User className="w-3.5 h-3.5" />
              <span>Customer Portal Session</span>
            </div>
            <h1 
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              <span className="text-white">Welcome,</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
                {user?.fullName || "Valued Customer"}
              </span>
            </h1>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <ButtonParticles
              href="/products/customize-neon-signs"
              label="Customize A New Sign"
              icon={<Sparkles className="w-4 h-4 text-white transition-colors duration-300 group-hover:text-[#6eff86]" />}
            />

            <button
              onClick={logout}
              className="px-5 py-3 bg-zinc-900 border border-zinc-700 hover:border-red-500/50 text-gray-300 hover:text-red-400 font-extrabold rounded-full transition-all text-xs uppercase tracking-wider flex items-center gap-2"
              style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-full font-extrabold text-sm transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-brand-purple text-white shadow-[0_0_20px_rgba(117,46,255,0.6)]"
                : "bg-[#111111] text-gray-400 hover:text-white border border-gray-800"
            }`}
            style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-full font-extrabold text-sm transition-all flex items-center gap-2 ${
              activeTab === "profile"
                ? "bg-brand-purple text-white shadow-[0_0_20px_rgba(117,46,255,0.6)]"
                : "bg-[#111111] text-gray-400 hover:text-white border border-gray-800"
            }`}
            style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
          >
            <User className="w-4 h-4" />
            <span>My Customer Profile</span>
          </button>
        </div>

        {/* Orders Tab Content */}
        {activeTab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <div className="bg-[#111111] border border-gray-800 rounded-3xl p-12 text-center max-w-2xl mx-auto my-8">
                <div className="w-20 h-20 bg-brand-purple/10 border border-brand-purple/30 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-purple shadow-[0_0_25px_rgba(117,46,255,0.3)]">
                  <Package className="w-10 h-10" />
                </div>
                <h2 
                  className="text-2xl font-black mb-3 text-white"
                  style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                >
                  No Orders Yet
                </h2>
                <p 
                  className="text-gray-400 mb-8 max-w-md mx-auto text-sm"
                  style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                >
                  When you customize or purchase a neon sign from our workshop, your order tracking and 2-year warranty details will appear right here.
                </p>
                <ButtonParticles
                  href="/products/customize-neon-signs"
                  label="Design My Custom Sign"
                  icon={<ArrowRight className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-[#6eff86]" />}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 
                    className="text-sm font-bold text-gray-400 uppercase tracking-wider"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Past Orders & Production History
                  </h3>
                  <button
                    onClick={clearOrderHistory}
                    className="text-xs font-bold text-gray-500 hover:text-red-400 transition-colors"
                  >
                    Clear Local History
                  </button>
                </div>

                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#111111] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 hover:border-gray-700 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span 
                            className="font-black text-xl text-[#6eff86]"
                            style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                          >
                            Order #{order.id}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#6eff86]/10 text-[#6eff86] border border-[#6eff86]/30 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 animate-pulse" />
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Placed on <strong className="text-white">{order.date}</strong> — Estimated Delivery: 7–10 Days
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-xs text-gray-400 uppercase font-semibold">Total Amount</div>
                        <div 
                          className="text-xl font-black text-[#6eff86] drop-shadow-[0_0_8px_rgba(110,255,134,0.6)]"
                          style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                        >
                          ₹{order.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-black/50 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span 
                                className="font-bold text-white text-base"
                                style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                              >
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-400">× {item.quantity}</span>
                            </div>

                            {item.customDetails && (
                              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                                <div>
                                  Font: <strong className="text-gray-200">{item.customDetails.font}</strong>
                                </div>
                                <div>
                                  Color: <strong className="text-[#6eff86]">{item.customDetails.color}</strong>
                                </div>
                                <div>
                                  Size: <strong className="text-gray-200">{item.customDetails.size}</strong>
                                </div>
                              </div>
                            )}
                          </div>

                          <div 
                            className="font-extrabold text-white text-sm"
                            style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                          >
                            ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address Summary */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-white/5 pt-4 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-purple flex-shrink-0" />
                        <span>
                          Delivering to: <strong className="text-gray-200">{order.customer.fullName}</strong> ({order.customer.address}, {order.customer.city})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#6eff86]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>2-Year Warranty & Express Insurance Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab Content (REPLACED DEFAULT CURRENCY & WARRANTY TIER BOXES) */}
        {activeTab === "profile" && (
          <div className="space-y-8 max-w-4xl">
            <div className="bg-[#111111] border-2 border-brand-purple/50 rounded-3xl p-6 md:p-10 shadow-[0_0_30px_rgba(117,46,255,0.2)] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 
                    className="text-xl md:text-2xl font-black text-white"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Customer Personal Information
                  </h2>
                  <p 
                    className="text-xs text-gray-400 mt-1"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    Manage your contact details and default delivery address for faster studio checkouts.
                  </p>
                </div>

                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-[#6eff86] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto"
                    style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#6eff86]" />
                    <span>Edit Profile Details</span>
                  </button>
                )}
              </div>

              {!isEditingProfile ? (
                /* Display Mode */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-black/60 border border-gray-800 rounded-2xl p-5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                      Full Name
                    </span>
                    <span 
                      className="text-base font-black text-white block"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      {user?.fullName || "Not Specified"}
                    </span>
                  </div>

                  <div className="bg-black/60 border border-gray-800 rounded-2xl p-5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                      Registered Email
                    </span>
                    <span 
                      className="text-base font-black text-[#6eff86] block"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      {user?.email || "Not Specified"}
                    </span>
                  </div>

                  <div className="bg-black/60 border border-gray-800 rounded-2xl p-5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                      Mobile Phone Number
                    </span>
                    <span 
                      className="text-base font-black text-white block"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      {user?.phone || "No phone added yet"}
                    </span>
                  </div>

                  <div className="bg-black/60 border border-gray-800 rounded-2xl p-5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                      Default Delivery Address
                    </span>
                    <span 
                      className="text-base font-black text-gray-300 block"
                      style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
                    >
                      {user?.address
                        ? `${user.address}, ${user.city || ""} ${user.state || ""} - ${user.pincode || ""}`
                        : "No default shipping address saved yet"}
                    </span>
                  </div>
                </div>
              ) : (
                /* Edit Mode Form */
                <form onSubmit={handleProfileSave} className="space-y-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, fullName: e.target.value })
                        }
                        placeholder="Your full name"
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        Mobile Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        Street Address / Apartment
                      </label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, address: e.target.value })
                        }
                        placeholder="Flat 402, Green Tower, MG Road"
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        City
                      </label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, city: e.target.value })
                        }
                        placeholder="Mumbai"
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={profileForm.pincode}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, pincode: e.target.value })
                        }
                        placeholder="400001"
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <ButtonParticles
                      type="submit"
                      label="Save Changes"
                    />
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-white text-white font-bold rounded-full transition-all text-xs uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
