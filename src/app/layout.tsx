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
import { AuroraBackground } from "@/components/ui/aurora-background";
import { supabase } from "@/lib/supabase";

export const revalidate = 30; // Revalidate every 30 seconds to ensure theme changes propagate

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
  let auroraCss = "";
  
  function hexToRgba(hex: string, alpha: number) {
    if (!/^#[0-9A-Fa-f]{6}$/i.test(hex)) return `rgba(0,0,0,${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  try {
    const { data } = await supabase.from('theme_settings').select('*').eq('id', 1).single();
    if (data) {
      if (data.brand_green) themeStyle['--color-brand-green'] = data.brand_green;
      if (data.brand_purple) themeStyle['--color-brand-purple'] = data.brand_purple;
      if (data.background_gradient) {
        try {
          const parsed = JSON.parse(data.background_gradient);
          if (parsed.c1) {
            auroraCss = `
              --aurora-color-1: ${hexToRgba(parsed.c1, 0.15)};
              --aurora-color-5: ${hexToRgba(parsed.c1, 0.1)};
              --aurora-color-2: ${hexToRgba(parsed.c2, 0.12)};
              --aurora-color-4: ${hexToRgba(parsed.c2, 0.08)};
              --aurora-color-3: ${hexToRgba(parsed.c3, 0.4)};
              --aurora-bg: ${parsed.bg};
            `;
          } else {
            gradientStr = data.background_gradient;
          }
        } catch(e) {
          gradientStr = data.background_gradient;
        }
      }
    }
  } catch (e) {
    console.error("Failed to load dynamic theme", e);
  }

  return (
    <html lang="en" className="dark">
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            ${themeStyle['--color-brand-green'] ? `--color-brand-green: ${themeStyle['--color-brand-green']};` : ''}
            ${themeStyle['--color-brand-purple'] ? `--color-brand-purple: ${themeStyle['--color-brand-purple']};` : ''}
            ${auroraCss}
          }
        `}} />
      </head>
      <body 
        className={`${fontVariables} font-sans text-white antialiased selection:bg-brand-purple/30 selection:text-brand-lavender`}
        style={gradientStr ? { background: gradientStr } : undefined}
      >
        <MascotProvider>
          <AuroraBackground className="min-h-screen text-white font-sans selection:bg-brand-purple/30 selection:text-brand-lavender" speed={0.8} blur={90}>
            {children}
          </AuroraBackground>
          {/* <Mascot /> */}
        </MascotProvider>
      </body>
    </html>
  );
}
