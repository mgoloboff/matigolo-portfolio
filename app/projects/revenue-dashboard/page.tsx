import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Revenue Overview Dashboard · Matias Goloboff",
};

const impacts = [
  { metric: "TBD", label: "Key metric 1" },
  { metric: "TBD", label: "Key metric 2" },
  { metric: "TBD", label: "Key metric 3" },
];

export default function RevenueDashboard() {
  return (
    <article className="px-6 md:px-12 max-w-4xl mx-auto w-full pb-24">
      <div className="pt-10 pb-8">
        <Link href="/" className="text-[13px] text-[#6b6b6b] hover:text-[#111111] transition-colors">
          ← Projects
        </Link>
      </div>

      <header className="mb-12">
        <p className="text-[12px] uppercase tracking-widest text-[#aaa] mb-3">
          Dashboard · B2B SaaS
        </p>
        <h1 className="text-[36px] md:text-[48px] font-semibold leading-tight tracking-tight text-[#111111] mb-4">
          Revenue Overview Dashboard
        </h1>
        <p className="text-[18px] text-[#6b6b6b] leading-relaxed max-w-2xl">
          Managing dozens of internal and external sites is challenging. We designed a comprehensive
          revenue dashboard enabling publishers to track trends and make fast, data-driven decisions
          to optimize monetization.
        </p>
      </header>

      <div className="w-full aspect-video bg-[#f2f2ef] rounded-2xl mb-16 flex items-center justify-center">
        <span className="text-[13px] text-[#aaa]">Hero image / mockup</span>
      </div>

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

      <Section title="The Problem">
        <p>
          [Describe the challenge — dozens of sites, no unified view, what publishers were doing
          instead, and the business cost of that friction.]
        </p>
      </Section>

      <Section title="Understanding Our Users">
        <p>
          [Who are the publishers? What are their mental models around revenue data?
          What do they check first, and why? What tools were they using before?]
        </p>
        <ImagePlaceholder label="User research insights" />
      </Section>

      <Section title="Complexity & Design Decisions">
        <p className="text-[#111111] font-medium mb-4">What made this hard:</p>
        <p className="mb-6">
          [This was a multi-dimensional data problem — revenue streams, time ranges, site comparisons,
          trend analysis. Describe the real complexity of presenting all of this without overwhelming
          users who need to act fast.]
        </p>

        <p className="text-[#111111] font-medium mb-4">Key trade-offs made:</p>
        <ul className="space-y-3 list-none">
          <li className="pl-4 border-l-2 border-[#e8e8e4] text-[#444444]">
            [Trade-off 1 — e.g. depth vs. glanceability]
          </li>
          <li className="pl-4 border-l-2 border-[#e8e8e4] text-[#444444]">
            [Trade-off 2]
          </li>
          <li className="pl-4 border-l-2 border-[#e8e8e4] text-[#444444]">
            [Trade-off 3]
          </li>
        </ul>
      </Section>

      <Section title="Design Process">
        <ImagePlaceholder label="Strategy / information hierarchy" />
        <p className="mt-6">
          [Walk through how the design evolved. What was the first version, what didn&apos;t work,
          what surprised you in testing.]
        </p>
        <ImagePlaceholder label="Final dashboard screens" />
      </Section>

      <Section title="Key Takeaways">
        <p>
          [What would you do differently? What did this teach you about designing for data-heavy
          B2B products?]
        </p>
      </Section>

      <div className="mt-20 pt-8 border-t border-[#e8e8e4]">
        <p className="text-[12px] uppercase tracking-widest text-[#aaa] mb-3">Next project</p>
        <Link href="/projects/agentic-copilot" className="text-[22px] font-semibold text-[#111111] hover:opacity-60 transition-opacity">
          Agentic Co-pilot →
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
