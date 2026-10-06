"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[rgba(242,238,227,0.82)] backdrop-blur-md">
      <nav className="max-w-[1280px] mx-auto px-6 md:px-10 h-[73px] flex items-center justify-between border-b border-[var(--fg)]/10">
        <Link
          href="/"
          className="font-display text-[19px] font-extrabold text-[var(--fg)] hover:opacity-70 transition-opacity"
        >
          Matias Goloboff
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-mono text-[13px] text-[var(--fg)] hover:opacity-60 transition-opacity"
          >
            work
          </Link>
          <Link
            href="/about"
            className="font-mono text-[13px] text-[var(--fg)] hover:opacity-60 transition-opacity"
          >
            about
          </Link>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`}
            download="resume-matias"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] text-[var(--fg)] hover:opacity-60 transition-opacity"
          >
            resume
          </a>


        </div>
      </nav>
    </header>
  );
}
