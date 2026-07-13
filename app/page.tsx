import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between py-16 px-6 max-w-5xl mx-auto">
      <header className="border-b border-zinc-900 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-white">Lens & Latitude</h1>
          <p className="text-amber-400 text-xs tracking-wider uppercase font-sans mt-1">Expedition Chronicle & Curated Tools</p>
        </div>
        <nav className="flex space-x-6 text-xs uppercase tracking-widest font-sans font-bold text-zinc-400">
          <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
          <Link href="/blog" className="hover:text-amber-400 transition-colors">Journal</Link>
          <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
        </nav>
      </header>

      <section className="my-20 space-y-8">
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
          Explore the world <br /> through an <span className="italic text-zinc-500">honest lens.</span>
        </h2>
        <p className="text-zinc-400 font-serif italic text-base max-w-2xl leading-relaxed">
          "The journey is the lens through which we find ourselves. From the golden streets of Amritsar to the pristine waterfalls of Kerala, we map travel blueprints and cinematic journal logs."
        </p>
        <div className="flex gap-4">
          <Link 
            href="/blog" 
            className="px-6 py-3 bg-amber-400 text-black text-xs uppercase tracking-widest font-sans font-bold hover:bg-white transition-all rounded-sm"
          >
            Read the Journal
          </Link>
          <Link 
            href="/contact" 
            className="px-6 py-3 border border-zinc-800 hover:border-amber-400 text-white text-xs uppercase tracking-widest font-sans font-bold transition-all rounded-sm"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest gap-4">
        <p>&copy; 2026 KHILESH SAMMAL. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
        </div>
      </footer>
    </main>
  );
}
