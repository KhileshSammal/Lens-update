import React from "react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-3xl mx-auto space-y-10">
      <Link href="/" className="text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-white transition-colors">
        ← Back to Base
      </Link>
      
      <header className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-white">Let's Connect</h1>
        <p className="text-zinc-500 font-serif italic text-base">Inquiries, collaborations, and expedition alignments.</p>
      </header>

      <section className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
        <p>
          I am always open to editorial photography projects, tailored travel consulting, and high-quality design alignments. For any collaboration queries, feel free to reach out directly:
        </p>
        <div className="pt-4 space-y-2">
          <p className="font-bold text-white">Email Address:</p>
          <a href="mailto:khileshsammal.work@gmail.com" className="text-amber-400 hover:underline">khileshsammal.work@gmail.com</a>
        </div>
      </section>
    </main>
  );
}
