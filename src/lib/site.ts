/**
 * Single source of truth for your identity, links and SEO.
 * Change these values — everything on the site reads from here.
 */
export const site = {
  name: "Daud Afzal",
  role: "Web Designer & Creative Developer",
  // Short one-liner used in the hero + meta description
  tagline:
    "I help ambitious brands look extraordinary online — editorial design, cinematic motion, and conversion-first thinking in every pixel.",
  location: "Lahore, Pakistan",
  email: "devdaud6@gmail.com",
  // Used to build absolute URLs (sitemap, Open Graph). Reads NEXT_PUBLIC_SITE_URL
  // when set (see .env.example), otherwise falls back to this default.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://daudafzal.dev",

  // Availability banner in the nav / footer
  availableForWork: true,
  availabilityLabel: "Available for select projects — 2026",

  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/", handle: "in/you" },
    { label: "GitHub", href: "https://github.com/", handle: "@you" },
  ],

  // Primary navigation
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type SocialLink = (typeof site.socials)[number];
