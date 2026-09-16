/**
 * Every word, video and image on the page. Ported verbatim from the incumbent
 * Canva site at nicswork.online — copy is the client's, not ours.
 */

export const person = {
  name: "Jonji Jose Coronel",
  displayName: "Jonji Jose C.",
  greeting: "Hello, I'm",
  role: "Multimedia Designer",
  disciplines: ["Graphic Design", "Video Editing", "Digital Content"],
  intro:
    "I create visual experiences across graphic design, branding, digital content, video, and marketing. Helping ideas communicate clearly, creatively, and effectively.",
  email: "Jonji0528@gmail.com",
  phoneDisplay: "(+63) 948 8151 882",
  whatsapp: "639488151882",
} as const;

export const sections = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "design", label: "Design" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type Video = {
  youtubeId: string;
  category: string;
  detail: string;
  /**
   * YouTube only serves a true 9:16 still (/oardefault.jpg) for videos
   * published as Shorts. Set this where it 404s; the 16:9 frame is
   * centre-cropped back to vertical, which is where the content already sits.
   */
  wideposterOnly?: true;
};

/** 9:16. YouTube serves a true vertical still at /oardefault.jpg for these. */
export const verticalVideos: Video[] = [
  { youtubeId: "UlIFTluIzzM", category: "Real estate", detail: "Property features" },
  { youtubeId: "AfhV4KzVfw4", category: "Real estate", detail: "Success stories" },
  { youtubeId: "UyutG6cDTUk", category: "Brand & business", detail: "Podcast repurposing" },
  { youtubeId: "LadzFE42yvc", category: "Food & dining", detail: "Review and promotional", wideposterOnly: true },
  { youtubeId: "OHsctLwaUCo", category: "Brand testimonials", detail: "Client experiences & stories" },
  { youtubeId: "3cdwt589h80", category: "AI-generated UGC", detail: "Product & brand promotion" },
];

/** 16:9. These have no vertical still; /maxresdefault.jpg is the right frame. */
export const horizontalVideos: Video[] = [
  { youtubeId: "6IbsE61cyyE", category: "Coaching & personal development", detail: "Long-form educational" },
  { youtubeId: "Jo0YbBiOFXA", category: "Creative brand showcase", detail: "Brand & business features" },
  { youtubeId: "PAuH2IVRDuw", category: "Real estate", detail: "Success stories & insights" },
  { youtubeId: "DT_P30OfAWk", category: "Real estate", detail: "Success stories & insights" },
];

export type Collection = {
  slug: string;
  title: string;
  /** Complete archive on Google Drive — secondary to the in-page gallery. */
  driveUrl: string;
  count: number;
  ext: "png" | "jpg";
};

export const collections: Collection[] = [
  {
    slug: "brand-kits",
    title: "Brand kits",
    driveUrl: "https://drive.google.com/drive/folders/1mOlJHphbmGiQ8EAlJnQzYMQ3NTUu-kdM",
    count: 4,
    ext: "jpg",
  },
  {
    slug: "digital-book",
    title: "Digital book and toolkit",
    driveUrl: "https://drive.google.com/file/d/17ptzS2M02DLKIjMt96ENOOQfAAsbWKpU/view",
    count: 8,
    ext: "png",
  },
  {
    slug: "card-deck",
    title: "Full card deck",
    driveUrl: "https://drive.google.com/drive/folders/1gprml3qv8SJzkKxgCKyBkjOtwVpDmcFW",
    count: 7,
    ext: "png",
  },
  {
    slug: "scripture-card",
    title: "Scripture card",
    driveUrl: "https://drive.google.com/drive/folders/1D0bd_OP4E73Hf2O-y_kgMIQjGvoltj3J",
    count: 8,
    ext: "png",
  },
  {
    slug: "magazines",
    title: "Magazines",
    driveUrl: "https://drive.google.com/drive/folders/1Sx-484IxiO2JKLulTi3dmKAmaaEupR1a",
    count: 4,
    ext: "png",
  },
  {
    slug: "digital-marketing",
    title: "Digital marketing",
    driveUrl: "https://drive.google.com/drive/folders/1VNsVpYFc1EF9B-Co5b81PphenlPeV_N9",
    count: 8,
    ext: "png",
  },
  {
    slug: "social-thumbnails",
    title: "Social media thumbnails",
    driveUrl: "https://drive.google.com/drive/folders/13hagqc4OrhrugLd5IL2GIAufzmnGfXKf",
    count: 6,
    ext: "png",
  },
];

export function imagesOf(c: Collection) {
  return Array.from({ length: c.count }, (_, i) => ({
    src: `/media/${c.slug}-${i + 1}.${c.ext}`,
    alt: `${c.title} — ${person.name}, piece ${i + 1} of ${c.count}`,
  }));
}

export const capabilities = [
  "Brand & visual identity",
  "Graphic & marketing design",
  "Video editing & motion graphics",
  "Web & landing page design",
  "Motion & AI creative",
  "Publication & digital design",
];

export const about = {
  heading: "Who I am and what I do",
  paragraphs: [
    "I'm Jonji Jose Coronel, a Multimedia Designer specializing in Graphic Design and Video Editing. I create visual content for brands, businesses, and clients across different industries and creative needs.",
    "My experience covers a variety of projects, including brand identities, logos, marketing materials, social media content, product designs, publications, website assets, short-form and long-form videos, advertisements, YouTube content, tutorials, and talking-head videos.",
    "I enjoy turning ideas and creative briefs into visual content that is clear, engaging, and aligned with the brand and its message. I also enjoy exploring new tools and creative approaches to improve the way I work and bring ideas to life.",
  ],
};

export const contact = {
  heading: "Get in touch",
  body: "For project inquiries, creative collaborations, and professional opportunities, I am available to discuss your requirements and explore how my multimedia design and video editing experience can support your goals.",
};
