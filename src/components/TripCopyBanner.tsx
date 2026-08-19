import React, { memo } from "react";
import { Mail, Sparkles, ArrowRight, FileText, Compass, CheckCircle } from "lucide-react";

interface TripCopyBannerProps {
  destination?: string;
  className?: string;
}

/**
 * TripCopyBanner Component
 * Custom CTA banner for blog posts and destination guides:
 * "Want to copy this trip?
 *  We turn routes like this into a full day-by-day planner — flights, hotels, tours and maps in one file. 
 *  Grab the downloadable (place) itinerary or have us build a custom version for your dates."
 * Directs inquiries to khileshsammal.business@gmail.com.
 */
export const TripCopyBanner = memo(({ destination = "this destination", className = "" }: TripCopyBannerProps) => {
  const mailSubject = encodeURIComponent(`Custom Itinerary Planner Request — ${destination}`);
  const mailBody = encodeURIComponent(
    `Hi Khilesh,\n\nI would love to get a full day-by-day planner and custom itinerary for ${destination}.\n\n` +
    `• Target Travel Dates: \n` +
    `• Number of Travelers: \n` +
    `• Estimated Trip Duration: \n` +
    `• Preferences / Budget Level: \n\n` +
    `Looking forward to planning with you!\n`
  );
  const mailtoUrl = `mailto:khileshsammal.business@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  return (
    <section 
      aria-label="Custom Itinerary Planner"
      className={`relative my-12 overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-black p-6 sm:p-8 md:p-10 shadow-2xl ${className}`}
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-6 md:gap-8 items-center text-left">
        
        {/* Left Side: Headline & Description */}
        <div className="lg:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-ui text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles size={12} className="animate-pulse" />
            <span>Turnkey Travel Blueprint</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Want to copy this trip?
          </h3>

          <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
            We turn routes like this into a full day-by-day planner — flights, hotels, tours and maps in one file. Grab the downloadable <span className="text-amber-400 font-semibold">{destination}</span> itinerary or have us build a custom version for your dates.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-[11px] sm:text-xs text-zinc-400 font-ui">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle size={13} className="text-amber-400" /> Day-by-Day Timelines
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle size={13} className="text-amber-400" /> Curated Stays & Flights
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle size={13} className="text-amber-400" /> Offline GPS Map Pins
            </span>
          </div>
        </div>

        {/* Right Side: Direct Email CTA */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3 w-full">
          <a
            href={mailtoUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black font-ui font-black text-xs uppercase tracking-[0.18em] rounded-md transition-all shadow-lg hover:shadow-amber-400/20 hover:scale-[1.02] cursor-pointer"
          >
            <Mail size={15} />
            <span>Request Custom Plan</span>
            <ArrowRight size={14} />
          </a>

          <div className="text-[11px] text-zinc-400 font-ui flex items-center gap-1.5">
            <span>Direct contact:</span>
            <a 
              href={mailtoUrl} 
              className="text-amber-400 font-medium hover:underline hover:text-amber-300 transition-colors"
            >
              khileshsammal.business@gmail.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
});

TripCopyBanner.displayName = "TripCopyBanner";
