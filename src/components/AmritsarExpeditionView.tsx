import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Info, 
  Plus, 
  Building, 
  Train, 
  Bus, 
  Receipt, 
  CreditCard,
  Sun,
  Coffee,
  Moon,
  UtensilsCrossed,
  Instagram,
  Youtube,
  Compass,
  Milestone
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

interface DirectoryStop {
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
  { 
    day: 0, 
    date: "Day 0: Overnight Transit", 
    city: "Delhi to Amritsar", 
    theme: "Night Train", 
    morning: "Standard prep and packing in Delhi. Ensuring travel documents and bookings are ready.", 
    afternoon: "Rest at home, charge devices, and organize luggage for the rapid-packed expedition.", 
    evening: "10:00 PM Board overnight express train (3AC/Sleeper) from Delhi to Amritsar. Save overnight hotel expenses!" 
  },
  { 
    day: 1, 
    date: "Day 1: Arrival & Transition", 
    city: "Amritsar Hub", 
    theme: "Acclimatization & Scooty Trail", 
    morning: "Morning arrival at Amritsar Junction. Cab to the hotel and early check-in (twin-sharing).", 
    afternoon: "Rest at hotel, refresh, and recover from the overnight train journey.", 
    evening: "05:00 PM Pick up the rental scooty (₹600/day, 2-day hire). Head out for a legendary peda lassi at Ahuja Milk Bhandar, followed by slow-cooked Punjabi dinner at Bharawan Da Dhaba." 
  },
  { 
    day: 2, 
    date: "Day 2: Sacred Parikrama", 
    city: "The Golden Temple Walk", 
    theme: "Divine Immersion & Heritage", 
    morning: "05:30 AM Early morning parikrama and holy prayers at the Golden Temple. Authentic Amritsari Kulcha breakfast at Bhai Kulwant Singh Kulchawale.", 
    afternoon: "Midday walking tour of Jallianwala Bagh (historic memorial park). Cool off with heavy malai lassi at Gianni Zail Singh Lassi Lala.", 
    evening: "Witness the breathtaking Night Illumination at the Golden Temple. Partake in the spiritual community Langar experience for dinner." 
  },
  { 
    day: 3, 
    date: "Day 3: Border Beat Run", 
    city: "Attari-Wagah Border Run", 
    theme: "Patriotic Resonance & Bazars", 
    morning: "Explore local markets of Katra Jaimal Singh for authentic Phulkari work and souvenirs. Brunch at Kulcha Land or Ram Kulcha.", 
    afternoon: "03:00 PM EXACT: Ride the rental scooty to the Wagah-Attari Border to beat the traffic, arriving by 05:00 PM to secure prime seats.", 
    evening: "Witness the high-octane Beating Retreat Ceremony at the border. Ride back to the city at night for a second peaceful illumination viewing at the Golden Temple, return scooty keys, and dine at Kesar Da Dhaba." 
  },
  { 
    day: 4, 
    date: "Day 4: Gobindgarh Fort", 
    city: "Amritsar to Delhi", 
    theme: "Historic Citadels & Sleeper Bus", 
    morning: "Relaxed breakfast. Pack bags and check out of the hotel by 12:00 PM (Midday).", 
    afternoon: "Spend the afternoon exploring Gobindgarh Fort, experiencing the regional light, sound, and historical show.", 
    evening: "Dinner near the station. 09:30 PM Board the overnight Volvo AC Sleeper bus back to Delhi, concluding the high-efficiency loop." 
  }
];

const DIRECTORY_DATA = {
  hotels: [
    { name: "Ramada by Wyndham Amritsar", location: "Near Golden Temple / Town Hall", feature: "Premium Comfort, Rooftop Pool (₹3,000/night for 2 people)" },
    { name: "Hotel Heritage Inn", location: "Near Golden Temple", feature: "Walking Distance, Heritage Vibe" }
  ] as DirectoryHotel[],
  stops: [
    { name: "Kesar Da Dhaba", location: "Chowk Passian", cuisine: "Legendary slow-cooked dal makhani in pure ghee" },
    { name: "Bharawan Da Dhaba", location: "Town Hall", cuisine: "Traditional Punjabi thalis & soft paneer" },
    { name: "Gianni Zail Singh Lassi", location: "Patel Chowk", cuisine: "Malai/peda heavy lassi in tall brass glasses" },
    { name: "Ahuja Milk Bhandar", location: "Dhab Khatikan", cuisine: "Famous peda lassi and thick kulfi" },
    { name: "Bhai Kulwant Singh Kulchawale", location: "Golden Temple Outer", cuisine: "Wood-fired Amritsari Kulchas with spicy chole" },
    { name: "Kulcha Land", location: "Ranjit Avenue", cuisine: "Crisp multi-layered butter-loaded kulchas" }
  ] as DirectoryStop[]
};

const LEDGER_CATEGORIES: LedgerCategory[] = [
  { category: "Transits (Train & Bus)", cost: "₹3,300", detail: "Overnight Delhi-Amritsar 3AC Train + Premium Return Volvo Bus", icon: Train },
  { category: "Accommodations", cost: "₹4,500", detail: "3 Nights at Ramada by Wyndham Amritsar (twin-sharing split)", icon: Building },
  { category: "Local Transport & Fuel", cost: "₹1,200", detail: "2 Days scooty hire (₹600/day split) + fuel", icon: Compass },
  { category: "Food Trails & Activities", cost: "₹6,000", detail: "Pure ghee dhabas, Kulchas, Lassis, Fort entrance & Phulkari shopping", icon: Info },
];

const LOG_ENTRIES: LogEntry[] = [
  { item: "Train Ticket (3AC)", cost: "₹1,500", sub: "Delhi to Amritsar Overnight Express premium booking" },
  { item: "Volvo AC Sleeper Bus", cost: "₹1,800", sub: "Amritsar to Delhi Premium Multi-axle Sleeper" },
  { item: "Ramada by Wyndham Amritsar", cost: "₹4,500", sub: "3 Nights Stay (₹3,000/night twin-sharing split of ₹9,000 total)" },
  { item: "Scooty Rental", cost: "₹600", sub: "2 Days hire (split 50% from ₹1,200 total)" },
  { item: "Scooty Fuel", cost: "₹600", sub: "Petrol for local runs, Katra Jaimal, and Wagah border" },
  { item: "Gianni & Ahuja Lassi Trails", cost: "₹400", sub: "Frequent premium peda and malai lassis" },
  { item: "Dhaba Dinners (Kesar & Bharawan)", cost: "₹2,500", sub: "Authentic slow-cooked thalis with pure ghee" },
  { item: "Bhai Kulwant & Kulcha Land", cost: "₹800", sub: "Multiple loaded butter kulcha breakfasts" },
  { item: "Gobindgarh Fort & Shows", cost: "₹800", sub: "Full heritage access + premium 7D Light & Sound show" },
  { item: "Souvenirs & Phulkari Work", cost: "₹1,500", sub: "Shopping in local Katra Jaimal Singh bazars" },
];

interface AmritsarExpeditionViewProps {
  onBackToHome: () => void;
}

export const AmritsarExpeditionView = memo(({ onBackToHome }: AmritsarExpeditionViewProps) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(1); // Day 1 as active by default since Day 0 is transit

  const activeDay = useMemo(() => ITINERARY_DATA[activeDayIdx], [activeDayIdx]);

  return (
    <div className="min-h-screen bg-[#090b0e] text-slate-200 relative overflow-hidden font-sans selection:bg-amber-300 selection:text-black pt-24 pb-32">
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
            className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journeys
          </button>
          
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold font-ui">
            Expedition Chronicle
          </span>
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-24 aspect-[16/8] md:aspect-[21/9] border border-white/5 bg-zinc-950 always-dark">
          <img 
            src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=2000" 
            alt="Amritsar Expedition" 
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                Series 03 • February 2026
              </span>
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-serif text-white tracking-tight leading-none mb-6">
              Amritsar <br/> <span className="text-amber-50 font-normal italic">Grace</span>
            </h1>

            <p className="text-white/60 text-xs md:text-sm font-light max-w-xl leading-relaxed mb-8 font-sans">
              A high-efficiency travel blueprint and culinary trail mapping out the sacred heritage, historical memorials, and intense patriotic energy of Amritsar.
            </p>

            <div className="flex gap-12 border-t border-white/10 pt-6 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Total Per Person Budget</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">₹15,000</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Transport</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">Scooty & Train</span>
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
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-ui">5 Days of High-efficiency Trails</p>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                {ITINERARY_DATA.map((item, idx) => {
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
                        <h3 className="text-2xl md:text-4xl font-serif text-white italic mb-2 leading-snug">
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
                    <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase font-ui flex items-center gap-1.5">
                      <MapPin size={12} className="text-amber-400" /> {activeDay.city}
                    </span>
                    {activeDay.day === 3 && (
                      <span className="bg-red-500/10 text-red-400 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-red-500/20 font-ui flex items-center gap-1.5 animate-pulse">
                        <Milestone size={10} /> Wagah 03:00 PM Run
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

            {/* Culinary Trail Stop */}
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-10 text-amber-400">
                <UtensilsCrossed size={20} />
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] font-ui">Amritsar Culinary Stops</h3>
              </div>
              <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                {DIRECTORY_DATA.stops.map((r, i) => (
                  <div key={i} className="group border-b border-white/[0.02] pb-3 last:border-b-0">
                    <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors mb-1 font-sans">
                      {r.name}
                    </h4>
                    <div className="flex flex-col gap-1 text-xs md:text-sm">
                      <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px] font-ui">{r.location}</span>
                      <span className="text-amber-100/80 italic font-sans font-light leading-relaxed">{r.cuisine}</span>
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
                  A highly structured per-person budget of <span class="text-white font-medium">₹15,000</span> representing extreme efficiency and maximum local luxury by leveraging sleeper transits.
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
                          Itemized Ground Outlay
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold font-ui">Estimated Total</span>
                        <span className="text-sm font-bold text-amber-400 font-mono">₹15,000 / Person</span>
                      </div>
                    </div>

                    <div className="space-y-5 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
                      {LOG_ENTRIES.map((l, i) => (
                        <div key={i} className="border-b border-white/[0.02] pb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-200 font-medium text-xs md:text-sm hover:text-amber-400 transition-colors duration-300">
                              {l.item}
                            </span>
                            <span className="text-amber-100 font-mono text-xs md:text-sm font-semibold">
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
                        Budget Status
                      </p>
                      <p className="text-3xl font-light italic text-white tracking-tighter font-serif">
                        ₹15,000 <span className="text-sm text-slate-500 not-italic uppercase font-bold ml-1">INR</span>
                      </p>
                    </div>
                    
                    <div className="h-14 w-14 rounded-full border border-emerald-500/20 flex items-center justify-center relative bg-emerald-500/[0.02]">
                      <div className="absolute inset-0 bg-emerald-500/5 animate-pulse rounded-full" />
                      <span className="text-emerald-400 font-bold text-[8px] uppercase tracking-widest font-ui">
                        Ready
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
                Follow high-definition updates, creative stories, reel insights, and cinematic travel diaries from this Amritsar trip across Instagram and YouTube.
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

AmritsarExpeditionView.displayName = "AmritsarExpeditionView";
