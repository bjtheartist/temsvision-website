import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Fintech Dashboard',
    category: 'PRODUCT DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    description: 'Complete UX/UI redesign for a financial analytics platform. Improved user engagement by 45% through intuitive data visualization and streamlined workflows.',
    tags: ['UX Design', 'UI Design', 'Data Viz']
  },
  {
    id: '2',
    title: 'E-Commerce Experience',
    category: 'WEB DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Modern e-commerce platform with seamless checkout flow, personalized recommendations, and mobile-first design approach.',
    tags: ['Web Design', 'E-commerce', 'Mobile']
  },
  {
    id: '3',
    title: 'Health & Wellness App',
    category: 'MOBILE APP',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    description: 'End-to-end mobile app design for a wellness startup. Features include habit tracking, meditation guides, and progress analytics.',
    tags: ['Mobile App', 'iOS', 'Android']
  },
  {
    id: '4',
    title: 'Brand Identity System',
    category: 'BRANDING',
    imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
    description: 'Comprehensive visual identity for a tech startup including logo design, typography system, color palette, and brand guidelines.',
    tags: ['Branding', 'Logo Design', 'Guidelines']
  },
  {
    id: '5',
    title: 'SaaS Analytics Platform',
    category: 'PRODUCT DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    description: 'Data-driven dashboard design with real-time analytics, custom reporting, and team collaboration features.',
    tags: ['SaaS', 'Dashboard', 'Analytics']
  },
  {
    id: '6',
    title: 'Restaurant Website',
    category: 'WEB DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    description: 'Elegant website design for an upscale restaurant featuring online reservations, menu showcase, and immersive visual storytelling.',
    tags: ['Web Design', 'Hospitality', 'UI']
  },
  {
    id: '7',
    title: 'Social Media App',
    category: 'MOBILE APP',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    description: 'Social networking app concept with focus on authentic connections, content creation tools, and community building features.',
    tags: ['Mobile App', 'Social', 'UX']
  },
  {
    id: '8',
    title: 'Corporate Identity',
    category: 'BRANDING',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    description: 'Full corporate rebrand including visual identity, marketing collateral, and digital presence strategy.',
    tags: ['Branding', 'Corporate', 'Strategy']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'product-design',
    name: 'Product Design',
    description: 'End-to-end UX/UI design for web and mobile applications. From user research and wireframing to polished, production-ready interfaces.',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    price: '$2,500',
    features: ['User Research', 'Wireframing', 'UI Design', 'Prototyping', 'Design Systems']
  },
  {
    id: 'web-design',
    name: 'Web Design',
    description: 'Custom website design that combines stunning visuals with intuitive user experience. Responsive, accessible, and optimized for conversion.',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    price: '$1,800',
    features: ['Custom Design', 'Responsive', 'SEO Ready', 'Fast Loading', 'CMS Integration']
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    description: 'Complete visual identity systems that capture your brand essence. Logos, typography, color systems, and comprehensive brand guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    price: '$3,000',
    features: ['Logo Design', 'Typography', 'Color System', 'Brand Guidelines', 'Collateral']
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Design',
    description: 'Native iOS and Android app design with focus on user delight. Intuitive navigation, beautiful interfaces, and seamless interactions.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    price: '$3,500',
    features: ['iOS Design', 'Android Design', 'Prototyping', 'Animation', 'App Store Assets']
  }
];

export const SKILLS = [
  'Product Design',
  'UX/UI Design',
  'Web Design',
  'Mobile App Design',
  'Brand Identity',
  'Design Systems',
  'Prototyping',
  'User Research',
  'Figma',
  'Framer',
  'Webflow',
  'React'
];

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/bjtheartist',
  linkedin: 'https://linkedin.com/in/bjtheartist',
  dribbble: 'https://dribbble.com/bjtheartist',
  behance: 'https://behance.net/bjtheartist',
  instagram: 'https://instagram.com/bjtheartist'
};
