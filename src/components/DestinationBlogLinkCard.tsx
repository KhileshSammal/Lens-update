import React, { memo } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Utensils, 
  Luggage 
} from "lucide-react";
import { DETAILED_BLOG_POSTS, BlogPost } from "../blogData";

interface DestinationBlogLinkCardProps {
  blogPostId: string;
  onOpenBlog?: (postId: string) => void;
  destinationLabel?: string;
  customSubtitle?: string;
}

export const DestinationBlogLinkCard = memo(({
  blogPostId,
  onOpenBlog,
  destinationLabel,
  customSubtitle
}: DestinationBlogLinkCardProps) => {
  const post: BlogPost | undefined = DETAILED_BLOG_POSTS.find(p => p.id === blogPostId);

  if (!post) return null;

  const handleReadBlog = () => {
    if (onOpenBlog) {
      onOpenBlog(post.id);
    } else {
      window.location.href = `/blog/${post.id}`;
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="my-16 scroll-mt-24"
    >
      <div 
        onClick={handleReadBlog}
        className="relative bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border border-amber-400/30 hover:border-amber-400/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden group cursor-pointer transition-all duration-300"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/10 transition-all" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* Content Column (Left on Desktop) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold font-ui text-[10px] uppercase tracking-widest rounded-full">
                <BookOpen size={12} />
                Full Editorial Field Journal
              </span>
              {destinationLabel && (
                <span className="text-zinc-400 font-ui text-[11px] uppercase tracking-wider font-semibold">
                  • {destinationLabel}
                </span>
              )}
            </div>

            {/* Main Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors leading-[1.2]">
              {post.title}
            </h3>

            {/* Narrative Summary */}
            <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed line-clamp-3">
              {customSubtitle || post.excerpt}
            </p>

            {/* Key Resource Badges included in the article */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 font-ui">
                <Compass size={14} className="text-amber-400 shrink-0" />
                <span className="truncate">Day-by-Day Route</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 font-ui">
                <Utensils size={14} className="text-amber-400 shrink-0" />
                <span className="truncate">Top Foods to Try</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 font-ui">
                <Luggage size={14} className="text-amber-400 shrink-0" />
                <span className="truncate">Packing Checklist</span>
              </div>
            </div>

            {/* Meta Bar & CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-4 text-zinc-400 font-ui text-xs font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Calendar size={13} className="text-amber-400" /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Clock size={13} /> {post.read}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReadBlog();
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-ui font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all group-hover:scale-105 shrink-0 cursor-pointer"
              >
                <span>Read Full Itinerary & Blog</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Featured Visual Image Preview (Right on Desktop) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-700/60 shadow-xl group-hover:border-amber-400/40 transition-all">
              <img 
                src={post.img} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Floating Pill on Image */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-ui font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={11} className="text-amber-400" />
                <span>Complete Field Guide</span>
              </div>

              {/* Floating Bottom Excerpt on Image */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-white/10 text-left">
                <span className="text-[10px] font-bold font-ui text-amber-400 uppercase tracking-wider block mb-0.5">
                  Author Field Notes
                </span>
                <p className="text-xs text-zinc-200 font-sans line-clamp-1">
                  By {post.author} • {post.read} comprehensive breakdown
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
});

DestinationBlogLinkCard.displayName = "DestinationBlogLinkCard";
