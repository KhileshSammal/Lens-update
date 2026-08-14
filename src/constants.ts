import { 
  User, 
  MapPin, 
  BookOpen, 
  ShoppingBag, 
  Mail, 
  Instagram, 
  Youtube, 
  Camera, 
  Tag, 
  Clock, 
  Sparkles, 
  ShoppingCart, 
  Download, 
  Globe
} from "lucide-react";

/**
 * NAV_ITEMS:
 * Primary navigation links for header and quick jump links.
 */
export const NAV_ITEMS = [
  { name: "About", href: "#about", icon: User },
  { name: "Destinations", href: "#directory", icon: MapPin },
  { name: "Gallery", href: "#gallery", icon: Camera },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Contact", href: "#contact", icon: Mail },
];

/**
 * SOCIAL_LINKS:
 * Social media platform links for Khilesh Sammal's personal channels.
 */
export const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://www.instagram.com/mr.khilesh__", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/c/KhileshSammalVlogs2125", label: "YouTube" },
  { icon: Camera, href: "#", label: "Photography" },
];

/**
 * TRIPS:
 * Destination catalog featuring both Indian and International expeditions.
 */
export const TRIPS = [
  { id: 1, category: "international", title: "Thailand Diaries - 2025", subtitle: "Paradise Phuket", img: "https://images.unsplash.com/photo-1681459878397-14dc6d270fe4?auto=format&fit=crop&w=600&q=80", link: "/destination/thailand" },
  { id: 2, category: "international", title: "The Malaysia Expedition - 2025", subtitle: "Cultural Hub", img: "https://images.unsplash.com/photo-1580496297468-1e05179cfd81?auto=format&fit=crop&w=600&q=80", link: "/destination/malaysia" },
  { id: 3, category: "india", title: "Amritsar Grace - 2025", subtitle: "Punjab", img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=600&q=80", link: "/destination/amritsar" },
  { id: 4, category: "india", title: "Kerala & Kanyakumari - 2026", subtitle: "Southern Coast", img: "https://images.unsplash.com/photo-1695180289266-9dbe35c73a66?auto=format&fit=crop&w=600&q=80", link: "/destination/kerala" },
  { id: 5, category: "india", title: "Patal Bhuwneswar - 2025", subtitle: "Uttarakhand", img: "https://images.unsplash.com/photo-1714744715493-ad89b7ff503e?auto=format&fit=crop&w=600&q=80", link: "/destination/patal-bhuvaneshwar" },
  { id: 6, category: "india", title: "Rishikesh - 2025", subtitle: "Uttarakhand", img: "https://images.unsplash.com/photo-1716573260891-23ad993e8833?auto=format&fit=crop&w=600&q=80", link: "/destination/rishikesh" },
  { id: 7, category: "india", title: "The Jagannath Puri to Sea Expedition", subtitle: "Lens & Latitude — East Coast to West Coast Loop", img: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80", link: "/destination/goa" },
  { id: 8, category: "international", title: "Vietnam Expedition - July 2026", subtitle: "Saigon, Hanoi, Ha Long & Ninh Binh (2 Persons)", img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80", link: "/destination/vietnam" },
  { id: 9, category: "india", title: "Nainital Heights - 2025", subtitle: "Uttarakhand", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80", link: "/blog/nainital-heights-2025" },
  { id: 10, category: "india", title: "Mulki Expedition", subtitle: "Karnataka Surfing Haven", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", link: "/destination/mulki" },
  { id: 11, category: "india", title: "Andaman Islands", subtitle: "Emerald Archipelago", img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=600&q=80", link: "/destination/andaman" },
  { id: 12, category: "international", title: "Philippines Expedition", subtitle: "Tropical Archipelagos", img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80", link: "/destination/philippines" },
  { id: 13, category: "international", title: "Nepal Heights", subtitle: "Himalayan Sanctuary", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80", link: "/destination/nepal" },
];

/**
 * BLOG_POSTS:
 * Featured travel articles displayed on the homepage preview grid.
 */
export const BLOG_POSTS = [
  { 
    title: "How to pack for a 30-day Solo Trip across SE Asia", 
    tag: "Travel Tips", 
    read: "5 Min Read", 
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    title: "My 2025 Camera Gear: Capturing Luxury in Motion", 
    tag: "Photography", 
    read: "8 Min Read", 
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80" 
  },
];

/**
 * SHOP_ITEMS:
 * Highlighted travel products rendered in the homepage travel shop section.
 */
export const SHOP_ITEMS = [
  { name: "Nomad Backpack v1", price: "₹4,999", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80", icon: ShoppingCart, btn: "Add to Cart" },
  { name: "Solo Signature Cap", price: "₹899", img: "https://images.unsplash.com/photo-1746187864512-1e1c782dbbed?auto=format&fit=crop&w=400&q=80", icon: ShoppingCart, btn: "Add to Cart" },
  { name: "Lightroom Presets", price: "₹1,499", img: "https://images.unsplash.com/photo-1706803501715-8d0e4445e446?auto=format&fit=crop&w=400&q=80", icon: Download, btn: "Get Access" },
  { name: "Lens & Latitude Journal", price: "₹699", img: "https://images.unsplash.com/photo-1637689113621-73951984fcc1?auto=format&fit=crop&w=400&q=80", icon: ShoppingCart, btn: "Add to Cart" },
];

/**
 * FAQS:
 * Reorganized Travel Frequently Asked Questions with categorical grouping for enhanced navigation.
 */
export const FAQS = [
  { 
    category: "Platform & Philosophy",
    q: "What is Lens & Latitude about?", 
    a: "Lens & Latitude is a personal travel and photography platform where I share real travel experiences, visual stories, and practical guides. It focuses on destinations, culture, and storytelling through photography captured during my own journeys." 
  },
  { 
    category: "Platform & Philosophy",
    q: "Personally visited destinations?", 
    a: "Yes. Every destination, photograph, and experience shared on Lens & Latitude is based on places I have personally visited. The content reflects real moments, observations, and learnings from those travels." 
  },
  { 
    category: "Platform & Philosophy",
    q: "Self-funded or sponsored?", 
    a: "Most of my travels are self-funded. If any trip, stay, or experience is sponsored or hosted, it is clearly disclosed within the relevant content. All opinions and recommendations remain honest and independent." 
  },
  { 
    category: "Photography & Gear",
    q: "Photography gear?", 
    a: "I shoot all my travel photos using an iPhone 16 Pro and iPhone 16. I don’t use a dedicated camera. My focus is on composition, light, and timing—showing that meaningful travel photography can be created with minimal gear." 
  },
  { 
    category: "Photography & Gear",
    q: "Do you edit your photos?", 
    a: "Yes, photos are edited to maintain consistency and mood while keeping them natural. Editing is used for color correction, exposure balance, and refinement—not heavy manipulation." 
  },
  { 
    category: "Travel & Planning",
    q: "Suitable for beginners?", 
    a: "Yes. The guides are designed to be practical and easy to follow, especially for first-time travelers and budget-conscious explorers. I aim to share realistic tips, costs, and alternatives whenever possible." 
  },
  { 
    category: "Travel & Planning",
    q: "Frequency of updates?", 
    a: "New content is published regularly based on travel schedules and creative projects. I prioritize quality, storytelling, and authenticity over fixed posting frequency." 
  },
  { 
    category: "Copyright & Collaborations",
    q: "Usage with credit?", 
    a: "All photos and written content are protected by copyright. Limited personal use with proper credit may be allowed, but commercial use or redistribution requires prior permission. Please contact me for licensing or usage requests." 
  },
  { 
    category: "Copyright & Collaborations",
    q: "Affiliate commissions?", 
    a: "Yes, some links may be affiliate links, which means I may earn a small commission at no extra cost to you. I only recommend products or tools that I genuinely use or trust." 
  },
  { 
    category: "Copyright & Collaborations",
    q: "Collaboration requests?", 
    a: "Collaborations are welcome if they align with the values and style of Lens & Latitude. Brands, tourism boards, and creators can reach out via the contact page to discuss partnerships, campaigns, or creative projects." 
  },
];

/**
 * CONTACT_SOCIALS:
 * Direct social handles for social footer triggers.
 */
export const CONTACT_SOCIALS = [
  { name: "Instagram", handle: "@mr.khilesh__", href: "https://www.instagram.com/mr.khilesh__", icon: Instagram },
  { name: "YouTube", handle: "Khilesh Sammal Vlogs", href: "https://www.youtube.com/c/KhileshSammalVlogs2125", icon: Youtube },
];

