import React, { useState, useMemo, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  Tag, 
  Clock, 
  ChevronRight, 
  Calendar,
  User,
  CheckCircle2,
  ListOrdered,
  Lightbulb,
  AlertTriangle,
  Compass,
  Quote,
  DollarSign,
  MapPin,
  Sparkles,
  Send,
  MessageSquare,
  Bookmark,
  Share2
} from "lucide-react";
import { DETAILED_BLOG_POSTS, BlogPost, BlogSection } from "../blogData";
import { SocialShareButtons } from "./SocialShareButtons";
import { TripCopyBanner } from "./TripCopyBanner";
import { PremiumTravelResourcesSection } from "./PremiumTravelResourcesSection";
import { getTravelResourcesForPost } from "../data/travelResourcesData";

interface BlogArchiveProps {
  onBackToHome: () => void;
  openBlogPostId?: string | null;
  onSelectBlogPost: (id: string | null) => void;
  onNavigate?: (view: any, targetHash?: string) => void;
}

interface UserComment {
  id: string;
  name: string;
  comment: string;
  date: string;
  postId: string;
}

/**
 * BlogArchive Component:
 * Implements the Universal Blog Post Layout Blueprint:
 * 1. Hero & Meta (16:9 featured image, H1 title, author, date, read time)
 * 2. Introduction & Quick Summary (2-sentence hook, key highlights summary box)
 * 3. Table of Contents (Clickable anchor links jumping to H2s)
 * 4. Core Body Modules (Short paragraphs, H2/H3s, Callout boxes, Visual anchors, Best time, Attractions, Related itineraries)
 * 5. Logistics & Stats Table (Budget, Duration, Best Months, Route, Gear)
 * 6. Author Bio & Reader Engagement (Closing question + Interactive comments)
 * 7. Recommended Reads (3 dynamically chained posts)
 */
export const BlogArchive = memo(({ onBackToHome, openBlogPostId, onSelectBlogPost, onNavigate }: BlogArchiveProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Reader comments state
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [commentsList, setCommentsList] = useState<UserComment[]>(() => {
    try {
      const stored = localStorage.getItem("lens_latitude_blog_comments");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const activePost = useMemo(() => {
    if (!openBlogPostId) return null;
    return DETAILED_BLOG_POSTS.find(p => p.id === openBlogPostId) || null;
  }, [openBlogPostId]);

  // Scroll to top whenever the open article changes to ensure smooth reading flow
  useEffect(() => {
    if (openBlogPostId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCommentSubmitted(false);
      setCommentText("");
    }
  }, [openBlogPostId]);

  // Dynamic 3-post recommendation engine with intelligent forward chaining
  const recommendedPosts = useMemo(() => {
    if (!activePost) return [];

    const currentIndex = DETAILED_BLOG_POSTS.findIndex(p => p.id === activePost.id);
    const totalPosts = DETAILED_BLOG_POSTS.length;

    // 1. Find all posts sharing the exact tag (case-insensitive), excluding current active post
    const sameTagPosts = DETAILED_BLOG_POSTS.filter(
      p => p.id !== activePost.id && p.tag.toLowerCase() === activePost.tag.toLowerCase()
    );

    // Sort same-tag posts in circular forward order starting immediately after the current post
    let sortedSameTag = [...sameTagPosts];
    if (sortedSameTag.length > 0 && currentIndex !== -1) {
      sortedSameTag.sort((a, b) => {
        const indexA = DETAILED_BLOG_POSTS.findIndex(p => p.id === a.id);
        const indexB = DETAILED_BLOG_POSTS.findIndex(p => p.id === b.id);
        const distA = (indexA - currentIndex + totalPosts) % totalPosts;
        const distB = (indexB - currentIndex + totalPosts) % totalPosts;
        return distA - distB;
      });
    }

    const selectedList: BlogPost[] = [];
    const selectedIds = new Set<string>();
    selectedIds.add(activePost.id);

    // Add available same-tag posts (up to 3)
    for (const post of sortedSameTag) {
      if (selectedList.length < 3 && !selectedIds.has(post.id)) {
        selectedList.push(post);
        selectedIds.add(post.id);
      }
    }

    // 2. If fewer than 3 same-tag posts exist, cyclically chain through subsequent dispatches
    if (selectedList.length < 3 && currentIndex !== -1) {
      for (let offset = 1; offset < totalPosts; offset++) {
        const nextIndex = (currentIndex + offset) % totalPosts;
        const candidate = DETAILED_BLOG_POSTS[nextIndex];
        if (candidate && !selectedIds.has(candidate.id)) {
          selectedList.push(candidate);
          selectedIds.add(candidate.id);
          if (selectedList.length === 3) break;
        }
      }
    }

    return selectedList;
  }, [activePost]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add("All");
    DETAILED_BLOG_POSTS.forEach(p => tags.add(p.tag));
    return Array.from(tags);
  }, []);

  const filteredPosts = useMemo(() => {
    return DETAILED_BLOG_POSTS.filter(post => {
      const matchTag = selectedTag === "All" || post.tag === selectedTag;
      const matchSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [searchQuery, selectedTag]);

  // Handle comment submit
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activePost) return;

    const newComment: UserComment = {
      id: Date.now().toString(),
      name: commentName.trim() || "Fellow Explorer",
      comment: commentText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      postId: activePost.id
    };

    const updated = [newComment, ...commentsList];
    setCommentsList(updated);
    try {
      localStorage.setItem("lens_latitude_blog_comments", JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to persist comment:", err);
    }
    setCommentSubmitted(true);
    setCommentText("");
  };

  const postComments = useMemo(() => {
    if (!activePost) return [];
    return commentsList.filter(c => c.postId === activePost.id);
  }, [activePost, commentsList]);

  const travelResources = useMemo(() => {
    if (!activePost) return null;
    return getTravelResourcesForPost(activePost.id, activePost.title, activePost.tag);
  }, [activePost]);

  const tableOfContentsItems = useMemo(() => {
    if (!activePost) return [];
    const items = [...(activePost.tableOfContents || [])];
    if (!items.some(i => i.id === "premium-resources")) {
      const logIdx = items.findIndex(i => i.id === "logistics-stats");
      if (logIdx !== -1) {
        items.splice(logIdx + 1, 0, { id: "premium-resources", title: "Premium Travel Resources" });
      } else {
        items.push({ id: "premium-resources", title: "Premium Travel Resources" });
      }
    }
    return items;
  }, [activePost]);

  // Smooth scroll to anchor ID
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ==========================================================================
  // ARTICLE DETAIL MODE (UNIVERSAL BLUEPRINT IMPLEMENTATION)
  // ==========================================================================
  if (activePost) {
    return (
      <div className="min-h-screen bg-bg text-white pt-20 sm:pt-24 pb-32">
        <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation Bar & Social Sharing */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-white/10"
          >
            <button 
              onClick={() => onSelectBlogPost(null)}
              className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </button>

            <div className="flex items-center gap-4">
              <SocialShareButtons title={activePost.title} variant="minimal" />
            </div>
          </motion.div>

          {/* 1. HERO & META SECTION */}
          <header className="mb-10 text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold font-ui text-[10px] uppercase tracking-wider rounded-sm">
                <Tag size={12} /> {activePost.tag}
              </span>
              <span className="text-zinc-500 font-ui text-xs">•</span>
              <span className="text-zinc-400 font-ui text-xs uppercase tracking-wider">Field Expedition</span>
            </div>

            {/* Outcome-focused H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold leading-[1.18] mb-6 text-zinc-100">
              {activePost.title}
            </h1>
            
            {/* Author Name | Publication Date | Estimated Read Time */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-400 font-ui text-xs font-semibold uppercase tracking-widest pb-4 border-b border-white/10">
              <span className="flex items-center gap-2 text-zinc-200">
                <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-[10px]">
                  KS
                </div>
                <span>{activePost.author}</span>
              </span>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-zinc-500" /> {activePost.date}
              </span>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Clock size={14} /> {activePost.read}
              </span>
            </div>
          </header>

          {/* 16:9 Featured Cover Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 border border-white/10 mb-12 shadow-2xl relative"
          >
            <img 
              src={activePost.img} 
              alt={`Featured editorial cover photograph: ${activePost.title}`} 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* 2. INTRODUCTION & QUICK SUMMARY */}
          <section className="mb-12 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block"></span>
              {activePost.introSectionTitle}
            </h2>

            {/* Concise 2-sentence opening hook */}
            <p className="text-lg sm:text-xl text-zinc-200 font-sans leading-relaxed">
              {activePost.introHook}
            </p>

            {/* Visually Distinct Summary Box: 3 Quick Bullet Points for Skimmers */}
            <div className="bg-gradient-to-br from-amber-400/[0.07] to-amber-500/[0.02] border border-amber-400/30 rounded-xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-amber-400/20">
                <div className="flex items-center gap-2.5">
                  <Sparkles size={18} className="text-amber-400" />
                  <span className="font-ui font-bold text-xs uppercase tracking-widest text-amber-400">
                    Key Highlights & Field Takeaways
                  </span>
                </div>
                <span className="text-[10px] font-ui uppercase font-semibold text-zinc-400 tracking-wider hidden sm:inline-block">
                  Quick Skim
                </span>
              </div>

              <ul className="space-y-3.5">
                {activePost.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-zinc-200 text-base sm:text-lg leading-relaxed">
                    <span className="mt-1 text-amber-400 flex-shrink-0">
                      <CheckCircle2 size={18} />
                    </span>
                    <span className="font-normal">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. TABLE OF CONTENTS */}
          {tableOfContentsItems && tableOfContentsItems.length > 0 && (
            <nav className="mb-14 bg-zinc-950/80 border border-zinc-800 rounded-xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-zinc-800">
                <ListOrdered size={18} className="text-amber-400" />
                <h3 className="font-ui font-bold text-xs uppercase tracking-widest text-zinc-200">
                  Table of Contents & Quick Navigation
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tableOfContentsItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToAnchor(item.id)}
                    className="flex items-center gap-2.5 text-left text-sm text-zinc-400 hover:text-amber-400 hover:bg-zinc-900/60 p-2 rounded-md transition-all group cursor-pointer"
                  >
                    <span className="font-mono text-xs text-amber-400/70 font-semibold group-hover:text-amber-400">
                      {(idx + 1).toString().padStart(2, "0")}.
                    </span>
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            </nav>
          )}

          {/* 4. CORE BODY MODULES */}
          <div className="blog-article-content text-zinc-300 leading-relaxed font-sans space-y-10">
            {activePost.sections.map((section: BlogSection, index: number) => {
              switch (section.type) {
                case "text":
                  return (
                    <div key={index} id={section.id} className="scroll-mt-24 space-y-3">
                      {section.title && (
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-bold mt-10 mb-2">
                          {section.title}
                        </h2>
                      )}
                      {section.subtitle && (
                        <h3 className="text-base sm:text-lg font-serif text-amber-300/90 font-medium italic mb-3">
                          {section.subtitle}
                        </h3>
                      )}
                      <p className="font-normal text-zinc-300 text-lg sm:text-xl leading-relaxed">
                        {section.body}
                      </p>
                    </div>
                  );

                case "callout": {
                  const isWarning = section.calloutType === "warning";
                  const isGear = section.calloutType === "gear";
                  const isTip = section.calloutType === "tip";

                  return (
                    <div 
                      key={index} 
                      className={`my-8 p-6 rounded-xl border relative overflow-hidden ${
                        isWarning 
                          ? "bg-rose-950/20 border-rose-500/40 text-rose-100" 
                          : isGear 
                          ? "bg-cyan-950/20 border-cyan-500/40 text-cyan-100" 
                          : isTip
                          ? "bg-amber-950/20 border-amber-500/40 text-amber-100"
                          : "bg-zinc-900/60 border-zinc-700 text-zinc-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        {isWarning && <AlertTriangle size={18} className="text-rose-400" />}
                        {isGear && <Compass size={18} className="text-cyan-400" />}
                        {isTip && <Lightbulb size={18} className="text-amber-400" />}
                        {!isWarning && !isGear && !isTip && <Quote size={18} className="text-amber-400" />}
                        
                        <span className={`font-ui font-bold text-xs uppercase tracking-widest ${
                          isWarning ? "text-rose-400" : isGear ? "text-cyan-400" : "text-amber-400"
                        }`}>
                          {section.title || (isWarning ? "Local Warning" : isGear ? "Gear Specification" : "Pro Tip")}
                        </span>
                      </div>
                      <p className="font-sans text-base sm:text-lg leading-relaxed text-zinc-200">
                        {section.body}
                      </p>
                    </div>
                  );
                }

                case "quote":
                  return (
                    <div key={index} className="border-l-4 border-amber-400 pl-6 py-4 my-8 bg-zinc-900/50 rounded-r-xl">
                      <p className="font-serif italic text-xl sm:text-2xl text-amber-100 leading-relaxed">
                        "{section.body}"
                      </p>
                    </div>
                  );

                case "bullet-list":
                  return (
                    <div key={index} id={section.id} className="scroll-mt-24 space-y-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        {section.title && (
                          <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                            {section.title}
                          </h3>
                        )}
                        {section.badge && (
                          <span className="px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold font-ui uppercase tracking-wider rounded">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-3.5">
                        {section.items?.map((item, key) => (
                          <li key={key} className="flex items-start gap-3 text-zinc-300 text-base sm:text-lg leading-relaxed">
                            <span className="mt-1 text-amber-400 flex-shrink-0">
                              <CheckCircle2 size={16} />
                            </span>
                            <span className="font-normal">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                case "image":
                  return (
                    <figure key={index} className="my-10 space-y-3">
                      <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 shadow-xl bg-zinc-950">
                        <img 
                          src={section.imageUrl} 
                          alt={section.imageCaption || `Documentary photograph from ${activePost.title}`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {section.imageCaption && (
                        <figcaption className="text-center font-serif italic text-xs sm:text-sm text-zinc-400">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  );

                default:
                  return null;
              }
            })}
          </div>

          {/* 5. LOGISTICS & STATS TABLE */}
          {activePost.quickStats && (
            <section id="logistics-stats" className="mt-16 scroll-mt-24">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block"></span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Logistics & Critical Travel Stats
                </h2>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80">
                  
                  {/* Left Column */}
                  <div className="divide-y divide-zinc-800/60">
                    <div className="p-5 sm:p-6 flex items-start gap-4">
                      <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg shrink-0">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-zinc-400 block mb-1">
                          Estimated Budget
                        </span>
                        <p className="text-base sm:text-lg font-serif font-semibold text-white">
                          {activePost.quickStats.estimatedBudget}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex items-start gap-4">
                      <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg shrink-0">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-zinc-400 block mb-1">
                          Ideal Duration
                        </span>
                        <p className="text-base sm:text-lg font-serif font-semibold text-white">
                          {activePost.quickStats.idealDuration}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex items-start gap-4">
                      <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg shrink-0">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-zinc-400 block mb-1">
                          Best Months to Visit
                        </span>
                        <p className="text-base sm:text-lg font-serif font-semibold text-white">
                          {activePost.quickStats.bestMonths}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="divide-y divide-zinc-800/60">
                    <div className="p-5 sm:p-6 flex items-start gap-4">
                      <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-zinc-400 block mb-1">
                          Route & Access
                        </span>
                        <p className="text-base sm:text-lg font-serif font-semibold text-white">
                          {activePost.quickStats.routeAccess}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex items-start gap-4">
                      <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg shrink-0">
                        <Compass size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-zinc-400 block mb-1">
                          Key Gear Essentials
                        </span>
                        <p className="text-base sm:text-lg font-serif font-semibold text-white">
                          {activePost.quickStats.keyGear}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          )}

          {/* NEW: PREMIUM TRAVEL RESOURCES SECTION */}
          {travelResources && (
            <PremiumTravelResourcesSection 
              resources={travelResources} 
              locationName={activePost.title} 
            />
          )}

          {/* CUSTOM ITINERARY PLANNER PROMO */}
          <TripCopyBanner destination={activePost.tag || activePost.title} />

          {/* 6. AUTHOR BIO & READER ENGAGEMENT */}
          <section className="mt-16 pt-10 border-t border-white/10">
            {/* Author Profile Bio Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-950 border border-zinc-800/90 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12 shadow-xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shrink-0 shadow-lg">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-amber-400 font-serif font-bold text-xl sm:text-2xl">
                  KS
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-serif font-bold text-white">{activePost.author}</h3>
                  <span className="px-2 py-0.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-ui text-[9px] uppercase tracking-wider font-bold rounded">
                    {activePost.authorRole || "Travel Photographer & Full-Stack Marketer"}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  {activePost.authorBio || "Khilesh Sammal is a travel photographer and full-stack marketer who documents authentic travel guides, cultural heritage, and practical itineraries across Asia and beyond."}
                </p>
              </div>
            </div>

            {/* Call to Action & Reader Engagement Question */}
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-6">
              <div className="flex items-start gap-3">
                <MessageSquare size={22} className="text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase font-bold font-ui tracking-widest text-amber-400 block mb-1">
                    Reader Engagement & Discussion
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                    {activePost.closingQuestion}
                  </h3>
                </div>
              </div>

              {/* Interactive Comment Submission Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your thoughts, experiences, or questions about this dispatch..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-ui font-bold text-xs uppercase tracking-widest rounded-md transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Send size={14} /> Post Comment
                  </button>
                  {commentSubmitted && (
                    <span className="text-xs text-emerald-400 font-ui font-semibold flex items-center gap-1.5 animate-fade-in">
                      <CheckCircle2 size={14} /> Thank you! Your reflection is posted.
                    </span>
                  )}
                </div>
              </form>

              {/* Comments Feed */}
              {postComments.length > 0 && (
                <div className="pt-6 border-t border-zinc-800/80 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-ui font-bold text-zinc-400">
                    Reader Reflections ({postComments.length})
                  </h4>
                  <div className="space-y-3">
                    {postComments.map((c) => (
                      <div key={c.id} className="p-4 rounded-lg bg-zinc-950 border border-zinc-850 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-400 font-ui">{c.name}</span>
                          <span className="text-zinc-500 text-[11px]">{c.date}</span>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed font-sans">{c.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ARTICLE FOOTER & SOCIAL SHARE */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <button 
              onClick={() => onSelectBlogPost(null)}
              className="inline-flex items-center gap-2 border border-white/15 hover:border-amber-400 hover:text-amber-400 px-6 py-3 rounded-md text-xs font-bold font-ui uppercase tracking-widest transition-all cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Journal Grid
            </button>
            <SocialShareButtons title={activePost.title} />
          </div>

          {/* 7. RECOMMENDED READS SECTION (3 DYNAMICALLY CHAINED POSTS) */}
          {recommendedPosts.length > 0 && (
            <section id="recommended-reads-section" className="mt-16 pt-12 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 font-ui block mb-1">
                    Continue Exploring
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Recommended Reads
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 font-ui">
                  Curated stories in <span className="text-amber-400 font-semibold">{activePost.tag}</span> & related dispatches
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {recommendedPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    id={`recommended-post-${post.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => {
                      onSelectBlogPost(post.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group cursor-pointer bg-zinc-950/70 border border-zinc-800/90 rounded-lg p-5 hover:border-amber-400/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden mb-4 rounded-md bg-zinc-900 border border-white/5 relative">
                        <img
                          src={post.img}
                          alt={`Cover photograph for article: ${post.title}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-black/80 backdrop-blur-md border border-amber-400/30 text-amber-400 font-bold font-ui text-[9px] uppercase tracking-wider rounded">
                            <Tag size={10} /> {post.tag}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-ui uppercase tracking-wider mb-2">
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-amber-400" /> {post.read}
                        </span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <h4 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2 mb-2">
                        {post.title}
                      </h4>

                      <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-ui font-semibold uppercase tracking-wider group-hover:text-amber-300">
                      <span>Read Dispatch</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    );
  }

  // ==========================================================================
  // JOURNAL ARCHIVE GRID VIEW
  // ==========================================================================
  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-32">
      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Navigation & Title */}
        <div className="mb-12">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 font-ui block mb-2">
                Field Notes & Publications
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white">
                The Journal Archive
              </h1>
            </div>
            <p className="text-zinc-400 text-sm max-w-md font-sans leading-relaxed">
              In-depth travel strategies, visual essays, and technical packing logs from expeditions across the globe.
            </p>
          </div>
        </div>

        {/* Filter Controls: Search & Topic Chips */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-12">
          
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-md pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors font-sans"
            />
          </div>

          {/* Topic Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-xs uppercase font-ui font-semibold tracking-wider rounded-sm transition-all cursor-pointer ${
                  selectedTag === tag 
                    ? "bg-amber-400 text-black font-bold shadow-sm" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onSelectBlogPost(post.id)}
                className="group bg-card-bg border border-border-main rounded-sm overflow-hidden flex flex-col justify-between hover:border-accent transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-bg relative">
                    <img 
                      src={post.img} 
                      alt={`Journal article cover for ${post.title}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-border-main text-accent font-bold font-ui text-[9px] uppercase tracking-wider rounded-sm">
                        <Tag size={10} /> {post.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[10px] text-zinc-400 font-ui uppercase tracking-wider mb-3">
                      <span className="flex items-center gap-1"><Clock size={12} className="text-amber-400" /> {post.read}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h2 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>

                    <p className="text-zinc-400 text-xs font-sans leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 text-xs text-amber-400 font-ui font-semibold uppercase tracking-wider group-hover:text-amber-300">
                  <span>Read Article</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm font-sans mb-4">
              No journal articles found matching "{searchQuery}" in {selectedTag}.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedTag("All"); }}
              className="px-4 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs uppercase font-ui font-bold tracking-wider rounded-sm hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
});

BlogArchive.displayName = "BlogArchive";
