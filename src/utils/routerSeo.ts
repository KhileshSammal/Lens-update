import { DETAILED_BLOG_POSTS } from "../blogData";

export type AppView = 
  | "home"
  | "blog-archive"
  | "shop"
  | "checkout"
  | "thailand-diaries"
  | "malaysia-expedition"
  | "amritsar-expedition"
  | "kerala-expedition"
  | "patal-bhuvaneshwar-expedition"
  | "rishikesh-expedition"
  | "goa-expedition"
  | "vietnam-expedition"
  | "mulki-expedition"
  | "andaman-expedition"
  | "philippines-expedition"
  | "nepal-expedition"
  | "portfolio"
  | "bio";

export interface RouteState {
  view: AppView;
  activeBlogPostId: string | null;
  targetHash?: string;
}

export const DESTINATION_SLUGS: Record<string, AppView> = {
  "thailand": "thailand-diaries",
  "thailand-diaries": "thailand-diaries",
  "malaysia": "malaysia-expedition",
  "malaysia-expedition": "malaysia-expedition",
  "amritsar": "amritsar-expedition",
  "amritsar-expedition": "amritsar-expedition",
  "kerala": "kerala-expedition",
  "kerala-expedition": "kerala-expedition",
  "patal-bhuvaneshwar": "patal-bhuvaneshwar-expedition",
  "patal-bhuvaneshwar-expedition": "patal-bhuvaneshwar-expedition",
  "rishikesh": "rishikesh-expedition",
  "rishikesh-expedition": "rishikesh-expedition",
  "goa": "goa-expedition",
  "goa-expedition": "goa-expedition",
  "vietnam": "vietnam-expedition",
  "vietnam-expedition": "vietnam-expedition",
  "mulki": "mulki-expedition",
  "mulki-expedition": "mulki-expedition",
  "andaman": "andaman-expedition",
  "andaman-expedition": "andaman-expedition",
  "philippines": "philippines-expedition",
  "philippines-expedition": "philippines-expedition",
  "nepal": "nepal-expedition",
  "nepal-expedition": "nepal-expedition",
};

export const REVERSE_DESTINATION_SLUGS: Record<AppView, string> = {
  "home": "",
  "blog-archive": "blog",
  "shop": "shop",
  "checkout": "checkout",
  "bio": "bio",
  "portfolio": "portfolio",
  "thailand-diaries": "destination/thailand",
  "malaysia-expedition": "destination/malaysia",
  "amritsar-expedition": "destination/amritsar",
  "kerala-expedition": "destination/kerala",
  "patal-bhuvaneshwar-expedition": "destination/patal-bhuvaneshwar",
  "rishikesh-expedition": "destination/rishikesh",
  "goa-expedition": "destination/goa",
  "vietnam-expedition": "destination/vietnam",
  "mulki-expedition": "destination/mulki",
  "andaman-expedition": "destination/andaman",
  "philippines-expedition": "destination/philippines",
  "nepal-expedition": "destination/nepal",
};

export const DESTINATION_SEO_DATA: Record<string, { title: string; description: string; image: string }> = {
  "thailand-diaries": {
    title: "Thailand Diaries — Phuket & SE Asia Expeditions",
    description: "Explore Khilesh Sammal's 5-day Thailand travel guide, budget breakdown, Ramada Plaza stay, and Phuket island photography.",
    image: "https://images.unsplash.com/photo-1681459878397-14dc6d270fe4?auto=format&fit=crop&w=1200&q=80"
  },
  "malaysia-expedition": {
    title: "The Malaysia Expedition — Kuala Lumpur & Penang",
    description: "Visual travel story across Kuala Lumpur, Petronas Twin Towers, Batu Caves, and Penang street food culture.",
    image: "https://images.unsplash.com/photo-1580496297468-1e05179cfd81?auto=format&fit=crop&w=1200&q=80"
  },
  "amritsar-expedition": {
    title: "Amritsar Cultural Trail — Golden Temple & Heritage",
    description: "Experience the peace of Golden Temple, Wagah Border flag ceremony, and Punjabi culinary heritage in Amritsar.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
  },
  "kerala-expedition": {
    title: "Kerala Backwaters & Munnar Tea Trails",
    description: "Alleppey houseboat cruises, coconut palm groves, and lush tea plantation photography in God's Own Country.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
  },
  "patal-bhuvaneshwar-expedition": {
    title: "Patal Bhuvaneshwar — Sacred Cave Temple Expedition",
    description: "Journey into the subterranean limestone cave complex in Kumaon Himalayas dedicated to Lord Shiva.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
  },
  "rishikesh-expedition": {
    title: "Rishikesh Yoga & White Water Rafting Expedition",
    description: "Ganga Aarti, iconic Laxman Jhula suspension bridges, cliff jumping, and spiritual retreats in Rishikesh.",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80"
  },
  "goa-expedition": {
    title: "Goa Coastal & Heritage Trail",
    description: "Old Goa Latin quarters, Fontainhas architecture, secluded North Goa beaches, and sunset photography.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
  },
  "vietnam-expedition": {
    title: "Vietnam Expedition 2026 — Saigon, Hanoi, Ha Long & Ninh Binh",
    description: "Complete 9-day July 2026 Vietnam itinerary covering Saigon, Hanoi Old Quarter, Ha Long Bay Cruise, and Tam Coc lotus ponds.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
  },
  "mulki-expedition": {
    title: "Mulki Surfing & River Kayaking Expedition",
    description: "Catching waves on Karnataka's West Coast, river kayaking through mangrove estuaries, and coastal camping.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80"
  },
  "andaman-expedition": {
    title: "Andaman Islands — Radhanagar Beach & Coral Reefs",
    description: "Scuba diving in Havelock Island, bioluminescent night kayaking, and pristine turquoise island beaches.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80"
  },
  "philippines-expedition": {
    title: "Philippines Island Hopping Expedition",
    description: "El Nido lagoons, Coron shipwreck diving, and island exploration across the Philippine archipelago.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80"
  },
  "nepal-expedition": {
    title: "Nepal Himalayan Heights — Kathmandu & Pokhara",
    description: "Annapurna mountain vistas, Phewa Lake serenity, and ancient stupas across the Himalayan kingdom.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
  }
};

/**
 * Convert current window pathname or hash into application route state
 */
export function parseCurrentRoute(pathname: string, hash: string): RouteState {
  // Check hash routing fallback first (e.g., #/shop or #/destination/vietnam or #/blog/phuket-expedition-guide)
  let cleanPath = pathname;
  if (hash && hash.startsWith("#/")) {
    cleanPath = hash.replace("#", "");
  }

  // Remove trailing slashes
  cleanPath = cleanPath.replace(/\/$/, "");
  if (!cleanPath) cleanPath = "/";

  // Match /shop
  if (cleanPath === "/shop") {
    return { view: "shop", activeBlogPostId: null };
  }

  // Match /checkout
  if (cleanPath === "/checkout") {
    return { view: "checkout", activeBlogPostId: null };
  }

  // Match /bio
  if (cleanPath === "/bio") {
    return { view: "bio", activeBlogPostId: null };
  }

  // Match /portfolio
  if (cleanPath === "/portfolio") {
    return { view: "portfolio", activeBlogPostId: null };
  }

  // Match /blog or /blog/:slug
  if (cleanPath === "/blog" || cleanPath.startsWith("/blog/")) {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts.length === 1) {
      return { view: "blog-archive", activeBlogPostId: null };
    } else {
      const blogSlug = parts[1];
      // Verify if post exists or fallback to archive
      const post = DETAILED_BLOG_POSTS.find(p => p.id === blogSlug);
      return { 
        view: "blog-archive", 
        activeBlogPostId: post ? post.id : blogSlug 
      };
    }
  }

  // Match /destination/:slug
  if (cleanPath.startsWith("/destination/")) {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const destSlug = parts[1];
      const matchedView = DESTINATION_SLUGS[destSlug];
      if (matchedView) {
        return { view: matchedView, activeBlogPostId: null };
      }
    }
  }

  // Fallback to home view (and preserve section anchor hash if present, e.g. #directory)
  return { 
    view: "home", 
    activeBlogPostId: null, 
    targetHash: hash && !hash.startsWith("#/") ? hash : undefined 
  };
}

/**
 * Convert route state into clean canonical path URL
 */
export function routeToPath(view: AppView, activeBlogPostId: string | null): string {
  if (view === "home") {
    return "/";
  }
  if (view === "shop") {
    return "/shop";
  }
  if (view === "checkout") {
    return "/checkout";
  }
  if (view === "bio") {
    return "/bio";
  }
  if (view === "portfolio") {
    return "/portfolio";
  }
  if (view === "blog-archive") {
    if (activeBlogPostId) {
      return `/blog/${activeBlogPostId}`;
    }
    return "/blog";
  }

  // Destination page routes
  const destPath = REVERSE_DESTINATION_SLUGS[view];
  if (destPath) {
    return `/${destPath}`;
  }

  return "/";
}

/**
 * Dynamic SEO Meta Tag & Structured Data Synchronizer
 */
export function updatePageSeo(view: AppView, activeBlogPostId: string | null) {
  const domain = "https://lensandlattitude.in";
  let title = "Lens & Latitude — Khilesh Sammal | Travel Photography & Expeditions";
  let description = "Official personal travel platform of Khilesh Sammal. Real travel stories, smartphone photography guides, and detailed expedition itineraries across Asia and India.";
  let canonicalPath = routeToPath(view, activeBlogPostId);
  let ogImage = "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80";
  let schemaData: any = null;

  if (view === "shop") {
    title = "Travel Shop — Gear, Prints & Digital Guides | Lens & Latitude";
    description = "Shop official nomad gear, signature caps, travel photography journals, and digital guides curated by Khilesh Sammal.";
    ogImage = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80";
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Lens & Latitude Travel Shop",
      "description": description,
      "url": `${domain}/shop`
    };
  } else if (view === "checkout") {
    title = "Secure Checkout | Lens & Latitude";
    description = "Complete your order securely for travel gear and digital guides on Lens & Latitude.";
  } else if (view === "bio") {
    title = "About Khilesh Sammal | Solo Traveler & Photographer";
    description = "Learn more about Khilesh Sammal, creator of Lens & Latitude, sharing authentic travel experiences captured on iPhone.";
  } else if (view === "portfolio") {
    title = "Visual Portfolio — Travel Photography Gallery | Lens & Latitude";
    description = "A curated collection of travel photographs captured across South East Asia and India.";
  } else if (view === "blog-archive") {
    if (activeBlogPostId) {
      const post = DETAILED_BLOG_POSTS.find(p => p.id === activeBlogPostId);
      if (post) {
        title = `${post.title} | Lens & Latitude`;
        description = post.excerpt;
        ogImage = post.img;
        schemaData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.img,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Lens & Latitude",
            "logo": {
              "@type": "ImageObject",
              "url": `${domain}/icon.png`
            }
          },
          "datePublished": post.date,
          "description": post.excerpt
        };
      } else {
        title = "The Journal — Travel Guides & Insights | Lens & Latitude";
        description = "Read practical travel guides, packing frameworks, and smartphone photography tips.";
      }
    } else {
      title = "The Journal — Travel Guides & Insights | Lens & Latitude";
      description = "Read practical travel guides, packing frameworks, and smartphone photography tips.";
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "The Lens & Latitude Journal",
        "description": description,
        "url": `${domain}/blog`
      };
    }
  } else if (DESTINATION_SEO_DATA[view]) {
    const destInfo = DESTINATION_SEO_DATA[view];
    title = `${destInfo.title} | Lens & Latitude`;
    description = destInfo.description;
    ogImage = destInfo.image;
    schemaData = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "name": destInfo.title,
      "description": destInfo.description,
      "image": destInfo.image,
      "url": `${domain}${canonicalPath}`
    };
  }

  // 1. Update Document Title
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attrName, attrValue);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  };

  setMetaTag('meta[name="description"]', 'name', 'description', description);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', `${domain}${canonicalPath}`);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);

  // 3. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", `${domain}${canonicalPath}`);

  // 4. Update JSON-LD Script
  let jsonLdScript = document.querySelector('script[id="dynamic-jsonld"]') as HTMLScriptElement;
  if (schemaData) {
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.id = "dynamic-jsonld";
      jsonLdScript.type = "application/ld+json";
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(schemaData);
  } else if (jsonLdScript) {
    jsonLdScript.remove();
  }
}
