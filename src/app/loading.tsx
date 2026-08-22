export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[100] backdrop-blur-sm">
      <img 
        src="/The Neon Stack ICON-03.svg" 
        alt="Loading..." 
        className="w-16 h-16 animate-pulse drop-shadow-[0_0_15px_rgba(110,255,134,0.6)]" 
      />
    </div>
  );
}
