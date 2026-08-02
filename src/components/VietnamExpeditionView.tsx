import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Building, 
  Compass, 
  Receipt, 
  Plane,
  Waves,
  Sparkles,
  UtensilsCrossed,
  Ship,
  Coffee,
  CheckCircle2,
  Ticket
} from "lucide-react";

interface PhaseItinerary {
  dayNumber: number;
  dateStr: string;
  title: string;
  location: string;
  stay: string;
  stayStatus: string;
  narrative: string;
  tags: string[];
  icon: React.ComponentType<any>;
}

interface BudgetLedgerItem {
  category: string;
  cost: string;
  detail: string;
  isBooked?: boolean;
  icon: React.ComponentType<any>;
}

const ITINERARY_DATA: PhaseItinerary[] = [
  {
    dayNumber: 0,
    dateStr: "JUL 17 (NIGHT)",
    title: "Delhi Departure to Saigon",
    location: "Delhi IGI Terminal 3 ➔ Flight to SGN",
    stay: "In-Flight Transit",
    stayStatus: "Flight Booked ✅",
    narrative: "Reach IGI Airport Terminal 3 by 9:00 PM on July 17. 12:05 AM (Jul 18) flight departs Delhi (DEL) to Ho Chi Minh City (SGN). Get ready for an early morning arrival in Southern Vietnam.",
    tags: ["DEL Terminal 3", "12:05 AM Flight", "Delhi to Saigon"],
    icon: Plane
  },
  {
    dayNumber: 1,
    dateStr: "JUL 18",
    title: "Ho Chi Minh City (Saigon) Arrival",
    location: "Ho Chi Minh City (District 1)",
    stay: "Bay View Hotel, District 1",
    stayStatus: "₹4,000 ✅ BOOKED",
    narrative: "Land at Tan Son Nhat Airport (SGN), take a Grab to Bay View Hotel in District 1 to drop off bags. Spend the afternoon visiting local cafes, central malls, and historical hubs like War Remnants Museum or Independence Palace. In the evening, explore Ben Thanh Night Market and enjoy dinner at Oasis Cafe. Cap off the night on the Saigon Open City Tour Bus.",
    tags: ["SGN Airport Grab", "District 1", "War Remnants Museum", "Ben Thanh Market", "Oasis Cafe", "City Tour Bus (₹600)"],
    icon: MapPin
  },
  {
    dayNumber: 2,
    dateStr: "JUL 19",
    title: "Saigon ➔ Hanoi Transit & Old Quarter",
    location: "Ho Chi Minh City ➔ Hanoi Old Quarter",
    stay: "Hanoi Sail Hotel",
    stayStatus: "₹2,700 ✅ BOOKED",
    narrative: "Catch a 4:00 AM early domestic flight to Hanoi (HAN). Grab to Hanoi Sail in the heart of the Old Quarter. Take a short nap and rest, then stroll around Hoan Kiem Lake and visit Ngoc Son Temple. Enjoy traditional Bun Cha for dinner and explore the lively Hanoi Weekend Night Market, followed by a Hanoi City Tour Bus ride.",
    tags: ["4 AM Flight to HAN", "Old Quarter", "Hoan Kiem Lake", "Bun Cha Dinner", "Hanoi Night Market"],
    icon: Plane
  },
  {
    dayNumber: 3,
    dateStr: "JUL 20",
    title: "Hanoi Cultural Immersion & Train Street",
    location: "Hanoi Capital Region",
    stay: "Hotel Sail, Hanoi",
    stayStatus: "✅ BOOKED",
    narrative: "Start the morning at the historical Temple of Literature, followed by coffee and crispy baguettes at the famous Banh Mi 25 Cafe. Finalize booking for the Ha Long Bay cruise. In the evening, experience Train Street coffee, attend the Mega Grand World show (using free Oct2 bus from Opera House Hanoi), and conclude with an authentic Indian dinner at Maazi Indian Restaurant.",
    tags: ["Temple of Literature", "Banh Mi 25", "Train Street Coffee", "Mega Grand World", "Maazi Indian Dinner"],
    icon: Coffee
  },
  {
    dayNumber: 4,
    dateStr: "JUL 21",
    title: "Ha Long Bay Overnight Cruise",
    location: "Hanoi ➔ Ha Long Bay (Lan Ha / Bai Tu Long)",
    stay: "Aurora Cruise Ship (Overnight)",
    stayStatus: "Included in Cruise (₹24,000 Package)",
    narrative: "8:00 AM hotel pickup for limousine bus to Ha Long Bay. Board the Aurora Cruise ship at noon. Spend the afternoon kayaking through limestone karst arches, swimming in turquoise waters, and exploring hidden rock caverns. Enjoy a sunset party and gourmet seafood dinner on the open deck under the stars.",
    tags: ["Aurora Cruise Ship", "Limousine Pickup", "Karst Kayaking", "Cave Exploration", "Deck Sunset Party"],
    icon: Ship
  },
  {
    dayNumber: 5,
    dateStr: "JUL 22",
    title: "Ha Long Bay Shore Stay & Poem Mountain Hike",
    location: "Ha Long Bay ➔ Bai Chay Beach",
    stay: "Muong Thanh Grand Bai Chay",
    stayStatus: "₹3,400 ✅ BOOKED",
    narrative: "Wake up for sunrise Tai Chi and breakfast on the cruise deck. Disembark at 11:30 AM and check into Muong Thanh Grand Bai Chay hotel. Hike Bai Tho Mountain (Poem Mountain) for an incredible high-angle view over Ha Long Bay. Spend the evening exploring Bai Chay Beach and dinner at Vannakam Indian Food.",
    tags: ["Sunrise Tai Chi", "Disembark 11:30 AM", "Bai Tho Mountain Hike", "Bai Chay Beach", "Vannakam Indian Food"],
    icon: Waves
  },
  {
    dayNumber: 6,
    dateStr: "JUL 23",
    title: "Ha Long Bay ➔ Ninh Binh Lotus Ponds",
    location: "Ha Long ➔ Ninh Binh (Tam Coc)",
    stay: "Tam Coc Marine Villa",
    stayStatus: "₹3,000 ✅ BOOKED",
    narrative: "Board a 9:00 AM Limousine Bus from Ha Long to Ninh Binh (~3.5 hrs transit). Check into Tam Coc Marine Villa homestay. Rent a bicycle to ride through local village paths and admire the massive lotus ponds in peak July bloom. Conclude the day with a relaxed dinner at Saffron Indian Restaurant.",
    tags: ["Limousine Bus (~3.5 hrs)", "Tam Coc Marine Villa", "Bicycle Rental", "Peak Lotus Bloom", "Saffron Indian Restaurant"],
    icon: Compass
  },
  {
    dayNumber: 7,
    dateStr: "JUL 24",
    title: "Ninh Binh: Trang An Grottoes & Mua Cave Peak",
    location: "Ninh Binh (Hang Mua & Trang An)",
    stay: "SI Grand Hotel",
    stayStatus: "₹2,250 ✅ BOOKED",
    narrative: "Begin early at Mua Cave (Hang Mua), climbing 500 stone steps to reach the legendary 'Lying Dragon' peak viewpoint over Tam Coc. In the afternoon, take a sampan boat tour through the UNESCO World Heritage Trang An Grottoes and cycle around Hoa Lu Ancient City before returning. Enjoy local dinner at Saffron Indian Restaurant.",
    tags: ["Mua Cave 500 Steps", "Lying Dragon Peak", "Trang An Boat Tour", "Hoa Lu Ancient City", "Saffron Indian"],
    icon: Sparkles
  },
  {
    dayNumber: 8,
    dateStr: "JUL 25",
    title: "Ninh Binh ➔ Hanoi Airport ➔ Delhi Return",
    location: "Ninh Binh ➔ HAN Airport ➔ Delhi IGI",
    stay: "Radisson Blu, IGI Delhi (Transit)",
    stayStatus: "₹8,000 ✅ BOOKED",
    narrative: "Enjoy a relaxed morning in Ninh Binh. At 12:00 PM, take a Limousine Bus directly to Noi Bai International Airport (HAN). Board the 7:40 PM flight back to Delhi. Land at IGI Airport late night and check into Radisson Blu IGI for a comfortable transit recovery.",
    tags: ["12 PM Limousine Bus", "7:40 PM HAN Flight", "Delhi Arrival", "Radisson Blu IGI"],
    icon: Plane
  }
];

const BUDGET_LEDGER: BudgetLedgerItem[] = [
  { category: "International & Domestic Flights", cost: "₹32,000", detail: "DEL ↔ SGN/HAN & SGN-HAN Connection (2 Persons)", isBooked: true, icon: Plane },
  { category: "Ha Long Bay Aurora Cruise", cost: "₹24,000", detail: "Overnight Luxury Cruise, Kayaking, Cave Tour & All Meals (2 Persons)", isBooked: true, icon: Ship },
  { category: "Hotels & Homestays (7 Nights)", cost: "₹20,000", detail: "District 1 Saigon, Hanoi Sail, Bai Chay, Tam Coc & Delhi (2 Persons)", isBooked: true, icon: Building },
  { category: "Food & Dining", cost: "₹10,000", detail: "Banh Mi 25, Maazi, Vannakam, Saffron, Oasis Cafe & Street Food (2 Persons)", isBooked: false, icon: UtensilsCrossed },
  { category: "Internal Transport", cost: "₹10,000", detail: "Grab cabs, Hanoi/Ha Long/Ninh Binh Limousine Buses, City Tour Buses (2 Persons)", isBooked: false, icon: Compass },
  { category: "Activities & Boat Entry", cost: "₹10,000", detail: "Trang An Boat Tour, Hang Mua Entry, City Tour Bus tickets (2 Persons)", isBooked: false, icon: Ticket },
  { category: "Visa Fees", cost: "₹5,000", detail: "Official Vietnam E-Visa approval (₹2,500 x 2 Persons)", isBooked: true, icon: Receipt },
  { category: "Travel Insurance", cost: "₹1,500", detail: "Comprehensive medical and travel protection (2 Persons)", isBooked: false, icon: CheckCircle2 },
  { category: "Misc / Shopping / 7-Eleven", cost: "₹5,000", detail: "Daily convenience stops, coffee beans, souvenirs (2 Persons)", isBooked: false, icon: Coffee },
];

const STAYS_BREAKDOWN = [
  { date: "Jul 18", hotel: "Bay View Hotel (District 1, Saigon)", cost: "₹1,800 booked (₹4,000 value)", status: "Booked ✅ (2 Pax)" },
  { date: "Jul 19", hotel: "Hanoi Sail (Old Quarter, Hanoi)", cost: "₹2,700 - ₹2,800 booked", status: "Booked ✅ (2 Pax)" },
  { date: "Jul 20", hotel: "Hotel Sail (Old Quarter, Hanoi)", cost: "₹2,800 booked", status: "Booked ✅ (2 Pax)" },
  { date: "Jul 21", hotel: "Aurora Cruise Ship (Ha Long Bay)", cost: "Included in ₹24k Cruise", status: "Booked ✅ (2 Pax)" },
  { date: "Jul 22", hotel: "Muong Thanh Grand Bai Chay (Ha Long)", cost: "₹3,400 booked", status: "Booked ✅ (2 Pax)" },
  { date: "Jul 23", hotel: "Tam Coc Marine Villa (Ninh Binh)", cost: "₹3,000 booked", status: "Booked ✅ (2 Pax)" },
  { date: "Jul 24", hotel: "SI Grand Hotel (Ninh Binh)", cost: "₹2,250 booked", status: "Booked ✅ (2 Pax)" },
  { date: "Jul 25", hotel: "Radisson Blu (IGI Airport Delhi)", cost: "₹4,000 booked (₹8,000 value)", status: "Booked ✅ (2 Pax)" },
];

const DINING_HIGHLIGHTS = [
  { name: "Banh Mi 25", location: "Hanoi Old Quarter", desc: "World-famous crispy baguettes filled with pate, grilled pork, and fresh cilantro." },
  { name: "Maazi Indian Restaurant", location: "Hanoi", desc: "Authentic North Indian curries, garlic naans, and rich thalis." },
  { name: "Vannakam Indian Food", location: "Ha Long Beach", desc: "Coastal South Indian flavors, dosas, and curries by Bai Chay." },
  { name: "Saffron Indian Restaurant", location: "Ninh Binh (Tam Coc)", desc: "Warm hospitality and flavorful Indian dining near lotus ponds." },
  { name: "Oasis Cafe", location: "Saigon (District 1)", desc: "Lush tropical ambiance for evening coffee and romantic dinners." },
  { name: "7-Eleven Convenience", location: "Nationwide", desc: "Daily quick stops for iced milk coffee, green teas, and quick snacks." }
];

interface VietnamExpeditionViewProps {
  onBackToHome: () => void;
}

/**
 * VietnamExpeditionView Component:
 * Displays the complete July 17 - 26, 2026 Vietnam Expedition itinerary, budget, hotel bookings,
 * dining highlights, and interactive day-by-day journey timeline.
 */
export const VietnamExpeditionView = memo(({ onBackToHome }: VietnamExpeditionViewProps) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(1);

  const activeDay = useMemo(() => ITINERARY_DATA[activeDayIdx], [activeDayIdx]);

  return (
    <div className="min-h-screen bg-black text-slate-200 relative overflow-hidden font-sans selection:bg-amber-400 selection:text-black pt-24 pb-32">
      {/* Background Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-50 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Navigation Back Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12 pb-6 border-b border-white/10"
        >
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journeys
          </button>
          
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold font-ui">
            Expedition Chronicle • July 2026
          </span>
        </motion.div>

        {/* Hero Banner Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16 aspect-[16/9] md:aspect-[21/9] border border-white/10 bg-zinc-950 always-dark">
          <img 
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=2000" 
            alt="Vietnam Expedition 2026" 
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1px] w-8 bg-amber-400/60" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-amber-400 font-ui">
                July 17 – 26, 2026 • 9 Days
              </span>
              <div className="h-[1px] w-8 bg-amber-400/60" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold font-serif text-white tracking-tight leading-none mb-4">
              Vietnam <br /> <span className="text-amber-200 font-normal italic">Expedition 2026</span>
            </h1>

            <p className="text-white/70 text-xs md:text-sm font-light max-w-2xl leading-relaxed mb-6">
              Delhi ➔ Ho Chi Minh City ➔ Hanoi ➔ Ha Long Bay ➔ Ninh Binh ➔ Delhi. Exploring limestone karsts, lotus blooms, night markets, and heritage bays.
            </p>

            <div className="flex flex-wrap gap-8 border-t border-white/15 pt-5 w-fit">
              <div>
                <span className="text-[9px] text-amber-400/70 uppercase tracking-widest block mb-1">Estimated Budget (2 Persons)</span>
                <span className="text-lg md:text-2xl font-bold text-white font-mono">~₹ 1,20,000 <span className="text-xs text-amber-400 font-sans font-normal">(~₹60k/person)</span></span>
              </div>
              <div>
                <span className="text-[9px] text-amber-400/70 uppercase tracking-widest block mb-1">Group & Regions</span>
                <span className="text-xs md:text-sm text-white font-semibold font-ui">2 Pax • Saigon • Hanoi • Ha Long • Ninh Binh</span>
              </div>
              <div>
                <span className="text-[9px] text-amber-400/70 uppercase tracking-widest block mb-1">Flights & Hotels</span>
                <span className="text-xs md:text-sm text-amber-400 font-semibold font-ui">100% Booked ✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Route Banner */}
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Compass className="text-amber-400 shrink-0" size={24} />
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-amber-400 font-ui">Master Expedition Route</h3>
              <p className="text-sm md:text-base text-white font-serif mt-1">
                DEL ✈ SGN ✈ HAN 🚌 Ha Long Bay 🚐 Ninh Binh 🚌 HAN ✈ DEL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-4 py-2 rounded-full text-amber-300 text-xs font-mono font-bold">
            <Calendar size={14} />
            <span>Jul 17 – 26, 2026</span>
          </div>
        </div>

        {/* Day-by-Day Interactive Section */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-ui block mb-2">
              Journey Timeline
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">Day-by-Day Breakdown</h2>
          </div>

          {/* Days selector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {ITINERARY_DATA.map((item, idx) => (
              <button
                key={item.dayNumber}
                onClick={() => setActiveDayIdx(idx)}
                className={`px-4 py-3 rounded-xl border text-xs font-bold font-ui shrink-0 transition-all flex flex-col items-start gap-1 cursor-pointer ${
                  activeDayIdx === idx
                    ? "bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20"
                    : "bg-zinc-900/90 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider opacity-80">{item.dateStr}</span>
                <span>{item.dayNumber === 0 ? "Departure" : `Day ${item.dayNumber}`}</span>
              </button>
            ))}
          </div>

          {/* Active Day Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay.dayNumber}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-zinc-900/90 border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      {activeDay.dateStr}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1 font-ui">
                      <MapPin size={12} className="text-amber-400" />
                      {activeDay.location}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white font-bold">{activeDay.title}</h3>
                </div>

                <div className="bg-black/60 border border-white/10 p-4 rounded-xl text-right">
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-ui">Accommodation</span>
                  <p className="text-xs font-bold text-white font-serif mt-0.5">{activeDay.stay}</p>
                  <span className="text-[10px] text-amber-400 font-mono font-semibold block mt-1">{activeDay.stayStatus}</span>
                </div>
              </div>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8 font-sans">
                {activeDay.narrative}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {activeDay.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300 px-3 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Accommodations & Stays Breakdown Grid */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-ui block mb-2">
              Stay Ledger (2 Persons)
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">Confirmed Hotel Stays (7 Nights • 2 Pax)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAYS_BREAKDOWN.map((stay, idx) => (
              <div key={idx} className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 hover:border-amber-400/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">{stay.date}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">{stay.status}</span>
                </div>
                <h4 className="text-sm font-serif font-semibold text-white mb-2 leading-snug">{stay.hotel}</h4>
                <p className="text-xs text-zinc-400 font-mono">{stay.cost}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dining & Cafes Highlights */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-ui block mb-2">
              Gastronomy & Coffee Trails
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">Cafes & Culinary Highlights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DINING_HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-400/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <UtensilsCrossed size={18} />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">{item.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-mono">{item.location}</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Total Estimated Budget Table */}
        <section className="mb-12">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-ui block mb-2">
              Financial Breakdown (2 Persons)
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white">Estimated Budget Ledger (~₹1,20,000 for 2 Persons)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUDGET_LEDGER.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                        <IconComp size={20} />
                      </div>
                      {item.isBooked && (
                        <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 font-bold">
                          Booked ✅
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-serif font-bold text-white mb-1">{item.category}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{item.detail}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-ui">Allocation</span>
                    <span className="text-base font-bold font-mono text-amber-400">{item.cost}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
});

VietnamExpeditionView.displayName = "VietnamExpeditionView";
