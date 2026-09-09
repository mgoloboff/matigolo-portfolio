import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Matias Goloboff",
  description: "Product Designer specializing in complex B2B systems.",
};

export default function About() {
  return (
    <div className="px-6 md:px-12 max-w-5xl mx-auto w-full">
      <div className="pt-16 pb-24 md:pt-24">
        <h1 className="text-[13px] uppercase tracking-widest text-[#6b6b6b] mb-12">
          About me
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-16 items-start">
          {/* Text */}
          <div className="space-y-6 max-w-xl">
            <p className="text-[19px] leading-relaxed text-[#111111]">
              My psychology background isn&apos;t decoration — it&apos;s the core of how I design.
              I&apos;m fascinated by how people think, decide, and get confused. That&apos;s what
              drives me to build systems that actually feel simple to use.
            </p>

            <p className="text-[17px] leading-relaxed text-[#444444]">
              I think about <strong className="text-[#111111]">humans</strong>, not users. People
              with thoughts, emotions, and mental models — not abstract personas. My job is to get
              inside their head: understand what they need, where they expect things to be, and what
              the next action should feel like.
            </p>

            <p className="text-[17px] leading-relaxed text-[#444444]">
              My core strength is{" "}
              <strong className="text-[#111111]">simplifying complexity</strong>. I specialize in
              B2B products with deep information architecture — systems where the decisions behind
              the design are as important as the pixels. I work closely with product and engineering,
              and my background in coding and robotics means I speak their language.
            </p>

            <p className="text-[17px] leading-relaxed text-[#444444]">
              I believe good design starts with listening — not only to users, but to everyone
              building the product. Discovery is where the real design happens.
            </p>

            <div className="pt-4 border-t border-[#e8e8e4]">
              <p className="text-[16px] leading-relaxed text-[#444444]">
                I moved to Israel from Argentina as a kid, but never left my roots behind —
                especially not when there are empanadas, alfajores, or anything involving dulce de
                leche on the table (seriously, try it on toast). In recent years, I&apos;ve been
                living in Tel Aviv. Outside of work, you&apos;ll likely find me swimming.
              </p>
            </div>
          </div>

          {/* Photo */}
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[3/4] bg-[#e8e8e4] rounded-2xl overflow-hidden relative">
              {/* Replace src with your actual photo */}
              <img
                src="/photo.jpg"
                alt="Matias Goloboff"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%" }}
              />
            </div>

            {/* Quick facts */}
            <div className="space-y-3">
              <Fact label="Background" value="Psychology & HCI" />
              <Fact label="Speciality" value="Complex B2B Systems" />
              <Fact label="Based in" value="Tel Aviv" />
              <Fact label="Contact" value="matigolo@gmail.com" href="mailto:matigolo@gmail.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fact({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[13px] text-[#aaa] w-24 shrink-0 pt-0.5">{label}</span>
      {href ? (
        <a href={href} className="text-[14px] text-[#111111] hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-[14px] text-[#111111]">{value}</span>
      )}
    </div>
  );
}
