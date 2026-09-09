import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Real-Time Reports Analytics System · Matias Goloboff",
};

const impacts = [
  { metric: "TBD", label: "Key metric 1" },
  { metric: "TBD", label: "Key metric 2" },
  { metric: "TBD", label: "Key metric 3" },
];

export default function RealTimeReports() {
  return (
    <article className="px-6 md:px-12 max-w-4xl mx-auto w-full pb-24">
      {/* Back */}
      <div className="pt-10 pb-8">
        <Link href="/" className="text-[13px] text-[#6b6b6b] hover:text-[#111111] transition-colors">
          ← Projects
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12">
        <p className="text-[12px] uppercase tracking-widest text-[#aaa] mb-3">
          Analytics · B2B SaaS
        </p>
        <h1 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-tight text-[#111111] mb-4">
          Real-Time Reports Analytics System
        </h1>
        <p className="text-[18px] text-[#6b6b6b] leading-relaxed max-w-2xl">
          B2B SaaS became a strategic priority, but internal tools proved unfit for external users.
          We designed a real-time analytics platform that unifies performance data, enabling faster,
          data-driven decisions.
        </p>
      </header>

      {/* Hero image placeholder */}
      <div className="w-full aspect-video bg-[#f2f2ef] rounded-2xl mb-16 flex items-center justify-center">
        <span className="text-[13px] text-[#aaa]">Hero image / mockup</span>
      </div>

      {/* Impact */}
      <section className="mb-16">
        <h2 className="text-[13px] uppercase tracking-widest text-[#aaa] mb-6">Impact</h2>
        <div className="grid grid-cols-3 gap-6">
          {impacts.map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-[#e8e8e4] p-6">
              <p className="text-[28px] font-semibold text-[#111111] mb-1">{item.metric}</p>
              <p className="text-[13px] text-[#6b6b6b]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <Section title="The Problem">
        <p>
          [Describe what was broken — the internal tool, who was affected, and why it mattered to the
          business. Keep it in plain language from the user&apos;s perspective.]
        </p>
      </Section>

      {/* Research */}
      <Section title="Research & Discovery">
        <p>
          [What did you learn? How did you learn it? Mention interviews, surveys, data analysis.
          Include specific insights that changed the direction of the design.]
        </p>
        <ImagePlaceholder label="Research insights / affinity map" />
      </Section>

      {/* Complexity & Decisions — the differentiating section */}
      <Section title="Complexity & Design Decisions">
        <p className="text-[#111111] font-medium mb-4">What made this hard:</p>
        <p className="mb-6">
          [Describe the real complexity — data architecture, competing stakeholder needs,
          edge cases, performance constraints. Be specific.]
        </p>

        <p className="text-[#111111] font-medium mb-4">Key trade-offs made:</p>
        <ul className="space-y-3 list-none">
          <li className="pl-4 border-l-2 border-[#e8e8e4] text-[#444444]">
            [Trade-off 1 — what you chose and what you gave up, and why]
          </li>
          <li className="pl-4 border-l-2 border-[#e8e8e4] text-[#444444]">
            [Trade-off 2]
          </li>
          <li className="pl-4 border-l-2 border-[#e8e8e4] text-[#444444]">
            [Trade-off 3]
          </li>
        </ul>
      </Section>

      {/* Process */}
      <Section title="Design Process">
        <ImagePlaceholder label="User flow / wireframes" />
        <p className="mt-6">
          [Walk through the key design decisions. Show iterations. Explain what changed and why —
          not just what the final solution looks like.]
        </p>
        <ImagePlaceholder label="Final screens" />
      </Section>

      {/* Takeaways */}
      <Section title="Key Takeaways">
        <p>
          [What would you do differently? What did you learn? What surprised you?
          One honest paragraph here is worth more than five bullet points.]
        </p>
      </Section>

      {/* Next project */}
      <div className="mt-20 pt-8 border-t border-[#e8e8e4]">
        <p className="text-[12px] uppercase tracking-widest text-[#aaa] mb-3">Next project</p>
        <Link href="/projects/revenue-dashboard" className="text-[22px] font-semibold text-[#111111] hover:opacity-60 transition-opacity">
          Revenue Overview Dashboard →
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-[13px] uppercase tracking-widest text-[#aaa] mb-5">{title}</h2>
      <div className="text-[16px] text-[#444444] leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full aspect-video bg-[#f2f2ef] rounded-xl flex items-center justify-center my-6">
      <span className="text-[13px] text-[#aaa]">{label}</span>
    </div>
  );
}
