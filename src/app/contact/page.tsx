import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me about your project — I'll reply within a couple of days.",
};

export default function ContactPage() {
  return (
    <>
      {/* Minimal chrome: just the wordmark as a way back home */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-x flex h-16 items-center md:h-20">
          <Link href="/" className="font-display text-lg tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </Link>
        </div>
      </header>

      <main>
        <Contact />
      </main>
    </>
  );
}
