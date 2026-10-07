import { GalleryItem } from "./types";
import { VIETNAM_GALLERY } from "./vietnam";
import { THAILAND_GALLERY } from "./thailand";
import { MALAYSIA_GALLERY } from "./malaysia";
import { GOA_GALLERY } from "./goa";
import { KERALA_GALLERY } from "./kerala";
import { RISHIKESH_GALLERY } from "./rishikesh";
import { AMRITSAR_GALLERY } from "./amritsar";
import { PATAL_BHUVANESHWAR_GALLERY } from "./patal_bhuvaneshwar";

export * from "./types";
export * from "./vietnam";
export * from "./thailand";
export * from "./malaysia";
export * from "./goa";
export * from "./kerala";
export * from "./rishikesh";
export * from "./amritsar";
export * from "./patal_bhuvaneshwar";

/**
 * Filterable destination locations in The Gallery Suite
 */
export const GALLERY_LOCATIONS = [
  "Vietnam",
  "Thailand",
  "Malaysia",
  "Goa",
  "Kerala",
  "Rishikesh",
  "Amritsar",
  "Patal Bhuvaneshwar"
];

/**
 * Curated signature captures for "All Captures"
 */
export const ALL_CAPTURES_PHOTOS: GalleryItem[] = [];

/**
 * Complete set of all location gallery photographs
 */
export const ALL_GALLERY_PHOTOS: GalleryItem[] = [];

/**
 * Helper to retrieve photos grouped by trip/category
 */
export function getGalleryByTrip(tripId: string): GalleryItem[] {
  return ALL_GALLERY_PHOTOS.filter((photo) => photo.tripId === tripId);
}

/**
 * Helper to retrieve distinct categories
 */
export function getGalleryCategories(): string[] {
  return GALLERY_LOCATIONS;
}
