import { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart } from "lucide-react";
import Ecosystem from "./Ecosystem";

interface ExpeditionHubProps {
  cartItems?: any[];
  onAddToCart?: (item: any) => void;
  onOpenCheckout?: () => void;
}

const ExpeditionHub = ({ cartItems = [], onAddToCart, onOpenCheckout }: ExpeditionHubProps) => {
  const presetItem = {
    name: "2026 Lightroom Presets",
    price: 1499,
    img: "https://images.unsplash.com/photo-1706803501715-8d0e4445e446?auto=format&fit=crop&w=800&q=80"
  };

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(presetItem);
    }
  }, [onAddToCart, presetItem]);

  const handleBuyNow = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(presetItem);
    }
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  }, [onAddToCart, onOpenCheckout, presetItem]);

  return (
    <section id="expedition-hub" className="bg-bg py-24 border-t border-white/5 relative">
      {/* Floating Cart Icon */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={onOpenCheckout}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] bg-white text-slate-950 p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {cartItems.reduce((acc: number, curr: any) => acc + curr.quantity, 0)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <span className="text-accent uppercase tracking-widest text-[10px] font-bold mb-4 block font-ui">Global Footprint</span>
            <h2 className="text-white text-5xl md:text-8xl font-serif leading-none">Expedition <br /> <span className="italic text-white/50">Hub.</span></h2>
          </div>
          <div className="max-w-sm">
            <p className="text-slate-500 text-lg leading-relaxed italic font-serif">
              "Mapping the intersection of analytical rigor and raw exploration."
            </p>
          </div>
        </div>
      </motion.div>

      <Ecosystem onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
    </section>
  );
};

export default memo(ExpeditionHub);
