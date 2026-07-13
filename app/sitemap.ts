import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lensandlatitude.com";

  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/blog",
    "/blog/amritsar-grace-guide",
    "/blog/goa-slow-living-blueprint",
    "/blog/kerala-monsoon-expedition",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route.includes("/blog/") ? "monthly" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/blog") ? 0.8 : 0.5,
  }));
}
