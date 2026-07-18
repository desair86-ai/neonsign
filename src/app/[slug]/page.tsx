import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from('pages').select('title').eq('slug', slug).single();
  
  if (!data) {
    return { title: 'Page Not Found' };
  }
  
  return {
    title: `${data.title} | The Neon Stack`,
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: page, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !page) {
    notFound();
  }

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-brand-purple">
        {page.title}
      </h1>
      
      <div 
        className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-brand-purple 
          prose-a:text-brand-green hover:prose-a:text-green-400
          prose-strong:text-white"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
