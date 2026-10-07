# Lens & Latitude — Implementation Plan & Platform Roadmap

When Gemini makes an implementation plan, it will show up here. Try asking for a plan in your next prompt.

This implementation plan provides a comprehensive architectural overview, recent system enhancements, and strategic roadmap for **Lens & Latitude** by Khilesh Sammal.

---

## User Review & Critical Decisions

> [!NOTE]
> Recent milestones have established production-grade performance, dynamic SSR SEO injection, expanded journal dispatches for Thailand & Malaysia, and a dedicated inquiry workflow.

- **Confirmed Architecture**: Vite + React 19 SPA running on Express server (`server.ts`) with dynamic server-side SEO meta-tag injection and pre-rendered OpenGraph/JSON-LD structured data.
- **Performance Milestone**: Code-splitting implemented across all 15 secondary views using `React.lazy` and `Suspense`, dropping initial JavaScript bundle size from 986 KB to 240 KB.
- **Content Expansion**: 26 comprehensive field dispatches with rich itineraries across Thailand, Malaysia, Vietnam, and India.

---

## 1. Overview & Core Concept

- **What It Does**: Lens & Latitude is an editorial travel portfolio and digital dispatch platform documenting slow-travel philosophy, visual expeditions, and practical DIY blueprints across Southeast Asia and India.
- **Target Audience**: Solo travelers, photography enthusiasts, cultural explorers, and travelers seeking authentic, crowd-free routes with actionable logistics.
- **Key Value**: Direct, personal field intelligence combining photography, transit breakdowns, cost budgets, and tailored travel consultations.

---

## 2. User Experience & Visual Design

- **Aesthetic Direction**: Cinematic editorial minimalism with dark/light mode posture. Default cinematic dark backdrop (`#0c0c0e`) with warm gold/amber accents (`#ffcc00` / `#b45309`).
- **Typography & Hierarchy**: 
  - Display: *Playfair Display* (classic editorial serif)
  - UI & Badges: *Montserrat* (clean tracking & uppercase geometry)
  - Body: *Inter* (optimized legibility, `line-height: 1.82`, `-webkit-font-smoothing: antialiased`)
- **Key User Flows**:
  1. **Expedition Discovery**: Interactive Directory & Gallery Suite leading to destination journals.
  2. **Journal & Reading**: Deep-linked articles with table of contents, reading time, pro-tips, and logistics summaries.
  3. **Direct Contact**: Dedicated multi-channel inquiry form with client reviews and custom blueprint scheduling.
  4. **Travel Shop & Gear**: Curated physical nomad merchandise and instant digital PDF guides with Stripe checkout.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Routing with Server SEO Injection**:
  - *Chosen Approach*: Clean browser URL synchronization (`/blog/:slug`, `/contact`, `/destination/:slug`) combined with Express middleware injecting route-specific `<title>`, canonical link, OpenGraph tags, and Schema.org JSON-LD before serving HTML.
  - *Why*: Delivers instant client-side page transitions while providing search engines with pre-rendered, crawlable metadata.
- **Decision 2: Idle Route Prefetching**:
  - *Chosen Approach*: `requestIdleCallback` loads critical route bundles in the background after initial render.
  - *Why*: Eliminates loading spinners on navigation while keeping initial landing page download to under 250 KB.

---

## 4. Technical Architecture & System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
└──────────────┬──────────────────────────────┬───────────────┘
               │ HTTP GET (SSR HTML + SEO)    │ Asset Bundles (Vite)
               ▼                              ▼
┌──────────────────────────────┐  ┌───────────────────────────┐
│       Express Server         │  │     Static Asset Cache    │
│       (`server.ts`)          │  │     (/assets: 1y immutable│
├──────────────────────────────┤  │      /sitemap.xml, robots)│
│ • injectSeoTagsIntoHtml()    │  └───────────────────────────┘
│ • /api/subscribe newsletter  │
│ • /api/checkout (Stripe)     │
└──────────────┬───────────────┘
               │ Serves Hydrated SPA
               ▼
┌─────────────────────────────────────────────────────────────┐
│                    React 19 Application                     │
├─────────────────────────────────────────────────────────────┤
│  AppContent (URL Router, ThemeContext, Cart, SEO Sync)      │
│  ├─ Eager Views: Hero, About, Directory, Gallery, FAQ, Hub  │
│  └─ Suspense Lazy Views:                                    │
│      ├─ BlogArchive (26 Detailed Articles + Search)         │
│      ├─ ContactView (Custom Blueprint Inquiries)            │
│      ├─ ShopView & CheckoutView (Stripe Integration)        │
│      └─ Destination Expeditions (Thailand, Malaysia, etc.)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Upcoming Implementation Milestones

1. **Interactive Itinerary Builder**: Allow readers to customize and export personalized day-by-day travel plans.
2. **Offline Field Guides**: Progressive Web App (PWA) offline caching for readers traveling in remote areas with low connectivity.
3. **Photo Location Coordinates**: MapLibre vector maps pinned to exact GPS photo locations for travel photography spots.
