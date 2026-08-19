import React, { useState, useMemo, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Camera, MapPin, ZoomIn, Play, Video as VideoIcon } from "lucide-react";
import { ALL_GALLERY_PHOTOS, GalleryItem, GALLERY_LOCATIONS } from "../gallery";

// Re-export type for compatibility
export type Photo = GalleryItem;
export const SEED_PHOTOS = ALL_GALLERY_PHOTOS;

const isVideo = (item: GalleryItem) => {
  return item.type === "video" || item.url.endsWith(".mp4") || item.url.endsWith(".webm") || item.url.includes("/video/");
};

const isGif = (item: GalleryItem) => {
  return item.type === "gif" || item.url.endsWith(".gif") || item.url.includes(".gif") || item.url.includes("giphy.com");
};

// Location changing bar filters
const FILTERS = [
  { id: "all", label: "All Captures" },
  ...GALLERY_LOCATIONS.map((category) => ({
    id: category,
    label: category,
  })),
];

export const PortfolioGallery = memo(() => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items by category (all images/videos removed)
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") {
      return ALL_GALLERY_PHOTOS;
    }
    return ALL_GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);
  }, [activeFilter]);

  // Handle lightbox controls
  const handleOpenLightbox = useCallback(
    (id: string) => {
      const index = filteredPhotos.findIndex((p) => p.id === id);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    },
    [filteredPhotos]
  );

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.removeProperty("overflow");
  }, []);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev, handleCloseLightbox]);

  // Scroll locking
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [lightboxIndex]);

  // Active photo metadata for lightbox
  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  // JSON-LD Structured Data for Gallery SEO
  const jsonLdData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "The Gallery Suite — Travel Expeditions",
      description: "Visual chronicles, high-resolution photography, and documentary by Khilesh Sammal.",
      image: ALL_GALLERY_PHOTOS.map((item) => ({
        "@type": item.type === "video" ? "VideoObject" : "ImageObject",
        name: item.title,
        contentUrl: item.url.startsWith("http") ? item.url : `https://lensandlatitude.com${item.url}`,
        description: item.seoDescription || item.alt,
        caption: item.caption,
        contentLocation: {
          "@type": "Place",
          name: item.location,
        },
      })),
    };
  }, []);

  return (
    <section id="gallery" className="py-24 bg-[#07090b] relative overflow-hidden">
      {/* JSON-LD for rich image indexing and search engine optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4 bg-zinc-900/80 border border-white/5 px-3 py-1.5 rounded-full">
            <Camera size={12} className="text-amber-400" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-amber-400 font-ui">
              Visual Chronicle
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight mb-4 leading-tight">
            The <span className="text-amber-50 font-normal italic">Gallery</span> Suite
          </h2>
          <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed">
            A curated visual chronicle across global expeditions.
          </p>
        </div>

        {/* Location Changing Bar */}
        <div className="sticky top-20 z-30 flex justify-center mb-12 px-2">
          <div className="backdrop-blur-md bg-zinc-950/90 border border-white/10 p-1.5 rounded-2xl shadow-2xl flex flex-wrap gap-1 items-center justify-center max-w-full">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  id={`gallery-filter-${filter.id.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold font-ui tracking-wide rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-amber-400 text-black font-extrabold shadow-md scale-[1.02]"
                      : "text-zinc-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  id={`gallery-item-${photo.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-xl hover:border-amber-400/40 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-amber-400/5 flex flex-col"
                  onClick={() => handleOpenLightbox(photo.id)}
                >
                  {/* Media Container */}
                  <div className="relative w-full aspect-[4/5] bg-zinc-950 overflow-hidden">
                    {isVideo(photo) ? (
                      <video
                        src={photo.url}
                        poster={photo.thumbnailUrl}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    )}

                    {/* Media Type Badge */}
                    <div className="absolute top-3.5 left-3.5 z-20 flex gap-1.5">
                      {isVideo(photo) ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-wider font-ui shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Video
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider font-ui shadow-md">
                          Photo
                        </span>
                      )}
                    </div>

                    {/* Hover Quick Action */}
                    <div className="absolute top-3.5 right-3.5 bg-black/70 backdrop-blur-sm p-2 rounded-xl border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-lg">
                      {isVideo(photo) ? (
                        <Play size={15} className="text-white fill-white/30" />
                      ) : (
                        <ZoomIn size={15} className="text-white" />
                      )}
                    </div>

                    {/* Interactive Bottom Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1 flex items-center gap-1.5 font-ui">
                        <MapPin size={11} className="shrink-0" />
                        <span className="truncate">{photo.location}</span>
                      </span>
                      <h3 className="text-base font-serif font-semibold text-white leading-snug tracking-wide line-clamp-2">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 always-dark"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button
              id="close-lightbox-btn"
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Prev Trigger */}
            {filteredPhotos.length > 1 && (
              <button
                id="prev-lightbox-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Previous media item"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next Trigger */}
            {filteredPhotos.length > 1 && (
              <button
                id="next-lightbox-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Next media item"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Media Content Box */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(currentPhoto) ? (
                <motion.video
                  key={currentPhoto.id}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  src={currentPhoto.url}
                  poster={currentPhoto.thumbnailUrl}
                  className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-2xl border border-white/15 shadow-2xl bg-zinc-950"
                  controls
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={currentPhoto.url} type="video/mp4" />
                </motion.video>
              ) : (
                <motion.img
                  key={currentPhoto.id}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  src={currentPhoto.url}
                  alt={currentPhoto.alt}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-2xl border border-white/15 shadow-2xl bg-zinc-950"
                />
              )}

              {/* Lightbox Details */}
              <div className="mt-5 text-center text-white max-w-xl bg-zinc-900/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center justify-center gap-1.5 text-[11px] tracking-[0.2em] font-ui uppercase font-bold text-amber-400 mb-1.5">
                  <MapPin size={12} />
                  <span>{currentPhoto.location}</span>
                </div>

                <h3 className="text-lg md:text-xl font-serif text-white leading-tight font-semibold mb-2">
                  {currentPhoto.title}
                </h3>

                {currentPhoto.caption && (
                  <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                    {currentPhoto.caption}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

PortfolioGallery.displayName = "PortfolioGallery";
