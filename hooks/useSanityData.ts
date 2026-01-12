import { useState, useEffect } from 'react';
import { client, queries } from '../lib/sanityClient';
import type { SanityProject, SanityService, SanitySiteSettings } from '../lib/sanityClient';
import { PROJECTS, SERVICES, SITE_CONFIG, SOCIAL_LINKS } from '../constants';

// Check if Sanity is configured
const isSanityConfigured = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);

/**
 * Hook to fetch projects from Sanity CMS
 * Falls back to constants if Sanity is not configured or fetch fails
 */
export function useProjects() {
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) {
      // Use fallback data from constants
      const fallbackProjects = PROJECTS.map((p) => ({
        _id: p.id,
        title: p.title,
        slug: p.id,
        category: p.category,
        imageUrl: p.imageUrl,
        description: p.description,
        tags: p.tags,
      }));
      setProjects(fallbackProjects);
      setLoading(false);
      return;
    }

    async function fetchProjects() {
      try {
        const data = await client.fetch<SanityProject[]>(queries.projects);
        setProjects(data);
      } catch (err) {
        console.warn('Failed to fetch from Sanity, using fallback data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch'));
        // Fallback to constants
        const fallbackProjects = PROJECTS.map((p) => ({
          _id: p.id,
          title: p.title,
          slug: p.id,
          category: p.category,
          imageUrl: p.imageUrl,
          description: p.description,
          tags: p.tags,
        }));
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
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
    if (!isSanityConfigured) {
      // Use fallback data from constants
      const fallbackServices = SERVICES.map((s) => ({
        _id: s.id,
        name: s.name,
        slug: s.id,
        description: s.description,
        features: s.features,
      }));
      setServices(fallbackServices);
      setLoading(false);
      return;
    }

    async function fetchServices() {
      try {
        const data = await client.fetch<SanityService[]>(queries.services);
        setServices(data);
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
    if (!isSanityConfigured) {
      // Use fallback data from constants
      setSettings({
        siteName: SITE_CONFIG.siteName,
        tagline: SITE_CONFIG.tagline,
        email: SITE_CONFIG.email,
        location: SITE_CONFIG.location,
        socialLinks: SOCIAL_LINKS,
      });
      setLoading(false);
      return;
    }

    async function fetchSettings() {
      try {
        const data = await client.fetch<SanitySiteSettings>(queries.siteSettings);
        setSettings(data);
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
