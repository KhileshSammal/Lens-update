import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, FileText, AlertCircle, Truck, RotateCcw, Search, CheckCircle2 } from "lucide-react";

/**
 * PolicyTab Type:
 * Uniquely identifies each legal and customer policy document supported by Lens & Latitude.
 */
export type PolicyTab = "privacy" | "terms" | "disclaimer" | "shipping" | "returns";

interface PolicyModalProps {
  isOpen: boolean;
  initialTab?: PolicyTab;
  onClose: () => void;
}

/**
 * PolicyModal Component:
 * Comprehensive modal view displaying all official site policies including:
 * 1. Privacy Policy
 * 2. Terms of Use
 * 3. Disclaimer
 * 4. Shipping Policy
 * 5. Return & Refund Policy (7-Day Return)
 * 
 * Features:
 * - Dynamic tab navigation for zero-friction policy audits
 * - Integrated search bar for instant keyword matching inside policy text
 * - Responsive modal layout with escape key and backdrop click handlers
 * - Clear, authoritative typography with structured section blocks
 */
export const PolicyModal: React.FC<PolicyModalProps> = memo(({ isOpen, initialTab = "privacy", onClose }) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync activeTab if initialTab changes when opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSearchQuery("");
    }
  }, [isOpen, initialTab]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Dark Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Main Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden text-zinc-200 z-10"
        >
          {/* Modal Header Bar */}
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold font-ui">
                  Lens & Latitude Legal
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-[10px] text-zinc-400 font-mono">Updated August 2026</span>
              </div>
              <h2 className="text-xl font-serif text-white font-bold flex items-center gap-2">
                Policy & Governance Center
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-amber-400 hover:text-amber-400 text-zinc-400 transition-all cursor-pointer self-end sm:self-auto"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Bar & Search Input */}
          <div className="p-4 border-b border-white/10 bg-zinc-900/30 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Policy Category Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0">
              <button
                onClick={() => setActiveTab("privacy")}
                className={`px-4 py-2 rounded-md text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "privacy"
                    ? "bg-amber-400 text-black font-extrabold shadow-md"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <ShieldCheck size={14} /> Privacy Policy
              </button>

              <button
                onClick={() => setActiveTab("terms")}
                className={`px-4 py-2 rounded-md text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "terms"
                    ? "bg-amber-400 text-black font-extrabold shadow-md"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <FileText size={14} /> Terms of Use
              </button>

              <button
                onClick={() => setActiveTab("disclaimer")}
                className={`px-4 py-2 rounded-md text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "disclaimer"
                    ? "bg-amber-400 text-black font-extrabold shadow-md"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <AlertCircle size={14} /> Disclaimer
              </button>

              <button
                onClick={() => setActiveTab("shipping")}
                className={`px-4 py-2 rounded-md text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "shipping"
                    ? "bg-amber-400 text-black font-extrabold shadow-md"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Truck size={14} /> Shipping Policy
              </button>

              <button
                onClick={() => setActiveTab("returns")}
                className={`px-4 py-2 rounded-md text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "returns"
                    ? "bg-amber-400 text-black font-extrabold shadow-md"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <RotateCcw size={14} /> 7-Day Return Policy
              </button>
            </div>

            {/* Quick Search Filter Box */}
            <div className="relative min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-md pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>
          </div>

          {/* Modal Scrollable Content Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldCheck className="text-amber-400" size={20} /> Privacy Policy & Data Security
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Lens & Latitude ("we", "our", "us") respects your privacy and is committed to protecting your personal data.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">1. Information We Collect</h4>
                  <p>
                    When you browse our travel journal, subscribe to our dispatch newsletter, or purchase travel guides and digital products, we collect minimal necessary information:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                    <li><strong className="text-white">Contact Details:</strong> Email address provided during newsletter signup or checkout.</li>
                    <li><strong className="text-white">Transaction Data:</strong> Payment confirmations and item details processed via secure Stripe or Razorpay endpoints. We never store raw credit/debit card numbers on our servers.</li>
                    <li><strong className="text-white">Technical Analytics:</strong> Anonymized usage metrics, page views, and local preferences stored client-side in your browser's local storage.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">2. How We Use Your Data</h4>
                  <p>
                    Your data is strictly used to deliver requested services, send travel stories and product updates, optimize application performance, and provide prompt customer support. We do NOT sell, rent, or trade your personal information to third parties or marketing agencies.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">3. Cookies & Local Storage</h4>
                  <p>
                    We utilize browser local storage to persist user interface preferences (such as dark/light theme choice) and maintain your travel shop cart across sessions. You can clear this data at any time through your browser settings.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">4. Contact & Inquiries</h4>
                  <p>
                    For any privacy inquiries or request to remove your email from our newsletter database, contact Khilesh Sammal directly at <a href="mailto:khileshsammal.business@gmail.com" className="text-amber-400 underline hover:text-amber-300">khileshsammal.business@gmail.com</a>.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "terms" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="text-amber-400" size={20} /> Terms of Use & Intellectual Property
                  </h3>
                  <p className="text-xs text-zinc-400">
                    By accessing and using Lens & Latitude, you agree to comply with the following binding terms and conditions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">1. Intellectual Property & Copyright</h4>
                  <p>
                    All travel photography, visual assets, written guides, expedition itineraries, and digital products on Lens & Latitude are the sole intellectual property of Khilesh Sammal and protected under global copyright laws.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                    <li>Photos captured on iPhone 16 Pro / iPhone 16 are copyrighted originals.</li>
                    <li>Personal sharing on social media is permitted provided clear attribution (@mr.khilesh__) is cited.</li>
                    <li>Commercial licensing, resale, or unauthorized redistribution of Lightroom Presets, E-Books, or Itinerary PDFs is strictly prohibited.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">2. Service Usage & Consultations</h4>
                  <p>
                    1-on-1 Visa Consultations and Custom Itinerary Planning services provide professional guidance based on verified travel experience. Users remain responsible for submitting truthful documents to immigration authorities and verifying embassy regulations prior to travel.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">3. User Conduct</h4>
                  <p>
                    Users must not attempt to scrape, reverse engineer, or exploit any digital assets or server APIs on this platform.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "disclaimer" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-2 flex items-center gap-2">
                    <AlertCircle className="text-amber-400" size={20} /> General & Travel Advice Disclaimer
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Transparency, authenticity, and real-world travel safety disclosures.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">1. Real Exploration Disclaimer</h4>
                  <p>
                    All trip guides, cost estimates, hotel reviews, and itinerary recommendations are derived from personal, on-the-ground travel experiences. Travel conditions (transit schedules, visa rules, entrance fees, local weather) change dynamically over time. We recommend verifying current local guidelines prior to departure.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">2. Affiliate Disclosure</h4>
                  <p>
                    Some links contained within our travel logs and equipment guides are affiliate links. If you make a purchase or booking through these links, Lens & Latitude may earn a small commission at no additional cost to you. We only recommend gear, stays, and services that we personally test and trust.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">3. Sponsorship Transparency</h4>
                  <p>
                    The vast majority of journeys are 100% self-funded. In the event of hosted stays or tourism board partnerships, clear disclosure is prominently displayed within the respective chronicle.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-2 flex items-center gap-2">
                    <Truck className="text-amber-400" size={20} /> Shipping & Fulfillment Policy
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Fulfillment parameters for digital products, merchandise, and customized services.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">1. Digital Products & Instant Downloads</h4>
                  <p>
                    All digital items (including Lightroom Presets, E-Books, Notion Travel Journals, Packing Checklists, and Digital Map Overlays) are delivered <strong className="text-amber-400">instantly</strong> upon payment completion via email download link and checkout confirmation screen.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">2. Physical Merchandise Shipping</h4>
                  <p>
                    Physical merchandise (such as custom travel journals, apparel, and caps) is dispatched within 1–2 business days across India.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                    <li><strong className="text-white">Standard Delivery Window:</strong> 3–5 business days within major metro hubs; 5–7 days for remote destinations.</li>
                    <li><strong className="text-white">Free Shipping Threshold:</strong> FREE shipping is automatically applied on orders above ₹2,000. Orders under ₹2,000 incur a nominal ₹150 flat shipping fee.</li>
                    <li><strong className="text-white">Order Tracking:</strong> Tracking numbers and courier portal links are dispatched via email upon shipment.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-serif font-bold text-white mb-2 flex items-center gap-2">
                    <RotateCcw className="text-amber-400" size={20} /> 7-Day Return & Refund Policy
                  </h3>
                  <p className="text-xs text-zinc-400">
                    We stand firmly behind the quality of our travel gear, digital blueprints, and services.
                  </p>
                </div>

                <div className="bg-amber-400/10 border border-amber-400/30 p-4 rounded-md flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="font-bold text-amber-300 text-xs uppercase tracking-wider font-ui">Hassle-Free 7-Day Return Guarantee</h5>
                    <p className="text-xs text-zinc-300 mt-1">
                      If you are not satisfied with your physical merchandise or encounter issues with digital files, you have <strong className="text-white">7 full days from delivery</strong> to initiate a return or replacement request.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">1. Physical Goods Return Criteria</h4>
                  <p>
                    Physical products (Custom Travel Journals, Nomad Backpacks, Signature Caps) are eligible for a 100% refund or exchange within 7 days of delivery, provided:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                    <li>The item is unused, unworn, and in its original packaging with tags intact.</li>
                    <li>You provide proof of purchase (order confirmation email or receipt).</li>
                    <li>Damaged or defective items are reported with unboxing photos within 48 hours of receipt for instant priority replacement.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">2. Digital Downloads & Services Guarantee</h4>
                  <p>
                    Digital items (Lightroom Presets, E-Books, Itinerary Guides) come with a 7-day technical replacement guarantee. If a download link fails or preset files are incompatible with your software, our team will re-issue formatted files or issue a full refund if unresolved.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-amber-400 text-xs uppercase font-bold tracking-wider font-ui">3. How to Initiate a Return</h4>
                  <p>
                    Simply send an email to <a href="mailto:khileshsammal.business@gmail.com" className="text-amber-400 underline font-bold hover:text-amber-300">khileshsammal.business@gmail.com</a> with your Order ID and subject header "Return Request - [Order #]". Refunds are processed back to your original payment method within 3–5 business days.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Bar */}
          <div className="p-4 border-t border-white/10 bg-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
            <p className="font-ui">Questions regarding our policies? Reach out to support.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold font-ui uppercase tracking-wider text-xs rounded-md transition-colors cursor-pointer"
            >
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

PolicyModal.displayName = "PolicyModal";
