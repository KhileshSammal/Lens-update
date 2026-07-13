import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-3xl mx-auto space-y-10">
      <Link href="/" className="text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-white transition-colors">
        ← Back to Base
      </Link>
      
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-white">Terms of Service</h1>
        <p className="text-zinc-500 font-serif italic text-base">Effective Date: July 2026</p>
      </header>

      <section className="space-y-8 text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">1. Agreement to Terms</h2>
          <p>
            By accessing or using the Lens & Latitude website, purchasing digital goods (such as guides, presets, planners), or subscribing to our newsletters, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">2. Intellectual Property</h2>
          <p>
            All content on Lens & Latitude—including articles, itineraries, maps, custom photos, logs, blueprints, and digital goods—are the intellectual property of Lens & Latitude and are protected by international copyright laws. No automated caching, framing, or scraping of expedition logs or journals is permitted without express authorization.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">3. Use License</h2>
          <p>
            We grant you a personal, non-exclusive, non-transferable, and revocable license to access our content for individual, non-commercial purposes. When you purchase or download travel planners or photography presets:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You may use them for personal travel planning or personal creative work.</li>
            <li>You may not resell, sub-license, distribute, or share these digital assets with third parties.</li>
            <li>You may not claim authorship or ownership of any visual or textual assets downloaded from this site.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">4. Prohibited Activities</h2>
          <p>
            When navigating Lens & Latitude, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use any robot, crawler, scraper, or spider to access and extract data from the site automatically.</li>
            <li>Use our materials for any commercial purpose or public display without prior written permission.</li>
            <li>Attempt to decompile, reverse engineer, or disrupt any software or servers running this platform.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">5. Modifications</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Any changes will be posted here with an updated effective date. Continued use of the platform constitutes agreement to the updated terms.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">6. Contact Information</h2>
          <p>
            For questions, legal notices, or asset licensing queries, please contact us at <a href="mailto:khileshsammal.work@gmail.com" className="text-amber-400 hover:underline">khileshsammal.work@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
