import { SERVICES } from './companyData';
import { CLIENTS } from './clientsData';

export const DEFAULT_SERVICES = SERVICES.map((s, idx) => ({
  title: s.title,
  slug: s.slug,
  subtitle: s.subtitle || '',
  category: s.category || 'Demolition',
  short_description: s.shortDesc || '',
  featured_image: s.image || '',
  is_published: true,
  order_index: idx + 1
}));

export const DEFAULT_PHOTOS = [
  {
    title: 'Commercial Multi-Storey Demolition',
    category: 'Building Demolition',
    location: 'Dubai Investments Park (DIP), Dubai',
    image_url: 'https://alareeshdemolition.ae/wp-content/uploads/2026/01/g-1.png',
    is_published: true,
    order_index: 1
  },
  {
    title: 'Deep Basement Excavation & Shoring',
    category: 'Excavation',
    location: 'Business Bay, Dubai',
    image_url: 'https://alareeshdemolition.ae/wp-content/uploads/2026/01/g-2.png',
    is_published: true,
    order_index: 2
  },
  {
    title: 'Controlled Luxury Villa Demolition',
    category: 'Villa Demolition',
    location: 'Palm Jumeirah & Jumeirah 1, Dubai',
    image_url: 'https://alareeshdemolition.ae/wp-content/uploads/2026/01/g-3.png',
    is_published: true,
    order_index: 3
  },
  {
    title: 'Industrial Warehouse Dismantling',
    category: 'Industrial',
    location: 'Al Qusais Industrial Area, Deira, Dubai',
    image_url: 'https://alareeshdemolition.ae/wp-content/uploads/2026/01/g-4.png',
    is_published: true,
    order_index: 4
  },
  {
    title: 'Reinforced Concrete Foundation Breaking',
    category: 'Concrete Breaking',
    location: 'Sharjah Industrial Zone & Ajman',
    image_url: 'https://alareeshdemolition.ae/wp-content/uploads/2026/01/g-5.png',
    is_published: true,
    order_index: 5
  },
  {
    title: 'Site Clearance & Material Transportation',
    category: 'Excavation',
    location: 'Dubai South (Expo City Environs), Dubai',
    image_url: 'https://alareeshdemolition.ae/wp-content/uploads/2026/01/mac-1.png',
    is_published: true,
    order_index: 6
  },
  {
    title: 'Heavy RCC Frame Crushing',
    category: 'Concrete Breaking',
    location: 'Dubai Marina',
    image_url: '/service-concrete-building.png',
    is_published: true,
    order_index: 7
  },
  {
    title: 'Commercial Tower Controlled Demolition',
    category: 'Building Demolition',
    location: 'Business Bay, Dubai',
    image_url: '/service-building-demolition.jpg',
    is_published: true,
    order_index: 8
  }
];

export const DEFAULT_VIDEOS = [
  {
    title: 'Commercial Multi-Storey Building High-Reach Demolition',
    category: 'Building Demolition',
    video_url: 'https://www.youtube.com/watch?v=TVmIlM3znvg',
    duration: '03:45',
    description: 'Watch our long-reach high-boom excavator systematically crush reinforced concrete slabs and columns floor-by-floor with continuous water misting.',
    is_published: true,
    order_index: 1
  },
  {
    title: 'Controlled High-Boom Structural Deconstruction',
    category: 'Controlled Demolition',
    video_url: 'https://www.youtube.com/watch?v=HyZT6O17G6g',
    duration: '02:50',
    description: 'High-precision structural separation and mechanical crushing of high-rise commercial beams keeping adjacent roadways completely safe.',
    is_published: true,
    order_index: 2
  },
  {
    title: 'Building Demolition & Reinforced Concrete Pulverization',
    category: 'Building Demolition',
    video_url: 'https://www.youtube.com/watch?v=Th2_6MKeI54',
    duration: '01:00',
    description: 'Live on-site mechanical pulverization of heavy reinforced concrete frame and rebar extraction under strict Dubai Municipality supervision.',
    is_published: true,
    order_index: 3
  },
  {
    title: 'Heavy Hydraulic Rock Breaker & RCC Foundation Work',
    category: 'Concrete Breaking',
    video_url: 'https://www.youtube.com/watch?v=XaSD5FoSP-A',
    duration: '02:30',
    description: 'High-impact 4500kg Montabert hydraulic rock breaker tackling thick reinforced concrete foundation raft footings without shockwaves.',
    is_published: true,
    order_index: 4
  },
  {
    title: 'Turnkey Residential Villa Demolition & Plot Clearance',
    category: 'Villa Demolition',
    video_url: 'https://www.youtube.com/watch?v=JjIKSFjczNU',
    duration: '01:00',
    description: 'Complete luxury villa teardown with precision boundary separation, swimming pool breaking, and atomized water cannons containing all dust.',
    is_published: true,
    order_index: 5
  },
  {
    title: 'Deep Basement Bulk Earthworks & Tipper Hauling',
    category: 'Excavation',
    video_url: 'https://www.youtube.com/watch?v=dvU-Pk_DuRc',
    duration: '04:10',
    description: 'A synchronized fleet of Caterpillar excavators and 32m³ heavy tippers executing rapid bulk excavation and soil transport to approved landfills.',
    is_published: true,
    order_index: 6
  },
  {
    title: 'Industrial Steel Structure Dismantling & Cold Shearing',
    category: 'Industrial',
    video_url: 'https://www.youtube.com/watch?v=YGOtSKc97dA',
    duration: '01:00',
    description: 'Flame-free hydraulic cold shears, crane rigging, and systematic warehouse framework dismantling for eco-friendly scrap recycling.',
    is_published: true,
    order_index: 7
  },
  {
    title: 'Heavy Logistics Fleet & Live Site Operations',
    category: 'Fleet & Logistics',
    video_url: 'https://www.youtube.com/watch?v=2KJkLdGBJTY',
    duration: '01:00',
    description: 'Coordinated operational footage of tipper trucks, wheel loaders, and excavators operating simultaneously on an active site.',
    is_published: true,
    order_index: 8
  }
];

export const DEFAULT_CLIENTS = CLIENTS.map((c, idx) => ({
  name: c.name,
  category: c.category || 'Master Developer',
  logo_url: c.logo || '',
  website_url: c.url || 'https://',
  is_active: true,
  order_index: idx + 1
}));
