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
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div>
            <span className="text-accent uppercase tracking-widest text-[10px] font-bold mb-4 block font-ui">Let's Connect</span>
            <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-5 md:mb-8">Follow the <br /><span className="italic text-text-dim">Expedition.</span></h2>
            <p className="text-text-dim text-base md:text-lg font-serif italic max-w-sm mb-6">The journey is the lens through which we find ourselves.</p>
          </div>

          <div className="mt-4 p-5 rounded border border-border-main bg-card-bg/60 backdrop-blur-sm max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-text-dim">Field Expedition Dispatches</span>
            </div>
            <p className="text-xs text-text-dim font-sans leading-relaxed mb-3">
              Real-time behind-the-lens moments, raw photography reels, 4K documentary films, and uncurated mountain journeys across India and Southeast Asia.
            </p>
            <a 
              href="mailto:khileshsammal.business@gmail.com" 
              className="text-[11px] font-ui font-bold uppercase tracking-wider text-accent hover:underline inline-flex items-center gap-1.5"
            >
              Collaborations & Licensing Inquiries <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
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
              className="bg-card-bg border border-border-main p-6 sm:p-7 flex flex-col justify-between group rounded hover:border-accent hover:shadow-xl hover:shadow-black/5 transition-all duration-500 overflow-hidden relative"
            >
              <div>
                {/* Header Row: Icon, Channel Badge, and Arrow */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                      <social.icon size={22} className="text-accent" />
                    </div>
                    <div>
                      <span className="font-ui text-[9px] uppercase tracking-widest text-text-dim block font-bold">{social.name}</span>
                      <span className="text-[10px] font-mono font-bold text-accent">{social.badge}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-border-main/40 flex items-center justify-center text-text-dim group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Photography / Video Visual Preview */}
                <div className="relative h-36 rounded overflow-hidden mb-5 border border-border-main/60 bg-black/40">
                  <img 
                    src={social.previewImg} 
                    alt={`${social.name} visual preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[10px] font-ui uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {social.subtitle}
                    </span>
                  </div>
                </div>

                {/* Channel Title & Handle */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-accent transition-colors leading-tight mb-2">
                  {social.handle}
                </h3>
                
                {/* Channel Description */}
                <p className="text-text-dim text-xs font-sans leading-relaxed mb-4">
                  {social.description}
                </p>

                {/* Topic Hashtags / Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {social.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-text-dim bg-border-main/30 px-2 py-0.5 rounded border border-border-main/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button & Bottom Progress Accent */}
              <div>
                <div className="pt-3 border-t border-border-main/50 flex items-center justify-between text-xs font-ui uppercase tracking-wider font-bold text-accent transition-colors">
                  <span>{social.cta}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="h-[2px] w-0 group-hover:w-full bg-accent mt-3 transition-all duration-500" />
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
