import { 
  Instagram, 
  Youtube, 
  Camera, 
  PenTool, 
  ArrowRight, 
  Compass, 
  Calendar, 
  Eye, 
  Tag, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  ChevronDown, 
  ArrowUpRight, 
  Globe,
  Menu,
  ShoppingCart,
  ShoppingBag,
  Search,
  Sun,
  Moon
} from "lucide-react";
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  NAV_ITEMS, 
  SOCIAL_LINKS, 
  TRIPS, 
  BLOG_POSTS, 
  SHOP_ITEMS, 
  FAQS, 
  CONTACT_SOCIALS 
} from "./constants";
import ExpeditionHub from "./components/ExpeditionHub";
import { BlogArchive } from "./components/BlogArchive";
import { DETAILED_BLOG_POSTS } from "./blogData";
import { X as CloseIcon } from "lucide-react"; // Import clear overlay close icon
import { CheckoutView } from "./components/CheckoutView";
import { ShopView } from "./components/ShopView";
import { ThailandDiariesView } from "./components/ThailandDiariesView";
import { MalaysiaExpeditionView } from "./components/MalaysiaExpeditionView";
import { AmritsarExpeditionView } from "./components/AmritsarExpeditionView";
import { KeralaExpeditionView } from "./components/KeralaExpeditionView";
import { PatalBhuvaneshwarExpeditionView } from "./components/PatalBhuvaneshwarExpeditionView";
import { RishikeshExpeditionView } from "./components/RishikeshExpeditionView";
import { GoaExpeditionView } from "./components/GoaExpeditionView";
import { PortfolioGallery } from "./components/PortfolioGallery";
import { BioView } from "./components/BioView";
import { Analytics } from "@vercel/analytics/react";

// --- Optimized Components ---

interface BlogDropdownItemProps {
  key?: any;
  item: any;
  currentView: "home" | "blog-archive";
  handleLinkClick: (e: React.MouseEvent, item: any) => void;
  onSelectPost?: (postId: string | null) => void;
}

/**
 * BlogDropdownItem Component:
 * Renders an advanced custom navigation block for the Blog nav option.
 * On mouseEnter, it reveals a responsive drop-down list of travel tips, gear reviews,
 * and regional expeditions. Employs a non-transient spacing bridge to allow smooth cursor transits.
 */
const BlogDropdownItem = ({ item, currentView, handleLinkClick, onSelectPost }: BlogDropdownItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group py-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a 
        href={item.href} 
        onClick={(e) => handleLinkClick(e, item)}
        className={`relative flex items-center gap-1.5 font-bold transition-colors ${
          currentView === "blog-archive" ? "text-accent" : "text-white hover:text-accent"
        }`}
      >
        <item.icon size={13} className="text-accent" /> 
        {item.name}
        <ChevronDown size={11} className={`text-accent/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${
          currentView === "blog-archive" ? "w-full" : "w-0 group-hover:w-full"
        }`} />
      </a>

      {/* Invisible bridge to prevent pointer mouseLeave triggers when hovering slightly off the element */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[110%] h-4 bg-transparent z-10" />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-zinc-950/98 backdrop-blur-md rounded-sm border border-white/10 shadow-2xl z-50 py-4 flex flex-col overflow-hidden"
          >
            <div className="px-5 pb-3 border-b border-white/5 flex items-center justify-between text-[9px] text-zinc-500 font-bold font-ui uppercase tracking-widest">
              <span>EXPLORE THE JOURNAL</span>
              <PenTool size={11} className="text-accent/60" />
            </div>

            <div className="max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col py-1">
              {DETAILED_BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setIsOpen(false);
                    if (onSelectPost) {
                      onSelectPost(post.id);
                    }
                  }}
                  className="px-5 py-2.5 hover:bg-white/5 transition-all text-left cursor-pointer group/item flex flex-col gap-1 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex gap-2 items-center text-[9px] uppercase tracking-wider text-accent font-bold font-ui">
                    <span>{post.tag}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                    <span className="text-zinc-500 font-medium normal-case flex items-center gap-1">
                      <Clock size={10} /> {post.read}
                    </span>
                  </div>
                  <h4 className="text-[11px] leading-relaxed text-zinc-100 font-serif group-hover/item:text-accent font-medium transition-colors">
                    {post.title}
                  </h4>
                </div>
              ))}
            </div>

            <div className="px-5 pt-3 border-t border-white/5 mt-1">
              <button 
                onClick={(e) => {
                  setIsOpen(false);
                  handleLinkClick(e, item);
                }}
                className="w-full text-center py-2 text-[9px] uppercase tracking-[0.2em] font-ui font-black text-accent bg-white/5 hover:bg-accent hover:text-black border border-accent/20 transition-all rounded-sm"
              >
                View Archive List
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type AppView = "home" | "blog-archive" | "checkout" | "shop" | "thailand-diaries" | "malaysia-expedition" | "amritsar-expedition" | "kerala-expedition" | "patal-bhuvaneshwar-expedition" | "rishikesh-expedition" | "goa-expedition" | "bio";

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView, targetHash?: string) => void;
  onSelectPost?: (postId: string | null) => void;
  totalCartItems?: number;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

/**
 * Header Component:
 * Global responsive sticky header. Implements passive scroll-event tracking to dynamically
 * layer translucent backdrop textures once scrolled past 50px of physical Y space.
 */
const Header = memo(({ currentView, onNavigate, onSelectPost, totalCartItems = 0, theme, toggleTheme }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return TRIPS.filter(trip => 
      trip.title.toLowerCase().includes(query) || 
      (trip.subtitle && trip.subtitle.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const filteredShopItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return SHOP_ITEMS.filter(item => 
      item.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const navigateToTrip = (id: number) => {
    setIsMobileMenuOpen(false);
    setSearchQuery("");
    if (id === 1) onNavigate("thailand-diaries");
    else if (id === 2) onNavigate("malaysia-expedition");
    else if (id === 3) onNavigate("amritsar-expedition");
    else if (id === 4) onNavigate("kerala-expedition");
    else if (id === 5) onNavigate("patal-bhuvaneshwar-expedition");
    else if (id === 6) onNavigate("rishikesh-expedition");
    else if (id === 7) onNavigate("goa-expedition");
    else onNavigate("home");
  };

  const navigateToShopItem = () => {
    setIsMobileMenuOpen(false);
    setSearchQuery("");
    onNavigate("shop");
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, item: typeof NAV_ITEMS[0]) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (item.name === "Blog") {
      onNavigate("blog-archive");
    } else if (item.name === "Shop") {
      onNavigate("shop");
    } else {
      onNavigate("home", item.href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate("home");
  };

  const isLightHeader = isScrolled && theme === "light";
  const headerTextColor = isLightHeader ? "text-zinc-900" : "text-white";
  const headerBorderColor = isLightHeader ? "bg-zinc-200" : "bg-white/40";

  return (
    <>
      <header 
        className={`fixed w-full z-50 px-4 py-3 md:px-12 transition-all duration-500 ${
          isScrolled 
            ? theme === "light"
              ? "bg-white/95 backdrop-blur-md py-2 shadow-md border-b border-zinc-200"
              : "bg-black/95 backdrop-blur-md py-2 shadow-2xl" 
            : "bg-gradient-to-b from-black/50 via-black/10 to-transparent md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 md:space-x-5 cursor-pointer group"
          >
            <div className={`text-xl md:text-3xl font-bold tracking-tighter font-ui border-b-2 border-accent leading-none pb-1 group-hover:text-accent transition-colors ${headerTextColor}`}>KS</div>
            <div className={`hidden sm:block h-8 w-[1px] ${headerBorderColor}`}></div>
            <div className={`hidden sm:block text-[10px] md:text-sm font-bold font-ui uppercase tracking-[0.4em] group-hover:text-accent transition-colors ${headerTextColor}`}>Lens & Latitude</div>
          </div>
          
          <nav className="hidden lg:flex space-x-8 xl:space-x-10 text-[11px] uppercase tracking-[0.25em] font-ui items-center">
            {NAV_ITEMS.map((item) => {
              if (item.name === "Blog") {
                return (
                  <BlogDropdownItem 
                    key={item.name}
                    item={item}
                    currentView={currentView === "blog-archive" ? "blog-archive" : "home"}
                    handleLinkClick={handleLinkClick}
                    onSelectPost={onSelectPost}
                  />
                );
              }
              const isActive = (item.name === "Shop" && currentView === "shop");
              const linkColor = isActive 
                ? "text-accent" 
                : isLightHeader
                  ? "text-zinc-800 hover:text-accent"
                  : "text-white hover:text-accent";
              return (
                <a 
                  key={item.name}
                  href={item.href} 
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`group relative flex items-center gap-2 font-semibold transition-colors ${linkColor}`}
                >
                  <item.icon size={14} className="text-accent" /> 
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* User-facing Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110 cursor-pointer ${
                isLightHeader 
                  ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-800" 
                  : "bg-white/5 hover:bg-white/10 text-accent"
              }`}
            >
              {theme === "light" ? (
                <Moon size={15} className="text-zinc-800 animate-pulse" />
              ) : (
                <Sun size={15} className="text-accent animate-pulse" />
              )}
            </button>

            {/* Desktop Cart Indicator */}
            <button 
              onClick={() => onNavigate("checkout")}
              className={`relative p-2 flex items-center gap-1.5 font-ui text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors ${
                currentView === "checkout" 
                  ? "text-accent" 
                  : isLightHeader 
                    ? "text-zinc-800 hover:text-accent" 
                    : "text-white hover:text-accent"
              }`}
            >
              <ShoppingCart size={15} className="text-accent hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-2 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </button>

            <button 
              aria-label="Menu" 
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className={`lg:hidden flex items-center gap-2 text-[10px] font-bold font-ui tracking-widest backdrop-blur-sm px-3 py-2 rounded-sm border transition-colors ${
                isLightHeader
                  ? "bg-white/80 border-zinc-200 text-zinc-900 active:bg-zinc-100"
                  : "bg-black/60 border-white/10 text-white active:bg-white/20"
              }`}
            >
              {isMobileMenuOpen ? <CloseIcon size={16} /> : <Menu size={16} />} 
              {isMobileMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </header>

      {/* Premium responsive overlay mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto pt-28 pb-12 px-8 md:px-16 no-scrollbar transition-colors ${
              theme === "light" ? "bg-white" : "bg-black/98"
            }`}
          >
            <div className="flex flex-col flex-1">
              {/* Premium Mobile Search Feature */}
              <div className="mt-4 mb-6 relative">
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search trips, destinations, or shop..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full border rounded-sm py-3 pl-11 pr-10 text-sm placeholder-zinc-500 focus:outline-none focus:border-accent transition-colors font-sans ${
                      theme === "light"
                        ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                        : "bg-white/5 border-white/10 text-white"
                    }`}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className={`absolute right-3.5 hover:scale-110 transition-transform ${
                        theme === "light" ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <CloseIcon size={16} />
                    </button>
                  )}
                </div>
              </div>

              {searchQuery.trim() !== "" ? (
                <div className="flex-1 space-y-6 animate-fadeIn py-2">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-bold mb-3">Trip Diaries ({filteredTrips.length})</h3>
                    {filteredTrips.length > 0 ? (
                      <div className="grid gap-2">
                        {filteredTrips.map(trip => (
                          <div 
                            key={trip.id}
                            onClick={() => navigateToTrip(trip.id)}
                            className={`flex items-center gap-3 p-2 rounded border transition-all cursor-pointer group ${
                              theme === "light"
                                ? "bg-zinc-100 hover:bg-zinc-200 border-zinc-200"
                                : "bg-white/5 hover:bg-white/10 border-white/5"
                            }`}
                          >
                            <img src={trip.img} alt={trip.title} className="w-12 h-12 object-cover rounded-sm group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                            <div>
                              <p className={`text-sm font-serif group-hover:text-accent transition-colors ${
                                theme === "light" ? "text-zinc-900" : "text-white"
                              }`}>{trip.title}</p>
                              <p className={`text-[10px] font-mono uppercase tracking-wider ${
                                theme === "light" ? "text-zinc-500" : "text-zinc-400"
                              }`}>{trip.subtitle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500 italic">No matching trip diaries found</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-bold mb-3">Shop Items ({filteredShopItems.length})</h3>
                    {filteredShopItems.length > 0 ? (
                      <div className="grid gap-2">
                        {filteredShopItems.map(item => (
                          <div 
                            key={item.name}
                            onClick={() => navigateToShopItem()}
                            className={`flex items-center gap-3 p-2 rounded border transition-all cursor-pointer group ${
                              theme === "light"
                                ? "bg-zinc-100 hover:bg-zinc-200 border-zinc-200"
                                : "bg-white/5 hover:bg-white/10 border-white/5"
                            }`}
                          >
                            <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-sm group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                            <div className="flex-1">
                              <p className={`text-sm font-sans group-hover:text-accent transition-colors font-medium ${
                                theme === "light" ? "text-zinc-900" : "text-white"
                              }`}>{item.name}</p>
                              <p className="text-[10px] font-mono text-accent font-bold">{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500 italic">No matching shop items found</p>
                    )}
                  </div>
                </div>
              ) : (
                <nav className="flex flex-col space-y-8 text-2xl md:text-3xl font-serif tracking-tight mt-2">
                  {NAV_ITEMS.map((item) => (
                    <a 
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`flex items-center gap-4 font-semibold transition-colors ${
                        theme === "light" ? "text-zinc-900 hover:text-accent" : "text-white hover:text-accent"
                      }`}
                    >
                      <item.icon size={20} className="text-accent" />
                      {item.name}
                    </a>
                  ))}
                  
                  <a 
                    href="#cart"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      onNavigate("checkout");
                    }}
                    className={`flex items-center gap-4 font-semibold transition-colors ${
                      currentView === "checkout" 
                        ? "text-accent" 
                        : theme === "light" 
                          ? "text-zinc-900 hover:text-accent" 
                          : "text-white hover:text-accent"
                    }`}
                  >
                    <ShoppingCart size={20} className="text-accent" />
                    Shopping Cart ({totalCartItems})
                  </a>
                </nav>
              )}
            </div>

            <div className={`mt-12 pt-8 border-t flex flex-col gap-4 font-ui text-xs ${
              theme === "light" ? "border-zinc-200 text-zinc-500" : "border-white/10 text-zinc-500"
            }`}>
              <p className={`uppercase tracking-[0.3em] font-semibold ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}>Collaborate with Khilesh</p>
              <a href="mailto:khileshsammal.work@gmail.com" className={`transition-colors ${
                theme === "light" ? "text-zinc-800 hover:text-accent" : "text-white hover:text-accent"
              }`}>khileshsammal.work@gmail.com</a>
              <div className="flex gap-4 mt-2">
                {SOCIAL_LINKS.map(link => (
                  <a key={link.label} href={link.href} target="_blank" className="text-zinc-500 hover:text-accent transition-colors">
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = "Header";

const Hero = memo(() => (
  <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden always-dark">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1596642240875-da7d44fe845f?auto=format&fit=crop&w=1920&q=80" 
        className="w-full h-full object-cover opacity-60" 
        alt="Travel Background" 
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-bg"></div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 text-center px-6 max-w-4xl"
    >
      <h1 className="text-4xl xs:text-5xl md:text-8xl font-serif italic mb-4 text-white drop-shadow-lg">Lens & Latitude</h1>
      <p className="text-[9px] md:text-base uppercase tracking-[0.2em] md:tracking-[0.5em] text-accent font-bold font-ui">Documenting the Unseen — 2025 - ∞</p>
      
      <div className="mt-8 md:mt-10 flex justify-center space-x-6 md:space-x-8 text-white">
        {SOCIAL_LINKS.map((social) => (
          <motion.a 
            key={social.label}
            whileHover={{ scale: 1.1, color: "#ffcc00" }}
            href={social.href} 
            target="_blank" 
            aria-label={social.label} 
            className="p-2 transition-colors"
          >
            <social.icon size={24} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  </section>
));

Hero.displayName = "Hero";

const About = memo(({ onReadBio }: { onReadBio: () => void }) => (
  <section id="about" className="py-16 md:py-32 px-5 md:px-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-7xl mx-auto">
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
        I’m Khilesh Sammal, a full-time engineer turned professional performance marketer and part-time traveler. Through slow journeys and visual storytelling, I explore places beyond the surface — from Himalayan trails to tropical islands.
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
        alt="Khilesh" 
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  </section>
));

About.displayName = "About";

interface DirectoryProps {
  onSelectTrip: (id: number) => void;
}

const Directory = memo(({ onSelectTrip }: DirectoryProps) => {
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
        className="px-5 md:px-24 mb-10 md:mb-12 max-w-7xl mx-auto"
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
              className={`pb-1 whitespace-nowrap transition-all hover:text-accent border-b-2 ${filter === cat ? "text-accent border-accent" : "border-transparent text-text-dim"}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-0.5 bg-border-main border-y border-border-main">
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
                alt={trip.title}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/10 to-transparent">
                <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] mb-1 text-accent font-bold font-ui">{trip.subtitle}</span>
                <h3 className="text-base sm:text-xl font-serif mb-2 sm:mb-4 leading-tight text-white">{trip.title}</h3>
                {trip.id === 1 || trip.id === 2 || trip.id === 3 || trip.id === 4 || trip.id === 5 || trip.id === 6 || trip.id === 7 ? (
                  <button 
                    onClick={() => onSelectTrip(trip.id)}
                    className="px-3 py-1.5 sm:px-5 sm:py-2.5 text-[9px] sm:text-[11px] font-bold font-ui uppercase tracking-widest border border-white/40 hover:bg-white hover:text-black transition-all w-fit flex items-center gap-1.5 sm:gap-2 cursor-pointer text-left"
                  >
                    View <Eye size={12} className="sm:w-4 sm:h-4" />
                  </button>
                ) : (
                  <a 
                    href={trip.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 sm:px-5 sm:py-2.5 text-[9px] sm:text-[11px] font-bold font-ui uppercase tracking-widest border border-white/40 hover:bg-white hover:text-black transition-all w-fit flex items-center gap-1.5 sm:gap-2"
                  >
                    View <Eye size={12} className="sm:w-4 sm:h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
});

Directory.displayName = "Directory";

interface BlogProps {
  onSelectPost: (id: string) => void;
}

const Blog = memo(({ onSelectPost }: BlogProps) => {
  return (
    <section id="blog" className="py-16 md:py-32 px-5 md:px-24 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-2">The Journal</h2>
          <p className="text-accent text-xs md:text-sm italic font-ui font-medium">Detailed guides and personal notes.</p>
        </div>
        <button 
          onClick={() => onSelectPost("archive-list")}
          className="text-text-dim hover:text-accent font-ui font-bold text-xs uppercase tracking-widest border border-border-main hover:border-accent/40 px-5 py-2.5 transition-all w-fit"
        >
          View All Posts
        </button>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {DETAILED_BLOG_POSTS.slice(0, 2).map((post, idx) => (
          <motion.article 
            key={post.id} 
            onClick={() => onSelectPost(post.id)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
            className="group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden mb-5 rounded-sm bg-card-bg border border-border-main">
              <img 
                src={post.img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={post.title} 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex items-center space-x-3 mb-3 text-[9px] uppercase tracking-widest text-accent font-bold font-ui">
              <span className="flex items-center gap-1"><Tag size={12} /> {post.tag}</span>
              <span className="w-1.5 h-1.5 bg-border-main rounded-full"></span>
              <span className="text-text-dim font-normal flex items-center gap-1"><Clock size={12} /> {post.read}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif mb-4 leading-tight transition-all group-hover:text-accent">{post.title}</h3>
            <span className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-border-main pb-1 group-hover:text-accent group-hover:border-accent inline-flex items-center gap-2 font-ui transition-all">
              Read Post <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
});

Blog.displayName = "Blog";

const Shop = memo(({ onAddToCart }: { onAddToCart: (item: any) => void }) => (
  <section id="shop" className="py-16 md:py-32 bg-bg px-5 md:px-24">
    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-2 uppercase tracking-tighter">The Travel Shop</h2>
        <p className="text-accent text-[10px] md:text-sm tracking-widest uppercase flex items-center justify-center gap-2 font-ui font-bold">
          <Sparkles size={14} /> Curated Essentials
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {SHOP_ITEMS.map((item, idx) => (
          <motion.div 
            key={item.name} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
            className="group bg-card-bg border border-border-main p-5 transition-all duration-300 rounded-sm hover:border-accent"
          >
            <div className="aspect-square mb-6 overflow-hidden bg-bg border border-border-main/50 flex items-center justify-center">
              <img 
                src={item.img} 
                className="w-3/4 opacity-80 group-hover:scale-110 transition-transform" 
                alt={item.name} 
                loading="lazy"
                decoding="async"
              />
            </div>
            <h4 className="text-sm font-serif mb-1 font-bold">{item.name}</h4>
            <p className="text-[12px] text-accent font-bold mb-4 font-ui">{item.price}</p>
            <button 
              onClick={() => onAddToCart({
                name: item.name,
                price: parseInt(item.price.replace(/[^\d]/g, ""), 10),
                img: item.img
              })}
              className="w-full py-4 text-[10px] font-bold font-ui uppercase tracking-widest border border-border-main text-text-main hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-2"
            >
              <item.icon size={14} /> {item.btn}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Shop.displayName = "Shop";

const FAQItem = memo(({ faq, index, isOpen, onToggle }: { faq: any, index: number, isOpen: boolean, onToggle: () => void }) => (
  <div className="border border-border-main bg-card-bg rounded-sm overflow-hidden">
    <button 
      onClick={onToggle}
      className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none"
    >
      <span className="font-bold font-ui text-[10px] md:text-sm uppercase tracking-widest leading-relaxed pr-4">{index + 1}. {faq.q}</span>
      <ChevronDown 
        className={`transition-transform duration-300 text-zinc-600 ${isOpen ? "rotate-180 text-accent" : ""}`} 
        size={16} 
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="px-5 md:px-6 pb-6">
            <p className="text-text-dim leading-relaxed text-sm md:text-base">{faq.a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

FAQItem.displayName = "FAQItem";

const FAQ = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section id="faq" className="py-16 md:py-32 px-5 md:px-24 bg-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-2">Travel FAQ</h2>
          <p className="text-accent text-xs md:text-sm italic font-ui font-medium">Common questions about the journey.</p>
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <FAQItem 
                faq={faq} 
                index={i} 
                isOpen={openIndex === i} 
                onToggle={() => handleToggle(i)} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQ.displayName = "FAQ";

const Contact = memo(({ onNavigate }: { onNavigate?: (view: AppView, targetHash?: string) => void }) => (
  <section id="contact" className="bg-bg py-16 md:py-32 px-5 md:px-24 border-t border-border-main">
    <div className="max-w-7xl mx-auto">
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
                className="text-text-dim hover:text-accent font-sans transition-colors"
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
                className="text-text-dim hover:text-accent font-sans transition-colors"
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
                className="text-text-dim hover:text-accent font-sans transition-colors"
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
                className="text-text-dim hover:text-accent font-sans transition-colors"
              >
                About Me
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("home", "#contact");
                  }
                }}
                className="text-text-dim hover:text-accent font-sans transition-colors"
              >
                Contact
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
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // No fake success message as instructed when no backend is connected
            }}
            className="flex gap-2"
          >
            <input 
              type="email" 
              required
              placeholder="Your email address" 
              className="bg-card-bg border border-border-main rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-text-dim/50 focus:outline-none focus:border-accent w-full font-sans transition-colors"
            />
            <button 
              type="submit" 
              className="bg-accent hover:bg-accent/90 text-black px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-bold font-ui cursor-pointer transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16 md:mt-24 pt-8 border-t border-border-main flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] text-accent font-bold font-ui flex items-center gap-3">
          <Globe size={20} /> Lens & Latitude — 2026
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <a href="mailto:khileshsammal.work@gmail.com" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors text-text-main">Email Me</a>
          <a href="mailto:khileshsammal.work@gmail.com" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors text-text-main">Collaborations</a>
          <a href="/privacy-policy" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors text-text-main">Privacy Policy</a>
          <a href="/terms" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors text-text-main">Terms of Use</a>
          <a href="/disclaimer" className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold font-ui hover:text-accent transition-colors text-text-main">Disclaimer</a>
        </div>
      </div>
    </div>
  </section>
));

Contact.displayName = "Contact";

const Footer = memo(() => (
  <footer className="bg-card-bg pb-12 px-6 md:px-24 border-t border-border-main/50">
    <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] text-text-dim/60 uppercase tracking-widest font-ui font-bold gap-4 text-center">
      <p>&copy; 2026 KHILESH SAMMAL. ALL RIGHTS RESERVED.</p>
      <div className="flex space-x-4 md:space-x-6">
        <a href="#" className="hover:text-text-main transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-text-main transition-colors">Shipping</a>
        <a href="mailto:khileshsammal.work@gmail.com" className="hover:text-text-main transition-colors">Contact</a>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

/**
 * App Main Entry Component:
 * Handles client-side view state switching and core presentation layout.
 * Routing State Matrix:
 * - view === "home": Renders immersive portfolio landing blocks (Hero, About, Directory, ExpeditionHub, Blog grid spotlight, Shop items, FAQ, Contact/Social triggers).
 * - view === "blog-archive": Launches the high-performance travel journal submodule (BlogArchive).
 */
export default function App() {
  // --- STATE MANAGEMENT (useState) ---
  // useState is a hook that lets you add state variables to functional components.
  // When a state variable changes, React automatically re-renders the component to update the UI.

  // 1. 'view' tracks which page or view we are currently showing (e.g., 'home', 'shop', 'thailand-diaries', etc.)
  const [view, setView] = useState<AppView>("home");

  // 2. 'activeBlogPostId' tracks the ID of the specific blog post the user is reading. If null, we show the list of posts.
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(null);

  // 3. 'cart' stores the list of items the user added to their travel shop cart.
  // We initialize it using a function (lazy initialization) so it only reads from localStorage on the first render.
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("latitude_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 4. 'toastMessage' is a temporary notification message that floats on the screen when items are added/removed.
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 5. 'theme' manages the website color mode ('dark' or 'light')
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const stored = localStorage.getItem("latitude_theme");
      return (stored as "dark" | "light") || "dark";
    } catch {
      return "dark";
    }
  });

  // Toggle theme action callback to easily switch color palettes
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  }, []);

  // Update theme class on HTML document element when state changes
  useEffect(() => {
    try {
      localStorage.setItem("latitude_theme", theme);
    } catch (e) {
      console.error(e);
    }
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  // --- SIDE EFFECTS (useEffect) ---
  // useEffect lets you run code after the component renders, useful for synchronizing with external APIs, localStorage, or timers.

  // Effect A: Whenever the 'cart' state updates, we convert it to JSON and save it to the browser's localStorage.
  // This keeps the user's shopping cart saved even if they refresh the page.
  useEffect(() => {
    try {
      localStorage.setItem("latitude_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]); // Run this effect ONLY when the 'cart' state changes.

  // Effect B: Manage the automatic closing of toast notifications.
  // When a toastMessage is shown, set a 3-second timer to clear it.
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      // Clean-up function: clears the timeout if the component unmounts or if toastMessage changes before the 3 seconds finish.
      return () => clearTimeout(timer);
    }
  }, [toastMessage]); // Run this effect ONLY when 'toastMessage' changes.

  // --- PERFORMANCE OPTIMIZATION (useCallback & useMemo) ---
  // - useCallback: Caches (memoizes) a function definition between re-renders so it isn't recreated from scratch every time.
  // - useMemo: Caches the result of a calculation so it doesn't run again unless its dependencies change.

  // Action: Add an item to the cart, or increment its quantity if it already exists.
  const handleAddToCart = useCallback((item: { name: string; price: number; img: string }) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(i => i.name === item.name);
      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx] = {
          ...nextCart[existingIdx],
          quantity: nextCart[existingIdx].quantity + 1
        };
        setToastMessage(`Updated quantity of ${item.name}!`);
        return nextCart;
      } else {
        setToastMessage(`Added ${item.name} to cart!`);
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }, []); // Empty dependency array means this function reference is created once and stays stable.

  // Action: Remove an item from the cart.
  const handleRemoveFromCart = useCallback((name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
    setToastMessage(`Removed from cart.`);
  }, []);

  // Action: Change the quantity of an item directly (e.g., from the checkout screen).
  const handleUpdateQuantity = useCallback((name: string, quantity: number) => {
    setCart(prev => prev.map(item => item.name === name ? { ...item, quantity } : item));
  }, []);

  // Action: Empty the cart entirely after a successful checkout.
  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculation: Sum the quantity of all items to display the total number of items in the cart badge.
  const totalCartItems = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]); // Recalculate ONLY if the 'cart' state has changed.

  /**
   * handleNavigate:
   * Transition views and triggers delayed scrolling anchors for asynchronous landing mount cycles.
   */
  const handleNavigate = useCallback((targetView: AppView, targetHash?: string) => {
    setView(targetView);
    if (targetView === "home") {
      setActiveBlogPostId(null);
      if (targetHash) {
        // Wait briefly for the home components to mount, then scroll smoothly to the target section
        setTimeout(() => {
          const element = document.querySelector(targetHash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setActiveBlogPostId(null); // Reset detail view to show list list
      window.scrollTo({ top: 0 });
    }
  }, []);

  /**
   * handleSelectPost:
   * Directly mounts the BlogArchive component and locks a target postId to display
   * the complete detailed travel entries (like the Phuket Expedition Guide).
   */
  const handleSelectPost = useCallback((postId: string | null) => {
    if (!postId) {
      setActiveBlogPostId(null);
    } else if (postId === "archive-list") {
      setActiveBlogPostId(null);
      setView("blog-archive");
      window.scrollTo({ top: 0 });
    } else {
      setActiveBlogPostId(postId);
      setView("blog-archive");
      window.scrollTo({ top: 0 });
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-black">
      <Header 
        currentView={view} 
        onNavigate={handleNavigate} 
        onSelectPost={handleSelectPost} 
        totalCartItems={totalCartItems}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        {view === "home" ? (
          <>
            <Hero />
            <About onReadBio={() => handleNavigate("bio")} />
            <Directory onSelectTrip={(id) => {
              if (id === 1) {
                handleNavigate("thailand-diaries");
              } else if (id === 2) {
                handleNavigate("malaysia-expedition");
              } else if (id === 3) {
                handleNavigate("amritsar-expedition");
              } else if (id === 4) {
                handleNavigate("kerala-expedition");
              } else if (id === 5) {
                handleNavigate("patal-bhuvaneshwar-expedition");
              } else if (id === 6) {
                handleNavigate("rishikesh-expedition");
              } else if (id === 7) {
                handleNavigate("goa-expedition");
              }
            }} />
            <PortfolioGallery />
            <ExpeditionHub 
              cartItems={cart}
              onAddToCart={handleAddToCart}
              onOpenCheckout={() => handleNavigate("checkout")}
            />
            <Blog onSelectPost={handleSelectPost} />
            <FAQ />
            <Contact onNavigate={handleNavigate} />
          </>
        ) : view === "blog-archive" ? (
          <BlogArchive 
            onBackToHome={() => handleNavigate("home")} 
            openBlogPostId={activeBlogPostId} 
            onSelectBlogPost={handleSelectPost} 
          />
        ) : view === "shop" ? (
          <ShopView 
            onBackToHome={() => handleNavigate("home")}
            onAddToCart={handleAddToCart}
            onOpenCheckout={() => handleNavigate("checkout")}
            cartCount={totalCartItems}
          />
        ) : view === "thailand-diaries" ? (
          <ThailandDiariesView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : view === "malaysia-expedition" ? (
          <MalaysiaExpeditionView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : view === "amritsar-expedition" ? (
          <AmritsarExpeditionView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : view === "kerala-expedition" ? (
          <KeralaExpeditionView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : view === "patal-bhuvaneshwar-expedition" ? (
          <PatalBhuvaneshwarExpeditionView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : view === "rishikesh-expedition" ? (
          <RishikeshExpeditionView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : view === "goa-expedition" ? (
          <GoaExpeditionView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : view === "bio" ? (
          <BioView 
            onBackToHome={() => handleNavigate("home")}
          />
        ) : (
          <CheckoutView 
            cartItems={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onBackToHome={() => handleNavigate("home")}
          />
        )}
      </main>
      <Footer />

      {/* Sleek Floating Toast Success Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-zinc-950 border border-accent/40 text-white px-5 py-4 rounded-sm shadow-2xl flex items-center gap-3 max-w-sm font-sans"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-xs uppercase tracking-widest font-ui font-semibold">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
