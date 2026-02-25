import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Configuration
export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'ul99syn2',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
};

// Detect if we're in the Sanity Studio iframe (visual editing mode)
export const isVisualEditingEnabled = () => {
  if (typeof window === 'undefined') return false;
  // Check if we're in an iframe (Sanity Studio Presentation tool)
  return window.self !== window.top;
};

// Studio URL for visual editing links
const studioUrl = 'http://localhost:3333';

// Create the Sanity client - with stega for visual editing
export const client = createClient({
  ...sanityConfig,
  useCdn: !isVisualEditingEnabled(), // Disable CDN in preview mode
  stega: {
    enabled: isVisualEditingEnabled(),
    studioUrl,
  },
});

// Create a preview client (always has stega enabled for testing)
export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  perspective: 'drafts', // See draft content in preview
  stega: {
    enabled: true,
    studioUrl,
  },
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Fetch site settings (includes About section content)
  siteSettings: `*[_type == "siteSettings"][0] {
    _id,
    siteName,
    tagline,
    fullName,
    bioIntro,
    bioBackground,
    bioStory,
    bioPhilosophy,
    bioApproach,
    email,
    phone,
    location,
    socialLinks {
      instagram,
      facebook,
      linkedin,
      pinterest
    },
    "logoUrl": logo.asset->url,
    "headshotUrl": headshot.asset->url
  }`,

  // Fetch all services ordered by display order
  services: `*[_type == "service"] | order(orderRank asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    features
  }`,

  // Fetch all projects ordered by display order
  projects: `*[_type == "project"] | order(order asc, _createdAt desc) {
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
    "slug": slug.current,
    category,
    "imageUrl": mainImage.asset->url
  }`,
};

// Type definitions for Sanity data
export interface SanitySiteSettings {
  _id: string;
  siteName: string;
  tagline: string;
  fullName: string;
  bioIntro: string;
  bioBackground: string;
  bioStory?: string;
  bioPhilosophy?: string;
  bioApproach?: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    pinterest?: string;
  };
  logoUrl?: string;
  headshotUrl?: string;
}

export interface SanityService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  features?: string[];
  order?: number;
}

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

// Helper to fetch data with proper client
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  const activeClient = isVisualEditingEnabled() ? previewClient : client;
  return activeClient.fetch<T>(query, params);
}
