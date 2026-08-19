import React, { memo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Compass, Sparkles, Clock, MapPin, Camera } from "lucide-react";
import { SocialShareButtons } from "./SocialShareButtons";
import { TripCopyBanner } from "./TripCopyBanner";

interface ExploringSoonViewProps {
  locationName: string;
  subtitle: string;
  bgImage: string;
  category: string;
  expectedDate?: string;
  onBackToHome: () => void;
}

/**
 * ExploringSoonView Component:
 * Clean, minimal single-page view displayed when selecting upcoming locations
 * such as Mulki, Andaman, Philippines, and Nepal.
 */
export const ExploringSoonView = memo(({
  locationName,
  subtitle,
  bgImage,
  category,
  expectedDate = "Upcoming Expedition",
  onBackToHome
}: ExploringSoonViewProps) => {
  return (
    <div className="min-h-screen bg-black text-slate-200 relative overflow-hidden font-sans selection:bg-amber-400 selection:text-black pt-24 pb-32">
      {/* Background Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-50 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Back Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-12 pb-6 border-b border-white/10"
        >
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journeys
          </button>
          
          <SocialShareButtons title={`${locationName} Expedition Preview — Lens & Latitude`} variant="minimal" />
        </motion.div>

        {/* Hero Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-12 aspect-[16/9] md:aspect-[21/9] border border-white/10 bg-zinc-950 always-dark shadow-2xl"
        >
          <img 
            src={bgImage} 
            alt={`Upcoming expedition preview for ${locationName} — ${subtitle}`} 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-8 bg-amber-400/60" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                {subtitle}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-serif text-white tracking-tight leading-tight mb-3">
              {locationName}
            </h1>

            <p className="text-zinc-300 text-sm md:text-base font-light max-w-xl">
              Photographic field notes, itinerary maps, and travel blueprints currently being assembled.
            </p>
          </div>
        </motion.div>

        {/* Exploring Soon Content Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 md:p-16 text-center backdrop-blur-sm relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6 shadow-lg shadow-amber-400/5">
            <Compass size={32} className="animate-pulse" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 font-ui block mb-2">
            Field Dispatch In Progress
          </span>

          <h2 className="text-3xl md:text-5xl font-serif text-white font-bold mb-4">
            Exploring Soon
          </h2>

          <p className="text-zinc-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 font-sans">
            We are currently curating raw street photographs, accommodation reviews, local food recommendations, and complete day-by-day itineraries for <strong className="text-white font-semibold">{locationName}</strong>.
          </p>

          <div className="inline-flex items-center gap-3 bg-black/60 border border-white/10 px-6 py-3 rounded-full text-xs font-mono text-zinc-300 mb-8">
            <Clock size={14} className="text-amber-400" />
            <span>Expected Release: <strong className="text-amber-400">{expectedDate}</strong></span>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-xs text-zinc-500 font-ui mb-8">
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-amber-400" /> On-Ground Verification</span>
            <span className="flex items-center gap-1.5"><Camera size={12} className="text-amber-400" /> High-Res Photography Index</span>
            <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-amber-400" /> Curated Budget Blueprints</span>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Journeys
            </button>
            <SocialShareButtons title={`${locationName} Expedition Preview — Lens & Latitude`} />
          </div>
        </motion.div>

        {/* CUSTOM ITINERARY PLANNER PROMO */}
        <TripCopyBanner destination={locationName} />
      </div>
    </div>
  );
});

ExploringSoonView.displayName = "ExploringSoonView";
