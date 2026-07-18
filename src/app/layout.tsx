import type { Metadata } from "next";
import { 
  Inter, 
  Pacifico, 
  Dancing_Script, 
  Caveat, 
  Bungee_Outline,
  Cinzel,
  Great_Vibes,
  Permanent_Marker,
  Parisienne,
  Playfair_Display,
  Cookie,
  Alex_Brush,
  Syncopate,
  Bad_Script,
  Gochi_Hand,
  Kaushan_Script 
} from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { MascotProvider } from "../components/mascot/MascotProvider";
import { Mascot } from "../components/mascot/Mascot";
import { supabase } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const bungeeOutline = Bungee_Outline({ weight: "400", subsets: ["latin"], variable: "--font-bungee-outline" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-permanent-marker" });
const parisienne = Parisienne({ weight: "400", subsets: ["latin"], variable: "--font-parisienne" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cookie = Cookie({ weight: "400", subsets: ["latin"], variable: "--font-cookie" });
const alexBrush = Alex_Brush({ weight: "400", subsets: ["latin"], variable: "--font-alex-brush" });
const syncopate = Syncopate({ weight: "400", subsets: ["latin"], variable: "--font-syncopate" });
const badScript = Bad_Script({ weight: "400", subsets: ["latin"], variable: "--font-bad-script" });
const gochiHand = Gochi_Hand({ weight: "400", subsets: ["latin"], variable: "--font-gochi-hand" });
const kaushanScript = Kaushan_Script({ weight: "400", subsets: ["latin"], variable: "--font-kaushan-script" });

const clonoid = localFont({
  src: [
    {
      path: "../../public/fonts/Clonoid W01 Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Clonoid-W01-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clonoid",
});

const fontVariables = [
  inter.variable,
  pacifico.variable,
  dancingScript.variable,
  caveat.variable,
  bungeeOutline.variable,
  cinzel.variable,
  greatVibes.variable,
  permanentMarker.variable,
  parisienne.variable,
  playfair.variable,
  cookie.variable,
  alexBrush.variable,
  syncopate.variable,
  badScript.variable,
  gochiHand.variable,
  kaushanScript.variable,
  clonoid.variable
].join(" ");

export const metadata: Metadata = {
  title: "The Neon Stack - Custom LED Neon Signs",
  description: "Create and order your own custom premium neon signs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch theme settings server-side
  let themeStyle: Record<string, string> = {};
  let gradientStr = "";
  try {
    const { data } = await supabase.from('theme_settings').select('*').eq('id', 1).single();
    if (data) {
      if (data.brand_green) themeStyle['--color-brand-green'] = data.brand_green;
      if (data.brand_purple) themeStyle['--color-brand-purple'] = data.brand_purple;
      if (data.background_gradient) {
        gradientStr = data.background_gradient;
      }
    }
  } catch (e) {
    console.error("Failed to load dynamic theme", e);
  }

  return (
    <html lang="en" className="dark">
      <body 
        className={`${fontVariables} font-sans text-white antialiased selection:bg-brand-purple/30 selection:text-brand-lavender ${gradientStr ? 'moving-gradient' : ''}`}
        style={{
          ...themeStyle,
          background: gradientStr || 'var(--background)',
        } as React.CSSProperties}
      >
        <MascotProvider>
          {children}
          <Mascot />
        </MascotProvider>
      </body>
    </html>
  );
}
