import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";
import { injectSeoTagsIntoHtml } from "./src/utils/routerSeo";

// Load local environment variables from .env file
dotenv.config();

// ES module environment helpers to derive directory names in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Stripe Client using local secret key
// Checks environment variable safely and provides an empty string fallback to prevent crash during startup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

/**
 * Boots the unified full-stack application server.
 * Mounts standard security and body-parser middleware, implements secure checkout APIs,
 * serves robots.txt and sitemap.xml with proper content-type headers,
 * and dynamically injects SSR-level SEO metadata (canonical, title, OpenGraph, JSON-LD) into index.html for search engine indexation.
 */
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to automatically parse incoming application/json and urlencoded payloads
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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

    // Static assets (exclude automatic index.html serving so our dynamic SEO handler runs for all routes)
    app.use(express.static(distPath, { index: false }));

    // Serve dynamically SEO-injected HTML for all browser and search engine requests
    app.get("*", (req, res) => {
      try {
        if (fs.existsSync(indexHtmlPath)) {
          const rawHtml = fs.readFileSync(indexHtmlPath, "utf-8");
          const renderedHtml = injectSeoTagsIntoHtml(rawHtml, req.path);
          res.status(200).set({
            "Content-Type": "text/html",
            "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          }).send(renderedHtml);
        } else {
          res.status(404).send("Application build not found.");
        }
      } catch (error) {
        console.error("Error serving page with SEO injection:", error);
        res.status(200).set({
          "Content-Type": "text/html",
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
