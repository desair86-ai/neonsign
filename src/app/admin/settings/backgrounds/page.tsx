"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, Upload, Loader2, Image as ImageIcon, Settings2, X } from 'lucide-react';

export interface BackgroundSettings {
  position_x: number;
  position_y: number;
  scale_small: number;
  scale_medium: number;
  scale_large: number;
  scale_xlarge: number;
  scale_xxlarge: number;
  scale_supersized: number;
}

interface Background {
  id: string;
  name: string;
  url: string;
  created_at: string;
  settings?: BackgroundSettings;
}

const DEFAULT_SETTINGS: BackgroundSettings = {
  position_x: 50,
  position_y: 35,
  scale_small: 0.7,
  scale_medium: 0.85,
  scale_large: 1.0,
  scale_xlarge: 1.15,
  scale_xxlarge: 1.3,
  scale_supersized: 1.5,
};

export default function NeonBackgroundsSettings() {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [newBgName, setNewBgName] = useState('');

  // Settings Modal State
  const [editingBg, setEditingBg] = useState<Background | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [formSettings, setFormSettings] = useState<BackgroundSettings>(DEFAULT_SETTINGS);

  const [newBgUrl, setNewBgUrl] = useState('');

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const fetchBackgrounds = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/settings/backgrounds');
      if (res.ok) {
        const data = await res.json();
        setBackgrounds(data.backgrounds || []);
      }
    } catch (error) {
      console.error('Failed to fetch backgrounds', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this background?')) return;
    
    try {
      const res = await fetch(`/api/settings/backgrounds?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBackgrounds(backgrounds.filter((bg) => bg.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete background', error);
    }
  };

  const handleAddUrl = async () => {
    if (!newBgName.trim() || !newBgUrl.trim()) {
      alert('Please enter both a Background Name and an Image URL.');
      return;
    }

    try {
      setIsUploading(true);
      const dbRes = await fetch('/api/settings/backgrounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBgName, url: newBgUrl }),
      });

      if (dbRes.ok) {
        const data = await dbRes.json();
        setBackgrounds([...backgrounds, data.background]);
        setNewBgName('');
        setNewBgUrl('');
      } else {
        const err = await dbRes.json();
        alert(err.error || 'Failed to add background');
      }
    } catch (error: any) {
      console.error('Add background error:', error);
      alert(error.message || 'Failed to add background');
    } finally {
      setIsUploading(false);
    }
  };

  const openSettings = (bg: Background) => {
    setEditingBg(bg);
    setFormSettings(bg.settings || DEFAULT_SETTINGS);
  };

  const saveSettings = async () => {
    if (!editingBg) return;
    
    try {
      setIsSavingSettings(true);
      const res = await fetch('/api/settings/backgrounds', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingBg.id, settings: formSettings }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setBackgrounds(backgrounds.map(b => b.id === editingBg.id ? data.background : b));
        setEditingBg(null);
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Save error', error);
      alert('Error saving settings');
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 relative">
      <h1 className="text-3xl font-bold font-pacifico text-brand-green">Neon Backgrounds</h1>
      
      {/* Upload Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-2">Add New Room Background</h2>
        <p className="text-gray-400 mb-6">
          Paste any Image URL (e.g. uploaded via your WooCommerce / WordPress Media Library or any direct image link) to instantly add it to the Custom Neon Studio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Background Name</label>
            <input 
              type="text" 
              placeholder="e.g. Living Room Wall"
              value={newBgName}
              onChange={(e) => setNewBgName(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-brand-green transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">WooCommerce / WordPress Image URL</label>
            <input 
              type="url" 
              placeholder="https://.../wp-content/uploads/room.jpg"
              value={newBgUrl}
              onChange={(e) => setNewBgUrl(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-brand-green transition-colors"
            />
          </div>
          <div>
            <button 
              onClick={handleAddUrl}
              disabled={isUploading || !newBgName.trim() || !newBgUrl.trim()}
              className="w-full bg-brand-green text-black font-bold py-3 px-4 rounded-lg hover:bg-brand-green/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-[50px]"
            >
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              {isUploading ? 'Adding...' : 'Add Background'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Backgrounds */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6">Active Backgrounds</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : backgrounds.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No backgrounds found. Upload your first one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {backgrounds.map((bg) => (
              <div key={bg.id} className="group relative rounded-xl overflow-hidden border border-gray-800 bg-black">
                <div className="aspect-video relative bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="font-medium text-sm truncate pr-2">{bg.name}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openSettings(bg)}
                      className="text-gray-500 hover:text-brand-purple transition-colors"
                      title="Configure Sign Position & Scale"
                    >
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(bg.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete background"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {editingBg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-black/30">
              <div>
                <h3 className="text-xl font-bold">Configure Neon Sign</h3>
                <p className="text-sm text-gray-400">Settings for &quot;{editingBg.name}&quot;</p>
              </div>
              <button onClick={() => setEditingBg(null)} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">


              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-purple mb-4">Scale Multipliers (Per Size)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Small Scale</label>
                    <input type="number" step="0.05" value={formSettings.scale_small} onChange={e => setFormSettings({...formSettings, scale_small: parseFloat(e.target.value)})} className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Medium Scale</label>
                    <input type="number" step="0.05" value={formSettings.scale_medium} onChange={e => setFormSettings({...formSettings, scale_medium: parseFloat(e.target.value)})} className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Large Scale</label>
                    <input type="number" step="0.05" value={formSettings.scale_large} onChange={e => setFormSettings({...formSettings, scale_large: parseFloat(e.target.value)})} className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">X-Large Scale</label>
                    <input type="number" step="0.05" value={formSettings.scale_xlarge} onChange={e => setFormSettings({...formSettings, scale_xlarge: parseFloat(e.target.value)})} className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">XX-Large Scale</label>
                    <input type="number" step="0.05" value={formSettings.scale_xxlarge} onChange={e => setFormSettings({...formSettings, scale_xxlarge: parseFloat(e.target.value)})} className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-gray-400">Supersized Scale</label>
                    <input type="number" step="0.05" value={formSettings.scale_supersized} onChange={e => setFormSettings({...formSettings, scale_supersized: parseFloat(e.target.value)})} className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-800 bg-black/30 flex justify-end gap-3">
              <button 
                onClick={() => setEditingBg(null)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={saveSettings}
                disabled={isSavingSettings}
                className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
