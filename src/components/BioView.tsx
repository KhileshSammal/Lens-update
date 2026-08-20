import React, { memo } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Camera, 
  Briefcase, 
  Map, 
  Compass, 
  ExternalLink, 
  Layers, 
  CheckCircle,
  Calendar,
  Sparkles,
  Award,
  Globe,
  Smartphone
} from "lucide-react";

interface BioViewProps {
  onBackToHome: () => void;
}

export const BioView = memo(({ onBackToHome }: BioViewProps) => {
  return (
    <div className="bg-bg text-white min-h-screen pt-24 pb-16 font-sans selection:bg-accent selection:text-black">
      {/* Container holding the layout */}
      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Back Action */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button 
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold font-ui text-zinc-400 hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </button>
        </motion.div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-zinc-900 group relative">
              <img 
                src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80" 
                alt="Khilesh Sammal, travel storyteller, photographer, and creator of Lens & Latitude" 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] uppercase tracking-widest text-accent font-bold font-ui">Khilesh Sammal</span>
                <p className="text-[11px] text-zinc-400 font-serif italic mt-0.5">Part-Time Traveler • Full-Stack Marketer</p>
              </div>
            </div>
            {/* Background design elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-accent/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-accent/20 -z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 flex flex-col justify-center text-left"
          >
            <span className="text-accent uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-3 flex items-center gap-2 font-ui">
              <Sparkles size={12} /> The Storyteller Behind Lens & Latitude
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight text-white mb-6">
              Hi, I’m Khilesh.
            </h1>
            
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg mb-4">
              I am a full-stack marketer working remotely, combining a data-driven, analytical mindset with a deep-seated passion for slow, intentional journeys and visual storytelling. Having worked for Cognizant and Google in 2024–2025, I apply enterprise-grade growth strategies and audience intelligence to digital platforms and travel narratives.
            </p>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base mb-6">
              My approach to travel isn't about collecting passport stamps or hitting rushed checkpoints. It’s about listening to the quiet, subtle rhythms of each destination—whether traversing ancient subterranean cave shrines in Kumaon, exploring the emerald coastlines of Thailand, or navigating local backwaters in Kerala.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a 
                href="mailto:khileshsammal.business@gmail.com"
                className="inline-flex items-center gap-2 bg-accent hover:bg-white text-black px-5 py-3 rounded-sm font-ui text-[10px] md:text-xs uppercase tracking-[0.2em] font-black transition-all"
              >
                Email Collaboration <ExternalLink size={12} />
              </a>
              <a 
                href="mailto:khileshsammal.business@gmail.com"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-accent px-5 py-3 rounded-sm font-ui text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white hover:text-accent transition-all"
              >
                khileshsammal.business@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Philosophy & Manifesto (Bento Layout) */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-zinc-950 border border-white/5 p-6 rounded-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <Compass className="text-accent" size={20} />
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-100 mb-2">Slow Travel Philosophy</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                I believe in moving deliberately. Spending weeks rather than days in one place allows me to absorb the true atmosphere, share local stories, and discover paths that aren't on standard tourist maps.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-zinc-950 border border-white/5 p-6 rounded-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <Camera className="text-accent" size={20} />
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-100 mb-2">Visual Journalism</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                Photography and video are more than just pretty scenery. They represent historical memory, light-play, and the authentic preservation of quiet landscapes, local cultures, and subterranean secrets.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-zinc-950 border border-white/5 p-6 rounded-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <Briefcase className="text-accent" size={20} />
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-100 mb-2">Technical Rigor</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                My full-stack marketing background gives me a unique perspective on platform algorithms, user design, data-driven optimization, and visual aesthetics—ensuring my content reaches and resonates.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Detailed Career Turning Point Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 pt-12 mb-16 text-left"
        >
          <div className="max-w-3xl">
            <span className="text-accent uppercase tracking-widest text-[9px] font-bold font-ui">The Evolution</span>
            <h2 className="text-2xl md:text-4xl font-serif font-medium text-white mt-1 mb-6">How I Unlocked Lens & Latitude</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
              My journey combines strategic marketing execution with global exploration. As a full-stack marketer working remotely, I leverage my experience working for Cognizant and Google (2024–2025) to scale digital brands while exploring destinations across the globe.
            </p>
          </div>

          <div className="relative border-l border-zinc-800 ml-4 md:ml-6 pl-6 md:pl-10 space-y-12">
            
            {/* Timeline Item 1 */}
            <div className="relative">
              <span className="absolute -left-[31px] md:-left-[47px] top-0.5 bg-zinc-950 border-2 border-accent w-4 h-4 rounded-full flex items-center justify-center" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                <span className="font-mono text-xs text-accent font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded">Present</span>
                <h3 className="text-lg font-serif text-zinc-200">Remote Full-Stack Marketer & Lens & Latitude</h3>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                Currently working remotely as a full-stack marketer while curating Lens & Latitude—an immersive travel platform featuring slow-travel blueprints, high-resolution photography, and field-tested guides.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              <span className="absolute -left-[31px] md:-left-[47px] top-0.5 bg-zinc-950 border-2 border-zinc-500 w-4 h-4 rounded-full flex items-center justify-center" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                <span className="font-mono text-xs text-zinc-400 font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded">2024 - 2025</span>
                <h3 className="text-lg font-serif text-zinc-200">Cognizant & Google</h3>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                Worked for Cognizant and Google, mastering enterprise-level digital delivery, advanced audience intelligence, search systems, and high-impact performance marketing frameworks.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              <span className="absolute -left-[31px] md:-left-[47px] top-0.5 bg-zinc-950 border-2 border-zinc-500 w-4 h-4 rounded-full flex items-center justify-center" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                <span className="font-mono text-xs text-zinc-400 font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded">2022 - 2024</span>
                <h3 className="text-lg font-serif text-zinc-200">Expedition Circuits Across Asia & India</h3>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                Slow exploration became a reality. I established long-form travel routes across Southeast Asia (Thailand, Malaysia, Vietnam) and regional Indian landmarks (Puri coastlines, Kumaon cave temples, and Kerala backwaters).
              </p>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative">
              <span className="absolute -left-[31px] md:-left-[47px] top-0.5 bg-zinc-950 border-2 border-zinc-500 w-4 h-4 rounded-full flex items-center justify-center" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                <span className="font-mono text-xs text-zinc-400 font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded">2021 - 2022</span>
                <h3 className="text-lg font-serif text-zinc-200">Full-Stack Growth & Performance Marketing</h3>
              </div>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                Built end-to-end full-stack marketing funnels, creative strategy, and multi-channel attribution systems that unlocked location flexibility for remote execution and global travel.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Tech Stack Section (from Image 1) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-16 mb-16 text-left"
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-4 border-b border-white/5">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight font-light">My Tech Stack</h2>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent/80 font-bold mt-1">Tools I Use to Move the Needle</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Technical Proficiency</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* PAID MEDIA */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent font-bold">Paid Media</span>
                <div className="h-[1px] bg-white/10 mt-1 mb-4" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">Google Ads</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">Search / PMax Optimization</p>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">Meta Ads</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">Scaling Creative Strategy</p>
                </div>
              </div>
            </div>

            {/* MEASUREMENT */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent font-bold">Measurement</span>
                <div className="h-[1px] bg-white/10 mt-1 mb-4" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">GA4 & GTM</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">Advanced Tracking Architecture</p>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">Tracocity</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">First-Party Attribution Audits</p>
                </div>
              </div>
            </div>

            {/* AI INTELLIGENCE */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent font-bold">AI Intelligence</span>
                <div className="h-[1px] bg-white/10 mt-1 mb-4" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">Google AI Studio</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">Custom LLM Workflows</p>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">Gemini & ChatGPT</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">Strategy & Copy Automation</p>
                </div>
              </div>
            </div>

            {/* OPERATIONS */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent font-bold">Operations</span>
                <div className="h-[1px] bg-white/10 mt-1 mb-4" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">Canva Pro</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">Direct Ad Creative Design</p>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white leading-tight">Python & SQL</h4>
                  <p className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase mt-1">Automation / Reporting Scripts</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Foundation Section (from Image 2) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-16 mb-16 text-left"
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5">
              <span className="text-accent uppercase tracking-widest text-[10px] font-bold font-ui">Foundation</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-white mt-2 mb-4 leading-tight">Learned from the Best.</h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-sm">
                My expertise isn't accidental. It was forged in high-stakes environments, absorbing the internal mechanics of the world's most sophisticated marketing ecosystems.
              </p>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
              <div className="bg-[#030303] p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Cognizant (2024–2025)</span>
                <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                  Enterprise-level digital delivery, audience scaling, and performance marketing execution.
                </p>
              </div>
              <div className="bg-[#030303] p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Google (2024–2025)</span>
                <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                  Deep mastery of Google's proprietary search algorithms, PMax architectures, and audience intelligence.
                </p>
              </div>
              <div className="bg-[#030303] p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Baweja Media</span>
                <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                  Cutting-edge performance scaling for disruptive digital brands.
                </p>
              </div>
              <div className="bg-[#030303] p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Global Standards</span>
                <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                  Trained at the industry's peak, I apply Google Ads and Meta Ads tactics used by top 1% practitioners.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Work Ethics & Approach Section (from Image 3) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-16 mb-16 text-left"
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-stretch">
            {/* Left side: How I Work */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-accent uppercase tracking-widest text-[10px] font-bold font-ui">How I Work</span>
                <h2 className="text-4xl md:text-5xl font-serif italic text-white mt-2 mb-8 leading-tight">Expertise Without the Ego.</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="text-accent/60 font-serif italic text-2xl font-bold leading-none">01</span>
                  <div>
                    <h4 className="text-sm uppercase font-mono tracking-wider text-white font-bold">Direct Collaboration</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                      You work with me, not an account manager. I'm deep in the accounts, ensuring every strategy is executed with personal accountability.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="text-accent/60 font-serif italic text-2xl font-bold leading-none">02</span>
                  <div>
                    <h4 className="text-sm uppercase font-mono tracking-wider text-white font-bold">Technical Rigor</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                      I don't just "run ads." I audit pixels, verify data layers, and ensure your tracking is resilient to privacy changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Why Me & Availability */}
            <div className="md:col-span-6 bg-zinc-950 border-2 border-accent/20 p-8 rounded-sm flex flex-col justify-between space-y-8 relative">
              {/* Highlight decorative left-accent border effect from image */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent" />
              
              <div className="pl-4">
                <h3 className="text-2xl font-serif text-white mb-4 leading-tight">Why me?</h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  Brands hire me when they are tired of "black box" reporting. I offer complete transparency, a customized tech stack, and a focus on <strong className="text-accent font-bold italic">Net Revenue</strong> rather than vanity metrics.
                </p>
              </div>

              <div className="pl-4 pt-6 border-t border-white/5 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">Availability</span>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-sans text-zinc-200 font-semibold">Taking selective projects for Q1 2026</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Travel Gear & Tech Kit Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/10 pt-12 mb-16 text-left"
        >
          <div className="max-w-3xl mb-8">
            <span className="text-accent uppercase tracking-widest text-[9px] font-bold font-ui">In My Backpack</span>
            <h2 className="text-2xl md:text-4xl font-serif font-medium text-white mt-1">The Expedition Gear Kit</h2>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mt-2">
              The tools I rely on to capture pristine, low-noise RAW photographs, sharp loop-able 10-15s travel films, and fluid GIFs under tricky natural lighting situations.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            
            <div className="bg-[#0c0c0c] border border-white/5 p-5 rounded-sm">
              <Smartphone className="text-accent mb-3" size={24} />
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-bold mb-1">iPhone 17 Pro Max</h4>
              <p className="text-zinc-500 text-[11px] leading-normal font-sans">
                Our primary high-fidelity mobile cinema shooter, recording gorgeous 4K ProRes cinematic loops with state-of-the-art optical sensor stabilization.
              </p>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 p-5 rounded-sm">
              <Smartphone className="text-accent mb-3" size={24} />
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-bold mb-1">iPhone 16</h4>
              <p className="text-zinc-500 text-[11px] leading-normal font-sans">
                Our secondary capture and back-up device, configured with intervalometers to record pristine time-lapses and hyperlapses during dynamic transits.
              </p>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 p-5 rounded-sm">
              <Compass className="text-accent mb-3" size={24} />
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-bold mb-1">Mobile CPL & ND Filters</h4>
              <p className="text-zinc-500 text-[11px] leading-normal font-sans">
                Essential clip-on magnetic filters for controlling lighting, reducing coastal water glares, and capturing smooth daytime ocean waves.
              </p>
            </div>

          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-zinc-950 via-[#0d0d0d] to-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-sm text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-3xl font-serif text-white mb-4">Let's create something together.</h3>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
              Whether you want to license a custom print, inquire about an itinerary route, or discuss high-converting performance marketing strategies for a travel brand—my inbox is always open.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="mailto:khileshsammal.business@gmail.com"
                className="bg-accent hover:bg-white text-black px-6 py-3 rounded-sm font-ui text-[10px] uppercase tracking-widest font-black transition-all"
              >
                Start Conversation
              </a>
              <button 
                onClick={onBackToHome}
                className="border border-white/10 hover:border-accent text-white hover:text-accent px-6 py-3 rounded-sm font-ui text-[10px] uppercase tracking-widest font-bold transition-all"
              >
                Back to Explorer
              </button>
            </div>
          </div>
          
          {/* Subtle aesthetic backdrop light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />
        </motion.div>

      </div>
    </div>
  );
});

BioView.displayName = "BioView";
