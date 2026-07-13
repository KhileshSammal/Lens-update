import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";

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
 * and mounts the dynamic Vite asset-compilation pipeline during development.
 */
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to automatically parse incoming application/json payloads
  app.use(express.json());

  // ==========================================================================
  // SECURE API ENDPOINTS
  // ==========================================================================
  
  /**
   * POST /api/checkout
   * Creates a secure, hosted Stripe checkout session for shopping cart checkouts.
   * Leverages server-side secret credentials to securely map pricing, quantities,
   * and product visual cards without exposing secret keys to client browsers.
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
            unit_amount: item.price * 100, // Converts amount to paise (Stripe expects standard smallest currency unit)
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        // Direct return flows back to the SPA after successful processing or cancellation
        success_url: `${process.env.APP_URL || "http://localhost:3000"}/?success=true`,
        cancel_url: `${process.env.APP_URL || "http://localhost:3000"}/?canceled=true`,
      });

      // Deliver the secure session checkout redirect url to the client
      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe Checkout Session Creation Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================================================================
  // ASSET HANDLING & ENGINE MIDDLEWARES
  // ==========================================================================
  if (process.env.NODE_ENV !== "production") {
    // In development mode, spin up the active Vite Dev Server and attach as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, statically serve compiled bundle directories (dist)
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html SPA entry shell for any wildcard navigation parameters
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind the listener to port 3000 and standard 0.0.0.0 interface for secure container deployment
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
