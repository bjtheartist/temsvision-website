
import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Morning Stillness',
    category: 'ATMOSPHERIC',
    imageUrl: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&q=80&w=1000',
    description: 'A study in light and shadow over a morning espresso in the Mediterranean.'
  },
  {
    id: '2',
    title: 'The Orchard',
    category: 'EDITORIAL',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
    description: 'Vibrant colors and natural textures for a high-end lifestyle campaign.'
  },
  {
    id: '3',
    title: 'Steel & Mist',
    category: 'ARCHITECTURAL',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    description: 'Capturing the industrial soul of the urban landscape under a blue hour haze.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'editorial',
    name: 'Editorial Photography',
    description: 'High-end storytelling for magazines and digital publications.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000',
    price: '$1200'
  },
  {
    id: 'commercial',
    name: 'Commercial Shoots',
    description: 'Brand-focused imagery that converts viewers into customers.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000',
    price: '$2500'
  },
  {
    id: 'portrait',
    name: 'Portrait Mastery',
    description: 'Capturing the essence of character through intimate lenses.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000',
    price: '$800'
  }
];
