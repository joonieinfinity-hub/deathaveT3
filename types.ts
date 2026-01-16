
export interface SEO {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface Wine {
  id: string;
  name: string;
  region: string;
  price: number;
  type: 'Red' | 'White' | 'Rosé' | 'Orange' | 'Sparkling';
  description: string;
  imageUrl: string;
  imageAlt: string;
  isFeatured: boolean;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  published: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  enabled: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface SiteData {
  companyName: string;
  tagline: string;
  philosophy: string;
  aboutText: string;
  founderBio: string;
  founderImageUrl: string;
  founderImageAlt: string;
  address: string;
  phone: string;
  hours: {
    tueSat: string;
    sun: string;
    mon: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  seo: SEO;
  wines: Wine[];
  posts: Post[];
  services: Service[];
  subscribers: Subscriber[];
  colors: {
    primary: string;
    accent: string;
    background: string;
  };
  sections: {
    philosophy: boolean;
    featuredWines: boolean;
    founder: boolean;
    journal: boolean;
  };
}
