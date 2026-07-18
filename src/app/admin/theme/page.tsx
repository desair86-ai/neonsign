"use client";

import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, RefreshCw } from "lucide-react";

export default function ThemeEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [theme, setTheme] = useState({
    brand_green: "#6eff86",
    brand_purple: "#752eff",
    background_gradient: "conic-gradient(from 180deg at 50% 50%, #000000, #110022)",
  });

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*')
        .eq('id', 1)
        .single();
        
      if (data) {
        setTheme({
          brand_green: data.brand_green || "#6eff86",
          brand_purple: data.brand_purple || "#752eff",
          background_gradient: data.background_gradient || "conic-gradient(from 180deg at 50% 50%, #000000, #110022)",
        });
      }
    } catch (err) {
      console.error("Failed to load theme:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveTheme = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('theme_settings')
        .upsert({ 
          id: 1, 
          ...theme,
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
      alert("Theme saved successfully!");
    } catch (err) {
      console.error("Failed to save theme:", err);
      alert("Error saving theme.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-purple" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Theme Settings</h2>
          <p className="text-gray-400">Customize the look and feel of your storefront.</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={fetchTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={18} />
            Reset
          </button>
          <button 
            onClick={saveTheme}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-brand-purple hover:bg-purple-600 text-white font-semibold transition-colors shadow-[0_0_15px_rgba(117,46,255,0.4)] disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colors */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-green"></div>
            Brand Colors
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <label className="block text-sm text-gray-400 mb-3">Primary Green</label>
              <HexColorPicker 
                color={theme.brand_green} 
                onChange={(c) => setTheme({...theme, brand_green: c})} 
              />
              <div className="mt-3 flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-md" style={{ backgroundColor: theme.brand_green }}></div>
                <span className="font-mono text-sm">{theme.brand_green}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-3">Primary Purple</label>
              <HexColorPicker 
                color={theme.brand_purple} 
                onChange={(c) => setTheme({...theme, brand_purple: c})} 
              />
              <div className="mt-3 flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                <div className="w-6 h-6 rounded-md" style={{ backgroundColor: theme.brand_purple }}></div>
                <span className="font-mono text-sm">{theme.brand_purple}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Background Gradient</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">CSS Gradient Value</label>
              <textarea 
                value={theme.background_gradient}
                onChange={(e) => setTheme({...theme, background_gradient: e.target.value})}
                className="w-full h-24 bg-gray-800 border border-gray-700 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                placeholder="e.g. conic-gradient(from 180deg at 50% 50%, #000000, #110022)"
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Live Preview</label>
              <div 
                className="w-full h-32 rounded-xl border border-gray-700 flex items-center justify-center relative overflow-hidden"
                style={{ background: theme.background_gradient }}
              >
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                <span className="relative z-10 font-bold tracking-widest uppercase text-white/50">Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
