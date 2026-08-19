export interface FoodItem {
  name: string;
  desc: string;
}

export interface PackingCategory {
  category: string;
  items: string;
}

export interface PlanningStep {
  timeframe: string;
  action: string;
}

export interface PremiumTravelResource {
  topFoods: FoodItem[];
  packingChecklist: PackingCategory[];
  planningChecklist: PlanningStep[];
  culturalEtiquette: string[];
  practicalTips: string[];
}

export const TRAVEL_RESOURCES_BY_POST: Record<string, PremiumTravelResource> = {
  // --------------------------------------------------------------------------
  // 1. PHUKET EXPEDITION
  // --------------------------------------------------------------------------
  "phuket-expedition-guide": {
    topFoods: [
      { name: "Tom Yum Goong", desc: "Spicy & sour lemongrass soup with jumbo Andaman prawns" },
      { name: "Moo Hong", desc: "Phuket's legendary braised sweet pork belly with star anise" },
      { name: "Pad Thai Boran", desc: "Traditional tamarind stir-fried noodles with crushed peanuts" },
      { name: "Mango Sticky Rice", desc: "Sweet warm coconut sticky rice with golden honey mango" },
      { name: "Roti with Thai Milk Tea", desc: "Crispy flaky flatbread with sweet condensed milk" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport (6+ mo validity), Thailand e-Visa, travel insurance, digital boarding passes" },
      { category: "Clothing", items: "Lightweight linen shirts, UV-protective swimwear, modest temple attire (covered knees/shoulders)" },
      { category: "Footwear", items: "Breathable slip-on sandals, water shoes for boat landings, walking sneakers" },
      { category: "Weather & Sun", items: "Reef-safe sunscreen SPF 50+, polarized sunglasses, wide-brim sun hat, compact rain shell" },
      { category: "Tech & Gear", items: "15L waterproof dry bag, 20,000mAh power bank, waterproof phone pouch, Type C/G adapter" },
      { category: "Health", items: "Motion-sickness tablets (essential for speedboats), mosquito spray, electrolyte sachets" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book international flights to HKT and reserve central boutique stays in Old Phuket Town or Kata" },
      { timeframe: "6–8 weeks", action: "Verify passport validity and apply for Thailand e-Visa / digital entry card" },
      { timeframe: "1 month", action: "Reserve early morning private longtail boat to Phang Nga Bay or Phi Phi to beat tour crowds" },
      { timeframe: "2 weeks", action: "Download Grab and Bolt apps; purchase comprehensive travel insurance covering water activities" },
      { timeframe: "On arrival", action: "Activate 5G eSIM at Phuket Airport, withdraw Thai Baht cash for night markets, confirm hotel transfer" }
    ],
    culturalEtiquette: [
      "Perform the 'Wai' greeting (palms together at chest level with a slight bow) when greeted by locals or hotel hosts.",
      "Always dress modestly (shoulders, chest, and knees covered) when visiting temples such as Wat Chalong and Big Buddha.",
      "Remove your shoes before stepping into temples, traditional shops, massage spas, and Thai homes.",
      "Never touch anyone on top of their head or point the soles of your feet toward people or Buddha statues.",
      "Show absolute respect to depictions of the Thai Royal Family and sacred Buddhist relics."
    ],
    practicalTips: [
      "Use Bolt or InDrive instead of street tuk-tuks, which charge inflated flat tourist rates.",
      "Always carry cash (100, 500 THB notes) as street food stalls, boat charters, and night markets do not accept cards.",
      "Rent scooters only if you possess an International Driving Permit (IDP) with motorcycle endorsement and wear a helmet.",
      "Stay hydrated in high humidity by drinking bottled water and fresh coconut water readily available at street stands."
    ]
  },

  // --------------------------------------------------------------------------
  // 2. HANOI OLD QUARTER
  // --------------------------------------------------------------------------
  "hanoi-old-quarter-diaries": {
    topFoods: [
      { name: "Phở Bò Gia Truyền", desc: "Hanoi's soul-food aromatic beef noodle soup with slow-simmered bone broth" },
      { name: "Bún Chả", desc: "Charcoal-grilled pork patties and belly in warm dipping broth with rice vermicelli" },
      { name: "Bánh Mì 25", desc: "Warm crispy baguette loaded with liver pâté, pork roast, cucumber, and cilantro" },
      { name: "Cà Phê Trứng (Egg Coffee)", desc: "Creamy whipped egg yolk custard over robust Robusta dark coffee at Cafe Giảng" },
      { name: "Chả Cá Lã Vọng", desc: "Sizzling turmeric catfish fillet pan-fried with heaps of fresh dill and spring onions" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport (6+ mo validity), printed Vietnam 90-day e-Visa PDF, return flight proof" },
      { category: "Clothing", items: "Breathable cotton layers, light linen pants, light sweater/jacket (Hanoi winter/evenings)" },
      { category: "Footwear", items: "Cushioned walking sneakers for cracked Old Quarter sidewalks, slip-on shoes" },
      { category: "Weather & Sun", items: "Compact travel umbrella, UV sunglasses, light rain jacket for sudden drizzle" },
      { category: "Tech & Gear", items: "Cross-body anti-theft sling bag, 10,000mAh power bank, Type A/C universal power adapter" },
      { category: "Health", items: "Activated charcoal, probiotics, insect repellent, eye drops for city dust" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book boutique heritage hotel inside Hanoi's French Quarter or Old Quarter near Hoan Kiem Lake" },
      { timeframe: "6–8 weeks", action: "Apply for Vietnam e-Visa via the official immigration website and double-check passport name match" },
      { timeframe: "1 month", action: "Book a guided evening street food walking tour with a local culinary insider" },
      { timeframe: "2 weeks", action: "Install Grab app and download offline Google Maps and Google Translate Vietnamese language pack" },
      { timeframe: "On arrival", action: "Pick up Viettel 4G/5G eSIM at Noi Bai Airport (HAN); withdraw Vietnamese Dong (VND) from VPBank/Techcombank ATMs" }
    ],
    culturalEtiquette: [
      "Use both hands when handing or receiving cash, business cards, tea, or food items as a sign of respect.",
      "Dress conservatively with covered shoulders and knees when visiting Tran Quoc Pagoda, Temple of Literature, and Ho Chi Minh Mausoleum.",
      "Never leave your chopsticks stuck vertically upright in a rice bowl, as this resembles incense sticks for the deceased.",
      "Remove your shoes before entering Vietnamese homes, temple prayer halls, and traditional homestays.",
      "Speak in a calm, moderate tone in public and avoid public displays of anger or frustration."
    ],
    practicalTips: [
      "Cross Hanoi's busy motor-scooter streets at a steady, predictable walking pace without stopping suddenly; drivers will flow around you.",
      "Order a GrabBike or GrabCar for transparent metered fares and avoid haggling with unmetered street taxis.",
      "Look for eateries crowded with locals sitting on tiny low plastic stools—that is where the freshest food is served.",
      "Keep small Vietnamese Dong banknotes (10,000, 20,000, 50,000 VND) accessible in your pocket for swift street purchases."
    ]
  },

  // --------------------------------------------------------------------------
  // 3. RISHIKESH SPIRITUAL HAVEN
  // --------------------------------------------------------------------------
  "rishikesh-spiritual-haven": {
    topFoods: [
      { name: "Garhwali Pahadi Thali", desc: "Aloo ke Gutke, Mandua Roti, Gahat Dal, and homemade mountain radish raita" },
      { name: "Parmarth Ganga Chai", desc: "Freshly brewed ginger-cardamom masala chai with crushed tulsi leaves" },
      { name: "Chotiwala Traditional Thali", desc: "Iconic North Indian feast with slow-cooked Dal Makhani, Paneer, and hot rotis" },
      { name: "Ayurvedic Kitchari Bowl", desc: "Healing mung dal and rice porridge cooked with digestive cumin, turmeric, and ghee" },
      { name: "Organic Wood-Fired Pizza", desc: "Artisan sourdough pizza crafted at Tapovan's Bohemian riverside cafes" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Government ID / Passport, train/flight confirmations to Dehradun (DED), emergency contact info" },
      { category: "Clothing", items: "Loose cotton kurtas, linen yoga pants, light wool shawl for cool ghat mornings, modest temple attire" },
      { category: "Footwear", items: "Slip-on walking sandals (easy to take off outside temples and ghats), sturdy trail shoes" },
      { category: "Weather & Sun", items: "Sun hat, polarized sunglasses for intense river glare, light sweater for October-March evenings" },
      { category: "Tech & Gear", items: "Waterproof dry bag for river rafting, compact headlamp, reusable steel water bottle" },
      { category: "Health", items: "Ayurvedic mosquito repellent, digestive enzymes, altitude/motion sickness meds for mountain drives" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Reserve authentic Ashram retreat (Parmarth Niketan / Anand Prakash) or Tapovan riverside boutique stay" },
      { timeframe: "6–8 weeks", action: "Book Vande Bharat / Shatabdi Express train tickets from New Delhi to Haridwar/Dehradun" },
      { timeframe: "1 month", action: "Book licensed Grade III+ white-water rafting permit (Shivpuri to Muni Ki Reti) and yoga masterclasses" },
      { timeframe: "2 weeks", action: "Prepare comfortable modest clothing and plan timings for Parmarth Niketan and Triveni Ghat Ganga Aarti" },
      { timeframe: "On arrival", action: "Take electric rickshaw to Ram Jhula, confirm walking routes across the suspension bridges" }
    ],
    culturalEtiquette: [
      "Rishikesh is a strictly vegetarian and alcohol-free holy municipality—respect the sacred food and lifestyle laws.",
      "Always remove your footwear before stepping onto the sacred stone steps of the river ghats and ashrams.",
      "Dress respectfully with shoulders, chest, and legs covered when exploring ghats, ashrams, and temple markets.",
      "Do not photograph cremations, solemn Hindu funeral rites, or deep meditators without explicit permission.",
      "Treat the sacred river Ganga with veneration—avoid littering, plastic usage, or using chemical soaps directly in the stream."
    ],
    practicalTips: [
      "Beware of mischievous rhesus macaque monkeys around Ram Jhula and Lakshman Jhula—keep food, sunglasses, and phones tucked in bags.",
      "Arrive at least 45 minutes prior to sunset at Triveni Ghat or Parmarth Niketan to secure peaceful front-row seating for Ganga Aarti.",
      "Use shared electric autos (Vikrams) for budget travel between Tapovan, Lakshman Jhula, and Rishikesh Main Town.",
      "Carry sufficient cash as small riverside cafes and boatmen may experience intermittent digital payment connectivity."
    ]
  },

  // --------------------------------------------------------------------------
  // 4. MOBILE PHOTOGRAPHY / IPHONE MASTERCLASS
  // --------------------------------------------------------------------------
  "mobile-photography-masterclass": {
    topFoods: [
      { name: "Field Drip Coffee", desc: "Fresh pour-over single-origin roast brewed before dawn for sunrise photography" },
      { name: "High-Protein Trail Mix", desc: "Raw almonds, roasted pumpkin seeds, goji berries, and dark chocolate chunks" },
      { name: "Electrolyte Hydration Flask", desc: "Filtered water infused with Himalayan pink salt, lime, and raw honey" },
      { name: "Street Food Bites", desc: "Quick local savory dumplings and flatbreads that sustain long walking photo safaris" },
      { name: "Artisan Dark Chocolate", desc: "75% cacao bar for rapid sustained energy during blue-hour cityscape shoots" }
    ],
    packingChecklist: [
      { category: "Camera Gear", items: "iPhone 16/17 Pro with ProRAW enabled, magnetic ND & CPL clip-on filters, microfiber cloths" },
      { category: "Mounts & Tripods", items: "Ultra-compact carbon fiber travel tripod, MagSafe phone clamp mount, bluetooth remote shutter" },
      { category: "Power & Cables", items: "20,000mAh PD fast-charging power bank, braided USB-C cables, compact GaN wall charger" },
      { category: "Storage & Backup", items: "1TB rugged external SSD (e.g. SanDisk Extreme), USB-C dual flash drive, cloud backup access" },
      { category: "Field Protection", items: "Waterproof hard-shell pouch, weather-sealed camera sling, silicone phone bumper case" },
      { category: "Post-Processing", items: "iPad / Mac with Lightroom Mobile, RAW power presets, calibrated screen brightness" }
    ],
    planningChecklist: [
      { timeframe: "1 month out", action: "Audit iPhone storage and offload non-essential media to free up at least 60GB for ProRAW and ProRes logs" },
      { timeframe: "2 weeks", action: "Use SunCalc and PhotoPills to map exact golden hour, blue hour, and celestial alignment coordinates" },
      { timeframe: "1 week", action: "Calibrate Lightroom presets, clean lens elements thoroughly, and inspect cable connectors" },
      { timeframe: "24 hours before", action: "Fully charge power banks, enable Gridlines + Level in camera settings, lock 4K 24fps video profile" },
      { timeframe: "On location", action: "Lock focus and exposure manually; shoot in 48MP RAW during optimum soft natural lighting" }
    ],
    culturalEtiquette: [
      "Always ask for friendly permission with a warm smile before taking close-up portraits of locals, artisans, or street vendors.",
      "Show genuine respect at historical monuments, sacred shrines, and memorial sites by refraining from intrusive posing.",
      "Never use flash photography inside ancient temples, cave grottos, or heritage museums where delicate frescoes exist.",
      "If a subject declines to be photographed, politely put your camera away and offer a grateful nod.",
      "Share your photographs with subjects on screen or via social media/email whenever they express curiosity."
    ],
    practicalTips: [
      "Wipe your smartphone lens with a microfiber cloth every single time before taking a shot—finger oils ruin contrast and create flaring.",
      "Use the 2x or 3x/5x optical telephoto lens instead of pinch-to-zoom to preserve genuine optical resolution and compress backgrounds.",
      "Underexpose your frame slightly (tap and slide down the sun icon) to protect bright skies and highlight details from clipping.",
      "Wake up 45 minutes before sunrise to capture empty streets and surreal blue-hour tones without crowds."
    ]
  },

  // --------------------------------------------------------------------------
  // 5. PATAL BHUVANESHWAR CAVE SECRETS
  // --------------------------------------------------------------------------
  "patal-bhuvneswar-cave-secrets": {
    topFoods: [
      { name: "Bhatt ki Churkani", desc: "Rich Kumaoni black soybean curry slow-simmered in an iron kadhai with whole spices" },
      { name: "Bal Mithai", desc: "Iconic Almora roasted condensed milk fudge coated in crunchy sugar globules" },
      { name: "Singori", desc: "Sweet thickened milk delicacy wrapped in aromatic indigenous Malu leaves" },
      { name: "Gahat (Kulath) ke Paranthe", desc: "Crispy griddled flatbreads stuffed with spiced horse gram lentils" },
      { name: "Pahadi Ginger Masala Chai", desc: "Robust hill tea spiced with crushed fresh ginger, bay leaf, and cardamom" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Valid Government photo ID (Aadhaar / Passport), KMVN booking voucher, cash reserves" },
      { category: "Clothing", items: "Fleece jacket, thermal inner wear (for crisp mornings), comfortable stretch pants for cave climbing" },
      { category: "Footwear", items: "High-traction trail shoes with deep rubber lugs (rock surfaces outside can be slick), clean socks" },
      { category: "Cave Gear", items: "Hands-free compact headlamp (for dark approach trails), soft microfiber cloth, knee support sleeve" },
      { category: "Weather & Sun", items: "Warm woolen beanie, compact windbreaker jacket, UV protection sunglasses for ridge views" },
      { category: "Health", items: "Asthma inhaler (if prone to tight spaces), glucose energy tablets, basic first-aid kit" }
    ],
    planningChecklist: [
      { timeframe: "2 months out", action: "Reserve accommodation at KMVN Tourist Rest House Patal Bhuvaneshwar or nearby Gangolihat" },
      { timeframe: "1 month", action: "Hire experienced mountain taxi from Kathgodam railway station or Pantnagar airport" },
      { timeframe: "2 weeks", action: "Monitor Himalayan weather forecasts and road condition advisories along the Almora-Berinag route" },
      { timeframe: "1 day before", action: "Hydrate well and rest to acclimatize to high Himalayan ridge elevation (1,350m)" },
      { timeframe: "On arrival", action: "Arrive at temple gate by 8:00 AM to secure early entrance token and avoid mid-day queues" }
    ],
    culturalEtiquette: [
      "Remove all leather belts, shoes, wallets, and bags at the designated locker counter before entering the sacred cave complex.",
      "Maintain quiet, solemn reverence inside the subterranean sanctum—chanting and prayers should be peaceful.",
      "Follow the instructions of the official temple priest (Pujari) who guides pilgrims through the ancient limestone chamber.",
      "Photography and video recording inside the underground inner cave sanctum are strictly prohibited.",
      "Assist fellow elderly or nervous travelers along the steep iron chain descent into the cave."
    ],
    practicalTips: [
      "The descent involves holding heavy iron chains through a narrow 80-foot rock crevice—wear flexible, non-restrictive clothing.",
      "Travelers with severe claustrophobia, heart conditions, or advanced respiratory ailments should evaluate the steep descent carefully.",
      "Cash is king in Gangolihat and Berinag; mountain ATMs frequently run out of bills or face power outages.",
      "Avoid visiting during peak monsoon months (July to August) when heavy rains cause landslides on Kumaon mountain roads."
    ]
  },

  // --------------------------------------------------------------------------
  // 6. SLOW TRAVEL PHILOSOPHY
  // --------------------------------------------------------------------------
  "slow-travel-philosophy": {
    topFoods: [
      { name: "Farm-to-Table Seasonal Stew", desc: "Slow-simmered regional vegetables and heritage grains sourced from local growers" },
      { name: "Neighborhood Baker's Sourdough", desc: "Fresh wood-fired sourdough loaf enjoyed with artisan regional cheeses" },
      { name: "Morning Market Fresh Produce", desc: "Sun-ripened orchard fruits, heirloom tomatoes, and freshly pressed cold olive oils" },
      { name: "Home-Cooked Regional Staples", desc: "Dishes prepared in your apartment kitchenette using morning market purchases" },
      { name: "Corner Cafe Espresso & Pastry", desc: "Daily espresso enjoyed while observing the authentic waking rhythm of local residents" }
    ],
    packingChecklist: [
      { category: "Luggage", items: "Single carry-on backpack (30-35L capacity) with compression cubes to ensure total mobility" },
      { category: "Wardrobe", items: "7-piece versatile capsule wardrobe in neutral shades (merino wool, linen, and breathable cotton)" },
      { category: "Footwear", items: "One pair of premium ergonomic walking shoes, one pair of versatile minimalist slip-on loafers" },
      { category: "Mindfulness & Notes", items: "Hardbound travel journal, fountain/gel ink pen, lightweight Kindle/e-reader" },
      { category: "Eco Essentials", items: "Reusable insulated water bottle, compact canvas grocery tote bag, stainless steel cutlery set" },
      { category: "Tech & Work", items: "Lightweight laptop, universal international adapter, noise-cancelling wireless earbuds" }
    ],
    planningChecklist: [
      { timeframe: "2 months out", action: "Select a single residential neighborhood to base yourself in for 2 to 4 weeks rather than moving every 2 days" },
      { timeframe: "6 weeks", action: "Book a serviced apartment or heritage home equipped with a full kitchen and laundry facilities" },
      { timeframe: "1 month", action: "Research local cultural libraries, community botanical gardens, and neighborhood artisan workshops" },
      { timeframe: "2 weeks", action: "Leave at least 40% of your weekly schedule completely open with zero fixed sightseeing bookings" },
      { timeframe: "On arrival", action: "Unpack completely into closet wardrobes; establish your favorite local grocer and morning coffee shop" }
    ],
    culturalEtiquette: [
      "Learn 10 to 15 core phrases in the local language (greetings, thank you, please, numbers, how much) and use them daily.",
      "Support small family-owned independent vendors, bakeries, and farmers markets rather than multinational tourist chains.",
      "Respect local siesta and rest hours—observe when neighborhood shops close for family meals and lower your volume.",
      "Engage in courteous, patient conversations with shopkeepers and neighbors without rushing transactions.",
      "Leave every natural space, neighborhood trail, and public park cleaner than you found it."
    ],
    practicalTips: [
      "Dedicate at least two days every week as 'Zero-Agenda Days'—walk with no map and turn down intriguing alleyways.",
      "Use public commuter transit (trams, subways, suburban trains, bicycles) to experience the city like a resident.",
      "Shop at morning wet markets between 7:00 AM and 9:00 AM for the freshest seasonal ingredients and vibrant local banter.",
      "Prioritize depth of connection over breadth of sightseeing—spending 10 days in one village creates lifelong memories."
    ]
  },

  // --------------------------------------------------------------------------
  // 7. MALAYSIA EXPEDITION 2025
  // --------------------------------------------------------------------------
  "malaysia-expedition-2025": {
    topFoods: [
      { name: "Nasi Lemak Sambal Sotong", desc: "Fragrant coconut rice with spicy squid sambal, crispy anchovies, and roasted peanuts" },
      { name: "Penang Char Kway Teow", desc: "Wok-hei infused flat rice noodles stir-fried with juicy prawns, cockles, and duck egg" },
      { name: "Roti Canai with Dhal & Curry", desc: "Crispy, flaky stretched flatbread served with savory lentil dhal and fish curry" },
      { name: "Penang Asam Laksa", desc: "Tangy, spicy tamarind fish broth loaded with thick rice noodles, fresh mint, and ginger flower" },
      { name: "Cendol with Gula Melaka", desc: "Shaved ice dessert with green pandan jelly ribbons, coconut milk, and rich palm sugar" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport (6+ mo validity), submitted Malaysia Digital Arrival Card (MDAC) confirmation, return ticket" },
      { category: "Clothing", items: "Breathable ultra-light cotton/linen clothes, modest attire for mosques and temples (covered knees/shoulders)" },
      { category: "Footwear", items: "Comfortable cushioned sneakers for walking George Town, slip-on shoes for quick temple entry" },
      { category: "Weather & Rain", items: "Compact pocket umbrella (equatorial afternoon showers), UV sunglasses, cooling face mist" },
      { category: "Tech & Gear", items: "Universal Type G (UK 3-pin) power adapter, 20,000mAh power bank, portable neck fan" },
      { category: "Health", items: "Mosquito repellent with DEET/Picaridin, hydration electrolyte packs, digestive probiotics" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book direct flights to Kuala Lumpur (KUL) and reserve heritage boutique stays in George Town, Penang" },
      { timeframe: "6 weeks", action: "Check passport expiry and fill the online MDAC (Malaysia Digital Arrival Card) within 3 days before travel" },
      { timeframe: "1 month", action: "Book ETS (Electric Train Service) Platinum tickets from KL Sentral to Butterworth (Penang)" },
      { timeframe: "2 weeks", action: "Install Grab and Touch 'n Go eWallet apps; download offline maps for KL and Penang" },
      { timeframe: "On arrival", action: "Pick up a Maxis/Celcom 5G SIM at KLIA terminal, withdraw Malaysian Ringgit (MYR) from Maybank ATM" }
    ],
    culturalEtiquette: [
      "Always use your right hand when eating, giving, or receiving items; the left hand is considered impolite in traditional customs.",
      "Remove your shoes before entering mosques, Chinese Buddhist temples, Hindu shrines, and Malaysian private residences.",
      "Dress conservatively when visiting the National Mosque (Masjid Negara) or Batu Caves—free robes/sarongs are provided at main gates.",
      "Respect multicultural norms (Malay, Chinese, Indian, Indigenous)—avoid touching people on the head or public arguments.",
      "When pointing to objects or directions, use your right thumb with the four fingers folded rather than an index finger."
    ],
    practicalTips: [
      "Use Grab for all taxi rides—fares are locked upfront, highly affordable, and eliminate haggling with street cab drivers.",
      "Ride the modern KL Monorail, LRT, and MRT lines for swift navigation through Kuala Lumpur during peak rush hours.",
      "Explore George Town's iconic street art murals between 7:30 AM and 9:30 AM before tropical heat and tour buses arrive.",
      "Tap water in Malaysia is generally not recommended for direct drinking; stick to filtered, boiled, or bottled mineral water."
    ]
  },

  // --------------------------------------------------------------------------
  // 8. AMRITSAR GRACE 2025
  // --------------------------------------------------------------------------
  "amritsar-grace-2025": {
    topFoods: [
      { name: "Amritsari Kulcha with Chole", desc: "Crispy tandoor-baked layered bread stuffed with spiced potatoes and smothered in desi ghee" },
      { name: "Guru ka Langar (Golden Temple)", desc: "Blessed community meal of slow-cooked Kali Dal, warm rotis, fragrant kheer, and fresh water" },
      { name: "Ahuja / Gian Di Lassi", desc: "Thick, creamy churned sweet yoghurt lassi crowned with a thick dollop of fresh malai" },
      { name: "Makki di Roti & Sarson da Saag", desc: "Traditional winter mustard greens simmered for hours, served with maize flatbread and white butter" },
      { name: "Beera Roasted Chicken", desc: "Tender, whole-roasted spiced chicken served with mint chutney and fresh roomali roti" }
    ],
    packingChecklist: [
      { category: "Head Coverings", items: "2-3 clean headscarves, bandanas, or rumaals (mandatory head covering inside Golden Temple)" },
      { category: "Clothing", items: "Modest cotton kurtas, salwar suits, or long trousers; warm shawl/fleece jacket (Nov-Feb nights)" },
      { category: "Footwear", items: "Slip-on sandals or loafers that can be easily deposited and retrieved at the Golden Temple shoe counters" },
      { category: "Personal Care", items: "Wet wipes, hand sanitizer, lip balm (for dry Punjab breezes), compact herbal throat lozenges" },
      { category: "Tech & Photo", items: "DSLR / Smartphone with optical telephoto (respect photography zones), power bank" },
      { category: "Health", items: "Digestive enzymes, motion sickness tablets (for highway trips to Wagah Border), basic first-aid" }
    ],
    planningChecklist: [
      { timeframe: "2 months out", action: "Book a heritage boutique stay within walking distance of the Golden Temple complex or Heritage Street" },
      { timeframe: "1 month", action: "Book Vande Bharat / Shatabdi Express train tickets from New Delhi to Amritsar Junction (ASR)" },
      { timeframe: "2 weeks", action: "Reserve private taxi for the Wagah-Attari Border Retreat Ceremony; arrive at stadium by 3:00 PM" },
      { timeframe: "1 day before", action: "Plan a two-visit strategy: 4:00 AM for the Palki Sahib ceremony and 8:30 PM for illuminated night reflections" },
      { timeframe: "On arrival", action: "Take an e-rickshaw directly to the pedestrian Heritage Walk; deposit heavy bags at hotel" }
    ],
    culturalEtiquette: [
      "Keep your head covered at all times inside the Sri Harmandir Sahib (Golden Temple) complex; bandanas are available at the entrance.",
      "Wash your feet in the shallow purifying water channel (charan amrit) before stepping onto the sacred marble parikrama.",
      "Smoking, tobacco, alcohol, chewing gum, and non-vegetarian food are strictly prohibited in the entire heritage precinct.",
      "Dress with utmost modesty—ensure legs, shoulders, and chest are fully covered with loose traditional or modest western attire.",
      "Sit cross-legged on the floor in straight rows during Guru ka Langar; accept the sanctified Karah Parshad with both hands cupped."
    ],
    practicalTips: [
      "Experience the Golden Temple at 4:00 AM during the divine Palki Sahib ceremony for serene, soul-stirring spiritual ambiance.",
      "Volunteer for 30 minutes in the Langar community kitchen (rolling rotis, washing dishes, or serving dal) for a humbling experience.",
      "Head to Kulcha Land, Pehalwan Kulcha, or Bhai Kulwant Singh Kulchian before 11:00 AM before daily fresh batches sell out.",
      "At the Wagah Border Ceremony, foreign passport holders and VIP ticket holders have dedicated express seating rows on the right."
    ]
  },

  // --------------------------------------------------------------------------
  // 9. KERALA BACKWATERS 2025
  // --------------------------------------------------------------------------
  "kerala-backwaters-2025": {
    topFoods: [
      { name: "Kerala Sadhya on Banana Leaf", desc: "Grand vegetarian banquet of 24+ dishes including Avial, Sambar, Pachadi, and Payasam" },
      { name: "Karimeen Pollichathu", desc: "Fresh pearl spot fish marinated in spicy shallot paste, wrapped in banana leaf and grilled" },
      { name: "Appam with Vegetable / Chicken Stew", desc: "Lacy, bowl-shaped fermented rice pancakes served with mild coconut milk stew" },
      { name: "Malabar Parotta with Beef / Paneer Roast", desc: "Flaky, layered griddled flatbread paired with rich caramelized onion gravy" },
      { name: "Tender Coconut Elaneer Payasam", desc: "Delicate warm dessert made with fresh coconut pulp, condensed milk, and crushed cardamom" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Valid photo ID/Passport, houseboat booking voucher, tea estate tour confirmations" },
      { category: "Clothing", items: "Lightweight, breathable linen and cotton clothing; light cardigan for cool Munnar mountain nights" },
      { category: "Footwear", items: "Non-slip boat sandals with good grip, slip-on shoes for temples, walking sneakers for tea garden trails" },
      { category: "Weather & Sun", items: "Compact umbrella or rain poncho (frequent coastal and mountain mist), polarized sunglasses" },
      { category: "Tech & Gear", items: "Binoculars for backwater birdwatching, waterproof pouch for phones/cameras, 20,000mAh power bank" },
      { category: "Health", items: "High-efficacy mosquito repellent lotion, motion-sickness meds for winding Munnar ghat roads, sunscreen" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book a government-licensed private Alleppey houseboat (Kettuvallam) with a dedicated chef and AC" },
      { timeframe: "2 months", action: "Reserve a heritage tea plantation bungalow in Munnar and boutique homestay in Fort Kochi" },
      { timeframe: "1 month", action: "Hire a reputable private chauffeured AC cab for the full Kochi -> Munnar -> Thekkady -> Alleppey circuit" },
      { timeframe: "2 weeks", action: "Book tickets for Kathakali dance and Kalaripayattu martial arts performances in Fort Kochi" },
      { timeframe: "On arrival", action: "Coordinate pickup at Cochin International Airport (COK); buy authentic Malabar spices in Mattancherry" }
    ],
    culturalEtiquette: [
      "Traditional Kerala Hindu temples follow strict dress codes (men may be asked to remove shirts and wear a mundu/dhoti).",
      "Greet locals with 'Namaskaram' (palms pressed together at chest level) to acknowledge elders and community members warmly.",
      "Remove your shoes before entering homes, homestays, ayurvedic centers, and temple premises.",
      "Eat traditional Sadhya using your right hand fingertips—it is culturally customary and connects you to the culinary texture.",
      "Treat local village communities along the canals respectfully; avoid photographing private bathing ghats without permission."
    ],
    practicalTips: [
      "Opt for an early morning 6:30 AM country canoe ride through narrow village canals where large houseboats cannot navigate.",
      "Ensure your houseboat has a 24-hour generator for uninterrupted air conditioning during warm, humid afternoon cruises.",
      "Purchase whole spices (cardamom, black pepper, cinnamon, nutmeg) from registered Spices Board outlets in Kumily/Thekkady.",
      "Carry cash for small village purchases, tender coconut water, and tips for your houseboat captain and personal chef."
    ]
  },

  // --------------------------------------------------------------------------
  // 10. GOA VIBRANCE 2025
  // --------------------------------------------------------------------------
  "goa-vibrance-2025": {
    topFoods: [
      { name: "Goan Fish Curry Thali", desc: "Kingfish simmered in spicy, tangy coconut kokum gravy served with rice, kismoor, and sol kadi" },
      { name: "Pork / Mushroom Vindaloo", desc: "Traditional Indo-Portuguese spicy braised curry with toddy vinegar, garlic, and red Kashmiri chilies" },
      { name: "Bebinca", desc: "Rich seven-layered traditional Goan dessert baked with coconut milk, egg yolks, and nutmeg" },
      { name: "Poee with Goan Sausage (Chorizo)", desc: "Warm crusty Goan wheat bread stuffed with spicy, smoky cured pork sausage" },
      { name: "Rava Fried Kingfish / Prawns", desc: "Crispy semolina-crusted coastal seafood fried to golden perfection with lemon" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Valid Driving License (mandatory for self-drive cars/scooters), government ID, hotel confirmations" },
      { category: "Clothing", items: "Resort wear, linen shirts, cotton shorts, modest shirts/dresses for historic Old Goa churches" },
      { category: "Footwear", items: "Waterproof flip-flops for beaches, canvas walking shoes for cobblestone heritage walks in Fontainhas" },
      { category: "Beach & Sun", items: "Reef-safe sunscreen SPF 50+, UV sunglasses, beach towel, waterproof phone dry bag" },
      { category: "Tech & Gear", items: "Action camera/GoPro for water sports, portable bluetooth speaker (for private balconies), power bank" },
      { category: "Health", items: "Mosquito repellent, electrolyte hydration tablets, liver detox supplements, aloe vera after-sun gel" }
    ],
    planningChecklist: [
      { timeframe: "2 months out", action: "Book boutique Portuguese heritage stay in Fontainhas (Panaji) or tranquil beachfront villa in South Goa" },
      { timeframe: "1 month", action: "Reserve tables at celebrated heritage culinary spots (Mum's Kitchen, Gunpowder, Martin's Corner, Cavatina)" },
      { timeframe: "2 weeks", action: "Arrange reliable self-drive car or scooter rental from a verified provider with proper commercial insurance" },
      { timeframe: "1 week", action: "Download GoaMiles app for regulated taxi services; plan morning walks through Old Goa churches" },
      { timeframe: "On arrival", action: "Coordinate car pickup at Mopa (GOX) or Dabolim (GOI) airport; pick up a local craft beer or Feni bottle" }
    ],
    culturalEtiquette: [
      "Wear swimsuits and bikini wear strictly on beaches and pool decks—cover up with shirts/dresses when walking through towns and markets.",
      "Dress conservatively (no bare shoulders or short beachwear) when entering Basilica of Bom Jesus, Se Cathedral, and local temples.",
      "Do not litter on beaches or dunes—carry all plastic bottles, cans, and cigarette butts to designated public dustbins.",
      "Respect local Goan 'Susegad' lifestyle—afternoon hours (1:00 PM to 4:00 PM) are quiet rest periods for many heritage stores.",
      "Drive responsibly and never drink and drive; Goa enforces strict traffic police checkpoints with breathalyzers."
    ],
    practicalTips: [
      "Split your trip: stay 2 days in North Goa (Anjuna/Assagao) for food and energy, then 3 days in South Goa (Agonda/Palolem) for serene peace.",
      "Explore the Latin Quarter of Fontainhas at 7:30 AM for breathtaking photography of pastel heritage homes before cars clog the lanes.",
      "Rent a self-drive hatchback instead of a scooter if traveling with luggage or covering long highway distances between North and South Goa.",
      "Avoid beach touts selling overpriced counterfeit water sports; book directly with certified operators on Calangute, Baga, or Grand Island."
    ]
  },

  // --------------------------------------------------------------------------
  // 11. VIETNAM SECRETS 2025
  // --------------------------------------------------------------------------
  "vietnam-secrets-2025": {
    topFoods: [
      { name: "Phở Bò Hà Nội", desc: "Simmered beef brisket noodle soup with aromatic cinnamon, star anise, and fresh green onions" },
      { name: "Bánh Mì Thịt Nướng", desc: "Warm crusty French baguette filled with lemongrass grilled pork, pâté, pickled daikon, and chili" },
      { name: "Cao Lầu (Hội An)", desc: "Chewy thick noodles infused with wood ash lye, sliced char siu pork, crispy croutons, and fresh greens" },
      { name: "Bánh Xèo", desc: "Crispy turmeric-yellow rice flour crepe stuffed with shrimp, pork, and bean sprouts, wrapped in mustard greens" },
      { name: "Cà Phê Muối (Salt Coffee)", desc: "Hue's velvety salted cream foam poured over rich Vietnamese dark drip coffee" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport (6+ mo validity), printed Vietnam e-Visa PDF, return air ticket, copy of passport photo page" },
      { category: "Clothing", items: "Lightweight quick-dry linen shirts, loose trousers for temples, light rain jacket, swimwear for Halong Bay" },
      { category: "Footwear", items: "Comfortable walking shoes, slip-on sandals for temples, water shoes for Ninh Binh boat tours" },
      { category: "Weather & Sun", items: "Reef-safe sunscreen SPF 50+, wide-brim sun hat, UV polarized sunglasses, compact umbrella" },
      { category: "Tech & Gear", items: "Type A/C universal power adapter, 20,000mAh power bank, 10L dry bag for boat tours, phone strap" },
      { category: "Health", items: "Activated charcoal, motion sickness tablets (for Ha Long cruise & sleeper trains), mosquito spray" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book 2D1N Lan Ha / Ha Long Bay luxury cruise, and reserve domestic flights (HCMC -> Da Nang -> Hanoi)" },
      { timeframe: "6–8 weeks", action: "Apply for Vietnam 90-day multi-entry e-Visa through the official Vietnamese Immigration portal" },
      { timeframe: "1 month", action: "Book private day excursion to Trang An / Tam Coc in Ninh Binh and custom tailoring in Hoi An" },
      { timeframe: "2 weeks", action: "Download Grab, Google Translate (Vietnamese offline), and 12Go Asia for bus/train booking verification" },
      { timeframe: "On arrival", action: "Activate Viettel unlimited 4G/5G eSIM at Tan Son Nhat (SGN) or Noi Bai (HAN) Airport; withdraw VND cash" }
    ],
    culturalEtiquette: [
      "Always remove your footwear before entering Vietnamese homes, pagoda sanctums, and traditional tatami-style restaurants.",
      "Dress with modest restraint when visiting historical monuments (Ho Chi Minh Mausoleum, Hue Imperial Citadel, Tran Quoc Pagoda).",
      "Hand and receive cash, credit cards, drinks, and food with both hands as an authentic gesture of courtesy.",
      "Do not touch someone on the head or point your feet toward people or sacred statues.",
      "Bargain with a friendly smile at local night markets; accept final agreed prices graciously."
    ],
    practicalTips: [
      "Use the Grab app for transparent, metered rides on GrabCar and GrabBike; avoid unmetered street taxis waiting outside airports.",
      "Always carry cash in small denominations (10k, 20k, 50k, 100k VND)—street vendors, boat rowers, and coffee shops do not take cards.",
      "When crossing chaotic scooter-filled intersections in Hanoi or Saigon, maintain a steady, predictable forward pace.",
      "Try local coffee varieties: Egg Coffee (Hanoi), Salt Coffee (Hue), and Coconut Coffee (Cộng Cà Phê across all major cities)."
    ]
  },

  // --------------------------------------------------------------------------
  // 12. NAINITAL HEIGHTS 2025
  // --------------------------------------------------------------------------
  "nainital-heights-2025": {
    topFoods: [
      { name: "Kumaoni Aloo ke Gutke", desc: "Spiced mountain potatoes stir-fried with fragrant jamboo herb, served with fresh green chutney" },
      { name: "Ras-Bhaat", desc: "Nutritious slow-simmered mixed organic lentil soup served over steaming fragrant hill rice" },
      { name: "Tibetan Steamed Momos & Thukpa", desc: "Juicy steamed dumplings and piping-hot noodle soup served along the Tibetan Market" },
      { name: "Singori Sweet", desc: "Rich condensed milk sweet subtly flavored with cardamom and wrapped in fresh fragrant Malu leaves" },
      { name: "Fresh Hill Plum & Apple Jams", desc: "Artisan jams and preserves made from organic orchards in Ramgarh and Mukteshwar" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Valid Government ID/Passport, train tickets to Kathgodam, hotel reservation vouchers" },
      { category: "Clothing", items: "Layered clothing: warm fleece jacket, thermal inners (Oct-March), light windcheater (April-June)" },
      { category: "Footwear", items: "Sturdy grip walking sneakers for steep mountain inclines, trail walking shoes for Sattal" },
      { category: "Weather & Sun", items: "Woolen beanie/cap, sunglasses for high-altitude UV, compact rain umbrella for sudden mountain mist" },
      { category: "Tech & Gear", items: "Binoculars (essential for world-class birdwatching in Pangot and Sattal), power bank" },
      { category: "Health", items: "Motion-sickness tablets for winding hill roads (Kathgodam to Nainital), basic first-aid, lip balm" }
    ],
    planningChecklist: [
      { timeframe: "2 months out", action: "Book a heritage lake-facing stay along Mallital or a serene nature cottage in Sattal/Pangot" },
      { timeframe: "1 month", action: "Book Kathgodam Shatabdi Express train tickets from New Delhi to Kathgodam railway station" },
      { timeframe: "2 weeks", action: "Hire a trusted local hill cab driver for lake tours (Bhimtal, Naukuchiatal, Sattal, Khurpatal)" },
      { timeframe: "1 week", action: "Check mountain weather updates and pack proper thermal layers for cool evenings" },
      { timeframe: "On arrival", action: "Buy boating tickets only from official municipal ticket counters along Naini Lake" }
    ],
    culturalEtiquette: [
      "Keep the sacred Naini Lake and outer lake reservoirs pristine; disposal of any plastic, food, or garbage in the lakes is strictly penalized.",
      "Remove your shoes before entering the revered Maa Naina Devi Temple along the northern shore of Naini Lake.",
      "Respect the peaceful silence of Sattal and Pangot forest reserves—avoid playing loud music on mountain trails.",
      "Support local Kumaoni artisans by purchasing hand-knitted woolen shawls, wooden crafts, and locally produced fruit preserves.",
      "Do not feed wild monkeys or stray animals along Mall Road and Tiffin Top trails."
    ],
    practicalTips: [
      "Stroll along Thandi Sadak (the quiet pedestrian path opposite Mall Road) at 7:00 AM for tranquil lake views without vehicular noise.",
      "Take the aerial ropeway or hike to Snow View Point before 10:00 AM for clear, panoramic views of the Himalayan peaks (Trisul, Nanda Devi).",
      "Escape the Mall Road tourist crowds by spending a day kayaking and forest walking around the tranquil Seven Lakes of Sattal.",
      "Pre-book Kathgodam railway taxis through registered transport counters to avoid inflated fares at the train station exit."
    ]
  },

  // --------------------------------------------------------------------------
  // 13. VIETNAM 12-DAY EXPEDITION
  // --------------------------------------------------------------------------
  "vietnam-12-day-expedition": {
    topFoods: [
      { name: "Phở Bò Tái Nạm", desc: "Northern style beef noodle soup served with fragrant herbs, lime, and chili garlic vinegar" },
      { name: "Bún Bò Huế", desc: "Spicy royal lemongrass beef noodle soup with thick rice noodles and tender shank" },
      { name: "Bún Chả Đắc Kim", desc: "Hanoi's legendary grilled pork patties in fish sauce broth with fresh herbs and rice noodles" },
      { name: "Cà Phê Trứng & Cà Phê Muối", desc: "Whipped egg yolk custard coffee in Hanoi and salted cream coffee in Hue" },
      { name: "Fresh Seafood at Lan Ha Bay", desc: "Catch-of-the-day grilled squid, king prawns, and steamed sea bass prepared aboard your cruise" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport (6+ mo validity), printed Vietnam e-Visa PDF, internal flight & cruise confirmations" },
      { category: "Clothing", items: "Breathable moisture-wicking tees, linen shorts, long lightweight trousers for temples, swimwear" },
      { category: "Footwear", items: "Comfortable cushioned sneakers, water shoes for cave boat excursions, slip-on sandals" },
      { category: "Weather & Sun", items: "Compact umbrella, lightweight rain shell, SPF 50+ sunscreen, polarized sunglasses" },
      { category: "Tech & Gear", items: "40L carry-on travel pack, 20,000mAh power bank, 15L waterproof dry bag, universal plug adapter" },
      { category: "Health", items: "Motion-sickness pills (for Lan Ha Bay cruise and sleeper transport), mosquito spray, electrolyte mix" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book 2D1N Lan Ha Bay cruise and reserve Vietnam Airlines domestic flights (SGN -> DAD -> HAN)" },
      { timeframe: "2 months", action: "Apply for 90-day Vietnam e-Visa via the official government portal with correct port of entry" },
      { timeframe: "1 month", action: "Book Trang An (Route 3) morning boat tour and tailor-made clothing appointments in Hoi An" },
      { timeframe: "2 weeks", action: "Install Grab app, set up eSIM profile, and download offline maps for all four transit cities" },
      { timeframe: "On arrival", action: "Activate Viettel 5G data eSIM at Tan Son Nhat airport, withdraw VND cash at airport ATM" }
    ],
    culturalEtiquette: [
      "Dress with reverence (shoulders, chest, and knees fully covered) when visiting temples, pagodas, and mausoleums.",
      "Remove your shoes before stepping onto carpeted areas in temples, homestays, and cruise cabins.",
      "Hand and receive cash, menus, and business cards using both hands as an authentic mark of politeness.",
      "Speak in a gentle, conversational volume in public spaces and avoid public confrontations.",
      "Never touch anyone on top of the head, and avoid pointing the soles of your feet at sacred altars."
    ],
    practicalTips: [
      "Take the 7:30 AM early morning boat at Trang An (Route 3) in Ninh Binh to glide through limestone caves in total tranquility before tour buses arrive.",
      "Use GrabCar for fixed, metered city transit in Saigon, Da Nang, and Hanoi to avoid rogue street taxi meters.",
      "Get bespoke clothes tailored in Hoi An within your first 24 hours to allow ample time for final fittings and adjustments.",
      "Always keep 50,000 and 100,000 VND cash notes in your pocket for street food stalls, river sampans, and temple donations."
    ]
  },

  // --------------------------------------------------------------------------
  // 14. SE ASIA PACKING BLUEPRINT
  // --------------------------------------------------------------------------
  "se-asia-packing-blueprint-30-day": {
    topFoods: [
      { name: "Tropical Fruit Medley", desc: "Fresh dragonfruit, golden mango, rambutan, and sweet mangosteen bought at street stalls" },
      { name: "Night Market Pad Thai", desc: "Fresh wok-fried tamarind noodles prepared in under 2 minutes for less than $2 USD" },
      { name: "Fresh Vietnamese Summer Rolls", desc: "Rice paper rolls packed with fresh mint, basil, shrimp, and pork with peanut dip" },
      { name: "Chilled Young Coconut", desc: "Hydrating fresh coconut water opened with a machete on street corners across the region" },
      { name: "Nasi Goreng Kampung", desc: "Indonesian/Malaysian home-style fried rice crowned with a crispy fried egg and sambal" }
    ],
    packingChecklist: [
      { category: "Backpack & Storage", items: "35L-40L carry-on backpack (under 7kg), 3 compression packing cubes, 1 ultralight packable daypack" },
      { category: "Capsule Clothing", items: "5 lightweight merino/modal tees, 2 quick-dry shorts, 1 pair temple linen trousers, 1 rain shell" },
      { category: "Footwear", items: "1 pair lightweight trail/walking sneakers, 1 pair durable slip-on sandals (Chacos / Birkenstock EVA)" },
      { category: "Electronics", items: "Unlocked smartphone, 20,000mAh PD power bank, universal all-in-one travel adapter, braided USB-C cords" },
      { category: "Toiletries (TSA 3-1-1)", items: "Solid shampoo bar, reef-safe sunscreen stick, DEET mosquito spray, microfiber quick-dry towel" },
      { category: "Health & First Aid", items: "Oral rehydration salts, activated charcoal, Imodium, waterproof band-aids, blister patches" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Lock in multi-city open-jaw flights and confirm 7kg carry-on weight allowances across budget carriers" },
      { timeframe: "6 weeks", action: "Review visa requirements for all target countries (Vietnam e-Visa, Thailand digital entry, Malaysia MDAC)" },
      { timeframe: "1 month", action: "Conduct a trial packing test with luggage scale to ensure full bag weighs under 6.8kg with electronics" },
      { timeframe: "2 weeks", action: "Set up zero-foreign-transaction-fee debit and credit cards (Wise, Revolut, Charles Schwab)" },
      { timeframe: "On arrival", action: "Purchase bulky liquid toiletries (body wash, large sunscreen) locally at 7-Eleven to save luggage weight" }
    ],
    culturalEtiquette: [
      "Always carry one lightweight scarf or sarong in your daypack to quickly cover shoulders and knees when visiting temples.",
      "Remove your shoes before entering temples, pagodas, mosques, and private residential quarters across Southeast Asia.",
      "Show absolute reverence to Buddhist monks, royal family images, and sacred Hindu/Buddhist monuments.",
      "Never point your feet toward people, monks, or Buddha statues—tuck your feet behind you when sitting on the floor.",
      "Embrace bargaining as a friendly, lighthearted interaction—never argue aggressively over minor sums."
    ],
    practicalTips: [
      "Use neighborhood laundry services across Southeast Asia ($1 to $2 USD per kg, washed, dried, and folded within 24 hours).",
      "Pack clothing in neutral, mix-and-match earth tones (olive, charcoal, navy, beige) to create 15+ unique outfits from 7 garments.",
      "Keep digital PDF copies of your passport, visas, travel insurance, and vaccination cards stored offline in cloud files.",
      "Always reject ATM conversion rates (Dynamic Currency Conversion / DCC) and choose 'Without Conversion' to let your bank do the conversion."
    ]
  },

  // --------------------------------------------------------------------------
  // 15. PENANG TO LANGKAWI GUIDE
  // --------------------------------------------------------------------------
  "penang-to-langkawi-guide": {
    topFoods: [
      { name: "Penang Assam Laksa", desc: "Tangy mackerel tamarind broth with rice noodles, shredded pineapple, and torch ginger flower" },
      { name: "Nasi Kandar Line Clear", desc: "Steaming rice drenched in mixed aromatic curries (kari campur), fried chicken, and okra" },
      { name: "Langkawi Grilled Seafood BBQ", desc: "Fresh red snapper, squid, and tiger prawns grilled over coconut husk coals at Pantai Cenang" },
      { name: "Apom Balik (Penang Pancake)", desc: "Crispy folded golden street pancake filled with crushed peanuts, sweet corn, and sugar" },
      { name: "Musang King Durian Ice Cream", desc: "Rich and creamy artisan ice cream made with premium fresh Malaysian durian pulp" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport, valid International Driving Permit / National Driving License (for Langkawi car rental), e-tickets" },
      { category: "Clothing", items: "Breathable linen shirts, quick-dry beach shorts, UV rash guard for water sports, modest city attire" },
      { category: "Footwear", items: "Comfortable sneakers for walking George Town murals, water-friendly slip-on beach sandals" },
      { category: "Beach & Sun", items: "SPF 50+ sunscreen, polarized sunglasses, beach tote bag, waterproof phone case" },
      { category: "Tech & Gear", items: "15L waterproof dry bag for island boat hops, Type G plug adapter, 20,000mAh power bank" },
      { category: "Health", items: "Mosquito repellent with Picaridin, seasickness tablets (for ferry/boat tours), aloe vera after-sun gel" }
    ],
    planningChecklist: [
      { timeframe: "2 months out", action: "Book heritage hotel in George Town (Penang) and beachfront resort in Langkawi (Pantai Cenang/Datai)" },
      { timeframe: "1 month", action: "Book short 35-minute domestic flight (Firefly/AirAsia) or ferry between Penang and Langkawi" },
      { timeframe: "3 weeks", action: "Reserve a self-drive rental car for Langkawi pickup directly at Langkawi International Airport (LGK)" },
      { timeframe: "1 week", action: "Pre-book Langkawi SkyCab cable car VIP express tickets online to skip 2-hour ticket lines" },
      { timeframe: "On arrival", action: "Verify Langkawi duty-free shopping rules (duty-free alcohol/chocolate allowances before departure)" }
    ],
    culturalEtiquette: [
      "Respect multicultural norms (Malay, Chinese, Indian, Peranakan) across street stalls and heritage temples.",
      "Remove your shoes before entering temples, clan houses, mosques, and private residential buildings.",
      "Use your right hand when paying vendors, receiving items, or sampling street food.",
      "Dress with modest discretion when exploring rural Langkawi villages (Kampungs) and local mosques.",
      "Always ask politely before photographing heritage artisans, clan jetty residents, or local street cooks."
    ],
    practicalTips: [
      "Rent a compact car in Langkawi ($20 to $30 USD per day)—roads are well-paved, scenic, and traffic is very light.",
      "Explore George Town's street art murals on foot or via Grab between 7:30 AM and 9:30 AM before tropical humidity peaks.",
      "Book the Langkawi SkyCab Cable Car early morning on a clear day for 360-degree views of the Andaman Sea and Tarutao archipelago.",
      "Langkawi is a designated duty-free island—enjoy heavily discounted chocolates, cosmetics, and beverages during your stay."
    ]
  },

  // --------------------------------------------------------------------------
  // 16. SWAP BANGKOK FOR PHUKET & PHI PHI
  // --------------------------------------------------------------------------
  "swap-bangkok-for-phuket-phi-phi": {
    topFoods: [
      { name: "Southern Massaman Curry", desc: "Rich and fragrant mild curry cooked with coconut cream, potatoes, peanuts, and tender beef/chicken" },
      { name: "Tom Yum Seafood Pot", desc: "Fiery lemongrass and galangal soup brimming with Andaman calamari, prawns, and mushrooms" },
      { name: "Pad See Ew", desc: "Wide flat rice noodles wok-fried with sweet dark soy sauce, crispy Chinese broccoli, and egg" },
      { name: "Chicken Satay with Peanut Sauce", desc: "Grilled marinated chicken skewers served with rich peanut dip and cucumber relish" },
      { name: "Fresh Phuket Pineapple", desc: "Crisp, naturally sweet local Phuket queen pineapples sold freshly sliced on beach stalls" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport (6+ mo validity), Thailand e-Visa/e-VOA, boat charter confirmations, hotel vouchers" },
      { category: "Clothing", items: "Lightweight resort linens, UV swim rash guards, 2-3 swimsuits, modest temple wrap for Wat Chalong" },
      { category: "Footwear", items: "Water shoes (for rocky reef landings), non-slip boat flip-flops, walking sandals" },
      { category: "Sun & Water", items: "Reef-safe sunscreen SPF 50+, polarized sunglasses, 20L heavy-duty waterproof dry bag, snorkel mask" },
      { category: "Tech & Power", items: "Action camera/GoPro with floating handle, waterproof phone dry bag, 20,000mAh fast power bank" },
      { category: "Health", items: "Dimenhydrinate motion-sickness tablets (mandatory for speedboats), mosquito spray, rehydration salts" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book direct international flight to Phuket (HKT) to bypass Bangkok transit and save 2 travel days" },
      { timeframe: "2 months", action: "Reserve a private 6:30 AM sunrise longtail boat charter to Maya Bay and Pileh Lagoon from Koh Phi Phi Don" },
      { timeframe: "1 month", action: "Book high-speed ferry or private catamaran transfer from Rassada Pier (Phuket) to Ton Sai Pier (Phi Phi)" },
      { timeframe: "2 weeks", action: "Download Grab and Bolt apps; verify comprehensive travel insurance covering coastal marine excursions" },
      { timeframe: "On arrival", action: "Pick up AIS/TrueMove 5G eSIM at HKT airport, withdraw Thai Baht cash for National Park fees" }
    ],
    culturalEtiquette: [
      "Pay the mandatory 400 THB Hat Noppharat Thara-Mu Ko Phi Phi National Park cash entry fee with respect.",
      "Never touch, stand on, or kick live coral reefs, and avoid handling marine life while snorkeling.",
      "Wear proper shirts and shorts when walking through Phi Phi village or Old Phuket Town—swimsuits are for beaches only.",
      "Perform the 'Wai' gesture and return smiles to local boat captains, hotel hosts, and restaurant staff.",
      "Dispose of all trash responsibly; take all single-use plastics back to your resort for recycling."
    ],
    practicalTips: [
      "Arrive at Maya Bay before 8:00 AM on a private early-morning charter—you will experience the beach in total peace before ferry hordes arrive.",
      "Keep all electronic devices, cameras, wallets, and passports inside a sealed 20L dry bag whenever boarding speedboats or longtails.",
      "Choose Kata or Karon as your Phuket base rather than noisy Patong for pristine beaches, cleaner waters, and great dining.",
      "Always carry cash (Thai Baht) as boat captains, island entrance stations, and beach vendors do not accept card payments."
    ]
  },

  // --------------------------------------------------------------------------
  // 17. FIRST TIMER DIY GUIDE SE ASIA
  // --------------------------------------------------------------------------
  "first-timer-diy-guide-se-asia": {
    topFoods: [
      { name: "Street Hawker Noodle Soup", desc: "Steaming aromatic noodle broth customized with fresh chili, lime, fish sauce, and herbs" },
      { name: "Crispy Pork Bánh Mì", desc: "Warm crusty French baguette loaded with roasted pork, pâté, fresh cilantro, and pickled veggies" },
      { name: "Night Market Satay Skewers", desc: "Charcoal-grilled chicken and beef skewers basted with turmeric and served with sweet peanut sauce" },
      { name: "Fresh Mango Sticky Rice", desc: "Warm coconut glutinous rice topped with sweet ripe honey mango and roasted sesame" },
      { name: "Iced Condensed Milk Coffee", desc: "Robust slow-drip Robusta coffee poured over sweetened condensed milk and crushed ice" }
    ],
    packingChecklist: [
      { category: "Documents", items: "Passport (6+ mo validity), printed color copies of e-Visas, travel insurance policy, yellow fever card (if required)" },
      { category: "Finances & Cards", items: "2 zero-forex debit/credit cards (Visa/Mastercard), emergency backup $100 USD cash bills (crisp & uncreased)" },
      { category: "Clothing", items: "Lightweight quick-dry capsule wardrobe (4 tees, 2 shorts, 1 temple pants, 1 light rain jacket)" },
      { category: "Footwear", items: "1 pair supportive walking sneakers, 1 pair durable slip-on sandals" },
      { category: "Tech & Comms", items: "Unlocked smartphone, 20,000mAh PD power bank, universal multi-plug adapter, high-speed USB-C cables" },
      { category: "Health & Medical", items: "Mini first-aid pouch (Imodium, Paracetamol, Oral Rehydration Salts, Band-Aids, DEET mosquito spray)" }
    ],
    planningChecklist: [
      { timeframe: "3 months out", action: "Book long-haul international flights and establish a realistic, unhurried multi-country itinerary route" },
      { timeframe: "6–8 weeks", action: "Apply for all required e-Visas (Vietnam 90-day e-Visa, Thailand digital entry, Cambodia e-Visa, Malaysia MDAC)" },
      { timeframe: "1 month", action: "Notify your home banks of overseas travel dates to prevent automated card security freezes" },
      { timeframe: "2 weeks", action: "Install and set up Grab, Bolt, 12Go Asia, Google Maps (offline downloads), and Google Translate" },
      { timeframe: "On arrival", action: "Activate local 5G eSIM at airport terminal, withdraw local cash from major bank ATM without currency conversion" }
    ],
    culturalEtiquette: [
      "Always cover shoulders and knees when visiting sacred temples, pagodas, and royal heritage grounds.",
      "Remove your shoes before entering temples, shrines, traditional restaurants, and private homes.",
      "Use your right hand when giving or receiving money, food, and gifts.",
      "Avoid touching anyone on the top of their head, and never point the soles of your feet toward people or religious figures.",
      "Keep your composure—patience, smiling, and polite communication resolve issues much faster than anger."
    ],
    practicalTips: [
      "At ATMs, always decline the machine's offered conversion rate (DCC) and choose 'Without Conversion' for the best interbank rate.",
      "Use ride-hailing apps like Grab and Bolt to avoid street taxi meter scams, language barriers, and inflated tourist pricing.",
      "Drink only sealed bottled or purified water; avoid tap water and raw unwashed produce with non-peelable skin.",
      "Buy country-specific local eSIM packages online via Airalo or Maya Mobile before departure for immediate connectivity upon touchdown."
    ]
  }
};

/**
 * Fallback generator in case a post ID isn't directly matched in the map
 */
export function getTravelResourcesForPost(postId: string, title?: string, tag?: string): PremiumTravelResource {
  if (TRAVEL_RESOURCES_BY_POST[postId]) {
    return TRAVEL_RESOURCES_BY_POST[postId];
  }

  // Fallback matching by tag or keyword
  const lowerTitle = (title || "").toLowerCase();
  const lowerTag = (tag || "").toLowerCase();

  if (lowerTitle.includes("vietnam") || lowerTag.includes("vietnam")) {
    return TRAVEL_RESOURCES_BY_POST["vietnam-secrets-2025"];
  }
  if (lowerTitle.includes("phuket") || lowerTitle.includes("thailand") || lowerTag.includes("thailand")) {
    return TRAVEL_RESOURCES_BY_POST["phuket-expedition-guide"];
  }
  if (lowerTitle.includes("malaysia") || lowerTitle.includes("penang") || lowerTitle.includes("langkawi")) {
    return TRAVEL_RESOURCES_BY_POST["malaysia-expedition-2025"];
  }
  if (lowerTitle.includes("amritsar") || lowerTitle.includes("punjab")) {
    return TRAVEL_RESOURCES_BY_POST["amritsar-grace-2025"];
  }
  if (lowerTitle.includes("kerala")) {
    return TRAVEL_RESOURCES_BY_POST["kerala-backwaters-2025"];
  }
  if (lowerTitle.includes("goa")) {
    return TRAVEL_RESOURCES_BY_POST["goa-vibrance-2025"];
  }
  if (lowerTitle.includes("rishikesh")) {
    return TRAVEL_RESOURCES_BY_POST["rishikesh-spiritual-haven"];
  }
  if (lowerTitle.includes("patal") || lowerTitle.includes("cave")) {
    return TRAVEL_RESOURCES_BY_POST["patal-bhuvneswar-cave-secrets"];
  }
  if (lowerTitle.includes("nainital")) {
    return TRAVEL_RESOURCES_BY_POST["nainital-heights-2025"];
  }
  if (lowerTitle.includes("photo") || lowerTitle.includes("camera") || lowerTitle.includes("iphone")) {
    return TRAVEL_RESOURCES_BY_POST["mobile-photography-masterclass"];
  }
  if (lowerTitle.includes("pack")) {
    return TRAVEL_RESOURCES_BY_POST["se-asia-packing-blueprint-30-day"];
  }
  if (lowerTitle.includes("slow")) {
    return TRAVEL_RESOURCES_BY_POST["slow-travel-philosophy"];
  }

  // Default Southeast Asia DIY
  return TRAVEL_RESOURCES_BY_POST["first-timer-diy-guide-se-asia"];
}
