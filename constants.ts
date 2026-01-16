
import { SiteData } from './types';

export const INITIAL_SITE_DATA: SiteData = {
  companyName: "Death Ave Wines",
  tagline: "Conscious Drinking for the Modern Spirit",
  philosophy: "We promote healthier, intentionally crafted wines, focusing on low-intervention, cleaner processes without heavy pesticides. We partner only with winemakers who share this commitment to the earth and the glass.",
  aboutText: "Death Ave Wines is more than a shop; it is a curator of diverse terroirs. Located in the heart of Hudson Yards, we bring together eclectic, niche collections that tell a story of their origin.",
  founderBio: "Michael Tzezailidis brings over 35 years of hospitality expertise from the vibrant heart of NYC. His vision for Death Ave Wines stems from a career-long dedication to excellence and a passion for the artisan winemaking movement.",
  founderImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  founderImageAlt: "Michael Tzezailidis, founder of Death Ave Wines",
  address: "317 10th Avenue, New York, NY 10001",
  phone: "(646) 751-8229",
  hours: {
    tueSat: "12 PM – 10 PM",
    sun: "12 PM – 9 PM",
    mon: "Closed"
  },
  social: {
    instagram: "https://instagram.com/deathavewines",
    facebook: "https://facebook.com/deathavewines"
  },
  seo: {
    title: "Death Ave Wines | Hudson Yards NYC",
    description: "Curated boutique wine shop in Hudson Yards, NYC. Low-intervention, organic, and biodynamic wines for the conscious drinker.",
    keywords: "wine shop nyc, hudson yards wine, organic wine nyc, low intervention wine, death ave wines",
    ogImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop"
  },
  wines: [
    {
      id: '1',
      name: "Valley Creek Cabernet",
      region: "Napa Valley, CA",
      price: 45,
      type: 'Red',
      description: "A bold, earth-first Cabernet with notes of blackberry and forest floor.",
      imageUrl: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop",
      imageAlt: "Bottle of Valley Creek Cabernet Red Wine",
      isFeatured: true
    },
    {
      id: '2',
      name: "Sunset Ridge Rosé",
      region: "Willamette Valley, OR",
      price: 32,
      type: 'Rosé',
      description: "Bright acidity and wild strawberry notes, crafted with zero pesticides.",
      imageUrl: "https://images.unsplash.com/photo-1558001256-0229a4d6210f?q=80&w=1000&auto=format&fit=crop",
      imageAlt: "Bottle of Sunset Ridge Rosé Wine",
      isFeatured: true
    }
  ],
  posts: [
    {
      id: 'p1',
      title: "The Rise of Low-Intervention Wines",
      slug: "low-intervention-wines",
      excerpt: "Why cleaner winemaking is the future of the industry.",
      content: "Low-intervention wine is often referred to as 'natural' wine, though the definition can be fluid. At Death Ave, we believe it's about transparency. It starts with organic or biodynamic farming—no synthetic pesticides or herbicides. In the cellar, it means spontaneous fermentation with native yeasts, and little to no additives. The result? A wine that tastes like where it came from.",
      date: "2024-05-15",
      imageUrl: "https://images.unsplash.com/photo-1474722883778-79ad0506f2f0?q=80&w=1000&auto=format&fit=crop",
      published: true
    }
  ],
  services: [
    {
      id: 's1',
      title: "Personal Guidance",
      description: "One-on-one sessions with our 10+ year veteran sommelier to build your personal cellar.",
      imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop",
      enabled: true
    }
  ],
  subscribers: [
    { id: '1', email: 'hello@example.com', date: '2024-05-01' }
  ],
  colors: {
    primary: "#121212",
    accent: "#800020",
    background: "#0a0a0a"
  },
  sections: {
    philosophy: true,
    featuredWines: true,
    founder: true,
    journal: true
  }
};
