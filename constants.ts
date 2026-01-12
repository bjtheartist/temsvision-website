
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
  email: 'hello@temsvision.com',
  instagram: '@TEMS.VISION',
  fullName: 'Temilade Amire Quadri',
};

// Navigation items
export const NAV_ITEMS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Hero background images
export const HERO_IMAGES = [
  '/gallery/hero-1.jpg',
  '/gallery/hero-2.jpg',
  '/gallery/hero-3.jpg',
];

export const PROJECTS: Project[] = [
  {
    id: '0',
    title: 'Urban Style',
    category: 'PORTRAITS',
    imageUrl: '/gallery/portrait-1.jpg',
    description: 'Vibrant portrait sessions capturing personality and style with vintage vibes.',
    tags: ['Portraits', 'Fashion', 'Urban'],
    problem: '',
    solution: '',
    tools: ['Sony', 'Natural Light', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '1',
    title: 'Night Soccer',
    category: 'SPORTS',
    imageUrl: '/gallery/sports-1.jpg',
    description: 'Dynamic sports photography capturing athletes in motion under the lights.',
    tags: ['Sports', 'Soccer', 'Night'],
    problem: '',
    solution: '',
    tools: ['High-Speed Photography', 'Adobe Photoshop'],
    year: '2024'
  },
  {
    id: '2',
    title: 'Maternity Sessions',
    category: 'FAMILY',
    imageUrl: '/gallery/maternity-1.jpg',
    description: 'Beautiful maternity photography celebrating new beginnings.',
    tags: ['Maternity', 'Family', 'Studio'],
    problem: '',
    solution: '',
    tools: ['Studio Lighting', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '3',
    title: 'Timeless Monochrome',
    category: 'B & W',
    imageUrl: '/gallery/bw-1.jpg',
    description: 'Classic black and white portraits emphasizing emotion and form.',
    tags: ['Black & White', 'Fine Art', 'Group'],
    problem: '',
    solution: '',
    tools: ['Black & White Processing', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '4',
    title: 'Garden Portraits',
    category: 'PORTRAITS',
    imageUrl: '/gallery/portrait-2.jpg',
    description: 'Artistic portraits with natural elements and soft lighting.',
    tags: ['Portraits', 'Nature', 'Creative'],
    problem: '',
    solution: '',
    tools: ['Natural Light', 'Adobe Photoshop'],
    year: '2024'
  },
  {
    id: '5',
    title: 'Beach Lifestyle',
    category: 'LIFESTYLE',
    imageUrl: '/gallery/lifestyle-1.jpg',
    description: 'Vibrant lifestyle photography capturing joy and confidence.',
    tags: ['Lifestyle', 'Beach', 'Summer'],
    problem: '',
    solution: '',
    tools: ['Natural Light', 'Adobe Lightroom'],
    year: '2024'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'creative',
    name: 'Creative Sessions',
    description: 'Conceptual and artistic photo sessions that push creative boundaries and bring unique visions to life.',
    imageUrl: '/gallery/portrait-1.jpg',
    features: ['Concept Development', 'Artistic Direction', 'Creative Portraits', 'Themed Shoots']
  },
  {
    id: 'editorial',
    name: 'Editorial & Fashion',
    description: 'High-end editorial and fashion photography with a refined visual style for magazines, brands, and portfolios.',
    imageUrl: '/gallery/portrait-2.jpg',
    features: ['Fashion Editorials', 'Lookbooks', 'Brand Campaigns', 'Model Portfolios']
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Comprehensive event coverage capturing authentic moments and the energy of your special occasions.',
    imageUrl: '/gallery/lifestyle-1.jpg',
    features: ['Corporate Events', 'Parties', 'Graduations', 'Celebrations']
  },
  {
    id: 'weddings',
    name: 'Weddings',
    description: 'Timeless wedding photography that tells your love story with intention and artistry.',
    imageUrl: '/gallery/maternity-1.jpg',
    features: ['Full Day Coverage', 'Engagement Sessions', 'Bridal Portraits', 'Reception Coverage']
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
  instagram: 'https://www.instagram.com/temsvision/',
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
