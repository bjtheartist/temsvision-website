
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

export const PROJECTS: Project[] = [
  {
    id: '0',
    title: 'Golden Hour Portraits',
    category: 'PORTRAITS',
    imageUrl: '/project-portraits-1.jpg',
    description: 'Vibrant portrait sessions capturing personality and style during the magical golden hour.',
    tags: ['Portraits', 'Fashion', 'Golden Hour'],
    problem: '',
    solution: '',
    tools: ['Canon', 'Natural Light', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '1',
    title: 'Soccer Action Series',
    category: 'SPORTS',
    imageUrl: '/project-sports-1.jpg',
    description: 'Dynamic sports photography capturing athletes in motion with dramatic skies.',
    tags: ['Sports', 'Action', 'Athletes'],
    problem: '',
    solution: '',
    tools: ['High-Speed Photography', 'Adobe Photoshop'],
    year: '2024'
  },
  {
    id: '2',
    title: 'Engagement Sessions',
    category: 'LOVE STORIES',
    imageUrl: '/project-love-1.jpg',
    description: 'Intimate moments captured with artistic film-style processing.',
    tags: ['Couples', 'Engagement', 'Romance'],
    problem: '',
    solution: '',
    tools: ['Film Emulation', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '3',
    title: 'Timeless Monochrome',
    category: 'B & W',
    imageUrl: '/project-bw-1.jpg',
    description: 'Classic black and white portraits emphasizing emotion and form.',
    tags: ['Black & White', 'Fine Art', 'Portraits'],
    problem: '',
    solution: '',
    tools: ['Black & White Processing', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '4',
    title: 'Cultural Fashion',
    category: 'PORTRAITS',
    imageUrl: '/project-portraits-2.jpg',
    description: 'Celebrating African fashion and culture through vibrant portrait photography.',
    tags: ['Fashion', 'Culture', 'Style'],
    problem: '',
    solution: '',
    tools: ['Studio Lighting', 'Adobe Photoshop'],
    year: '2024'
  },
  {
    id: '5',
    title: 'Group Dynamics',
    category: 'PORTRAITS',
    imageUrl: '/project-portraits-3.jpg',
    description: 'Group portraits capturing connections and relationships.',
    tags: ['Groups', 'Friends', 'Connections'],
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
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    features: ['Individual Portraits', 'Group Sessions', 'Headshots', 'Creative Concepts', 'Golden Hour']
  },
  {
    id: 'sports',
    name: 'Sports Photography',
    description: 'Dynamic action shots that freeze the intensity and emotion of athletic performance.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-voices-of-the-game?w=800&q=80',
    features: ['Action Shots', 'Team Photos', 'Athletic Portraits', 'Event Coverage']
  },
  {
    id: 'weddings',
    name: 'Love Stories',
    description: 'Engagement sessions, weddings, and couples photography that tells your unique love story.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    features: ['Engagement Sessions', 'Wedding Photography', 'Couples Portraits', 'Anniversary Sessions']
  },
  {
    id: 'events',
    name: 'Events & Special Occasions',
    description: 'Birthday parties, graduations, family gatherings, and milestone celebrations captured beautifully.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    features: ['Birthday Sessions', 'Graduation Photos', 'Family Sessions', 'Boudoir']
  }
];

export const SKILLS = [
  'Portrait Photography',
  'Sports Photography',
  'Wedding Photography',
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
