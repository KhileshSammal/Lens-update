import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  Tag, 
  Clock, 
  Share2, 
  Bookmark, 
  ChevronRight, 
  Calendar,
  User,
  CheckCircle,
  Hash
} from "lucide-react";
import { DETAILED_BLOG_POSTS, BlogPost } from "../blogData";

interface BlogArchiveProps {
  onBackToHome: () => void;
  openBlogPostId?: string | null;
  onSelectBlogPost: (id: string | null) => void;
}

/**
 * BlogArchive Component:
 * Managed as a dedicated sub-view inside the single-page application structure.
 * Supports dual states:
 * 1. Archive listing Feed with fuzzy live searching and tag-based category filtering.
 * 2. High-fidelity article Detail mode, rendering nested text blocks, custom quote boxes, 
 *    bulleted matrices, and full-resolution visual breaks.
 */
export const BlogArchive = memo(({ onBackToHome, openBlogPostId, onSelectBlogPost }: BlogArchiveProps) => {
  // Local state for tracking current search inputs
  const [searchQuery, setSearchQuery] = useState("");
  // Local state for selecting the filter category (e.g. "Travel Tips", "Photography")
  const [selectedTag, setSelectedTag] = useState("All");
  // Local state for tracking share copy action
  const [copied, setCopied] = useState(false);

  // Get current active blog post if selected
  const activePost = useMemo(() => {
    if (!openBlogPostId) return null;
    return DETAILED_BLOG_POSTS.find(p => p.id === openBlogPostId) || null;
  }, [openBlogPostId]);

  // Extract unique tags for filtering dyamically from content records
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add("All");
    DETAILED_BLOG_POSTS.forEach(p => tags.add(p.tag));
    return Array.from(tags);
  }, []);

  // Filter posts based on search query and selected tag (Case insensitive fuzzy search)
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

  // standard share utility - triggers native mobile sheets or falls back to clipboard copying
  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ==========================================================================
  // ARTICLE DETAIL MODE RENDER
  // ==========================================================================
  if (activePost) {
    return (
      <div className="min-h-screen bg-bg text-white pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Navigation Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-10 pb-6 border-b border-white/5"
          >
            <button 
              onClick={() => onSelectBlogPost(null)}
              className="inline-flex items-center gap-2 group text-zinc-400 hover:text-accent font-ui font-semibold text-xs uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Archive
            </button>

            <div className="flex items-center gap-4 text-zinc-500">
              <button 
                onClick={() => handleShare(activePost)}
                className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-sm"
                title="Share Article"
              >
                <Share2 size={16} />
              </button>
            </div>
          </motion.div>

          {/* Hero Meta Header */}
          <div className="mb-10 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-bold font-ui text-[10px] uppercase tracking-wider rounded-sm mb-5">
              <Tag size={12} /> {activePost.tag}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
              {activePost.title}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-zinc-400 font-ui text-xs font-semibold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-accent" /> {activePost.author}
              </span>
              <span className="hidden md:inline text-zinc-700">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {activePost.date}
              </span>
              <span className="hidden md:inline text-zinc-700">|</span>
              <span className="flex items-center gap-1.5 text-accent">
                <Clock size={14} /> {activePost.read}
              </span>
            </div>
          </div>

          {/* Immersive Splash Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-[21/9] w-full rounded-sm overflow-hidden bg-zinc-950 border border-white/5 mb-16"
          >
            <img 
              src={activePost.img} 
              alt={activePost.title} 
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Article Body Section - Generative content rendering loop */}
          <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed text-base md:text-lg font-sans space-y-10">
            {activePost.sections.map((section, index) => {
              switch (section.type) {
                // Short descriptive text
                case "text":
                  return (
                    <div key={index} className="space-y-4">
                      {section.title && (
                        <h2 className="text-2xl md:text-3xl font-serif text-white mt-12 mb-4">
                          {section.title}
                        </h2>
                      )}
                      <p className="font-light leading-relaxed">{section.body}</p>
                    </div>
                  );

                // High-visibility quote box blockquote
                case "quote":
                  return (
                    <div key={index} className="border-l-2 border-accent pl-6 py-2 my-8 bg-white/[0.02]">
                      <p className="font-serif italic text-xl md:text-2xl text-white">
                        "{section.body}"
                      </p>
                    </div>
                  );

                // custom matrices, itineraries and key checklists (Scannable Bullet Lists)
                case "bullet-list":
                  return (
                    <div key={index} className="space-y-4">
                      {section.title && (
                        <h3 className="text-lg md:text-xl font-bold font-ui text-white uppercase tracking-widest mt-8 mb-2">
                          {section.title}
                        </h3>
                      )}
                      <ul className="space-y-3 pl-2">
                        {section.items?.map((item, key) => (
                          <li key={key} className="flex items-start gap-3 text-zinc-300 text-sm md:text-base">
                            <span className="mt-1 text-accent flex-shrink-0">
                              <CheckCircle size={14} />
                            </span>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                // Inset custom editorial images
                case "image":
                  return (
                    <figure key={index} className="my-12 space-y-3">
                      <div className="aspect-video w-full rounded-sm overflow-hidden border border-white/5">
                        <img 
                          src={section.imageUrl} 
                          alt={section.imageCaption || "Illustrative visual"} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {section.imageCaption && (
                        <figcaption className="text-center font-serif italic text-xs text-zinc-500">
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

          {/* Article Footer & Navigation Actions */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <button 
              onClick={() => onSelectBlogPost(null)}
              className="inline-flex items-center gap-2 border border-white/10 hover:border-accent hover:text-accent px-6 py-3 rounded-sm text-xs font-bold font-ui uppercase tracking-widest transition-all"
            >
              <ArrowLeft size={14} /> Back to Journal Grid
            </button>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500 font-ui text-xs uppercase font-bold">Share:</span>
              <button 
                onClick={() => handleShare(activePost)}
                className="bg-[#0a0a0a] border border-zinc-900 px-4 py-2 hover:border-accent hover:text-accent rounded-sm text-xs font-bold transition-all uppercase tracking-widest inline-flex items-center gap-1.5"
              >
                <Share2 size={12} /> Link
              </button>
            </div>
          </div>
        </div>

        {/* Small floating copy success notification */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-10 right-10 z-50 bg-zinc-950 border border-accent/40 text-white px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3 max-w-sm font-sans"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <p className="text-[10px] uppercase tracking-widest font-ui font-bold">Link Copied to Clipboard!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ==========================================================================
  // ARCHIVE FEED LIST MODE RENDER
  // ==========================================================================
  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-32">
      {/* Search Header Hero Bar */}
      <div className="bg-[#0a0a0a] border-b border-white/5 py-16 md:py-24 mb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <button 
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-accent font-ui font-semibold text-[10px] uppercase tracking-widest mb-4 transition-colors"
              >
                <ArrowLeft size={12} /> Back to Main Portfolio
              </button>
              <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight">
                The Journal Archive
              </h1>
              <p className="text-zinc-500 font-serif italic text-lg md:text-xl mt-3 max-w-2xl">
                "Detailed technical packing matrices, photography guides, and notes of philosophical wanderlust."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4 items-center">
            {/* Live Search Input Component */}
            <div className="relative md:col-span-7">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources, templates, guides, or destinations..."
                className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-sm focus:outline-none focus:border-accent text-sm font-medium placeholder:text-zinc-650 tracking-wide font-ui"
              />
            </div>

            {/* Filter Tags Navigation Marquee */}
            <div className="md:col-span-5 flex flex-nowrap overflow-x-auto pb-2 no-scrollbar gap-2 md:flex-wrap md:justify-end md:overflow-x-visible md:pb-0 w-full md:w-auto">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest font-ui border transition-all rounded-sm whitespace-nowrap ${
                    selectedTag === tag 
                      ? "bg-accent text-black border-accent" 
                      : "bg-[#0c0c0c] border-zinc-850 hover:border-zinc-700 text-zinc-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Journal Feed Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 md:gap-16">
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectBlogPost(post.id)}
                className="group cursor-pointer flex flex-col justify-between border-b border-white/[0.03] pb-10"
              >
                <div>
                  {/* Visual Preview Thumbnail wrapper */}
                  <div className="aspect-[16/10] overflow-hidden mb-6 rounded-sm bg-zinc-950 border border-white/5 relative">
                    <img 
                      src={post.img} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                      alt={post.title} 
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-md px-3 py-1.5 text-accent border border-accent/20 font-bold font-ui text-[9px] uppercase tracking-wider rounded-sm">
                        <Tag size={10} /> {post.tag}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Header line */}
                  <div className="flex items-center space-x-3 mb-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-ui">
                    <span>{post.date}</span>
                    <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></span>
                    <span className="text-zinc-400 flex items-center gap-1"><Clock size={11} /> {post.read}</span>
                  </div>

                  {/* title text & post description teaser */}
                  <h3 className="text-2xl font-serif text-white group-hover:text-accent transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-2 pr-4 mb-4 font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-zinc-850 pb-1 group-hover:text-accent group-hover:border-accent inline-flex items-center gap-1.5 font-ui transition-all">
                    Open Complete Entry <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Empty Search Results Feedback panel */
          <div className="text-center py-24 text-zinc-500 bg-[#070707] border border-zinc-900 rounded-sm">
            <Hash size={40} className="mx-auto mb-4 text-zinc-800" />
            <h3 className="text-white text-lg font-serif mb-1">No matching articles</h3>
            <p className="text-sm font-ui max-w-sm mx-auto">Try refining your search keyword or selecting a different journal tag classification.</p>
          </div>
        )}
      </div>
    </div>
  );
});

BlogArchive.displayName = "BlogArchive";
