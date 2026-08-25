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

  // 2. Customer Portal Tabs State
  const [currentTab, setCurrentTab] = useState<"dashboard" | "orders" | "addresses" | "account-details">("dashboard");

  // 1. IF CUSTOMER IS NOT LOGGED IN -> SHOW AUTHENTICATION WINDOW (SIDE-BY-SIDE)
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-brand-purple/30">
        <Header />

        <div className="max-w-6xl w-full mx-auto px-4 py-16 flex-1 flex flex-col justify-center">
          
          <h1 className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tight" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
            My Account
          </h1>

          {/* Error & Success Messages */}
          {authError && (
            <div className="max-w-3xl mx-auto w-full mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm text-center font-bold">
              {authError}
            </div>
          )}

          {resetMessage && (
            <div className="max-w-3xl mx-auto w-full mb-8 p-4 rounded-xl bg-[#6eff86]/10 border border-[#6eff86]/40 text-[#6eff86] text-sm text-center font-bold space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Password Reset Email Sent</span>
              </div>
              <p className="text-gray-200">{resetMessage}</p>
            </div>
          )}

          {authMode === "forgot" ? (
             <div className="max-w-md w-full mx-auto bg-[#111111] border-2 border-brand-purple/50 rounded-3xl p-8 shadow-[0_0_40px_rgba(117,46,255,0.15)]">
                <div className="w-16 h-16 bg-brand-purple/10 border-2 border-brand-purple/50 rounded-full flex items-center justify-center mx-auto text-brand-purple shadow-[0_0_20px_rgba(117,46,255,0.5)] mb-6">
                  <KeyRound className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-white text-center mb-2">Reset Your Password</h2>
                <p className="text-sm text-gray-400 text-center mb-8">Enter your email to receive a secure password reset link</p>
                <form onSubmit={handleForgotSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-300">Registered Email Address *</label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                  <ButtonParticles type="submit" disabled={isSubmitting} className="w-full" label={isSubmitting ? "Sending Link..." : "Send Reset Link"} />
                  <div className="pt-2 text-center">
                    <button type="button" onClick={() => { setAuthMode("login"); setAuthError(""); setResetMessage(""); }} className="text-sm font-bold text-gray-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto">
                      <ArrowLeft className="w-4 h-4" /> Back to Sign In
                    </button>
                  </div>
                </form>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 items-start max-w-5xl mx-auto w-full">
              
              {/* LOGIN COLUMN */}
              <div className="bg-[#111111]/40 border border-gray-800 rounded-3xl p-8 md:p-10">
                <h2 className="text-3xl font-black text-white mb-8" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                  Login
                </h2>
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full bg-black border border-gray-700 focus:border-brand-purple rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full bg-black border border-gray-700 focus:border-brand-purple rounded-xl pl-4 pr-11 py-3 text-white text-sm outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-black text-brand-purple focus:ring-brand-purple focus:ring-offset-black" />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("forgot");
                        setAuthError("");
                        setResetMessage("");
                      }}
                      className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      Lost your password?
                    </button>
                  </div>

                  <div className="pt-4">
                    <ButtonParticles
                      type="submit"
                      disabled={isSubmitting}
                      label={isSubmitting ? "Logging In..." : "Log In"}
                    />
                  </div>
                </form>
              </div>

              {/* REGISTER COLUMN */}
              <div className="bg-[#111111]/40 border border-gray-800 rounded-3xl p-8 md:p-10">
                <h2 className="text-3xl font-black text-white mb-8" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}>
                  Register
                </h2>
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                        Password *
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={regForm.password}
                        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                        Confirm *
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={regForm.confirmPassword}
                        onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                        className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed pt-2">
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                  </p>

                  <div className="pt-2">
                    <ButtonParticles
                      type="submit"
                      disabled={isSubmitting}
                      label={isSubmitting ? "Registering..." : "Register"}
                    />
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>
        <Footer />
      </main>
    );
  }

  // 2. IF CUSTOMER IS LOGGED IN -> SHOW CUSTOMER ACCOUNT PORTAL
  const tabList = [
    { id: "dashboard", label: "Dashboard", icon: <User className="w-4 h-4" /> },
    { id: "orders", label: "Orders", icon: <Package className="w-4 h-4" /> },
    { id: "addresses", label: "Addresses", icon: <MapPin className="w-4 h-4" /> },
    { id: "account-details", label: "Account details", icon: <User className="w-4 h-4" /> },
  ] as const;

  return (
    <main className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-brand-purple/30">
      <Header />

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 py-12 flex-1">
        <h1 
          className="text-3xl md:text-5xl font-black tracking-tight mb-10"
          style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.6)" }}
        >
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-8 xl:gap-16">
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="flex flex-col space-y-1">
              {tabList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`text-left px-5 py-4 font-bold text-sm transition-all border-l-2 ${
                    currentTab === tab.id
                      ? "border-brand-purple text-white bg-white/5"
                      : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={{ textShadow: currentTab === tab.id ? "0 0 2px rgba(255, 255, 255, 0.6)" : "none" }}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={logout}
                className="text-left px-5 py-4 font-bold text-sm transition-all border-l-2 border-transparent text-gray-400 hover:text-red-400 hover:bg-red-500/5"
              >
                Log out
              </button>
            </nav>
          </aside>

          {/* TAB CONTENT */}
          <div className="flex-1">
            
            {/* DASHBOARD TAB */}
            {currentTab === "dashboard" && (
              <div className="space-y-6">
                <p className="text-gray-300 text-lg">
                  Hello <strong className="text-white">{user?.fullName || user?.email}</strong> (not <strong className="text-white">{user?.fullName || user?.email}</strong>?{" "}
                  <button onClick={logout} className="text-[#6eff86] hover:underline">Log out</button>)
                </p>
                <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                  From your account dashboard you can view your{" "}
                  <button onClick={() => setCurrentTab("orders")} className="text-white hover:text-brand-purple transition-colors">recent orders</button>, manage your{" "}
                  <button onClick={() => setCurrentTab("addresses")} className="text-white hover:text-brand-purple transition-colors">shipping and billing addresses</button>, and{" "}
                  <button onClick={() => setCurrentTab("account-details")} className="text-white hover:text-brand-purple transition-colors">edit your password and account details</button>.
                </p>

                <div className="mt-8 pt-8 border-t border-white/10">
                   <ButtonParticles
                    href="/products/customize-neon-signs"
                    label="Customize A New Sign"
                    icon={<Sparkles className="w-4 h-4 text-white transition-colors duration-300 group-hover:text-[#6eff86]" />}
                  />
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {currentTab === "orders" && (
              <div>
                {orders.length === 0 ? (
                  <div className="bg-[#111111] border border-gray-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-gray-400">No order has been made yet.</span>
                    <ButtonParticles
                      href="/products/customize-neon-signs"
                      label="Browse Products"
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                        Past Orders
                      </h3>
                      <button
                        onClick={clearOrderHistory}
                        className="text-sm font-bold text-gray-500 hover:text-red-400 transition-colors"
                      >
                        Clear Local History
                      </button>
                    </div>

                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-[#111111] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 hover:border-brand-purple/30 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-xl text-[#6eff86]">
                                Order #{order.id}
                              </span>
                              <span className="px-3 py-1 rounded-full text-sm font-extrabold bg-[#6eff86]/10 text-[#6eff86] border border-[#6eff86]/30 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 animate-pulse" />
                                {order.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-400">
                              Placed on <strong className="text-white">{order.date}</strong>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="text-xl font-black text-[#6eff86]">
                              ₹{order.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="bg-black/50 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white text-base">{item.name}</span>
                                  <span className="text-sm text-gray-400">× {item.quantity}</span>
                                </div>
                              </div>
                              <div className="font-extrabold text-white text-sm">
                                ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {currentTab === "addresses" && (
              <div className="space-y-6">
                <p className="text-gray-400 text-sm mb-8">
                  The following addresses will be used on the checkout page by default.
                </p>

                <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 md:p-10 shadow-[0_0_30px_rgba(117,46,255,0.05)]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-white">Billing address</h3>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="text-[#6eff86] font-bold text-sm hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {!isEditingProfile ? (
                    <div className="text-gray-300 text-sm space-y-1">
                      {user?.fullName ? <div className="text-white font-bold mb-2">{user.fullName}</div> : <div className="italic text-gray-500 mb-2">You have not set up this type of address yet.</div>}
                      {user?.address && <div>{user.address}</div>}
                      {user?.city && <div>{user.city}</div>}
                      {user?.state && <div>{user.state}</div>}
                      {user?.pincode && <div>{user.pincode}</div>}
                    </div>
                  ) : (
                    <form onSubmit={handleProfileSave} className="space-y-5 pt-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold uppercase text-gray-400">Street Address</label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                          className="w-full bg-black border border-gray-700 focus:border-brand-purple rounded-xl px-4 py-3 text-white text-sm outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-bold uppercase text-gray-400">City</label>
                          <input
                            type="text"
                            value={profileForm.city}
                            onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                            className="w-full bg-black border border-gray-700 focus:border-brand-purple rounded-xl px-4 py-3 text-white text-sm outline-none"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-bold uppercase text-gray-400">PIN Code</label>
                          <input
                            type="text"
                            value={profileForm.pincode}
                            onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                            className="w-full bg-black border border-gray-700 focus:border-brand-purple rounded-xl px-4 py-3 text-white text-sm outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <ButtonParticles type="submit" label="Save Address" />
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-6 py-3 text-gray-400 hover:text-white font-bold rounded-full transition-all text-sm uppercase"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* ACCOUNT DETAILS TAB */}
            {currentTab === "account-details" && (
              <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 md:p-10 shadow-[0_0_30px_rgba(117,46,255,0.05)]">
                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold uppercase text-gray-400">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold uppercase text-gray-400">Email Address *</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ""}
                      className="w-full bg-black/50 border border-gray-800 text-gray-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                    />
                    <p className="text-sm text-gray-600 italic mt-1">Email address cannot be changed</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold uppercase text-gray-400">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none"
                    />
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-black text-white mb-4">Password change</h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold uppercase text-gray-400">Current password (leave blank to leave unchanged)</label>
                        <input
                          type="password"
                          className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold uppercase text-gray-400">New password (leave blank to leave unchanged)</label>
                        <input
                          type="password"
                          className="w-full bg-black border border-gray-700 focus:border-[#6eff86] rounded-xl px-4 py-3 text-white text-sm outline-none"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-3 italic">
                      Note: Password change via API requires a dedicated endpoint. Updating your profile name/phone will work above!
                    </p>
                  </div>

                  <div className="pt-4">
                    <ButtonParticles type="submit" label={isSubmitting ? "Saving..." : "Save changes"} disabled={isSubmitting} />
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
