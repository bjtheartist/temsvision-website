import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create the Sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for faster reads
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Fetch all projects ordered by display order
  projects: `*[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    "imageUrl": mainImage.asset->url,
    description,
    tags,
    year,
    featured
  }`,

  // Fetch featured projects for marquee
  featuredProjects: `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    "imageUrl": mainImage.asset->url,
    category
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
export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  description?: string;
  tags?: string[];
  year?: string;
  featured?: boolean;
}

export interface SanityService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  features?: string[];
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
