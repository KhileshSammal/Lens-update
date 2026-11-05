import React, { useState, useMemo, memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  ShoppingCart, 
  Eye, 
  Check, 
  Compass, 
  X, 
  Star, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  MapPin,
  Camera,
  BookOpen,
  Calendar,
  ShieldCheck,
  Zap,
  Globe2,
  RefreshCw,
  ShoppingBag
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
  category: "journals" | "presets" | "guides" | "consultation";
  badge: string;
  dispatchNo: string;
  testedAt: string;
  features: string[];
  durationOrFormat: string;
  reviews: Review[];
}

const SHOP_PRODUCTS: ShopItem[] = [
  {
    id: "travel-diary",
    name: "The Slow-Travel Field Journal",
    subtitle: "Sensory logbook & Notion expedition workspace",
    description: "An archival, tactile framework for deliberate explorers. Log light conditions, local cafe coordinates, cultural reflections, sensory observations, and photo metadata. Includes both high-resolution printable PDF spreads and a structured Notion workspace synced for offline mobile use.",
    price: 999,
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
    category: "journals",
    badge: "Notion + Printable PDF",
    dispatchNo: "LOG-01",
    testedAt: "Kumaon Himalayas & Southeast Asia",
    features: [
      "Sensory observation & cultural reflection templates",
      "Offline mobile Notion workspace with GPS sync",
      "Photo metadata, camera settings & film log",
      "Archival A5/A4 printable field spread format"
    ],
    durationOrFormat: "Notion Workspace & Print PDF",
    reviews: [
      { id: "r1", author: "Aarav M.", rating: 5, date: "July 2026", comment: "The Notion workspace layout completely elevated how I organize my trip reflections. Super sleek and practical!", verified: true },
      { id: "r2", author: "Priya S.", rating: 5, date: "June 2026", comment: "Beautiful design. Used it on my recent Himachal trip and filled every single sensory prompt.", verified: true }
    ]
  },
  {
    id: "photo-presets",
    name: "Signature 35mm Cinematic Presets",
    subtitle: "10 documentary Lightroom film profiles",
    description: "Master color grades calibrated over 5 years on mountain trails and tropical islands. Features deep film halation, gentle highlight roll-offs, natural skin tones, and rich organic greens tuned for tropical mist, desert twilight, and high-altitude mountain light.",
    price: 1499,
    img: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=800&q=80",
    category: "presets",
    badge: "10 Signature Grades",
    dispatchNo: "COL-02",
    testedAt: "Phuket, Ha Long & Western Ghats",
    features: [
      "10 Signature Desktop (.XMP) & Mobile (.DNG) profiles",
      "Engineered for natural skin-tones & moody greens",
      "One-click Lightroom Mobile free app installation",
      "Includes PDF calibration & exposure guide"
    ],
    durationOrFormat: "10 .DNG & .XMP Lightroom Files",
    reviews: [
      { id: "r9", author: "Kabir T.", rating: 5, date: "July 2026", comment: "The Lightroom filters give such an authentic film grain and golden hour warm vibe to my travel photos.", verified: true },
      { id: "r10", author: "Ishita M.", rating: 5, date: "June 2026", comment: "Works flawlessly on Lightroom mobile. Lush tropical tones are stunning.", verified: true }
    ]
  },
  {
    id: "digital-map",
    name: "Secret Overlooks & Waypoints Map",
    subtitle: "120+ Curated Google Maps Coordinates",
    description: "Bypass tourist congestion. Lifetime overlay access to 120+ verified geographic coordinates—including quiet sunrise ledges, hidden mountain tea shacks, local homestays, vehicle trailheads, and optimal golden-hour photography perches.",
    price: 699,
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
    category: "guides",
    badge: "120+ Live Waypoints",
    dispatchNo: "MAP-03",
    testedAt: "Uttarakhand, Kerala, Goa & Thailand",
    features: [
      "Over 120+ secret coordinates across 6 regions",
      "Exact photo timing & lighting notes per pin",
      "Direct 1-click sync to Google Maps on iOS & Android",
      "Continuous free updates as trails and access evolve"
    ],
    durationOrFormat: "Private Google Maps Overlay",
    reviews: [
      { id: "r16", author: "Rhea M.", rating: 5, date: "July 2026", comment: "The map pins were spot on! Found places I would have never noticed on standard travel blogs.", verified: true }
    ]
  },
  {
    id: "itinerary-guide",
    name: "The 80-Page Expedition Blueprint",
    subtitle: "Field-tested regional routes & logistics",
    description: "The comprehensive offline field companion. Contains step-by-step route breakdowns, bus & bike rental pick-up logistics, local etiquette warnings, emergency hospital locations, and daily transit schedules for seasoned and first-time adventurers.",
    price: 499,
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    category: "guides",
    badge: "80-Page Field Guide",
    dispatchNo: "GUIDE-04",
    testedAt: "Thailand, Malaysia & Northern India",
    features: [
      "Hour-by-hour route timing & optimal photo lighting",
      "Local transport, train, bus & bike rental contacts",
      "Offline interactive map links & emergency numbers",
      "Downloadable high-density PDF for phone & tablet"
    ],
    durationOrFormat: "Interactive Offline PDF",
    reviews: [
      { id: "r7", author: "Siddharth G.", rating: 5, date: "July 2026", comment: "Instant download and full of practical tips, exact grab routes, and camera timing notes.", verified: true },
      { id: "r8", author: "Meera N.", rating: 4, date: "June 2026", comment: "Super helpful PDF! The active map coordinates made navigation effortless.", verified: true }
    ]
  },
  {
    id: "ultimate-ebook",
    name: "The Art of Slow Travel & Field Craft",
    subtitle: "150-page definitive travel handbook",
    description: "My complete philosophy and practical playbook on independent exploration. Chapters cover minimal 7kg one-bag packing blueprints, flight hacking algorithms, negotiating respectful homestays, and documentary smartphone photography masterclasses.",
    price: 799,
    img: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80",
    category: "guides",
    badge: "Complete Handbook",
    dispatchNo: "BOOK-05",
    testedAt: "14,000km Overland Journeys",
    features: [
      "Over 150 pages of field-tested travel principles",
      "7kg ultra-light packing checklist & gear list",
      "Smartphone photography & composition masterclass",
      "Available in PDF, EPUB, and Kindle-ready formats"
    ],
    durationOrFormat: "EPUB, MOBI & PDF Editions",
    reviews: [
      { id: "r17", author: "Varun K.", rating: 5, date: "July 2026", comment: "The flight hacking and packing frameworks alone paid for the e-book 10 times over!", verified: true }
    ]
  },
  {
    id: "budget-tracker",
    name: "Expedition Budget & Expense Ledger",
    subtitle: "Multi-currency Notion & Sheets planner",
    description: "Track multi-country expeditions without math headaches. Features automatic live currency conversions, pre-departure fund targets, cash stash ledgers, daily street-food expense logs, and flight cost forecasting.",
    price: 299,
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    category: "journals",
    badge: "Multi-Currency",
    dispatchNo: "LEDG-06",
    testedAt: "Multi-Country Border Crossings",
    features: [
      "Automatic exchange rate calculations for 20+ currencies",
      "Dynamic daily burn rate & savings calculators",
      "Pre-departure visa, insurance & gear checklists",
      "Works seamlessly on Notion and Google Sheets"
    ],
    durationOrFormat: "Notion & Google Sheets Template",
    reviews: [
      { id: "r11", author: "Devansh B.", rating: 5, date: "July 2026", comment: "Kept our 10-day Southeast Asia budget completely on track. The multi-currency formulas are a lifesaver.", verified: true },
      { id: "r12", author: "Pooja C.", rating: 5, date: "May 2026", comment: "Simple to duplicate into Notion. Minimalist and clear.", verified: true }
    ]
  },
  {
    id: "packing-checklist",
    name: "Ultra-Light 7kg Packing Blueprint",
    subtitle: "Modular packing system for carry-on only",
    description: "Never check a bag again. A clean, modular packing framework designed for 7kg budget airline limits across tropical humidity and mountain chills. Categorized by camera electronics, merino layering, toiletries, and emergency medical kits.",
    price: 199,
    img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80",
    category: "journals",
    badge: "Carry-On Blueprint",
    dispatchNo: "PACK-07",
    testedAt: "Budget Airlines Across Southeast Asia",
    features: [
      "Modular 7kg weight budgeting matrix",
      "Weather-tested clothing layering formulas",
      "Drone, battery & camera cable checklist",
      "Printable quick-check card for your pack pocket"
    ],
    durationOrFormat: "Printable PDF & Notion Checklist",
    reviews: [
      { id: "r13", author: "Kunal S.", rating: 5, date: "July 2026", comment: "Never forgetting my camera charger or power bank again. Clean PDF layout.", verified: true },
      { id: "r14", author: "Taniya V.", rating: 4, date: "June 2026", comment: "Super handy pre-departure checklist for quick packing.", verified: true }
    ]
  },
  {
    id: "itinerary-planning",
    name: "Bespoke Expedition Itinerary Curation",
    subtitle: "Tailor-made day-by-day expedition route",
    description: "Avoid cookie-cutter tourist packages. Receive a 100% custom day-by-day expedition blueprint curated specifically for your travel dates, physical pace, photography goals, and culinary interests. Includes exact driver contacts, local stays, and hidden viewpoints.",
    price: 3999,
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    category: "consultation",
    badge: "Custom Curated",
    dispatchNo: "CONS-08",
    testedAt: "Himalayas, Indochina & Coastal India",
    features: [
      "Bespoke daily route schedule & realistic drive times",
      "Handpicked boutique homestays & mountain lodges",
      "Verified local bike/driver contacts & direct booking tips",
      "Delivered as an interactive private digital dossier"
    ],
    durationOrFormat: "Bespoke Private Dossier",
    reviews: [
      { id: "r5", author: "Vikram P.", rating: 5, date: "July 2026", comment: "The Vietnam itinerary was crafted to perfection. Hidden cafes in Hanoi Old Quarter and secret viewpoints in Ninh Binh were gold.", verified: true },
      { id: "r6", author: "Sneha R.", rating: 5, date: "June 2026", comment: "Saved me at least 40 hours of research. Very well structured with realistic daily timelines.", verified: true }
    ]
  },
  {
    id: "visa-consultation",
    name: "Independent Traveler Visa Strategy",
    subtitle: "1-on-1 documentation audit & cover letters",
    description: "Apply for complex tourist visas with complete confidence. Get a meticulous line-by-line review of your financial proofs, professionally drafted cover letter templates tailored to your travel history, and verified dummy itinerary structures for embassy review.",
    price: 2499,
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    category: "consultation",
    badge: "Doc Audit & Review",
    dispatchNo: "VISA-09",
    testedAt: "Schengen, UK, Japan & SE Asia",
    features: [
      "Complete document audit & financial proof review",
      "Custom tailored cover letter drafted for your profile",
      "Embassy-compliant day-by-day itinerary alignment",
      "30 days of direct WhatsApp/email support through decision"
    ],
    durationOrFormat: "30-Day Direct Support",
    reviews: [
      { id: "r3", author: "Rohan K.", rating: 5, date: "July 2026", comment: "Got my Schengen visa approved without any hassle! The cover letter provided was super thorough and polished.", verified: true },
      { id: "r4", author: "Ananya D.", rating: 5, date: "May 2026", comment: "Very reassuring 1-on-1 support. Worth every rupee for stress-free documentation.", verified: true }
    ]
  },
  {
    id: "travel-coaching",
    name: "1-on-1 Explorer Strategy Session",
    subtitle: "30-minute private video consultation",
    description: "A focused, private 30-minute consultation call with Khilesh Sammal. Audit your draft route, explore budget hacks, learn smartphone photography composition tricks, discuss solo travel safety, or refine packing strategies before departure.",
    price: 1999,
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    category: "consultation",
    badge: "Live Video Call",
    dispatchNo: "CALL-10",
    testedAt: "Live Interactive Mentorship",
    features: [
      "30-minute private 1-on-1 Google Meet/Zoom call",
      "Direct Q&A covering your route, gear & logistics",
      "Written post-call summary action plan with links",
      "Full call recording provided for your records"
    ],
    durationOrFormat: "30-Min Live Consultation",
    reviews: [
      { id: "r15", author: "Gaurav N.", rating: 5, date: "July 2026", comment: "Super insightful 30 minutes! Answered all my route and budget questions in one session.", verified: true }
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
          "ratingValue": "4.95",
          "reviewCount": "64",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://lensandlattitude.in/shop",
          "priceCurrency": "INR",
          "price": item.price.toString(),
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
      }))
    };
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
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCategory;
      const matchQuery = 
        product.name.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.testedAt.toLowerCase().includes(q) ||
        product.features.some(f => f.toLowerCase().includes(q));
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
    setTimeout(() => setAddedItemName(null), 2500);
  }, [onAddToCart]);

  return (
    <div className="min-h-screen bg-bg text-text-main pt-24 pb-32">
      {/* JSON-LD Product Schema for Search Console */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      
      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar & Cart Tracker */}
        <div className="flex justify-between items-center mb-10 pb-5 border-b border-border-main">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-text-dim hover:text-accent font-ui font-bold text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Dispatches</span>
          </button>

          {cartCount > 0 ? (
            <button 
              onClick={onOpenCheckout}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent text-black font-extrabold font-ui text-[11px] uppercase tracking-widest hover:bg-white transition-all rounded shadow-md cursor-pointer"
            >
              <ShoppingBag size={14} /> View Expedition Pack ({cartCount})
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-text-dim font-mono text-[11px] uppercase tracking-wider">
              <span>Pack Empty · Select Provisions</span>
            </div>
          )}
        </div>

        {/* Authentic Traveler Outpost Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <span className="text-accent uppercase tracking-[0.3em] text-[10px] md:text-xs font-extrabold mb-3 block font-ui">
            Expedition Provisions · Field Atelier
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.08] mb-5">
            The Traveler's <span className="italic text-text-dim">Outpost.</span>
          </h1>
          <p className="text-text-dim font-serif italic text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            "Tactile field journals, cinematic 35mm Lightroom color profiles, offline topographic coordinates, and bespoke route consultations engineered from thousands of kilometers across rugged mountains and coastal archipelagoes."
          </p>
        </div>

        {/* Traveler's Field Trust Strip (4 Pillars) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          <div className="p-4 sm:p-5 rounded border border-border-main bg-card-bg/60 flex flex-col justify-between">
            <div className="flex items-center gap-2.5 mb-2 text-accent">
              <Compass size={18} />
              <span className="font-ui font-bold text-[11px] uppercase tracking-wider text-text-main">Tested on Trail</span>
            </div>
            <p className="text-[11px] text-text-dim font-sans leading-relaxed">
              Validated on remote routes across Uttarakhand, Kerala, Thailand & Vietnam.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded border border-border-main bg-card-bg/60 flex flex-col justify-between">
            <div className="flex items-center gap-2.5 mb-2 text-accent">
              <Zap size={18} />
              <span className="font-ui font-bold text-[11px] uppercase tracking-wider text-text-main">Instant Pack Access</span>
            </div>
            <p className="text-[11px] text-text-dim font-sans leading-relaxed">
              Immediate offline sync to Notion, printable PDFs, Google Maps & Lightroom.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded border border-border-main bg-card-bg/60 flex flex-col justify-between">
            <div className="flex items-center gap-2.5 mb-2 text-accent">
              <Camera size={18} />
              <span className="font-ui font-bold text-[11px] uppercase tracking-wider text-text-main">Direct Explorer Craft</span>
            </div>
            <p className="text-[11px] text-text-dim font-sans leading-relaxed">
              Every preset, guide & template authored personally by Khilesh Sammal.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded border border-border-main bg-card-bg/60 flex flex-col justify-between">
            <div className="flex items-center gap-2.5 mb-2 text-accent">
              <RefreshCw size={18} />
              <span className="font-ui font-bold text-[11px] uppercase tracking-wider text-text-main">Lifetime Revisions</span>
            </div>
            <p className="text-[11px] text-text-dim font-sans leading-relaxed">
              Free coordinate and guide revisions as trails and local rules evolve.
            </p>
          </div>
        </div>

        {/* Filter Tabs & Live Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-card-bg border border-border-main p-3 sm:p-4 rounded mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {[
              { id: "all", label: "All Provisions (10)" },
              { id: "journals", label: "Field Journals & Logs" },
              { id: "presets", label: "Film Presets" },
              { id: "guides", label: "Route Maps & Guides" },
              { id: "consultation", label: "Route Consultations" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-3.5 py-2 text-[11px] uppercase font-bold tracking-wider rounded transition-all font-ui cursor-pointer ${
                  selectedCategory === tab.id 
                    ? "bg-accent text-black shadow-sm font-extrabold" 
                    : "bg-bg/60 text-text-dim hover:text-text-main hover:bg-bg border border-border-main/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim" size={15} />
            <input 
              type="text"
              placeholder="Search by route, gear, format..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-bg border border-border-main focus:border-accent focus:outline-none py-2 pl-10 pr-9 text-xs font-sans text-text-main rounded placeholder-text-dim/60 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-main cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-card-bg border border-border-main rounded">
            <Compass size={40} className="mx-auto text-accent mb-4 animate-spin-slow" />
            <h3 className="font-serif text-xl mb-2">No Provisions Matching Your Query</h3>
            <p className="text-xs text-text-dim max-w-sm mx-auto mb-6">
              No provisions found for "{searchQuery}". Clear your search query or explore another category.
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="px-6 py-2.5 bg-accent text-black font-ui text-[10px] uppercase tracking-widest font-bold rounded cursor-pointer hover:bg-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Products Grid: 3 columns desktop, 2 tablet, 1 mobile */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.25) }}
                className="group flex flex-col bg-card-bg border border-border-main rounded hover:border-accent hover:shadow-xl hover:shadow-black/5 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Cover with Provenance Tag */}
                <div className="aspect-[4/3] overflow-hidden relative bg-black/40">
                  <img 
                    src={item.img} 
                    alt={`Photograph for ${item.name}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Top Provenance Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[9px] font-mono font-bold tracking-wider text-white">
                    <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 uppercase text-accent">
                      {item.dispatchNo}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Tested Location Stamp */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
                    <span className="text-[10px] font-sans flex items-center gap-1.5 opacity-90 drop-shadow">
                      <MapPin size={11} className="text-accent" /> {item.testedAt}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata: Category & Format */}
                    <div className="flex items-center gap-2 text-[10px] text-text-dim uppercase tracking-wider font-mono font-semibold mb-2">
                      <span className="text-accent">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.durationOrFormat}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-1.5 leading-snug group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs font-ui font-semibold text-accent/90 mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-text-dim font-sans text-xs line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Key Field Inclusions */}
                    <ul className="space-y-1.5 mb-5 border-t border-border-main/50 pt-3">
                      {item.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-text-dim font-sans">
                          <CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-border-main">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-text-dim font-mono font-bold">Explorer Rate</span>
                      <span className="text-2xl font-bold font-ui text-text-main tabular-nums">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="py-2.5 px-3 text-[11px] font-bold font-ui uppercase tracking-wider border border-border-main hover:border-accent text-text-main hover:text-accent transition-all text-center flex items-center justify-center gap-1.5 rounded cursor-pointer"
                      >
                        <Eye size={13} /> Dossier
                      </button>
                      <button
                        onClick={() => handleAddToCartWithFeedback(item)}
                        className="py-2.5 px-3 bg-accent text-black font-extrabold font-ui text-[11px] uppercase tracking-wider hover:bg-white transition-all text-center flex items-center justify-center gap-1.5 rounded cursor-pointer shadow-sm"
                      >
                        <ShoppingBag size={13} /> Pack Item
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

            {/* Modal Body: Expedition Dossier */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-card-bg border border-border-main rounded overflow-hidden z-10 grid md:grid-cols-12 shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                aria-label="Close dossier modal"
                className="absolute top-4 right-4 z-20 p-2 bg-card-bg/90 hover:bg-bg border border-border-main rounded-full transition-colors text-text-dim hover:text-text-main cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Cover Column (5 units) */}
              <div className="md:col-span-5 aspect-[16/9] md:aspect-auto relative bg-black/50">
                <img 
                  src={selectedProduct.img} 
                  alt={`Detailed product visual of ${selectedProduct.name}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 bg-accent text-black text-[9px] uppercase tracking-widest font-ui font-black rounded mb-2">
                    {selectedProduct.badge}
                  </span>
                  <p className="text-xs font-mono font-bold text-white/90">
                    {selectedProduct.durationOrFormat}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-sans mt-1 flex items-center gap-1">
                    <MapPin size={11} className="text-accent" /> {selectedProduct.testedAt}
                  </p>
                </div>
              </div>

              {/* Info Column (7 units) */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] md:max-h-[620px] overflow-y-auto no-scrollbar">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-text-dim mb-1 font-bold">
                    <span className="text-accent">{selectedProduct.dispatchNo}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProduct.category.toUpperCase()}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-main mb-1.5 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xs text-accent font-bold font-ui mb-4">
                    {selectedProduct.subtitle}
                  </p>
                  
                  <p className="text-text-dim text-xs font-sans leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Included Pack Features */}
                  <div className="mb-6 p-4 rounded bg-bg border border-border-main/60">
                    <p className="text-[10px] uppercase tracking-wider text-text-dim font-bold font-ui mb-3">What's In Your Pack</p>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-text-main text-xs font-sans">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customer Reviews Section */}
                  <div className="mb-6 pt-5 border-t border-border-main">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold font-ui">Explorer Reviews ({activeProductReviews.length})</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={11} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-xs font-bold font-mono text-text-main">
                            5.0 <span className="text-[10px] text-text-dim font-normal font-sans">Verified Explorers</span>
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAddReviewForm(!showAddReviewForm)}
                        className="px-2.5 py-1 border border-border-main hover:border-accent text-accent font-ui text-[9px] uppercase font-bold tracking-wider rounded flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <MessageSquare size={11} /> {showAddReviewForm ? "Cancel" : "Add Field Note"}
                      </button>
                    </div>

                    {/* Review Form */}
                    {showAddReviewForm && (
                      <div className="bg-bg border border-border-main p-3 rounded mb-4 space-y-2.5 font-sans text-xs">
                        <div>
                          <label className="block text-[9px] uppercase font-bold text-text-dim mb-1">Your Name</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Rahul S." 
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            className="w-full bg-card-bg border border-border-main focus:border-accent/50 p-2 rounded text-text-main focus:outline-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-bold text-text-dim mb-1">Rating</label>
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
                          <label className="block text-[9px] uppercase font-bold text-text-dim mb-1">Your Field Experience</label>
                          <textarea 
                            placeholder="Share how this provision assisted your journey..." 
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            rows={2}
                            className="w-full bg-card-bg border border-border-main focus:border-accent/50 p-2 rounded text-text-main focus:outline-none text-xs"
                          />
                        </div>
                        <button
                          onClick={handleAddReviewSubmit}
                          disabled={!newReviewAuthor.trim() || !newReviewComment.trim()}
                          className="w-full py-2 bg-accent text-black font-bold font-ui text-[9px] uppercase tracking-widest disabled:opacity-50 hover:bg-white transition-all flex items-center justify-center gap-1.5 rounded cursor-pointer"
                        >
                          <Send size={11} /> Submit Field Review
                        </button>
                      </div>
                    )}

                    {/* Review Cards List */}
                    <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                      {activeProductReviews.map((rev) => (
                        <div key={rev.id} className="bg-bg/60 border border-border-main p-2.5 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-text-main font-sans">{rev.author}</span>
                              {rev.verified && (
                                <span className="text-[8px] bg-accent/10 border border-accent/20 text-accent px-1.5 py-0.5 rounded uppercase tracking-wider font-mono font-bold flex items-center gap-0.5">
                                  <CheckCircle2 size={8} /> Verified Explorer
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} size={9} fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <p className="text-[11px] text-text-dim font-sans leading-relaxed">{rev.comment}</p>
                          <span className="text-[8px] text-text-dim/60 font-mono block mt-1">{rev.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer CTA */}
                <div className="pt-5 border-t border-border-main flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-center sm:text-left">
                    <p className="text-[9px] uppercase tracking-widest text-text-dim font-bold font-ui">Settled Investment</p>
                    <p className="text-2xl font-black font-ui text-accent mt-0.5">₹{selectedProduct.price.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        handleAddToCartWithFeedback(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-accent hover:bg-white text-black font-extrabold font-ui text-[11px] uppercase tracking-widest transition-all rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <ShoppingBag size={14} /> Pack This Provision
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Toast Feedback */}
      <AnimatePresence>
        {addedItemName && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[120] bg-card-bg border border-accent/50 text-text-main px-5 py-4 rounded shadow-2xl flex items-center gap-3.5 max-w-sm font-sans"
          >
            <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <ShoppingBag size={15} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-ui font-bold text-accent">Packed in Gear Bag</p>
              <p className="text-xs text-text-main line-clamp-1">{addedItemName}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
});

ShopView.displayName = "ShopView";
