import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[#07090b] text-slate-200">
      <div className="space-y-6 max-w-md">
        <span className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase block">404 • Missing Coordinates</span>
        <h1 className="text-3xl md:text-5xl font-serif text-white">Lost in Transit</h1>
        <p className="text-zinc-500 font-serif italic text-sm md:text-base leading-relaxed">
          The path you are seeking does not exist on this expedition map. Let us guide you back to familiar tracks.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-amber-400 text-black text-[10px] uppercase tracking-widest font-sans font-extrabold hover:bg-white transition-all rounded-sm"
        >
          Return to Basecamp
        </Link>
      </div>
    </main>
  );
}
