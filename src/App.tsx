import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TRIP_ID_TO_VIEW_MAP,
  TRIP_ID_TO_BLOG_ID_MAP
} from "./constants";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Directory } from "./components/Directory";
import { PortfolioGallery } from "./components/PortfolioGallery";
import ExpeditionHub from "./components/ExpeditionHub";
import { BlogSection } from "./components/BlogSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { parseCurrentRoute, routeToPath, updatePageSeo, AppView } from "./utils/routerSeo";

// Code-split secondary views for high performance & ultra-fast initial page load
const ContactView = lazy(() => import("./components/ContactView").then(m => ({ default: m.ContactView })));
const BlogArchive = lazy(() => import("./components/BlogArchive").then(m => ({ default: m.BlogArchive })));
const CheckoutView = lazy(() => import("./components/CheckoutView").then(m => ({ default: m.CheckoutView })));
const ShopView = lazy(() => import("./components/ShopView").then(m => ({ default: m.ShopView })));
const ThailandDiariesView = lazy(() => import("./components/ThailandDiariesView").then(m => ({ default: m.ThailandDiariesView })));
const MalaysiaExpeditionView = lazy(() => import("./components/MalaysiaExpeditionView").then(m => ({ default: m.MalaysiaExpeditionView })));
const AmritsarExpeditionView = lazy(() => import("./components/AmritsarExpeditionView").then(m => ({ default: m.AmritsarExpeditionView })));
const KeralaExpeditionView = lazy(() => import("./components/KeralaExpeditionView").then(m => ({ default: m.KeralaExpeditionView })));
const PatalBhuvaneshwarExpeditionView = lazy(() => import("./components/PatalBhuvaneshwarExpeditionView").then(m => ({ default: m.PatalBhuvaneshwarExpeditionView })));
const RishikeshExpeditionView = lazy(() => import("./components/RishikeshExpeditionView").then(m => ({ default: m.RishikeshExpeditionView })));
const GoaExpeditionView = lazy(() => import("./components/GoaExpeditionView").then(m => ({ default: m.GoaExpeditionView })));
const VietnamExpeditionView = lazy(() => import("./components/VietnamExpeditionView").then(m => ({ default: m.VietnamExpeditionView })));
const ExploringSoonView = lazy(() => import("./components/ExploringSoonView").then(m => ({ default: m.ExploringSoonView })));
const BioView = lazy(() => import("./components/BioView").then(m => ({ default: m.BioView })));
const PolicyPageView = lazy(() => import("./components/PolicyPageView").then(m => ({ default: m.PolicyPageView })));

const ViewLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-bg text-text-main py-24 transition-colors">
    <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin mb-4" />
    <span className="font-ui text-xs uppercase tracking-widest text-text-dim">Loading Dispatch...</span>
  </div>
);

/**
 * AppContent Component:
 * Core application controller handling routing, cart state, global toast notifications,
 * and high-performance device rendering across all viewports.
 */
function AppContent() {
  const { theme, toggleTheme } = useTheme();

  // 1. Current active view route
  const [view, setView] = useState<AppView>(() => {
    const route = parseCurrentRoute(window.location.pathname, window.location.hash);
    return route.view;
  });

  // 2. Active blog post ID for deep-linking journal articles
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(() => {
    const route = parseCurrentRoute(window.location.pathname, window.location.hash);
    return route.activeBlogPostId;
  });

  // 3. Persistent travel cart state
  const [cart, setCart] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("latitude_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 4. Temporary toast notification message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize browser URL and dynamic SEO tags whenever view or activeBlogPostId changes
  useEffect(() => {
    const path = routeToPath(view, activeBlogPostId);
    if (window.location.pathname !== path && !window.location.hash.startsWith("#/")) {
      window.history.replaceState({}, "", path);
    }
    updatePageSeo(view, activeBlogPostId);
  }, [view, activeBlogPostId]);

  // Listen for browser back / forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute(window.location.pathname, window.location.hash);
      setView(route.view);
      setActiveBlogPostId(route.activeBlogPostId);
      updatePageSeo(route.view, route.activeBlogPostId);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("latitude_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Manage automatic closing of toast notifications (3 seconds)
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Prefetch primary secondary routes during idle time to ensure instant transitions
  useEffect(() => {
    const prefetchRoutes = () => {
      import("./components/BlogArchive");
      import("./components/ContactView");
      import("./components/ShopView");
      import("./components/ThailandDiariesView");
      import("./components/MalaysiaExpeditionView");
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(prefetchRoutes);
      } else {
        setTimeout(prefetchRoutes, 2000);
      }
    }
  }, []);

  // Cart operations (memoized callbacks)
  const handleAddToCart = useCallback((item: { name: string; price: number; img: string }) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(i => i.name === item.name);
      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx] = {
          ...nextCart[existingIdx],
          quantity: nextCart[existingIdx].quantity + 1
        };
        setToastMessage(`Updated quantity of ${item.name}!`);
        return nextCart;
      } else {
        setToastMessage(`Added ${item.name} to cart!`);
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const handleRemoveFromCart = useCallback((name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
    setToastMessage(`Removed from cart.`);
  }, []);

  const handleUpdateQuantity = useCallback((name: string, quantity: number) => {
    setCart(prev => prev.map(item => item.name === name ? { ...item, quantity } : item));
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalCartItems = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]);

  /**
   * handleNavigate:
   * View transitions with URL synchronization, SEO updates, and smooth section scrolling
   */
  const handleNavigate = useCallback((targetView: AppView, targetHash?: string) => {
    setView(targetView);
    setActiveBlogPostId(null);
    const newPath = routeToPath(targetView, null);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
    updatePageSeo(targetView, null);

    if (targetView === "home") {
      if (targetHash) {
        setTimeout(() => {
          const element = document.querySelector(targetHash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  /**
   * handleSelectPost:
   * Opens full blog post or archive list, synchronizes route path, and updates SEO metadata
   */
  const handleSelectPost = useCallback((postId: string | null) => {
    const isList = !postId || postId === "archive-list";
    const selectedId = isList ? null : postId;
    setActiveBlogPostId(selectedId);
    setView("blog-archive");
    const newPath = routeToPath("blog-archive", selectedId);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
    updatePageSeo("blog-archive", selectedId);
    window.scrollTo({ top: 0 });
  }, []);

  /**
   * handleSelectTrip:
   * Unified trip selection handler utilizing centralized lookup tables to eliminate repetitive branching
   */
  const handleSelectTrip = useCallback((id: number) => {
    const mappedView = TRIP_ID_TO_VIEW_MAP[id] as AppView | undefined;
    if (mappedView) {
      handleNavigate(mappedView);
    } else if (TRIP_ID_TO_BLOG_ID_MAP[id]) {
      handleSelectPost(TRIP_ID_TO_BLOG_ID_MAP[id]);
    } else {
      handleNavigate("home");
    }
  }, [handleNavigate, handleSelectPost]);

  const handleBackToHome = useCallback(() => {
    handleNavigate("home");
  }, [handleNavigate]);

  const handleOpenCheckout = useCallback(() => {
    handleNavigate("checkout");
  }, [handleNavigate]);

  // Clean, modular view renderer
  const renderCurrentView = () => {
    switch (view) {
      case "home":
        return (
          <>
            <Hero />
            <About onReadBio={() => handleNavigate("bio")} />
            <Directory onSelectTrip={handleSelectTrip} />
            <PortfolioGallery />
            <ExpeditionHub 
              cartItems={cart}
              onAddToCart={handleAddToCart}
              onOpenCheckout={handleOpenCheckout}
            />
            <BlogSection onSelectPost={handleSelectPost} />
            <FAQSection />
            <ContactSection onNavigate={handleNavigate} />
          </>
        );

      case "blog-archive":
        return (
          <BlogArchive 
            onBackToHome={handleBackToHome} 
            openBlogPostId={activeBlogPostId} 
            onSelectBlogPost={handleSelectPost}
            onNavigate={handleNavigate}
          />
        );

      case "shop":
        return (
          <ShopView 
            onBackToHome={handleBackToHome}
            onAddToCart={handleAddToCart}
            onOpenCheckout={handleOpenCheckout}
            cartCount={totalCartItems}
          />
        );

      case "checkout":
        return (
          <CheckoutView 
            cartItems={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onBackToHome={handleBackToHome}
          />
        );

      case "contact":
        return (
          <ContactView 
            onBackToHome={handleBackToHome}
            onNavigate={handleNavigate}
          />
        );

      case "thailand-diaries":
        return <ThailandDiariesView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "malaysia-expedition":
        return <MalaysiaExpeditionView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "amritsar-expedition":
        return <AmritsarExpeditionView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "kerala-expedition":
        return <KeralaExpeditionView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "patal-bhuvaneshwar-expedition":
        return <PatalBhuvaneshwarExpeditionView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "rishikesh-expedition":
        return <RishikeshExpeditionView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "goa-expedition":
        return <GoaExpeditionView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "vietnam-expedition":
        return <VietnamExpeditionView onBackToHome={handleBackToHome} onOpenBlog={handleSelectPost} />;

      case "mulki-expedition":
        return (
          <ExploringSoonView 
            locationName="Mulki Expedition"
            subtitle="Karnataka Surfing Haven"
            bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
            category="India Expeditions"
            expectedDate="Late 2026"
            onBackToHome={handleBackToHome}
          />
        );

      case "andaman-expedition":
        return (
          <ExploringSoonView 
            locationName="Andaman Islands"
            subtitle="Emerald Archipelago"
            bgImage="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80"
            category="India Expeditions"
            expectedDate="Early 2027"
            onBackToHome={handleBackToHome}
          />
        );

      case "philippines-expedition":
        return (
          <ExploringSoonView 
            locationName="Philippines Expedition"
            subtitle="Tropical Archipelagos"
            bgImage="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80"
            category="International Expeditions"
            expectedDate="Mid 2027"
            onBackToHome={handleBackToHome}
          />
        );

      case "nepal-expedition":
        return (
          <ExploringSoonView 
            locationName="Nepal Heights"
            subtitle="Himalayan Sanctuary"
            bgImage="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
            category="International Expeditions"
            expectedDate="Autumn 2026"
            onBackToHome={handleBackToHome}
          />
        );

      case "bio":
        return <BioView onBackToHome={handleBackToHome} />;

      case "privacy-policy":
        return <PolicyPageView policyType="privacy-policy" onNavigate={handleNavigate} />;

      case "terms-of-use":
        return <PolicyPageView policyType="terms-of-use" onNavigate={handleNavigate} />;

      case "disclaimer":
        return <PolicyPageView policyType="disclaimer" onNavigate={handleNavigate} />;

      case "shipping-policy":
        return <PolicyPageView policyType="shipping-policy" onNavigate={handleNavigate} />;

      case "return-policy":
        return <PolicyPageView policyType="return-policy" onNavigate={handleNavigate} />;

      default:
        return (
          <CheckoutView 
            cartItems={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onBackToHome={handleBackToHome}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-black">
      <Header 
        currentView={view} 
        onNavigate={handleNavigate} 
        onSelectPost={handleSelectPost} 
        totalCartItems={totalCartItems}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main>
        <Suspense fallback={<ViewLoadingFallback />}>
          {renderCurrentView()}
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-zinc-950 border border-accent/40 text-white px-5 py-4 rounded-sm shadow-2xl flex items-center gap-3 max-w-sm font-sans"
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-xs uppercase tracking-widest font-ui font-semibold">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
