import React, { memo, useEffect } from "react";
import { 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  Truck, 
  RotateCcw, 
  ArrowLeft, 
  ChevronRight, 
  Mail, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  ExternalLink,
  Lock,
  Compass,
  FileCheck
} from "lucide-react";
import { AppView } from "../utils/routerSeo";

export type PolicyPageType = 
  | "privacy-policy" 
  | "terms-of-use" 
  | "disclaimer" 
  | "shipping-policy" 
  | "return-policy";

interface PolicyPageViewProps {
  policyType: PolicyPageType;
  onNavigate: (view: AppView) => void;
}

interface PolicyMeta {
  type: PolicyPageType;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  lastUpdated: string;
}

const POLICIES: PolicyMeta[] = [
  {
    type: "privacy-policy",
    title: "Privacy Policy & Data Protection",
    shortTitle: "Privacy Policy",
    badge: "DPDPA & GDPR Compliant",
    description: "How Lens & Latitude collects, encrypts, and handles your personal information, newsletter subscriptions, and transaction telemetry.",
    icon: ShieldCheck,
    lastUpdated: "August 20, 2026"
  },
  {
    type: "terms-of-use",
    title: "Terms of Use & Intellectual Property",
    shortTitle: "Terms of Use",
    badge: "Legal Terms & Copyright",
    description: "Official legal terms governing website access, photography licensing, custom itinerary planning services, and digital downloads.",
    icon: FileText,
    lastUpdated: "August 20, 2026"
  },
  {
    type: "disclaimer",
    title: "Travel & Affiliate Disclaimer",
    shortTitle: "Disclaimer",
    badge: "Transparency Disclosure",
    description: "On-the-ground exploration disclosures, safety advisories, real-world trip variability, and affiliate partnership transparency.",
    icon: AlertCircle,
    lastUpdated: "August 20, 2026"
  },
  {
    type: "shipping-policy",
    title: "Shipping & Fulfillment Policy",
    shortTitle: "Shipping Policy",
    badge: "Instant Delivery & Logistics",
    description: "Fulfillment schedules and transit timelines for instant digital guides, photography presets, and physical travel merchandise.",
    icon: Truck,
    lastUpdated: "August 20, 2026"
  },
  {
    type: "return-policy",
    title: "7-Day Return & Refund Guarantee",
    shortTitle: "7-Day Return Policy",
    badge: "100% Satisfaction Guarantee",
    description: "Comprehensive 7-day return, exchange, and refund terms for physical travel gear, custom journals, and digital download guarantees.",
    icon: RotateCcw,
    lastUpdated: "August 20, 2026"
  }
];

export const PolicyPageView = memo(({ policyType, onNavigate }: PolicyPageViewProps) => {
  const currentPolicy = POLICIES.find(p => p.type === policyType) || POLICIES[0];
  const IconComponent = currentPolicy.icon;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [policyType]);

  return (
    <div className="min-h-screen bg-bg text-text-main font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-text-dim mb-8 font-ui">
          <button 
            onClick={() => onNavigate("home")} 
            className="hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={13} /> Home
          </button>
          <ChevronRight size={12} className="text-text-dim/50" />
          <span className="text-text-dim/70">Legal & Governance</span>
          <ChevronRight size={12} className="text-text-dim/50" />
          <span className="text-accent font-semibold">{currentPolicy.shortTitle}</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-card-bg border border-border-main rounded-2xl p-6 sm:p-10 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-bold font-ui uppercase tracking-wider">
              <IconComponent size={14} />
              <span>{currentPolicy.badge}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-dim font-mono">
              <Clock size={13} />
              <span>Last Revised: {currentPolicy.lastUpdated}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-main tracking-tight mb-4">
            {currentPolicy.title}
          </h1>

          <p className="text-text-dim text-sm sm:text-base max-w-3xl leading-relaxed font-sans">
            {currentPolicy.description}
          </p>
        </div>

        {/* Policy Tab Switcher */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-10 border-b border-border-main/60">
          {POLICIES.map((p) => {
            const isActive = p.type === policyType;
            const TabIcon = p.icon;
            return (
              <button
                key={p.type}
                onClick={() => onNavigate(p.type as AppView)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-accent text-black font-extrabold shadow-md scale-[1.02]"
                    : "bg-card-bg border border-border-main text-text-dim hover:text-text-main hover:border-accent/40"
                }`}
              >
                <TabIcon size={14} />
                <span>{p.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body Grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Main Legal Content */}
          <article className="lg:col-span-8 space-y-10 text-text-main leading-relaxed">
            
            {/* PRIVACY POLICY CONTENT */}
            {policyType === "privacy-policy" && (
              <div className="space-y-8 text-sm sm:text-base">
                
                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">01.</span> Scope & Commitment
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Lens & Latitude (operated by Khilesh Sammal, accessible at <strong className="text-text-main">https://lensandlattitude.in</strong>) is committed to protecting the privacy and personal data of every traveler, subscriber, and customer who visits our platform. This policy explains our data handling practices in compliance with global standards, including the Indian Digital Personal Data Protection Act (DPDPA) and the General Data Protection Regulation (GDPR).
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">02.</span> Information We Collect
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    We adhere strictly to data minimization principles. We only collect information necessary to provide our travel chronicles, digital guides, shop merchandise, and email dispatches:
                  </p>
                  <ul className="space-y-3 pl-4 border-l-2 border-accent/40 text-text-dim text-sm sm:text-base">
                    <li>
                      <strong className="text-text-main">Newsletter Subscription Data:</strong> When you subscribe to "Join the Journey", we record your email address to deliver curated expedition stories and guide updates.
                    </li>
                    <li>
                      <strong className="text-text-main">Order & Transaction Information:</strong> When you purchase merchandise, digital presets, or custom itineraries, we collect your name, billing/shipping address, and email address.
                    </li>
                    <li>
                      <strong className="text-text-main">Payment Card Security:</strong> All financial transactions are processed securely through PCI-DSS Level 1 certified gateways (Stripe and Razorpay). We <span className="text-accent font-semibold">never</span> store, log, or possess access to raw credit card numbers or banking passwords on our servers.
                    </li>
                    <li>
                      <strong className="text-text-main">Technical & Device Telemetry:</strong> Anonymized browser type, screen resolution, referral path, and operating system data to optimize layout performance across mobile and desktop devices.
                    </li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">03.</span> Zero-Sale Policy
                  </h2>
                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 flex items-start gap-3.5">
                    <Lock className="text-accent shrink-0 mt-1" size={20} />
                    <p className="text-text-dim text-sm leading-relaxed">
                      <strong className="text-text-main font-bold">We do not sell, rent, monetize, or trade your personal information</strong> with third-party advertisers, data brokers, or marketing consortiums under any circumstance. Your email is used exclusively for Lens & Latitude communications.
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">04.</span> Cookies & Local Browser Storage
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Lens & Latitude uses browser local storage (`localStorage`) solely for functional client-side preferences:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-text-dim">
                    <li>Remembering your selected UI theme (Dark/Light mode).</li>
                    <li>Preserving items in your travel gear shopping cart across sessions.</li>
                    <li>Remembering your email subscription status to avoid repeated popups.</li>
                  </ul>
                  <p className="text-text-dim text-sm">
                    You may clear your browser cookies and local storage cache at any time via your browser settings.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">05.</span> Your Privacy Rights & Deletion
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    You retain full ownership of your data. You have the absolute right to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-text-dim">
                    <li>Request a copy of any personal data stored about you.</li>
                    <li>Unsubscribe instantly from any dispatch email by clicking "Unsubscribe" or requesting removal.</li>
                    <li>Request complete and permanent deletion of your customer record from our servers.</li>
                  </ul>
                  <p className="text-text-dim leading-relaxed">
                    To exercise any of these rights, email Khilesh Sammal at <a href="mailto:khileshsammal.business@gmail.com" className="text-accent underline font-medium hover:text-accent/80">khileshsammal.business@gmail.com</a>. Requests are fulfilled within 48 business hours.
                  </p>
                </section>

              </div>
            )}

            {/* TERMS OF USE CONTENT */}
            {policyType === "terms-of-use" && (
              <div className="space-y-8 text-sm sm:text-base">
                
                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">01.</span> Agreement to Terms
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    By browsing, reading, accessing, or purchasing products on Lens & Latitude (https://lensandlattitude.in), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must refrain from using the platform.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">02.</span> Intellectual Property & Copyright
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    All content featured on Lens & Latitude — including but not limited to original travel photography (captured with iPhone 16 Pro and professional camera equipment), written expedition logs, cultural narratives, custom map overlays, downloadable PDFs, and source code — is the exclusive intellectual property of Khilesh Sammal and protected under Indian and international copyright laws.
                  </p>
                  <div className="p-4 rounded-xl bg-card-bg border border-border-main space-y-2">
                    <h3 className="text-sm font-bold text-accent uppercase tracking-wider font-ui">Permitted & Prohibited Use:</h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-text-dim text-sm">
                      <li><strong className="text-text-main">Personal Non-Commercial Sharing:</strong> You are welcome to share snippets or links to articles on social channels provided clear and prominent attribution is given to <strong className="text-text-main">Khilesh Sammal (@mr.khilesh__)</strong> and a direct link back to https://lensandlattitude.in is included.</li>
                      <li><strong className="text-text-main">Commercial Resale Prohibited:</strong> You may not copy, reproduce, resell, redistribute, sub-license, or upload our Lightroom Presets, E-Books, or Notion Blueprints to file-sharing networks or commercial repositories.</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">03.</span> Bespoke Planning & Visa Consultation Services
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Custom itinerary planning blueprints and visa preparation advisory services provide professional guidance based on firsthand expedition experience and current consular requirements. 
                  </p>
                  <p className="text-text-dim leading-relaxed">
                    While we maintain rigorous accuracy in routing and documentation tips, travelers remain solely responsible for ensuring the validity of their personal passports, adhering to consular submission timelines, and obtaining necessary travel health insurance.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">04.</span> Platform Integrity & User Conduct
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    You agree not to use automated scripts, web crawlers, scrapers, or exploits to siphon content, prices, or imagery from this website, nor engage in any activity that disrupts server availability or user experience.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">05.</span> Limitation of Liability & Governing Law
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Lens & Latitude shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of information, digital downloads, or travel itineraries published on this platform. These Terms shall be governed by and construed in accordance with the laws of India.
                  </p>
                </section>

              </div>
            )}

            {/* DISCLAIMER CONTENT */}
            {policyType === "disclaimer" && (
              <div className="space-y-8 text-sm sm:text-base">
                
                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">01.</span> Real-World Travel Dynamics
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    All guides, budgets, accommodation recommendations, transit schedules, and route blueprints on Lens & Latitude are based on personal, firsthand journeys undertaken by Khilesh Sammal. 
                  </p>
                  <p className="text-text-dim leading-relaxed">
                    Travel conditions change dynamically over time. Currency exchange rates, ticket prices, visa application fees, flight timetables, cafe hours, ferry schedules, and local safety rules may shift without notice. We strongly recommend cross-verifying active government regulations, flight schedules, and weather forecasts immediately prior to departure.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">02.</span> Adventure Safety & Personal Responsibility
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Certain expeditions documented on this website involve outdoor adventures, including subterranean limestone cave exploration (Patal Bhuvaneshwar), grade IV white water rafting and cliff jumping (Rishikesh), high-altitude trekking (Himalayas), scooter touring (Southeast Asia), and ocean surfing (Mulki).
                  </p>
                  <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-3.5">
                    <AlertCircle className="text-amber-400 shrink-0 mt-1" size={20} />
                    <p className="text-text-dim text-sm leading-relaxed">
                      <strong className="text-text-main">Assumption of Risk:</strong> Engaging in adventure travel carries inherent risks. Readers are urged to evaluate their personal fitness levels, hire certified local guides where appropriate, wear certified protective equipment (life jackets, helmets), and maintain active international travel insurance covering emergency medical evacuation.
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">03.</span> Affiliate Transparency & Commissions
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    In strict compliance with FTC guidelines and transparency best practices: Some links contained in our travel journals, equipment lists, and stay recommendations are affiliate links (e.g., Booking.com, Agoda, Amazon Associates, SafetyWing).
                  </p>
                  <p className="text-text-dim leading-relaxed">
                    If you click through and complete a booking or purchase, Lens & Latitude may earn a modest referral commission at <strong className="text-text-main">zero extra cost to you</strong>. We only recommend gear, stays, and services that we have personally tested, relied upon in the field, and genuinely trust.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">04.</span> 100% Self-Funded Expedition Ethos
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    The overwhelming majority of our expeditions are 100% self-funded to ensure unbiased, unfiltered commentary. In the rare event of a sponsored expedition, hosted stay, or tourism board collaboration, full and prominent disclosure is placed at the top of the respective chronicle.
                  </p>
                </section>

              </div>
            )}

            {/* SHIPPING & FULFILLMENT CONTENT */}
            {policyType === "shipping-policy" && (
              <div className="space-y-8 text-sm sm:text-base">
                
                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">01.</span> Digital Products & Instant Fulfillment
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    All digital items purchased on Lens & Latitude are fulfilled <strong className="text-accent font-bold">instantly and automatically</strong> upon successful checkout:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-card-bg border border-border-main space-y-1.5">
                      <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider font-ui">
                        <CheckCircle2 size={15} /> Instant On-Screen Download
                      </div>
                      <p className="text-text-dim text-xs leading-relaxed">
                        A direct high-speed download link is provided on your order confirmation page immediately after payment.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-card-bg border border-border-main space-y-1.5">
                      <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider font-ui">
                        <Mail size={15} /> Backup Email Dispatch
                      </div>
                      <p className="text-text-dim text-xs leading-relaxed">
                        A permanent download link and PDF receipt are sent to your provided email address within 60 seconds.
                      </p>
                    </div>
                  </div>
                  <p className="text-text-dim text-xs">
                    * Eligible digital items: Lightroom Preset Packs, Southeast Asia Travel E-Books, Notion Expedition Planners, Offline GPS Map Pins, and Packing Blueprint Checklists.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">02.</span> Physical Merchandise Dispatch & Logistics
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Physical explorer merchandise (Nomad Canvas Backpacks, Signature Explorer Caps, Hardcover Travel Journals, Limited Edition Archival Photo Prints) is packed with eco-conscious protective materials and dispatched from our fulfillment hub.
                  </p>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-text-main uppercase tracking-wider font-ui">Domestic Delivery Timelines (India):</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-border-main rounded-lg overflow-hidden">
                        <thead className="bg-card-bg text-accent font-ui uppercase tracking-wider">
                          <tr>
                            <th className="p-3 border-b border-border-main">Region</th>
                            <th className="p-3 border-b border-border-main">Transit Window</th>
                            <th className="p-3 border-b border-border-main">Courier Partners</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-main/50 text-text-dim font-sans">
                          <tr>
                            <td className="p-3 font-medium text-text-main">Metro Cities (Delhi NCR, Mumbai, Bengaluru, etc.)</td>
                            <td className="p-3">2–4 Business Days</td>
                            <td className="p-3">BlueDart, Delhivery Air</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium text-text-main">Rest of India & Tier-2 Hubs</td>
                            <td className="p-3">4–6 Business Days</td>
                            <td className="p-3">Delhivery, DTDC Express</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-medium text-text-main">Remote / Himalayan / Island Locations</td>
                            <td className="p-3">6–8 Business Days</td>
                            <td className="p-3">India Post Speed Post, DTDC</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">03.</span> Shipping Charges & Free Delivery Threshold
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-text-dim">
                    <li><strong className="text-text-main">Free Shipping:</strong> Automatically applied to all physical orders totaling <span className="text-accent font-semibold">₹2,000 or above</span> across India.</li>
                    <li><strong className="text-text-main">Standard Shipping:</strong> Orders below ₹2,000 incur a flat ₹150 nominal logistics fee.</li>
                    <li><strong className="text-text-main">Digital Guides:</strong> 100% Free instant delivery worldwide with zero shipping charges.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">04.</span> Order Tracking & Damaged Transit Protocols
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Upon courier dispatch, an email and SMS containing your live AWB tracking number and tracking portal link will be triggered.
                  </p>
                  <p className="text-text-dim leading-relaxed">
                    If your parcel arrives with visible packaging damage or tampered seals, please document the package with 2–3 photos and email us at <a href="mailto:khileshsammal.business@gmail.com" className="text-accent underline font-medium">khileshsammal.business@gmail.com</a> within 48 hours for an instant priority replacement.
                  </p>
                </section>

              </div>
            )}

            {/* RETURN & REFUND POLICY CONTENT */}
            {policyType === "return-policy" && (
              <div className="space-y-8 text-sm sm:text-base">
                
                <div className="p-5 rounded-xl bg-accent/10 border border-accent/30 flex items-start gap-4">
                  <RotateCcw className="text-accent shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-accent text-sm uppercase tracking-wider font-ui">
                      Hassle-Free 7-Day Return Guarantee
                    </h3>
                    <p className="text-text-dim text-xs sm:text-sm mt-1 leading-relaxed">
                      We stand firmly behind the craftsmanship of our travel equipment, custom journals, and digital blueprints. If you are not completely satisfied, you have <strong className="text-text-main font-bold">7 full calendar days from the date of delivery</strong> to request a return, exchange, or replacement.
                    </p>
                  </div>
                </div>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">01.</span> Physical Merchandise Return Eligibility
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    To qualify for a 100% refund or free item exchange on physical products:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-text-dim">
                    <li>The item must be in its original, unused, unwashed condition with all tags and product packaging intact.</li>
                    <li>The return request must be submitted within 7 days of package delivery.</li>
                    <li>You must provide your order confirmation number or registered email address.</li>
                    <li>In the case of manufacturing defects or shipping damage, we provide 100% free reverse pickup across India.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">02.</span> Digital Downloads Satisfaction Guarantee
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Due to the instant nature of digital files, standard returns do not apply once downloaded. However, we provide an ironclad <strong className="text-text-main">7-Day Technical Resolution Guarantee</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-text-dim">
                    <li>If a preset pack, e-book, or Notion template is corrupted, fails to import, or exhibits technical incompatibility with your software version, our team will re-issue formatted files or provide 1-on-1 technical assistance.</li>
                    <li>If the technical issue cannot be resolved, we will gladly issue a 100% full refund within the 7-day window.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">03.</span> Step-by-Step Return Process
                  </h2>
                  <div className="space-y-3 font-sans">
                    <div className="p-3.5 rounded-lg bg-card-bg border border-border-main flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <h4 className="text-xs font-bold font-ui uppercase tracking-wider text-text-main">Initiate Email Request</h4>
                        <p className="text-text-dim text-xs mt-0.5">
                          Send an email to <a href="mailto:khileshsammal.business@gmail.com" className="text-accent underline font-medium">khileshsammal.business@gmail.com</a> with subject line <span className="font-mono text-text-main">"Return Request - [Order #]"</span> and state the reason for return.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-card-bg border border-border-main flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <h4 className="text-xs font-bold font-ui uppercase tracking-wider text-text-main">Reverse Pickup Arranged</h4>
                        <p className="text-text-dim text-xs mt-0.5">
                          Our courier partner will schedule a doorstep reverse pickup at your address within 24–48 hours.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-card-bg border border-border-main flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent text-black font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div>
                        <h4 className="text-xs font-bold font-ui uppercase tracking-wider text-text-main">Inspection & Instant Refund</h4>
                        <p className="text-text-dim text-xs mt-0.5">
                          Once received at our hub, the item is inspected and the refund is immediately released to your original payment method (Stripe, UPI, or Credit Card) within 3–5 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-text-main border-b border-border-main pb-3 flex items-center gap-2.5">
                    <span className="text-accent font-mono text-lg">04.</span> Refund Timeline & Payment Gateways
                  </h2>
                  <p className="text-text-dim leading-relaxed">
                    Refunds are processed through Stripe or Razorpay back to your original source of payment:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-text-dim">
                    <li><strong className="text-text-main">UPI & Net Banking:</strong> 1–3 business days from refund initiation.</li>
                    <li><strong className="text-text-main">Credit / Debit Cards:</strong> 3–5 business days depending on your issuing bank's settlement cycle.</li>
                  </ul>
                </section>

              </div>
            )}

          </article>

          {/* Sidebar Info & Support Card */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Quick Links Card */}
            <div className="bg-card-bg border border-border-main rounded-2xl p-6 space-y-4 shadow-lg sticky top-28">
              <div className="flex items-center gap-2 text-accent font-bold font-ui text-xs uppercase tracking-wider">
                <FileCheck size={16} />
                <span>All Policy Documents</span>
              </div>
              <p className="text-xs text-text-dim leading-relaxed">
                Review all official legal disclaimers and service governance standards for Lens & Latitude:
              </p>

              <div className="space-y-2 pt-2">
                {POLICIES.map((p) => {
                  const isCurrent = p.type === policyType;
                  const SubIcon = p.icon;
                  return (
                    <button
                      key={p.type}
                      onClick={() => onNavigate(p.type as AppView)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-ui flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-accent/15 border-accent text-accent font-bold shadow-sm"
                          : "bg-bg/60 border-border-main text-text-dim hover:text-text-main hover:border-accent/30"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <SubIcon size={14} className={isCurrent ? "text-accent" : "text-text-dim"} />
                        <span>{p.shortTitle}</span>
                      </span>
                      <ChevronRight size={13} className={isCurrent ? "text-accent" : "text-text-dim/40"} />
                    </button>
                  );
                })}
              </div>

              {/* Direct Support Box */}
              <div className="mt-6 pt-6 border-t border-border-main space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-ui text-text-main">
                  <HelpCircle size={14} className="text-accent" />
                  <span>Have Policy Questions?</span>
                </div>
                <p className="text-xs text-text-dim leading-relaxed">
                  Reach out directly to Khilesh Sammal for assistance with orders, returns, or permissions:
                </p>
                <a
                  href="mailto:khileshsammal.business@gmail.com"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-accent/10 hover:bg-accent hover:text-black border border-accent/30 text-accent font-ui font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                >
                  <Mail size={13} />
                  <span>Email Support</span>
                </a>
                <a
                  href="https://ig.me/m/mr.khilesh__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 bg-card-bg hover:border-accent/50 border border-border-main text-text-dim hover:text-text-main font-ui font-medium text-xs rounded-lg transition-all"
                >
                  <Compass size={13} />
                  <span>DM on Instagram (@mr.khilesh__)</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
});

PolicyPageView.displayName = "PolicyPageView";
