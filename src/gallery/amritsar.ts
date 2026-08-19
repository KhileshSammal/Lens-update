import { GalleryItem } from "./types";

/**
 * Curated Media Suite for Amritsar Expeditions
 * Includes 3 high-resolution photographs and 1 documentary video.
 */
export const AMRITSAR_GALLERY: GalleryItem[] = [
  {
    id: "amr-golden-dawn",
    tripId: "amritsar",
    tripTitle: "Amritsar",
    category: "Amritsar",
    location: "Sri Harmandir Sahib (Golden Temple), Amritsar, Punjab, India",
    title: "Divine Radiance: Sri Harmandir Sahib at Dawn",
    aspect: "aspect-[3/4]",
    url: "/images/amritsar/amritsar_golden_temple_dawn.jpg",
    alt: "The shimmering gold facade of Sri Harmandir Sahib reflecting perfectly in the still holy waters of the Amrit Sarovar at sunrise",
    type: "image",
    caption: "Early morning calm at Sri Harmandir Sahib as the first rays of dawn reflect upon the sacred holy pool (Amrit Sarovar).",
    seoDescription: "High-resolution spiritual photography of the Golden Temple reflecting in the holy Sarovar pool in Amritsar, Punjab.",
    tags: ["Amritsar", "Golden Temple", "Sri Harmandir Sahib", "Punjab", "Spiritual"]
  },
  {
    id: "amr-night-illumination",
    tripId: "amritsar",
    tripTitle: "Amritsar",
    category: "Amritsar",
    location: "Golden Temple Complex by Night, Amritsar, Punjab, India",
    title: "Golden Glow: The Night Sanctum & Parikrama",
    aspect: "aspect-[3/4]",
    url: "/images/amritsar/amritsar_harmandir_night.jpg",
    alt: "The illuminated Golden Temple shining brightly under a starry night sky with glowing marble parikrama walkway",
    type: "image",
    caption: "The peaceful night atmosphere during the Sukhasan ceremony, with harmonious Gurbani kirtan echoing across the complex.",
    seoDescription: "Nighttime illuminated view of the Golden Temple complex and marble parikrama in Amritsar.",
    tags: ["Amritsar", "Night Photography", "Harmandir Sahib", "Gurbani", "Punjab"]
  },
  {
    id: "amr-wagah-border",
    tripId: "amritsar",
    tripTitle: "Amritsar",
    category: "Amritsar",
    location: "Attari-Wagah International Border, Amritsar, Punjab, India",
    title: "Martial Energy: The Attari-Wagah Beating Retreat",
    aspect: "aspect-[3/4]",
    url: "/images/amritsar/amritsar_attari_wagah_border.jpg",
    alt: "Border Security Force personnel in ceremonial uniform performing the patriotic Beating Retreat ceremony at the Attari-Wagah border",
    type: "image",
    caption: "Experiencing the patriotic fervor and synchronized drill of the ceremonial flag lowering at the Attari-Wagah border.",
    seoDescription: "The energetic and ceremonial flag-lowering drill at the Attari-Wagah border near Amritsar.",
    tags: ["Amritsar", "Wagah Border", "Patriotism", "Attari", "Punjab"]
  },
  {
    id: "amr-video-harmandir",
    tripId: "amritsar",
    tripTitle: "Amritsar",
    category: "Amritsar",
    location: "Holy Amrit Sarovar, Amritsar, India",
    title: "Spiritual Reverence: The Amrit Sarovar Waters",
    aspect: "aspect-[9/16]",
    url: "/videos/amritsar_golden_temple.mp4",
    thumbnailUrl: "/images/amritsar/amritsar_golden_temple_dawn.jpg",
    alt: "Documentary video footage of gentle water ripples in the holy sarovar against the golden architectural backdrop in Amritsar",
    type: "video",
    caption: "Video documentary capturing the devotional serenity and shimmering reflections along the sacred waters of Amritsar.",
    seoDescription: "Spiritual documentary video from the Golden Temple and holy sarovar in Amritsar.",
    tags: ["Amritsar", "Golden Temple Video", "Sarovar", "Punjab Vlog", "Devotion"]
  }
];
