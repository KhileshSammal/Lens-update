import { memo } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { SHOP_ITEMS } from "../constants";

interface ShopSectionProps {
  onAddToCart: (item: any) => void;
}

export const ShopSection = memo(({ onAddToCart }: ShopSectionProps) => (
  <section id="shop" className="py-16 md:py-32 bg-bg px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-[92%] mx-auto">
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
                alt={`Curated travel gear item: ${item.name}`} 
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
              className="w-full py-4 text-[10px] font-bold font-ui uppercase tracking-widest border border-border-main text-text-main hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <item.icon size={14} /> {item.btn}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

ShopSection.displayName = "ShopSection";
