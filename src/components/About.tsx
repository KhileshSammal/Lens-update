import { memo } from "react";
import { motion } from "motion/react";
import { PenTool, ArrowRight } from "lucide-react";

interface AboutProps {
  onReadBio: () => void;
}

export const About = memo(({ onReadBio }: AboutProps) => (
  <section id="about" className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full max-w-[92%] mx-auto">
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="order-2 md:order-1"
    >
      <span className="text-accent uppercase tracking-widest text-[10px] md:text-xs font-bold mb-4 flex items-center gap-2 font-ui">
        <PenTool size={14} /> The Editor
      </span>
      <h2 className="text-3xl md:text-6xl font-serif mb-5 md:mb-8 leading-tight">Capturing the rhythm of global wanderlust.</h2>
      <p className="text-text-dim leading-relaxed text-base md:text-lg mb-6">
        I’m Khilesh Sammal, a full-stack marketer working remotely and part-time traveler. Having worked for Cognizant and Google (2024–2025), I combine enterprise growth strategies with slow journeys and visual storytelling to explore places beyond the surface — from Himalayan trails to tropical islands.
      </p>
      <button 
        onClick={onReadBio}
        className="inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[10px] md:text-sm uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors cursor-pointer"
      >
        Read Full Bio <ArrowRight size={14} />
      </button>
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative order-1 md:order-2 overflow-hidden rounded-sm group"
    >
      <img 
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80" 
        className="shadow-2xl w-full h-auto group-hover:scale-105 transition-transform duration-1000" 
        alt="Khilesh Sammal, travel photographer, full-stack marketer, and editor of Lens & Latitude" 
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  </section>
));

About.displayName = "About";
