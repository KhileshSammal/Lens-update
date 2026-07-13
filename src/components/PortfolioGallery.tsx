import React, { useState, useMemo, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Camera, MapPin, ZoomIn, Compass, Play, Film } from "lucide-react";

// --- Photo Schema & Data ---
interface Photo {
  id: string;
  tripId: string;       // Precise trip code (e.g., "thailand", "patal_bhuvaneshwar", etc.)
  tripTitle: string;    // Location metadata for selected photo (e.g., "Patal Bhuvaneshwar", "Nainital")
  category: string;     // Grouped filter category (e.g., "Kumaon Hills (Patal/Nainital)", "Puri & Goa Circuit")
  title: string;
  aspect: string;
  url: string;          // Accepts both absolute local paths (e.g. "/images/...jpg") and standard web URLs
  type?: "image" | "video" | "gif"; // Optional media type
}

const isVideo = (photo: Photo) => {
  return photo.type === "video" || photo.url.endsWith(".mp4") || photo.url.endsWith(".webm") || photo.url.includes("/video/");
};

const isGif = (photo: Photo) => {
  return photo.type === "gif" || photo.url.endsWith(".gif") || photo.url.includes(".gif") || photo.url.includes("giphy.com");
};

const SEED_PHOTOS: Photo[] = [
  // --- THAILAND ---
  { 
    id: "t-1", 
    tripId: "thailand", 
    tripTitle: "Thailand",
    category: "Thailand",
    title: "Majestic Wat Arun Temple Dawn", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "t-2", 
    tripId: "thailand", 
    tripTitle: "Thailand",
    category: "Thailand",
    title: "Emerald Waters of Phi Phi Islands", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1528181304800-2f1258bb9f35?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "t-3", 
    tripId: "thailand", 
    tripTitle: "Thailand",
    category: "Thailand",
    title: "Traditional Longtail Boat Phuket", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "t-4", 
    tripId: "thailand", 
    tripTitle: "Thailand",
    category: "Thailand",
    title: "Grand Palace Golden Spire Bangkok", 
    aspect: "aspect-[3/5]", 
    url: "/images/thailand/photo_grand_palace.jpg" // Local absolute path example
  },
  { 
    id: "t-4-backup", 
    tripId: "thailand", 
    tripTitle: "Thailand",
    category: "Thailand",
    title: "Grand Palace Golden Spire Bangkok", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1563492065561-76aa00174ec6?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "t-5", 
    tripId: "thailand", 
    tripTitle: "Thailand",
    category: "Thailand",
    title: "Chiang Mai Jungle Canopy Trails", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "t-6", 
    tripId: "thailand", 
    tripTitle: "Thailand",
    category: "Thailand",
    title: "Koh Samui Palm-Fringed Shoreline", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1506125840744-167167210587?auto=format&fit=crop&w=800&q=80" 
  },

  // --- MALAYSIA ---
  { 
    id: "m-1", 
    tripId: "malaysia", 
    tripTitle: "Malaysia",
    category: "Malaysia",
    title: "Iconic Batu Caves Golden Statue", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1596422846543-75c6fc18a52a?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "m-2", 
    tripId: "malaysia", 
    tripTitle: "Malaysia",
    category: "Malaysia",
    title: "Petronas Twin Towers Skyline", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "m-3", 
    tripId: "malaysia", 
    tripTitle: "Malaysia",
    category: "Malaysia",
    title: "Langkawi Canopy Bridge Walkway", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "m-4", 
    tripId: "malaysia", 
    tripTitle: "Malaysia",
    category: "Malaysia",
    title: "Colonial Streets of George Town Penang", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "m-5", 
    tripId: "malaysia", 
    tripTitle: "Malaysia",
    category: "Malaysia",
    title: "Kuala Lumpur Night Lights", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "m-6", 
    tripId: "malaysia", 
    tripTitle: "Malaysia",
    category: "Malaysia",
    title: "Lush Tea Plantations of Cameron Highlands", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80" 
  },

  // --- VIETNAM ---
  { 
    id: "v-1", 
    tripId: "vietnam", 
    tripTitle: "Vietnam",
    category: "Vietnam",
    title: "Golden Bridge Hands Ba Na Hills", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "v-2", 
    tripId: "vietnam", 
    tripTitle: "Vietnam",
    category: "Vietnam",
    title: "Ha Long Bay Emerald Monoliths", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "v-3", 
    tripId: "vietnam", 
    tripTitle: "Vietnam",
    category: "Vietnam",
    title: "Lantern-Lit Streets of Hoi An", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1509060464153-4466739f78d0?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "v-4", 
    tripId: "vietnam", 
    tripTitle: "Vietnam",
    category: "Vietnam",
    title: "Stepped Rice Terraces of Sapa", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "v-5", 
    tripId: "vietnam", 
    tripTitle: "Vietnam",
    category: "Vietnam",
    title: "Hanoi French Quarter Cafe Trails", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "v-6", 
    tripId: "vietnam", 
    tripTitle: "Vietnam",
    category: "Vietnam",
    title: "Mekong Delta Floating Market Sunrise", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=800&q=80" 
  },

  // --- AMRITSAR ---
  { 
    id: "a-1", 
    tripId: "amritsar", 
    tripTitle: "Amritsar",
    category: "Amritsar",
    title: "Golden Temple Sacred Reflection", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "a-2", 
    tripId: "amritsar", 
    tripTitle: "Amritsar",
    category: "Amritsar",
    title: "Harmandir Sahib Shimmering Water", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "a-3", 
    tripId: "amritsar", 
    tripTitle: "Amritsar",
    category: "Amritsar",
    title: "Heritage Streets Near Jallianwala Bagh", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1601919051950-bb9f3fe4ddef?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "a-4", 
    tripId: "amritsar", 
    tripTitle: "Amritsar",
    category: "Amritsar",
    title: "Wagah Border Sunset Ceremony", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1588096344316-f5c9004052b8?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "a-5", 
    tripId: "amritsar", 
    tripTitle: "Amritsar",
    category: "Amritsar",
    title: "Traditional Kulcha Feast Trails", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1627894154449-3079b49b2cf9?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "a-6", 
    tripId: "amritsar", 
    tripTitle: "Amritsar",
    category: "Amritsar",
    title: "Local Amritsari Street Market Bazaars", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=800&q=80" 
  },

  // --- KERALA ---
  { 
    id: "ke-1", 
    tripId: "kerala", 
    tripTitle: "Kerala",
    category: "Kerala",
    title: "Alleppey Houseboat Backwater Canal", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1695180289266-9dbe35c73a66?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "ke-2", 
    tripId: "kerala", 
    tripTitle: "Kerala",
    category: "Kerala",
    title: "Deep Green Tea Gardens of Munnar", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "ke-3", 
    tripId: "kerala", 
    tripTitle: "Kerala",
    category: "Kerala",
    title: "Shimmering Coconut Palms of Kovalam", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "ke-4", 
    tripId: "kerala", 
    tripTitle: "Kerala",
    category: "Kerala",
    title: "Silent Lake Canopy at Kumarakom", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1602216058441-f39454173879?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "ke-5", 
    tripId: "kerala", 
    tripTitle: "Kerala",
    category: "Kerala",
    title: "Varkala Cliff Sunset Beach View", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "ke-6", 
    tripId: "kerala", 
    tripTitle: "Kerala",
    category: "Kerala",
    title: "Serene Coconut Lagoon Sunrise", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80" 
  },

  // --- PATAL BHUVANESHWAR ---
  { 
    id: "pb-1", 
    tripId: "patal_bhuvaneshwar", 
    tripTitle: "Patal Bhuvaneshwar",
    category: "Kumaon Hills",
    title: "Mystical Subterranean Caves of Patal Bhuvaneshwar", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1507163546647-8902d3345447?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "pb-2", 
    tripId: "patal_bhuvaneshwar", 
    tripTitle: "Patal Bhuvaneshwar",
    category: "Kumaon Hills",
    title: "Mystical Valley Cave Portal Opening", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "pb-3", 
    tripId: "patal_bhuvaneshwar", 
    tripTitle: "Patal Bhuvaneshwar",
    category: "Kumaon Hills",
    title: "Ancient Himalayan Stone Cave Shrine", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "pb-4", 
    tripId: "patal_bhuvaneshwar", 
    tripTitle: "Patal Bhuvaneshwar",
    category: "Kumaon Hills",
    title: "Whispering Mountain Mist and Pine Forest", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "pb-5", 
    tripId: "patal_bhuvaneshwar", 
    tripTitle: "Patal Bhuvaneshwar",
    category: "Kumaon Hills",
    title: "Eternal Sacred Limestone Rock Formations", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "pb-6", 
    tripId: "patal_bhuvaneshwar", 
    tripTitle: "Patal Bhuvaneshwar",
    category: "Kumaon Hills",
    title: "Majestic Snow Peak Vista Kumaon", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80" 
  },

  // --- NAINITAL ---
  { 
    id: "n-1", 
    tripId: "nainital", 
    tripTitle: "Nainital",
    category: "Kumaon Hills",
    title: "Sparkling Emerald Waters of Naini Lake", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "n-2", 
    tripId: "nainital", 
    tripTitle: "Nainital",
    category: "Kumaon Hills",
    title: "Alpine Ridge and Reflection on Still Lake", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "n-3", 
    tripId: "nainital", 
    tripTitle: "Nainital",
    category: "Kumaon Hills",
    title: "Sunset Casting Over Beautiful Nainital Hills", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "n-4", 
    tripId: "nainital", 
    tripTitle: "Nainital",
    category: "Kumaon Hills",
    title: "Green Hill Station Valleys & Ridges", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1472214222541-d510753a49f9?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "n-5", 
    tripId: "nainital", 
    tripTitle: "Nainital",
    category: "Kumaon Hills",
    title: "Sunbeam Pathways Through Golden Tall Pines", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "n-6", 
    tripId: "nainital", 
    tripTitle: "Nainital",
    category: "Kumaon Hills",
    title: "Mist Covering the Hill Station Lake", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1434064511983-18c6dae20ed5?auto=format&fit=crop&w=800&q=80" 
  },

  // --- RISHIKESH ---
  { 
    id: "r-1", 
    tripId: "rishikesh", 
    tripTitle: "Rishikesh",
    category: "Rishikesh & Mussoorie",
    title: "Ganga Aarti Evening Ceremony Triveni Ghat", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "r-2", 
    tripId: "rishikesh", 
    tripTitle: "Rishikesh",
    category: "Rishikesh & Mussoorie",
    title: "Rafting Thrills on Sacred Rapids", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "r-3", 
    tripId: "rishikesh", 
    tripTitle: "Rishikesh",
    category: "Rishikesh & Mussoorie",
    title: "Himalayan Forest Yoga Retreat Sunrise", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1506191844857-76b66fee7eed?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "r-4", 
    tripId: "rishikesh", 
    tripTitle: "Rishikesh",
    category: "Rishikesh & Mussoorie",
    title: "Cozy Foggy Morning Over Landour Valleys", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "r-5", 
    tripId: "rishikesh", 
    tripTitle: "Rishikesh",
    category: "Rishikesh & Mussoorie",
    title: "Scenic Scooter Ride in Himalayan Foothills", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "r-6", 
    tripId: "rishikesh", 
    tripTitle: "Rishikesh",
    category: "Rishikesh & Mussoorie",
    title: "Forest River Stream Water Reflection", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" 
  },

  // --- JAGANNATH PURI ---
  { 
    id: "jp-1", 
    tripId: "jagannath_puri", 
    tripTitle: "Jagannath Puri",
    category: "Puri & Goa Circuit",
    title: "Ancient Holy Temple Spires and Spreads", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "jp-2", 
    tripId: "jagannath_puri", 
    tripTitle: "Jagannath Puri",
    category: "Puri & Goa Circuit",
    title: "Golden Bay of Bengal Sandy Shores", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "jp-3", 
    tripId: "jagannath_puri", 
    tripTitle: "Jagannath Puri",
    category: "Puri & Goa Circuit",
    title: "Devotional Golden Wave Sunset Reflection", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "jp-4", 
    tripId: "jagannath_puri", 
    tripTitle: "Jagannath Puri",
    category: "Puri & Goa Circuit",
    title: "Sacred Temple Flag Fluttering Spires", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "jp-5", 
    tripId: "jagannath_puri", 
    tripTitle: "Jagannath Puri",
    category: "Puri & Goa Circuit",
    title: "Chariot Traditional Stone Carvings", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "jp-6", 
    tripId: "jagannath_puri", 
    tripTitle: "Jagannath Puri",
    category: "Puri & Goa Circuit",
    title: "Spiritual Incense Burning Morning Dawn", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80" 
  },

  // --- GOA ---
  { 
    id: "g-1", 
    tripId: "goa", 
    tripTitle: "Goa",
    category: "Puri & Goa Circuit",
    title: "Historic Sun Kissed Cliffs at Aguada Fort", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "g-2", 
    tripId: "goa", 
    tripTitle: "Goa",
    category: "Puri & Goa Circuit",
    title: "Historic River Shore and Cathedral Sunrise", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "g-3", 
    tripId: "goa", 
    tripTitle: "Goa",
    category: "Puri & Goa Circuit",
    title: "Swaying Palms of Goan Mandovi Coastline", 
    aspect: "aspect-[1/1]", 
    url: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "g-4", 
    tripId: "goa", 
    tripTitle: "Goa",
    category: "Puri & Goa Circuit",
    title: "Coastal Shack Sunset and Evening Lights", 
    aspect: "aspect-[3/5]", 
    url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "g-5", 
    tripId: "goa", 
    tripTitle: "Goa",
    category: "Puri & Goa Circuit",
    title: "Tropical Palm-Fringed Sandy Coast", 
    aspect: "aspect-[4/3]", 
    url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "g-6", 
    tripId: "goa", 
    tripTitle: "Goa",
    category: "Puri & Goa Circuit",
    title: "Colorful Portuguese Streets of Fontainhas", 
    aspect: "aspect-[3/4]", 
    url: "https://images.unsplash.com/photo-1528696887332-94a0f4477c77?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: "g-video-1", 
    tripId: "goa", 
    tripTitle: "Goa",
    category: "Puri & Goa Circuit",
    title: "Cinematic Coastal Ocean Waves Loop", 
    aspect: "aspect-[16/9]", 
    url: "https://vjs.zencdn.net/v/oceans.mp4",
    type: "video"
  },
  { 
    id: "ke-gif-1", 
    tripId: "kerala", 
    tripTitle: "Kerala",
    category: "Kerala",
    title: "Enchanting Backwater Scenic Route", 
    aspect: "aspect-[4/3]", 
    url: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3N5YTN3amxxYWZiaTZrMTQ4dmFtbjVqenI5eDBlbnY4NHM3c3drZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6Zt6bK2SDFW65fO8/giphy.gif",
    type: "gif"
  }
];

// Dynamically generate filter options based on the unique categories present in the data array
const DYNAMIC_CATEGORIES = Array.from(new Set(SEED_PHOTOS.map(photo => photo.category)));

const FILTERS = [
  { id: "all", label: "All Journeys" },
  ...DYNAMIC_CATEGORIES.map(category => ({
    id: category,
    label: category
  }))
];

export const PortfolioGallery = memo(() => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter photos dynamically by category (or show all items if 'All Journeys' is selected)
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") {
      const counts: Record<string, number> = {};
      return SEED_PHOTOS.filter(photo => {
        const id = photo.tripId;
        counts[id] = (counts[id] || 0) + 1;
        return counts[id] <= 3;
      });
    }
    return SEED_PHOTOS.filter(photo => photo.category === activeFilter);
  }, [activeFilter]);

  // Handle lightbox controls
  const handleOpenLightbox = useCallback((id: string) => {
    const index = filteredPhotos.findIndex(p => p.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  }, [filteredPhotos]);

  // Safe and clean close handler to re-enable scrolling on the main document
  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.removeProperty("overflow");
  }, []);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
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

  // Scroll locking hook with cleanup guarantees
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

  // Retrieve advanced photography metadata dynamically
  const currentMetadata = useMemo(() => {
    if (lightboxIndex === null || !filteredPhotos[lightboxIndex]) return null;
    const photo = filteredPhotos[lightboxIndex];
    const configs: Record<string, { gear: string; settings: string; coords: string }> = {
      thailand: { gear: "Leica Q3 • Summilux 28mm f/1.7 ASPH", settings: "ISO 100 • f/5.6 • 1/500s", coords: "Lat: 13.7563° N • Lon: 100.5018° E" },
      malaysia: { gear: "Fujifilm GFX 100S • GF 32-64mm f/4", settings: "ISO 200 • f/8.0 • 1/125s", coords: "Lat: 3.1390° N • Lon: 101.6869° E" },
      vietnam: { gear: "Sony Alpha 7R V • FE 24-70mm GM II", settings: "ISO 64 • f/4.0 • 1/800s", coords: "Lat: 16.0544° N • Lon: 108.2022° E" },
      amritsar: { gear: "Hasselblad X2D 100C • XCD 38mm", settings: "ISO 64 • f/2.5 • 1/1000s", coords: "Lat: 31.6200° N • Lon: 74.8765° E" },
      kerala: { gear: "Leica M11 • Summicron 35mm f/2", settings: "ISO 160 • f/2.0 • 1/400s", coords: "Lat: 9.4981° N • Lon: 76.3388° E" },
      patal_bhuvaneshwar: { gear: "Sony Alpha 7R V • FE 16-35mm G", settings: "ISO 400 • f/11 • 1/60s", coords: "Lat: 29.7401° N • Lon: 80.0886° E" },
      nainital: { gear: "Sony Alpha 7R V • FE 70-200mm f/2.8 GM II", settings: "ISO 100 • f/4.0 • 1/320s", coords: "Lat: 29.3803° N • Lon: 79.4636° E" },
      rishikesh: { gear: "Canon EOS R5 • RF 24-105mm f/4 L", settings: "ISO 100 • f/5.6 • 1/250s", coords: "Lat: 30.0869° N • Lon: 78.2676° E" },
      jagannath_puri: { gear: "Leica Q3 • Summilux 28mm f/1.7 ASPH", settings: "ISO 80 • f/1.7 • 1/1600s", coords: "Lat: 19.8135° N • Lon: 85.8312° E" },
      goa: { gear: "Leica Q3 • Summilux 28mm f/1.7 ASPH", settings: "ISO 80 • f/1.7 • 1/1600s", coords: "Lat: 15.4909° N • Lon: 73.8278° E" },
    };
    return configs[photo.tripId] || { gear: "Premium Mirrorless Camera", settings: "ISO 100 • f/4.0 • 1/250s", coords: "Lens & Latitude Horizon Map" };
  }, [lightboxIndex, filteredPhotos]);

  return (
    <section id="gallery" className="py-24 bg-[#07090b] relative overflow-hidden">
      {/* Light decorative ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-zinc-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
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
            A high-fidelity mosaic of captured light, ancient sacred gates, misty ridges, and coastal horizons across our complete global expeditions.
          </p>
        </div>

        {/* High-grade Frosted Glass Filter Bar (Sticky Container) */}
        <div className="sticky top-20 z-30 flex justify-center mb-12 px-2">
          <div className="backdrop-blur-md bg-white/75 border border-slate-200/80 p-1.5 rounded-2xl shadow-lg flex flex-wrap gap-1 items-center justify-center max-w-full">
            {FILTERS.map(filter => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 text-xs font-semibold font-ui tracking-wide rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                      : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pure CSS Masonry Image Gallery with Framer Motion transitions */}
        <motion.div 
          layout
          className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance] space-y-3 sm:space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
                className="break-inside-avoid relative overflow-hidden group rounded-2xl border border-slate-200/60 shadow-sm hover:border-slate-400/40 cursor-pointer bg-zinc-900 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-400/5 mb-3 sm:mb-4"
                onClick={() => handleOpenLightbox(photo.id)}
              >
                {/* Media Element (Image / Video / GIF) */}
                <div className={`${photo.aspect} w-full relative overflow-hidden`}>
                  {isVideo(photo) ? (
                    <video
                      src={photo.url}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback for local image examples to keep UI fully functional
                        if (photo.id === "t-4") {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1563492065561-76aa00174ec6?auto=format&fit=crop&w=800&q=80";
                        }
                      }}
                    />
                  )}
                  
                  {/* Subtle Media Badge */}
                  <div className="absolute top-4 left-4 z-20 flex gap-1.5">
                    {isVideo(photo) && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/10 rounded text-[9px] font-bold text-red-400 uppercase tracking-wider font-ui">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        Video
                      </span>
                    )}
                    {isGif(photo) && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/10 rounded text-[9px] font-bold text-amber-400 uppercase tracking-wider font-ui">
                        GIF
                      </span>
                    )}
                  </div>

                  {/* Subtle Top-Right Quick action icon */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    {isVideo(photo) ? (
                      <Play size={14} className="text-white fill-white/20" />
                    ) : (
                      <ZoomIn size={14} className="text-white" />
                    )}
                  </div>

                  {/* Absolute-positioned dark linear gradient interactive overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                      <MapPin size={10} />
                      {photo.tripTitle}
                    </span>
                    <h3 className="text-sm font-serif font-semibold text-white leading-tight tracking-wide">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State if no photos exist */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 bg-zinc-950/50 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-sm">No captures found for this filter.</p>
          </div>
        )}

      </div>

      {/* Portal-Style Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 md:p-8 always-dark"
            onClick={handleCloseLightbox}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Previous Photo Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next Photo Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Image Canvas Frame Container */}
            <div 
              className="relative max-w-5xl max-h-[75vh] md:max-h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(filteredPhotos[lightboxIndex]) ? (
                <motion.video
                  key={filteredPhotos[lightboxIndex].id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  src={filteredPhotos[lightboxIndex].url}
                  className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-xl border border-white/10 shadow-2xl bg-zinc-950"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <motion.img
                  key={filteredPhotos[lightboxIndex].id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 180 }}
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[60vh] md:max-h-[65vh] object-contain rounded-xl border border-white/10 shadow-2xl bg-zinc-950"
                  onError={(e) => {
                    // Fallback for local image examples to keep lightbox fully functional
                    if (filteredPhotos[lightboxIndex].id === "t-4") {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1563492065561-76aa00174ec6?auto=format&fit=crop&w=800&q=80";
                    }
                  }}
                />
              )}

              {/* Enhanced Dynamic Title, Location, and Advanced EXIF Metadata Overlay */}
              <div className="mt-6 text-center text-white max-w-xl bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="flex items-center justify-center gap-1 text-[11px] tracking-[0.2em] font-ui uppercase font-bold text-amber-400 mb-1">
                  <MapPin size={10} />
                  <span>
                    {filteredPhotos[lightboxIndex].tripTitle}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-serif text-white leading-tight font-semibold">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

PortfolioGallery.displayName = "PortfolioGallery";
