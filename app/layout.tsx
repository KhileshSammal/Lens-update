import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Lens & Latitude | Curated Expeditions & Travel Shop",
  description: "Curated resources, digital trackers, signature photography presets, and tailored travel blueprints designed to optimize your visual storytelling and physical journeys by Khilesh Sammal.",
  keywords: ["Travel Blog", "Travel Journal", "Photography Presets", "Amritsar Travel", "Goa Expeditions", "Thailand Diaries", "Travel Blueprints", "Khilesh Sammal"],
  authors: [{ name: "Khilesh Sammal", url: "https://lensandlatitude.com" }],
  creator: "Khilesh Sammal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lensandlatitude.com",
    title: "Lens & Latitude | Curated Expeditions & Travel Shop",
    description: "Curated resources, digital trackers, signature photography presets, and tailored travel blueprints designed to optimize your visual storytelling and physical journeys.",
    siteName: "Lens & Latitude",
    images: [
      {
        url: "https://lensandlatitude.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lens & Latitude Travel Chronicles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lens & Latitude | Curated Expeditions & Travel Shop",
    description: "Curated resources, digital trackers, signature photography presets, and tailored travel blueprints designed to optimize your visual storytelling.",
    images: ["https://lensandlatitude.com/og-image.jpg"],
    creator: "@khileshsammal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#07090b] text-slate-200">
        {children}
      </body>
    </html>
  );
}
