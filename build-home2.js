const fs = require('fs');

let header_code = fs.readFileSync('src/components/home2/Header2.tsx', 'utf-8');
header_code = header_code.replace('export function Header()', 'export function Header2()');

const old_link = 'className={py-6 px-3 2xl:px-4 flex items-center gap-1.5 transition-colors uppercase relative z-50 }';
const new_link = 'className={py-6 px-3 2xl:px-4 flex items-center gap-1.5 transition-all duration-300 uppercase relative z-50 rounded-md border border-transparent hover:border-[#6eff86]/40 hover:shadow-[0_0_15px_rgba(110,255,134,0.2)] }';
header_code = header_code.replace(old_link, new_link);

fs.writeFileSync('src/components/home2/Header2.tsx', header_code);

const page_content = import React from \"react\";
import { Header2 } from \"@/components/home2/Header2\";
import { HeroBanner } from \"@/components/home2/HeroBanner\";
import { CategoryScroll } from \"@/components/home2/CategoryScroll\";
import { SpecialSigns } from \"@/components/home2/SpecialSigns\";
import { BestSellers } from \"@/components/home2/BestSellers\";
import { Stories } from \"@/components/clone/Stories\";
import { SpacesWeIlluminate } from \"@/components/home2/SpacesWeIlluminate\";
import { Footer } from \"@/components/clone/Footer\";
import { getProducts } from \"@/lib/wordpress\";

export default async function Home2() {
  const wpProducts = await getProducts(\"curated-favourites\", 8);

  const mappedProducts = wpProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    regularPrice: p.regularPrice || p.price || \"Rs. 0\",
    salePrice: p.salePrice || p.price || \"Rs. 0\",
    discountBadge: p.onSale ? \"Sale\" : undefined,
    image: p.image?.sourceUrl || \"/5580.webp\",
    slug: p.slug,
    databaseId: p.databaseId
  }));

  const displayProducts = mappedProducts.length > 0 ? mappedProducts : [];

  return (
    <main className=\"bg-black min-h-screen text-white\">
      <Header2 />
      <HeroBanner />
      <CategoryScroll />
      <SpecialSigns />
      <BestSellers products={displayProducts} />
      <Stories />
      <SpacesWeIlluminate />
      <Footer />
    </main>
  );
}
;
fs.writeFileSync('src/app/home2/page.tsx', page_content);

const hero_banner = import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className=\"relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden\">
      <div 
        className=\"absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60\"
        style={{ backgroundImage: \"url('/5580.webp')\" }}
      >
        <div className=\"absolute inset-0 bg-black/50 bg-gradient-to-t from-black via-transparent to-transparent\" />
      </div>
      
      <div className=\"relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center\">
        <h1 className=\"text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-lg\">
          Illuminate Your <span className=\"text-[#6eff86] drop-shadow-[0_0_15px_rgba(110,255,134,0.8)]\">Space</span>
        </h1>
        <p className=\"text-lg md:text-xl text-gray-200 mb-8 max-w-2xl\">
          Premium custom neon signs for businesses, homes, and events. Design yours today and stand out.
        </p>
        <Link 
          href=\"/products/customize-neon-signs\"
          className=\"inline-flex items-center gap-2 bg-[#6eff86] text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(110,255,134,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]\"
        >
          Customize Now <ArrowRight className=\"w-5 h-5\" />
        </Link>
      </div>
    </div>
  );
}
;
fs.writeFileSync('src/components/home2/HeroBanner.tsx', hero_banner);

const category_scroll = import React from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Gaming', image: '/5580.webp', link: '/shop-neon-collection?cat=gaming-neon-signs' },
  { name: 'Business', image: '/5580.webp', link: '/shop-neon-collection?cat=for-businesses-offices' },
  { name: 'Home Decor', image: '/5580.webp', link: '/shop-neon-collection?cat=home-decor-neon-signs' },
  { name: 'Weddings', image: '/5580.webp', link: '/shop-neon-collection?cat=celebrations-events' },
  { name: 'Anime', image: '/5580.webp', link: '/shop-neon-collection?cat=japanese-anime-signs' },
  { name: 'Quotes', image: '/5580.webp', link: '/shop-neon-collection?cat=quotes-typography' },
  { name: 'Bar & Pub', image: '/5580.webp', link: '/shop-neon-collection?cat=bars-pub-neon-signs' },
  { name: 'Custom', image: '/5580.webp', link: '/products/customize-neon-signs' },
];

export function CategoryScroll() {
  return (
    <section className=\"py-12 bg-black border-y border-white/10 overflow-hidden\">
      <div className=\"flex overflow-x-auto gap-6 px-4 pb-4 no-scrollbar scroll-smooth snap-x\">
        {categories.map((cat, i) => (
          <Link 
            key={i} 
            href={cat.link}
            className=\"flex flex-col items-center gap-3 min-w-[120px] snap-center group\"
          >
            <div className=\"w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#6eff86] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(110,255,134,0.4)]\">
              <img src={cat.image} alt={cat.name} className=\"w-full h-full object-cover\" />
            </div>
            <span className=\"text-sm font-bold text-gray-300 group-hover:text-white transition-colors\">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
;
fs.writeFileSync('src/components/home2/CategoryScroll.tsx', category_scroll);

const special_signs = import React from 'react';
import Link from 'next/link';

export function SpecialSigns() {
  const signs = [
    { title: 'Custom Neon Sign', desc: 'Design your own text or logo', link: '/products/customize-neon-signs', image: '/5580.webp' },
    { title: 'Mojo Mix Neon Sign', desc: 'Next-gen RGB dynamic lighting', link: '/products/customize-mojo-mix', image: '/5580.webp' },
    { title: 'UV Printed Neon', desc: 'Intricate designs with UV backing', link: '/products/uv-printed-neon', image: '/5580.webp' },
  ];

  return (
    <section className=\"py-20 px-4 max-w-7xl mx-auto\">
      <div className=\"text-center mb-12\">
        <h2 className=\"text-3xl md:text-5xl font-black mb-4\">Our Special <span className=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-purple\">Neon Signs</span></h2>
        <p className=\"text-gray-400 max-w-2xl mx-auto\">Choose from our premium range of custom manufacturing options to perfectly suit your space.</p>
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-3 gap-8\">
        {signs.map((sign, i) => (
          <Link href={sign.link} key={i} className=\"group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/10 hover:border-[#6eff86]/50 transition-all duration-500\">
            <img src={sign.image} alt={sign.title} className=\"absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700\" />
            <div className=\"absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent\" />
            <div className=\"absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center\">
              <h3 className=\"text-2xl font-bold mb-2 text-white group-hover:text-[#6eff86] transition-colors\">{sign.title}</h3>
              <p className=\"text-gray-300 mb-6\">{sign.desc}</p>
              <span className=\"inline-block border border-white/30 rounded-full px-6 py-2 text-sm font-bold group-hover:bg-[#6eff86] group-hover:text-black group-hover:border-transparent transition-all\">
                Explore Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
;
fs.writeFileSync('src/components/home2/SpecialSigns.tsx', special_signs);

const best_sellers = import React from 'react';
import { ProductCard, Product } from '@/components/clone/ProductCard';
import Link from 'next/link';

export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section className=\"py-20 px-4 max-w-7xl mx-auto bg-black\">
      <div className=\"flex items-end justify-between mb-12\">
        <div>
          <h2 className=\"text-3xl md:text-5xl font-black mb-4\">Best Sellers</h2>
          <p className=\"text-gray-400\">Our most loved neon signs.</p>
        </div>
        <Link href=\"/shop-neon-collection\" className=\"hidden sm:inline-flex text-[#6eff86] hover:text-white font-bold transition-colors\">
          View All Products &rarr;
        </Link>
      </div>

      <div className=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6\">
        {products.map((product, idx) => (
          <ProductCard key={product.id || idx} product={product} index={idx} theme=\"dark\" />
        ))}
      </div>
      
      <div className=\"mt-8 text-center sm:hidden\">
        <Link href=\"/shop-neon-collection\" className=\"inline-block border border-[#6eff86] text-[#6eff86] px-6 py-3 rounded-full font-bold\">
          View All Products
        </Link>
      </div>
    </section>
  );
}
;
fs.writeFileSync('src/components/home2/BestSellers.tsx', best_sellers);

const spaces_we_illuminate = import React from 'react';

const spaces = [
  'Bedrooms', 'Living Rooms', 'Home Bars', 'Gaming Rooms',
  'Offices', 'Restaurants', 'Salons', 'Weddings'
];

export function SpacesWeIlluminate() {
  return (
    <section className=\"py-24 px-4 bg-zinc-950 border-t border-white/10\">
      <div className=\"max-w-7xl mx-auto text-center\">
        <h2 className=\"text-3xl md:text-5xl font-black mb-12\">Spaces We <span className=\"text-[#6eff86]\">Illuminate</span></h2>
        
        <div className=\"flex flex-wrap justify-center gap-4\">
          {spaces.map((space, i) => (
            <div 
              key={i}
              className=\"px-8 py-4 rounded-full border border-white/20 bg-zinc-900 text-lg font-bold hover:border-[#6eff86] hover:text-[#6eff86] hover:shadow-[0_0_15px_rgba(110,255,134,0.3)] transition-all cursor-pointer\"
            >
              {space}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
;
fs.writeFileSync('src/components/home2/SpacesWeIlluminate.tsx', spaces_we_illuminate);
console.log('done');
