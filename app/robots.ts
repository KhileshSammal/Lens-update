import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/checkout/success"],
    },
    sitemap: "https://lensandlatitude.com/sitemap.xml",
  };
}
