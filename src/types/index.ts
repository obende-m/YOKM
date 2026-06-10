export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  imageUrl: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
  location?: string;
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  currency: string;
  campaign: string;
  timestamp: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or Material symbol
  longDescription: string;
  imageUrl: string;
  achievements: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}
