import React from "react";
import { TRIPS } from "@/src/constants";

export default function DestinationsListingPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white p-6 md:p-12 font-sans selection:bg-[#ffcc00] selection:text-black flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full py-12">
        <header className="mb-12 border-b border-white/10 pb-6">
          <a href="/" className="text-[10px] uppercase tracking-[0.25em] font-ui text-[#ffcc00] hover:text-white transition-colors">
            &larr; Back to Home
          </a>
          <h1 className="text-4xl md:text-6xl font-serif italic text-white leading-tight mt-4">
            Expeditions &amp; Destinations
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#ffcc00]/80 font-bold mt-1">
            Explore carefully documented international &amp; Indian routes
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRIPS.map((trip) => {
            const slug = trip.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <div 
                key={trip.id} 
                className="bg-zinc-950 border border-white/5 rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#ffcc00] transition-colors group"
              >
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={trip.img} 
                      alt={trip.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-[#ffcc00] text-black font-ui text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm">
                      {trip.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      {trip.subtitle}
                    </span>
                    <h3 className="text-xl font-serif text-white mt-2 mb-3 leading-tight hover:text-[#ffcc00] transition-colors">
                      <a href={`/destinations/${slug}`}>{trip.title}</a>
                    </h3>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex justify-between items-center mt-auto">
                  <a 
                    href={trip.link !== "#" ? trip.link : `/destinations/${slug}`} 
                    target={trip.link !== "#" ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="text-[9px] font-ui uppercase tracking-widest text-[#ffcc00] hover:text-white transition-colors font-bold"
                  >
                    Explore Route &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="max-w-7xl mx-auto w-full border-t border-white/5 pt-8 text-[10px] text-zinc-500 uppercase tracking-widest text-center mt-12">
        <p>&copy; 2026 KHILESH SAMMAL. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
