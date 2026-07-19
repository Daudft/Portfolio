import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

/** Small photo pill sitting inline with the heading text. */
function Chip({
  src,
  alt,
  position = "50% 25%",
  fit = "cover",
  zoom,
}: {
  src: string;
  alt: string;
  /** object-position — where the face is in the photo */
  position?: string;
  /** "contain" shows the whole photo (for tight headshots on plain bg) */
  fit?: "cover" | "contain";
  /** With "contain": magnify a bit past whole-photo, anchored on the face */
  zoom?: number;
}) {
  return (
    <span className="relative mx-1.5 inline-block h-[1em] w-[2em] -translate-y-[0.08em] overflow-hidden rounded-full bg-white align-middle shadow-[0_8px_20px_-8px_rgba(20,19,16,0.4)] transition-transform duration-300 ease-out hover:-rotate-6 hover:scale-110">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="8rem"
        style={{
          objectFit: fit,
          objectPosition: fit === "contain" ? "50% 50%" : position,
          transform: zoom ? `scale(${zoom})` : undefined,
          transformOrigin: position,
        }}
      />
    </span>
  );
}

/**
 * About: the whole story as one full-screen statement heading, with all
 * four growing-up photos embedded inline as chips.
 */
export function About() {
  return (
    <section
      id="about"
      className="flex min-h-svh scroll-mt-24 flex-col justify-center py-16"
    >
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-10 text-center">About me</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display mx-auto max-w-6xl text-center text-[2.6rem] leading-[1.25] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Yes, that&rsquo;s really me
            <Chip
              src="/childhood.webp"
              alt="Daud as a kid in a red shirt, studio print from Lahore"
              position="50% 16%"
            />
            — {site.location.split(",")[0]}, early 2000s. The kid in the red
            shirt
            <Chip
              src="/teen.webp"
              alt="Teenage Daud in a Chelsea kit holding an orange football"
              position="56% 14%"
            />
            grew up obsessing over details
            <Chip
              src="/now.webp"
              alt="Daud at golden hour in a denim shirt"
              position="46% 24%"
            />
            nobody notices — and today I&rsquo;m {site.name}
            <Chip
              src="/portrait.webp"
              alt="Studio portrait of Daud today"
              fit="contain"
              zoom={1.45}
              position="50% 28%"
            />
            turning quiet ideas into{" "}
            <span className="italic text-accent">
              websites that speak — and sell.
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
