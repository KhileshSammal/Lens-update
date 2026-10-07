import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, HelpCircle, Sparkles, Tag, X } from "lucide-react";
import { FAQS } from "../constants";

const FAQItem = memo(({ 
  faq, 
  index, 
  isOpen, 
  onToggle 
}: { 
  faq: { q: string; a: string; category?: string }; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void; 
}) => (
  <div 
    className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-card-bg ${
      isOpen 
        ? "border-accent/60 shadow-lg ring-1 ring-accent/20" 
        : "border-border-main hover:border-accent/40 hover:shadow-md"
    }`}
  >
    <button 
      onClick={onToggle}
      className="w-full flex justify-between items-center p-5 sm:p-6 md:p-7 text-left focus:outline-none cursor-pointer group"
      aria-expanded={isOpen}
    >
      <div className="flex items-start gap-3.5 sm:gap-4.5 pr-4 flex-1">
        <span className={`text-base sm:text-lg md:text-xl font-serif font-bold transition-colors shrink-0 mt-0.5 ${
          isOpen ? "text-accent" : "text-accent/80 group-hover:text-accent"
        }`}>
          {String(index + 1).padStart(2, "0")}.
        </span>

        <div className="flex flex-col gap-1.5 flex-1">
          {faq.category && (
            <div className="flex items-center gap-1.5">
              <Tag size={11} className="text-accent" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent font-bold font-ui">
                {faq.category}
              </span>
            </div>
          )}
          <h3 className={`font-serif text-base sm:text-lg md:text-xl font-semibold leading-snug transition-colors text-text-main ${
            isOpen ? "text-accent" : "group-hover:text-accent"
          }`}>
            {faq.q}
          </h3>
        </div>
      </div>

      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
        isOpen 
          ? "bg-accent text-black rotate-180 shadow-sm" 
          : "bg-bg/80 border border-border-main text-text-dim group-hover:text-text-main group-hover:border-accent/40"
      }`}>
        <ChevronDown size={17} />
      </div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-5 sm:px-6 md:px-7 pb-6 sm:pb-7 pt-2 border-t border-border-main/60">
            <div className="pl-0 sm:pl-9">
              <p className="text-text-dim leading-relaxed text-sm sm:text-base font-sans antialiased">
                {faq.a}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

FAQItem.displayName = "FAQItem";

export const FAQSection = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => [
    "All",
    "Platform & Philosophy",
    "Photography & Gear",
    "Travel & Planning",
    "Copyright & Collaborations"
  ], []);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section id="faq" className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 w-full max-w-[92%] mx-auto">
      <div className="w-full">
        {/* Header Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-ui font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4">
            <Sparkles size={13} className="text-accent" />
            <span>Field Knowledge Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight mb-4 text-text-main">
            Frequently Asked <span className="italic text-accent">Questions</span>
          </h2>

          <p className="text-text-dim text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto">
            Clear, honest answers regarding trip logistics, camera gear, photo editing workflows, copyrights, and bespoke itinerary collaborations.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="mb-8 md:mb-12 space-y-4 max-w-4xl mx-auto">
          {/* Search Box */}
          <div className="relative max-w-lg mx-auto">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              type="text"
              placeholder="Search travel FAQs, gear, visas, itineraries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card-bg border border-border-main rounded-full pl-11 pr-10 py-3 text-xs sm:text-sm text-text-main placeholder-text-dim/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-text-dim hover:text-text-main rounded-full hover:bg-border-main/30 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Categories Pill Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-bold font-ui transition-all cursor-pointer shadow-sm ${
                  selectedCategory === cat 
                    ? "bg-accent text-black font-extrabold shadow-md hover:bg-amber-300 scale-105" 
                    : "bg-card-bg text-text-dim hover:text-text-main border border-border-main hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List - Spacious, full width layout */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <FAQItem 
                  faq={faq} 
                  index={i} 
                  isOpen={openIndex === i} 
                  onToggle={() => handleToggle(i)} 
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-14 border border-dashed border-border-main rounded-2xl bg-card-bg text-text-dim text-sm space-y-2">
              <HelpCircle size={32} className="mx-auto text-accent/60 mb-2" />
              <p className="font-semibold text-text-main">No matching FAQ entries found</p>
              <p className="text-xs text-text-dim">
                Try searching for keywords like "gear", "visa", "editing", or "collaborations".
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-ui font-bold text-xs uppercase tracking-wider hover:bg-accent/20 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = "FAQSection";

