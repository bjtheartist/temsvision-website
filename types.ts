export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  tags?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price?: string;
  features?: string[];
}
