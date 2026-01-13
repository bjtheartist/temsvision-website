import { useState, useEffect } from 'react';
import { client, queries } from '../lib/sanityClient';
import type {
  SanityGalleryCategory,
  SanityHeroSlideshow,
  SanityService,
  SanitySiteSettings,
} from '../lib/sanityClient';
import { SERVICES, SITE_CONFIG, SOCIAL_LINKS, GALLERY_IMAGES, HERO_IMAGES } from '../constants';
import { CATEGORIES } from '../components/Portfolio';

/**
 * Hook to fetch gallery categories from Sanity CMS
 * Falls back to constants if Sanity is not configured or fetch fails
 */
export function useGalleryCategories() {
  const [categories, setCategories] = useState<SanityGalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch<SanityGalleryCategory[]>(queries.galleryCategories);

        // If Sanity has data, use it
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          // Fallback to constants
          const fallbackCategories = CATEGORIES.map((cat) => ({
            _id: cat.id,
            title: cat.title,
            slug: cat.id,
            description: cat.description,
            coverImage: cat.coverImage,
            photos: GALLERY_IMAGES[cat.id] || [],
          }));
          setCategories(fallbackCategories);
        }
      } catch (err) {
        console.warn('Failed to fetch gallery from Sanity, using fallback data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch'));
        // Fallback to constants
        const fallbackCategories = CATEGORIES.map((cat) => ({
          _id: cat.id,
          title: cat.title,
          slug: cat.id,
          description: cat.description,
          coverImage: cat.coverImage,
          photos: GALLERY_IMAGES[cat.id] || [],
        }));
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

/**
 * Hook to fetch hero slideshow from Sanity CMS
 * Falls back to constants if Sanity is not configured or fetch fails
 */
export function useHeroSlideshow() {
  const [slideshow, setSlideshow] = useState<SanityHeroSlideshow>({
    images: HERO_IMAGES,
    interval: 5,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSlideshow() {
      try {
        const data = await client.fetch<SanityHeroSlideshow>(queries.heroSlideshow);

        // If Sanity has data, use it
        if (data && data.images && data.images.length > 0) {
          setSlideshow(data);
        }
        // Otherwise keep the default fallback
      } catch (err) {
        console.warn('Failed to fetch hero slideshow from Sanity, using fallback:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch'));
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    }

    fetchSlideshow();
  }, []);

  return { slideshow, loading, error };
}

/**
 * Hook to fetch services from Sanity CMS
 * Falls back to constants if Sanity is not configured or fetch fails
 */
export function useServices() {
  const [services, setServices] = useState<SanityService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await client.fetch<SanityService[]>(queries.services);

        if (data && data.length > 0) {
          setServices(data);
        } else {
          // Use fallback data from constants
          const fallbackServices = SERVICES.map((s) => ({
            _id: s.id,
            name: s.name,
            slug: s.id,
            description: s.description,
            features: s.features,
          }));
          setServices(fallbackServices);
        }
      } catch (err) {
        console.warn('Failed to fetch from Sanity, using fallback data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch'));
        // Fallback to constants
        const fallbackServices = SERVICES.map((s) => ({
          _id: s.id,
          name: s.name,
          slug: s.id,
          description: s.description,
          features: s.features,
        }));
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}

/**
 * Hook to fetch site settings from Sanity CMS
 * Falls back to constants if Sanity is not configured or fetch fails
 */
export function useSiteSettings() {
  const [settings, setSettings] = useState<SanitySiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await client.fetch<SanitySiteSettings>(queries.siteSettings);

        if (data) {
          setSettings(data);
        } else {
          // Fallback to constants
          setSettings({
            siteName: SITE_CONFIG.siteName,
            tagline: SITE_CONFIG.tagline,
            email: SITE_CONFIG.email,
            location: SITE_CONFIG.location,
            socialLinks: SOCIAL_LINKS,
          });
        }
      } catch (err) {
        console.warn('Failed to fetch from Sanity, using fallback data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch'));
        // Fallback to constants
        setSettings({
          siteName: SITE_CONFIG.siteName,
          tagline: SITE_CONFIG.tagline,
          email: SITE_CONFIG.email,
          location: SITE_CONFIG.location,
          socialLinks: SOCIAL_LINKS,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}
