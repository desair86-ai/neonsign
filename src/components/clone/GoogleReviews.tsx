import React from 'react';
import { Star } from 'lucide-react';

export function GoogleReviews() {
  return (
    <section className="py-20 px-4 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          Over 10,000+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">Happy Customers</span>
        </h2>
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-xl text-white font-bold">4.9/5</span>
          <div className="flex gap-1 text-[#eaff00]">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} fill="currentColor" className="w-5 h-5" />
            ))}
          </div>
          <span className="text-zinc-400">on Google Reviews</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Rahul S.", text: "Absolutely stunning neon sign for my cafe! The brightness and quality are unmatched." },
            { name: "Priya M.", text: "The team was so helpful in creating my custom logo in neon. It arrived perfectly safe and looks amazing." },
            { name: "Vikram K.", text: "Best purchase for my gaming room. The remote dimming feature is super convenient. Highly recommend Neon Stack!" }
          ].map((review, i) => (
            <div key={i} className="bg-[#111] border border-zinc-800 p-6 rounded-2xl text-left hover:border-brand-green/30 transition-colors">
              <div className="flex text-[#eaff00] mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} fill="currentColor" className="w-4 h-4" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 font-medium leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">
                  {review.name[0]}
                </div>
                <div className="text-white font-bold">{review.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
