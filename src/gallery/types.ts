export type MediaType = "image" | "video" | "gif";

export interface GalleryItem {
  id: string;
  tripId: string;       // Trip destination identifier (e.g., "vietnam")
  tripTitle: string;    // Display title of destination (e.g., "Vietnam")
  category: string;     // Grouped filter category (e.g., "Vietnam")
  location: string;     // Precise geographic location for captions & SEO
  title: string;        // Visual title of the media piece
  aspect: string;       // Tailwind aspect ratio class (e.g., "aspect-[3/4]")
  url: string;          // Direct media path or URL
  fallbackUrl?: string; // High-availability CDN fallback URL
  thumbnailUrl?: string;// Optional thumbnail for videos
  alt: string;          // Descriptive and accessible alt text for search engine optimization
  camera?: string;      // Camera body & lens used
  settings?: string;    // Photographic exposure metadata
  coords?: string;      // GPS coordinates / Geolocation
  type?: MediaType;     // Media type: "image", "video", or "gif"
  caption?: string;     // Contextual photo caption / story
  seoDescription?: string; // Rich SEO description
  tags?: string[];      // Categorization tags for indexing
  dateCaptured?: string;// Capture timeline
}

export interface GalleryDestinationConfig {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  photos: GalleryItem[];
}
