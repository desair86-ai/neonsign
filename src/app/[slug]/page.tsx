import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: page } = await supabase
    .from('pages')
    .select('title')
    .eq('slug', resolvedParams.slug)
    .single();

  return {
    title: page ? `${page.title} | Neon Stack` : 'Page Not Found',
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold font-pacifico text-brand-green mb-12 text-center">
        {page.title}
      </h1>
      
      {/* Prose class automatically styles the HTML from Tiptap */}
      <div 
        className="prose prose-invert prose-brand max-w-none bg-gray-900/50 p-8 md:p-12 rounded-3xl border border-gray-800 backdrop-blur-sm"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}
