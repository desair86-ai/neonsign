import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { Header } from '@/components/clone/Header';
import { GlobalFooter } from "@/components/clone/GlobalFooter";

export const metadata = {
  title: 'Contact Us | Neon Stack',
  description: 'Get in touch with Neon Stack for all your custom neon sign needs.',
};

import fs from 'fs';
import path from 'path';
import ContactContent from './ContactContent';

function getContactInfo() {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/contact-info.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      phone1: '+91 7780177568',
      phone2: '+91 9107707777',
      email: 'info@neonstack.com',
      receiveEmails: 'desai.r.86@gmail.com'
    };
  }
}

export default function ContactPage() {
  const contactInfo = getContactInfo();

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
            <span className="text-white">Get</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">
              in Touch
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Got some neon-related news? Get in touch regarding any doubt, questions or simply tell us how much you love Neon Stack (we love ourselves some good feedback!)
          </p>
        </div>

        <ContactContent contactInfo={contactInfo} />
      </div>
    </div>
    <GlobalFooter />
    </>
  );
}


