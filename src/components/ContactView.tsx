import React, { useState, useId, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Send, 
  MapPin, 
  Instagram, 
  Youtube, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Sparkles, 
  Compass, 
  Camera, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Check, 
  Star, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Plane,
  HeartHandshake
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ContactViewProps {
  onBackToHome?: () => void;
  onNavigate?: (view: any, hash?: string) => void;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  tag: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Neha Verma",
    location: "Bangalore, India",
    role: "Solo Traveler & Photographer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Khilesh's Thailand & Phuket itinerary saved me countless hours of stress. The hidden scooter routes, sunset viewpoint coordinates, and exact local taxi tips made my solo trip completely seamless. Truly unmatched field intelligence!",
    tag: "Thailand Blueprint",
    date: "January 2026"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    location: "London, UK",
    role: "Adventure Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "Lens & Latitude turned our spontaneous getaway dreams into reality. From breathtaking secret photo spots in northern Vietnam to unexpected culinary stops in Penang, every single recommendation delivered impeccably.",
    tag: "Custom Vietnam & Malaysia Route",
    date: "February 2026"
  },
  {
    id: 3,
    name: "Neil and Pooja Mehta",
    location: "Mumbai, India",
    role: "Couple Travel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    quote: "The 1-on-1 consultation and Kerala backwaters guide gave us the calmest, most romantic holiday we've ever had. Khilesh knows the exact right time of day to visit without crowds. 10/10 recommended!",
    tag: "Kerala Backwaters & Munnar",
    date: "December 2025"
  }
];

export const ContactView = memo(({ onBackToHome, onNavigate }: ContactViewProps) => {
  const { theme } = useTheme();
  const formId = useId();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "Thailand (Phuket & SE Asia)",
    travelers: "2 Persons",
    travelWindow: "Next 1-3 Months",
    inquiryType: "Custom Itinerary Blueprint",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Quick Inquire Bar State
  const [quickDest, setQuickDest] = useState("Phuket, Thailand");
  const [quickDate, setQuickDate] = useState("Upcoming 2026");
  const [quickPeople, setQuickPeople] = useState("2 Travelers");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleQuickInquire = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      destination: quickDest,
      travelWindow: quickDate,
      travelers: quickPeople,
      message: `Hi Khilesh, I would like to plan an expedition to ${quickDest} for ${quickPeople} during ${quickDate}. Please share the tailored blueprint options.`
    }));
    
    // Scroll down smoothly to the contact form
    const formElement = document.getElementById("contact-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="min-h-screen bg-bg text-text-main pt-24 pb-20 transition-colors duration-300">
      {/* 1. TOP HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-[92%] mx-auto mb-16 md:mb-24">
        {/* Background Atmospheric Card */}
        <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-border-main bg-card-bg shadow-2xl p-6 sm:p-10 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-amber-500/[0.02] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Top Eyebrow Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-ui font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6"
            >
              <Sparkles size={13} className="text-accent" />
              <span>Direct Studio & Expedition Inquiries</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1] mb-6"
            >
              Inspiring Explorations & <br />
              <span className="italic text-accent">Endless Possibilities.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-dim text-base sm:text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Discover a world of seamless, field-tested travel experiences with Lens & Latitude. 
              Let's turn your wanderlust and photography goals into unforgettable journeys.
            </motion.p>

            {/* Interactive Quick Trip Planner Bar */}
            <motion.form 
              onSubmit={handleQuickInquire}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card-bg/90 backdrop-blur-xl border border-border-main p-3 sm:p-4 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-3 md:gap-2 max-w-3xl mx-auto"
            >
              {/* Destination Dropdown */}
              <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-2.5 bg-bg/60 rounded-xl md:rounded-full border border-border-main/50 text-left">
                <MapPin size={16} className="text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor={`${formId}-quick-dest`} className="block text-[9px] uppercase tracking-wider text-text-dim font-bold font-ui">
                    Destination
                  </label>
                  <select 
                    id={`${formId}-quick-dest`}
                    value={quickDest}
                    onChange={(e) => setQuickDest(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-text-main focus:outline-none cursor-pointer"
                  >
                    <option value="Phuket, Thailand" className="bg-zinc-900 text-white">Phuket, Thailand</option>
                    <option value="Kuala Lumpur & Penang, Malaysia" className="bg-zinc-900 text-white">Kuala Lumpur & Penang</option>
                    <option value="Ha Long & Hanoi, Vietnam" className="bg-zinc-900 text-white">Ha Long & Hanoi, Vietnam</option>
                    <option value="Kerala Backwaters & Munnar" className="bg-zinc-900 text-white">Kerala Backwaters</option>
                    <option value="Rishikesh Yoga & Rafting" className="bg-zinc-900 text-white">Rishikesh, Uttarakhand</option>
                    <option value="Amritsar Golden Temple" className="bg-zinc-900 text-white">Amritsar Grace</option>
                    <option value="Custom Expedition Route" className="bg-zinc-900 text-white">Custom Global Route</option>
                  </select>
                </div>
              </div>

              {/* Travel Window */}
              <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-2.5 bg-bg/60 rounded-xl md:rounded-full border border-border-main/50 text-left">
                <Calendar size={16} className="text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor={`${formId}-quick-date`} className="block text-[9px] uppercase tracking-wider text-text-dim font-bold font-ui">
                    Dates
                  </label>
                  <select 
                    id={`${formId}-quick-date`}
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-text-main focus:outline-none cursor-pointer"
                  >
                    <option value="Next 30 Days" className="bg-zinc-900 text-white">Next 30 Days</option>
                    <option value="Upcoming 2026" className="bg-zinc-900 text-white">Mid/Late 2026</option>
                    <option value="Winter 2026/2027" className="bg-zinc-900 text-white">Winter 2026/2027</option>
                    <option value="Flexible Schedule" className="bg-zinc-900 text-white">Flexible Dates</option>
                  </select>
                </div>
              </div>

              {/* Group Size */}
              <div className="w-full md:w-1/4 flex items-center gap-3 px-4 py-2.5 bg-bg/60 rounded-xl md:rounded-full border border-border-main/50 text-left">
                <Users size={16} className="text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor={`${formId}-quick-people`} className="block text-[9px] uppercase tracking-wider text-text-dim font-bold font-ui">
                    Travelers
                  </label>
                  <select 
                    id={`${formId}-quick-people`}
                    value={quickPeople}
                    onChange={(e) => setQuickPeople(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-text-main focus:outline-none cursor-pointer"
                  >
                    <option value="Solo Traveler" className="bg-zinc-900 text-white">Solo (1 Person)</option>
                    <option value="2 Travelers (Couple/Duo)" className="bg-zinc-900 text-white">2 Travelers</option>
                    <option value="Small Group (3-5)" className="bg-zinc-900 text-white">Group (3-5)</option>
                    <option value="Commercial / Creator Team" className="bg-zinc-900 text-white">Creator Team</option>
                  </select>
                </div>
              </div>

              {/* CTA Submit Button */}
              <button 
                type="submit"
                id="contact-quick-plan-btn"
                className="w-full md:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black font-ui font-black text-xs uppercase tracking-[0.16em] rounded-xl md:rounded-full transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Plan Trip</span>
                <ArrowRight size={14} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* 2. WHY LENS & LATITUDE? (TICKET CARDS SECTION) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[92%] mx-auto mb-20 md:mb-32">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-accent uppercase tracking-widest text-[10px] font-bold font-ui block">
              Core Expedition Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.15]">
              Why Plan With <br />
              <span className="italic text-accent relative inline-block">
                Lens & Latitude?
                <span className="absolute left-0 bottom-0 w-full h-1 bg-amber-400/40 rounded-full" />
              </span>
            </h2>
            <p className="text-text-dim text-base sm:text-lg font-sans leading-relaxed">
              At Lens & Latitude, we believe in making travel seamless, deeply honest, and visually enriching. 
              Our unique approach to personal route scouting ensures that you have a stress-free journey from start to finish.
            </p>
            
            <div className="pt-2">
              <a 
                href="#contact-form-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-ui font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow-md cursor-pointer"
              >
                <span>Start Your Inquiry</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Numbered Feature Tickets (As seen in Reference Screenshot 1) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Card 01 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card-bg border border-border-main rounded-2xl p-5 sm:p-7 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 hover:border-accent/40 transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-accent font-serif text-3xl sm:text-4xl font-bold shrink-0">
                01
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-2">
                  Seamless Spontaneity
                </h3>
                <p className="text-sm text-text-dim font-sans leading-relaxed">
                  Experience the freedom of planning an adventure at a moment's notice. Lens & Latitude specializes in crafting hassle-free getaways that allow you to embrace spontaneous discovery without logistics friction.
                </p>
              </div>
            </motion.div>

            {/* Card 02 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card-bg border border-border-main rounded-2xl p-5 sm:p-7 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 hover:border-accent/40 transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-accent font-serif text-3xl sm:text-4xl font-bold shrink-0">
                02
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-2">
                  Curated Excellence
                </h3>
                <p className="text-sm text-text-dim font-sans leading-relaxed">
                  Every single aspect of your itinerary is personally vetted and road-tested. From handpicked boutique accommodations to secret golden hour vantage points, every detail is engineered for your comfort.
                </p>
              </div>
            </motion.div>

            {/* Card 03 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card-bg border border-border-main rounded-2xl p-5 sm:p-7 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 hover:border-accent/40 transition-all"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-accent font-serif text-3xl sm:text-4xl font-bold shrink-0">
                03
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-2">
                  Diverse Destinations
                </h3>
                <p className="text-sm text-text-dim font-sans leading-relaxed">
                  Explore a rich spectrum of Asian and Indian territories. Whether you yearn for tropical paradise in Phuket, serene Himalayan trails in Uttarakhand, or cultural immersion in Amritsar, there is a tailored roadmap for you.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EXPEDITION & CONSULTATION PACKAGES (3-TIER PRICING CARDS - MATCHING REFERENCE SCREENSHOT 3 & 4) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[92%] mx-auto mb-20 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-accent uppercase tracking-widest text-[10px] font-bold font-ui block mb-3">
            Tailored Blueprint Options
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight mb-4">
            Discover Your Perfect <span className="italic text-accent">Journey</span>
          </h2>
          <p className="text-text-dim text-sm sm:text-base font-sans max-w-xl mx-auto">
            From thrilling outdoor expeditions to peaceful cultural escapades, choose the curation level that fits your travel style.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Tier 1: Adventure Explorer */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card-bg border border-border-main rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-accent/40 transition-all text-left"
          >
            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-1">
                  Adventure Explorer
                </h3>
                <p className="text-xs text-accent font-ui font-bold uppercase tracking-wider">
                  Thrill Seeker's Delight
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-border-main">
                <span className="text-sm font-bold text-text-dim">₹</span>
                <span className="text-4xl sm:text-5xl font-serif font-bold text-text-main">2,499</span>
                <span className="text-xs text-text-dim font-sans ml-1">/ route</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-text-dim font-sans">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>Day-by-Day Hour-by-Hour Timeline</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>Offline GPS Map Pins & Secret Routes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>Verified Transport & Scooter Guidelines</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>Budget Breakdown & Scams to Avoid</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contact-form-section"
              onClick={() => setFormData(prev => ({ ...prev, inquiryType: "Adventure Explorer Blueprint (₹2,499)" }))}
              className="w-full py-3.5 rounded-xl border border-border-main hover:border-accent bg-bg/80 text-text-main hover:text-accent text-center font-ui font-bold text-xs uppercase tracking-widest transition-all cursor-pointer block"
            >
              Request Explorer Plan
            </a>
          </motion.div>

          {/* Tier 2: Cultural & Visual Discovery (Featured Highlighted Dark Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-zinc-950 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative text-left always-dark transform md:-translate-y-3"
          >
            {/* Top Highlight Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black font-ui font-black text-[10px] uppercase tracking-widest shadow-md">
              Most Coveted
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                  Cultural & Visual Discovery
                </h3>
                <p className="text-xs text-amber-400 font-ui font-bold uppercase tracking-wider">
                  Full Curated Odyssey
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10">
                <span className="text-sm font-bold text-zinc-400">₹</span>
                <span className="text-4xl sm:text-5xl font-serif font-bold text-white">4,999</span>
                <span className="text-xs text-zinc-400 font-sans ml-1">/ route</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-zinc-300 font-sans">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-amber-400 shrink-0" />
                  <span>Custom Day-by-Day Turnkey Itinerary</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-amber-400 shrink-0" />
                  <span>Golden Hour Photography Coordinates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-amber-400 shrink-0" />
                  <span>Curated Local Culinary & Cafe Map</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-amber-400 shrink-0" />
                  <span>Handpicked Boutique Stay Recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-amber-400 shrink-0" />
                  <span>Direct WhatsApp Assistance During Trip</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contact-form-section"
              onClick={() => setFormData(prev => ({ ...prev, inquiryType: "Cultural & Visual Discovery (₹4,999)" }))}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black text-center font-ui font-black text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105 cursor-pointer block"
            >
              Start Your Custom Journey
            </a>
          </motion.div>

          {/* Tier 3: Creator Mentorship & Commercial */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card-bg border border-border-main rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-accent/40 transition-all text-left"
          >
            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-main mb-1">
                  Creator & Brand Collab
                </h3>
                <p className="text-xs text-accent font-ui font-bold uppercase tracking-wider">
                  Tranquil & Bespoke Partnership
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-border-main">
                <span className="text-sm font-bold text-text-dim">₹</span>
                <span className="text-4xl sm:text-5xl font-serif font-bold text-text-main">9,999</span>
                <span className="text-xs text-text-dim font-sans ml-1">/ project</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-text-dim font-sans">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>1-on-1 60-Minute Virtual Strategy Call</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>Commercial Photo & Video Licensing</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>Brand Sponsorship & Media Kit Access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>Dedicated Content Production Roadmap</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contact-form-section"
              onClick={() => setFormData(prev => ({ ...prev, inquiryType: "Creator & Brand Collab (₹9,999)" }))}
              className="w-full py-3.5 rounded-xl border border-border-main hover:border-accent bg-bg/80 text-text-main hover:text-accent text-center font-ui font-bold text-xs uppercase tracking-widest transition-all cursor-pointer block"
            >
              Book Consultation
            </a>
          </motion.div>
        </div>
      </section>

      {/* 4. STORIES OF EXPLORERS / TESTIMONIALS (MATCHING REFERENCE SCREENSHOT 5) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[92%] mx-auto mb-20 md:mb-32">
        <div className="bg-card-bg border border-border-main rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent uppercase tracking-widest text-[10px] font-bold font-ui block mb-2">
              Verified Traveler Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight mb-3">
              Stories of <span className="italic text-accent">Explorers</span>
            </h2>
            <p className="text-text-dim text-sm font-sans">
              Don't just take our word for it. Hear directly from travelers and photographers who have embarked on our curated routes.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-bg/70 border border-border-main rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left relative"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-text-main">{testimonial.name}</h4>
                      <p className="text-[11px] text-text-dim font-sans">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-text-main/90 font-sans leading-relaxed italic mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-border-main/50 flex items-center justify-between text-[10px] text-text-dim font-ui uppercase tracking-wider">
                  <span className="text-accent font-bold">{testimonial.tag}</span>
                  <span>{testimonial.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CONTACT & INQUIRY FORM SECTION */}
      <section id="contact-form-section" className="px-4 sm:px-6 lg:px-8 max-w-[92%] mx-auto mb-16">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Left Column: Direct Studio Contact & Socials */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-accent uppercase tracking-widest text-[10px] font-bold font-ui block mb-3">
                Let's Connect
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight mb-4">
                Have a Trip in Mind? <br />
                <span className="italic text-accent">Let's Talk.</span>
              </h2>
              <p className="text-text-dim text-sm sm:text-base font-sans leading-relaxed">
                Whether you're inquiring about custom route planning, commercial photography campaigns, preset licensing, or simply want travel advice — drop a note below.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3.5">
              <a 
                href="mailto:khileshsammal.business@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card-bg border border-border-main hover:border-accent transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-dim font-bold font-ui block">
                    Direct Email
                  </span>
                  <span className="text-sm font-semibold text-text-main group-hover:text-accent transition-colors">
                    khileshsammal.business@gmail.com
                  </span>
                </div>
              </a>

              <a 
                href="https://www.instagram.com/mr.khilesh__" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card-bg border border-border-main hover:border-accent transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Instagram size={18} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-dim font-bold font-ui block">
                    Instagram DMs
                  </span>
                  <span className="text-sm font-semibold text-text-main group-hover:text-accent transition-colors">
                    @mr.khilesh__
                  </span>
                </div>
              </a>

              <a 
                href="https://www.youtube.com/c/KhileshSammalVlogs2125" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card-bg border border-border-main hover:border-accent transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Youtube size={18} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-dim font-bold font-ui block">
                    YouTube Channel
                  </span>
                  <span className="text-sm font-semibold text-text-main group-hover:text-accent transition-colors">
                    Khilesh Sammal Vlogs
                  </span>
                </div>
              </a>
            </div>

            {/* Response Guarantee Badge */}
            <div className="p-4 rounded-2xl bg-bg border border-border-main/80 flex items-center gap-3">
              <Clock size={16} className="text-accent shrink-0" />
              <p className="text-xs text-text-dim font-sans">
                <strong className="text-text-main">24–48 Hour Response Time</strong> on all bespoke itinerary and commercial requests.
              </p>
            </div>
          </div>

          {/* Right Column: The Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-card-bg border border-border-main rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-left">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-text-main">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-text-dim font-sans max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-text-main">{formData.name}</strong>. Khilesh has received your inquiry regarding <strong className="text-accent">{formData.destination}</strong> and will follow up with your custom blueprint shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        destination: "Thailand (Phuket & SE Asia)",
                        travelers: "2 Persons",
                        travelWindow: "Next 1-3 Months",
                        inquiryType: "Custom Itinerary Blueprint",
                        message: ""
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-accent text-black font-ui font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-serif font-bold text-text-main mb-2">
                    Send a Message or Booking Request
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-[10px] uppercase tracking-widest text-text-dim font-bold font-ui mb-1.5">
                        Your Full Name *
                      </label>
                      <input 
                        id={`${formId}-name`}
                        type="text"
                        required
                        placeholder="e.g. Khilesh Sammal"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-bg border border-border-main rounded-xl text-text-main text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-email`} className="block text-[10px] uppercase tracking-widest text-text-dim font-bold font-ui mb-1.5">
                        Email Address *
                      </label>
                      <input 
                        id={`${formId}-email`}
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-bg border border-border-main rounded-xl text-text-main text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-dest-select`} className="block text-[10px] uppercase tracking-widest text-text-dim font-bold font-ui mb-1.5">
                        Destination Interest
                      </label>
                      <select 
                        id={`${formId}-dest-select`}
                        value={formData.destination}
                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                        className="w-full px-4 py-3 bg-bg border border-border-main rounded-xl text-text-main text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                      >
                        <option value="Thailand (Phuket & SE Asia)">Thailand (Phuket & SE Asia)</option>
                        <option value="Malaysia (Kuala Lumpur & Penang)">Malaysia (Kuala Lumpur & Penang)</option>
                        <option value="Vietnam (Ha Long, Hanoi & Ninh Binh)">Vietnam (Ha Long, Hanoi & Ninh Binh)</option>
                        <option value="Kerala Backwaters & Munnar">Kerala Backwaters & Munnar</option>
                        <option value="Rishikesh Yoga & Rafting">Rishikesh Yoga & Rafting</option>
                        <option value="Amritsar Golden Temple">Amritsar Golden Temple</option>
                        <option value="Patal Bhuvaneshwar Cave">Patal Bhuvaneshwar Cave</option>
                        <option value="Goa & Puri Coastal Trail">Goa & Puri Coastal Trail</option>
                        <option value="Custom Global Expedition">Custom Global Expedition</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-inquiry-type`} className="block text-[10px] uppercase tracking-widest text-text-dim font-bold font-ui mb-1.5">
                        Inquiry / Service Level
                      </label>
                      <select 
                        id={`${formId}-inquiry-type`}
                        value={formData.inquiryType}
                        onChange={(e) => setFormData(prev => ({ ...prev, inquiryType: e.target.value }))}
                        className="w-full px-4 py-3 bg-bg border border-border-main rounded-xl text-text-main text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                      >
                        <option value="Custom Itinerary Blueprint">Custom Itinerary Blueprint (₹2,499)</option>
                        <option value="Cultural & Visual Discovery">Cultural & Visual Discovery (₹4,999)</option>
                        <option value="Creator & Brand Collab">Creator & Brand Collab (₹9,999)</option>
                        <option value="Lightroom Presets Support">Lightroom Presets Support</option>
                        <option value="General Question / Hello">General Question / Hello</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-message`} className="block text-[10px] uppercase tracking-widest text-text-dim font-bold font-ui mb-1.5">
                      Your Message & Trip Details *
                    </label>
                    <textarea 
                      id={`${formId}-message`}
                      required
                      rows={4}
                      placeholder="Tell us about your expected travel dates, group size, photography interests, or specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-bg border border-border-main rounded-xl text-text-main text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-black font-ui font-black text-xs uppercase tracking-[0.18em] transition-all shadow-xl hover:shadow-amber-400/20 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Travel Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

ContactView.displayName = "ContactView";
