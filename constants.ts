
import { Project, Service } from './types';

// Blue color palette from TemsVision logo
export const COLORS = {
  primary: {
    darkNavy: '#1e3a5f',
    blue: '#3b82f6',
    cyan: '#22d3ee',
    skyBlue: '#7dd3fc',
    lightCyan: '#a5f3fc',
  },
  // For Tailwind classes
  accent: 'blue', // Use blue-400, blue-500, etc.
};

export const SITE_CONFIG = {
  name: 'TemsVision',
  tagline: 'PHOTOGRAPHER, CREATIVE DIRECTOR & VISUAL STORYTELLER',
  location: 'Atlanta, Georgia',
  email: 'Temsvision@gmail.com',
  phone: '(269) 808-7209',
  instagram: '@tems.vision',
  fullName: 'Temilade Amire Quadri',
};

// Navigation items
export const NAV_ITEMS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Hero background images (best standout shots)
export const HERO_IMAGES = [
  '/gallery/hero-1.jpg',
  '/gallery/hero-2.jpg',
  '/gallery/hero-3.jpg',
];

// Helper to generate image paths
const generateImagePaths = (category: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/gallery/${category}-${String(i + 1).padStart(2, '0')}.jpg`);

// Gallery image counts by category
const GALLERY_COUNTS = {
  portraits: 46,
  sports: 14,
  lifestyle: 9,
  fashion: 9,
  maternity: 6,
} as const;

// All gallery images organized by category
export const GALLERY_IMAGES: Record<string, string[]> = Object.fromEntries(
  Object.entries(GALLERY_COUNTS).map(([category, count]) => [
    category,
    generateImagePaths(category === 'portraits' ? 'portrait' : category, count)
  ])
);

// Category metadata for project generation
const CATEGORY_META: Record<string, { description: string; tags: string[]; tools: string[] }> = {
  portraits: {
    description: 'Creative portrait photography capturing personality and emotion.',
    tags: ['Portraits', 'Creative'],
    tools: ['Sony', 'Natural Light', 'Adobe Lightroom'],
  },
  sports: {
    description: 'Custom jersey photography showcasing style and team spirit.',
    tags: ['Jerseys', 'Sports'],
    tools: ['Studio Lighting', 'Adobe Lightroom'],
  },
  lifestyle: {
    description: 'Vibrant lifestyle photography capturing authentic moments.',
    tags: ['Lifestyle', 'Candid'],
    tools: ['Natural Light', 'Adobe Lightroom'],
  },
  fashion: {
    description: 'High-end editorial and fashion photography with refined style.',
    tags: ['Fashion', 'Editorial'],
    tools: ['Studio Lighting', 'Adobe Photoshop'],
  },
  maternity: {
    description: 'Beautiful maternity photography celebrating new beginnings.',
    tags: ['Maternity', 'Family'],
    tools: ['Studio Lighting', 'Adobe Lightroom'],
  },
};

// Generate projects from gallery images
export const PROJECTS: Project[] = Object.entries(GALLERY_IMAGES).flatMap(([category, urls]) =>
  urls.map((url, i) => ({
    id: `${category}-${i}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${i + 1}`,
    category: category.toUpperCase(),
    imageUrl: url,
    description: CATEGORY_META[category].description,
    tags: CATEGORY_META[category].tags,
    problem: '',
    solution: '',
    tools: CATEGORY_META[category].tools,
    year: '2024',
  }))
);

export const SERVICES: Service[] = [
  {
    id: 'creative',
    name: 'Creative Sessions',
    description: 'Conceptual and artistic photo sessions that push creative boundaries and bring unique visions to life.',
    imageUrl: '/gallery/portrait-01.jpg',
    features: ['Concept Development', 'Artistic Direction', 'Creative Portraits', 'Themed Shoots']
  },
  {
    id: 'editorial',
    name: 'Editorial & Fashion',
    description: 'High-end editorial and fashion photography with a refined visual style for magazines, brands, and portfolios.',
    imageUrl: '/gallery/fashion-01.jpg',
    features: ['Fashion Editorials', 'Lookbooks', 'Brand Campaigns', 'Model Portfolios']
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Professional event photography capturing celebrations, gatherings, and special occasions.',
    imageUrl: '/gallery/lifestyle-01.jpg',
    features: ['Corporate Events', 'Parties', 'Graduations', 'Special Occasions']
  },
  {
    id: 'weddings',
    name: 'Weddings',
    description: 'Elegant wedding photography capturing your love story from ceremony to reception.',
    imageUrl: '/gallery/lifestyle-02.jpg',
    features: ['Wedding Day Coverage', 'Engagement Sessions', 'Bridal Portraits', 'Reception Photography']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Authentic lifestyle photography capturing genuine moments and personal stories.',
    imageUrl: '/gallery/lifestyle-01.jpg',
    features: ['Personal Branding', 'Candid Sessions', 'Location Shoots', 'Story-driven']
  },
  {
    id: 'maternity',
    name: 'Maternity & Family',
    description: 'Beautiful maternity and family photography celebrating life milestones and connections.',
    imageUrl: '/gallery/maternity-01.jpg',
    features: ['Maternity Sessions', 'Family Portraits', 'Newborn Photography', 'Milestone Photos']
  }
];

export const SKILLS = [
  'Creative Sessions',
  'Editorial Photography',
  'Fashion Photography',
  'Event Photography',
  'Wedding Photography',
  'Adobe Lightroom',
  'Adobe Photoshop',
  'Natural Light',
  'Studio Lighting',
  'Visual Storytelling'
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/temilade-quadri-bbb980a8/',
  github: '',
  instagram: 'https://www.instagram.com/tems.vision',
  facebook: 'https://www.facebook.com/temsvision',
  pinterest: 'https://www.pinterest.com/homefeed/'
};

export const ABOUT_BIO = {
  intro: "Hi, I'm Temilade Amire Quadri, a Nigerian-American photographer based in Atlanta, Georgia.",
  background: "My multicultural background shapes my approach to photography, allowing me to create work that is intentional, expressive, and story-driven.",
  story: "I began my photography journey during the COVID-19 lockdown in Michigan, and what started as a creative outlet has since evolved into TemsVision. The name comes from my own name—Temilade, a Yoruba name meaning \"the crown is mine,\" and Temi, meaning \"mine.\" TemsVision represents my vision, grounded in purpose and creativity.",
  philosophy: "I specialize in creative sessions, editorial and fashion photography, events, and weddings, focusing on capturing authentic moments while elevating them through a refined visual style. I believe strong ideas deserve thoughtful execution, and I enjoy collaborating with clients to bring concepts, emotions, and stories to life.",
  approach: "Photography is an ever-evolving craft, and I approach each project with professionalism, curiosity, and a willingness to push creative boundaries. If you have a vision, let's turn it into something memorable.",
  nameMeaning: {
    temilade: "The crown is mine",
    temi: "Mine",
    temsvision: "My Vision"
  }
};
