import { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart } from "lucide-react";
import Ecosystem from "./Ecosystem";

interface ExpeditionHubProps {
  cartItems?: any[];
  onAddToCart?: (item: any) => void;
  onOpenCheckout?: () => void;
}

// Lifted static data outside of component body:
// This maintains a stable object reference across renders, preventing
// useCallback hook cache misses and unnecessary re-renders.
const PRESET_ITEM = {
  name: "2026 Lightroom Presets",
  price: 1499,
  img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80"
};

/**
 * ExpeditionHub Component:
 * Acts as the centralized landing widget connecting physical and digital collectibles.
 * Combines floating responsive shopping cart notifications, global aesthetic section titles,
 * and passes optimized callbacks into the nested Ecosystem/Cart interfaces.
 */
const ExpeditionHub = ({ cartItems = [], onAddToCart, onOpenCheckout }: ExpeditionHubProps) => {
  // Stable cached callback to add presets to the shopping cart
  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(PRESET_ITEM);
    }
  }, [onAddToCart]);

  // Stable cached callback to add items and immediately proceed to the checkout panel
  const handleBuyNow = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(PRESET_ITEM);
    }
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  }, [onAddToCart, onOpenCheckout]);

  return (
    <section id="expedition-hub" className="bg-bg py-24 border-t border-white/5 relative">
      {/* Floating Cart Icon: Animated using Framer Motion's AnimatePresence for smooth mounting/unmounting */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={onOpenCheckout}
            aria-label={`View shopping cart with ${cartItems.reduce((acc: number, curr: any) => acc + curr.quantity, 0)} items`}
            title="View Shopping Cart"
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] bg-white text-slate-950 p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
          >
            <ShoppingCart size={24} />
            <span className="sr-only">
              Shopping Cart with {cartItems.reduce((acc: number, curr: any) => acc + curr.quantity, 0)} items
            </span>
            <span aria-hidden="true" className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              {cartItems.reduce((acc: number, curr: any) => acc + curr.quantity, 0)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 mb-20"
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

      {/* Interactive visual canvas for merchandise/interactive blocks */}
      <Ecosystem onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
    </section>
  );
};

export default memo(ExpeditionHub);
