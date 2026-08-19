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
  CreditCard,
  Sun,
  Coffee,
  Moon,
  UtensilsCrossed,
  Instagram,
  Youtube,
  AlertTriangle,
  Milestone
} from "lucide-react";
import { SocialShareButtons } from "./SocialShareButtons";
import { TripCopyBanner } from "./TripCopyBanner";
import { DestinationBlogLinkCard } from "./DestinationBlogLinkCard";

interface DayItinerary {
  day: number;
  date: string;
  city: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  route: string;
  stop: string;
  food: string;
}

interface DirectoryHotel {
  name: string;
  location: string;
  feature: string;
}

interface DirectoryStop {
  name: string;
  location: string;
  description: string;
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
    date: "Day 1: Rise to Nainital Lake Town", 
    city: "Haldwani to Nainital", 
    theme: "Hills Transition & Lake View", 
    morning: "Begin early in Haldwani. Secure the mountain-spec rental scooty. Ascend from the plains into the lower Kumaon hills, feeling the temperature drop as winding valley roads reveal themselves.", 
    afternoon: "Reach Nainital, complete checking in. Spend the afternoon exploring the peaceful Naini Lake and walking along Mall Road.", 
    evening: "Enjoy a scenic sunset overlooking the lake, dine at local hotspots, and settle in Nainital for Night 1.",
    route: "Ascending from the plains into the lower Kumaon hills. Winding lake-view roads.",
    stop: "Nainital Lake, Naini Devi Temple & local Mall Road walking.",
    food: "Enjoy delicious local delicacies and hot momos by the lakeside."
  },
  { 
    day: 2, 
    date: "Day 2: Sacred Ashram & Long Mountain Ridge Run", 
    city: "Nainital to Kainchi Dham to Almora to Patal Bhuvaneshwar", 
    theme: "Spiritual Stop, Heavy Drive & Rest", 
    morning: "06:00 AM Depart early from Nainital. Ride to Kainchi Dham Ashram for tranquil morning darshan and deep meditation at the world-famous serene ashram.", 
    afternoon: "Depart Kainchi Dham, head towards Almora for a brief stop, and continue the long scenic highway drive to Patal Bhuvaneshwar.", 
    evening: "Reach Patal Bhuvaneshwar, check into Hotel Moon / BN Resort. Spend the evening resting after the long drive (rest and drive only, no cave entry today). Stay in Patal Bhuvaneshwar.",
    route: "Scenic highways passing through Kainchi Dham and Almora alpine ridges.",
    stop: "Kainchi Dham Ashram darshan and remote route navigation.",
    food: "Hot highway samosas near Khairna and simple mountain-style dinner at Patal Bhuvaneshwar."
  },
  { 
    day: 3, 
    date: "Day 3: Mystical Cave Descent & Stone Temples", 
    city: "Patal Bhuvaneshwar to Jageshwar Dham to Almora", 
    theme: "Subterranean Wonder & Ancient Forest Heritage", 
    morning: "08:00 AM Participate in the powerful morning darshan and guided exploration inside the deep limestone cave of Patal Bhuvaneshwar.", 
    afternoon: "Ride down through pristine pine forests to reach the ancient, stone-carved heritage temple cluster of Jageshwar Dham.", 
    evening: "Continue the ride to Almora, check into your stay, and explore Almora's heritage Mall Road. Stay in Almora.",
    route: "Deep deodar valleys and ridge runs connecting Patal Bhuvaneshwar, Jageshwar, and Almora.",
    stop: "Guided descent inside Patal Bhuvaneshwar Caves and ancient stone temples of Jageshwar Dham.",
    food: "Warm local-favorite Sonam Momos in Almora and hot regional herbal tea."
  },
  { 
    day: 4, 
    date: "Day 4: Ridge Back-Run to Lake District", 
    city: "Almora to Nainital", 
    theme: "Valley Overlooks & Lakeside Return", 
    morning: "Capture stunning morning ridge photography over the valleys of Almora before checkout. Ride back towards the Nainital lake district.", 
    afternoon: "Re-enter Nainital, check into hotel, and spend the afternoon relaxing or visiting hidden spots like Sariyatal or Khurpatal.", 
    evening: "Stroll around the shimmering lake at night, enjoy comfort street food, and rest peacefully in Nainital for Night 4.",
    route: "Westward ridge returns and gradual descents back to Nainital.",
    stop: "Almora ridge lookouts and tranquil lakeside pathways in Nainital.",
    food: "Comfort mountain snacks, hot lemon teas, and loaded thalis."
  },
  { 
    day: 5, 
    date: "Day 5: High-elevation Descent Loop Completion", 
    city: "Nainital to Haldwani", 
    theme: "Downhill Glides & Return", 
    morning: "Leisurely breakfast in Nainital with lake views. Pack bags for the final mountain descent.", 
    afternoon: "Ride the scooty downhill passing back through Kathgodam, catching beautiful valley vistas along the final curves.", 
    evening: "Reach Haldwani, perform final scooty mechanical inspections, return rental equipment safely, and conclude the mountain loop.",
    route: "Downhill descent back to the plains of Kathgodam and Haldwani.",
    stop: "Final scooty inspection, returning rental equipment, and ending the loop in Haldwani.",
    food: "Celebrate the successful adventure with hot Kumaoni Bal Mithai and Singauri sweets."
  }
];

const DIRECTORY_DATA = {
  hotels: [
    { name: "Hotel Moon", location: "Patal Bhuvaneshwar", feature: "Close to the cave, panoramic Himalayan vistas" },
    { name: "BN Resort", location: "Patal Bhuvaneshwar", feature: "Peaceful alpine setting, local organic food" },
    { name: "Almora Heritage Retreat", location: "Almora Ridge", feature: "Stunning forest viewpoints & wooden cottages" }
  ] as DirectoryHotel[],
  stops: [
    { name: "Kainchi Dham Ashram", location: "Bhowali Highway", description: "World-famous serene spiritual retreat of Neem Karoli Baba" },
    { name: "Jageshwar Dham", location: "Jageshwar Forest", description: "Cluster of 124 ancient stone-carved heritage temples" },
    { name: "Patal Bhuvaneshwar Cave", location: "Patal Bhuvaneshwar", description: "Deep limestone cave with incredible mythological stone carvings" },
    { name: "Sonam Momos", location: "Almora Mall Road", description: "Undisputed local favorite offering legendary Kumaon-style momos" }
  ] as DirectoryStop[]
};

const LEDGER_CATEGORIES: LedgerCategory[] = [
  { category: "Stays & Resorts", cost: "₹14,000", detail: "4 Nights Total at Hotel Moon / BN Resort (₹3,500 avg/night)", icon: Building },
  { category: "Fuel & Bike Upkeep", cost: "₹2,500", detail: "Mountain running, engine oil checks, petrol refills", icon: Compass },
  { category: "Food & Local Trails", cost: "₹3,500", detail: "Khairna Samosas, Sonam Momos, authentic Kumaoni dishes & tea", icon: UtensilsCrossed },
  { category: "Misc & Entry Fees", cost: "₹500", detail: "Cave entrance, local registered guides, secure mountain parking", icon: Info },
];

const LOG_ENTRIES: LogEntry[] = [
  { item: "Accommodations (4 Nights)", cost: "₹14,000", sub: "Hotel Moon / BN Resort base rate (Assuming twin sharing split)" },
  { item: "Mountain Fuel & Scooty Upkeep", cost: "₹2,500", sub: "Thorough prep, multi-stage petrol refills, and mountain safety check" },
  { item: "Kumaoni Food Trails", cost: "₹3,500", sub: "Khairna Samosas, Sonam Momos, hot mountain tea, and local dal-bhaat" },
  { item: "Cave Guided Entrance", cost: "₹300", sub: "Mandatory local expert guide and cave system access fee" },
  { item: "Secure Mountain Parking", cost: "₹100", sub: "Scooty parking fees at temple checkpoints and Jageshwar" },
  { item: "Incidentals & Extras", cost: "₹100", sub: "Small cash payments on remote ridge checkposts" }
];

interface PatalBhuvaneshwarExpeditionViewProps {
  onBackToHome: () => void;
  onOpenBlog?: (postId: string) => void;
}

export const PatalBhuvaneshwarExpeditionView = memo(({ onBackToHome, onOpenBlog }: PatalBhuvaneshwarExpeditionViewProps) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);

  const activeDay = useMemo(() => ITINERARY_DATA[activeDayIdx], [activeDayIdx]);

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
          
          <SocialShareButtons title="Patal Bhuvaneshwar Expedition — Lens & Latitude" variant="minimal" />
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-24 aspect-[16/8] md:aspect-[21/9] border border-white/5 bg-zinc-950 always-dark">
          <img 
            src="https://images.unsplash.com/photo-1714744715493-ad89b7ff503e?auto=format&fit=crop&q=80&w=2000" 
            alt="Ancient cedar pine forests and Himalayan mountain ranges surrounding Patal Bhuvaneshwar in Pithoragarh" 
            className="w-full h-full object-cover brightness-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090b] via-[#07090b]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                Series 05 • Uttarakhand Mountain Odyssey
              </span>
              <div className="h-[1px] w-8 bg-amber-400/50"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold font-serif text-white tracking-tight leading-none mb-6">
              Patal <br/> <span className="text-amber-50 font-normal italic">Bhuvaneshwar</span>
            </h1>

            <p className="text-white/80 text-base md:text-lg font-light max-w-4xl leading-relaxed mb-8 font-sans">
              A high-efficiency 5-Day mountain scooty loop tracing pristine ridges, ancient deodar sanctuaries, and mystical deep limestone caves.
            </p>

            <div className="flex gap-12 border-t border-white/10 pt-6 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Total Per Person Budget</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">₹20,500</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10"></div>
              <div>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mb-1">Rider Profile</span>
                <span className="text-lg md:text-2xl font-light text-white italic font-serif">Khilesh's Itinerary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rider Prep & Safety Banner */}
        <section className="mb-24 bg-amber-400/[0.02] border border-amber-400/15 p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="p-4 rounded-2xl bg-amber-400/10 text-amber-400 shrink-0">
            <AlertTriangle size={28} />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-white italic">Rider Prep & Safety Protocols</h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-300 font-light leading-relaxed">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1 font-ui">Mechanical Check</span>
                Inspect brake pads, throttle response, and engine oil thoroughly before tackling high-elevation loops.
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1 font-ui">Weather Shielding</span>
                Pack heavy thermal layers and riding windbreakers; mountain valley temperatures drop sharply without warning after dusk.
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Navigator Section */}
        <section id="itinerary" className="mb-32 destination-itinerary-section">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-serif text-white italic mb-2">The Journey</h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest font-ui">5 Days of High-altitude Trails</p>
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

                    {/* Mountain Details Block */}
                    <div className="mb-10 p-5 rounded-2xl bg-white/[0.01] border border-white/5 grid gap-4 md:grid-cols-3 text-xs">
                      <div>
                        <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1 font-ui">Ridge Route</span>
                        <p className="text-slate-300 font-sans">{activeDay.route}</p>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1 font-ui">Peak Target</span>
                        <p className="text-slate-300 font-sans">{activeDay.stop}</p>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1 font-ui">Food Trail</span>
                        <p className="text-amber-100 font-sans italic">{activeDay.food}</p>
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
                    {activeDay.day === 3 && (
                      <span className="bg-emerald-500/10 text-emerald-400 px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20 font-ui flex items-center gap-1.5 animate-pulse">
                        <Milestone size={10} /> Ultimate Destination
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
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] font-ui">Kumaon Highlights</h3>
              </div>
              <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                {DIRECTORY_DATA.stops.map((r, i) => (
                  <div key={i} className="group border-b border-white/[0.02] pb-3 last:border-b-0">
                    <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors mb-1 font-sans">
                      {r.name}
                    </h4>
                    <div className="flex flex-col gap-1 text-xs md:text-sm">
                      <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px] font-ui">{r.location}</span>
                      <span className="text-amber-100/80 italic font-sans font-light leading-relaxed">{r.description}</span>
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
                  A comprehensive per-person budget of <span class="text-white font-medium">₹20,500</span> designed for the 5-day mountain odyssey on a twin-sharing base.
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
                          Itemized Kumaon Outlay
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-slate-500 block uppercase font-bold font-ui">Estimated Total</span>
                        <span className="text-sm font-bold text-amber-400 font-mono">₹20,500 / Person</span>
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
                        ₹20,500 <span className="text-sm text-slate-500 not-italic uppercase font-bold ml-1">INR</span>
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

        {/* FULL BLOG ITINERARY LINK */}
        <DestinationBlogLinkCard 
          blogPostId="patal-bhuvneswar-cave-secrets"
          destinationLabel="Patal Bhuvaneshwar, Uttarakhand"
          onOpenBlog={onOpenBlog}
        />

        {/* CUSTOM ITINERARY PLANNER PROMO */}
        <TripCopyBanner destination="Patal Bhuvaneshwar (Kumaon Himalayas)" />

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
                Follow high-definition updates, creative stories, reel insights, and cinematic travel diaries from this Patal Bhuvaneshwar trip across Instagram and YouTube.
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
          <SocialShareButtons title="Patal Bhuvaneshwar Expedition — Lens & Latitude" />
        </div>

      </div>
    </div>
  );
});

PatalBhuvaneshwarExpeditionView.displayName = "PatalBhuvaneshwarExpeditionView";
