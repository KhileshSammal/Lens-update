import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-3xl mx-auto space-y-10">
      <Link href="/" className="text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-white transition-colors">
        ← Back to Base
      </Link>
      
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-white">Privacy Policy</h1>
        <p className="text-zinc-500 font-serif italic text-base">Effective Date: July 2026</p>
      </header>

      <section className="space-y-8 text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">1. Introduction</h2>
          <p>
            At Lens & Latitude, we respect your security and privacy. This Privacy Policy describes how we collect, use, and process your personal data when you visit our website, subscribe to our newsletter, or interact with our travel blueprints and visual dispatches.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">2. Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide to us, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Subscription Information:</strong> Your email address when you sign up for our travel newsletter or download blueprints.</li>
            <li><strong>Contact Information:</strong> Your name, email, and any details you provide when sending a direct message or inquiry.</li>
            <li><strong>Anonymized Data:</strong> Standard non-identifying telemetry metrics logged anonymously solely to optimize user navigation and enhance loading responsiveness.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">3. Payment & Security</h2>
          <p>
            We do not store or compile personal financial account information. Payment processing for physical goods, travel guides, or digital resources is managed securely and directly via premium external portals (e.g. Stripe Checkout) which safeguard your credentials.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">4. How We Use Your Information</h2>
          <p>
            We utilize the collected information to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Deliver requested newsletter subscriptions, travel updates, and visual blueprints.</li>
            <li>Respond to direct messages, collaboration requests, or inquiries.</li>
            <li>Improve website performance, layout, and visual presentation.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">5. Cookies & Analytics</h2>
          <p>
            We use essential cookies and lightweight analytics tools to analyze site traffic trends. You can instruct your browser to refuse cookies, though some features of the site may function differently.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-serif text-white uppercase tracking-wider font-semibold">6. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how your data is handled, please reach out to us directly at <a href="mailto:khileshsammal.work@gmail.com" className="text-amber-400 hover:underline">khileshsammal.work@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
