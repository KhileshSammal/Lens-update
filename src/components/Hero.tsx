import { memo } from "react";
import { motion } from "motion/react";
import { SOCIAL_LINKS } from "../constants";

export const Hero = memo(() => (
  <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0c0c0e] always-dark text-white">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1596642240875-da7d44fe845f?auto=format&fit=crop&w=1920&q=80" 
        className="w-full h-full object-cover opacity-60" 
        alt="Dramatic mountain landscape and mist representing global travel expeditions" 
        fetchPriority="high"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0c0c0e]"></div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 text-center px-6 max-w-4xl"
    >
      <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif italic mb-4 text-white drop-shadow-2xl">Lens & Latitude</h1>
      <p className="text-[9px] sm:text-xs md:text-base uppercase tracking-[0.2em] md:tracking-[0.5em] text-[#ffcc00] font-bold font-ui">Documenting the Unseen — 2025 - ∞</p>
      
      <div className="mt-8 md:mt-10 flex justify-center space-x-6 md:space-x-8 text-white">
        {SOCIAL_LINKS.map((social) => (
          <motion.a 
            key={social.label}
            whileHover={{ scale: 1.1, color: "#ffcc00" }}
            href={social.href} 
            target="_blank" 
            aria-label={social.label} 
            className="p-2 text-white hover:text-[#ffcc00] transition-colors"
          >
            <social.icon size={24} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  </section>
));

Hero.displayName = "Hero";
