import React from "react";
import { TRIPS } from "@/src/constants";

interface PageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function DestinationPage({ params }: PageProps) {
  // Await the params if it is a Promise (Next.js 15 convention)
  const resolvedParams = params && typeof (params as any).then === "function" 
    ? await params 
    : (params as { slug: string });
    
  const { slug } = resolvedParams || {};

  // Find the trip matching the slug
  const trip = TRIPS.find((t) => {
    const tripSlug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return tripSlug === slug;
  });

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <h2 className="text-3xl font-serif mb-4">Route Coordinates Not Found</h2>
        <a href="/destinations" className="text-[#ffcc00] hover:underline font-mono text-sm">
          &larr; Return to Destinations
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white p-6 md:p-12 font-sans selection:bg-[#ffcc00] selection:text-black flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full py-12">
        <header className="mb-12 border-b border-white/10 pb-6">
          <a href="/destinations" className="text-[10px] uppercase tracking-[0.25em] font-ui text-[#ffcc00] hover:text-white transition-colors">
            &larr; Back to Destinations
          </a>
          <div className="mt-6 flex items-center gap-3">
            <span className="bg-[#ffcc00] text-black font-ui text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-sm">
              {trip.category.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              {trip.subtitle}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif italic text-white leading-tight mt-4">
            {trip.title}
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mt-2">
            EXPEDITION COORDINATE LOG
          </p>
        </header>

        <div className="aspect-[16/9] w-full rounded-sm overflow-hidden mb-12 border border-white/5">
          <img 
            src={trip.img} 
            alt={trip.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <article className="space-y-8 text-zinc-300 text-sm md:text-base leading-relaxed font-light">
          <p>
            Welcome to the detailed coordinate log for <strong className="text-white font-medium">{trip.title}</strong>, located in the {trip.subtitle} region.
          </p>
          <p>
            Every expedition featured on Lens &amp; Latitude is cataloged with direct on-the-ground research, photography reference indexes, and travel budgets. I document transport transits, local lodging facilities, and key scenic spots to help fellow creators capture and experience these regions cleanly.
          </p>
          <blockquote className="border-l-4 border-[#ffcc00] pl-6 py-2 my-8 italic text-white text-lg font-serif bg-zinc-900/40 rounded-sm">
            "We travel not to escape life, but for life not to escape us. Capturing the journey is only half the battle; structuring the details is what makes it a legacy."
          </blockquote>
          <p>
            If you are planning to travel or document this specific destination, check the primary visual galleries on the homepage, or contact me directly to acquire high-resolution stock photography catalogs.
          </p>
          
          {trip.link !== "#" && (
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <a 
                href={trip.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block bg-[#ffcc00] hover:bg-white text-black px-8 py-3 rounded-sm font-ui text-xs uppercase tracking-[0.2em] font-black transition-all"
              >
                Launch Live Interactive Route &rarr;
              </a>
            </div>
          )}
        </article>
      </div>

      <footer className="max-w-4xl mx-auto w-full border-t border-white/5 pt-8 text-[10px] text-zinc-500 uppercase tracking-widest text-center mt-12">
        <p>&copy; 2026 KHILESH SAMMAL. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
