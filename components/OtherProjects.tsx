import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";

export default function OtherProjects({ currentSlug }: { currentSlug: string }) {
  const others = projects.filter((p) => p.slug !== currentSlug);

  return (
    <section className="mt-24 w-full max-w-[999px]">
      <div className="mb-10">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-[var(--fg)]">
          Thanks for reading all the way through
        </h2>
        <p className="mt-2 font-sans text-[16px] text-[var(--muted)]">
          Want to take a look at another project?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {others.map((project) => {
          const card = (
            <div className={`group relative h-full ${!project.inProgress ? "cursor-pointer" : ""}`}>
              {!project.inProgress && (
                <div className="absolute left-[8px] right-[8px] -bottom-[3px] h-[16px] bg-[var(--accent)] rounded-b-[18px] opacity-0 group-hover:opacity-100" />
              )}

              <article className="relative bg-[var(--card-bg)] rounded-[22px] border-2 border-[var(--fg)] overflow-hidden flex flex-col h-full">
                {/* Text */}
                <div className="p-6 pb-4 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 font-mono text-[11px] rounded-full border border-[var(--fg)] text-[var(--fg)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-[clamp(18px,2.5vw,24px)] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3">
                    {project.title}
                  </h3>

                  <p className="font-sans text-[14px] text-[var(--muted)] leading-[1.6] mb-4">
                    {project.description}
                  </p>

                  {project.inProgress ? (
                    <p className="font-mono text-[13px] text-[var(--muted)] mt-auto">Case study in progress</p>
                  ) : (
                    <p className="font-mono text-[13px] text-[var(--fg)] font-bold underline underline-offset-4 decoration-[var(--accent)] decoration-2 mt-auto">
                      Read case study →
                    </p>
                  )}
                </div>

                {/* Image */}
                <div className={`relative w-full aspect-[16/10] bg-[#eeeff0] ${project.imageFit === "contain" ? "p-4" : ""}`}>
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      style={project.imageFit === "contain" ? { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.04))" } : undefined}
                      className={`${project.imageFit === "contain" ? "object-contain p-6" : "object-cover"} object-center`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--highlight)] animate-pulse" />
                        <span className="font-sans text-[13px] text-[var(--muted)]">In progress</span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>
          );

          if (project.inProgress) return <div key={project.slug} className="h-full">{card}</div>;
          return (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="h-full block">
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
