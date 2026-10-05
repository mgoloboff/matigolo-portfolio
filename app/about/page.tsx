import type { Metadata } from "next";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ToolkitMarquee from "@/components/ToolkitMarquee";

export const metadata: Metadata = {
  title: "About · Matias Goloboff",
  description: "Product Designer specializing in complex B2B systems.",
};

export default function About() {
  return (
    <>
      <Nav />
    <div className="px-6 md:px-12 max-w-5xl mx-auto w-full">
      <div className="pt-16 pb-24 md:pt-24">
        <p className="text-[13px] uppercase tracking-widest text-[#6b6b6b] mb-6">
          About
        </p>

        <h1 className="font-display text-[clamp(48px,8vw,96px)] font-extrabold leading-[1.0] tracking-[-0.03em] text-[var(--fg)] mb-14">
          I&apos;m Matias<em className="not-italic text-[var(--accent)]" style={{fontStyle:"italic"}}>.</em>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-16 items-start">
          {/* Text */}
          <div className="space-y-6 max-w-xl">
            <p className="text-[24px] leading-snug font-semibold text-[#111111]">
              I&apos;m fascinated by how people think and decide. That&apos;s what drives me to
              build systems that actually feel simple to use.
            </p>

            <p className="text-[17px] leading-relaxed text-[#444444]">
              My core strength is{" "}
              <strong className="text-[#111111]">simplifying complexity</strong>. I specialize in
              B2B products with deep information architecture - systems where the decisions behind
              the design are as important as the pixels. I work closely with product and engineering,
              and my background in coding and robotics means I speak their language.
            </p>

            <p className="text-[17px] leading-relaxed text-[#444444]">
              I believe good design starts with <strong className="text-[#111111]">listening</strong>
              {" "}- not only to users, but to everyone building the product. Discovery is where the
              real design happens.
            </p>

            <div className="pt-4 border-t border-[#e8e8e4]">
              <p className="text-[16px] leading-relaxed text-[#444444]">
                I moved to Israel from Argentina as a kid, but never left my roots behind -
                especially not when there are empanadas, alfajores, or anything involving dulce de
                leche on the table (seriously, try it on toast). In recent years, I&apos;ve been
                living in Tel Aviv. Outside of work, you&apos;ll likely find me swimming.
              </p>
            </div>
          </div>

          {/* Photo */}
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[3/4] bg-[#e8e8e4] rounded-2xl overflow-hidden relative">
              <img
                src="/photo.jpg"
                alt="Matias Goloboff"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%" }}
              />
            </div>
          </div>
        </div>


      </div>

        <div className="pb-24">
          <ToolkitMarquee />
        </div>
    </div>
      <Footer />
    </>
  );
}
