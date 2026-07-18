"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Plus, Edit2, Trash2, Loader2, Link as LinkIcon, FileText } from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Page = {
  id: string;
  slug: string;
  title: string;
  content: string;
  is_published: boolean;
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-700 bg-gray-900 rounded-t-xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-gray-800'}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-gray-800'}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-gray-800'}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-gray-800'}`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-gray-800'}`}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded ${editor.isActive('orderedList') ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-gray-800'}`}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1 rounded ${editor.isActive('blockquote') ? 'bg-brand-purple text-white' : 'text-gray-400 hover:bg-gray-800'}`}
      >
        Blockquote
      </button>
    </div>
  );
};

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-brand max-w-none focus:outline-none min-h-[300px] p-6',
      },
    },
  });

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (editor && editingPage) {
      editor.commands.setContent(editingPage.content || '');
    }
  }, [editingPage, editor]);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingPage({
      id: '',
      slug: '',
      title: '',
      content: '',
      is_published: false
    });
    editor?.commands.setContent('');
  };

  const savePage = async () => {
    if (!editingPage) return;
    setSaving(true);
    try {
      const htmlContent = editor?.getHTML() || '';
      
      const payload = {
        title: editingPage.title,
        slug: editingPage.slug,
        content: htmlContent,
        is_published: editingPage.is_published,
        updated_at: new Date().toISOString()
      };

      if (editingPage.id) {
        // Update
        const { error } = await supabase.from('pages').update(payload).eq('id', editingPage.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from('pages').insert([payload]);
        if (error) throw error;
      }
      
      await fetchPages();
      setEditingPage(null);
      alert("Page saved successfully!");
    } catch (error) {
      console.error('Error saving page:', error);
      alert("Error saving page");
    } finally {
      setSaving(false);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    try {
      const { error } = await supabase.from('pages').delete().eq('id', id);
      if (error) throw error;
      await fetchPages();
    } catch (error) {
      console.error("Error deleting page", error);
    }
  };

  if (loading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={48} /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-pacifico text-brand-green">Static Pages</h1>
        {!editingPage && (
          <button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-brand-purple hover:bg-purple-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
          >
            <Plus size={20} />
            Create Page
          </button>
        )}
      </div>

      {editingPage ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-4">
            <h2 className="text-xl font-bold">{editingPage.id ? 'Edit Page' : 'New Page'}</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => setEditingPage(null)} className="text-gray-400 hover:text-white px-4 py-2">Cancel</button>
              <button 
                onClick={savePage}
                disabled={saving || !editingPage.title || !editingPage.slug}
                className="flex items-center gap-2 bg-brand-green text-black hover:bg-[#00e68d] px-6 py-2 rounded-full font-bold transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Page Title</label>
              <input 
                type="text" 
                value={editingPage.title}
                onChange={e => setEditingPage({...editingPage, title: e.target.value})}
                placeholder="e.g. Terms and Conditions"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">URL Slug</label>
              <div className="flex items-center relative">
                <span className="absolute left-4 text-gray-500">/</span>
                <input 
                  type="text" 
                  value={editingPage.slug}
                  onChange={e => setEditingPage({...editingPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                  placeholder="terms-and-conditions"
                  className="w-full bg-black border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white font-mono focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Content</label>
            <div className="border border-gray-700 rounded-xl overflow-hidden bg-black">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
            <input 
              type="checkbox" 
              id="publish"
              checked={editingPage.is_published}
              onChange={e => setEditingPage({...editingPage, is_published: e.target.checked})}
              className="w-5 h-5 accent-brand-purple"
            />
            <label htmlFor="publish" className="text-white font-medium cursor-pointer">Publish this page</label>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {pages.length === 0 ? (
            <div className="text-center p-12 bg-gray-900 border border-gray-800 rounded-2xl">
              <FileText className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">No pages found</h3>
              <p className="text-gray-400 mb-6">Create your first static page to get started.</p>
              <button 
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 bg-brand-purple hover:bg-purple-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
              >
                <Plus size={20} /> Create Page
              </button>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="p-4 text-sm font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="p-4 text-sm font-medium text-gray-400 uppercase tracking-wider">URL</th>
                  <th className="p-4 text-sm font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-right text-sm font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {pages.map(page => (
                  <tr key={page.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-bold text-lg">{page.title}</td>
                    <td className="p-4">
                      <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-purple hover:underline">
                        /{page.slug} <LinkIcon size={14} />
                      </a>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${page.is_published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {page.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setEditingPage(page)}
                          className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deletePage(page.id)}
                          className="p-2 text-gray-400 hover:text-red-400 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
