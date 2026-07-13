import React from "react";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-3xl mx-auto space-y-10">
      <Link href="/" className="text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-white transition-colors">
        ← Back to Base
      </Link>
      
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-white">Disclaimer</h1>
        <p className="text-zinc-500 font-serif italic text-base">Effective Date: July 2026</p>
      </header>

      <section className="space-y-8 text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">1. Informational & Inspirational Purposes Only</h2>
          <p>
            All information, itineraries, travel guides, camera gear recommendations, and slow-living blueprints provided on Lens & Latitude are shared solely for informational and inspirational purposes. Travel planning involves rapid change, and we do not guarantee the completeness, absolute accuracy, or modern relevance of any travel logs published here.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">2. Travel Risk Assumption</h2>
          <p>
            While I make every effort to verify timetables, route coordinates, and ledger calculations, variables such as train delay frequencies, scooty hire rates, local weather advisories, seasonal road blocks, and border protocols can change unexpectedly.
          </p>
          <p>
            Any actions you take based on the information found on this website are strictly at your own risk. Lens & Latitude, its authors, and its creators will not be held liable for any losses, accidents, physical harm, delays, or financial damages incurred while embarking on independent journeys described on this site.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">3. Third-Party Links & Recommendations</h2>
          <p>
            Lens & Latitude may contain links to external booking portals, gear websites, hotel networks, or third-party mapping solutions. We do not control, endorse, or assume responsibility for the safety, accuracy, content, or practices of external platforms.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">4. Professional Advice</h2>
          <p>
            The content on this website does not constitute official legal, consular, medical, or financial advice. We strongly advise verifying local state laws, passport/visa protocols, seasonal climate advisories, safety conditions, and booking rules with official authorities before planning or executing any journeys.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">5. Contact Information</h2>
          <p>
            If you have questions about this Disclaimer or wish to report outdated travel information or broken coordinates, please reach out directly via email: <a href="mailto:khileshsammal.work@gmail.com" className="text-amber-400 hover:underline">khileshsammal.work@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
