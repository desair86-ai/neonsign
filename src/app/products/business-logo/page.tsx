import React from 'react';
import { Header } from '@/components/clone/Header';
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { BusinessLogoClient } from './BusinessLogoClient';

export default function BusinessLogoPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-white font-sans flex flex-col pt-[80px]">
      <Header />
      <BusinessLogoClient />
      <GlobalFooter />
    </main>
  );
}

