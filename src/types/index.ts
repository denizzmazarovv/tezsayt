export interface Project {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  image: string;
  category: string;
  technologies: string[];
  url?: string;
}

export interface PricingPlan {
  id: string;
  name: Record<string, string>;
  price: Record<string, string>;
  features: Record<string, string[]>;
  highlighted?: boolean;
}

export type Language = 'ru' | 'en' | 'uz';