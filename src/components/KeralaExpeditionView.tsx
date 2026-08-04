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
  Train, 
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
import { SocialShareButtons } from "./SocialShareButtons";

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
    day: 1, 
    date: "Day 1: Coastline Hub Arrival", 
    city: "Delhi to Trivandrum", 
    theme: "Initial Transition", 
    morning: "Board flight from Delhi (DEL) to Trivandrum (TRV) airport.", 
    afternoon: "Arrive in Trivandrum. Take a brief cab ride to Hotel Saj Lucia and complete check-in (Night 1 rate: ₹3,500).", 
    evening: "Unpack, rest, and acclimate to the soothing coastal tropical air. Dinner at a local joint serving authentic Kerala seafood." 
  },
  { 
    day: 2, 
    date: "Day 2: Divine Darshan & Cliffside", 
    city: "Trivandrum to Varkala", 
    theme: "Temple Grace & Cliffs", 
    morning: "06:00 AM Experience peaceful early morning darshan at the sacred, historic Shree Padmanabhaswamy Temple. Return to hotel and check out.", 
    afternoon: "10:00 AM Board the scenic coastal train from Trivandrum to Varkala. Arrive and check into the premium Elixir Cliff Beach Resort & Spa (₹5,000/night).", 
    evening: "Rest at the resort. Later, take a sunset walk along the Varkala Cliff, exploring Varkala Beach and beachside shacks. Arrange scooty rental for next morning." 
  },
  { 
    day: 3, 
    date: "Day 3: Jatayu Earth's Center & Kappil", 
    city: "Varkala & Jatayu", 
    theme: "Colossal Sculpture & Backwaters", 
    morning: "08:00 AM Collect scooty (₹700/day). Ride to the awe-inspiring Jatayu Earth's Center to see the world's largest bird sculpture.", 
    afternoon: "Brunch featuring traditional Kerala banana-leaf meals. Explore the massive hillock scenery of Jatayu Temple.", 
    evening: "Cruise down to Kapil Beach (Kappil Beach), a magical narrow road where backwaters run parallel to the roaring sea. Savor local tea and hot banana fritters." 
  },
  { 
    day: 4, 
    date: "Day 4: Secret Black Sands", 
    city: "Varkala Cliffside", 
    theme: "Unwinding & Black Sand Beach", 
    morning: "09:00 AM Quiet breakfast at Elixir Cliff. Ride the scooty to the serene, peaceful Black Sand Beach (Thiruvambadi Beach).", 
    afternoon: "Enjoy delicious local seafood curries and appam at a seaside shack. Walk through coconut groves.", 
    evening: "Unwind at Elixir Cliff Resort & Spa. Hand over the scooty keys at night, completing the Varkala riding phase." 
  },
  { 
    day: 5, 
    date: "Day 5: Back to Trivandrum Hub", 
    city: "Varkala to Trivandrum", 
    theme: "Southern Transit & Relax", 
    morning: "Check out of Varkala early. Take the 11:00 AM train back to Trivandrum.", 
    afternoon: "Check back into Hotel Saj Lucia (Return leg booking rate: ₹3,000/night). Spend the hot afternoon resting.", 
    evening: "Take a relaxed stroll in Trivandrum. Enjoy a traditional Kerala Sadhya dinner. Rent the second scooty for the long run tomorrow." 
  },
  { 
    day: 6, 
    date: "Day 6: The Inter-State Border Run", 
    city: "Trivandrum to Kanyakumari", 
    theme: "Land's End Pilgrimage", 
    morning: "06:00 AM Early morning inter-state day-trip scooty ride from Trivandrum down to Kanyakumari (approx. 85-90 km each way).", 
    afternoon: "Visit the historic oceanside Kanyakumari Bhagavathi Amman Temple (Kumari Amman Temple) and witness the legendary three-seas confluence.", 
    evening: "Ride back to Hotel Saj Lucia in Trivandrum by evening. Enjoy a refreshing coconut water and local dinner celebrating the border run." 
  },
  { 
    day: 7, 
    date: "Day 7: Northern Homecoming", 
    city: "Trivandrum to Delhi", 
    theme: "Expedition Wrap-up", 
    morning: "Leisurely morning packing. Savor final traditional south Indian breakfast.", 
    afternoon: "Check out of Hotel Saj Lucia and transfer to Trivandrum (TRV) airport.", 
    evening: "Board the return flight back to Delhi, landing with fresh coastal memories and cultural insights." 
  }
];

const DIRECTORY_DATA = {
  hotels: [
    { name: "Elixir Cliff Beach Resort & Spa", location: "Varkala Cliff", feature: "Premium Beachfront, Spas, Cliffside Views (₹5,000/night)" },
    { name: "Hotel Saj Lucia", location: "Trivandrum Central", feature: "Mid-range Premium Heritage Comfort (₹3,500 Night 1, ₹3,000 Night 5)" }
  ] as DirectoryHotel[],
  stops: [
    { name: "Padmanabhaswamy Temple", location: "Trivandrum", cuisine: "Sacred architectural marvel with strictly traditional dress code" },
    { name: "Jatayu Earth's Center", location: "Chadayamangalam", cuisine: "Colossal sculpture park and adventure activities" },
    { name: "Varkala Beach Shacks", location: "Varkala Cliff", cuisine: "Fresh seafood of the day, tandoori fish, appam & stew" },
    { name: "Mothers Veg Plaza", location: "Trivandrum", cuisine: "Unforgettable traditional Kerala Sadhya served on banana leaves" },
    { name: "Sree Krishna Cafe", location: "Trivandrum", cuisine: "Sambar-loaded idlis, crisp vadas, and strong filter coffee" },
    { name: "Kumari Amman Temple", location: "Kanyakumari", cuisine: "Historic oceanside temple on the edge of the Indian Ocean" }
  ] as DirectoryStop[]
};

const LEDGER_CATEGORIES: LedgerCategory[] = [
  { category: "Delhi Flights (DEL-TRV)", cost: "₹22,000", detail: "Return flights per person", icon: Plane },
  { category: "Boutique Stays", cost: "₹10,750", detail: "3 Nights Elixir Varkala (₹7,500 split) + 2 Nights Saj Lucia (₹3,250 split)", icon: Building },
  { category: "Scooty & Rail Transits", cost: "₹1,550", detail: "Varkala & Trivandrum Scooty rentals (split) + Train tickets", icon: Compass },
  { category: "Food Trails & Fuel", cost: "₹10,700", detail: "Seafood dining, Sadhya feast, Scooty fuel & monument tickets", icon: Info },
];

const LOG_ENTRIES: LogEntry[] = [
  { item: "Return Flights (DEL-TRV-DEL)", cost: "₹22,000", sub: "Delhi to Trivandrum Round Trip flight booking" },
  { item: "Elixir Cliff Beach Resort", cost: "₹7,500", sub: "3 Nights stay (₹5,000/night twin-sharing split of ₹15,000 total)" },
  { item: "Hotel Saj Lucia (Night 1)", cost: "₹1,750", sub: "Twin-sharing split of ₹3,500 standard room rate" },
  { item: "Hotel Saj Lucia (Night 5)", cost: "₹1,500", sub: "Twin-sharing split of ₹3,000 return leg room rate" },
  { item: "Varkala Scooty Rental", cost: "₹700", sub: "2 Days rental (₹700/day split 50% from ₹1,400 total)" },
  { item: "Trivandrum Kanyakumari Scooty", cost: "₹350", sub: "1 Day rental for the border run (split 50% of ₹700)" },
  { item: "Scooty Fuel (Petrol)", cost: "₹1,200", sub: "Petrol for local Varkala runs and long 180km Kanyakumari run (split share)" },
  { item: "Traditional Sadhya & Seafood", cost: "₹5,000", sub: "Mothers Veg Plaza feast, beach shacks, seafood dining" },
  { item: "Jatayu Center Entry & Cable Car", cost: "₹1,500", sub: "Entry ticket, cable car ride up to colossal bird statue" },
  { item: "Inter-City Rail & Temple Entry", cost: "₹1,500", sub: "Trivandrum-Varkala return rail tickets & temple donations" },
];

interface KeralaExpeditionViewProps {
  onBackToHome: () => void;
}

export const KeralaExpeditionView = memo(({ onBackToHome }: KeralaExpeditionViewProps) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);

  const activeDay = useMemo(() => ITINERARY_DATA[activeDayIdx], [activeDayIdx]);

  return (
    <div className="min-h-screen bg-[#080a0c] text-slate-200 relative overflow-hidden font-sans selection:bg-amber-300 selection:text-black pt-24 pb-32">
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
          
          <SocialShareButtons title="Kerala & Kanyakumari Expedition — Lens & Latitude" variant="minimal" />
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-24 aspect-[16/8] md:aspect-[21/9] border border-white/5 bg-zinc-950 always-dark">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000" 
            alt="Kerala Expedition" 
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-[#080a0c]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                Series 04 • December 2026
              </span>
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-serif text-white tracking-tight leading-none mb-6">
              Kerala & <br/> <span className="text-amber-50 font-normal italic">Kanyakumari</span>
            </h1>

            <p className="text-white/80 text-base md:text-lg font-light max-w-4xl leading-relaxed mb-8 font-sans">
              A meticulously planned coastal run from the red cliffs of Varkala to the extreme southern confluence of land's end in Kanyakumari.
            </p>

            <div className="flex gap-12 border-t border-white/10 pt-6 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Total Per Person Budget</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">₹45,000</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Transport</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">Flights, Rail & Scooty</span>
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
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-ui">7 Days Coastal Route</p>
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
                          <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light max-w-xl font-sans">
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
                          <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light max-w-xl font-sans">
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
                          <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-light max-w-xl font-sans">
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
                    {activeDay.day === 6 && (
                      <span className="bg-red-500/10 text-red-400 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-red-500/20 font-ui flex items-center gap-1.5 animate-pulse">
                        <Milestone size={10} /> Border Scooty Run
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

            {/* Culinary Trail Stops & Experiences */}
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-10 text-amber-400">
                <UtensilsCrossed size={20} />
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] font-ui">Kerala Coastal Experiences</h3>
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
                  A comprehensive per-person budget of <span class="text-white font-medium">₹45,000</span> calculated on a twin-sharing base to secure premium cliffside stays and seamless flights.
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
                          Itemized Coastal Outlay
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold font-ui">Estimated Total</span>
                        <span className="text-sm font-bold text-amber-400 font-mono">₹45,000 / Person</span>
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
                        ₹45,000 <span className="text-sm text-slate-500 not-italic uppercase font-bold ml-1">INR</span>
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
                Follow high-definition updates, creative stories, reel insights, and cinematic travel diaries from this Kerala trip across Instagram and YouTube.
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
          <SocialShareButtons title="Kerala & Kanyakumari Expedition — Lens & Latitude" />
        </div>

      </div>
    </div>
  );
});

KeralaExpeditionView.displayName = "KeralaExpeditionView";
