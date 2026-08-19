import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown } from "lucide-react";
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
  <div className="border border-border-main bg-card-bg rounded-sm overflow-hidden transition-all duration-300 hover:border-accent/40">
    <button 
      onClick={onToggle}
      className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none cursor-pointer"
      aria-expanded={isOpen}
    >
      <div className="flex flex-col gap-1 pr-4">
        {faq.category && (
          <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold font-ui">
            {faq.category}
          </span>
        )}
        <span className="font-bold font-ui text-[10px] md:text-sm uppercase tracking-widest leading-relaxed text-text-main">
          {index + 1}. {faq.q}
        </span>
      </div>
      <ChevronDown 
        className={`transition-transform duration-300 text-zinc-500 shrink-0 ${isOpen ? "rotate-180 text-amber-400" : ""}`} 
        size={16} 
      />
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
          <div className="px-5 md:px-6 pb-6 pt-1 border-t border-white/5">
            <p className="text-text-dim leading-relaxed text-sm md:text-base font-sans">{faq.a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

FAQItem.displayName = "FAQItem";

export const FAQSection = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section id="faq" className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 bg-bg border-t border-border-main/50">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <span className="text-accent uppercase tracking-widest text-[10px] font-bold mb-3 block font-ui">Knowledge Hub</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-3">Travel FAQ</h2>
          <p className="text-zinc-400 text-xs md:text-sm italic font-serif max-w-lg mx-auto">
            Clear answers regarding travel logistics, photography gear, copyrights, and collaborations.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search travel FAQ questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card-bg border border-border-main rounded-sm pl-10 pr-4 py-2.5 text-xs text-text-main placeholder-text-dim/50 focus:outline-none focus:border-accent font-sans transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-sm text-[10px] uppercase tracking-widest font-bold font-ui transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? "bg-amber-400 text-black shadow-md font-extrabold" 
                    : "bg-card-bg text-zinc-400 hover:text-white border border-border-main/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
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
            <div className="text-center py-12 border border-dashed border-border-main rounded-sm text-zinc-500 text-xs">
              No matching FAQ entries found for "{searchQuery}". Try searching for photography, visa, or gear.
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = "FAQSection";
