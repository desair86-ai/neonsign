"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2 } from "lucide-react";

export default function ThemeSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState({
    brand_green: "#00ff9d",
    brand_purple: "#a855f7",
    background_gradient: "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
  });

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (data) setTheme(data);
    } catch (error) {
      console.error('Error fetching theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTheme = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('theme_settings')
        .upsert({ id: 1, ...theme });
      
      if (error) throw error;
      alert("Theme saved successfully! Changes will reflect across the site.");
    } catch (error) {
      console.error('Error saving theme:', error);
      alert("Error saving theme");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={48} /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-pacifico text-brand-green">Theme Settings</h1>
        <button 
          onClick={saveTheme}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-purple hover:bg-purple-600 text-white px-6 py-2 rounded-full font-bold transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Changes
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-8">
        {/* Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">Brand Green</label>
            <div className="flex gap-4 items-center">
              <input 
                type="color" 
                value={theme.brand_green}
                onChange={e => setTheme({...theme, brand_green: e.target.value})}
                className="w-16 h-16 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <input 
                type="text" 
                value={theme.brand_green}
                onChange={e => setTheme({...theme, brand_green: e.target.value})}
                className="bg-black border border-gray-700 rounded-lg px-4 py-2 text-white font-mono flex-1 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">Brand Purple</label>
            <div className="flex gap-4 items-center">
              <input 
                type="color" 
                value={theme.brand_purple}
                onChange={e => setTheme({...theme, brand_purple: e.target.value})}
                className="w-16 h-16 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <input 
                type="text" 
                value={theme.brand_purple}
                onChange={e => setTheme({...theme, brand_purple: e.target.value})}
                className="bg-black border border-gray-700 rounded-lg px-4 py-2 text-white font-mono flex-1 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
          </div>
        </div>

        {/* Gradient */}
        <div className="space-y-4 pt-8 border-t border-gray-800">
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">Background CSS (Gradient)</label>
          <textarea 
            value={theme.background_gradient || ""}
            onChange={e => setTheme({...theme, background_gradient: e.target.value})}
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white font-mono focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none h-32"
            placeholder="e.g. linear-gradient(to right, #000, #333)"
          />
          
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Live Preview:</p>
            <div 
              className="w-full h-48 rounded-xl border border-gray-700" 
              style={{ background: theme.background_gradient || '#000' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
