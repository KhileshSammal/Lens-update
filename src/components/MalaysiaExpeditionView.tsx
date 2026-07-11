import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Info, 
  Plus, 
  Building, 
  Plane, 
  Receipt, 
  CreditCard,
  Sun,
  Coffee,
  Moon,
  UtensilsCrossed,
  Heart,
  Instagram,
  Youtube,
  Compass
} from "lucide-react";

interface DayItinerary {
  day: number;
  date: string;
  city: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
}

interface DirectoryHotel {
  name: string;
  location: string;
  feature: string;
}

interface DirectoryRestaurant {
  name: string;
  location: string;
  cuisine: string;
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
  { day: 1, date: "Friday, July 18", city: "Delhi to Kolkata", theme: "The Transit", morning: "07:30 AM Reach IGI Airport, Delhi. 09:00 AM Depart DEL → CCU.", afternoon: "Arrive in Kolkata at 11:00 AM. Transit rest & explore the city.", evening: "11:00 PM Depart CCU → KUL (AirAsia). The official adventure begins!" },
  { day: 2, date: "Saturday, July 19", city: "Kuala Lumpur", theme: "Urban Immersion", morning: "05:00 AM Arrive KUL. Cab to Ramada Encore Chinatown. Early bag drop-off and explore city nearby KLCC tower.", afternoon: "Lunch at Alibaba and 41 Dishes. 11:00 AM Early Check-in. Rest & freshen up.", evening: "Visit Petronas Twin Towers & KLCC Park. Dinner at the authentic South Indian spot in front of Ramada Encore Chinatown." },
  { day: 3, date: "Sunday, July 20", city: "KL to Langkawi", theme: "Heritage & Flight", morning: "06:00 AM Batu Caves expedition (Rainbow Stairs). Return for local breakfast.", afternoon: "12:00 PM Leave for KUL Airport. 05:45 PM Flight to Langkawi.", evening: "07:15 PM Arrive LGK. Check-in Goldsands Hotel, Kuah. Dinner at Little India." },
  { day: 4, date: "Monday, July 21", city: "Langkawi", theme: "Birthday Voyage 🎉", morning: "Quiet morning in Kuah, visit Maha Tower, buy from 24*7, Relaxed birthday lunch at Little India.", afternoon: "Private Mangrove Safari in Kilim Geoforest Park & Eagle Point. Celebrating amidst nature.", evening: "Special Birthday Dinner at Little India, Kuah." },
  { day: 5, date: "Tuesday, July 22", city: "Langkawi to KL", theme: "Skyline Retreat", morning: "10:00 AM Check-out Goldsands Hotel, Kuah & Breakfast. 11:30 AM Langkawi Airport transit.", afternoon: "02:00 PM Flight to KL. 04:00 PM Arrival. Check-in at Upper View Regalia.", evening: "Dinner at Alibaba & 41 Dishes. Midnight swim in the infinity rooftop pool in Upper View Regalia." },
  { day: 6, date: "Wednesday, July 23", city: "KL to Kolkata", theme: "Oceanic Finale", morning: "08:00 AM Check-out. Visit KLCC Aquaria. Lunch at Alibaba.", afternoon: "02:30 PM Bag collection from Upper View Regalia. 04:30 PM Reach KUL Airport.", evening: "09:00 PM Flight: KUL → CCU. 11:30 PM Arrival in Kolkata." },
  { day: 7, date: "Thursday, July 24", city: "Kolkata", theme: "The Buffer Day", morning: "Deep rest after international travel. Leisurely morning in the city.", afternoon: "Explore local spots, meet friends, and savor Kolkata street food.", evening: "11:55 PM Flight: CCU → DEL. Final leg of the journey." },
  { day: 8, date: "Friday, July 25", city: "Delhi", theme: "Homecoming", morning: "02:10 AM Arrive Delhi. Return home for well-deserved rest.", afternoon: "Unpacking and recovery day. Quiet family lunch.", evening: "08:00 PM Resume work. Back to reality with fresh memories." }
];

const DIRECTORY_DATA = {
  hotels: [
    { name: "Ramada Encore Chinatown", location: "Kuala Lumpur", feature: "Body Spa & City Views" },
    { name: "Goldsands Hotel", location: "Kuah, Langkawi", feature: "Seafront Proximity" },
    { name: "Upper View Regalia", location: "Kuala Lumpur", feature: "Infinity Rooftop Pool" }
  ] as DirectoryHotel[],
  restaurants: [
    { name: "Alibaba and 41 Dishes", location: "KL", cuisine: "Middle Eastern / Fusion" },
    { name: "Little India", location: "Langkawi (Kuah)", cuisine: "South Indian / Birthday Dinner" },
    { name: "Adyar Ananda Bhavan", location: "Kuala Lumpur", cuisine: "South Indian Vegetarian" },
    { name: "South Indian Spot", location: "Chinatown KL", cuisine: "Authentic Local Indian" }
  ] as DirectoryRestaurant[]
};

const LEDGER_CATEGORIES: LedgerCategory[] = [
  { category: "Flights", cost: "₹35,000", detail: "DEL-CCU-KUL-LGK-KUL-CCU-DEL", icon: Plane },
  { category: "Hotels", cost: "₹12,000", detail: "LGK (6.8k) | Regalia (2.4k) | Ramada (2k)", icon: Building },
  { category: "Currency Exchanged", cost: "₹40,000", detail: "1,950 MYR (Orient Exchange)", icon: CreditCard },
  { category: "Misc & Insurance", cost: "₹3,600", detail: "Policy + Essentials", icon: Info },
];

const LOG_ENTRIES: LogEntry[] = [
  { item: "SIM Card", cost: "18 MYR", sub: "Purchased at KUL airport" },
  { item: "Food & Dining", cost: "530 MYR", sub: "Adyar Ananda Bhavan, Alibaba, Little India, Plane Food, 24*7, Juice" },
  { item: "Transport (Cabs & Grab)", cost: "330 MYR", sub: "Airport transfers, Ramada, LGK Cabs" },
  { item: "Private Mangrove Tour", cost: "200 MYR", sub: "Kilim Geoforest Park Safari" },
  { item: "Shopping & Souvenirs", cost: "350 MYR", sub: "Lucky, Magnet, Duty-Free" },
  { item: "Full Body Spa", cost: "100 MYR", sub: "Wellness at Ramada Encore" },
  { item: "Birthday Dinner", cost: "100 MYR", sub: "Celebration meal at Little India" },
  { item: "Batu Caves & Misc", cost: "85 MYR", sub: "Entry, Snacks, Incidentals" },
  { item: "Tourism Tax / Fees", cost: "37 MYR", sub: "Hotel service fees & taxes" },
];

interface MalaysiaExpeditionViewProps {
  onBackToHome: () => void;
}

export const MalaysiaExpeditionView = memo(({ onBackToHome }: MalaysiaExpeditionViewProps) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);

  const activeDay = useMemo(() => ITINERARY_DATA[activeDayIdx], [activeDayIdx]);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 relative overflow-hidden font-sans selection:bg-amber-300 selection:text-black pt-24 pb-32">
      {/* Background Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />

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
          
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold font-ui">
            Expedition Chronicle
          </span>
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-24 aspect-[16/8] md:aspect-[21/9] border border-white/5 bg-zinc-950">
          <img 
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=2000" 
            alt="Malaysia Expedition" 
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                Series 02 • July 18 – 25, 2025
              </span>
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-serif text-white tracking-tight leading-none mb-6">
              Malaysian <br/> <span className="text-amber-50 font-normal italic">Expedition</span>
            </h1>

            <p className="text-white/60 text-xs md:text-sm font-light max-w-xl leading-relaxed mb-8">
              A curated 8-day expedition through mainland cultural highlights and the golden sun of pristine Langkawi.
            </p>

            <div className="flex gap-12 border-t border-white/10 pt-6 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Total Budget</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">₹90,000</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Currency Allocation</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">1,950 MYR</span>
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
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-ui">8 Days of Exploration</p>
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
                          Day 0{item.day}
                        </span>
                        <span className="font-bold text-sm md:text-base font-sans block leading-tight">
                          {item.city}
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
                  className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-[2.5rem] min-h-[520px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-12 pb-6 border-b border-white/5">
                      <div>
                        <h3 className="text-3xl md:text-5xl font-serif text-white italic mb-2">
                          {activeDay.theme}
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
                      {/* Morning */}
                      <div className="flex gap-5 items-start group">
                        <div className="mt-0.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-amber-400 transition-all">
                          <Sun size={16} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 font-ui">Morning block</span>
                          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light max-w-xl font-sans">
                            {activeDay.morning}
                          </p>
                        </div>
                      </div>

                      {/* Midday */}
                      <div className="flex gap-5 items-start group">
                        <div className="mt-0.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-amber-400 transition-all">
                          <Coffee size={16} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 font-ui">Midday block</span>
                          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light max-w-xl font-sans">
                            {activeDay.afternoon}
                          </p>
                        </div>
                      </div>

                      {/* Evening */}
                      <div className="flex gap-5 items-start group">
                        <div className="mt-0.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-amber-400 transition-all">
                          <Moon size={16} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 font-ui">Evening block</span>
                          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light max-w-xl font-sans">
                            {activeDay.evening}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-slate-500 text-[9px] font-bold tracking-[0.2em] uppercase font-ui flex items-center gap-1">
                      <MapPin size={12} className="text-amber-400" /> {activeDay.city}
                    </span>
                    {activeDay.day === 4 && (
                      <span className="bg-pink-500/10 text-pink-400 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-pink-500/20 font-ui flex items-center gap-1.5">
                        <Heart size={10} fill="currentColor" /> Birthday Event
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Directory Stay & Cuisine Section */}
        <section id="directory" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white">Directory</h2>
            <div className="h-[1px] flex-grow bg-white/10"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Hotels */}
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-10 text-amber-400">
                <Building size={20} />
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] font-ui">Accommodations</h3>
              </div>
              <div className="space-y-8">
                {DIRECTORY_DATA.hotels.map((h, i) => (
                  <div key={i} className="group">
                    <h4 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors mb-1 font-sans">
                      {h.name}
                    </h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium uppercase tracking-widest font-ui">{h.location}</span>
                      <span className="text-amber-400/60 italic font-serif">{h.feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurants */}
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-10 text-amber-400">
                <UtensilsCrossed size={20} />
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] font-ui">Cuisine & Dining</h3>
              </div>
              <div className="space-y-8">
                {DIRECTORY_DATA.restaurants.map((r, i) => (
                  <div key={i} className="group">
                    <h4 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors mb-1 font-sans">
                      {r.name}
                    </h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium uppercase tracking-widest font-ui">{r.location}</span>
                      <span className="text-amber-400/60 italic font-serif">{r.cuisine}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                  A grand total of <span class="text-white font-medium">₹90,000</span> distributed across flights, boutique stays, essential SIM packages, and curated local safaris.
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
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2">
                        <Receipt size={18} className="text-amber-400" />
                        <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white font-ui">
                          On Ground Disbursals (MYR)
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold font-ui">Spent to Date</span>
                        <span className="text-sm font-bold text-amber-400 font-mono">1,750 MYR</span>
                      </div>
                    </div>

                    <div className="space-y-5 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
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
                        Remaining Cash
                      </p>
                      <p className="text-3xl font-light italic text-white tracking-tighter font-serif">
                        200 <span className="text-sm text-slate-500 not-italic uppercase font-bold ml-1">MYR</span>
                      </p>
                    </div>
                    
                    <div className="h-14 w-14 rounded-full border border-emerald-500/20 flex items-center justify-center relative bg-emerald-500/[0.02]">
                      <div className="absolute inset-0 bg-emerald-500/5 animate-pulse rounded-full" />
                      <span className="text-emerald-400 font-bold text-[8px] uppercase tracking-widest font-ui">
                        Safe
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
                Follow high-definition updates, creative stories, reel insights, and cinematic travel diaries from this Malaysia trip across Instagram and YouTube.
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

MalaysiaExpeditionView.displayName = "MalaysiaExpeditionView";
