import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-3xl mx-auto space-y-10">
      <Link href="/" className="text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-white transition-colors">
        ← Back to Base
      </Link>
      
      <header className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white">About the Author</h1>
        <p className="text-zinc-500 font-serif italic text-base">Khilesh Sammal • Traveler, Lensman, & Designer</p>
      </header>

      <section className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
        <p>
          Welcome to Lens & Latitude. This space is a digital distillation of years spent navigating off-beat trails, intense transit routes, and capturing the fleeting beauty of diverse geographies through visual design and raw street photography.
        </p>
        <p>
          Beyond writing immersive itineraries, I design physical and digital utility kits, notion trackers, and light-calibration presets tailored specifically for travelers who value efficiency, high-density storytelling, and architectural symmetry.
        </p>
      </section>
    </main>
  );
}
