import Link from "next/link";

const projects = [
  {
    slug: "real-time-reports",
    title: "Real-Time Reports Analytics System",
    description:
      "B2B SaaS analytics platform that unifies performance data, enabling faster, data-driven decisions at scale.",
    tag: "Analytics · B2B SaaS",
    status: "live" as const,
  },
  {
    slug: "revenue-dashboard",
    title: "Revenue Overview Dashboard",
    description:
      "Comprehensive revenue dashboard enabling publishers to track trends and optimize monetization across dozens of sites.",
    tag: "Dashboard · B2B SaaS",
    status: "live" as const,
  },
  {
    slug: "agentic-copilot",
    title: "Agentic Co-pilot",
    description:
      "Designed an AI Agentic Co-Pilot to Automate Admin and Drive Sales Revenue.",
    tag: "AI Product · Agent UX",
    status: "progress" as const,
  },
];

export default function Home() {
  return (
    <div className="px-6 md:px-12 max-w-5xl mx-auto w-full">
      {/* Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="text-[13px] uppercase tracking-widest text-[#6b6b6b] mb-5">
          Product Designer · B2B Systems
        </p>
        <h1 className="text-[42px] md:text-[60px] font-semibold leading-[1.1] tracking-tight text-[#111111] max-w-3xl">
          I turn complex B2B products into experiences that finally make sense.
        </h1>
        <p className="mt-6 text-[17px] text-[#6b6b6b] max-w-xl leading-relaxed">
          5 years designing complex systems for B2B SaaS. Specialist in turning multi-stakeholder
          data products into intuitive, decision-ready experiences.
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({
  slug,
  title,
  description,
  tag,
  status,
}: {
  slug: string;
  title: string;
  description: string;
  tag: string;
  status: "live" | "progress";
}) {
  const isProgress = status === "progress";

  const card = (
    <div
      className={`group relative bg-white rounded-2xl border border-[#e8e8e4] overflow-hidden transition-all duration-200 ${
        !isProgress ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer" : "opacity-80"
      }`}
    >
      {/* Thumbnail placeholder */}
      <div className="w-full aspect-[4/3] bg-[#f2f2ef] flex items-center justify-center relative">
        <span className="text-[13px] text-[#aaa]">
          {isProgress ? "Coming soon" : title.slice(0, 1)}
        </span>
        {isProgress && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f2f2ef]">
            <span className="text-[13px] text-[#6b6b6b] font-medium tracking-wide">
              In progress
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-[12px] text-[#aaa] mb-2 uppercase tracking-wider">{tag}</p>
        <h2 className="text-[17px] font-semibold text-[#111111] leading-snug mb-2">{title}</h2>
        <p className="text-[14px] text-[#6b6b6b] leading-relaxed">{description}</p>
      </div>
    </div>
  );

  if (isProgress) return card;
  return <Link href={`/projects/${slug}`}>{card}</Link>;
}
