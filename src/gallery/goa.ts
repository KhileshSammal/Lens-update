import { GalleryItem } from "./types";

/**
 * Curated Media Suite for Goa & Jagannath Puri Coastal Expeditions
 * Includes 3 high-resolution photographs and 1 documentary video.
 */
export const GOA_GALLERY: GalleryItem[] = [
  {
    id: "goa-palolem",
    tripId: "goa",
    tripTitle: "Goa",
    category: "Goa",
    location: "Palolem Beach, South Goa, India",
    title: "Golden Hour Glow: Palolem Beach Coastline",
    aspect: "aspect-[3/4]",
    url: "/images/goa/goa_palolem_beach.jpg",
    alt: "Warm golden sunset rays illuminating coconut palms and gentle rolling waves on Palolem Beach in South Goa, India",
    type: "image",
    caption: "Sunset strolls along the crescent bay of Palolem as the Arabian Sea reflects rich amber and crimson light.",
    seoDescription: "Stunning golden hour landscape photograph of Palolem Beach with palm trees in South Goa, India.",
    tags: ["Goa", "Palolem Beach", "Sunset", "Coastal", "Arabian Sea"]
  },
  {
    id: "goa-fontainhas",
    tripId: "goa",
    tripTitle: "Goa",
    category: "Goa",
    location: "Fontainhas Latin Quarter, Panaji, Goa, India",
    title: "Vibrant Palette: Fontainhas Heritage Quarter",
    aspect: "aspect-[3/4]",
    url: "/images/goa/goa_fontainhas_heritage.jpg",
    alt: "Colonial Portuguese heritage homes painted in pastel yellow, ochre, and indigo with wooden balconies in Fontainhas, Goa",
    type: "image",
    caption: "Wandering the narrow cobblestone lanes of Panaji's Latin Quarter, enveloped by vibrant 18th-century architecture.",
    seoDescription: "Vibrant Portuguese colonial architecture and pastel facades in the historic Fontainhas district of Goa.",
    tags: ["Goa", "Fontainhas", "Panaji", "Heritage", "Architecture"]
  },
  {
    id: "goa-chapora",
    tripId: "goa",
    tripTitle: "Goa",
    category: "Goa",
    location: "Chapora Fort & Vagator Coast, North Goa, India",
    title: "Endless Horizons: Ocean Vistas from Chapora Fort",
    aspect: "aspect-[3/4]",
    url: "/images/goa/goa_chapora_coastal.jpg",
    alt: "Panoramic clifftop overlook from Chapora Fort walls looking down upon Vagator and the expansive blue sea in Goa",
    type: "image",
    caption: "Perched atop the ancient red laterite ramparts of Chapora Fort, overlooking crashing ocean waves and the coastline.",
    seoDescription: "Panoramic coastal view over the Arabian Sea from the historic Chapora Fort in North Goa.",
    tags: ["Goa", "Chapora Fort", "Vagator", "Ocean Overlook", "Clifftops"]
  },
  {
    id: "goa-video-waves",
    tripId: "goa",
    tripTitle: "Goa",
    category: "Goa",
    location: "Goan Coastline & Sea Swells, India",
    title: "Coastal Rhythms: Tides of the Arabian Sea",
    aspect: "aspect-[9/16]",
    url: "/videos/goa_ocean_waves.mp4",
    thumbnailUrl: "/images/goa/goa_palolem_beach.jpg",
    alt: "Documentary video footage capturing the rhythmic waves and sunset glow along the sandy beaches of Goa",
    type: "video",
    caption: "Gentle ocean breakers and coastal tides washing across the shores of Goa during golden hour.",
    seoDescription: "Documentary video capturing serene waves and coastal tides along Goa's golden shoreline.",
    tags: ["Goa", "Ocean Waves", "Coastal Video", "Arabian Sea", "Nature"]
  }
];
