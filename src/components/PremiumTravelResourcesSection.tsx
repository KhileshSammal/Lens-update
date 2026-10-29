import React, { memo } from "react";
import { motion } from "motion/react";
import { 
  Utensils, 
  Luggage, 
  CheckCircle2, 
  Globe, 
  Lightbulb, 
  Sparkles, 
  Check,
  Compass
} from "lucide-react";
import { PremiumTravelResource } from "../data/travelResourcesData";
import { formatInlineText } from "../utils/formatText";

interface PremiumTravelResourcesSectionProps {
  resources: PremiumTravelResource;
  locationName?: string;
}

export const PremiumTravelResourcesSection = memo(({ resources, locationName }: PremiumTravelResourcesSectionProps) => {
  if (!resources) return null;

  return (
    <section id="premium-resources" className="mt-16 pt-12 border-t border-white/10 scroll-mt-24">
      {/* Header Eyebrow & Title */}
      <div className="mb-10 text-left">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-amber-400 font-bold font-ui text-[11px] uppercase tracking-[0.25em]">
            Plan Like A Pro
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          Premium Travel Resources
        </h2>

        <div className="w-16 h-1 bg-amber-400/80 mt-4 rounded-full" />
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* CARD 1: TOP FOODS TO TRY */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-amber-400/30 transition-all"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/80">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Utensils size={18} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Top foods to try
                </h3>
                <span className="text-[10px] font-ui uppercase font-semibold text-zinc-400 tracking-wider">
                  Authentic Culinary Highlights
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {resources.topFoods.map((food, idx) => (
                <div 
                  key={idx}
                  className="w-full sm:w-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 border border-zinc-700/60 hover:border-amber-400/50 transition-all"
                >
                  <span className="text-amber-400 font-semibold font-ui text-xs sm:text-sm shrink-0">
                    {food.name}
                  </span>
                  <span className="text-zinc-500 font-light text-xs">•</span>
                  <span className="text-zinc-300 font-sans text-xs sm:text-sm font-light">
                    {food.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 2: PLANNING CHECKLIST */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-amber-400/30 transition-all"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/80">
              <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Planning checklist
                </h3>
                <span className="text-[10px] font-ui uppercase font-semibold text-zinc-400 tracking-wider">
                  Timeline & Preparation
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {resources.planningChecklist.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                  <span className="mt-0.5 text-emerald-400 shrink-0">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <div className="font-sans text-zinc-300">
                    <strong className="text-zinc-100 font-semibold font-ui">{step.timeframe}</strong> — {formatInlineText(step.action)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 3: PACKING CHECKLIST */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-amber-400/30 transition-all"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/80">
              <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Luggage size={18} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Packing checklist
                </h3>
                <span className="text-[10px] font-ui uppercase font-semibold text-zinc-400 tracking-wider">
                  Essential Gear by Category
                </span>
              </div>
            </div>

            <div className="divide-y divide-zinc-800/70 space-y-3 pt-1">
              {resources.packingChecklist.map((cat, idx) => (
                <div key={idx} className="pt-3 first:pt-0 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline">
                  <div className="sm:col-span-4 font-ui font-semibold text-xs text-zinc-200 uppercase tracking-wider">
                    {cat.category}
                  </div>
                  <div className="sm:col-span-8 font-sans font-light text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {formatInlineText(cat.items)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 4: CULTURAL ETIQUETTE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-amber-400/30 transition-all"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/80">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Globe size={18} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Cultural etiquette
                </h3>
                <span className="text-[10px] font-ui uppercase font-semibold text-zinc-400 tracking-wider">
                  Respect, Customs & Sacred Norms
                </span>
              </div>
            </div>

            <ul className="space-y-3.5">
              {resources.culturalEtiquette.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-zinc-300 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{formatInlineText(rule)}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CARD 5: PRACTICAL TRAVEL TIPS (Spans 2 columns on lg for prominent wide balance) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="lg:col-span-2 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-zinc-950 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 shadow-xl hover:border-amber-400/30 transition-all"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/80">
            <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Lightbulb size={18} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Practical travel tips
              </h3>
              <span className="text-[10px] font-ui uppercase font-semibold text-zinc-400 tracking-wider">
                Field Intelligence & Local Savvy
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {resources.practicalTips.map((tip, idx) => (
              <div 
                key={idx}
                className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4 sm:p-5 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {formatInlineText(tip)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
});

PremiumTravelResourcesSection.displayName = "PremiumTravelResourcesSection";
