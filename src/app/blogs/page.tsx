import { Header } from "@/components/clone/Header";
import { GlobalFooter } from "@/components/clone/GlobalFooter";
import { Clock } from "lucide-react";

export const metadata = {
  title: "Blogs - Coming Soon",
  description: "Our blog is currently under construction.",
};

export default function BlogsPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-zinc-950/50 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(117,46,255,0.3)]">
            <Clock className="w-10 h-10 text-brand-purple animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-purple to-brand-lavender animate-neon-gradient">Soon</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg font-medium leading-relaxed">
            We're crafting some electrifying content for you. Our blog will be illuminating the web very shortly. Stay tuned!
          </p>
        </div>
      </main>
      <GlobalFooter />
    </>
  );
}


