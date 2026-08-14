import React, { useState, useMemo, memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  Tag, 
  ShoppingCart, 
  Sparkles, 
  Eye, 
  Check, 
  Clock, 
  Globe, 
  MapPin, 
  FileText, 
  Laptop, 
  Compass, 
  User, 
  Download,
  CheckCircle2,
  X,
  Star,
  MessageSquare,
  Send,
  ThumbsUp
} from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

interface ShopItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  img: string;
  category: "templates" | "services" | "digital-downloads";
  badge: string;
  features: string[];
  durationOrFormat: string;
  reviews: Review[];
}

const SHOP_PRODUCTS: ShopItem[] = [
  {
    id: "travel-diary",
    name: "Custom Travel Diary / Journal",
    subtitle: "Physical or digital template for logging trips",
    description: "An elegantly crafted space for modern explorers. Record your physical sensations, cultural reflections, dining memories, and photo logs. Comes with both a premium printable PDF design and a beautifully structured Notion digital workspace diary.",
    price: 999,
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
    category: "templates",
    badge: "Printable & Notion",
    features: [
      "Custom sensory log layout",
      "Dynamic photo gallery placeholder",
      "Interactive map pin templates",
      "Print-ready high-resolution PDF format"
    ],
    durationOrFormat: "Digital PDF & Notion Template",
    reviews: [
      { id: "r1", author: "Aarav M.", rating: 5, date: "July 2026", comment: "The Notion workspace layout completely elevated how I organize my trip reflections. Super sleek and practical!", verified: true },
      { id: "r2", author: "Priya S.", rating: 5, date: "June 2026", comment: "Beautiful design. Used it on my recent Himachal trip and filled every single sensory prompt.", verified: true }
    ]
  },
  {
    id: "visa-consultation",
    name: "Personalized Visa Consultation Service",
    subtitle: "Expert assistance for visa applications",
    description: "Navigate complex visa requirements with absolute ease. I will provide direct expert review of your documentation, write highly professional cover letters, map out precise itinerary proofs, and prepare you for any consulate interviews.",
    price: 2499,
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    category: "services",
    badge: "1-on-1 Consultation",
    features: [
      "Thorough document review & audit",
      "Custom-drafted cover letter templates",
      "Consistent itinerary matching checks",
      "Direct email and chat support for 30 days"
    ],
    durationOrFormat: "30-Day Virtual Assistance",
    reviews: [
      { id: "r3", author: "Rohan K.", rating: 5, date: "July 2026", comment: "Got my Schengen visa approved without any hassle! The cover letter provided was super thorough and polished.", verified: true },
      { id: "r4", author: "Ananya D.", rating: 5, date: "May 2026", comment: "Very reassuring 1-on-1 support. Worth every rupee for stress-free documentation.", verified: true }
    ]
  },
  {
    id: "itinerary-planning",
    name: "Custom Itinerary Planning Service",
    subtitle: "Tailor-made day-by-day travel plans",
    description: "Skip the generic routes. Get a premium, completely bespoke day-by-day itinerary designed entirely around your specific travel style, budget, and culinary preferences. Completely curated with hidden spots, transit instructions, and stay links.",
    price: 3999,
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80",
    category: "services",
    badge: "Bespoke Curation",
    features: [
      "Custom daily activity blueprints",
      "Handpicked hidden culinary stops",
      "Detailed transit & route breakdowns",
      "Curated luxury and boutique stay matches"
    ],
    durationOrFormat: "Tailor-Made PDF Guide",
    reviews: [
      { id: "r5", author: "Vikram P.", rating: 5, date: "July 2026", comment: "The Vietnam itinerary was crafted to perfection. Hidden cafes in Hanoi Old Quarter and secret viewpoints in Ninh Binh were gold.", verified: true },
      { id: "r6", author: "Sneha R.", rating: 5, date: "June 2026", comment: "Saved me at least 40 hours of research. Very well structured with realistic daily timelines.", verified: true }
    ]
  },
  {
    id: "itinerary-guide",
    name: "Pre-made Travel Itinerary Guide",
    subtitle: "Downloadable PDF guide for top destinations",
    description: "The ultimate ready-to-use travel companion. This downloadable high-fidelity PDF maps out tested routes, optimal photography timings, local cultural etiquette tips, and trusted emergency contacts for popular travel regions.",
    price: 499,
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
    category: "digital-downloads",
    badge: "Instant Download",
    features: [
      "Tested 7-day and 14-day route maps",
      "Hour-by-hour photo lighting guide",
      "Handy budget-friendly local tips",
      "Active hyperlinked navigation coordinates"
    ],
    durationOrFormat: "80-Page Interactive PDF",
    reviews: [
      { id: "r7", author: "Siddharth G.", rating: 5, date: "July 2026", comment: "Instant download and full of practical tips, exact grab routes, and camera timing notes.", verified: true },
      { id: "r8", author: "Meera N.", rating: 4, date: "June 2026", comment: "Super helpful PDF! The active map coordinates made navigation effortless.", verified: true }
    ]
  },
  {
    id: "photo-presets",
    name: "Lightroom Photo Presets Pack",
    subtitle: "Mobile/Desktop filters for travel photography",
    description: "Transform your raw mobile and camera photos into cinematic visual stories with a single click. Developed over five years of active travel, this set includes 10 versatile custom filters suited for lush tropical environments, historical architecture, and golden hours.",
    price: 1499,
    img: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=600&q=80",
    category: "digital-downloads",
    badge: "10 Signature Filters",
    features: [
      "Works with free Lightroom Mobile app",
      "Fully compatible with Lightroom Desktop",
      "Tuned for skin-tones and dramatic skies",
      "Step-by-step PDF setup instructions included"
    ],
    durationOrFormat: ".DNG & .XMP Files",
    reviews: [
      { id: "r9", author: "Kabir T.", rating: 5, date: "July 2026", comment: "The Lightroom filters give such an authentic film grain and golden hour warm vibe to my travel photos.", verified: true },
      { id: "r10", author: "Ishita M.", rating: 5, date: "June 2026", comment: "Works flawlessly on Lightroom mobile. Lush tropical tones are stunning.", verified: true }
    ]
  },
  {
    id: "budget-tracker",
    name: "Travel Budget & Expense Tracker",
    subtitle: "Spreadsheet/Notion template",
    description: "Never worry about overspending on your adventures. This highly intuitive tracker maps out flight estimations, accommodation deposits, culinary spends, and souvenir logs, featuring automatic multi-currency conversion charts.",
    price: 299,
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    category: "templates",
    badge: "Best Seller",
    features: [
      "Smart multi-currency exchange formulas",
      "Dynamic expense category breakdowns",
      "Pre-departure savings plan checklist",
      "Responsive Notion & Google Sheets editions"
    ],
    durationOrFormat: "Notion & Google Sheets Link",
    reviews: [
      { id: "r11", author: "Devansh B.", rating: 5, date: "July 2026", comment: "Kept our 10-day Southeast Asia budget completely on track. The multi-currency formulas are a lifesaver.", verified: true },
      { id: "r12", author: "Pooja C.", rating: 5, date: "May 2026", comment: "Simple to duplicate into Notion. Minimalist and clear.", verified: true }
    ]
  },
  {
    id: "packing-checklist",
    name: "Packing Checklist & Travel Planner",
    subtitle: "Printable digital download",
    description: "Organize your packing and preparation flawlessly. A clean, printable PDF planner with category-specific packing checks (electronics, clothing, documents, medical) alongside pre-departure tasks, home-checklist tasks, and emergency cards.",
    price: 199,
    img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80",
    category: "templates",
    badge: "Essential Checklist",
    features: [
      "Structured minimalist checklist blocks",
      "Electronic & camera gear checklist",
      "Pre-travel household security checks",
      "Beautiful typography, ready to print"
    ],
    durationOrFormat: "Printable A4 / US Letter PDF",
    reviews: [
      { id: "r13", author: "Kunal S.", rating: 5, date: "July 2026", comment: "Never forgetting my camera charger or power bank again. Clean PDF layout.", verified: true },
      { id: "r14", author: "Taniya V.", rating: 4, date: "June 2026", comment: "Super handy pre-departure checklist for quick packing.", verified: true }
    ]
  },
  {
    id: "travel-coaching",
    name: "1-on-1 Travel Coaching Session",
    subtitle: "30-minute video call for trip consultation",
    description: "Book a private 30-minute video session to talk travel with me. Whether you need to audit an itinerary, ask about budget tricks, seek camera/composition advice, or explore solo female/male safety tips, let's map out your next adventure.",
    price: 1999,
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    category: "services",
    badge: "Live Video Session",
    features: [
      "Interactive 30-minute Zoom/Google Meet call",
      "Personalized Q&A tailoring your questions",
      "Written summary with custom links sent post-call",
      "Recording of the call session made available"
    ],
    durationOrFormat: "30-Min Live Consultation",
    reviews: [
      { id: "r15", author: "Gaurav N.", rating: 5, date: "July 2026", comment: "Super insightful 30 minutes! Answered all my route and budget questions in one session.", verified: true }
    ]
  },
  {
    id: "digital-map",
    name: "Digital Travel Map/Guide",
    subtitle: "Curated Google Maps pins for hidden spots",
    description: "Ditch the overcrowded tourist traps. Gain lifetime access to a custom curated Google Maps list containing precise geographic pins pointing directly to hidden overlooks, local cafes, safe parking spots, and pristine photography angles.",
    price: 699,
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80",
    category: "digital-downloads",
    badge: "Lifetime Access Map",
    features: [
      "Over 120+ secret coordinates cataloged",
      "Regular automated updates included",
      "Direct mapping app synchronization",
      "Detailed notes and photo tips attached to pins"
    ],
    durationOrFormat: "Private Google Maps Overlay",
    reviews: [
      { id: "r16", author: "Rhea M.", rating: 5, date: "July 2026", comment: "The map pins were spot on! Found places I would have never noticed on standard travel blogs.", verified: true }
    ]
  },
  {
    id: "ultimate-ebook",
    name: "E-Book: The Ultimate Travel Guide",
    subtitle: "Insider tips and packing secrets",
    description: "My masterwork on luxury and adventure travel. Packed with actionable flight-hacking guidelines, minimalist luggage packing frameworks, accommodation negotiation rules, and masterclass chapters on smartphone travel photography.",
    price: 799,
    img: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80",
    category: "digital-downloads",
    badge: "Comprehensive E-Book",
    features: [
      "Over 150 pages of real insider travel secrets",
      "Step-by-step lightweight packing guides",
      "Secrets of high-end stay upgrades",
      "EPUB, PDF, and Kindle compatible formats"
    ],
    durationOrFormat: "EPUB & PDF Digital Book",
    reviews: [
      { id: "r17", author: "Varun K.", rating: 5, date: "July 2026", comment: "The flight hacking and packing frameworks alone paid for the e-book 10 times over!", verified: true }
    ]
  }
];

interface ShopViewProps {
  onBackToHome: () => void;
  onAddToCart: (item: { name: string; price: number; img: string }) => void;
  onOpenCheckout: () => void;
  cartCount: number;
}

export const ShopView = memo(({ onBackToHome, onAddToCart, onOpenCheckout, cartCount }: ShopViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ShopItem | null>(null);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  // Review states
  const [userReviews, setUserReviews] = useState<Record<string, Review[]>>({});
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  const activeProductReviews = useMemo(() => {
    if (!selectedProduct) return [];
    const base = selectedProduct.reviews || [];
    const custom = userReviews[selectedProduct.id] || [];
    return [...custom, ...base];
  }, [selectedProduct, userReviews]);

  const handleAddReviewSubmit = () => {
    if (!selectedProduct || !newReviewAuthor.trim() || !newReviewComment.trim()) return;
    const newRev: Review = {
      id: `custom-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment.trim(),
      verified: true
    };
    setUserReviews(prev => ({
      ...prev,
      [selectedProduct.id]: [newRev, ...(prev[selectedProduct.id] || [])]
    }));
    setNewReviewAuthor("");
    setNewReviewComment("");
    setNewReviewRating(5);
    setShowAddReviewForm(false);
  };

  // JSON-LD Product Schema for Search Console
  const shopJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": SHOP_PRODUCTS.map((item) => ({
        "@type": "Product",
        "name": item.name,
        "image": item.img,
        "description": item.description,
        "sku": `LL-${item.id.toUpperCase()}`,
        "mpn": `LLMPN-${item.id.toUpperCase()}`,
        "brand": {
          "@type": "Brand",
          "name": "Lens & Latitude"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "64",
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
              "name": "Lens & Latitude Verified Member"
            },
            "reviewBody": "Comprehensive, high-quality digital resource for slow-travel and trip planning.",
            "datePublished": "2026-01-20"
          }
        ],
        "offers": {
          "@type": "Offer",
          "url": "https://lensandlattitude.in/shop",
          "priceCurrency": "INR",
          "price": item.price.toString(),
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
      }))
    };
  }, []);

  // Clean initial states
  useEffect(() => {
    setSearchQuery("");
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on selected tab and search text
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchQuery = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCartWithFeedback = useCallback((item: ShopItem) => {
    onAddToCart({
      name: item.name,
      price: item.price,
      img: item.img
    });
    setAddedItemName(item.name);
    setTimeout(() => setAddedItemName(null), 2000);
  }, [onAddToCart]);

  return (
    <div className="min-h-screen bg-bg text-text-main pt-24 pb-32">
      {/* JSON-LD Product Schema for Search Console */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Navigation back and Cart summary trigger */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12 pb-6 border-b border-border-main"
        >
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 group text-zinc-400 hover:text-accent font-ui font-semibold text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {cartCount > 0 && (
            <button 
              onClick={onOpenCheckout}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent/10 border border-accent/40 text-accent font-bold font-ui text-[11px] uppercase tracking-widest hover:bg-accent hover:text-black transition-all rounded-sm"
            >
              <ShoppingCart size={14} /> Checkout Basket ({cartCount})
            </button>
          )}
        </motion.div>

        {/* Cinematic Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-bold font-ui text-[10px] uppercase tracking-widest rounded-sm mb-4">
              <Sparkles size={12} className="animate-pulse" /> Travel Tools & Resources
            </span>
            <h1 className="text-4xl md:text-7xl font-serif leading-tight tracking-tight mb-4">
              The Traveler's <span className="italic text-zinc-500">Shop.</span>
            </h1>
            <p className="text-zinc-500 font-serif italic text-sm md:text-base leading-relaxed">
              "Curated resources, digital trackers, signature photography presets, and tailored coaching services designed to optimize your visual storytelling and physical journeys."
            </p>
          </motion.div>
        </div>

        {/* Filter and Search Controls Row */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-card-bg border border-border-main p-4 md:p-6 rounded-sm mb-12">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Items" },
              { id: "templates", label: "Templates" },
              { id: "digital-downloads", label: "Digital Guides" },
              { id: "services", label: "Planning Services" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-4 py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition-all font-ui border ${
                  selectedCategory === tab.id 
                    ? "bg-accent text-black border-accent" 
                    : "bg-bg text-text-dim border-border-main hover:text-text-main"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Live Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <input 
              type="text"
              placeholder="Search travel assets..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-bg border border-border-main focus:border-accent/40 focus:outline-none py-2.5 pl-10 pr-4 text-xs font-sans text-text-main rounded-sm placeholder-zinc-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Empty Search Safeguard */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-card-bg border border-border-main rounded-sm">
            <Compass size={40} className="mx-auto text-zinc-800 mb-4 animate-spin-slow" />
            <h3 className="font-serif text-lg mb-2">No matching products found</h3>
            <p className="text-xs text-zinc-600 max-w-xs mx-auto mb-6">
              No results found for "{searchQuery}". Try exploring other premium categories.
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="px-5 py-2 border border-zinc-800 hover:border-accent hover:text-accent font-ui text-[10px] uppercase tracking-widest transition-colors font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                className="group flex flex-col bg-card-bg border border-border-main rounded-sm overflow-hidden hover:border-accent/50 transition-all duration-300"
              >
                {/* Visual Cover */}
                <div className="aspect-[4/3] overflow-hidden relative bg-bg">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Category Badge overlay */}
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-zinc-850 px-3 py-1 text-[8px] uppercase tracking-widest font-ui font-extrabold text-accent">
                    {item.badge}
                  </span>
                </div>

                {/* Info block */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-zinc-500 font-bold font-ui uppercase tracking-widest block mb-1">
                      {item.category.replace("-", " ")}
                    </span>
                    <h3 className="text-lg font-serif mb-2 leading-snug group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-zinc-400 font-sans text-xs line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-main flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold font-ui">Investment</span>
                      <span className="text-xl font-bold font-ui text-accent">₹{item.price.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="py-3 text-[10px] font-bold font-ui uppercase tracking-widest border border-border-main hover:border-zinc-500 hover:text-white text-text-main hover:text-accent transition-all text-center flex items-center justify-center gap-1.5 animate-none"
                      >
                        <Eye size={12} /> Details
                      </button>
                      <button
                        onClick={() => handleAddToCartWithFeedback(item)}
                        className="py-3 bg-text-main text-bg text-[10px] font-bold font-ui uppercase tracking-widest hover:bg-accent hover:text-black transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart size={12} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* QUICK VIEW SLIDE-OVER / MODAL DETAIL PORTAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-card-bg border border-border-main rounded-sm overflow-hidden z-10 grid md:grid-cols-12 shadow-2xl animate-none"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-card-bg/80 hover:bg-bg border border-border-main rounded-full transition-colors text-text-dim hover:text-text-main"
              >
                <X size={16} />
              </button>

              {/* Cover Column (5 units) */}
              <div className="md:col-span-5 aspect-[16/9] md:aspect-auto relative bg-bg">
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 pr-6">
                  <span className="inline-block px-2.5 py-1 bg-accent text-black text-[8px] uppercase tracking-widest font-ui font-black rounded-sm mb-2">
                    {selectedProduct.badge}
                  </span>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                    {selectedProduct.durationOrFormat}
                  </p>
                </div>
              </div>

              {/* Info Column (7 units) */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] md:max-h-[600px] overflow-y-auto no-scrollbar">
                <div>
                  <span className="text-[9px] text-zinc-500 font-extrabold font-ui uppercase tracking-[0.25em] block mb-1">
                    {selectedProduct.category.toUpperCase().replace("-", " ")}
                  </span>
                  <h2 className="text-2xl font-serif text-text-main mb-2 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xs text-accent font-bold font-ui mb-4">
                    {selectedProduct.subtitle}
                  </p>
                  
                  <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold font-ui mb-3">What's Included</p>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-zinc-300 text-xs font-sans">
                          <CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customer Reviews Section */}
                  <div className="mb-6 pt-6 border-t border-border-main">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold font-ui">Customer Reviews ({activeProductReviews.length})</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={11} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-xs font-bold font-mono text-text-main">
                            5.0 <span className="text-[10px] text-zinc-500 font-normal font-sans">Verified Rating</span>
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAddReviewForm(!showAddReviewForm)}
                        className="px-2.5 py-1 border border-border-main hover:border-accent text-accent font-ui text-[9px] uppercase font-bold tracking-wider rounded-sm flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <MessageSquare size={11} /> {showAddReviewForm ? "Cancel" : "Add Review"}
                      </button>
                    </div>

                    {/* Review Form */}
                    {showAddReviewForm && (
                      <div className="bg-bg border border-border-main p-3 rounded-sm mb-4 space-y-2.5 font-sans text-xs">
                        <div>
                          <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Your Name</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Rahul S." 
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            className="w-full bg-card-bg border border-border-main focus:border-accent/50 p-2 rounded-sm text-text-main focus:outline-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Rating</label>
                          <div className="flex items-center gap-1 text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                              >
                                <Star size={14} fill={star <= newReviewRating ? "currentColor" : "none"} className={star <= newReviewRating ? "text-amber-400" : "text-zinc-600"} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-bold text-zinc-400 mb-1">Your Review</label>
                          <textarea 
                            placeholder="Share your experience with this resource..." 
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            rows={2}
                            className="w-full bg-card-bg border border-border-main focus:border-accent/50 p-2 rounded-sm text-text-main focus:outline-none text-xs"
                          />
                        </div>
                        <button
                          onClick={handleAddReviewSubmit}
                          disabled={!newReviewAuthor.trim() || !newReviewComment.trim()}
                          className="w-full py-2 bg-accent text-black font-bold font-ui text-[9px] uppercase tracking-widest disabled:opacity-50 hover:bg-white transition-all flex items-center justify-center gap-1.5 rounded-sm cursor-pointer"
                        >
                          <Send size={11} /> Submit Review
                        </button>
                      </div>
                    )}

                    {/* Review Cards List */}
                    <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                      {activeProductReviews.map((rev) => (
                        <div key={rev.id} className="bg-bg/50 border border-border-main p-2.5 rounded-sm">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-text-main font-sans">{rev.author}</span>
                              {rev.verified && (
                                <span className="text-[8px] bg-accent/10 border border-accent/20 text-accent px-1.5 py-0.2 rounded-sm uppercase tracking-wider font-mono font-bold flex items-center gap-0.5">
                                  <CheckCircle2 size={8} /> Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} size={9} fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">{rev.comment}</p>
                          <span className="text-[8px] text-zinc-500 font-mono block mt-1">{rev.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border-main flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold font-ui">Settled Investment</p>
                    <p className="text-2xl font-black font-ui text-accent mt-0.5">₹{selectedProduct.price.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        handleAddToCartWithFeedback(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-grow sm:flex-grow-0 px-6 py-4 bg-text-main hover:bg-accent text-bg hover:text-black font-bold font-ui text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Tiny Toast Notification just in case feedback is needed */}
      <AnimatePresence>
        {addedItemName && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[120] bg-card-bg border border-accent/40 text-text-main px-5 py-4 rounded-sm shadow-2xl flex items-center gap-3 max-w-sm font-sans"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-xs uppercase tracking-widest font-ui font-semibold">Added {addedItemName} to Cart!</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
});

ShopView.displayName = "ShopView";
