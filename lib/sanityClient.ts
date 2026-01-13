import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create the Sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'ul99syn2',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Fetch all gallery categories with photos
  galleryCategories: `*[_type == "galleryCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "coverImage": coverImage.asset->url,
    "photos": photos[].asset->url,
    order
  }`,

  // Fetch hero slideshow
  heroSlideshow: `*[_type == "heroSlideshow"][0] {
    "images": images[].asset->url,
    interval
  }`,

  // Fetch all services ordered by display order
  services: `*[_type == "service"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    features
  }`,

  // Fetch about section
  about: `*[_type == "about"][0] {
    headline,
    bio,
    "imageUrl": profileImage.asset->url,
    stats
  }`,

  // Fetch site settings
  siteSettings: `*[_type == "siteSettings"][0] {
    siteName,
    tagline,
    heroTitle,
    heroSubtitle,
    email,
    location,
    instagram,
    socialLinks,
    "logoUrl": logo.asset->url,
    "preloaderUrl": preloaderAnimation.asset->url
  }`,
};

// Type definitions for Sanity data
export interface SanityGalleryCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage: string;
  photos: string[];
  order?: number;
}

export interface SanityHeroSlideshow {
  images: string[];
  interval?: number;
}

export interface SanityService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  features?: string[];
}

export interface SanityAbout {
  headline?: string;
  bio?: string;
  imageUrl?: string;
  stats?: Array<{ label: string; value: string }>;
}

export interface SanitySiteSettings {
  siteName: string;
  tagline: string;
  heroTitle?: string[];
  heroSubtitle?: string;
  email: string;
  location: string;
  instagram?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    pinterest?: string;
  };
  logoUrl?: string;
  preloaderUrl?: string;
}
