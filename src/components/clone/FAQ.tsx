"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      question: "How much does a custom neon sign cost?",
      answer: "The cost of a custom neon sign depends on the size, design, and options chosen. Our signs typically start around ₹3000 and go up based on complexity."
    },
    {
      question: "Can you create a neon sign from my business logo?",
      answer: "Absolutely! We specialize in turning business logos into stunning LED neon signs. Just send us your logo and we'll provide a free mockup and quote."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard production and shipping takes about 7-10 business days. We also offer expedited shipping options if you need your sign urgently."
    },
    {
      question: "Are these traditional glass neon signs?",
      answer: "No, we use modern LED flex technology. It looks identical to traditional glass neon but is safer, more energy-efficient, shatterproof, and lighter."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-6 mb-12">
        <div className="flex-1 h-[2px] relative overflow-hidden rounded-full scale-x-[-1]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_45%,#6eff86_50%,transparent_51%,transparent_100%)] bg-[length:200%_100%] animate-border-flow" />
        </div>
        <h2 className="text-4xl font-black text-center whitespace-nowrap">Frequently Asked Questions</h2>
        <div className="flex-1 h-[2px] relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_45%,#6eff86_50%,transparent_51%,transparent_100%)] bg-[length:200%_100%] animate-border-flow" />
        </div>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-white/10 rounded-xl bg-zinc-900/50 overflow-hidden transition-all">
            <button 
              className="faq-btn w-full px-6 py-5 flex items-center justify-between font-bold text-lg text-left"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span>{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-brand-purple transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`px-6 text-gray-400 overflow-hidden transition-all ${openIndex === idx ? 'pb-5 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
