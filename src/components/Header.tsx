import { 
  PenTool, 
  Clock, 
  ChevronDown, 
  Menu, 
  ShoppingCart, 
  Search, 
  Sun, 
  Moon, 
  X as CloseIcon 
} from "lucide-react";
import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  NAV_ITEMS, 
  SOCIAL_LINKS, 
  TRIPS, 
  SHOP_ITEMS,
  TRIP_ID_TO_VIEW_MAP,
  TRIP_ID_TO_BLOG_ID_MAP
} from "../constants";
import { DETAILED_BLOG_POSTS } from "../blogData";
import { useTheme } from "../context/ThemeContext";
import { AppView } from "../utils/routerSeo";

interface BlogDropdownItemProps {
  key?: React.Key;
  item: any;
  currentView: "home" | "blog-archive";
  handleLinkClick: (e: React.MouseEvent, item: any) => void;
  onSelectPost?: (postId: string | null) => void;
}

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
                className="w-full text-center py-2 text-[9px] uppercase tracking-[0.2em] font-ui font-black text-accent bg-white/5 hover:bg-accent hover:text-black border border-accent/20 transition-all rounded-sm cursor-pointer"
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

export interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView, targetHash?: string) => void;
  onSelectPost?: (postId: string | null) => void;
  totalCartItems?: number;
  theme?: "dark" | "light";
  toggleTheme?: () => void;
}

export const Header = memo(({ currentView, onNavigate, onSelectPost, totalCartItems = 0, theme: propsTheme, toggleTheme: propsToggleTheme }: HeaderProps) => {
  const { theme: ctxTheme, toggleTheme: ctxToggleTheme } = useTheme();
  const theme = propsTheme ?? ctxTheme;
  const toggleTheme = propsToggleTheme ?? ctxToggleTheme;

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
    const mappedView = TRIP_ID_TO_VIEW_MAP[id] as AppView | undefined;
    if (mappedView) {
      onNavigate(mappedView);
    } else if (TRIP_ID_TO_BLOG_ID_MAP[id] && onSelectPost) {
      onSelectPost(TRIP_ID_TO_BLOG_ID_MAP[id]);
    } else {
      onNavigate("home");
    }
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
        <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
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

            <button 
              onClick={() => onNavigate("checkout")}
              className={`relative p-2 flex items-center gap-1.5 font-ui text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors cursor-pointer ${
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
              className={`lg:hidden flex items-center gap-2 text-[10px] font-bold font-ui tracking-widest backdrop-blur-sm px-3 py-2 rounded-sm border transition-colors cursor-pointer ${
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
                      className={`absolute right-3.5 hover:scale-110 transition-transform cursor-pointer ${
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
                            <img src={trip.img} alt={`Thumbnail of ${trip.title} - ${trip.subtitle}`} className="w-12 h-12 object-cover rounded-sm group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
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
                            <img src={item.img} alt={`Search item thumbnail for ${item.name}`} className="w-12 h-12 object-cover rounded-sm group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
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
                      className={`flex items-center gap-4 font-semibold transition-colors cursor-pointer ${
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
                    className={`flex items-center gap-4 font-semibold transition-colors cursor-pointer ${
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

                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-4 font-semibold transition-colors cursor-pointer text-left ${
                      theme === "light" 
                        ? "text-zinc-900 hover:text-accent" 
                        : "text-white hover:text-accent"
                    }`}
                  >
                    {theme === "light" ? (
                      <>
                        <Moon size={20} className="text-zinc-800" />
                        Switch to Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun size={20} className="text-accent" />
                        Switch to Light Mode
                      </>
                    )}
                  </button>
                </nav>
              )}
            </div>

            <div className={`mt-12 pt-8 border-t flex flex-col gap-4 font-ui text-xs ${
              theme === "light" ? "border-zinc-200 text-zinc-500" : "border-white/10 text-zinc-500"
            }`}>
              <p className={`uppercase tracking-[0.3em] font-semibold ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}>Collaborate with Khilesh</p>
              <a href="mailto:khileshsammal.business@gmail.com" className={`transition-colors ${
                theme === "light" ? "text-zinc-800 hover:text-accent" : "text-white hover:text-accent"
              }`}>khileshsammal.business@gmail.com</a>
              <div className="flex gap-4 mt-2">
                {SOCIAL_LINKS.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-accent transition-colors">
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
