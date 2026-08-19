import { GalleryItem } from "./types";

/**
 * Curated Media Suite for Malaysia Expeditions
 * Includes 3 high-resolution photographs and 1 documentary video.
 */
export const MALAYSIA_GALLERY: GalleryItem[] = [
  {
    id: "my-petronas",
    tripId: "malaysia",
    tripTitle: "Malaysia",
    category: "Malaysia",
    location: "Kuala Lumpur City Centre (KLCC), Malaysia",
    title: "Illuminated Marvel: Petronas Twin Towers at Dusk",
    aspect: "aspect-[3/4]",
    url: "/images/malaysia/malaysia_petronas_towers.jpg",
    alt: "Gleaming steel and glass Petronas Twin Towers illuminated against deep twilight blue skies in Kuala Lumpur, Malaysia",
    type: "image",
    caption: "The world-famous Petronas Twin Towers gleaming brightly under the evening skyline at KLCC park.",
    seoDescription: "High-resolution architectural photography of the iconic illuminated Petronas Twin Towers in Kuala Lumpur, Malaysia.",
    tags: ["Malaysia", "Kuala Lumpur", "Petronas Towers", "Architecture", "Cityscape"]
  },
  {
    id: "my-batu-caves",
    tripId: "malaysia",
    tripTitle: "Malaysia",
    category: "Malaysia",
    location: "Batu Caves, Gombak, Selangor, Malaysia",
    title: "Ascent to the Sanctum: Batu Caves Rainbow Steps",
    aspect: "aspect-[3/4]",
    url: "/images/malaysia/malaysia_batu_caves.jpg",
    alt: "Towering golden Lord Murugan statue standing in front of the colorful 272 steps leading into Batu Caves, Malaysia",
    type: "image",
    caption: "Standing in awe of the colossal 140-foot golden Lord Murugan statue and ascending the vibrant 272 stairs into limestone cathedral caves.",
    seoDescription: "The iconic giant golden statue of Lord Murugan and rainbow flight of steps at Batu Caves in Selangor, Malaysia.",
    tags: ["Malaysia", "Batu Caves", "Hindu Temple", "Culture", "Selangor"]
  },
  {
    id: "my-penang",
    tripId: "malaysia",
    tripTitle: "Malaysia",
    category: "Malaysia",
    location: "George Town, Penang, Malaysia",
    title: "Colonial Charm & Heritage Lanes of George Town",
    aspect: "aspect-[3/4]",
    url: "/images/malaysia/malaysia_penang_street.jpg",
    alt: "Historic colonial shophouses and atmospheric cobblestone streets with vibrant lanterns in George Town, Penang, Malaysia",
    type: "image",
    caption: "Strolling through UNESCO-listed heritage streets in Penang, surrounded by historic Peranakan architecture and street art.",
    seoDescription: "Atmospheric street photography capturing heritage architecture and vibrant lanes in George Town, Penang.",
    tags: ["Malaysia", "Penang", "George Town", "Heritage", "Street Photography"]
  },
  {
    id: "my-video-kl",
    tripId: "malaysia",
    tripTitle: "Malaysia",
    category: "Malaysia",
    location: "Kuala Lumpur Metropolis, Malaysia",
    title: "Urban Vibrance & Skyline Dynamics of KL",
    aspect: "aspect-[9/16]",
    url: "/videos/malaysia_kl_skyline.mp4",
    thumbnailUrl: "/images/malaysia/malaysia_petronas_towers.jpg",
    alt: "Documentary video footage capturing the fast-moving pulse and skyline vistas of Kuala Lumpur, Malaysia",
    type: "video",
    caption: "Cinematic moments capturing the metropolitan skyline, monorails, and tropical urban sunsets of Kuala Lumpur.",
    seoDescription: "Documentary video showcasing the lively modern skyline and sights in Kuala Lumpur, Malaysia.",
    tags: ["Malaysia", "Kuala Lumpur", "Metropolis", "Travel Video", "Skyline"]
  }
];
