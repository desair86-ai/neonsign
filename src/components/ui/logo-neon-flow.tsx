import React from 'react';

export function LogoNeonFlow() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible select-none">
      <svg 
        width="340" 
        height="180" 
        viewBox="0 0 340 180" 
        className="absolute pointer-events-none overflow-visible scale-[1.25] opacity-75"
      >
        <defs>
          {/* Pink Tube Glow with Magenta accent (#ff008a) */}
          <filter id="neon-glow-pink" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feFlood floodColor="#ff008a" result="flood" />
            <feComposite in="flood" in2="blur2" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Green Tube Glow with Light Green accent (#83f36e) */}
          <filter id="neon-glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feFlood floodColor="#83f36e" result="flood" />
            <feComposite in="flood" in2="blur2" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Purple Tube Glow with Sky Blue accent (#60aed5) */}
          <filter id="neon-glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feFlood floodColor="#60aed5" result="flood" />
            <feComposite in="flood" in2="blur2" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Orange Tube Glow with Orange accent (#fe8a2e) */}
          <filter id="neon-glow-orange" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
            <feFlood floodColor="#fe8a2e" result="flood" />
            <feComposite in="flood" in2="blur2" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Slanted intersecting tubes/flow curves passing behind the logo */}
        <g className="animate-neon-float">
          {/* Pink Line 1 */}
          <path
            d="M 30,130 C 100,120 120,40 170,80 C 220,120 240,40 310,30"
            fill="none"
            stroke="#f967fb"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#neon-glow-pink)"
            className="animate-flow-dash-1"
          />
          
          {/* Green Line 2 */}
          <path
            d="M 32,132 C 102,122 122,42 172,82 C 222,122 242,42 312,32"
            fill="none"
            stroke="#53bc28"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#neon-glow-green)"
            className="animate-flow-dash-2"
          />

          {/* Purple Line 3 */}
          <path
            d="M 28,128 C 98,118 118,38 168,78 C 218,118 238,38 308,28"
            fill="none"
            stroke="#6958d5"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#neon-glow-purple)"
            className="animate-flow-dash-3"
          />
          
          {/* Secondary intersecting glow line (Orange) */}
          <path
            d="M 60,40 C 120,90 200,90 280,140"
            fill="none"
            stroke="#fe8a2e"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#neon-glow-orange)"
            className="animate-flow-dash-2 opacity-65"
          />
          
          {/* Secondary intersecting glow line (Pink/Magenta accent) */}
          <path
            d="M 58,42 C 118,92 198,92 278,142"
            fill="none"
            stroke="#f967fb"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#neon-glow-pink)"
            className="animate-flow-dash-1 opacity-50"
          />
        </g>
      </svg>
    </div>
  );
}
