import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Revenue Overview Dashboard · Matias Goloboff",
};

// ─── Helpers (must be declared before the page component for Turbopack) ───────

const stakeholders = [
  { name: "VP R&D Monetization", color: "#20A66A", className: "collaborator--green", delay: "-1.2s" },
  { name: "VP Revenue Operations", color: "#F05259", className: "collaborator--red", delay: "-3.8s" },
  { name: "Designer", color: "#3C82E8", className: "collaborator--blue", delay: "-5.4s" },
  { name: "Product Manager", color: "#F79A45", className: "collaborator--orange", delay: "-2.6s" },
];

function CursorSvg({ color }: { color: string }) {
  return (
    <svg className="bc-cursor" viewBox="0 0 32 42" aria-hidden="true" fill="none">
      <path
        d="M3.35 2.67L28.7 24.5c1.32 1.14.56 3.29-1.18 3.34l-10.18.3-5.1 9.92c-.83 1.61-3.24 1.13-3.39-.68L1.02 4.2c-.16-1.91.89-2.56 2.33-1.53Z"
        fill="#202124" stroke="#202124" strokeWidth="4" strokeLinejoin="round"
      />
      <path
        d="M4.27 4.72L26.2 23.59c.53.46.22 1.32-.47 1.34l-10.31.3-5.18 10.08c-.33.64-1.3.45-1.36-.27L2.1 5.34c-.06-.77.58-1.04 1.17-.62Z"
        fill={color} stroke="white" strokeWidth="2.2" strokeLinejoin="round"
      />
    </svg>
  );
}

function BusinessConstraintsIllustration() {
  return (
    <div className="bc-stage">
      {stakeholders.map((s) => (
        <div
          key={s.name}
          className={`bc-collaborator ${s.className}`}
          style={{ "--cursor-color": s.color, "--animation-delay": s.delay } as React.CSSProperties}
        >
          <CursorSvg color={s.color} />
          <div className="bc-label">{s.name}</div>
        </div>
      ))}
    </div>
  );
}


function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-20" style={{ maxWidth: "999px", width: "100%" }}>
      <h2
        className="font-display font-extrabold tracking-[-0.02em] mb-6 w-full"
        style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RevenueDashboard() {
  return (
    <>
      <Nav />

      <div className="max-w-[1080px] mx-auto px-8 pb-[90px] min-h-screen" style={{ padding: "0 32px 90px" }}>
        {/* Header */}
        <header className="text-center" style={{ padding: "48px 0 8px" }}>
          <h1
            className="font-display font-extrabold leading-[1] tracking-[-0.03em] text-balance mb-5 mx-auto"
            style={{ fontSize: "clamp(34px, 5.6vw, 72px)", maxWidth: "999px" }}
          >
            Revenue Overview Dashboard
          </h1>

          <p className="text-[20px] leading-[1.55] text-[#3a352c] max-w-[52ch] mx-auto">
            Revenue intelligence platform for publishers managing dozens of sites.
          </p>
        </header>

        {/* Hero image */}
        <div className="mt-[30px] max-w-[999px] w-full">
          <div className="relative overflow-hidden w-full rounded-[18px]" style={{ aspectRatio: "1500 / 1160" }}>
            <Image
              src="/revenue-dashboard-hero.png"
              alt="Revenue Overview Dashboard – desktop and mobile views"
              width={1500}
              height={1382}
              priority
              className="w-full h-auto"
              style={{
                position: "absolute",
                top: "-9.5%",
                left: "0",
                maxWidth: "none",
              }}
            />
          </div>
        </div>

        {/* Metrics row */}
        <div className="flex flex-wrap gap-[56px] mt-[-20px] mb-2 justify-center text-center">
          <div>
            <div className="font-display font-extrabold text-[56px] tracking-[-0.02em] text-[var(--green)]">300+</div>
            <div className="font-mono text-[12px] text-[var(--muted)]">Sites monitored</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-[56px] tracking-[-0.02em] text-[var(--green)]">100%</div>
            <div className="font-mono text-[12px] text-[var(--muted)]">Day-one adoption</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-[56px] tracking-[-0.02em] text-[var(--green)]">4 min</div>
            <div className="font-mono text-[12px] text-[var(--muted)]">To revenue clarity</div>
          </div>
        </div>

        {/* Quote */}
        <div
          className="max-w-[999px] mt-8"
          style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "22px" }}
        >
          <p
            className="font-display font-bold leading-[1.3] tracking-[-0.01em] text-[var(--fg)]"
            style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
          >
            &ldquo;The new dashboard has revolutionized how we optimize our sites. One glance at
            Revenue is enough to understand what&apos;s going on.&rdquo;
          </p>
        </div>

        {/* Overview */}
        <CaseSection title="Overview">
          <p className="text-[18px] leading-[1.62] text-[#3a352c]">
            Managing dozens or even hundreds of internal and external sites is challenging, and
            existing tools didn&apos;t provide the visibility site owners and managers needed.
            Our challenge was to present key insights clearly, enabling publishers to track revenue
            trends and make fast, data-driven decisions to optimize monetization.
          </p>
        </CaseSection>

        {/* Understanding Our Users */}
        <CaseSection title="Understanding Our Users">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-8">
            We interviewed <strong className="font-semibold">5 revenue managers</strong>, each responsible for{" "}
            <strong className="font-semibold">overseeing multiple websites</strong> as part of their daily workflow.
            <br /><strong className="font-semibold">Clear patterns emerged:</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-2">
            {[
              { icon: "/icon-clock.svg", title: "Time-starved", desc: "Our users lack time and often struggle" },
              { icon: "/icon-calendar.svg", title: "Routined check-ins", desc: "They check data on a daily basis" },
              { icon: "/icon-chart-simple.svg", title: "Low data fluency", desc: "They need simple but accurate data" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-4">
                <img src={icon} alt="" width={80} height={80} />
                <div className="flex flex-col gap-2">
                  <p className="font-display font-bold text-[18px] text-[var(--fg)]">{title}</p>
                  <p className="text-[16px] leading-[1.62] text-[#3a352c]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-display font-bold text-[19px] text-[var(--fg)] mt-16 mb-4">
            Competitive Analysis
          </p>
          <div className="overflow-hidden mb-6">
            <img
              src="/revenue-dashboard-competitive.png"
              alt="Competitive analysis – Google Analytics, Power BI, Browsi, mixpanel, R89"
              className="w-full h-auto block"
              style={{ mixBlendMode: "multiply", transform: "scale(1.015)", transformOrigin: "center" }}
            />
          </div>
          <p className="font-display font-semibold text-[17px] text-[var(--fg)] mb-4">
            Identified recurring UX patterns:
          </p>
          <ul className="flex flex-col gap-3">
            {["Layouts focused on clarity", "Streamlined, distraction-free", "Clean and minimal interfaces"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="shrink-0 w-[6px] h-[6px] rounded-full bg-[#ffc83d]" />
                <span className="text-[16px] leading-[1.62] text-[#3a352c]">{item}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* Key Insights */}
        <CaseSection title="Key Insights">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-8">
            Our dashboard must surface the most important information at a glance – giving users
            clarity and helping them focus on what matters.
          </p>

          <div className="bg-[#ECE7DA] rounded-[18px] p-8">
            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--muted)] mb-3">How might we</p>
            <p className="text-[18px] leading-[1.62] text-[var(--fg)]">
              Present the most important revenue insights in the simplest way – so publishers take
              action and improve monetization?
            </p>
          </div>
        </CaseSection>

        {/* Business Constraints */}
        <section className="mt-20 flex items-start gap-8" style={{ maxWidth: "999px", width: "100%" }}>
          <div className="flex-1 min-w-0">
            <h2
              className="font-display font-extrabold tracking-[-0.02em] mb-6 w-full"
              style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
            >
              Business Constraints
            </h2>
            <p className="text-[18px] leading-[1.62] text-[#3a352c]">
              <strong className="font-semibold">Stakeholders emphasized the need for a dashboard that clearly
              highlights both Video and Display</strong> revenues while also offering
              immediate access to high-level data.
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <BusinessConstraintsIllustration />
          </div>
        </section>

        {/* Design Strategy */}
        <CaseSection title="Design Strategy">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-8">
            3 sections, divided into 3 columns.
          </p>

          <div className="flex flex-col gap-14">
            <div>
              <p className="font-display font-bold text-[19px] text-[var(--fg)] mb-3">1. Quick-glance performance</p>
              <p className="text-[16px] leading-[1.62] text-[#3a352c] mb-6">
                We used summary cards to highlight top priority data — Revenue by Time (Yesterday, MTD, Previous Month).
              </p>
              <div className="w-full rounded-[18px] overflow-hidden">
                <img
                  src="/revenue-dashboard-kpi-cards.png"
                  alt="Revenue Dashboard – Quick-glance KPI cards"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div>
              <p className="font-display font-bold text-[19px] text-[var(--fg)] mb-3">2. Insight Through Overlap</p>
              <p className="text-[16px] leading-[1.62] text-[#3a352c] mb-6">
                We combined Sessions and Revenue in a single chart to help visualize patterns and performance trends quickly.
              </p>
              <div className="w-full rounded-[18px] overflow-hidden">
                <img
                  src="/revenue-dashboard-chart-overlay.png"
                  alt="Revenue Dashboard – Sessions and Revenue overlay chart"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div>
              <p className="font-display font-bold text-[19px] text-[var(--fg)] mb-3">3. Contextual Breakdowns</p>
              <p className="text-[16px] leading-[1.62] text-[#3a352c] mb-6">
                Revenue by OS, Device, and by Country — enabling users to dig deeper without losing context.
              </p>
              <div className="w-full rounded-[18px] overflow-hidden">
                <img
                  src="/revenue-dashboard-breakdown.png"
                  alt="Revenue Dashboard – Contextual breakdowns by OS, Device, Country"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </CaseSection>

        {/* Surprise */}
        <CaseSection title={`Surprise – "We Need Mobile Too"`}>
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-8">
            Midway through the project, a new hard requirement arrived: go mobile. We adapted the
            dashboard into a scrollable single-column format without compromising data quality.
          </p>

          <div className="w-full">
            <img
              src="/revenue-dashboard-mobile-annotated.webp"
              alt="Revenue Overview Dashboard – mobile adaptive design with annotations"
              className="w-full h-auto block"
            />
          </div>
        </CaseSection>

        {/* Key Takeaways */}
        <CaseSection title="Key Takeaways from the Process">
          <ul className="flex flex-col gap-5">
            <li
              className="text-[18px] leading-[1.62] text-[#3a352c]"
              style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "22px" }}
            >
              Working with stakeholders rather than for them led to better outcomes and faster buy-in.
            </li>
            <li
              className="text-[18px] leading-[1.62] text-[#3a352c]"
              style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "22px" }}
            >
              A solid information hierarchy makes every mid-project constraint cheaper to absorb.
            </li>
          </ul>
        </CaseSection>

        {/* Next project */}
        <div className="mt-[56px]" style={{ borderTop: "1px solid rgba(24,21,16,.18)", paddingTop: "24px" }}>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--muted)] mb-[5px]">Next project</div>
          <Link
            href="/projects/agentic-copilot"
            className="font-display font-extrabold text-[22px] tracking-[-0.02em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            Agentic Co-pilot →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
