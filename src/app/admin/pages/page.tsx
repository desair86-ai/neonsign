"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Plus, Edit2, Trash2, Loader2, Link as LinkIcon } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Page = {
  id: string;
  slug: string;
  title: string;
  content: string;
  published: boolean;
};

export default function PagesEditor() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: editingPage?.content || '',
    onUpdate: ({ editor }) => {
      if (editingPage) {
        setEditingPage({ ...editingPage, content: editor.getHTML() });
      }
    },
  });

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (editor && editingPage) {
      if (editor.getHTML() !== editingPage.content) {
        editor.commands.setContent(editingPage.content);
      }
    }
  }, [editingPage?.id, editor]);

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    if (data) setPages(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editingPage) return;
    setSaving(true);
    
    const pageData = {
      slug: editingPage.slug,
      title: editingPage.title,
      content: editingPage.content,
      published: editingPage.published,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingPage.id.startsWith('new-')) {
      const { error: insertError } = await supabase.from('pages').insert(pageData);
      error = insertError;
    } else {
      const { error: updateError } = await supabase.from('pages').update(pageData).eq('id', editingPage.id);
      error = updateError;
    }

    if (error) {
      alert("Failed to save page");
    } else {
      alert("Page saved successfully!");
      fetchPages();
      setEditingPage(null);
    }
    setSaving(false);
  };

  const createNewPage = () => {
    setEditingPage({
      id: `new-${Date.now()}`,
      slug: 'new-page',
      title: 'New Page',
      content: '<h1>New Page</h1><p>Start writing...</p>',
      published: false
    });
  };

  const deletePage = async (id: string) => {
    if (confirm("Are you sure you want to delete this page?")) {
      await supabase.from('pages').delete().eq('id', id);
      fetchPages();
    }
  };

  if (loading && !pages.length) {
    return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-brand-purple" size={32} /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Static Pages</h2>
          <p className="text-gray-400">Manage your About Us, Terms, and Policies.</p>
        </div>
        
        {!editingPage && (
          <button 
            onClick={createNewPage}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-green hover:bg-green-400 text-black font-bold transition-colors shadow-[0_0_15px_rgba(110,255,134,0.4)]"
          >
            <Plus size={18} />
            Create Page
          </button>
        )}
      </div>

      {editingPage ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Edit2 size={20} className="text-brand-purple" />
              Editing Page
            </h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 rounded-xl hover:bg-gray-800 text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 rounded-xl bg-brand-purple hover:bg-purple-600 text-white font-semibold transition-colors shadow-[0_0_15px_rgba(117,46,255,0.4)] disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Save Page
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Page Title</label>
              <input 
                type="text"
                value={editingPage.title}
                onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-brand-purple"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">URL Slug</label>
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl overflow-hidden focus-within:border-brand-purple">
                <div className="pl-3 pr-2 text-gray-500">/</div>
                <input 
                  type="text"
                  value={editingPage.slug}
                  onChange={(e) => setEditingPage({...editingPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                  className="w-full bg-transparent p-3 pl-0 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Content</label>
            <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-800 min-h-[300px]">
              {/* Tiptap Editor Toolbar could go here */}
              <div className="p-4 prose prose-invert max-w-none">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox"
              checked={editingPage.published}
              onChange={(e) => setEditingPage({...editingPage, published: e.target.checked})}
              className="w-5 h-5 rounded border-gray-700 text-brand-purple focus:ring-brand-purple bg-gray-800"
            />
            <span className="text-white">Publish this page</span>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pages.length === 0 ? (
            <div className="text-center p-12 bg-gray-900 border border-gray-800 rounded-2xl">
              <FileText className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">No pages found</h3>
              <p className="text-gray-400 mb-6">Create your first static page to get started.</p>
              <button 
                onClick={createNewPage}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-green text-black font-bold"
              >
                <Plus size={18} /> Create Page
              </button>
            </div>
          ) : (
            pages.map(page => (
              <div key={page.id} className="flex items-center justify-between p-5 bg-gray-900 border border-gray-800 rounded-2xl hover:border-gray-700 transition-colors">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    {page.title}
                    {!page.published && <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-md">Draft</span>}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <LinkIcon size={14} />
                    <span>/{page.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setEditingPage(page)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => deletePage(page.id)}
                    className="p-2 bg-gray-800 hover:bg-red-900/50 hover:text-red-400 text-white rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
