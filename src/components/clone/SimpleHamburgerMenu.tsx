
"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/navItems";

export function SimpleHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-white hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 left-0 w-80 max-w-[80vw] bg-zinc-950/95 backdrop-blur-2xl z-[9999] border-r border-white/10 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="font-black text-lg text-white tracking-widest uppercase">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-white/5 last:border-0">
                  <div 
                    className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors text-white"
                    onClick={() => {
                      if (item.dropdown || item.columns) {
                        setExpandedItem(expandedItem === item.label ? null : item.label);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {item.dropdown || item.columns ? (
                      <span className="text-base font-semibold">{item.label}</span>
                    ) : (
                      <Link href={item.href} className="w-full text-base font-semibold" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    )}
                    {(item.dropdown || item.columns) && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedItem === item.label ? "rotate-180" : ""}`} />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {(item.dropdown || item.columns) && expandedItem === item.label && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/40"
                      >
                        {item.dropdown && item.dropdown.map(sub => (
                          <Link 
                            key={sub.label} 
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-10 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 border-b border-white/5 last:border-0"
                          >
                            {sub.label}
                          </Link>
                        ))}
                        {item.columns && item.columns.map((col, cIdx) => (
                          <div key={cIdx} className="border-b border-white/5 last:border-0 py-2">
                            {col.map((sec, sIdx) => (
                              <div key={sIdx} className="py-2">
                                {sec.header && <div className="px-10 py-2 text-xs font-bold text-brand-green uppercase tracking-wider">{sec.header}</div>}
                                {sec.items.map(sub => (
                                  <Link 
                                    key={sub.label} 
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-10 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/10">
              <Link 
                href="/customer" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-white hover:text-brand-green transition-colors font-semibold"
              >
                <User className="w-5 h-5" /> My Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

