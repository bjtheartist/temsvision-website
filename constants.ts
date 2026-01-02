import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '0',
    title: 'CommuniData',
    category: 'PRODUCT DESIGN',
    imageUrl: '/project-communidata.png',
    description: 'A civic data platform that turns Chicago\'s neighborhood data into funding-ready reports and strategic insights for community leaders.',
    tags: ['React', 'Data', 'Civic Tech'],
    problem: 'Community leaders, chambers of commerce, and nonprofits in Chicago needed access to hyper-local data to make informed decisions and secure funding, but raw city data was scattered, hard to interpret, and not actionable.',
    solution: 'Built a neighborhood intelligence platform covering all 77 Chicago community areas with 112K+ data points. Users can explore interactive maps, generate PDF reports, and extract strategic insights—turning raw civic data into funding-ready documentation.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Data Visualization', 'PDF Generation'],
    githubUrl: 'https://github.com/Dunosis/CommuniData',
    year: '2025'
  },
  {
    id: '1',
    title: 'ChiStartup Hub',
    category: 'WEB DESIGN',
    imageUrl: '/project-chistartuphub.png',
    description: 'A comprehensive resource hub for Chicago\'s startup ecosystem, featuring success stories, blueprints, and community resources.',
    tags: ['React', 'TypeScript', 'Community'],
    problem: 'Chicago founders were scattered across dozens of resources, Slack channels, and newsletters. There was no single place to find curated startup resources, learn from local exits, or connect with the ecosystem.',
    solution: 'Built a centralized hub that aggregates Chicago startup resources, showcases success stories from real exits, and provides actionable blueprints for founders at every stage.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Base44'],
    githubUrl: 'https://github.com/bjtheartist/chistartuphub',
    year: '2025'
  },
  {
    id: '2',
    title: '1871 Innovation Labs Calendar',
    category: 'PRODUCT DESIGN',
    imageUrl: '/project-innovationlabs.png',
    description: 'An event discovery platform for 1871\'s Innovation Labs programs, featuring smart filtering by clusters, tracks, and event types.',
    tags: ['React', 'Lovable', 'Events'],
    problem: 'The tech innovation hub had dozens of events across multiple clusters (Emerging Tech, Tech for Good, Build Tech) and tracks (AI, Climate, Fintech, etc.). Founders couldn\'t easily find relevant events for their specific interests.',
    solution: 'Designed and built a filterable calendar with multiple view modes (list, calendar, cards), allowing users to filter by Innovation Lab clusters, industry tracks, and event types like Connect Events, Signature Summits, and Innovation Weeks.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Lovable'],
    githubUrl: 'https://github.com/bjtheartist/innovationlabs-calendar',
    year: '2025'
  },
  {
    id: '3',
    title: 'RecipeVault',
    category: 'WEB DESIGN',
    imageUrl: '/project-recipevault.png',
    description: 'A personal recipe management app with smart search, meal planning calendar, and grocery list generation.',
    tags: ['React', 'Meal Planning', 'UX'],
    problem: 'Home cooks struggle to organize recipes from different sources, plan weekly meals, and generate shopping lists. Existing apps are either too complex or lack key features.',
    solution: 'Created an intuitive recipe vault with smart search by ingredients/cuisine/dietary preferences, a drag-and-drop meal planning calendar, custom collections, and personalized recommendations based on cooking history.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    year: '2025'
  },
  {
    id: '4',
    title: 'Fontis Food',
    category: 'WEB DESIGN',
    imageUrl: '/project-fontis.png',
    description: 'A food ordering website for a South African Kota restaurant in Pretoria, featuring WhatsApp integration for seamless ordering.',
    tags: ['React', 'Lovable', 'Food & Bev'],
    problem: 'A local restaurant in Pretoria needed an online presence to showcase their menu and take orders, but didn\'t have the budget for a complex ordering system or delivery infrastructure.',
    solution: 'Built a clean, appetizing website that showcases the menu with beautiful food photography and integrates directly with WhatsApp for ordering—meeting customers where they already are.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Lovable', 'WhatsApp API'],
    githubUrl: 'https://github.com/bjtheartist/fontis-food',
    year: '2025'
  },
  {
    id: '5',
    title: 'Sahara Tax Pro',
    category: 'WEB DESIGN',
    imageUrl: '/project-saharatax.png',
    description: 'A professional website for a boutique tax preparation service, emphasizing trust, expertise, and personalized service.',
    tags: ['Web Design', 'Professional Services', 'Branding'],
    problem: 'A boutique tax preparation practice needed to differentiate from big-box tax services and communicate their personalized, human-centered approach to financial guidance.',
    solution: 'Designed a sophisticated, trust-building website that emphasizes the boutique nature of the practice, highlights their dedication to understanding each client\'s unique story, and makes booking consultations frictionless.',
    tools: ['React', 'TypeScript', 'Tailwind CSS'],
    year: '2025'
  },
  {
    id: '6',
    title: 'Just AFC',
    category: 'WEB DESIGN',
    imageUrl: '/project-justafc.png',
    description: 'A compassionate website for an adult foster care service, designed to build trust with families seeking care for their loved ones.',
    tags: ['Healthcare', 'Web Design', 'Accessibility'],
    problem: 'Families searching for adult foster care face an emotional, high-stakes decision. Most care facility websites feel clinical and impersonal, failing to convey the warmth and compassion families are looking for.',
    solution: 'Created a warm, welcoming website that leads with compassion and respect. The design uses soft colors, genuine photography, and clear information architecture to help families feel confident in their choice.',
    tools: ['React', 'TypeScript', 'Tailwind CSS'],
    year: '2025'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'web-apps',
    name: 'Web Applications',
    description: 'Full-stack web applications built with modern tools. From idea to deployed product, I help bring digital products to life.',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    features: ['React/Next.js', 'TypeScript', 'Tailwind CSS', 'Database Integration', 'API Development']
  },
  {
    id: 'web-design',
    name: 'Website Design',
    description: 'Custom websites that tell your story. Clean, fast, and designed to convert visitors into customers.',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    features: ['Custom Design', 'Responsive', 'SEO Ready', 'Fast Loading', 'CMS Integration']
  },
  {
    id: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    description: 'Quick iterations using no-code and low-code tools. Test ideas fast before committing to full development.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    features: ['Lovable', 'Bolt', 'Figma', 'Quick Turnaround', 'User Testing']
  },
  {
    id: 'data-viz',
    name: 'Data & Dashboards',
    description: 'Turn complex data into clear insights. Interactive dashboards and visualizations that help you make better decisions.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    features: ['Data Visualization', 'Interactive Dashboards', 'Analytics', 'Reporting', 'Charts & Graphs']
  }
];

export const SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Postgres',
  'Supabase',
  'Cloudflare',
  'Google Analytics',
  'Claude Code',
  'Codex',
  'Antigravity',
  'Lovable',
  'Bolt',
  'Figma',
  'Data Analysis',
  'Photography'
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/bjtheartist',
  github: 'https://github.com/bjtheartist',
  instagram: 'https://instagram.com/bjtheartist'
};
