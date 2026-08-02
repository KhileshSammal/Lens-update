import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubscriptionForm from "./SubscriptionForm";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Blog posts database metadata definition.
 * Serves as a dynamic lookup dictionary mapping URL slugs to full travel article structures.
 */
const POSTS_DATA: Record<string, { title: string; date: string; content: string[] }> = {
  "amritsar-grace-guide": {
    title: "Amritsar Grace: A Sacred & Culinary Blueprint",
    date: "February 2026",
    content: [
      "Amritsar is a city where divinity and flavor converge in the lanes of the old city. This guide presents an optimized, budget-efficient blueprint focusing on historical memorials, scooty routes, and the holy Golden Temple walkthrough.",
      "By renting a scooty, you bypass auto-rickshaw negotiations and gain absolute scheduling flexibility to witness both the sunrise and sunset ceremonies with ease.",
      "Ensure to budget for authentic dhabas like Kesar Da Dhaba and Ahuja Milk Bhandar for high-malai lassi."
    ]
  },
  "goa-slow-living-blueprint": {
    title: "Goa Slow Living: Southern Trails & Quiet Lakes",
    date: "January 2026",
    content: [
      "Southern Goa presents a stark, beautiful contrast to the chaotic parties of the north. This blueprint guides you through quiet Portuguese architectural villages, hidden forest freshwater springs, and slow-crafted backwaters.",
      "Renting a reliable Vespa or Himalayan allows you to traverse narrow forest pathways and explore colonial-era mansions with maximum proximity.",
      "Stay in boutique local homesteads to support community preservation initiatives."
    ]
  },
  "kerala-monsoon-expedition": {
    title: "Kerala Monsoon: Waterways & Ancient Forts",
    date: "November 2025",
    content: [
      "The heavy coastal monsoons transform Kerala into a brilliant emerald landscape. Learn how to safely navigate deep backwater canals, rain-drenched spice farms, and the quiet ocean breezes of historic Fort Kochi.",
      "Using local public water taxis offers an authentic, near-zero carbon transit experience that directly funds state watermen.",
      "Pack water-sealed camera covers to document the intense monsoon clouds without equipment failure."
    ]
  },
  "vietnam-secrets-2025": {
    title: "Vietnam Expedition: July 2026 Blueprint",
    date: "July 17 – 26, 2026",
    content: [
      "A complete 9-day summer expedition across Vietnam's iconic destinations: Ho Chi Minh City (Saigon), Hanoi, Ha Long Bay, and Ninh Binh.",
      "Route loop: Delhi ➔ Ho Chi Minh City ➔ Hanoi ➔ Ha Long Bay ➔ Ninh Binh ➔ Hanoi ➔ Delhi. Total estimated budget: ~₹1,20,000 INR.",
      "Key highlights include Saigon city bus tours, Hanoi Old Quarter & Banh Mi 25, overnight Aurora Cruise in Ha Long Bay, climbing 500 steps up Mua Cave, and cycling lotus field paths in Tam Coc."
    ]
  }
};

/**
 * BlogPostPage Component:
 * Next.js-compliant dynamic route page for reading travel blueprints by slug.
 * It resolves asynchronously parsed URL parameters, performs lookups against standard static records,
 * and renders structural text blocks coupled with the integrated subscription form.
 */
export default async function BlogPostPage({ params }: BlogPostProps) {
  // Await params per Next.js modern dynamic route paradigms
  const { slug } = await params;
  const post = POSTS_DATA[slug];

  // Gracefully render the built-in 404 page if no matching article exists
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-16 px-6 max-w-3xl mx-auto space-y-10">
      {/* Return Navigation Anchor */}
      <Link href="/blog" className="text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-white transition-colors">
        ← Back to Journal
      </Link>
      
      <article className="space-y-8">
        {/* Article Meta & Heading */}
        <header className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">{post.date}</span>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">{post.title}</h1>
        </header>

        {/* Render Paragraph Blocks */}
        <section className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

        {/* Integrated newsletter form allowing readers to stay updated on future blueprints */}
        <SubscriptionForm />
      </article>
    </main>
  );
}
