import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Plus, 
  Building, 
  Compass, 
  Receipt, 
  Plane,
  Waves,
  Sparkles,
  Palmtree,
  UtensilsCrossed,
  Instagram,
  Youtube,
  Milestone,
  Bike
} from "lucide-react";
import { SocialShareButtons } from "./SocialShareButtons";

interface PhaseItinerary {
  day: number;
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
    day: 1,
    title: "Day 1: Delhi to Odisha (Jagannath Puri)",
    sub: "East Coast Arrival & Sacred Darshan",
    narrative: "Caught a flight out of Delhi straight to Odisha. Headed straight to the holy coastal town of Puri for a powerful spiritual darshan at the ancient Jagannath Puri Temple. Spent the evening walking by the Puri golden beach.",
    tags: ["Flight from DEL", "Jagannath Puri Darshan", "Odisha East Coast Arrival", "Puri Stay Check-in"],
    icon: Plane
  },
  {
    day: 2,
    title: "Day 2: Puri to Goa via Flight",
    sub: "Trans-India Coast-to-Coast Circuit",
    narrative: "Checked out early from Puri, traveled back to the airport, and boarded a cross-country flight landing directly on the West Coast in Goa. Checked in for an easy evening to prep for the open roads.",
    tags: ["Inter-state Flight", "Goa Arrival", "Dabolim Stay Setup"],
    icon: Plane
  },
  {
    day: 3,
    title: "Day 3: Dabolim to Panjim, Aguada Fort & Calangute Stay",
    sub: "Scooty Trails, Latin Quarters & Historic Cliffs",
    narrative: "Checked into the laid-back Mushroom Hostel right near Goa Airport. Sorted out a rental scooty locally and began riding north. Stopped to explore the Latin quarters of Panjim, rode up the steep coastal cliffs to cross Aguada Fort, and ended the day checking into a stay at Calangute.",
    tags: ["Dabolim Checkout", "Rental Scooty Pickup", "Panjim Exploration", "Aguada Fort", "Calangute Stay Check-in"],
    icon: Bike
  },
  {
    day: 4,
    title: "Day 4: North Goa Beach Hop & Fort Trails",
    sub: "Coastal Views & Beachside Food Shacks",
    narrative: "Dedicated a full day to exploring the high-energy coastal stretches of North Goa. Rode between historical coastal viewpoints, relaxed at Baga Beach, and tracked down authentic Goan food trails and beach shacks.",
    tags: ["North Goa Riding", "Baga Beach Trail", "Local Food & Coastal Shacks"],
    icon: Palmtree
  },
  {
    key: "day-5",
    day: 5,
    title: "Day 5: Panjim Exploration & Late-Night Delhi Return",
    sub: "Cafe Trails, Scooty Return & Homeward Flight",
    narrative: "Rode from Calangute back down to Panjim for a deeper city exploration of its colorful streets and cafes. Headed down to Dabolim airport in the evening to drop off the rental scooty, catching the final 11:00 PM night flight back to Delhi.",
    tags: ["Panjim Cafe Trails", "Scooty Return", "Dabolim Airport", "11 PM Delhi Flight"],
    icon: Sparkles
  }
] as PhaseItinerary[];

const LEDGER_CATEGORIES: LedgerCategory[] = [
  { category: "Flights Outlay", cost: "₹30,000", detail: "Delhi-Odisha-Goa-Delhi Multi-State Connections", icon: Plane },
  { category: "Accommodations", cost: "₹11,800", detail: "4 Nights Multi-City Stay (Puri, Dabolim, Calangute)", icon: Building },
  { category: "Rental Scooty Charges", cost: "₹2,000", detail: "5-day local riding freedom across Goa", icon: Bike },
  { category: "Fuel & Upkeep", cost: "₹1,000", detail: "Petrol refills and highway coastal running", icon: Compass },
  { category: "Food & Shacks", cost: "₹5,000", detail: "Local Goan food trails, seafood shacks & city cafes", icon: UtensilsCrossed },
  { category: "Extras & Sightseeing", cost: "₹5,000", detail: "Fort entry, photography fees & coastal activities", icon: Sparkles },
];

interface GoaExpeditionViewProps {
  onBackToHome: () => void;
}

export const GoaExpeditionView = memo(({ onBackToHome }: GoaExpeditionViewProps) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);

  const activeDay = useMemo(() => TIMELINE_DATA[activeDayIdx], [activeDayIdx]);

  return (
    <div className="min-h-screen bg-[#07090b] text-slate-200 relative overflow-hidden font-sans selection:bg-amber-300 selection:text-black pt-24 pb-32">
      {/* Background Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />

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
          
          <SocialShareButtons title="Puri & Goa Circuit Expedition — Lens & Latitude" variant="minimal" />
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-24 aspect-[16/8] md:aspect-[21/9] border border-white/5 bg-zinc-950 always-dark">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
            alt="Goa & Puri Expedition" 
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090b] via-[#07090b]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                Lens & Latitude — East Coast to West Coast Loop
              </span>
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-serif text-white tracking-tight leading-none mb-6">
              Jagannath Puri <br/> <span className="text-amber-50 font-normal italic">to Sea Loop</span>
            </h1>

            <p className="text-white/80 text-base md:text-lg font-light max-w-4xl leading-relaxed mb-8 font-sans">
              An epic 5-day dual-coast journey cutting across the spiritual monuments of Odisha to the golden sunset coastlines and historical forts of Goa.
            </p>

            <div className="flex flex-wrap gap-6 md:gap-12 border-t border-white/10 pt-6 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Duration</span>
                <span className="text-base md:text-lg font-light text-white italic font-serif">5 Days / 4 Nights</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Travel Mode</span>
                <span className="text-base md:text-lg font-light text-white italic font-serif">Multi-State Flight Circuit</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Departure Month</span>
                <span className="text-base md:text-lg font-light text-white italic font-serif">July Month Expedition</span>
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
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-ui">5 Days of Coast to Coast Adventure</p>
              </div>

              <div className="space-y-2">
                {TIMELINE_DATA.map((item, idx) => {
                  const isActive = idx === activeDayIdx;
                  return (
                    <button
                      key={item.day}
                      onClick={() => setActiveDayIdx(idx)}
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
                            Day 0{item.day}
                          </span>
                          <span className="font-bold text-xs md:text-sm font-sans block leading-tight">
                            {item.title.split(": ")[1] || item.title}
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
                  key={activeDay.day}
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
                          {activeDay.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-widest font-ui">
                          <Milestone size={12} />
                          {activeDay.sub}
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold italic text-amber-400 font-serif">
                        {activeDay.day}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 font-ui">Narrative</span>
                        <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light font-sans">
                          {activeDay.narrative}
                        </p>
                      </div>

                      <div className="pt-4">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 font-ui">Highlights & Milestones</span>
                        <div className="flex flex-wrap gap-2">
                          {activeDay.tags.map((tag, i) => (
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
                      <MapPin size={12} className="text-amber-400" /> East-West Transit Loop
                    </span>
                    <span className="text-amber-400/80">Active Route</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Ledger & Expense Breakdown Section */}
        <section id="ledger" className="mb-32">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">Trip Ledger</h2>
            <p className="text-slate-400 font-light leading-relaxed mb-12 text-sm md:text-base max-w-2xl">
              A detailed budget mapping the total investment of <span className="text-white font-medium">₹54,800</span> for the dual-coast trans-India flight and scooty expedition.
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
                      Completed
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest font-ui mb-2">
                    Total Investment
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Including all flights, beach side stays, local Goan shacks & scooter rentals.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-end">
                  <span className="text-2xl font-bold text-white font-mono">₹54,800</span>
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
                Follow high-definition updates, creative stories, reel insights, and cinematic travel diaries from this Puri and Goa dual-coast trip across Instagram and YouTube.
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
          <SocialShareButtons title="Puri & Goa Circuit Expedition — Lens & Latitude" />
        </div>

      </div>
    </div>
  );
});

GoaExpeditionView.displayName = "GoaExpeditionView";
