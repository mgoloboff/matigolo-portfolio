import React from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

const projects = [
  {
    slug: "real-time-reports",
    company: "Browsi",
    tags: ["Data Visualization", "Complex Systems"],
    title: "From Data to Actionable Insights",
    description:
      "Deliver Real-time SaaS analytics platform that turns complex data into clear insights- helping teams decide faster and with confidence",
    metrics: [
      { value: "3", label: "Clients landed" },
      { value: "83%", label: "Users migrated" },
      { value: "−25%", label: "Excel workarounds" },
    ],
    thumbnail: "/real-time-reports-hero.png",
    imageAlt: "Real-Time Reports Analytics System",
    imagePosition: "right" as const,
  },
  {
    slug: "revenue-dashboard",
    company: "Browsi",
    tags: ["Revenue Intelligence", "Enterprise"],
    title: "Revenue Overview Dashboard",
    description:
      "Comprehensive revenue dashboard that enable managers to track growth and identify opportunities",
    metrics: [
      { value: "300+", label: "Sites monitored" },
      { value: "100%", label: "Day-one adoption" },
      { value: "4 min", label: "To revenue clarity" },
    ],
    thumbnail: "/revenue-dashboard-hero.png",
    imageAlt: "Revenue Overview Dashboard",
    imagePosition: "left" as const,
  },
  {
    slug: "agentic-copilot",
    company: "Browsi",
    tags: ["AI/UX", "Automation"],
    title: "AI Agentic Co-Pilot for Sales Growth",
    description:
      "An AI co-pilot that handles repetitive admin so sales teams can focus on what actually drives revenue - Relationships.",
    metrics: [],
    thumbnail: "/agentic-copilot-hero.png",
    imageAlt: "Agentic Co-pilot",
    imageFit: "contain" as const,
    imagePosition: "right" as const,
    inProgress: true,
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 pt-[88px] pb-14">
        <h1
          className="font-display text-[clamp(80px,10.5vw,140px)] font-extrabold leading-[0.90] tracking-[-0.04em] text-[var(--fg)]"
        >
          Turning
          <br />
          Complex
          <br />
          into{" "}
          <span className="relative inline-block">
            clarity.
            <span
              className="absolute left-0 right-0 bottom-[10%] h-[34%] bg-[var(--highlight)] -z-1 rounded-[2px] rotate-[-1.5deg]"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p className="mt-6 font-mono text-[14px] text-[var(--muted)] tracking-[0.01em]">
          Product Designer · 5+ years · B2B SaaS · Complex Systems
        </p>

        <a
          href="#work"
          className="inline-flex items-center gap-2 mt-8 px-[26px] py-4 bg-[var(--accent)] text-[var(--bg)] font-mono font-bold text-[14px] rounded-full hover:opacity-90 transition-opacity"
        >
          See the work ↓
        </a>
      </section>

      {/* Skills Marquee */}
      <Marquee />

      {/* Selected Work */}
      <section id="work" className="max-w-[1280px] mx-auto px-6 md:px-10 pt-20 pb-24">
        <h2 className="font-display text-[clamp(32px,5vw,48px)] font-extrabold tracking-[-0.02em] mb-12">
          Selected work
        </h2>

        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <Footer />
    </>
  );
}

function ProjectCard({
  slug,
  company,
  tags,
  title,
  description,
  metrics,
  thumbnail,
  imageAlt,
  imageFit = "cover",
  imagePosition,
  inProgress,
}: {
  slug: string;
  company: string;
  tags: string[];
  title: string;
  description: React.ReactNode;
  metrics: { value: string; label: string }[];
  thumbnail?: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  imagePosition: "left" | "right";
  inProgress?: boolean;
}) {
  const card = (
    <div className={`group relative ${!inProgress ? "cursor-pointer" : ""}`}>
      {/* Accent bar — in DOM before article so article stacks on top naturally */}
      {!inProgress && (
        <div className="absolute left-[10px] right-[10px] -bottom-[4px] h-[20px] bg-[var(--accent)] rounded-b-[22px] opacity-0 group-hover:opacity-100" />
      )}

      <article
        className="relative bg-[var(--card-bg)] rounded-[26px] border-2 border-[var(--fg)] overflow-hidden"
      >
        <div
          className={`flex flex-col ${
            imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* Text side */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 font-mono text-[11px] rounded-full border border-[var(--fg)] text-[var(--fg)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="font-display text-[clamp(22px,3vw,32px)] font-extrabold leading-[1.15] tracking-[-0.02em] mb-4">
              {title}
            </h3>

            {/* Description */}
            <p className="font-sans text-[15px] text-[var(--muted)] leading-[1.65] mb-6">
              {description}
            </p>

            {/* Metrics */}
            {metrics.length > 0 && (
              <div className="flex gap-8 mb-6">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-[clamp(18px,2.5vw,26px)] font-extrabold text-[var(--green)]">
                      {m.value}
                    </p>
                    <p className="font-mono text-[11px] text-[var(--muted)]">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {inProgress ? (
              <p className="font-mono text-[14px] text-[var(--muted)]">Case study in progress</p>
            ) : (
              <p className="font-mono text-[14px] text-[var(--fg)] font-bold underline underline-offset-4 decoration-[var(--accent)] decoration-2">Read the full case study →</p>
            )}
          </div>

          {/* Image side */}
          <div className={`flex-1 relative min-h-[300px] md:min-h-[400px] bg-[#eeeff0] ${imageFit === "contain" ? "p-6" : ""}`}>
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                style={imageFit === "contain" ? { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.04))" } : undefined}
                className={`${imageFit === "contain" ? "object-contain p-10" : "object-cover"} object-center`}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--highlight)] animate-pulse" />
                  <span className="font-sans text-[13px] text-[var(--muted)]">
                    In progress
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

    </div>
  );

  if (inProgress) return card;
  return <Link href={`/projects/${slug}`}>{card}</Link>;
}
