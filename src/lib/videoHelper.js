/**
 * Helper utilities for robust video handling (YouTube & Direct MP4/WebM files)
 */

export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return null;
  const str = String(urlOrId).trim();

  // If already an 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // Handle standard watch, youtu.be, embed, live, and shorts URLs
  const match = str.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|live|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
  );
  return match ? match[1] : null;
}

export function getYouTubeEmbedUrl(urlOrId, options = {}) {
  const id = extractYouTubeId(urlOrId);
  if (!id) return null;
  const params = new URLSearchParams({
    feature: 'oembed',
    rel: '0',
    playsinline: '1',
    enablejsapi: '1'
  });
  if (options.autoplay) params.set('autoplay', '1');
  if (options.mute) params.set('mute', '1');
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function getYouTubeWatchUrl(urlOrId) {
  const id = extractYouTubeId(urlOrId);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export function isDirectVideoUrl(url) {
  if (!url) return false;
  const str = String(url).trim().toLowerCase();
  
  // If it's a YouTube link, it is not a direct video file
  if (extractYouTubeId(str)) return false;

  return (
    str.includes('.mp4') ||
    str.includes('.webm') ||
    str.includes('.mov') ||
    str.includes('.ogg') ||
    str.includes('/gallery-videos/') ||
    str.includes('supabase.co/storage')
  );
}

export function getVideoPoster(video, fallback = '/service-building-demolition.jpg') {
  if (!video) return fallback;
  if (video.poster && !video.poster.includes('undefined')) return video.poster;
  
  const ytId = extractYouTubeId(video.youtubeId || video.video_url || video.videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return video.fallbackPoster || fallback;
}

export const OFFICIAL_AL_AREESH_PRESETS = [
  {
    title: 'Commercial Multi-Storey Building High-Reach Demolition',
    category: 'Building Demolition',
    video_url: 'https://www.youtube.com/watch?v=TVmIlM3znvg',
    duration: '03:45',
    description: 'Long-reach high-boom excavator systematically crushing reinforced concrete slabs and columns with continuous water misting.'
  },
  {
    title: 'Controlled High-Boom Structural Deconstruction',
    category: 'Controlled Demolition',
    video_url: 'https://www.youtube.com/watch?v=HyZT6O17G6g',
    duration: '02:50',
    description: 'High-precision structural separation and mechanical crushing keeping adjacent roadways safe.'
  },
  {
    title: 'Building Demolition & Reinforced Concrete Pulverization',
    category: 'Building Demolition',
    video_url: 'https://www.youtube.com/watch?v=Th2_6MKeI54',
    duration: '01:00',
    description: 'Mechanical pulverization of heavy reinforced concrete frame and rebar extraction under strict Dubai Municipality supervision.'
  },
  {
    title: 'Heavy Hydraulic Rock Breaker & RCC Foundation Work',
    category: 'Concrete Breaking',
    video_url: 'https://www.youtube.com/watch?v=XaSD5FoSP-A',
    duration: '02:30',
    description: '4500kg Montabert hydraulic rock breaker tackling thick reinforced concrete raft footings.'
  },
  {
    title: 'Turnkey Residential Villa Demolition & Plot Clearance',
    category: 'Villa Demolition',
    video_url: 'https://www.youtube.com/watch?v=JjIKSFjczNU',
    duration: '01:00',
    description: 'Complete luxury villa teardown with precision boundary separation and atomized water dust suppression.'
  },
  {
    title: 'Deep Basement Bulk Earthworks & Tipper Hauling',
    category: 'Excavation',
    video_url: 'https://www.youtube.com/watch?v=dvU-Pk_DuRc',
    duration: '04:10',
    description: 'Synchronized fleet of Caterpillar excavators and 32m³ heavy tippers executing rapid bulk excavation.'
  },
  {
    title: 'Industrial Steel Structure Dismantling & Cold Shearing',
    category: 'Industrial',
    video_url: 'https://www.youtube.com/watch?v=YGOtSKc97dA',
    duration: '01:00',
    description: 'Flame-free hydraulic cold shears, crane rigging, and warehouse framework dismantling.'
  },
  {
    title: 'Heavy Logistics Fleet & Live Site Operations',
    category: 'Fleet & Logistics',
    video_url: 'https://www.youtube.com/watch?v=2KJkLdGBJTY',
    duration: '01:00',
    description: 'Operational footage of tipper trucks, wheel loaders, and excavators operating simultaneously on active site.'
  }
];
