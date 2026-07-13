import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Info, 
  Plus, 
  Hotel, 
  Plane, 
  Landmark, 
  Mountain, 
  Zap, 
  Compass, 
  Anchor, 
  ShoppingBag, 
  Receipt, 
  Building, 
  Camera, 
  Shield,
  Instagram,
  Youtube
} from "lucide-react";

interface DayItinerary {
  day: number;
  date: string;
  title: string;
  city: string;
  detail: string;
}

interface DirectoryItem {
  category: string;
  title: string;
  meta: string;
  icon: React.ComponentType<any>;
}

interface LedgerCategory {
  category: string;
  cost: string;
  detail: string;
  icon: React.ComponentType<any>;
}

interface LogEntry {
  item: string;
  cost: string;
  sub: string;
}

const ITINERARY_DATA: DayItinerary[] = [
  { day: 1, date: "Day 01", title: "Arrival & Heritage", city: "Phuket Town", detail: "Arrival at HKT Airport. Check-in at Ramada Plaza Chao Fah. Evening exploration of Old Phuket Town's Sino-Portuguese architecture and local markets." },
  { day: 2, date: "Day 02", title: "The Phi Phi Expedition", city: "Phi Phi Islands", detail: "Early morning speedboat transfer to Maya Bay. Snorkeling at Pileh Lagoon and lunch at Phi Phi Don. Return for sunset at the hotel." },
  { day: 3, date: "Day 03", title: "Culture & Neon", city: "Big Buddha & Patong", detail: "Morning visit to the iconic Big Buddha and Wat Chalong. Transition to the neon pulse of Bangla Road, Patong for an evening of coastal energy." },
  { day: 4, date: "Day 04", title: "Phang Nga Bay", city: "James Bond Island", detail: "Canoeing through limestone sea caves and visiting the famous James Bond Island. Exploring the floating Panyee Village." },
  { day: 5, date: "Day 05", title: "Departure", city: "Phuket to Delhi", detail: "Final morning at leisure by the pool. Souvenir shopping at Jungceylon before heading to HKT for the return flight." }
];

const DIRECTORY_DATA: DirectoryItem[] = [
  { category: "STAY", title: "Ramada Plaza Chao Fah", meta: "Luxury Hub", icon: Hotel },
  { category: "TRANSIT", title: "HKT International", meta: "Entry Point", icon: Plane },
  { category: "CULTURE", title: "Old Phuket Town", meta: "Heritage Walk", icon: Landmark },
  { category: "SPIRITUAL", title: "The Big Buddha", meta: "Nagaserd Peak", icon: Mountain },
  { category: "NIGHTLIFE", title: "Bangla Road", meta: "Patong Pulse", icon: Zap },
  { category: "ISLAND", title: "Maya Bay", meta: "The Beach", icon: Compass },
  { category: "ISLAND", title: "James Bond Island", meta: "Phang Nga Bay", icon: Anchor },
  { category: "SHOPPING", title: "Jungceylon Mall", meta: "Retail Therapy", icon: ShoppingBag }
];

const LEDGER_CATEGORIES: LedgerCategory[] = [
  { category: "Flights", cost: "₹35,000", detail: "Round trip connecting flights with baggage", icon: Plane },
  { category: "Total Stay", cost: "₹9,000", detail: "Ramada Plaza Chao Fah Luxury Stay", icon: Building },
  { category: "Activity & Gear", cost: "₹25,000", detail: "Island Tours, Spas & Rental Gear", icon: Camera },
  { category: "SIM & Insurance", cost: "₹2,500", detail: "Unlimited Data + Travel Coverage", icon: Shield },
];

const LOG_ENTRIES: LogEntry[] = [
  { item: "Ramada Plaza Chao Fah", cost: "2,100 THB", sub: "Full Stay Accommodation" },
  { item: "Island Expeditions", cost: "5,400 THB", sub: "Maya Bay (2,800) & James Bond (2,600) • 2 Pax" },
  { item: "Wellness & Spas", cost: "3,800 THB", sub: "Full Body Spa, Patong & Ramada" },
  { item: "Culinary & Dining", cost: "4,500 THB", sub: "Royal Kitchen, Tandoori Flames, Ramada Dining" },
  { item: "Transit & Curios", cost: "2,500 THB", sub: "Local Cabs (500) & Shopping/Souvenirs (2,000)" },
];

interface ThailandDiariesViewProps {
  onBackToHome: () => void;
}

export const ThailandDiariesView = memo(({ onBackToHome }: ThailandDiariesViewProps) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);

  const activeDay = useMemo(() => ITINERARY_DATA[activeDayIdx], [activeDayIdx]);

  return (
    <div className="min-h-screen bg-black text-slate-250 relative overflow-hidden font-sans selection:bg-amber-400 selection:text-black pt-24 pb-32">
      {/* Background Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-4 z-50 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Navigation back Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-16 pb-6 border-b border-white/5"
        >
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journeys
          </button>
          
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/80 font-bold font-ui">
            Expedition Chronicle
          </span>
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-24 aspect-[16/8] md:aspect-[21/9] border border-white/5 bg-zinc-950 always-dark">
          <img 
            src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=2000" 
            alt="Phuket Expedition" 
            className="w-full h-full object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                Series 01 • April Summer '25
              </span>
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-serif text-white tracking-tight leading-none mb-6">
              Phuket <br/> <span className="text-amber-50 font-normal italic">Expedition</span>
            </h1>

            <p className="text-white/60 text-xs md:text-sm font-light max-w-xl leading-relaxed mb-8">
              A curated exploration of Thailand's southern gem — from the neon pulse of Patong to the silent limestone giants of Phang Nga Bay.
            </p>

            <div className="flex gap-12 border-t border-white/10 pt-6 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Total Budget</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">₹95,000</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Duration</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">05 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary Navigator Section */}
        <section id="itinerary" className="mb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-serif text-white italic mb-2">The Journey</h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-ui">Tap day to explore blueprint</p>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                {ITINERARY_DATA.map((item, idx) => {
                  const isActive = idx === activeDayIdx;
                  return (
                    <button
                      key={item.day}
                      onClick={() => setActiveDayIdx(idx)}
                      className={`w-full text-left p-5 rounded-2xl transition-all flex items-center justify-between border ${
                        isActive 
                          ? "bg-amber-400 border-amber-400 text-black shadow-lg shadow-amber-400/10 translate-x-1" 
                          : "bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div>
                        <span className={`text-[9px] font-bold uppercase tracking-widest block mb-1 ${
                          isActive ? "text-black/70" : "text-amber-400/80"
                        }`}>
                          {item.date}
                        </span>
                        <span className="font-bold text-sm md:text-base font-sans block leading-tight">
                          {item.title}
                        </span>
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
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-[2.5rem] min-h-[480px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-12 pb-6 border-b border-white/5">
                      <div>
                        <h3 className="text-3xl md:text-5xl font-serif text-white italic mb-2">
                          {activeDay.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-widest font-ui">
                          <Calendar size={12} />
                          {activeDay.date}
                        </div>
                      </div>
                      <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold italic text-amber-400 font-serif">
                        {activeDay.day}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex gap-5 items-start group">
                        <div className="mt-0.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-amber-400 transition-all">
                          <MapPin size={16} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 font-ui">Target Hub</span>
                          <p className="text-white text-lg font-semibold font-sans">{activeDay.city}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-5 items-start group">
                        <div className="mt-0.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-amber-400 transition-all">
                          <Info size={16} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 font-ui">Tactical Highlights</span>
                          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light max-w-xl font-sans">
                            {activeDay.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-slate-500 text-[9px] font-bold tracking-[0.2em] uppercase font-ui">
                      Island Chronicles • Series 01
                    </span>
                    <span className="bg-amber-500/10 text-amber-400 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-amber-500/20 font-ui flex items-center gap-1">
                      <Plus size={10} /> Active Expedition
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Directory Grid Section */}
        <section id="directory" className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-2">Directory</h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] font-ui">Essential coordinates & logistics</p>
            </div>
            <div className="h-[1px] flex-grow bg-white/5 mb-3 hidden md:block mx-8" />
            <div className="text-right">
              <span className="text-amber-400 font-mono text-xs font-semibold bg-amber-400/10 px-3 py-1 rounded-sm border border-amber-400/20">
                08 Core Locations
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIRECTORY_DATA.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: "rgba(251, 191, 36, 0.2)", backgroundColor: "rgba(251, 191, 36, 0.02)" }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-44 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-400 border border-white/5">
                    <item.icon size={18} />
                  </div>
                  <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase font-ui">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight mb-1 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase italic font-serif">
                    {item.meta}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Financial Section - The Ledger */}
        <section id="ledger" className="mb-32">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
              
              {/* Category Breakdown */}
              <div className="lg:col-span-6">
                <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">The Ledger</h2>
                <p className="text-slate-400 font-light leading-relaxed mb-10 text-sm md:text-base">
                  Comprehensive budget of <span className="text-white font-medium">₹95,000</span> covering flights, boutique stays, local explorations, and the premium April summer vibes.
                </p>
                
                <div className="space-y-6">
                  {LEDGER_CATEGORIES.map((c, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300">
                            <c.icon size={16} />
                          </div>
                          <span className="text-slate-200 uppercase tracking-widest text-xs font-bold font-ui">
                            {c.category}
                          </span>
                        </div>
                        <span className="text-lg font-light text-amber-200 font-serif italic">
                          {c.cost}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 ml-11 font-medium italic">
                        {c.detail}
                      </p>
                      <div className="h-[1px] w-full bg-gradient-to-r from-white/5 to-transparent mt-4" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Log Ledger Panel */}
              <div className="lg:col-span-6">
                <div className="bg-white/[0.02] rounded-[2rem] p-8 border border-white/5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                      <Receipt size={18} className="text-amber-400" />
                      <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white font-ui">
                        On Ground Disbursals (THB)
                      </h4>
                    </div>

                    <div className="space-y-5">
                      {LOG_ENTRIES.map((l, i) => (
                        <div key={i} className="border-b border-white/[0.02] pb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-200 font-medium text-xs md:text-sm hover:text-amber-400 transition-colors duration-300">
                              {l.item}
                            </span>
                            <span className="text-amber-100 font-mono text-xs md:text-sm">
                              {l.cost}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium italic">
                            {l.sub}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <p className="text-amber-400/50 text-[8px] tracking-[0.3em] uppercase font-bold mb-1.5 font-ui">
                        Total Outlay Allocation
                      </p>
                      <p className="text-3xl font-light italic text-white tracking-tighter font-serif">
                        ₹95,000
                      </p>
                      <p className="text-[9px] text-slate-500 uppercase mt-1 font-ui">
                        Complete 5-Day Loop
                      </p>
                    </div>
                    
                    <div className="h-14 w-14 rounded-full border border-amber-500/20 flex items-center justify-center relative bg-amber-500/[0.02]">
                      <div className="absolute inset-0 bg-amber-500/5 animate-pulse rounded-full" />
                      <span className="text-amber-400 font-bold text-[8px] uppercase tracking-widest font-ui">
                        Settled
                      </span>
                    </div>
                  </div>

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
                Follow high-definition updates, creative stories, reel insights, and cinematic travel diaries from this Phuket trip across Instagram and YouTube.
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

      </div>
    </div>
  );
});

ThailandDiariesView.displayName = "ThailandDiariesView";
