import { NEON_STACK_ICON_SRC } from '@/lib/brand-assets';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[100] backdrop-blur-sm">
      <img 
        src={NEON_STACK_ICON_SRC} 
        alt="Loading..." 
        className="w-16 h-16 animate-pulse drop-shadow-[0_0_15px_rgba(110,255,134,0.6)]" 
      />
    </div>
  );
}
