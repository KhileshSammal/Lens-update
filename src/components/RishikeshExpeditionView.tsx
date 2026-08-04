import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Info, 
  Plus, 
  Building, 
  Compass, 
  Receipt, 
  Sun,
  Coffee,
  Moon,
  UtensilsCrossed,
  Instagram,
  Youtube,
  Milestone,
  Bus,
  Waves,
  Mountain,
  Sparkles
} from "lucide-react";
import { SocialShareButtons } from "./SocialShareButtons";

interface PhaseItinerary {
  phase: number;
  title: string;
  sub: string;
  narrative: string;
  tags: string[];
  icon: React.ComponentType<any>;
}

interface LedgerCategory {
  category: string;
  cost: string;
  detail: string;
  icon: React.ComponentType<any>;
}

const TIMELINE_DATA: PhaseItinerary[] = [
  {
    phase: 1,
    title: "Day 1: Delhi to Haridwar to Rishikesh",
    sub: "Sacred Rivers & Triveni Ghat",
    narrative: "Started the journey from Delhi via bus, reaching Haridwar for a sacred visit to Mansa Devi Temple. Later, took an auto to Rishikesh, checked in, and witnessed the soul-stirring Ganga Aarti at Triveni Ghat.",
    tags: ["Haridwar Stopover via Bus", "Mansa Devi Visit", "Auto Transfer to Rishikesh", "Ganga Aarti at Triveni Ghat Evening"],
    icon: Bus
  },
  {
    phase: 2,
    title: "Day 2: Rishikesh to Dehradun to Mussoorie",
    sub: "Ganges Rafting & Queen of Hills Ride",
    narrative: "Spent the morning rafting through the wild rapids of the Ganga. By noon, took an auto to Dehradun to pick up a rental scooty and rode up the hills to reach Mussoorie by 5:00 PM.",
    tags: ["Rafting Morning Thrill", "Scooty Ride Dehradun to Mussoorie", "Uphill Climb by Sunset"],
    icon: Waves
  },
  {
    phase: 3,
    title: "Day 3: Mussoorie to Landour to Dehradun",
    sub: "Misty Valleys & Legendary Bakehouse",
    narrative: "Experienced a magical sunrise in Landour. Visited Landour Bakehouse, Char Dukan, and Lal Tibba on a scooty. Later, rode back down to Dehradun via Kempty Falls and spent the evening at Pacific Mall.",
    tags: ["Sunrise at Lal Tibba", "Landour Bakehouse & Char Dukan", "Kempty Waterfall Stop", "Evening at Pacific Mall Dehradun"],
    icon: Mountain
  },
  {
    phase: 4,
    title: "Day 4: Dehradun to Delhi",
    sub: "Return Transit",
    narrative: "A comfortable bus journey from Dehradun, carrying a heart full of memories and Himalayan air back to the streets of Delhi.",
    tags: ["Scenic Highway Cruise", "Group Memories", "Bus Ride back to Delhi"],
    icon: Sparkles
  }
];

const LEDGER_CATEGORIES: LedgerCategory[] = [
  { category: "Accommodations", cost: "₹6,000", detail: "3 Nights Stay in Rishikesh & Mussoorie", icon: Building },
  { category: "Transport & Fares", cost: "₹2,500", detail: "Delhi-Dehradun bus & local auto transfers", icon: Bus },
  { category: "Food & Eating Trails", cost: "₹2,500", detail: "Meals, local street food & iconic Landour Bakeries", icon: UtensilsCrossed },
  { category: "Scooty Rental & Fuel", cost: "₹1,000", detail: "Mountain scooty hire from Dehradun & fuel upkeep", icon: Compass },
  { category: "Rafting Extras", cost: "₹500", detail: "Ganga rapids rafting video with Drone & GoPro captures", icon: Waves },
];

interface RishikeshExpeditionViewProps {
  onBackToHome: () => void;
}

export const RishikeshExpeditionView = memo(({ onBackToHome }: RishikeshExpeditionViewProps) => {
  const [activePhaseIdx, setActivePhaseIdx] = useState<number>(0);

  const activePhase = useMemo(() => TIMELINE_DATA[activePhaseIdx], [activePhaseIdx]);

  return (
    <div className="min-h-screen bg-[#07090b] text-slate-200 relative overflow-hidden font-sans selection:bg-amber-300 selection:text-black pt-24 pb-32">
      {/* Background Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_1px]" />

      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation back Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-16 pb-6 border-b border-white/5"
        >
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journeys
          </button>
          
          <SocialShareButtons title="Rishikesh Expedition — Lens & Latitude" variant="minimal" />
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-24 aspect-[16/8] md:aspect-[21/9] border border-white/5 bg-zinc-950 always-dark">
          <img 
            src="https://images.unsplash.com/photo-1716573260891-23ad993e8833?auto=format&fit=crop&q=80&w=2000" 
            alt="Rishikesh Expedition" 
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090b] via-[#07090b]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                Lens & Latitude — Uttarakhand
              </span>
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-serif text-white tracking-tight leading-none mb-6">
              Rishikesh <br/> <span className="text-amber-50 font-normal italic">Expedition</span>
            </h1>

            <p className="text-white/80 text-base md:text-lg font-light max-w-4xl leading-relaxed mb-8 font-sans">
              A soul-refreshing 4-day odyssey from the streets of Delhi to the spiritual heart of the Ganges and the mist-covered peaks of Mussoorie.
            </p>

            <div className="flex flex-wrap gap-6 md:gap-12 border-t border-white/10 pt-6 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Duration</span>
                <span className="text-base md:text-lg font-light text-white italic font-serif">4 Days / 3 Nights</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Departure</span>
                <span className="text-base md:text-lg font-light text-white italic font-serif">12:00 AM Midnight Start</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Max Elevation</span>
                <span className="text-base md:text-lg font-light text-white italic font-serif">2,200m+ Altitudes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Timeline Section */}
        <section id="timeline" className="mb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-serif text-white italic mb-2">The Timeline</h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-ui">4 Days of Himalayan Ridge Trails</p>
              </div>

              <div className="space-y-2">
                {TIMELINE_DATA.map((item, idx) => {
                  const isActive = idx === activePhaseIdx;
                  return (
                    <button
                      key={item.phase}
                      onClick={() => setActivePhaseIdx(idx)}
                      className={`w-full text-left p-5 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                        isActive 
                          ? "bg-amber-400 border-amber-400 text-black shadow-lg shadow-amber-400/10 translate-x-1" 
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl border ${
                          isActive 
                            ? "bg-black/10 border-black/10 text-black" 
                            : "bg-white/5 border-white/5 text-amber-400"
                        }`}>
                          <item.icon size={18} />
                        </div>
                        <div>
                          <span className={`text-[9px] font-bold uppercase tracking-widest block mb-0.5 ${
                            isActive ? "text-black/70" : "text-amber-400/80"
                          }`}>
                            Day 0{item.phase}
                          </span>
                          <span className="font-bold text-xs md:text-sm font-sans block leading-tight">
                            {item.title.includes(":") ? item.title.split(": ")[1] : item.title}
                          </span>
                        </div>
                      </div>
                      <Plus size={14} className={isActive ? "opacity-100" : "opacity-30"} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activePhase.phase}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-[2.5rem] min-h-[420px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/5">
                      <div>
                        <h3 className="text-2xl md:text-4xl font-serif text-white italic mb-2 leading-snug">
                          {activePhase.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-widest font-ui">
                          <Milestone size={12} />
                          {activePhase.sub}
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold italic text-amber-400 font-serif">
                        {activePhase.phase}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 font-ui">Narrative</span>
                        <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light font-sans">
                          {activePhase.narrative}
                        </p>
                      </div>

                      <div className="pt-4">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 font-ui">Highlights & Milestones</span>
                        <div className="flex flex-wrap gap-2">
                          {activePhase.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-amber-100 font-ui"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 uppercase tracking-widest font-ui">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-amber-400" /> Uttarakhand Circuit
                    </span>
                    <span className="text-amber-400/80">Active Route</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Ledger & Financial Blueprint Section */}
        <section id="ledger" className="mb-32">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">Trip Ledger</h2>
            <p className="text-slate-400 font-light leading-relaxed mb-12 text-sm md:text-base max-w-2xl">
              A comprehensive budget breakdown detailing the total investment of <span className="text-white font-medium">₹15,000</span> for the Rishikesh-Mussoorie high-altitude run.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEDGER_CATEGORIES.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-white/5 text-amber-400">
                        <item.icon size={20} />
                      </div>
                      <span className="text-xl font-light text-amber-200 font-serif italic">
                        {item.cost}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest font-ui mb-2">
                      {item.category}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-amber-400/10 to-amber-400/[0.02] border border-amber-400/20 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400">
                      <Receipt size={20} />
                    </div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-ui bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 animate-pulse">
                      Optimized
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest font-ui mb-2">
                    Total Investment
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Including travel fares, premium mountain bakeries, and white water rafting captures.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-end">
                  <span className="text-2xl font-bold text-white font-mono">₹15,000</span>
                  <span className="text-[10px] text-amber-400/80 tracking-wider uppercase font-bold font-ui">Per Person</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Social Connection Footer Panel */}
        <section className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-5xl font-bold text-white font-serif italic mb-4">
                Social <br/><span className="text-amber-400 not-italic font-normal">Handles</span>
              </h2>
              <h3 className="text-lg font-light text-white/90 mb-2 font-serif">
                Stay connected with Khilesh
              </h3>
              <p className="text-slate-400 leading-relaxed text-xs md:text-sm max-w-lg font-sans">
                Follow high-definition updates, creative stories, reel insights, and cinematic travel diaries from this Rishikesh expedition across Instagram and YouTube.
              </p>
            </div>
            
            <div className="lg:col-span-5 w-full space-y-4">
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-amber-400/60 block font-ui">
                Active Chronicles Channels
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://www.instagram.com/mr.khilesh__/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center gap-3 hover:border-amber-400/30 transition-all group"
                >
                  <div className="bg-gradient-to-tr from-amber-400 to-amber-200 p-2.5 rounded-xl text-black">
                    <Instagram size={16} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-amber-400 transition-colors font-ui">Instagram</span>
                    <span className="block text-white font-medium text-xs">@mr.khilesh__</span>
                  </div>
                </a>
                
                <a 
                  href="https://www.youtube.com/c/KhileshSammalVlogs2125" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center gap-3 hover:border-amber-400/30 transition-all group"
                >
                  <div className="bg-gradient-to-tr from-red-500 to-red-400 p-2.5 rounded-xl text-white">
                    <Youtube size={16} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-red-400 transition-colors font-ui">YouTube</span>
                    <span className="block text-white font-medium text-xs">Khilesh Vlogs</span>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Footer & Social Share */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 border border-white/15 hover:border-amber-400 hover:text-amber-400 px-6 py-3 rounded-md text-xs font-bold font-ui uppercase tracking-widest transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Journeys
          </button>
          <SocialShareButtons title="Rishikesh Expedition — Lens & Latitude" />
        </div>

      </div>
    </div>
  );
});

RishikeshExpeditionView.displayName = "RishikeshExpeditionView";
