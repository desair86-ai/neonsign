"use client";
import React, { useState } from 'react';
import { Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactContent({ contactInfo }: { contactInfo: any }) {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', city: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Mobile: ${formData.mobile}\nCity: ${formData.city}\n\n${formData.message}`
        })
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', mobile: '', city: '', message: '' });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-24">
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
        {submitted ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-10 p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-brand-green mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-gray-400 mb-6">Thank you for getting in touch. We will get back to you shortly.</p>
            <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold text-white transition-colors">
              Send Another
            </button>
          </div>
        ) : null}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">E-mail</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="john@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Mobile</label>
              <input required type="tel" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="+91 00000 00000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">City</label>
              <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors" placeholder="Mumbai" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Message</label>
            <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white transition-colors resize-none" placeholder="How can we help you?"></textarea>
          </div>
          <button disabled={submitting} type="submit" className="w-full bg-gradient-to-r from-[#752eff] to-[#6eff86] hover:from-[#6eff86] hover:to-[#752eff] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50">
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit <Send className="w-5 h-5" /></>}
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide border-b border-white/10 pb-4">Business Queries</h3>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#f967fb] shadow-[0_0_15px_rgba(249,103,251,0.2)]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Phone</h4>
                <p className="text-gray-400 leading-relaxed">
                  {contactInfo.phone1}
                  {contactInfo.phone2 && <><br/>{contactInfo.phone2}</>}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Email</h4>
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-white transition-colors leading-relaxed">{contactInfo.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
