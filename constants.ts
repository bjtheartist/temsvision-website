
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
  location: 'Kalamazoo, Michigan',
  email: 'hello@temsvision.com',
  instagram: '@TEMS.VISION',
  fullName: 'Temilade Amire Quadri',
};

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
    id: 'portraits',
    name: 'Portrait Sessions',
    description: 'Individual and group portrait sessions that capture your unique personality and style. From headshots to creative concepts.',
    imageUrl: '/gallery/portrait-1.jpg',
    features: ['Individual Portraits', 'Group Sessions', 'Headshots', 'Creative Concepts', 'Golden Hour']
  },
  {
    id: 'sports',
    name: 'Sports Photography',
    description: 'Dynamic action shots that freeze the intensity and emotion of athletic performance.',
    imageUrl: '/gallery/sports-1.jpg',
    features: ['Action Shots', 'Team Photos', 'Athletic Portraits', 'Event Coverage']
  },
  {
    id: 'maternity',
    name: 'Maternity & Family',
    description: 'Beautiful maternity sessions and family portraits celebrating life\'s precious moments.',
    imageUrl: '/gallery/maternity-1.jpg',
    features: ['Maternity Sessions', 'Family Portraits', 'Newborn Photos', 'Milestone Sessions']
  },
  {
    id: 'events',
    name: 'Events & Special Occasions',
    description: 'Birthday parties, graduations, family gatherings, and milestone celebrations captured beautifully.',
    imageUrl: '/gallery/lifestyle-1.jpg',
    features: ['Birthday Sessions', 'Graduation Photos', 'Family Sessions', 'Boudoir']
  }
];

export const SKILLS = [
  'Portrait Photography',
  'Sports Photography',
  'Maternity Photography',
  'Event Photography',
  'Adobe Lightroom',
  'Adobe Photoshop',
  'Natural Light',
  'Studio Lighting',
  'Film Emulation',
  'Black & White',
  'Golden Hour',
  'Action Shots'
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/temilade-quadri-bbb980a8/',
  github: '',
  instagram: 'https://www.instagram.com/temsvision/',
  facebook: 'https://www.facebook.com/temsvision',
  pinterest: 'https://www.pinterest.com/homefeed/'
};

export const ABOUT_BIO = {
  intro: "My name is Temilade Amire Quadri, and I am a professional photographer.",
  background: "I was born in New Jersey, raised in Nigeria, and currently live in Kalamazoo, Michigan. I started TemsVision during the 2020 Covid lockdown as a creative outlet, and it has since grown into a full-fledged business.",
  story: "The name TemsVision is a fusion of my Yoruba name and my passion. My full name, Temilade (teh-meh-la-day), means \"The crown is mine.\" My nickname, Temi (Tee-meeh), means \"Mine.\" So, TemsVision is, quite literally, My Vision.",
  philosophy: "A vision without action is just a dream. I believe in turning ideas into tangible, breathtaking realities.",
  approach: "I love a good challenge and enjoy tackling projects that seem impossible. I am always learning and pushing my creative boundaries to deliver the best possible results for my clients.",
  nameMeaning: {
    temilade: "The crown is mine",
    temi: "Mine",
    temsvision: "My Vision"
  }
};
