import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lens & Latitude | Curated Expeditions",
    short_name: "LensLatitude",
    description: "Curated travel trackers, signature photography presets, and detailed travel blueprints.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090b",
    theme_color: "#fbbf24",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
