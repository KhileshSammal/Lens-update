import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lensandlattitude.in";

  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/blog",
    "/blog/vietnam-secrets-2025",
    "/blog/phuket-expedition-guide",
    "/blog/solo-asia-packing",
    "/blog/camera-gear-2025",
    "/blog/patal-bhuvneswar-cave-secrets",
    "/blog/slow-travel-philosophy",
    "/blog/malaysia-expedition-2025",
    "/blog/amritsar-grace-2025",
    "/blog/kerala-backwaters-2025",
    "/blog/goa-vibrance-2025",
    "/blog/nainital-heights-2025",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route.includes("/blog/") ? "monthly" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/blog") ? 0.8 : 0.5,
  }));
}
