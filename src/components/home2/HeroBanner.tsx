import React from 'react';
import Link from 'next/link';

export function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden">
      <Link href="/products/customize-neon-signs" className="block relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] xl:h-[80vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
          style={{ backgroundImage: "url('/Website%20Banner-02.png')" }}
        />
      </Link>
    </div>
  );
}
