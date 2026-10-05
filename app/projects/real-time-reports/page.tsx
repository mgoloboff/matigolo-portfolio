import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UserFlowDiagram from "@/components/UserFlowDiagram";
import UserTestingComparison from "@/components/UserTestingComparison";

export const metadata: Metadata = {
  title: "Real-Time Report System · Matias Goloboff",
};

const B = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function VideoBlock({
  title,
  description,
  src,
}: {
  title: string;
  description: React.ReactNode;
  src: string;
}) {
  return (
    <div>
      <p className="font-display font-bold text-[19px] text-[var(--fg)] mb-3">{title}</p>
      <p className="text-[16px] leading-[1.62] text-[#3a352c] mb-6">{description}</p>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-auto rounded-[18px] border-2 border-[var(--fg)]"
      >
        <source src={`${B}${src}`} type="video/mp4" />
      </video>
    </div>
  );
}

export default function RealTimeReports() {
  return (
    <>
      <Nav />

      <div className="max-w-[1080px] mx-auto px-8 pb-[90px] min-h-screen" style={{ padding: "0 32px 90px" }}>
        {/* Header */}
        <header className="text-center" style={{ padding: "48px 0 8px" }}>
          {/* Title */}
          <h1
            className="font-display font-extrabold leading-[1] tracking-[-0.03em] text-balance mb-5 mx-auto"
            style={{ fontSize: "clamp(34px, 5.6vw, 72px)", maxWidth: "999px" }}
          >
            Real-Time Report System
          </h1>

          {/* Subtitle */}
          <p className="text-[20px] leading-[1.55] text-[#3a352c] max-w-[52ch] mx-auto">
            Real-Time Analytics platform that unifies performance data, enabling faster data-driven decisions.
          </p>
        </header>

        {/* Hero image */}
        <div className="mt-[30px] max-w-[999px] w-full">
          <div className="relative overflow-hidden w-full" style={{ aspectRatio: "2000 / 1128" }}>
            <Image
              src="/real-time-reports-hero-v2.webp"
              alt="Real-Time Report System"
              width={2000}
              height={1335}
              priority
              className="w-full h-auto rounded-[18px]"
              style={{
                position: "absolute",
                left: "-4.85%",
                top: "0",
                maxWidth: "none",
              }}
            />
          </div>
        </div>

        {/* Metrics row */}
        <div className="flex flex-wrap gap-[56px] mt-[46px] mb-2 justify-center text-center">
          <div>
            <div className="font-display font-extrabold text-[56px] tracking-[-0.02em] text-[var(--green)]">3</div>
            <div className="font-mono text-[12px] text-[var(--muted)]">Enterprise clients onboarded</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-[56px] tracking-[-0.02em] text-[var(--green)]">83%</div>
            <div className="font-mono text-[12px] text-[var(--muted)]">Users migrated from legacy</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-[56px] tracking-[-0.02em] text-[var(--green)]">−25%</div>
            <div className="font-mono text-[12px] text-[var(--muted)]">Fewer exports to Excel</div>
          </div>
        </div>

        {/* Overview */}
        <CaseSection title="Overview">
          <p className="text-[18px] leading-[1.62] text-[#3a352c]">
            A company pivot to B2B exposed that our reporting tools weren&apos;t built for external users.
            We needed to create a system that lets users intuitively investigate and analyze real-time
            performance data – all in one place.
          </p>
        </CaseSection>

        {/* Research */}
        <CaseSection title="Research">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-8">
            We studied how analysts search for answers at work, and where reporting tools slow them down.
          </p>

          <div className="grid grid-cols-3 mb-16">
            {[
              { n: "200", label: "External surveys" },
              { n: "6", label: "Moderated interviews" },
              { n: "32", label: "Internal surveys" },
            ].map((s) => (
              <div key={s.label} className="pr-8">
                <p className="font-display font-extrabold text-[72px] leading-none tracking-[-0.04em] text-[var(--fg)]">{s.n}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] mt-4">{s.label}</p>
              </div>
            ))}
          </div>

          {/* User archetypes */}
          <p className="font-display font-bold text-[19px] text-[var(--fg)] mb-8">
            What defines Report system users?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              {
                icon: "/icon-monitor.svg",
                title: "Extended Screen Time",
                text: (
                  <>Most of the day is spent in <strong className="text-[var(--fg)]">focused, data-heavy</strong> work with spreadsheets and reports.</>
                ),
              },
              {
                icon: "/icon-toolbox.svg",
                title: "Advanced Tools",
                text: (
                  <>Daily use of <strong className="text-[var(--fg)]">Excel, BI platforms, ad systems,</strong> and reporting tools.</>
                ),
              },
              {
                icon: "/icon-target.svg",
                title: "Fast but Accurate",
                text: (
                  <>Results are needed <strong className="text-[var(--fg)]">quickly, yet even small errors can lead to wrong</strong> conclusions.</>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-4">
                <Image src={item.icon} alt="" width={80} height={80} />
                <div className="flex flex-col gap-2">
                  <p className="font-display font-bold text-[18px] text-[var(--fg)]">{item.title}</p>
                  <p className="text-[16px] leading-[1.62] text-[#3a352c]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Insights That Mattered */}
          <p className="font-display font-bold text-[19px] text-[var(--fg)] mb-8">
            Insights that mattered
          </p>
          <div className="flex flex-col md:flex-row gap-14 items-start mb-16">
            <div className="flex-1 flex flex-col gap-14">
              {[
                {
                  title: "Complex Product Adoption",
                  text: (
                    <>Users face a <strong className="text-[var(--fg)]">steep learning curve</strong> in advanced reporting tools due to limited use of familiar patterns.</>
                  ),
                },
                {
                  title: "Workspace Limitations",
                  text: (
                    <>Our users need a <strong className="text-[var(--fg)]">robust system</strong> that supports their workflow. Otherwise, they often <strong className="text-[var(--fg)]">export the data to Excel</strong> and continue working there.</>
                  ),
                },
                {
                  title: "Must-Have Features",
                  text: null,
                  list: [
                    "Advanced filters and multi-column sorting",
                    "Data comparison visualization – game changer",
                    "Share and schedule reports for better efficiency",
                  ],
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <span className="font-display font-extrabold text-[48px] text-[#c9bfb2] leading-none shrink-0 w-10 text-right">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-3 pt-1">
                    <p className="font-display font-bold text-[20px] text-[var(--fg)]">{item.title}</p>
                    {item.text && <p className="text-[16px] leading-[1.62] text-[#3a352c]">{item.text}</p>}
                    {item.list && (
                      <ul className="mt-2 flex flex-col gap-3">
                        {item.list.map((li) => (
                          <li key={li} className="text-[16px] leading-[1.5] text-[#3a352c]">{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="shrink-0 w-full md:w-[380px] rounded-[18px] overflow-hidden">
              <Image src="/insights-image.png" alt="Survey insights heatmap" width={760} height={600} className="w-full h-auto" />
            </div>
          </div>

          {/* Main finding callout */}
          <div
            style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "22px" }}
          >
            <p
              className="font-display font-bold leading-[1.3] tracking-[-0.01em] text-[var(--fg)]"
              style={{ fontSize: "clamp(22px, 2.6vw, 30px)" }}
            >
              Our users need a robust system that supports their workflow. Otherwise, they often
              export the data to Excel and continue working there.
            </p>
          </div>
        </CaseSection>

        {/* User Flow */}
        <CaseSection title="From Research to User Flow">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-4">
            We focused on a simple layout, divided into 3 clear sections.
          </p>
          <UserFlowDiagram />
        </CaseSection>

        {/* Design */}
        <CaseSection title="Aligning Design with Users' Mental Models">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-4">
            We focused on a simple layout, divided into 3 clear sections.
          </p>

          {/* Annotated product layout */}
          <div className="my-10">
            <Image
              src="/real-time-reports-design-layout.webp"
              alt="Product interface annotated: Canvas Actions for white space and clarity, Table Builder for fast setup, and the Data Table as the primary focus"
              width={2000}
              height={1480}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col gap-16 mt-4">
            <VideoBlock
              title="Just Select and Run – Fast"
              description={
                <>
                  Our users spend most of their day in the system, so we designed the Table Builder
                  with <strong className="text-[var(--fg)]">flow state</strong>, to enable a seamless
                  workflow, requiring minimal effort while delivering maximum speed.
                </>
              }
              src="/table-builder.mp4"
            />
            <VideoBlock
              title="Dynamic Table – Adaptable Layout"
              description="Designed to let the table dominate the screen, as it is the core of user interaction within the report."
              src="/dynamic-table.mp4"
            />
            <VideoBlock
              title="Let's Play Within the Table"
              description="Users need to explore data without generating a new report each time, which is slow, costly, and disruptive. On-table controls provide a faster, friction-free way to interact with the data."
              src="/table-interactions.mp4"
            />
          </div>
        </CaseSection>

        {/* User Testing */}
        <CaseSection title="User Testing">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-4">
            After completing the MVP, we conducted 5 internal user testing sessions.
            The goal was to validate core flows, uncover usability issues, and make
            final refinements.
          </p>

          <UserTestingComparison />
        </CaseSection>

        {/* Validation */}
        <CaseSection title="Validation & Iteration">
          <p className="text-[18px] leading-[1.62] text-[#3a352c] mb-4">
            User testing confirmed the system&apos;s usability, and{" "}
            <strong className="font-semibold">quick refinements led to v1.1</strong>
            <br />
            We&apos;ve since <strong className="font-semibold">advanced v1.2</strong> and are now developing{" "}
            <strong className="font-semibold">v2 with dark mode.</strong>
          </p>
          <div className="w-full rounded-[18px] overflow-hidden my-10">
            <Image
              src="/real-time-reports-dark-mode.png"
              alt="Real-Time Reports v2 – dark mode"
              width={1920} height={1080}
              className="w-full h-auto block"
            />
          </div>
        </CaseSection>

        {/* Takeaways */}
        <CaseSection title="Key Takeaways from the Process">
          <ul className="flex flex-col gap-5">
            {[
              <>Learned to quickly turn mistakes into <strong className="font-semibold">solutions under pressure</strong></>,
              <>Strengthened team <strong className="font-semibold">collaboration</strong> despite changing team members, including <strong className="font-semibold">developers working remotely</strong> from abroad</>,
              <>Introduced an <strong className="font-semibold">external design library</strong> for the first time in the company&apos;s history</>,
              <>Learned that <strong className="font-semibold">precise token assignment</strong> is what makes a system truly scalable – when every element has the right token, changes like <strong className="font-semibold">dark mode propagate on their own</strong></>,
            ].map((item, i) => (
              <li
                key={i}
                className="text-[18px] leading-[1.62] text-[#3a352c]"
                style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "22px" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* Next project */}
        <div className="mt-[56px]" style={{ borderTop: "1px solid rgba(24,21,16,.18)", paddingTop: "24px" }}>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--muted)] mb-[5px]">Next project</div>
          <Link
            href="/projects/revenue-dashboard"
            className="font-display font-extrabold text-[22px] tracking-[-0.02em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            Revenue Overview Dashboard →
          </Link>
        </div>
      </div>

      <Footer />
    </>
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

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full my-10 flex items-center justify-center rounded-[18px]"
      style={{
        aspectRatio: "16/9",
        background: "repeating-linear-gradient(45deg, #ECE7DA, #ECE7DA 14px, #F2EEE3 14px, #F2EEE3 28px)",
        border: "2px solid var(--fg)",
      }}
    >
      <span className="font-mono text-[12px] text-[var(--muted)] bg-[var(--bg)] px-[15px] py-[9px] rounded-full border border-[rgba(24,21,16,.2)]">
        {label}
      </span>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--muted)] mb-1">{label}</p>
      <p className={`font-display font-extrabold text-[22px] tracking-[-0.02em] ${highlight ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}>
        {value}
      </p>
    </div>
  );
}
