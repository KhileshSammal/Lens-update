import { motion } from "motion/react";
import { memo, useState } from "react";
import { ShoppingBag, ArrowRight, CheckCircle, ShieldCheck, Zap, CreditCard } from "lucide-react";

const LOGOS = [
  { name: "Uttarakhand Tourism", color: "text-red-500" },
  { name: "Gear Pro", color: "text-yellow-400" },
  { name: "Travel Meta", color: "text-blue-500" },
  { name: "Leica Science", color: "text-white" },
  { name: "Peak Performance", color: "text-red-500" },
  { name: "Global Logistics", color: "text-yellow-400" },
  { name: "Adventure Co.", color: "text-blue-500" },
  { name: "Digital Nomads", color: "text-white" },
];

const Ecosystem = ({ onAddToCart, onBuyNow }: { onAddToCart: () => void, onBuyNow: () => void }) => {
  const [isBuying, setIsBuying] = useState(false);

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelEvent",
        "name": "Vietnam 2026 Expedition",
        "startDate": "2026-07-17",
        "location": {
          "@type": "Place",
          "name": "Vietnam",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "VN"
          }
        },
        "description": "A high-performance expedition exploring the hidden gems of Vietnam.",
        "eventStatus": "https://schema.org/EventScheduled",
        "organizer": {
          "@type": "Person",
          "name": "Khilesh Sammal"
        }
      },
      {
        "@type": "Product",
        "name": "2026 Lightroom Presets",
        "image": "https://images.unsplash.com/photo-1706803501715-8d0e4445e446?auto=format&fit=crop&w=800&q=80",
        "description": "Professional-grade Lightroom presets optimized for travel and landscape photography.",
        "sku": "LL-PRESET-2026",
        "mpn": "LL2026PRESET",
        "brand": {
          "@type": "Brand",
          "name": "Lens & Latitude"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Rohan Sharma"
            },
            "reviewBody": "Exceptional Lightroom presets for travel photography. Transformed my raw mountain shots effortlessly.",
            "datePublished": "2026-01-15"
          }
        ],
        "offers": {
          "@type": "Offer",
          "url": "https://lensandlattitude.in/shop",
          "priceCurrency": "INR",
          "price": "1499",
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "INR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "IN"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 0,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 0,
                "unitCode": "DAY"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 7,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          }
        }
      }
    ]
  };

  return (
    <div className="py-24 bg-bg relative overflow-hidden">
      {/* JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Industry Footprint Marquee */}
      <div className="mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Industry Footprint</p>
          <div className="h-[1px] w-24 bg-accent/30 mx-auto" />
        </motion.div>

        <div className="relative flex overflow-hidden group border-y border-white/5 bg-white/[0.02]">
          <motion.div 
            animate={{ x: [0, -1920] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex whitespace-nowrap py-12"
          >
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
              <div 
                key={i} 
                className={`mx-12 text-3xl md:text-5xl font-bold uppercase tracking-tighter transition-all cursor-default ${logo.color} opacity-80 hover:opacity-100 hover:scale-110`}
              >
                {logo.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Digital Shop Card */}
      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="text-accent uppercase tracking-widest text-[10px] font-bold mb-4 flex items-center gap-2 font-ui">
              <Zap size={14} /> Performance Gear
            </span>
            <h2 className="text-white text-4xl md:text-6xl font-serif mb-8 leading-tight">
              2026 Lightroom <br /> <span className="italic text-white/50">Presets.</span>
            </h2>
            
            <div className="space-y-6 mb-10">
              {[
                { icon: ShieldCheck, text: "Optimized for iPhone 16 Pro & Leica color science" },
                { icon: CheckCircle, text: "12 high-fidelity profiles for diverse lighting" },
                { icon: CreditCard, text: "Instant digital delivery via secure checkout" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-400">
                  <div className="p-1.5 bg-accent/10 rounded-lg text-accent">
                    <item.icon size={18} />
                  </div>
                  <p className="text-sm font-bold ui-font uppercase tracking-wide">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button 
                onClick={onAddToCart}
                className="group relative inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Add to Cart
              </button>
              
              <button 
                onClick={onBuyNow}
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 w-full">
                  {isBuying ? "Processing..." : "Buy Now — ₹1,499"} 
                  <ShoppingBag size={18} className="group-hover:translate-x-1 transition-transform font-bold" />
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="absolute -inset-4 bg-accent/20 blur-3xl opacity-20 rounded-full" />
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/5] bg-slate-900 rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1706803501715-8d0e4445e446?auto=format&fit=crop&w=800&q=80" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="Lens & Latitude limited edition travel photography presets and digital collection" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Limited Edition</p>
                <h3 className="text-white font-serif italic text-3xl">The 2026 Collection</h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(Ecosystem);
