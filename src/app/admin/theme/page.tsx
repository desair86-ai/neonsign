"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2 } from "lucide-react";
import { AuroraColorTester } from "@/components/ui/aurora-color-tester";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { revalidateTheme } from "./actions";

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
      
      await revalidateTheme();
      alert("Theme saved successfully!");
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

        {/* Gradient / Background */}
        <div className="space-y-6 pt-8 border-t border-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Quick Gradient Builder</label>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-2">
                <span className="text-xs text-gray-500 uppercase">Top Color</span>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    onChange={e => setTheme({...theme, background_gradient: `linear-gradient(135deg, ${e.target.value}, ${theme.background_gradient?.match(/#([a-f0-9]{3,6})/gi)?.[1] || '#000000'})`})}
                    className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-gray-500 uppercase">Bottom Color</span>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    onChange={e => setTheme({...theme, background_gradient: `linear-gradient(135deg, ${theme.background_gradient?.match(/#([a-f0-9]{3,6})/gi)?.[0] || '#000000'}, ${e.target.value})`})}
                    className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <span className="text-xs text-gray-500 uppercase">Or Choose a Preset</span>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setTheme({...theme, background_gradient: 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)'})} className="h-12 w-12 rounded-lg hover:ring-2 ring-white shadow-lg" style={{background: 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)'}} title="Neon Conic" />
                  <button onClick={() => setTheme({...theme, background_gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'})} className="h-12 w-12 rounded-lg hover:ring-2 ring-white shadow-lg" style={{background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'}} title="Dark Teal" />
                  <button onClick={() => setTheme({...theme, background_gradient: 'radial-gradient(circle at 50% 0%, #3b185f 0%, #000000 80%)'})} className="h-12 w-12 rounded-lg hover:ring-2 ring-white shadow-lg" style={{background: 'radial-gradient(circle at 50% 0%, #3b185f 0%, #000000 80%)'}} title="Deep Purple Glow" />
                  <button onClick={() => setTheme({...theme, background_gradient: 'linear-gradient(to right, #000000, #434343)'})} className="h-12 w-12 rounded-lg hover:ring-2 ring-white shadow-lg" style={{background: 'linear-gradient(to right, #000000, #434343)'}} title="Sleek Gray" />
                  <button onClick={() => setTheme({...theme, background_gradient: '#000000'})} className="h-12 w-12 rounded-lg border border-gray-700 hover:ring-2 ring-white shadow-lg" style={{background: '#000000'}} title="Solid Black" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Advanced: Raw CSS Code</label>
            <textarea 
              value={theme.background_gradient || ""}
              onChange={e => setTheme({...theme, background_gradient: e.target.value})}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white font-mono focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none h-24"
              placeholder="e.g. linear-gradient(to right, #000, #333)"
            />
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Live Preview (Solid/Gradient):</p>
            <div 
              className="w-full h-48 rounded-xl border border-gray-700" 
              style={{ background: theme.background_gradient || '#000' }}
            />
          </div>
        </div>

        {/* Aurora Background */}
        <div className="space-y-6 pt-8 border-t border-gray-800">
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">Aurora Animated Background Settings</label>
          <AuroraColorTester />
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Live Preview (Aurora):</p>
            <AuroraBackground className="h-64 rounded-xl border border-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
