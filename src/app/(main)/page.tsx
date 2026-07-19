import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { StickyCover } from "@/components/ui/StickyCover";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Everything below rides up and covers the pinned hero */}
      <div className="relative z-10 rounded-t-3xl bg-paper shadow-[0_-30px_60px_-30px_rgba(20,19,16,0.28)]">
        {/* Sheet 1: marquee + selected work — pins once fully scrolled */}
        <StickyCover>
          <Marquee
            items={[
              "Design",
              "Development",
              "Brand",
              "Motion",
              "Strategy",
              "Art Direction",
            ]}
            className="border-y border-line py-5 font-display text-2xl text-ink/70 sm:text-3xl"
          />
          <FeaturedWork />
        </StickyCover>

        {/* Sheet 2: about — covers the pinned work section, then pins itself */}
        <div className="relative z-10 rounded-t-3xl bg-paper shadow-[0_-30px_60px_-30px_rgba(20,19,16,0.28)]">
          <StickyCover>
            <About />
          </StickyCover>

          {/* Sheet 3: services — covers the pinned about, then pins itself */}
          <div className="relative z-10 rounded-t-3xl bg-paper shadow-[0_-30px_60px_-30px_rgba(20,19,16,0.28)]">
            <StickyCover>
              <Services />
            </StickyCover>

            {/* Sheet 4: process — covers the pinned services, then pins itself */}
            <div className="relative z-10 rounded-t-3xl bg-paper shadow-[0_-30px_60px_-30px_rgba(20,19,16,0.28)]">
              <StickyCover>
                <Process />
              </StickyCover>

              {/* Sheet 5: reviews onward — rides up over the pinned process */}
              <div className="relative z-10 rounded-t-3xl bg-paper shadow-[0_-30px_60px_-30px_rgba(20,19,16,0.28)]">
                <Testimonials />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
