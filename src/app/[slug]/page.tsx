import React from 'react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/clone/Header';
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  let { data: page, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', `/${slug}`)
    .single();

  if (!page) {
    const res = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();
    
    page = res.data;
    error = res.error;
  }

  if (error || !page) {
    // Fallback for standard policy pages when database is empty or not connected
    const fallbacks: Record<string, { title: string, content: string }> = {
      'shipping-policy': { 
        title: 'Shipping Policy', 
        content: '<p>All our custom neon signs are handcrafted to order. Standard manufacturing and shipping typically takes 2-3 weeks. Expedited options may be available at checkout.</p><p>Once your order has shipped, you will receive a tracking number via email.</p>' 
      },
      'return-refund': { 
        title: 'Return & Refund', 
        content: '<p>Because our signs are custom-made to your exact specifications, we do not accept returns or offer refunds for changes of mind. However, if your sign arrives damaged or faulty, please contact us within 48 hours of delivery with photos of the item and packaging, and we will arrange a replacement.</p>' 
      },
      'terms-of-service': { 
        title: 'Terms of Service', 
        content: '<p>By using our website and purchasing from The Neon Stack, you agree to our terms and conditions. All designs created using our customizer tool remain the property of The Neon Stack. We reserve the right to refuse any order containing offensive or trademarked material.</p>' 
      }
    };
    
    if (fallbacks[slug]) {
      page = fallbacks[slug];
    } else {
      notFound();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-purple selection:text-white">
      <Header />
      <main className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto prose prose-invert prose-brand">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple mb-12">
          {page.title}
        </h1>
        <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: page.content || page.body || '' }} />
      </main>
      <GlobalFooter />
    </div>
  );
}

