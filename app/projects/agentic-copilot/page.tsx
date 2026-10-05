import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agentic Co-pilot · Matias Goloboff",
};

export default function AgenticCopilot() {
  return (
    <article className="px-6 md:px-12 max-w-4xl mx-auto w-full pb-24">
      <div className="pt-10 pb-8">
        <Link href="/" className="text-[13px] text-[#6b6b6b] hover:text-[#111111] transition-colors">
          ← Projects
        </Link>
      </div>

      <header className="mb-12">
        <p className="text-[12px] uppercase tracking-widest text-[#aaa] mb-3">
          AI Product · Agent UX
        </p>
        <h1 className="font-heading text-[36px] md:text-[48px] font-semibold leading-tight tracking-tight text-[#111111] mb-4">
          Agentic Co-pilot
        </h1>
        <p className="text-[18px] text-[#6b6b6b] leading-relaxed max-w-2xl">
          Designed an AI Agentic Co-Pilot to Automate Admin and Drive Sales Revenue.
        </p>
      </header>

      <div className="w-full aspect-video bg-[#f2f2ef] rounded-2xl flex flex-col items-center justify-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#d4a853] animate-pulse" />
        <p className="text-[14px] text-[#6b6b6b] font-medium">Case study in progress</p>
      </div>

      <div className="mt-20 pt-8 border-t border-[#e8e8e4]">
        <p className="text-[12px] uppercase tracking-widest text-[#aaa] mb-3">Back to</p>
        <Link href="/" className="text-[22px] font-semibold text-[#111111] hover:opacity-60 transition-opacity">
          ← All projects
        </Link>
      </div>
    </article>
  );
}
