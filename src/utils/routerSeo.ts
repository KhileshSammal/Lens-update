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

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  canonicalPath: string;
  ogImage: string;
  ogType: "website" | "article" | "profile";
  schemaData: any;
  heading: string;
  summary: string;
}

export const DESTINATION_SLUGS: Record<string, AppView> = {
  "thailand": "thailand-diaries",
  "thailand-diaries": "thailand-diaries",
  "phuket": "thailand-diaries",
  "malaysia": "malaysia-expedition",
  "malaysia-expedition": "malaysia-expedition",
  "amritsar": "amritsar-expedition",
  "amritsar-expedition": "amritsar-expedition",
  "kerala": "kerala-expedition",
  "kerala-expedition": "kerala-expedition",
  "patal-bhuvaneshwar": "patal-bhuvaneshwar-expedition",
  "patal-bhuvaneshwar-expedition": "patal-bhuvaneshwar-expedition",
  "patal-bhuvneswar": "patal-bhuvaneshwar-expedition",
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
    title: "Thailand Diaries — Phuket & SE Asia Expeditions | Lens & Latitude",
    description: "Explore Khilesh Sammal's 5-day Thailand travel guide, budget breakdown, Ramada Plaza stay, and Phuket island photography.",
    image: "https://images.unsplash.com/photo-1681459878397-14dc6d270fe4?auto=format&fit=crop&w=1200&q=80"
  },
  "malaysia-expedition": {
    title: "The Malaysia Expedition — Kuala Lumpur & Penang | Lens & Latitude",
    description: "Visual travel story across Kuala Lumpur, Petronas Twin Towers, Batu Caves, and Penang street food culture.",
    image: "https://images.unsplash.com/photo-1580496297468-1e05179cfd81?auto=format&fit=crop&w=1200&q=80"
  },
  "amritsar-expedition": {
    title: "Amritsar Cultural Trail — Golden Temple & Heritage | Lens & Latitude",
    description: "Experience the peace of Golden Temple, Wagah Border flag ceremony, and Punjabi culinary heritage in Amritsar.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
  },
  "kerala-expedition": {
    title: "Kerala Backwaters & Munnar Tea Trails | Lens & Latitude",
    description: "Alleppey houseboat cruises, coconut palm groves, and lush tea plantation photography in God's Own Country.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
  },
  "patal-bhuvaneshwar-expedition": {
    title: "Patal Bhuvaneshwar — Sacred Cave Temple Expedition | Lens & Latitude",
    description: "Journey into the subterranean limestone cave complex in Kumaon Himalayas dedicated to Lord Shiva.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
  },
  "rishikesh-expedition": {
    title: "Rishikesh Yoga & White Water Rafting Expedition | Lens & Latitude",
    description: "Ganga Aarti, iconic Laxman Jhula suspension bridges, cliff jumping, and spiritual retreats in Rishikesh.",
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80"
  },
  "goa-expedition": {
    title: "Goa Coastal & Heritage Trail | Lens & Latitude",
    description: "Old Goa Latin quarters, Fontainhas architecture, secluded North Goa beaches, and sunset photography.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
  },
  "vietnam-expedition": {
    title: "Vietnam Expedition 2026 — Saigon, Hanoi, Ha Long & Ninh Binh | Lens & Latitude",
    description: "Complete 9-day July 2026 Vietnam itinerary covering Saigon, Hanoi Old Quarter, Ha Long Bay Cruise, and Tam Coc lotus ponds.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
  },
  "mulki-expedition": {
    title: "Mulki Surfing & River Kayaking Expedition | Lens & Latitude",
    description: "Catching waves on Karnataka's West Coast, river kayaking through mangrove estuaries, and coastal camping.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80"
  },
  "andaman-expedition": {
    title: "Andaman Islands — Radhanagar Beach & Coral Reefs | Lens & Latitude",
    description: "Scuba diving in Havelock Island, bioluminescent night kayaking, and pristine turquoise island beaches.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80"
  },
  "philippines-expedition": {
    title: "Philippines Island Hopping Expedition | Lens & Latitude",
    description: "El Nido lagoons, Coron shipwreck diving, and island exploration across the Philippine archipelago.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80"
  },
  "nepal-expedition": {
    title: "Nepal Himalayan Heights — Kathmandu & Pokhara | Lens & Latitude",
    description: "Annapurna mountain vistas, Phewa Lake serenity, and ancient stupas across the Himalayan kingdom.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
  }
};

/**
 * Convert current window pathname or hash into application route state
 */
export function parseCurrentRoute(pathname: string, hash: string = ""): RouteState {
  let cleanPath = pathname || "/";
  if (hash && hash.startsWith("#/")) {
    cleanPath = hash.replace("#", "");
  }

  // Remove trailing slashes (except root "/")
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

  // Match /bio or /about
  if (cleanPath === "/bio" || cleanPath === "/about") {
    return { view: "bio", activeBlogPostId: null };
  }

  // Match /portfolio or /gallery
  if (cleanPath === "/portfolio" || cleanPath === "/gallery") {
    return { view: "portfolio", activeBlogPostId: null };
  }

  // Match /blog or /blog/:slug
  if (cleanPath === "/blog" || cleanPath.startsWith("/blog/")) {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts.length <= 1) {
      return { view: "blog-archive", activeBlogPostId: null };
    } else {
      const blogSlug = parts[1];
      const post = DETAILED_BLOG_POSTS.find(p => p.id === blogSlug);
      return { 
        view: "blog-archive", 
        activeBlogPostId: post ? post.id : blogSlug 
      };
    }
  }

  // Match /destinations or /expeditions or /trips
  if (cleanPath === "/destinations" || cleanPath === "/expeditions" || cleanPath === "/trips") {
    return { view: "home", activeBlogPostId: null, targetHash: "#directory" };
  }

  // Match /destination/:slug, /expedition/:slug, /destinations/:slug, /expeditions/:slug
  if (
    cleanPath.startsWith("/destination/") || 
    cleanPath.startsWith("/expedition/") || 
    cleanPath.startsWith("/destinations/") || 
    cleanPath.startsWith("/expeditions/")
  ) {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const destSlug = parts[1].toLowerCase();
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
 * Generate complete SEO Metadata and JSON-LD for any route pathname
 */
export function getSeoMetadata(pathnameOrView: string | AppView, activeBlogPostId?: string | null): SeoMetadata {
  const domain = "https://lensandlattitude.in";
  let view: AppView;
  let blogId: string | null = null;

  if (typeof pathnameOrView === "string" && (pathnameOrView.startsWith("/") || pathnameOrView === "")) {
    const route = parseCurrentRoute(pathnameOrView);
    view = route.view;
    blogId = route.activeBlogPostId;
  } else {
    view = pathnameOrView as AppView;
    blogId = activeBlogPostId || null;
  }

  let title = "Lens & Latitude | Khilesh Sammal — Travel Photography & Expeditions";
  let description = "Official personal travel platform of Khilesh Sammal. Real travel stories, slow-travel philosophy, smartphone photography guides, and detailed expedition itineraries across Asia and India.";
  let canonicalPath = routeToPath(view, blogId);
  let ogImage = `${domain}/og-image.jpg`;
  let ogType: "website" | "article" | "profile" = "website";
  let heading = "Lens & Latitude by Khilesh Sammal";
  let summary = description;

  const orgSchema = {
    "@type": "Organization",
    "@id": `${domain}/#organization`,
    "name": "Lens & Latitude",
    "url": domain,
    "logo": {
      "@type": "ImageObject",
      "@id": `${domain}/#logo`,
      "url": `${domain}/logo.png`,
      "contentUrl": `${domain}/logo.png`,
      "caption": "Lens & Latitude Logo",
      "width": 512,
      "height": 512
    },
    "image": `${domain}/logo.png`,
    "founder": {
      "@type": "Person",
      "name": "Khilesh Sammal",
      "url": `${domain}/bio`
    }
  };

  let schemaData: any = null;

  if (view === "home") {
    heading = "Lens & Latitude — Travel Photography & Expeditions";
    schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${domain}/#website`,
          "name": "Lens & Latitude",
          "description": description,
          "url": domain,
          "image": ogImage,
          "publisher": orgSchema,
          "author": {
            "@type": "Person",
            "name": "Khilesh Sammal",
            "url": `${domain}/bio`
          }
        },
        orgSchema,
        {
          "@type": "BreadcrumbList",
          "@id": `${domain}/#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": domain }
          ]
        }
      ]
    };
  } else if (view === "shop") {
    title = "Travel Shop — Gear, Prints & Digital Guides | Lens & Latitude";
    description = "Shop official nomad gear, signature caps, travel photography journals, and digital expedition guides curated by Khilesh Sammal.";
    ogImage = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80";
    heading = "Lens & Latitude Travel Shop";
    summary = description;
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": `${domain}/shop#store`,
      "name": "Lens & Latitude Travel Shop",
      "description": description,
      "url": `${domain}/shop`,
      "image": ogImage,
      "priceRange": "₹₹",
      "currenciesAccepted": "INR, USD",
      "publisher": orgSchema,
      "author": {
        "@type": "Person",
        "name": "Khilesh Sammal",
        "url": `${domain}/bio`
      }
    };
  } else if (view === "checkout") {
    title = "Secure Checkout | Lens & Latitude";
    description = "Complete your order securely for travel gear and digital guides on Lens & Latitude.";
    heading = "Checkout — Lens & Latitude";
    summary = description;
  } else if (view === "bio") {
    ogType = "profile";
    title = "About Khilesh Sammal | Solo Traveler & Photographer";
    description = "Learn more about Khilesh Sammal, creator of Lens & Latitude, sharing authentic travel experiences, mobile photography techniques, and detailed route blueprints.";
    ogImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80";
    heading = "About Khilesh Sammal";
    summary = description;
    schemaData = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${domain}/bio#profile`,
      "name": title,
      "description": description,
      "url": `${domain}/bio`,
      "image": ogImage,
      "publisher": orgSchema,
      "author": {
        "@type": "Person",
        "name": "Khilesh Sammal",
        "url": `${domain}/bio`
      },
      "mainEntity": {
        "@type": "Person",
        "name": "Khilesh Sammal",
        "jobTitle": "Travel Photographer & Expedition Specialist",
        "url": `${domain}/bio`
      }
    };
  } else if (view === "portfolio") {
    title = "Visual Portfolio — Travel Photography Gallery | Lens & Latitude";
    description = "A curated collection of high-fidelity travel photographs and documentary visuals captured across South East Asia and India by Khilesh Sammal.";
    heading = "Visual Photography Portfolio";
    summary = description;
    schemaData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "@id": `${domain}/portfolio#gallery`,
      "name": title,
      "description": description,
      "url": `${domain}/portfolio`,
      "image": ogImage,
      "publisher": orgSchema,
      "author": {
        "@type": "Person",
        "name": "Khilesh Sammal",
        "url": `${domain}/bio`
      }
    };
  } else if (view === "blog-archive") {
    if (blogId) {
      const post = DETAILED_BLOG_POSTS.find(p => p.id === blogId);
      if (post) {
        ogType = "article";
        title = `${post.title} | Lens & Latitude`;
        description = post.excerpt;
        ogImage = post.img;
        heading = post.title;
        summary = post.excerpt;
        schemaData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${domain}/blog/${post.id}#article`,
          "mainEntityOfPage": `${domain}/blog/${post.id}`,
          "headline": post.title,
          "name": post.title,
          "description": post.excerpt,
          "image": [post.img],
          "url": `${domain}/blog/${post.id}`,
          "author": {
            "@type": "Person",
            "name": post.author || "Khilesh Sammal",
            "url": `${domain}/bio`
          },
          "publisher": orgSchema,
          "datePublished": post.date,
          "inLanguage": "en-US",
          "keywords": post.tag
        };
      } else {
        title = "The Journal — Travel Guides & Insights | Lens & Latitude";
        description = "Read practical travel guides, packing frameworks, and smartphone photography tips by Khilesh Sammal.";
        heading = "The Lens & Latitude Journal";
        summary = description;
      }
    } else {
      title = "The Journal — Travel Guides, Gear & Insights | Lens & Latitude";
      description = "Explore field dispatches, packing frameworks, smartphone photography tips, and comprehensive itinerary breakdowns by Khilesh Sammal.";
      heading = "The Lens & Latitude Journal";
      summary = description;
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${domain}/blog#blog`,
        "name": "The Lens & Latitude Journal",
        "description": description,
        "url": `${domain}/blog`,
        "image": ogImage,
        "publisher": orgSchema,
        "author": {
          "@type": "Person",
          "name": "Khilesh Sammal",
          "url": `${domain}/bio`
        }
      };
    }
  } else if (DESTINATION_SEO_DATA[view]) {
    const destInfo = DESTINATION_SEO_DATA[view];
    title = destInfo.title;
    description = destInfo.description;
    ogImage = destInfo.image;
    heading = destInfo.title;
    summary = destInfo.description;
    schemaData = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      "@id": `${domain}${canonicalPath}#destination`,
      "name": destInfo.title,
      "description": destInfo.description,
      "image": [destInfo.image],
      "url": `${domain}${canonicalPath}`,
      "publisher": orgSchema,
      "author": {
        "@type": "Person",
        "name": "Khilesh Sammal",
        "url": `${domain}/bio`
      },
      "provider": {
        "@type": "Person",
        "name": "Khilesh Sammal",
        "url": `${domain}/bio`
      },
      "touristType": ["Slow Travel", "Solo Traveler", "Photography Expedition", "Backpacking Guide"]
    };
  }

  return {
    title,
    description,
    canonicalUrl: `${domain}${canonicalPath}`,
    canonicalPath,
    ogImage,
    ogType,
    schemaData,
    heading,
    summary
  };
}

/**
 * Dynamic SEO Meta Tag & Structured Data Synchronizer for Client-side DOM
 */
export function updatePageSeo(view: AppView, activeBlogPostId: string | null) {
  const meta = getSeoMetadata(view, activeBlogPostId);

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.canonicalUrl);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.ogImage);
  setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', meta.title);
  setMetaTag('meta[property="og:logo"]', 'property', 'og:logo', `https://lensandlattitude.in/logo.png`);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Lens & Latitude');

  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.ogImage);
  setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', meta.title);

  // 3. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", meta.canonicalUrl);

  // 4. Update JSON-LD Script
  let jsonLdScript = document.querySelector('script[id="dynamic-jsonld"]') as HTMLScriptElement;
  if (meta.schemaData) {
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.id = "dynamic-jsonld";
      jsonLdScript.type = "application/ld+json";
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(meta.schemaData);
  } else if (jsonLdScript) {
    jsonLdScript.remove();
  }
}

/**
 * Server-side HTML Head Meta Tag and Structured Data Injector
 */
export function injectSeoTagsIntoHtml(htmlTemplate: string, pathname: string): string {
  const meta = getSeoMetadata(pathname);

  let modified = htmlTemplate;

  // Replace Title tag
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);

  // Replace description meta
  if (modified.includes('name="description"')) {
    modified = modified.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeAttr(meta.description)}" />`);
  }

  // Replace canonical link
  if (modified.includes('rel="canonical"')) {
    modified = modified.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escapeAttr(meta.canonicalUrl)}" />`);
  }

  // Replace OG tags
  modified = modified.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(meta.title)}" />`);
  modified = modified.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeAttr(meta.description)}" />`);
  modified = modified.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${escapeAttr(meta.canonicalUrl)}" />`);
  modified = modified.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`);
  modified = modified.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${escapeAttr(meta.ogType)}" />`);

  // Replace Twitter tags
  modified = modified.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`);
  modified = modified.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`);
  modified = modified.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${escapeAttr(meta.ogImage)}" />`);

  // Inject Schema.org JSON-LD if present
  if (meta.schemaData) {
    const jsonLdTag = `<script id="dynamic-jsonld" type="application/ld+json">${JSON.stringify(meta.schemaData)}</script>`;
    modified = modified.replace('</head>', `  ${jsonLdTag}\n  </head>`);
  }

  return modified;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
