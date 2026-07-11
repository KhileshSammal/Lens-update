// ============================================================================
// BLOG DATA CONFIGURATION & SCHEMAS
// Use this file to add, modify, or remove articles shown in 'The Journal'
// and 'Blog Archive' views across the Lens & Latitude portal.
// ============================================================================

export interface BlogSection {
  // Use "text" for brief descriptions or context. Keep paragraphs short (1-3 sentences max).
  // Use "bullet-list" to present strategies, checklists, or data point lists.
  // Use "quote" for highlighted principles, key laws, or rules.
  // Use "image" to inject visually stunning breaks with descriptive captions.
  type: "text" | "bullet-list" | "quote" | "image";
  title?: string;
  body?: string;
  items?: string[];
  imageUrl?: string;
  imageCaption?: string;
}

export interface BlogPost {
  id: string;          // Unique URL/state-safe identifier
  title: string;       // Public-facing clear, elegant title
  tag: string;         // Category flag (e.g., "Strategy", "Travel Tips", "Photography")
  read: string;        // Estimated reading duration (e.g., "5 Min Read")
  date: string;        // Formatted display date
  img: string;         // High-res cover image URL from unsplash
  excerpt: string;     // Short summary displayed in preview tiles
  author: string;      // Author name
  sections: BlogSection[]; // Ordered structure of content elements
}

export const DETAILED_BLOG_POSTS: BlogPost[] = [
  {
    id: "phuket-expedition-guide",
    title: "5-Day Phuket Expedition: 6 Things to Book & Prep in Advance",
    tag: "Travel Tips",
    read: "8 Min Read",
    date: "May 23, 2026",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Squeezing an adventure into a sharp 5-day Phuket window. How to structure the 6 core pillars, optimize your stay at Ramada Plaza Chao Fah, and secure visa/transits.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "Maximizing Your Specific 5-Day Cycle",
        body: "Squeezing an adventure into a sharp 5-day window requires an efficient strategy on the ground. When managing a targeted budget—like a premium ₹95,000 ($1,140 USD) trip layout—every minute counts. You don't want to waste time in long physical queues or dealing with sold-out transits. Book and prep these 6 foundational pillars online before flying."
      },
      {
        type: "bullet-list",
        title: "1. Secure Your Base: Ramada Plaza Chao Fah Phuket",
        items: [
          "Strategic Geometric Anchor: Positioned centrally in southern Phuket, avoiding coastal strip traffic bottlenecks.",
          "Rapid Transits: Only 45 minutes from Phuket International Airport (HKT) and 10 minutes from historic Phuket Old Town.",
          "Premium Rooftop Amenities: Host to an outstanding 360° view infinity rooftop pool—ideal for golden-hour location photography.",
          "Budget Fit: Booking 45–60 days early locks in affordable luxury room packages, keeping your ₹95,000 itinerary fully optimized."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "The pristine rooftop pool at Ramada Plaza Chao Fah, offering 360-degree high-angle views of southern Phuket's lush mountain ranges."
      },
      {
        type: "text",
        title: "2. Map Out a Dynamic Itinerary (With 'Plan B' Fail-Safes)",
        body: "Phuket weather and maritime schedules are dynamic. A robust plan needs a clear backbone but must adapt to surprises like sudden tropical downpours without losing a single day."
      },
      {
        type: "bullet-list",
        title: "The Core 5-Day Skeleton",
        items: [
          "Day 1: Arrival, 45-min transit to Chao Fah, smooth check-in, and dinner in Patong's Bangla Road nightlife.",
          "Day 2: Early boat excursion (06:15 AM) to capture the dramatic limestone karsts of Phang Nga Bay.",
          "Day 3: Immersive slow exploration of the Sino-Portuguese pastel buildings and cafes of Phuket Old Town.",
          "Day 4: Southern viewpoints circuit—capturing Promthep Cape Sunset, Karon Viewpoint, and elephant sanctuaries.",
          "Day 5: Souvenir market shopping, final specialty coffee roasters hop, and late-evening airport departure."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Majestic limestone karst islands of Phang Nga Bay, captured during an early-morning longtail exploration."
      },
      {
        type: "bullet-list",
        title: "The Pivot Options (Fail-Safes)",
        items: [
          "Indoors Masterclass: Swap boat tours for an direct local cooking masterclass in Phuket Old Town (~1,200 THB).",
          "Thai Wellness Hubs: Reserve a 120-minute heritage spa and herbal compress therapy block (~800 THB).",
          "Historic Caverns & Temples: Deeply explore indoor temple structures like Wat Chalong and historical museum houses."
        ]
      },
      {
        type: "bullet-list",
        title: "3. Official Visa Clearance & Travel Insurance Protection",
        items: [
          "Ditch the Physical Queue: Avoid physical Visa-on-Arrival airport queues that take up to 2 hours. Go directly through the Official Kingdom of Thailand Electronic Visa Portal (www.thaievisa.go.th).",
          "Express Clearance: Approved e-Visas let you breeze through dedicated gates in under 15 minutes.",
          "Safety Shield Matrix: Procure travel insurance covering baggage delays, flight disruptions, and active transport (like scooter leases) up to ₹5,000,000."
        ]
      },
      {
        type: "quote",
        body: "Keep physical printouts of your approved e-Visa and return tickets in your carry-on baggage. Double-sync them inside a shared offline-accessible cloud drive folder for zero-friction access."
      },
      {
        type: "bullet-list",
        title: "4. Confirmed Return Tickets (The Essential Legal Gatekeeper)",
        items: [
          "Legal Requirement: Airline crews and immigration officers enforce proof of onward travel strictly. No onward flight = no boarding.",
          "Efficiency Costing: Synchronized round-trip flight bookings done 60 days ahead save up to 40% compared to separate single journeys.",
          "Late-Hour Flights Strategy: Secure a departure slot past 10:00 PM on Day 5 to enjoy your final day without frantic airport runs."
        ]
      },
      {
        type: "text",
        title: "5. The Food Blueprint: Aesthetic Cafes & Regional Gastronomy",
        body: "As a UNESCO-designated City of Gastronomy, Phuket's food is a journey itself. Combine gorgeous cafe aesthetics with deep heritage flavors."
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Lively, historical streets of Old Phuket Town where century-old shophouses serve classic Southern Thai culinary secrets."
      },
      {
        type: "bullet-list",
        title: "Iconic Specialties & Cafe Strategy",
        items: [
          "Southern Crab Curry (Kanom Jeen Poo): Spiced with aromatic wild betel leaves and yellow turmeric (~250 THB).",
          "Crispy Pork Belly (Moo Krob): Decadent golden pork seasoned with five-spice powder and local sweet sauces.",
          "Heritage Mango Sticky Rice: Locally grown honey mangoes served over rich coconut-infused sticky rice.",
          "Pre-Booking Rule: Popular Michelin-recommended stands and clifftop viewpoint restaurants book out weeks in advance. Reserve early."
        ]
      },
      {
        type: "bullet-list",
        title: "6. Shared Expenses & Smart Cash Strategy",
        items: [
          "Fixed Cost Bracket (50% / ₹47,500): Reserved for flights and premium hotel base at Ramada Plaza Chao Fah.",
          "Experiential Cost Bracket (20% / ₹19,000): Dedicated for pre-booked island transits and sanctuary passes.",
          "Liquid Daily Cash Bucket (30% / ₹28,500): Fuel, local markets, street food stalls, and evening entertainment.",
          "Cash-First Standard: While hotels accept cards, night markets and local vendors run exclusively on Thai Baht cash.",
          "ATM Tip: Bring foreign cash in pristine, high-value notes to swap locally, or withdraw larger sums at once to dodge multiple international flat fees."
        ]
      },
      {
        type: "bullet-list",
        title: "Pre-Flight Checklist Matrix Summary",
        items: [
          "CRITICAL: Secure e-Visa online via thaievisa.go.th; keep printed return tickets.",
          "HIGH: Secure Chao Fah hotel confirmation early. Request high-floor window views.",
          "HIGH: Pre-schedule morning boat charters to escape midday tourism crowds."
        ]
      },
      {
        type: "quote",
        body: "The Expedition Rule: 'The secret to an elite 5-day cycle is handling the structural systems before takeoff. When the visa, transits, and base camp are secure, your mind is free to create, tell stories, and absolute explore.'"
      }
    ]
  },
  {
    id: "solo-asia-packing",
    title: "How to pack for a 30-day Solo Trip across SE Asia",
    tag: "Travel Tips",
    read: "5 Min Read",
    date: "March 15, 2026",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    excerpt: "The art of lightweight travel. 30 days, 1 carry-on backpack, and unlimited freedom on the backroads of Vietnam, Thailand, and Malaysia.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "The Golden Rule: Under 7kg",
        body: "Traveling across Southeast Asia with a single carry-on bag is not just a convenience—it's a philosophical stance. When you bypass the check-in counters and baggage claims, you reclaim your most valuable travel resource: agility. For a 30-day expedition through varying humid climates, the secret is choosing objects that serve multiple purposes and dry overnight."
      },
      {
        type: "quote",
        body: "Your luggage shouldn't define the boundaries of your journey; it should match your mobility."
      },
      {
        type: "bullet-list",
        title: "The Ultimate Core Capsule Wardrobe",
        items: [
          "3x Merino wool t-shirts (antibacterial, moisture-wicking)",
          "1x Lightweight technical linen button-down",
          "2x Hybrid quick-dry active shorts (good for hiking and swimming)",
          "1x Ultra-packable water-resistant shell jacket",
          "4x Travel underwear pairs (wash in sink, dries in 4 hours)",
          "1x Trail runners with solid grip (worn on transit days to save bag space)"
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Organized compression cubes loaded inside a 35L minimalist carry-on pack."
      },
      {
        type: "text",
        title: "Electronics and Micro-Essentials",
        body: "As a hybrid engineer and photographer, keeping gear lightweight is essential. I ditched the heavy DSLR and native lenses. Everything is structured around the iPhone 16 Pro, a minimalist clip-on tripod, and a generic GaN charger with international prongs. This eliminates bulk, charging bricks, and cables."
      },
      {
        type: "bullet-list",
        title: "Tech Rig Breakdown",
        items: [
          "iPhone 16 Pro with Custom Leica Color profiles",
          "10,000mAh Magnetic Power Bank (ultra-thin)",
          "65W GaN Multi-port wall adapter with type-C outputs",
          "Minimal dual-use braided cable"
        ]
      },
      {
        type: "text",
        title: "Practical Hygiene and First Aid",
        body: "Do not pack full-sized items. Southeast Asia possesses an abundance of convenience stores like 7-Eleven where you can source local toiletries cheaply. Pack high-quality solid colognes, a mineral sunscreen block stick, and a mini-packet of activated charcoal and rehydration salts just in case."
      }
    ]
  },
  {
    id: "camera-gear-2025",
    title: "My Camera Gear: Capturing Luxury in Motion",
    tag: "Photography",
    read: "8 Min Read",
    date: "April 20, 2026",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Ditching the heavy professional rigs to create high-fidelity, color-accurate travel visuals using modern smartphone sensors and tailored presets.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "The Paradigm Shift to Mobile",
        body: "There was a time when showing up with anything less than a full-frame camera and three heavy f/2.8 zoom lenses meant you weren’t taken seriously. But hiking up steep valleys in Uttarakhand teaches you a painful lesson about weight and accessibility. When a camera is buried deep in a backpack, you miss the shot. Smartphone sensors have evolved. The camera you have in your hand is the ultimate creative tool when backed by custom color processing."
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Symmetry, light, and composition override any camera specification."
      },
      {
        type: "quote",
        body: "The premium aesthetic isn't a function of sensor size. It's a blend of composition, lighting, and a cohesive color color science."
      },
      {
        type: "text",
        title: "How I Achieve the Leica Film Look",
        body: "Modern smartphone photography can often look over-processed, with artificial HDR highlights and over-sharpened edges. To combat this, I shoot in Apple ProRAW and apply custom-crafted color correction tables. Our Lightroom profiles balance contrast, desaturate digital neo-greens, and introduce a gentle filmic grain that models classic analog stocks."
      },
      {
        type: "bullet-list",
        title: "My Raw Settings Formula",
        items: [
          "Format: Apple ProRAW Max (48MP for raw detail)",
          "Exposure Bias: -0.3 to -0.7 to preserve moody highlights",
          "Grid Overlays: Golden spiral and Rule of thirds active",
          "Processing: Lightroom import with warm analog calibration profiles"
        ]
      },
      {
        type: "text",
        title: "The Secret is Composition and Light",
        body: "Always shoot in the golden hour—the first hour after sunrise and the last hour before sunset. Frame elements using national architectures, trees, or side-mirrors. Focus on depth: keep a foreground, midground, and background to guide the viewer's eye into the frame."
      }
    ]
  },
  {
    id: "patal-bhuvneswar-cave-secrets",
    title: "Secrets of Patal Bhuwneswar: Exploring India's Cave Legends",
    tag: "Expeditions",
    read: "10 Min Read",
    date: "May 10, 2026",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Deep inside Uttarakhand's underground cave complex, discovering stalactite gods, timeless mythology, and an unmatched spiritual energy.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "Descending Into the Earth's Core",
        body: "Nestled in the quiet heights of Pithoragarh, Uttarakhand, Patal Bhuwneswar is not just a geological cavern—it is a limestone temple wrapped in absolute mysticism. Descending through a narrow, dark, almost vertical rock opening using heavy iron chains, you leave the physical world behind and step into India's deepest spiritual stories."
      },
      {
        type: "quote",
        body: "They say inside these stalactite chambers lies the history of the cosmos, petrified in stone and limestone drippings."
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "A majestic view of the mountain range that hides the cave entrance in Pithoragarh."
      },
      {
        type: "text",
        title: "Limestone Whispers and Mythology",
        body: "The cave is 160 meters long and 90 feet deep from its entrance. Governed by limestone formations that resemble the hair locks of Shiva, the thousand-hooded serpent Sheshnag, and all 33 types of Hindu mythological deities. The constant dripping of water has carved these formations over millennia, creating an incredibly quiet and sacred cave atmosphere."
      },
      {
        type: "bullet-list",
        title: "Key Insights For Your Journey",
        items: [
          "Hire a registered cave guide—the caverns are pitch dark and complex.",
          "Avoid wearing heavy boots; slip-resistant rubber soles or bare feet are ideal.",
          "Be prepared for high humidity and low oxygen spaces near the deep chambers.",
          "Photography is strictly prohibited inside the active temple zones to maintain sanctity."
        ]
      }
    ]
  },
  {
    id: "slow-travel-philosophy",
    title: "The Art of Slow Travel: Why Skipping 80% of Destinations is Better",
    tag: "Creative",
    read: "6 Min Read",
    date: "May 22, 2026",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Stop treating travel like an achievement board. How spending 2 weeks in a single village changes your creative work and peace of mind.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "The Danger of the Bucket-List Mentality",
        body: "In the age of social media algorithms, travel has been reduced to a high-speed swipe of visual checkpoints. Travelers fly into a city, take a photo in front of a monument, post it, and leave the next morning. They return exhausted, with digital folders containing hundreds of identical pictures but zero profound memories. Slow travel is the deliberate antidote to this hyper-speed vacation culture."
      },
      {
        type: "quote",
        body: "To travel is to relate, observe, and adapt—not just to consume and catalog landmarks."
      },
      {
        type: "text",
        title: "The Creative Benefits of Staying Put",
        body: "By choosing to spend two weeks in a tiny village on the coast of Thailand or in the valleys of Uttarakhand instead of rushing through five cities, you enter the local rhythm. You find the cafe that plays the perfect ambient loops. You begin to understand how the light hits the valley at 4:32 PM. For photographers and writers, consistency in a place is the ultimate fertile ground for high-performing visual art."
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Finding comfort in the unchanging horizons of a single quiet destination."
      },
      {
        type: "bullet-list",
        title: "How to Switch to a Slow Travel Routine",
        items: [
          "Book listings for at least 7-10 days per location to secure monthly/weekly discounts.",
          "Do not plan more than one structured activity per day. Let the afternoon unfold naturally.",
          "Walk or rent a simple gearless scooter. Avoid fast transit corridors.",
          "Shop at neighborhood markets and cook simple, local farm-to-table meals."
        ]
      }
    ]
  },
  {
    id: "malaysia-expedition-2025",
    title: "The Malaysia Expedition - 2025",
    tag: "Expeditions",
    read: "7 Min Read",
    date: "April 10, 2025",
    img: "https://images.unsplash.com/photo-1580496297468-1e05179cfd81?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Exploring the hyper-modern architecture of Kuala Lumpur, the historical heritage of George Town in Penang, and the pristine rainforests of Langkawi.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "The Dual-Speed Pulse of Malaysia",
        body: "Malaysia is a captivating country of contrasts, where hyper-modern skyscrapers sit alongside traditional wooden house villages on stilts. Navigating this multi-cultural hub requires an appreciation for its dual nature: the high-velocity energy of Kuala Lumpur and the slow, historic pace of Penang and the islands. Here is how to conquer the peninsula in style."
      },
      {
        type: "quote",
        body: "Malaysia is a masterclass in coexistence. Cities aren't just built; diverse historical layers are woven together into an incredibly vibrant fabric."
      },
      {
        type: "bullet-list",
        title: "Core Lodgings & Establishments",
        items: [
          "Kuala Lumpur: W Kuala Lumpur - high-profile luxury directly facing the Petronas Twin Towers.",
          "Penang Heritage: Eastern & Oriental Hotel - classical seafront colonial grandeur in George Town.",
          "Langkawi: The Ritz-Carlton Langkawi - nested inside a 10-million-year-old tropical rainforest on the beach."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "The iconic Petronas Twin Towers in Kuala Lumpur, standing majestically against the twilight clouds."
      },
      {
        type: "bullet-list",
        title: "The 6-Day Expedition Breakdown",
        items: [
          "Day 1: Arrival, VIP airport express to KL Sentral, check-in, and twilight drinks showing reflecting Petronas Towers view.",
          "Day 2: Early morning climb up Batu Caves' multi-colored 272 steps, followed by an afternoon stroll through KL Forest Eco Park canopy walk.",
          "Day 3: Midday train journey to Penang, arrival in historical George Town, sunset street art and trishaw exploration.",
          "Day 4: Sunrise cable car to Penang Hill, followed by a street food pilgrimage through Gurney Drive hawker centers.",
          "Day 5: Internal short flight to Langkawi Island, booking a private mangrove kayak tour on Kilim Karst Geoforest Park.",
          "Day 6: Morning duty-free souvenir shopping, relaxing beachfront lunch, and flight back home via KLIA."
        ]
      },
      {
        type: "bullet-list",
        title: "Essential Transit & Digital Tools",
        items: [
          "Transit Hub: Download the 'Grab' App before arrival; it is the absolute standard for reliable e-hailing.",
          "Internet Sync: Buy a local 5G eSIM (U Mobile or Maxis) directly via Airalo for uninterrupted map navigation.",
          "Digital ID: Make sure to fill out the Malaysia Digital Arrival Card (MDAC) online 72 hours before departure."
        ]
      }
    ]
  },
  {
    id: "amritsar-grace-2025",
    title: "Amritsar Grace - 2025",
    tag: "Expeditions",
    read: "6 Min Read",
    date: "January 14, 2025",
    img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Savoring 4 nights in Punjab's spiritual soul. Late-night Palki ceremonies, the heavy patriotic fervor of Wagah, and iconic Amritsari kulcha trails.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "Experiencing Amritsar's Soulful Gravity",
        body: "Spending a full 4 nights in Amritsar allows you to move past the superficial day-tripper routine and connect with the profound daily rituals of the Sikh faith. Under golden-hour sunlight and moonlight, the Golden Temple (Harmandir Sahib) acts as a visual and spiritual anchor for the entire city. This 4-night expedition explores sacred architecture, national pride, and legendary culinary heritage."
      },
      {
        type: "quote",
        body: "The true grandeur of Amritsar isn't just in the polished gold leaf reflecting off the Amrit Sarovar; it is in the absolute, unconditional warmth of its communal kitchens."
      },
      {
        type: "bullet-list",
        title: "Base Camp: Taj Swarna, Amritsar",
        items: [
          "Luxury Haven: Strategically located on Outer Circular Road, offering a quiet, high-integrity escape from the congested walled city roads.",
          "Heated Pool & Healing Spa: Ideal for physical recovery after walking multiple kilometers through old stone bazaars.",
          "Culinary Excellence: Home to traditional Amritsari dishes presented with curated fine-dining precision."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1605130287443-449ae76f9ef9?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "The pristine Golden Temple (Harmandir Sahib) reflecting beautifully on the sacred waters at dusk."
      },
      {
        type: "bullet-list",
        title: "The 4-Night Holy Route",
        items: [
          "Day 1: Arrival, smooth check-in at Taj Swarna. Head to Golden Temple at 10:00 PM to witness the moving Palki Sahib night processional ceremony.",
          "Day 2: Morning walk through the historical Jallianwala Bagh. Walk down the Town Hall Heritage Street, sampling street-side sweets, and sit inside the Golden Temple complex listening to live Gurbani.",
          "Day 3: Midday transit to the Attari-Wagah Border (30 km away). Witness the high-stepping, energetic flag-lowering routine alongside thousands of patriotic spectators.",
          "Day 4: Deep dive into the Partition Museum. Spend the afternoon exploring Sadda Pind, a high-fidelity Punjabi cultural heritage village, showcasing local folk dance, pottery, and traditional household architectures.",
          "Day 5: Morning prayers, shopping for vibrant Phulkari fabrics, and a legendary ghee-loaded brunch before heading to Sri Guru Ram Dass Jee Airport."
        ]
      },
      {
        type: "bullet-list",
        title: "Gastronomy Blueprint: Sacred Butter Trails",
        items: [
          "Amritsari Kulcha: Flatbread layered with potato/ghee, baked in clay tandoors at Bhai Kulwant Singh Kulchawale (~₹150).",
          "Maa ki Dal: 18-hour slow-cooked black lentils simmered with organic cream at Kesar Da Dhaba.",
          "Gian Chand Lassi: Thick, churned yoghurt topped with a direct thick slab of malai cream (~₹80).",
          "Langar Sewa: Partake in the grand community kitchen which feeds over 100,000 visitors every single day with deep devotion."
        ]
      }
    ]
  },
  {
    id: "kerala-backwaters-2025",
    title: "Kerala Backwaters - 2025",
    tag: "Expeditions",
    read: "7 Min Read",
    date: "March 05, 2025",
    img: "https://images.unsplash.com/photo-1695180289266-9dbe35c73a66?auto=format&fit=crop&w=1200&q=80",
    excerpt: "A curated 4-night retreat. Winding through the emerald tea terraces of Munnar and boarding private wooden houseboats in Alleppey.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "The Quiet Green Vibe of Southern India",
        body: "Few places on the planet cultivate serenity like Kerala's waterways and high-altitude tea plantations. Our 4-night expedition is structured in a dual-rhythm: first, ascending into the cool mountain air and misty valleys of Munnar, and second, descending to drift slowly along the coconut-walled backwaters of Alleppey (Alappuzha)."
      },
      {
        type: "quote",
        body: "Time operates differently on the silent canals. Every ripple of the water reflects a slow, ancient pace of tropical life."
      },
      {
        type: "bullet-list",
        title: "Eco-Luxe Sanctuaries",
        items: [
          "Munnar Highlands: Elixir Hills Suites Resort - nestled deep inside rain forests, offering dramatic valley balconies.",
          "Alleppey Backwaters: Spice Coast Cruises - hand-crafted traditional wooden kettuvallam houseboats powered with eco-silent solar motors."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "A traditional luxury houseboat gliding silently down the lush coconut-fringed backwater channels of Alleppey."
      },
      {
        type: "bullet-list",
        title: "The 4-Night Backwater & Tea Route",
        items: [
          "Day 1: Scenic airport pickup from Kochi (COK), winding 4-hour drive past Cheeyappara waterfalls to Munnar Munnar, check-in at Elixir Hills.",
          "Day 2: Early climb in Eravikulam National Park to spot endangered Nilgiri Tahr mountain goats, followed by a heritage walk through Tata Tea Museum plantations.",
          "Day 3: Scenic downhill transit to Alleppey jetty. Board your private thatch-roofed houseboat, enjoy a fresh Karimeen fish lunch, and witness the golden-hour sunset over Vembanad Lake.",
          "Day 4: Canoe tour of narrow village canals. Disembark for an authentic 90-minute Ayurvedic warm herbal oil Shirodhara therapy at an approved heritage health center.",
          "Day 5: Lakeside morning yoga, traditional rice-flour appams with coconut stew, check-out, and transit back to Kochi."
        ]
      },
      {
        type: "bullet-list",
        title: "Local Flavors and Herb Wisdom",
        items: [
          "Karimeen Pollichathu: Pearl spot fish marinated with ginger, spicy shallots, fried inside banana leaves (~₹450).",
          "Avial: Mixed native vegetables tossed in grated garlic-curry-leaf coconut paste.",
          "Toddy: Sweet palm sap tapped fresh in the morning from high palms, best paired with spicy red fish curry.",
          "Ayurvedic Rule: Only book Ayurvedic therapies from centers carrying national 'Green Leaf' or 'Olive Leaf' wellness certifications."
        ]
      }
    ]
  },
  {
    id: "goa-vibrance-2025",
    title: "Goa Trail - 2025",
    tag: "Expeditions",
    read: "6 Min Read",
    date: "November 10, 2025",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Sabbatical on the coast. 4 nights discovering Fontainhas' pastel Latin quarters, organic spice forests, and empty southern bays.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "Goa Reimagined: Beyond the Party Buzz",
        body: "To understand Goa's unique character, you must escape the noisy crowded commercial beaches and embrace 'Susegad'—the quiet, leisurely, appreciative Goan art of living. This curated 4-night journey takes you deep into the Portuguese heritage mansions of Panaji, the rich tropical spice plantations of Ponda, and the immaculate, peaceful white sands of South Goa."
      },
      {
        type: "quote",
        body: "Susegad isn't just about leisurely laziness; it is a profound, beautiful respect for the present moment and natural rhythms."
      },
      {
        type: "bullet-list",
        title: "Refined Shorebases",
        items: [
          "Panaji Heritage: WelcomHeritage Panjim Inn - a 130-year-old restored Catholic mansion in Fontainhas decorated with dark teak wood and ancient art.",
          "South Goa Hideaway: Taj Exotica Resort & Spa, Varca - Mediterranean-style villa architecture on an quiet, private beach strip."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1582928509355-6b47ccae3fb7?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Vibrant yellow and blue Portuguese-style heritage homes and alleys in the historic Latin Quarter of Fontainhas, Panaji."
      },
      {
        type: "bullet-list",
        title: "The 4-Night Coastal & Heritage Log",
        items: [
          "Day 1: Arrive at Manohar International Airport (MGO), drive to Panaji. Spend the afternoon taking photos of pastel Latin houses, dining on classic Goan prawn curry.",
          "Day 2: Scenic drive to Dudhsagar Waterfalls. Take a rugged 4x4 open jeep ride through Mollem National Park, followed by a spicy tropical lunch on banana leaves at Sahakari Spice Farm.",
          "Day 3: Head south, checking in at Taj Exotica Varca. Catch a silent beach walk along the soft, clean sands and dine at a beachfront wooden cabana.",
          "Day 4: Take an early morning kayak trip down Sal River's bird-rich mangroves, followed by an afternoon exploring Old Goa's majestic Basilica of Bom Jesus.",
          "Day 5: Enjoy an organic local breakfast, taste Goan Bebinca, buy cashew nuts, and transit to the airport for departure."
        ]
      },
      {
        type: "bullet-list",
        title: "Culinary Blueprint & Local Delicacies",
        items: [
          "Goan Prawn Curry: Plump prawns simmered in a rich ground coconut, red chili, and tangy sour kokum broth.",
          "Pork Vindaloo: Fiery, aromatic pork marinated with dry-spice vinegar paste and organic palm sugar.",
          "Bebinca: Classic multi-layered Goan dessert made with egg yolks, cardamom, and heavy coconut milk ghee.",
          "Feni: Strong regional spirit double-distilled from ripe cashew apples, mixed with limca soda and salt."
        ]
      }
    ]
  },
  {
    id: "vietnam-secrets-2025",
    title: "Vietnam Secrets - 2025",
    tag: "Expeditions",
    read: "9 Min Read",
    date: "September 18, 2025",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    excerpt: "7-Night Northern & Central Explorer. Motor-dense alleys of Hanoi, an overnight cruise in Halong Bay, and candlelit canals of historic Hoi An.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "The Incredible Energy of Vietnam",
        body: "Vietnam is a mesmerizing sensory explosion, where ancient French colonial architecture, steaming street food stands, and dense motorcycle lanes blend into an unforgettable rhythm. Over 7 nights, we cover Northern Vietnam's classical soul in Hanoi, spectacular landscape scenery in Halong Bay, and Central Vietnam's romantic, postcard streets of Hoi An."
      },
      {
        type: "quote",
        body: "Vietnam has a way of changing your pulse rate. The constant horn noise of Hanoi eventually settles into a deep, meditative flow."
      },
      {
        type: "bullet-list",
        title: "Premium Bases of Choice",
        items: [
          "Hanoi: Sofitel Legend Metropole Hanoi - high-profile French colonial elegance right in the center of the French Quarter.",
          "Halong Bay: Heritage Cruises Binh Chuan - boutique wooden ship featuring a stunning rooftop salt-water pool and antique art galleries.",
          "Hoi An Historic: Anantara Hoi An Resort - luxury French-influenced architecture positioned on the quiet-flowing Thu Bon River."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "Bright hand-crafted silk lanterns illuminating the romantic riverside streets of Hoi An Ancient Town at night."
      },
      {
        type: "bullet-list",
        title: "The 7-Night Journey Log",
        items: [
          "Day 1: Land in Noi Bai Airport (HAN), VIP transit to Sofitel Metropole. Explore the bustling 36 Streets of the Old Quarter by cyclos, ending with cold local Bia Hoi beer.",
          "Day 2: Morning visit to the Temple of Literature. Spend the afternoon sipping sweet egg coffee on Hanoi's famous Train Street, followed by late evening street food exploration.",
          "Day 3: Luxury limousine drive to Halong Bay. Board Binh Chuan ship, kayak around limestone lagoons, and sleep under stars on the silent waters of Lan Ha Bay.",
          "Day 4: Dawn Tai Chi exercises on the wooden deck. Navigate the rock caverns of Sung Sot Cave, return to Hanoi, fly south to Da Nang, and transit to Hoi An.",
          "Day 5: Catch a slow, scenic cycling tour through rural banana orchards. Get fitted for hand-tailored linen suits, and walk Hoi An's narrow streets under lit lanterns.",
          "Day 6: Day excursion to the spectacular Ba Na Hills, taking photos on the famous stone hands of the Golden Bridge, returning to Hoi An for a romantic paper-lantern boat cruise.",
          "Day 7: Cooking masterclass at An My organic farming village. Ride circular bamboo basket boats down coconut forests, followed by a beachfront BBQ dinner.",
          "Day 8: Grab hot Banh Mi sandwiches, buy local Vietnamese coffee beans, and take off from Da Nang International Airport (DAD)."
        ]
      },
      {
        type: "bullet-list",
        title: "Gastronomic Secrets of Vietnam",
        items: [
          "Pho Bo: Warm rice noodle beef broth infused with charred ginger, cinnamon, star anise, and fresh sweet herbs.",
          "Bun Cha: Grilled pork patties served in rich fish sauce broth, paired with fresh vermicelli noodles and greens.",
          "Ca Phe Trung: Rich, frothy egg yolk whipped with local robusta coffee and sweetened condensed milk.",
          "Banh Mi: Crispy French baguette filled with pate, fresh cucumber, coriander, pickled carrots, and chili pork."
        ]
      }
    ]
  },
  {
    id: "nainital-heights-2025",
    title: "Nainital Heights - 2025",
    tag: "Expeditions",
    read: "6 Min Read",
    date: "June 22, 2025",
    img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    excerpt: "4-Night retreat in Uttarakhand. Pear-shaped mountain lakes, hiking misty pine forests of China Peak, and soaking in high Himalayan sunset views.",
    author: "Khilesh Sammal",
    sections: [
      {
        type: "text",
        title: "Escaping to Uttarakand's Lake District",
        body: "Nainital, nested in the emerald valleys of the Kumaon Himalayas, is a peaceful mountain hub centered around a beautiful pear-shaped lake. Spending 4 nights here allows you to bypass touristy crowds and enjoy Kumaoni forest sanctuaries. This expedition alternates between classic lake boating, technical forest hiking, and scenic mountain range lookouts."
      },
      {
        type: "quote",
        body: "The lake acts like a giant mirror for the clouds and pine mountains, capturing Nainital's transitions of sunlight in eternal watercolor."
      },
      {
        type: "bullet-list",
        title: "The Heritage Mountain Lodge: The Naini Retreat",
        items: [
          "Historical Sanctuary: An old Tudor-style country house situated high on Ayarpatta hill, shielded by tall oak and pine forests.",
          "Kumaoni Hospitality: Known for crackling fire hearths, historic wooden ceiling architecture, and traditional native cooking.",
          "Tromping Base: Easy walking access to quiet hiking trails leading directly to Tiffin Top and Land's End cliffs."
        ]
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1200&q=80",
        imageCaption: "A high-angle misty view of Nainital city clustered around the serene, emerald waters of Naini Lake."
      },
      {
        type: "bullet-list",
        title: "The 4-Night Himalayan Altitude Plan",
        items: [
          "Day 1: Board train to Kathgodam, followed by a scenic 1-hour mountain drive to Nainital. Check-in at The Naini Retreat, enjoy an afternoon wooden gondola boat cruise on Naini Lake, and walk Mall Road.",
          "Day 2: Ride the vintage aerial ropeway up to Snow View Point (2,270m) to view Nanda Devi peak. Hike under pine tunnels to Land's End mountain cliff.",
          "Day 3: Take a lakes excursion tour to neighboring, less-crowded waters: Bhimtal, Naukuchiatal, and Sattal, enjoying forest picnics and paragliding options.",
          "Day 4: Early morning ascend to China Peak (Naina Peak - 2,615m) for panoramic mountain views, followed by shopping at the Tibetan Bazaar and visiting Naina Devi temple.",
          "Day 5: Enjoy local fried Kumaoni potato snacks and sweet Kumaoni Bal Mithai, before heading down the hills to Kathgodam railway station."
        ]
      },
      {
        type: "bullet-list",
        title: "Kumaoni Culinary Trails",
        items: [
          "Aloo Ke Gutke: Spiced golden potatoes slow-fried with mountain herb jamboo and coarse red dry chilis (~₹85).",
          "Kumaoni Bal Mithai: Rich brown chocolate-like condensed milk fudge coated in white sugar balls.",
          "Dubuk: Traditional soup prepared from slow-cooked indigenous black soybeans or gahat lentils.",
          "Bhang ki Chutney: Tangy side dipping paste roasted from hemp seeds, lemon juice, green chilis, and mountain mint."
        ]
      }
    ]
  }
];
