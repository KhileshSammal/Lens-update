import { memo } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Globe } from "lucide-react";
import { CONTACT_SOCIALS } from "../constants";
import { NewsletterForm } from "./NewsletterForm";
import { AppView } from "../utils/routerSeo";

interface ContactSectionProps {
  onNavigate?: (view: AppView, targetHash?: string) => void;
}

export const ContactSection = memo(({ onNavigate }: ContactSectionProps) => (
  <section id="contact" className="bg-bg py-16 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-border-main">
    <div className="w-full max-w-[92%] mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <span className="text-accent uppercase tracking-widest text-[10px] font-bold mb-4 block font-ui">Let's Connect</span>
          <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-5 md:mb-8">Follow the <br /><span className="italic text-text-dim">Expedition.</span></h2>
          <p className="text-text-dim text-base md:text-lg font-serif italic max-w-sm">The journey is the lens through which we find ourselves.</p>
        </motion.div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {CONTACT_SOCIALS.map((social, idx) => (
            <motion.a 
              key={social.name}
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-card-bg border border-border-main p-8 md:p-10 flex flex-col justify-between aspect-square group rounded-sm hover:border-accent transition-all duration-500"
            >
              <div className="flex justify-between items-start">
                <social.icon size={32} className="text-accent" />
                <ArrowUpRight className="text-text-dim/60 group-hover:text-accent transition-colors" size={20} />
              </div>
              <div className="mt-8">
                <p className="font-ui text-[9px] uppercase tracking-widest text-text-dim mb-2 font-bold">{social.name}</p>
                <h3 className="font-serif text-xl md:text-3xl transition-all leading-tight">{social.handle}</h3>
                <div className="h-1 w-0 group-hover:w-full bg-accent mt-4 transition-all duration-500"></div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* THREE FOOTER COLUMNS SECTION */}
      <div className="mt-16 md:mt-24 pt-12 border-t border-border-main/50 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        {/* GROUP 1: ABOUT LENS & LATITUDE */}
        <div className="space-y-4">
          <h4 className="text-accent uppercase tracking-widest text-[10px] md:text-xs font-bold font-ui">About Lens & Latitude</h4>
          <p className="text-text-dim text-sm font-serif leading-relaxed">
            Real journeys, honest travel experiences, and visual stories from places I've personally explored. Documented through my lens, one destination at a time.
          </p>
        </div>

        {/* GROUP 2: EXPLORE */}
        <div className="space-y-4">
          <h4 className="text-accent uppercase tracking-widest text-[10px] md:text-xs font-bold font-ui">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a 
                href="#directory" 
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("home", "#directory");
                  }
                }}
                className="text-text-dim hover:text-accent font-sans transition-colors cursor-pointer"
              >
                Destinations
              </a>
            </li>
            <li>
              <a 
                href="#blog" 
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("blog-archive");
                  }
                }}
                className="text-text-dim hover:text-accent font-sans transition-colors cursor-pointer"
              >
                Travel Journal
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("home", "#gallery");
                  }
                }}
                className="text-text-dim hover:text-accent font-sans transition-colors cursor-pointer"
              >
                Travel Photography
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("home", "#about");
                  }
                }}
                className="text-text-dim hover:text-accent font-sans transition-colors cursor-pointer"
              >
                About Me
              </a>
            </li>
          </ul>
        </div>

        {/* GROUP 3: JOIN THE JOURNEY */}
        <div className="space-y-4">
          <h4 className="text-accent uppercase tracking-widest text-[10px] md:text-xs font-bold font-ui">Join the Journey</h4>
          <p className="text-text-dim text-sm font-serif leading-relaxed">
            Get new travel stories, destination guides, and photography updates straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* QUICK CONTACT ACTIONS BAR */}
      <div className="mt-16 pt-8 border-t border-border-main flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] text-accent font-bold font-ui flex items-center gap-3">
          <Globe size={20} /> Lens & Latitude — 2026
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="mailto:khileshsammal.business@gmail.com" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors text-text-main">
            Email Me
          </a>
          <a href="mailto:khileshsammal.business@gmail.com" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors text-text-main">
            Collaborations
          </a>
        </div>
      </div>
    </div>
  </section>
));

ContactSection.displayName = "ContactSection";
