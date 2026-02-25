import { useEffect, useState, useCallback } from 'react';
import { client, previewClient } from '../lib/sanityClient';

// Check if we're in an iframe (visual editing mode) - must be called after mount
const isInStudioIframe = () => {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true; // If we can't access parent, we're likely in an iframe
  }
};

interface UseSanityOptions {
  params?: Record<string, unknown>;
  initialData?: unknown;
}

/**
 * Hook for fetching data from Sanity with optional live updates in visual editing mode
 */
export function useSanity<T>(query: string, options: UseSanityOptions = {}) {
  const { params, initialData } = options;
  const [data, setData] = useState<T | null>(initialData as T || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isVisualEditing, setIsVisualEditing] = useState(false);

  // Check for visual editing mode after mount
  useEffect(() => {
    setIsVisualEditing(isInStudioIframe());
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Always use previewClient when in iframe for stega encoding
      const activeClient = isInStudioIframe() ? previewClient : client;
      console.log('[useSanity] Fetching with client:', isInStudioIframe() ? 'preview' : 'regular');
      const result = await activeClient.fetch<T>(query, params);
      setData(result);
      setError(null);
    } catch (err) {
      console.error('[useSanity] Fetch error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  }, [query, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up live subscription in visual editing mode
  useEffect(() => {
    if (!isVisualEditing) return;

    console.log('[useSanity] Setting up live subscription');
    const subscription = previewClient
      .listen(query, params, { includeResult: true })
      .subscribe({
        next: (update) => {
          if (update.result) {
            setData(update.result as T);
          }
        },
        error: (err) => {
          console.error('Sanity subscription error:', err);
        },
      });

    return () => subscription.unsubscribe();
  }, [query, params, isVisualEditing]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook specifically for site settings - commonly used across components
 */
export function useSiteSettings() {
  return useSanity<{
    _id: string;
    siteName: string;
    tagline: string;
    // Hero fields
    heroTagline?: string;
    heroHeadline?: string[];
    heroDescription?: string;
    // About fields
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
  }>(`*[_type == "siteSettings"][0] {
    _id,
    siteName,
    tagline,
    heroTagline,
    heroHeadline,
    heroDescription,
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
  }`);
}

/**
 * Hook for fetching services
 */
export function useServices() {
  return useSanity<Array<{
    _id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl?: string;
    features?: string[];
  }>>(`*[_type == "service"] | order(orderRank asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    features
  }`);
}

/**
 * Hook for fetching projects
 */
export function useProjects() {
  return useSanity<Array<{
    _id: string;
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
    description?: string;
    tags?: string[];
    year?: string;
    featured?: boolean;
  }>>(`*[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    "imageUrl": mainImage.asset->url,
    description,
    tags,
    year,
    featured
  }`);
}

/**
 * Hook for fetching gallery categories
 */
export function useGalleryCategories() {
  return useSanity<Array<{
    _id: string;
    title: string;
    slug: string;
    subtitle: string;
    coverImageUrl?: string;
    photoCount: number;
    photos?: Array<{
      url: string;
      caption?: string;
      alt?: string;
    }>;
  }>>(`*[_type == "galleryCategory"] | order(orderRank asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    "coverImageUrl": coverImage.asset->url,
    photoCount,
    "photos": photos[] {
      "url": asset->url,
      caption,
      alt
    }
  }`);
}
