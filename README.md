# Portfolio — 3D Animated, Production-Ready

A minimal, editorial portfolio for a web designer, built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, an interactive **Three.js / React Three Fiber** hero, smooth scrolling (Lenis) and tasteful motion (Framer Motion). Includes a working, spam-protected **contact form with a backend API**.

## ✨ Features

- **Interactive 3D hero** — a live particle sphere that follows the cursor (R3F + Three.js).
- **Editorial, minimal design** — warm paper palette, serif display type, generous whitespace, film-grain texture.
- **Signature motion** — word-by-word heading reveals, magnetic buttons, custom cursor, reveal-on-scroll, smooth scrolling.
- **Projects showcase** — featured grid on the home page, full `/projects` listing and rich `/projects/[slug]` case-study pages (statically generated).
- **Working contact form** — client + server validation (Zod), honeypot + rate-limit spam protection, email delivery via Resend.
- **Production-ready** — SEO metadata, Open Graph, `sitemap.xml`, `robots.txt`, accessibility (skip link, reduced-motion support, semantic markup), responsive across all breakpoints.

## 🧱 Tech Stack

| Area        | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + React 19                 |
| Styling     | Tailwind CSS v4 (CSS-first config in `globals.css`)|
| 3D          | Three.js · @react-three/fiber · @react-three/drei  |
| Motion      | Framer Motion (`motion`) · GSAP · Lenis            |
| Backend     | Next.js Route Handlers · Zod · Resend              |
| Icons       | lucide-react                                       |

## 🚀 Getting Started

```bash
# 1. Install dependencies (already done if you ran the scaffold)
npm install

# 2. Set up environment variables
cp .env.example .env.local
# then edit .env.local (see below)

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable               | Purpose                                                        |
| ---------------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`       | Contact-form email delivery. Free key at resend.com. Optional in dev — without it, submissions log to the server console. |
| `CONTACT_TO_EMAIL`     | Where enquiries are delivered.                                |
| `CONTACT_FROM_EMAIL`   | The "from" address (verify your domain in Resend for production). |
| `NEXT_PUBLIC_SITE_URL` | Your live URL — used for canonical links, sitemap and OG tags.|

## 🗂️ Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, nav/footer, smooth scroll
│   ├── page.tsx                # Home (Hero, Work, About, Services, Contact)
│   ├── globals.css             # Design tokens + Tailwind v4 theme
│   ├── projects/
│   │   ├── page.tsx            # /projects — all work
│   │   └── [slug]/page.tsx     # Case-study detail (static generated)
│   ├── api/contact/route.ts    # Backend: validate + rate-limit + email
│   ├── sitemap.ts · robots.ts  # SEO
│   └── not-found.tsx           # 404
├── components/
│   ├── three/                  # HeroCanvas, ParticleSphere (WebGL)
│   ├── layout/                 # Navbar, Footer, SmoothScroll
│   ├── sections/               # Hero, About, Services, FeaturedWork, Contact
│   └── ui/                     # Button, Magnetic, Cursor, Reveal, Marquee, AnimatedHeading, ProjectCard, ContactForm
└── lib/
    ├── site.ts                 # ← Your name, role, socials, nav (edit this first)
    ├── projects.ts             # ← Your case studies
    ├── validation.ts           # Shared contact schema
    └── utils.ts
```

## ✏️ Make It Yours

1. **`src/lib/site.ts`** — name, role, tagline, location, email, social links, availability.
2. **`src/lib/projects.ts`** — replace the sample projects with your real case studies. Add cover images to `public/projects/…` and set `cover` / `gallery`.
3. **Colors & type** — tweak the tokens at the top of `src/app/globals.css` (`--color-accent`, `--color-paper`, etc.). Swap the display font in `src/app/layout.tsx`.
4. **Hero 3D** — adjust particle counts / colors in `src/components/three/ParticleSphere.tsx`.
5. **Favicon / OG image** — replace `src/app/favicon.ico`; add an `opengraph-image.png` in `src/app/` for rich social cards.

## 🏗️ Build & Deploy

```bash
npm run build   # production build
npm run start   # run the production server locally
```

Deploy to **Vercel** (recommended — zero config for Next.js): push to GitHub, import the repo, add the env vars from `.env.local`, deploy. Works on any Node host that supports Next.js 16.

## ♿ Accessibility & Performance

- Respects `prefers-reduced-motion` (animations and smooth scroll degrade gracefully).
- Keyboard-accessible nav, skip-to-content link, focus-visible styles, semantic landmarks.
- 3D scene is client-only and lazy-loaded so it never blocks first paint.

---

Designed & built with care · Next.js + Three.js
