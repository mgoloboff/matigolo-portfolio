import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Agentic Co-pilot · Matias Goloboff",
};

export default function AgenticCopilot() {
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
            AI Agentic Co-Pilot for Sales Growth
          </h1>

          <p className="text-[20px] leading-[1.55] text-[#3a352c] max-w-[52ch] mx-auto">
            An AI co-pilot that handles repetitive admin so sales teams can focus on what actually drives revenue — relationships.
          </p>
        </header>

        {/* Hero image */}
        <div className="mt-[30px] max-w-[999px] w-full">
          <div className="relative overflow-hidden w-full rounded-[18px] bg-[#f2f2ef]" style={{ aspectRatio: "1 / 1" }}>
            <Image
              src="/agentic-copilot-hero-composed.png"
              alt="Agentic Co-pilot – AI sales assistant interface"
              width={2400}
              height={2400}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* In progress notice */}
        <div className="max-w-[999px] mt-10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#d4a853] animate-pulse shrink-0" />
          <p className="text-[14px] text-[#6b6b6b]">Case study in progress</p>
        </div>

        {/* Back */}
        <div className="max-w-[999px] mt-[56px]" style={{ borderTop: "1px solid rgba(24,21,16,.18)", paddingTop: "24px" }}>
          <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--muted)] mb-[5px]">Back to</div>
          <Link
            href="/"
            className="font-display font-extrabold text-[22px] tracking-[-0.02em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            ← All projects
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
