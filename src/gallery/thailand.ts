import { GalleryItem } from "./types";

/**
 * Curated Media Suite for Thailand Expeditions
 * Includes 3 high-resolution photographs and 1 documentary video.
 */
export const THAILAND_GALLERY: GalleryItem[] = [
  {
    id: "th-beach-phuket",
    tripId: "thailand",
    tripTitle: "Thailand",
    category: "Thailand",
    location: "Maya Bay & Phi Phi Islands, Phuket, Thailand",
    title: "Sunlit Sands of Maya Bay & Phi Phi",
    aspect: "aspect-[3/4]",
    url: "/images/thailand/thailand_phuket_beach.jpg",
    alt: "Traditional wooden longtail boat moored on turquoise waters at Maya Bay, Phi Phi Islands, Thailand",
    type: "image",
    caption: "Early morning expedition to Maya Bay with crystal clear turquoise tides and towering limestone karsts.",
    seoDescription: "High-resolution scenic landscape of traditional longtail boats resting in turquoise waters at Maya Bay in Thailand.",
    tags: ["Thailand", "Phuket", "Phi Phi Islands", "Maya Bay", "Travel Photography"]
  },
  {
    id: "th-wat-chalong",
    tripId: "thailand",
    tripTitle: "Thailand",
    category: "Thailand",
    location: "Wat Chalong Temple, Phuket, Thailand",
    title: "Sacred Spires: Architectural Serenity at Wat Chalong",
    aspect: "aspect-[3/4]",
    url: "/images/thailand/thailand_wat_chalong.jpg",
    alt: "Intricately detailed golden pagodas and spires of Wat Chalong Buddhist temple against blue sky in Phuket, Thailand",
    type: "image",
    caption: "Exploring the revered grounds of Wat Chalong, admiring intricate gold-gilded architecture and peaceful temple courtyards.",
    seoDescription: "Exquisite architectural detail of Buddhist temple spires and pagodas at Wat Chalong in Phuket, Thailand.",
    tags: ["Thailand", "Wat Chalong", "Culture", "Architecture", "Buddhist Temple"]
  },
  {
    id: "th-phang-nga",
    tripId: "thailand",
    tripTitle: "Thailand",
    category: "Thailand",
    location: "Phang Nga Bay Marine Park, Thailand",
    title: "Karst Monoliths: Cruising Phang Nga Bay",
    aspect: "aspect-[3/4]",
    url: "/images/thailand/thailand_phang_nga.jpg",
    alt: "Dramatic vertical limestone karsts rising out of emerald green waters in Phang Nga Bay Marine National Park, Thailand",
    type: "image",
    caption: "Canoeing through the labyrinth of limestone monoliths and secluded sea caves across Phang Nga Bay.",
    seoDescription: "Limestone cliffs rising out of serene emerald waters in Phang Nga Bay, Thailand.",
    tags: ["Thailand", "Phang Nga Bay", "Limestone Karst", "Nature", "Canoeing"]
  },
  {
    id: "th-video-ocean",
    tripId: "thailand",
    tripTitle: "Thailand",
    category: "Thailand",
    location: "Andaman Coastal Seascape, Phuket, Thailand",
    title: "Sailing the Andaman Sea & Hidden Lagoons",
    aspect: "aspect-[9/16]",
    url: "/videos/thailand_phuket_sea.mp4",
    thumbnailUrl: "/images/thailand/thailand_phuket_beach.jpg",
    alt: "Documentary video capturing speedboats and azure ocean ripples navigating the Andaman coastal waters in Thailand",
    type: "video",
    caption: "Documentary footage capturing speedboat navigation across the Andaman Sea toward hidden lagoons and coral reefs.",
    seoDescription: "Scenic video documentary navigating across turquoise waters in Thailand.",
    tags: ["Thailand", "Andaman Sea", "Phuket", "Boat Video", "Travel Vlog"]
  }
];
