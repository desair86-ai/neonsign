"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone1: "",
    phone2: "",
    email: "",
    receiveEmails: ""
  });

  useEffect(() => {
    fetch('/api/contact-info')
      .then(res => res.json())
      .then(data => {
        setContactInfo(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/contact-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo)
      });
      if (res.ok) {
        alert("Contact info saved successfully!");
      } else {
        alert("Failed to save contact info");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={48} /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-pacifico text-brand-green">Settings</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-green text-black hover:bg-[#00e68d] px-6 py-2 rounded-full font-bold transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Settings
        </button>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Contact Page Settings</h2>
        <p className="text-gray-400 mb-8">Update the contact information displayed on the Contact Us page, and the email address that receives form submissions.</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Phone Number 1</label>
              <input 
                type="text" 
                value={contactInfo.phone1}
                onChange={e => setContactInfo({...contactInfo, phone1: e.target.value})}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Phone Number 2 (Optional)</label>
              <input 
                type="text" 
                value={contactInfo.phone2}
                onChange={e => setContactInfo({...contactInfo, phone2: e.target.value})}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Display Email Address</label>
              <input 
                type="email" 
                value={contactInfo.email}
                onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Receiving Email (for form submissions)</label>
              <input 
                type="email" 
                value={contactInfo.receiveEmails}
                onChange={e => setContactInfo({...contactInfo, receiveEmails: e.target.value})}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
