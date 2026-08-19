import { GalleryItem } from "./types";

/**
 * Curated Media Suite for Kerala Expeditions
 * Includes 3 high-resolution photographs and 1 documentary video.
 */
export const KERALA_GALLERY: GalleryItem[] = [
  {
    id: "kl-alleppey",
    tripId: "kerala",
    tripTitle: "Kerala",
    category: "Kerala",
    location: "Vembanad Lake & Alleppey Backwaters, Kerala, India",
    title: "Serene Canals: Traditional Houseboat at Alleppey",
    aspect: "aspect-[3/4]",
    url: "/images/kerala/kerala_alleppey_houseboat.jpg",
    alt: "Traditional thatched bamboo Kettuvallam houseboat cruising along palm-fringed backwaters in Alleppey, Kerala",
    type: "image",
    caption: "Gliding through the emerald canal networks of Alleppey aboard a traditional wooden Kettuvallam houseboat.",
    seoDescription: "High-resolution photograph of a traditional Kerala houseboat navigating the lush palm-fringed backwaters of Alleppey.",
    tags: ["Kerala", "Alleppey", "Backwaters", "Houseboat", "God's Own Country"]
  },
  {
    id: "kl-munnar",
    tripId: "kerala",
    tripTitle: "Kerala",
    category: "Kerala",
    location: "Munnar Hill Station, Western Ghats, Kerala, India",
    title: "Emerald Slopes: Rolling Tea Gardens of Munnar",
    aspect: "aspect-[3/4]",
    url: "/images/kerala/kerala_munnar_tea_gardens.jpg",
    alt: "Vast rolling green hills of tea plantations covered in early morning mist and mountain fog in Munnar, Kerala",
    type: "image",
    caption: "Waking up to cascading hillsides wrapped in thick morning fog and neatly manicured tea plantations in Munnar.",
    seoDescription: "Misty mountain hillsides and vibrant green tea estates in Munnar, Western Ghats, Kerala.",
    tags: ["Kerala", "Munnar", "Tea Estates", "Western Ghats", "Mountains"]
  },
  {
    id: "kl-varkala",
    tripId: "kerala",
    tripTitle: "Kerala",
    category: "Kerala",
    location: "Varkala Cliff Beach, Kerala, India",
    title: "Crimson Ramparts: Sunset at Varkala Cliff",
    aspect: "aspect-[3/4]",
    url: "/images/kerala/kerala_varkala_cliffs.jpg",
    alt: "Towering red laterite cliffs overlooking the sandy shore and breaking turquoise waves of the Arabian Sea in Varkala, Kerala",
    type: "image",
    caption: "The magnificent geological formation of Varkala's red cliffs meeting the sweeping tides of the Arabian Sea.",
    seoDescription: "High vantage view of the dramatic coastal red cliffs and crashing waves at Varkala Beach in Kerala.",
    tags: ["Kerala", "Varkala", "Cliffs", "Arabian Sea", "Coastal"]
  },
  {
    id: "kl-video-backwaters",
    tripId: "kerala",
    tripTitle: "Kerala",
    category: "Kerala",
    location: "Kerala Backwater Tributaries, India",
    title: "Silent Waters: Navigating the Inland Lagoons",
    aspect: "aspect-[9/16]",
    url: "/videos/kerala_backwaters.mp4",
    thumbnailUrl: "/images/kerala/kerala_alleppey_houseboat.jpg",
    alt: "Documentary video footage showing water ripples and coconut tree reflections in Kerala's scenic backwaters",
    type: "video",
    caption: "Peaceful video documentary drifting along calm waters bordered by dense coconut groves and rustic villages.",
    seoDescription: "Tranquil video capturing the peaceful flow and scenic nature of the Kerala backwaters.",
    tags: ["Kerala", "Backwaters", "Travel Video", "Nature", "Houseboat Vlog"]
  }
];
