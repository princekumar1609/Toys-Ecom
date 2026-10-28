export const MOCK_CATEGORIES = [
  {
    id: 'action-figures',
    name: 'Action Figures',
    slug: 'action-figures',
    icon: '🦸‍♂️',
    itemCount: 42,
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Superheroes, anime figures, and adventure characters.'
  },
  {
    id: 'building-sets',
    name: 'Building Sets',
    slug: 'building-sets',
    icon: '🧱',
    itemCount: 58,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    description: 'Lego, wooden blocks, and architectural kits.'
  },
  {
    id: 'educational-puzzles',
    name: 'Educational Puzzles',
    slug: 'educational-puzzles',
    icon: '🧩',
    itemCount: 35,
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'STEM kits, brain teasers, and jigsaw puzzles.'
  },
  {
    id: 'dolls-plushies',
    name: 'Dolls & Plushies',
    slug: 'dolls-plushies',
    icon: '🧸',
    itemCount: 64,
    color: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Cuddly teddy bears, baby dolls, and plush companions.'
  },
  {
    id: 'outdoor-play',
    name: 'Outdoor Play',
    slug: 'outdoor-play',
    icon: '⚽',
    itemCount: 29,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Sports equipment, ride-ons, and garden toys.'
  },
  {
    id: 'remote-control',
    name: 'Remote Control',
    slug: 'remote-control',
    icon: '🏎️',
    itemCount: 21,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'RC cars, drones, and high-speed racers.'
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'LEGO City Exploration Rover & Deep Space Station',
    slug: 'lego-city-rover',
    sku: 'TN-LEGO-101',
    category: 'building-sets',
    categoryName: 'Building Sets',
    brand: 'LEGO',
    price: 2499,
    discountPrice: 1999,
    stock: 24,
    rating: 4.8,
    numReviews: 128,
    ageGroup: '6-8 Years',
    thumbnailUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    description: 'Build your own space exploration base with modular rover vehicles, astronaut minifigures, and alien terrain accessories.'
  },
  {
    id: 'prod-2',
    name: 'Super Hero Adventure Action Figure 12-Inch',
    slug: 'super-hero-action-figure',
    sku: 'TN-FIG-202',
    category: 'action-figures',
    categoryName: 'Action Figures',
    brand: 'Marvelous Toys',
    price: 1299,
    discountPrice: 999,
    stock: 18,
    rating: 4.6,
    numReviews: 84,
    ageGroup: '3-5 Years',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    description: 'Fully posable action figure with realistic battle armor, illuminated chest light, and sound effects.'
  },
  {
    id: 'prod-3',
    name: 'Wooden Solar System 3D Educational Puzzle',
    slug: 'wooden-solar-system-puzzle',
    sku: 'TN-PUZ-303',
    category: 'educational-puzzles',
    categoryName: 'Educational Puzzles',
    brand: 'MindCraft',
    price: 1499,
    discountPrice: 1199,
    stock: 15,
    rating: 4.9,
    numReviews: 96,
    ageGroup: '6-8 Years',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    description: 'Interactive wooden planetary puzzle featuring color-coded orbit tracks and planet fact cards.'
  },
  {
    id: 'prod-4',
    name: 'Fluffy Golden Honey Teddy Bear 16-Inch',
    slug: 'fluffy-honey-teddy-bear',
    sku: 'TN-PLUSH-404',
    category: 'dolls-plushies',
    categoryName: 'Dolls & Plushies',
    brand: 'HuggyPaws',
    price: 899,
    discountPrice: 699,
    stock: 40,
    rating: 4.7,
    numReviews: 210,
    ageGroup: '0-2 Years',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    description: 'Ultra-soft hypoallergenic plush bear crafted with organic cotton filling and stitched button eyes.'
  },
  {
    id: 'prod-5',
    name: 'High-Speed Off-Road RC Monster Truck 4WD',
    slug: 'offroad-rc-monster-truck',
    sku: 'TN-RC-505',
    category: 'remote-control',
    categoryName: 'Remote Control',
    brand: 'SpeedRacer',
    price: 3499,
    discountPrice: 2899,
    stock: 8,
    rating: 4.5,
    numReviews: 62,
    ageGroup: '9-12 Years',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    description: '2.4GHz remote control truck with shock absorbers, rechargeable lithium battery, and 25km/h top speed.'
  },
  {
    id: 'prod-6',
    name: 'Kids Portable Foldable Football Goal Set',
    slug: 'kids-football-goal-set',
    sku: 'TN-OUT-606',
    category: 'outdoor-play',
    categoryName: 'Outdoor Play',
    brand: 'PlaySport',
    price: 1799,
    discountPrice: 1399,
    stock: 12,
    rating: 4.4,
    numReviews: 45,
    ageGroup: '6-8 Years',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    description: 'Complete backyard sports kit featuring two pop-up net goals, mini football, pump, and ground pegs.'
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Mother of two',
    avatar: '👩',
    rating: 5,
    comment: 'Toys Ecom has been a lifesaver! The toys are non-toxic, super durable, and my kids absolutely adore the space lego set.'
  },
  {
    id: 2,
    name: 'Rajesh Verma',
    role: 'Parent & Educator',
    avatar: '👨',
    rating: 5,
    comment: 'Impressed with the educational puzzle quality. Fast delivery in 2 days and amazing customer support.'
  },
  {
    id: 3,
    name: 'Ananya Mehta',
    role: 'Gift Buyer',
    avatar: '👩‍🦰',
    rating: 5,
    comment: 'Ordered the plush teddy bear for my niece’s birthday. Beautiful packaging and top-notch softness!'
  }
];
