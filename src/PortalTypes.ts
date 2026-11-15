// Encyclopedia

export interface EncyclopediaArticle {
  id: string;
  title: string;
  header: string;
  image: string;
  content: string;
  relatedArticleIds: string[];
}

export interface EncyclopediaConfig {
  articles: EncyclopediaArticle[];
  initialArticleId: string;
  targetArticleId: string;
}

export const mockedArticles: EncyclopediaArticle[] = [
  {
    id: "earth",
    title: "Earth",
    header:
      "Earth is the third planet from the Sun and the only known astronomical object to harbor life.",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
    content: `
      Earth is the third planet from the Sun and the only known
      astronomical object to harbor life.

      Earth formed approximately 4.54 billion years ago. It has
      a diverse environment consisting of oceans, continents,
      mountains, forests, and deserts.

      The planet has one natural satellite, the Moon, and an
      atmosphere primarily composed of nitrogen and oxygen.
    `,
    relatedArticleIds: ["solar-system", "moon", "climate"],
  },
  {
    id: "solar-system",
    title: "Solar System",
    header:
      "The Solar System consists of the Sun and all celestial objects gravitationally bound to it.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
    content: `
      The Solar System is a gravitational system consisting
      of the Sun and everything that orbits around it.

      It contains eight planets, dwarf planets, moons,
      asteroids, comets, and other smaller objects.

      The Sun is the central star and contains most of the
      Solar System's total mass.
    `,
    relatedArticleIds: ["earth", "moon", "mars"],
  },
  {
    id: "moon",
    title: "Moon",
    header:
      "The Moon is Earth's only natural satellite and the fifth-largest satellite in the Solar System.",
    image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe",
    content: `
      The Solar System is a gravitational system consisting
      of the Sun and everything that orbits around it.

      It contains eight planets, dwarf planets, moons,
      asteroids, comets, and other smaller objects.

      The Sun is the central star and contains most of the
      Solar System's total mass.
    `,
    relatedArticleIds: ["earth", "solar-system"],
  },
  {
    id: "mars",
    title: "Mars",
    header:
      "Mars is the fourth planet from the Sun, often called the Red Planet because of its reddish appearance.",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
    content: `
      The Solar System is a gravitational system consisting
      of the Sun and everything that orbits around it.

      It contains eight planets, dwarf planets, moons,
      asteroids, comets, and other smaller objects.

      The Sun is the central star and contains most of the
      Solar System's total mass.
    `,
    relatedArticleIds: ["solar-system", "earth"],
  },
  {
    id: "climate",
    title: "Climate Change",
    header:
      "Climate change refers to long-term shifts in temperatures and weather patterns, primarily caused by human activities since the 1800s.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    content: `
      The Solar System is a gravitational system consisting
      of the Sun and everything that orbits around it.

      It contains eight planets, dwarf planets, moons,
      asteroids, comets, and other smaller objects.

      The Sun is the central star and contains most of the
      Solar System's total mass.
    `,
    relatedArticleIds: ["earth", "solar-system"],
  },
];

// Ecommerce

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  delivery: string;
}

export interface CommerceConfig {
  products: Product[];
  targetProductId: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro 256GB Natural Titanium",
    category: "Electronics",
    price: 4299,
    oldPrice: 4999,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600",
    badge: "Bestseller",
    delivery: "Tomorrow",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: 1199,
    oldPrice: 1499,
    rating: 4.8,
    reviews: 342,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
    badge: "Price hit",
    delivery: "Tomorrow",
  },
  {
    id: 3,
    name: "Nike Air Max 270 Men's Sports Shoes",
    category: "Fashion",
    price: 449,
    oldPrice: null,
    rating: 4.7,
    reviews: 86,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    badge: null,
    delivery: "In 2 days",
  },
  {
    id: 4,
    name: "Modern Minimalist Desk Lamp",
    category: "Home",
    price: 129,
    oldPrice: 179,
    rating: 4.6,
    reviews: 54,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    badge: "Sale",
    delivery: "Tomorrow",
  },
  {
    id: 5,
    name: "Apple MacBook Air 13 M3 16GB 512GB",
    category: "Electronics",
    price: 5499,
    oldPrice: 5999,
    rating: 4.9,
    reviews: 217,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    badge: "Bestseller",
    delivery: "Tomorrow",
  },
  {
    id: 6,
    name: "Premium Everyday Backpack 25L",
    category: "Fashion",
    price: 189,
    oldPrice: null,
    rating: 4.5,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    badge: null,
    delivery: "In 2 days",
  },
  {
    id: 7,
    name: "Ceramic Coffee Set - 4 Pieces",
    category: "Home",
    price: 89,
    oldPrice: 119,
    rating: 4.8,
    reviews: 73,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    badge: "Sale",
    delivery: "Tomorrow",
  },
  {
    id: 8,
    name: "Smart Fitness Watch AMOLED Display",
    category: "Electronics",
    price: 599,
    oldPrice: 799,
    rating: 4.6,
    reviews: 194,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    badge: "Popular",
    delivery: "Tomorrow",
  },
];

// Newspaper

export interface Article {
  id: number;
  title: string;
  header: string;
  image: string;
  link: string;
  category: string;
  featured?: boolean;
  main?: boolean;
  time?: string;
}

export interface NewspaperConfig {
  articles: Article[];
  targetArticleId: number;
}

export const mockArticles: Article[] = [
  {
    id: 1,
    title:
      "THE TRUTH THEY HID FROM US! Scientists Discover Something That Could Change Everything",
    header:
      "Experts are speechless. The discovery nobody expected is making headlines around the world.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    link: "#article-1",
    category: "BREAKING NEWS",
    main: true,
    time: "12 min ago",
  },
  {
    id: 2,
    title:
      "SHOCKING! A Simple Everyday Habit Could Be Ruining Your Life",
    header:
      "Doctors are warning everyone. Millions of people might be making this mistake.",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
    link: "#article-2",
    category: "HEALTH",
    featured: true,
    time: "25 min ago",
  },
  {
    id: 3,
    title:
      "Nobody Saw This Coming: Internet Explodes Over Celebrity Revelation",
    header:
      "One unexpected announcement has sent social media into complete chaos.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
    link: "#article-3",
    category: "CELEBRITIES",
    featured: true,
    time: "38 min ago",
  },
  {
    id: 4,
    title:
      "This New Technology Is Leaving Everyone Speechless",
    header:
      "A futuristic innovation could soon become part of everyday life.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    link: "#article-4",
    category: "TECHNOLOGY",
    featured: true,
    time: "1 hour ago",
  },
  {
    id: 5,
    title:
      "The 5 Things You Should Never Do Before Going to Bed",
    header:
      "Sleep specialists explain why these seemingly harmless habits matter.",
    image:
      "https://images.unsplash.com/photo-1511295742362-92c96b6c8a0c?w=600",
    link: "#article-5",
    category: "LIFESTYLE",
    time: "1 hour ago",
  },
  {
    id: 6,
    title:
      "A Mysterious Object Appeared in the Sky. People Cannot Explain It",
    header:
      "Witnesses captured something unusual, and the footage is going viral.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600",
    link: "#article-6",
    category: "WORLD",
    time: "2 hours ago",
  },
  {
    id: 7,
    title:
      "Your Smartphone Has a Hidden Feature You Probably Never Used",
    header:
      "This little-known trick could save you a lot of time.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    link: "#article-7",
    category: "TECHNOLOGY",
    time: "3 hours ago",
  },
  {
    id: 8,
    title:
      "The Most Unexpected Food Trend Is Taking Over the Internet",
    header:
      "Food lovers are divided over this unusual new sensation.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
    link: "#article-8",
    category: "FOOD",
    time: "4 hours ago",
  },
  {
    id: 9,
    title:
      "Why Everyone Is Talking About This Forgotten Destination",
    header:
      "Travel enthusiasts have discovered a surprising hidden gem.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600",
    link: "#article-9",
    category: "TRAVEL",
    time: "5 hours ago",
  },
  {
    id: 10,
    title:
      "Scientists Reveal What Happens When You Take a Break From Social Media",
    header:
      "The results of a recent study may surprise you.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    link: "#article-10",
    category: "SCIENCE",
    time: "6 hours ago",
  },
];

// Gallery

export interface GalleryPhoto {
  id: string;
  src: string;
  name: string;
  description: string;
}

export interface PhotoGalleryConfig {
  photos: GalleryPhoto[];
  targetPhotoId: string;
}

export const mockPhotos: GalleryPhoto[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    name: "Quiet mornings",
    description: "A peaceful lake surrounded by mountains.",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900",
    name: "Golden hour",
    description: "The last sunlight of a summer evening.",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    name: "Open roads",
    description: "Somewhere far away from everything.",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900",
    name: "Wildlife",
    description: "A quiet moment in the forest.",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900",
    name: "Mountain escape",
    description: "A view worth remembering.",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    name: "Into the woods",
    description: "Afternoon light between the trees.",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900",
    name: "Ocean breeze",
    description: "Waves rolling onto the shore.",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900",
    name: "Little adventures",
    description: "A place discovered by accident.",
  },
];

// Portal config

export type PortalType =
  | "encyclopedia"
  | "ecommerce"
  | "newspaper"
  | "gallery";
// There is also ValidationPortal, but it does not need portal-specific configuration

export interface PortalConfigMap {
  encyclopedia: EncyclopediaConfig;
  ecommerce: CommerceConfig;
  newspaper: NewspaperConfig;
  gallery: PhotoGalleryConfig;
}
