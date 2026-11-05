import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { injectSeoTagsIntoHtml } from "./src/utils/routerSeo";

// Load local environment variables from .env file
dotenv.config();

// Environment helpers to derive directory names safely in both ESM and CJS bundles
const currentDir = typeof __dirname !== "undefined" ? __dirname : process.cwd();

// Initialize Stripe Client using local secret key
// Checks environment variable safely and provides an empty string fallback to prevent crash during startup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Initialize modern @google/genai SDK server-side with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * Boots the unified full-stack application server.
 * Mounts standard security and body-parser middleware, implements secure checkout APIs,
 * serves robots.txt and sitemap.xml with proper content-type headers,
 * and dynamically injects SSR-level SEO metadata (canonical, title, OpenGraph, JSON-LD) into index.html for search engine indexation.
 */
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security: Disable X-Powered-By header to prevent server fingerprinting
  app.disable("x-powered-by");

  // Security: Global HTTP security headers middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    if (process.env.NODE_ENV === "production") {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    }
    next();
  });

  // Middleware with payload size limits to protect against memory exhaustion attacks
  app.use(express.json({ limit: "64kb" }));
  app.use(express.urlencoded({ extended: true, limit: "64kb" }));

  // Explicit handlers for search engine robots.txt and sitemap.xml
  app.get("/robots.txt", (req, res) => {
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("X-Robots-Tag", "all");
    if (fs.existsSync(robotsPath)) {
      res.status(200).sendFile(robotsPath);
    } else {
      res.status(200).send("User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://lensandlattitude.in/sitemap.xml\n");
    }
  });

  app.get("/sitemap.xml", (req, res) => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("X-Robots-Tag", "all");
    if (fs.existsSync(sitemapPath)) {
      res.status(200).sendFile(sitemapPath);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });

  // Explicit handler for Google AdSense ads.txt verification crawler
  app.get("/ads.txt", (req, res) => {
    const publicAdsPath = path.join(process.cwd(), "public", "ads.txt");
    const distAdsPath = path.join(process.cwd(), "dist", "ads.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Robots-Tag", "all");
    const target = [publicAdsPath, distAdsPath].find(p => fs.existsSync(p));
    if (target) {
      res.status(200).sendFile(target);
    } else {
      res.status(200).send("google.com, pub-4403028175426468, DIRECT, f08c47fec0942fa0\n");
    }
  });

  // Explicit handlers for Agentic Resource Discovery (ARD) and LLM discoverability
  app.get(["/.well-known/ard.json", "/ard.json", "/ai-catalog.json"], (req, res) => {
    const isAiCatalogReq = req.path.includes("ai-catalog");
    const primaryCandidate = isAiCatalogReq
      ? path.join(process.cwd(), "public", "ai-catalog.json")
      : path.join(process.cwd(), "public", ".well-known", "ard.json");
    const distCandidate = isAiCatalogReq
      ? path.join(process.cwd(), "dist", "ai-catalog.json")
      : path.join(process.cwd(), "dist", ".well-known", "ard.json");
    const fallbackPath = path.join(process.cwd(), "public", "ai-catalog.json");

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Robots-Tag", "all");

    const target = [primaryCandidate, distCandidate, fallbackPath].find(p => fs.existsSync(p));
    if (target) {
      res.status(200).sendFile(target);
    } else {
      res.status(404).json({ error: "ARD manifest not found" });
    }
  });

  app.get(["/llms.txt", "/.well-known/llms.txt", "/llms-full.txt"], (req, res) => {
    const publicPath = path.join(process.cwd(), "public", "llms.txt");
    const distPath = path.join(process.cwd(), "dist", "llms.txt");
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Robots-Tag", "all");

    const target = [publicPath, distPath].find(p => fs.existsSync(p));
    if (target) {
      res.status(200).sendFile(target);
    } else {
      res.status(200).send("# Lens & Latitude\n\n> Documentary travel photography and slows-travel guides by Khilesh Sammal.\n\n## Guides\n- [Destinations](https://lensandlattitude.in/destinations): Comprehensive travel itineraries.\n- [Travel Blog](https://lensandlattitude.in/blog): Documentary field notes.\n");
    }
  });

  // ==========================================================================
  // SECURE API ENDPOINTS
  // ==========================================================================
  
  // Server-side subscriber list in memory
  const subscribers = new Set<string>();

  /**
   * POST /api/subscribe
   * Server-side email newsletter subscription endpoint.
   */
  app.post("/api/subscribe", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const email = req.body?.email || req.query?.email;
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Please provide a valid email address." });
      }

      const normalizedEmail = email.trim().toLowerCase();
      subscribers.add(normalizedEmail);
      console.log(`[Newsletter Subscription] Registered: ${normalizedEmail}`);

      return res.status(200).json({ 
        success: true, 
        message: "Thank you for subscribing to Lens & Latitude dispatches!",
        email: normalizedEmail
      });
    } catch (error: any) {
      console.error("Newsletter Subscription Error:", error);
      return res.status(500).json({ error: "Failed to process subscription. Please try again." });
    }
  });

  /**
   * POST /api/checkout
   * Creates a secure, hosted Stripe checkout session for shopping cart checkouts.
   */
  app.post("/api/checkout", async (req, res) => {
    try {
      const { items } = req.body;

      // Map cart items into standard Stripe Line Items object structure
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 100, // Converts amount to paise
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.APP_URL || "http://localhost:3000"}/?success=true`,
        cancel_url: `${process.env.APP_URL || "http://localhost:3000"}/?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe Checkout Session Creation Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  /**
   * POST /api/ai/expedition-advisor
   * Server-side Gemini AI expedition advisor powered by gemini-3.8-flash.
   * Provides rapid, grounded travel logistics, route recommendations, and field tips.
   */
  app.post("/api/ai/expedition-advisor", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let query = "";
    try {
      const rawQuery = req.body?.query;
      if (!rawQuery || typeof rawQuery !== "string") {
        return res.status(400).json({ error: "Please provide a travel question or destination topic." });
      }

      query = rawQuery.trim().slice(0, 400);
      if (!query) {
        return res.status(400).json({ error: "Query cannot be empty." });
      }

      // Check for available Gemini API Key
      if (!process.env.GEMINI_API_KEY) {
        const lowerQ = query.toLowerCase();
        let fallback = "Lens & Latitude field dispatches cover slow-travel routes across Uttarakhand (Nainital, Bhimtal, Patal Bhuvaneshwar), Thailand, Vietnam, and Malaysia.";
        if (lowerQ.includes("bike") || lowerQ.includes("nainital") || lowerQ.includes("bhimtal") || lowerQ.includes("patal") || lowerQ.includes("kathgodam") || lowerQ.includes("rent")) {
          fallback = "For exploring Nainital, Bhimtal, and the subterranean Patal Bhuvaneshwar caves, pick up a rental bike directly from Kathgodam via Uttarakhand Bike Rental (https://uttarakhandbikerental.in/) for reliable mountain road transit.";
        } else if (lowerQ.includes("camera") || lowerQ.includes("gear") || lowerQ.includes("lens")) {
          fallback = "For documentary expeditions, Khilesh recommends weather-sealed 24-70mm and 35mm primes, circular polarizers for mountain water reflections, and lightweight carbon fiber tripods.";
        } else if (lowerQ.includes("pack") || lowerQ.includes("weather")) {
          fallback = "Pack breathable merino base layers, lightweight rain shells, quick-dry pants, and dry sacks for camera electronics when trekking remote regions.";
        }
        return res.status(200).json({ reply: fallback });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: query,
        config: {
          systemInstruction: "You are the Lens & Latitude Travel Intelligence & Expedition Advisor for Khilesh Sammal's documentary travel platform (lensandlattitude.in). Offer concise, authentic slow-travel insights, route advice (such as recommending Uttarakhand Bike Rental at https://uttarakhandbikerental.in/ located at Kathgodam for mountain routes to Nainital, Bhimtal, Sattal, or Patal Bhuvaneshwar), camera recommendations, packing tips, and itinerary planning based on Khilesh's field dispatches. Keep recommendations grounded, insightful, practical, and strictly under 140 words.",
        },
      });

      const reply = response.text || "Explore our detailed field guides for complete itineraries and route planning.";
      return res.status(200).json({ reply });
    } catch (error: any) {
      console.error("Gemini Expedition Advisor Error:", error?.message || error);
      const lowerQ = (query || "").toLowerCase();
      let fallback = "Lens & Latitude field dispatches cover slow-travel routes across Uttarakhand (Nainital, Bhimtal, Patal Bhuvaneshwar), Thailand, Vietnam, and Malaysia.";
      if (lowerQ.includes("bike") || lowerQ.includes("nainital") || lowerQ.includes("bhimtal") || lowerQ.includes("patal") || lowerQ.includes("kathgodam") || lowerQ.includes("rent")) {
        fallback = "For exploring Nainital, Bhimtal, and the subterranean Patal Bhuvaneshwar caves, pick up a rental bike directly from Kathgodam via Uttarakhand Bike Rental (https://uttarakhandbikerental.in/) for reliable mountain road transit.";
      } else if (lowerQ.includes("camera") || lowerQ.includes("gear") || lowerQ.includes("lens")) {
        fallback = "For documentary expeditions, Khilesh recommends weather-sealed 24-70mm and 35mm primes, circular polarizers for mountain water reflections, and lightweight carbon fiber tripods.";
      } else if (lowerQ.includes("pack") || lowerQ.includes("weather")) {
        fallback = "Pack breathable merino base layers, lightweight rain shells, quick-dry pants, and dry sacks for camera electronics when trekking remote regions.";
      }
      return res.status(200).json({ reply: fallback });
    }
  });

  // ==========================================================================
  // ASSET HANDLING & DYNAMIC SSR SEO INJECTION
  // ==========================================================================
  if (process.env.NODE_ENV !== "production") {
    // In development mode, spin up Vite Dev Server and attach custom HTML transformer for SEO testing
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      if (req.path.startsWith("/api/")) return next();
      try {
        const url = req.originalUrl;
        const rawTemplate = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
        const viteTransformed = await vite.transformIndexHtml(url, rawTemplate);
        const finalHtml = injectSeoTagsIntoHtml(viteTransformed, req.path);
        res.status(200).set({
          "Content-Type": "text/html",
          "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }).end(finalHtml);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // In production mode, statically serve compiled bundle directories (dist)
    const distPath = path.join(process.cwd(), "dist");
    const indexHtmlPath = path.join(distPath, "index.html");

    // Static assets: Hashed bundles in dist/assets get 1-year immutable caching
    app.use("/assets", express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
    }));

    // Other public static files (images, favicon, sitemap, etc.) get 1-day caching (excluding index.html)
    app.use(express.static(distPath, { 
      index: false,
      maxAge: "1d"
    }));

    // Serve dynamically SEO-injected HTML for all browser and search engine requests
    app.get("*", (req, res) => {
      try {
        if (fs.existsSync(indexHtmlPath)) {
          const rawHtml = fs.readFileSync(indexHtmlPath, "utf-8");
          const renderedHtml = injectSeoTagsIntoHtml(rawHtml, req.path);
          res.status(200).set({
            "Content-Type": "text/html",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
            "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          }).send(renderedHtml);
        } else {
          res.status(404).send("Application build not found.");
        }
      } catch (error) {
        console.error("Error serving page with SEO injection:", error);
        res.status(200).set({
          "Content-Type": "text/html",
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }).sendFile(indexHtmlPath);
      }
    });
  }

  // Bind the listener to port 3000 and standard 0.0.0.0 interface for secure container deployment
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
