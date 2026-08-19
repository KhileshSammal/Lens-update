import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Calendar, Eye } from "lucide-react";
import { TRIPS } from "../constants";

interface DirectoryProps {
  onSelectTrip: (id: number) => void;
}

export const Directory = memo(({ onSelectTrip }: DirectoryProps) => {
  const [filter, setFilter] = useState("all");

  const filteredTrips = useMemo(() => 
    filter === "all" ? TRIPS : TRIPS.filter(t => t.category === filter),
    [filter]
  );

  return (
    <section id="directory" className="py-16 md:py-24 bg-card-bg">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 sm:px-6 lg:px-8 mb-10 md:mb-12 w-full max-w-[92%] mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-serif mb-2">The Directory</h2>
        <p className="text-accent mb-8 text-xs md:text-sm italic flex items-center gap-2 font-ui font-semibold">
          <Compass size={14} /> A curated archive of expeditions
        </p>
        
        <div className="flex items-center space-x-6 text-[10px] md:text-xs font-bold font-ui uppercase tracking-widest overflow-x-auto pb-2 no-scrollbar">
          {["all", "international", "india"].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`pb-1 whitespace-nowrap transition-all hover:text-accent border-b-2 cursor-pointer ${filter === cat ? "text-accent border-accent" : "border-transparent text-text-dim"}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-0.5 bg-border-main border-y border-border-main">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[4/5] bg-card-bg flex items-center justify-center text-center p-4 sm:p-6"
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-accent/30 flex items-center justify-center mb-2 sm:mb-4">
              <Calendar className="text-accent" size={16} />
            </div>
            <h3 className="text-base sm:text-xl font-serif text-text-main">The Next Chapter</h3>
            <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-accent mt-1 sm:mt-2 font-ui font-bold">Dropping Q3 2026</p>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {filteredTrips.map((trip) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              key={trip.id}
              className="relative aspect-[4/5] bg-black group overflow-hidden always-dark"
            >
              <img 
                src={trip.img} 
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" 
                alt={`Expedition cover photograph of ${trip.title} - ${trip.subtitle}`}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/10 to-transparent">
                <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] mb-1 text-accent font-bold font-ui">{trip.subtitle}</span>
                <h3 className="text-base sm:text-xl font-serif mb-2 sm:mb-4 leading-tight text-white">{trip.title}</h3>
                <button 
                  onClick={() => onSelectTrip(trip.id)}
                  className="px-3 py-1.5 sm:px-5 sm:py-2.5 text-[9px] sm:text-[11px] font-bold font-ui uppercase tracking-widest border border-white/40 hover:bg-white hover:text-black transition-all w-fit flex items-center gap-1.5 sm:gap-2 cursor-pointer text-left"
                >
                  View <Eye size={12} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
});

Directory.displayName = "Directory";
