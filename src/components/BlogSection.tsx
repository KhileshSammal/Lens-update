import { memo } from "react";
import { motion } from "motion/react";
import { Tag, Clock, ChevronRight } from "lucide-react";
import { DETAILED_BLOG_POSTS } from "../blogData";

interface BlogSectionProps {
  onSelectPost: (id: string) => void;
}

export const BlogSection = memo(({ onSelectPost }: BlogSectionProps) => {
  return (
    <section id="blog" className="py-16 md:py-32 px-4 sm:px-6 lg:px-8 w-full max-w-[92%] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-2">The Journal</h2>
          <p className="text-accent text-xs md:text-sm italic font-ui font-medium">Detailed guides and personal notes.</p>
        </div>
        <button 
          onClick={() => onSelectPost("archive-list")}
          className="text-text-dim hover:text-accent font-ui font-bold text-xs uppercase tracking-widest border border-border-main hover:border-accent/40 px-5 py-2.5 transition-all w-fit cursor-pointer"
        >
          View All Posts
        </button>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {DETAILED_BLOG_POSTS.slice(0, 2).map((post, idx) => (
          <motion.article 
            key={post.id} 
            onClick={() => onSelectPost(post.id)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
            className="group cursor-pointer"
          >
            <div className="aspect-video overflow-hidden mb-5 rounded-sm bg-card-bg border border-border-main">
              <img 
                src={post.img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={`Cover photograph for journal article: ${post.title}`} 
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center space-x-3 mb-3 text-[9px] uppercase tracking-widest text-accent font-bold font-ui">
              <span className="flex items-center gap-1"><Tag size={12} /> {post.tag}</span>
              <span className="w-1.5 h-1.5 bg-border-main rounded-full"></span>
              <span className="text-text-dim font-normal flex items-center gap-1"><Clock size={12} /> {post.read}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif mb-4 leading-tight transition-all group-hover:text-accent">{post.title}</h3>
            <span className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-border-main pb-1 group-hover:text-accent group-hover:border-accent inline-flex items-center gap-2 font-ui transition-all">
              Read Post <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
});

BlogSection.displayName = "BlogSection";
