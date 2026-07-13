import React from "react";
import Link from "next/link";

export default function BlogListingPage() {
  const posts = [
    {
      slug: "amritsar-grace-guide",
      title: "Amritsar Grace: A Sacred & Culinary Blueprint",
      excerpt: "An optimized budget and transport blueprint outlining historical memorials, scooty routes, and the holy Golden Temple walkthrough.",
      date: "February 2026",
    },
    {
      slug: "goa-slow-living-blueprint",
      title: "Goa Slow Living: Southern Trails & Quiet Lakes",
      excerpt: "Beyond the beaches: discovering quiet Portuguese villages, hidden forest springs, and the slow-crafted life of South Goa.",
      date: "January 2026",
    },
    {
      slug: "kerala-monsoon-expedition",
      title: "Kerala Monsoon: Waterways & Ancient Forts",
      excerpt: "Navigating deep backwater canals, rain-drenched spice farms, and the quiet ocean breezes of historic Fort Kochi.",
      date: "November 2025",
    },
  ];

  return (
    <main className="min-h-screen py-16 px-6 max-w-4xl mx-auto space-y-12">
      <Link href="/" className="text-xs uppercase tracking-widest text-amber-400 font-bold hover:text-white transition-colors">
        ← Back to Base
      </Link>
      
      <header className="space-y-4">
        <h1 className="text-5xl font-serif text-white">The Journal</h1>
        <p className="text-zinc-500 font-serif italic text-base">In-depth travel blueprints, route ledgers, and photographic records.</p>
      </header>

      <section className="space-y-10 pt-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-zinc-900 pb-10 space-y-4 group">
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">{post.date}</span>
            <h2 className="text-2xl md:text-3xl font-serif text-white leading-tight group-hover:text-amber-400 transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{post.excerpt}</p>
            <Link 
              href={`/blog/${post.slug}`} 
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-white border-b border-white pb-0.5 hover:text-amber-400 hover:border-amber-400 transition-all"
            >
              Read Article
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
