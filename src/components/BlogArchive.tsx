import { useState, useMemo, memo } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  Tag, 
  Clock, 
  ChevronRight, 
  Calendar,
  User,
  CheckCircle,
  Hash
} from "lucide-react";
import { DETAILED_BLOG_POSTS } from "../blogData";
import { SocialShareButtons } from "./SocialShareButtons";

interface BlogArchiveProps {
  onBackToHome: () => void;
  openBlogPostId?: string | null;
  onSelectBlogPost: (id: string | null) => void;
}

/**
 * BlogArchive Component:
 * Clean, editorial journal publication view with live search, topic filtering,
 * uncluttered typography, and integrated social sharing.
 */
export const BlogArchive = memo(({ onBackToHome, openBlogPostId, onSelectBlogPost }: BlogArchiveProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const activePost = useMemo(() => {
    if (!openBlogPostId) return null;
    return DETAILED_BLOG_POSTS.find(p => p.id === openBlogPostId) || null;
  }, [openBlogPostId]);

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

  // ARTICLE DETAIL MODE
  if (activePost) {
    return (
      <div className="min-h-screen bg-bg text-white pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          {/* Back Navigation Bar & Social Sharing */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-between items-center gap-4 mb-10 pb-6 border-b border-white/10"
          >
            <button 
              onClick={() => onSelectBlogPost(null)}
              className="inline-flex items-center gap-2 group text-zinc-400 hover:text-amber-400 font-ui font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </button>

            <SocialShareButtons title={activePost.title} variant="minimal" />
          </motion.div>

          {/* Editorial Meta Header */}
          <div className="mb-10 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold font-ui text-[10px] uppercase tracking-wider rounded-sm mb-5">
              <Tag size={12} /> {activePost.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-6 text-zinc-100">
              {activePost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-400 font-ui text-xs font-semibold uppercase tracking-widest pb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <User size={14} className="text-amber-400" /> {activePost.author}
              </span>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {activePost.date}
              </span>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Clock size={14} /> {activePost.read}
              </span>
            </div>
          </div>

          {/* Splash Header Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[16/9] w-full rounded-md overflow-hidden bg-zinc-950 border border-white/10 mb-12 shadow-2xl"
          >
            <img 
              src={activePost.img} 
              alt={activePost.title} 
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          {/* Social Share Bar */}
          <div className="mb-12 p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
            <SocialShareButtons title={activePost.title} />
          </div>

          {/* Uncluttered Article Body */}
          <div className="blog-article-content prose prose-invert max-w-none text-zinc-300 leading-relaxed text-lg sm:text-xl lg:text-[1.375rem] font-sans space-y-8">
            {activePost.sections.map((section, index) => {
              switch (section.type) {
                case "text":
                  return (
                    <div key={index} className="space-y-3">
                      {section.title && (
                        <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-8 mb-3">
                          {section.title}
                        </h2>
                      )}
                      <p className="font-normal text-zinc-300 leading-relaxed">{section.body}</p>
                    </div>
                  );

                case "quote":
                  return (
                    <div key={index} className="border-l-2 border-amber-400 pl-6 py-3 my-6 bg-zinc-900/40 rounded-r-md">
                      <p className="font-serif italic text-xl sm:text-2xl text-amber-100 leading-relaxed">
                        "{section.body}"
                      </p>
                    </div>
                  );

                case "bullet-list":
                  return (
                    <div key={index} className="space-y-3 bg-zinc-900/30 border border-zinc-800/80 rounded-lg p-5 sm:p-6">
                      {section.title && (
                        <h3 className="text-base sm:text-lg font-bold font-ui text-amber-400 uppercase tracking-widest mb-3">
                          {section.title}
                        </h3>
                      )}
                      <ul className="space-y-2.5">
                        {section.items?.map((item, key) => (
                          <li key={key} className="flex items-start gap-3 text-zinc-300 text-base sm:text-lg">
                            <span className="mt-1 text-amber-400 flex-shrink-0">
                              <CheckCircle size={15} />
                            </span>
                            <span className="font-normal">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                case "image":
                  return (
                    <figure key={index} className="my-10 space-y-2.5">
                      <div className="aspect-video w-full rounded-md overflow-hidden border border-white/10 shadow-lg">
                        <img 
                          src={section.imageUrl} 
                          alt={section.imageCaption || "Travel Journal Image"} 
                          className="w-full h-full object-cover"
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

          {/* Article Footer & Social Share */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <button 
              onClick={() => onSelectBlogPost(null)}
              className="inline-flex items-center gap-2 border border-white/15 hover:border-amber-400 hover:text-amber-400 px-6 py-3 rounded-md text-xs font-bold font-ui uppercase tracking-widest transition-all cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Journal Grid
            </button>
            <SocialShareButtons title={activePost.title} />
          </div>
        </div>
      </div>
    );
  }

  // ARCHIVE FEED LIST MODE
  return (
    <div className="min-h-screen bg-bg text-white pt-20 sm:pt-24 pb-32">
      {/* Header */}
      <div className="bg-[#090b0e] border-b border-white/10 py-12 sm:py-16 mb-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 font-ui font-semibold text-[11px] uppercase tracking-widest mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} /> Back to Home Portfolio
          </button>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white mb-3">
            The Journal
          </h1>
          <p className="text-zinc-400 font-serif italic text-base sm:text-lg max-w-2xl mb-8">
            Slow-travel notes, packing matrices, photography guides, and regional field dispatches.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Bar */}
            <div className="relative lg:col-span-7">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, destinations, or photography guides..."
                className="w-full bg-zinc-900 border border-zinc-700/80 text-white pl-12 pr-4 py-3.5 rounded-md focus:outline-none focus:border-amber-400 text-sm font-medium placeholder:text-zinc-500 tracking-wide font-ui"
              />
            </div>

            {/* Tag Filters */}
            <div className="lg:col-span-5 flex flex-wrap gap-2 lg:justify-end">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-2 text-[10px] uppercase font-bold tracking-widest font-ui border transition-all rounded-md cursor-pointer ${
                    selectedTag === tag 
                      ? "bg-amber-400 text-black border-amber-400" 
                      : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Journal Cards Feed */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectBlogPost(post.id)}
                className="group cursor-pointer bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-5 sm:p-6 hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden mb-5 rounded-md bg-zinc-900 border border-white/5 relative">
                    <img 
                      src={post.img} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt={post.title} 
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 text-amber-400 border border-amber-400/30 font-bold font-ui text-[9px] uppercase tracking-wider rounded-sm">
                        <Tag size={10} /> {post.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-2.5 text-[10px] uppercase tracking-widest text-zinc-400 font-bold font-ui">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                    <span className="text-amber-400 flex items-center gap-1"><Clock size={11} /> {post.read}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-100 group-hover:text-amber-400 transition-colors leading-snug mb-2.5">
                    {post.title}
                  </h3>
                  <p className="text-zinc-300 text-base sm:text-lg leading-relaxed line-clamp-3 mb-4 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 group-hover:underline inline-flex items-center gap-1 font-ui">
                    Read Article <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="text-xs text-zinc-500 font-sans font-medium">{post.author}</span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-400 bg-zinc-900/40 border border-zinc-800 rounded-lg">
            <Hash size={36} className="mx-auto mb-3 text-zinc-600" />
            <h3 className="text-white text-base font-serif font-bold mb-1">No matching articles found</h3>
            <p className="text-xs font-ui max-w-sm mx-auto text-zinc-400">Try searching for another keyword or reset the category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
});

BlogArchive.displayName = "BlogArchive";


BlogArchive.displayName = "BlogArchive";
