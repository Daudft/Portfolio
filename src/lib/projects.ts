export type Project = {
  slug: string;
  title: string;
  /** Short label shown on the card, e.g. "Brand & Web" */
  category: string;
  year: string;
  /** One-sentence summary used on cards + detail hero */
  summary: string;
  /** Full role / contribution */
  role: string[];
  /** Longer narrative paragraphs for the case study */
  overview: string[];
  services: string[];
  /** Optional external live link */
  liveUrl?: string;
  /** Accent used on the card + detail hero (any valid CSS color) */
  color: string;
  /**
   * Cover + gallery images. Put files in /public/projects/... and reference
   * them here. Placeholder gradients render until you add real images.
   */
  cover?: string;
  gallery?: string[];
  featured?: boolean;
  metrics?: { label: string; value: string }[];
};

/**
 * Your case studies. Replace with real work.
 * `featured: true` surfaces the project on the home page.
 */
export const projects: Project[] = [
  {
    slug: "lumen-studio",
    title: "Lumen Studio",
    category: "Brand & Website",
    year: "2025",
    summary:
      "A full identity and website for an independent architecture studio — restraint, grid, and a lot of white space.",
    role: ["Art Direction", "UI/UX Design", "Webflow Build"],
    overview: [
      "Lumen is a boutique architecture practice that needed a digital home as considered as their buildings. We stripped everything back to type, grid and photography, letting the work breathe.",
      "The result is a quiet, confident site where each project is treated like a print spread — deliberate pacing, generous margins, and motion that only ever supports the content.",
    ],
    services: ["Brand Identity", "Web Design", "Art Direction", "Development"],
    liveUrl: "https://example.com",
    color: "#c2410c",
    featured: true,
    metrics: [
      { label: "Bounce rate", value: "-38%" },
      { label: "Avg. session", value: "3.4m" },
      { label: "Awards", value: "2" },
    ],
  },
  {
    slug: "atlas-fintech",
    title: "Atlas",
    category: "Product Design",
    year: "2025",
    summary:
      "Design system and marketing site for a fintech startup, built to make a complex product feel effortless.",
    role: ["Design System", "Product UI", "Front-end"],
    overview: [
      "Atlas needed a language that could scale across a dense product and a bold marketing story. We built a token-driven design system and a marketing site that turns numbers into narrative.",
      "Every component was designed for accessibility first, then refined with micro-interactions that make the interface feel alive without getting in the way.",
    ],
    services: ["Design System", "Product Design", "Development"],
    liveUrl: "https://example.com",
    color: "#1f6f5c",
    featured: true,
    metrics: [
      { label: "Components", value: "120+" },
      { label: "Signup lift", value: "+52%" },
      { label: "WCAG", value: "AA" },
    ],
  },
  {
    slug: "form-and-field",
    title: "Form & Field",
    category: "E-commerce",
    year: "2024",
    summary:
      "A slow-fashion storefront where the shopping experience feels like flipping through a beautifully bound catalogue.",
    role: ["Creative Direction", "UX", "Shopify Build"],
    overview: [
      "Form & Field make objects meant to last. The store had to feel tactile and unhurried, the opposite of the usual e-commerce noise.",
      "We designed an editorial storefront with a custom cart, considered typography, and imagery given room to speak — commerce that respects the craft.",
    ],
    services: ["E-commerce", "Art Direction", "Development"],
    liveUrl: "https://example.com",
    color: "#4c3d8f",
    featured: true,
    metrics: [
      { label: "Conversion", value: "+61%" },
      { label: "AOV", value: "+24%" },
      { label: "Return rate", value: "-12%" },
    ],
  },
  {
    slug: "north-journal",
    title: "North Journal",
    category: "Editorial",
    year: "2024",
    summary:
      "A digital magazine for a design collective — long-form reading that feels good on every screen.",
    role: ["Editorial Design", "Front-end"],
    overview: [
      "North Journal publishes essays on design and place. We built a reading experience tuned for focus — measured line lengths, a considered type scale, and a dark reading mode.",
      "Motion is nearly invisible, appearing only to guide the eye between sections.",
    ],
    services: ["Editorial Design", "Web Design", "Development"],
    color: "#b45309",
    featured: false,
    metrics: [
      { label: "Read time", value: "+2.1m" },
      { label: "Subscribers", value: "8.2k" },
    ],
  },
  {
    slug: "cadence-app",
    title: "Cadence",
    category: "Mobile Product",
    year: "2023",
    summary:
      "Brand and interface for a habit app that nudges gently instead of shouting.",
    role: ["Brand", "Product Design"],
    overview: [
      "Cadence helps people build habits without the guilt. The design language is soft, warm and encouraging — a calm counterpoint to the loud productivity space.",
      "We shipped a full component library and an animated onboarding that sets the tone from the first tap.",
    ],
    services: ["Brand Identity", "Product Design"],
    color: "#0f766e",
    featured: false,
    metrics: [
      { label: "D30 retention", value: "+34%" },
      { label: "App Store", value: "4.8★" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectNav(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  return { prev, next };
}
