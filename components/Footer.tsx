"use client";

import { useState, useRef, useCallback } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText("matigolo@gmail.com").catch(() => {});
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <footer className="bg-[var(--fg)] text-[var(--bg)] py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <p className="font-mono text-[12px] text-[var(--bg)]/50 mb-6">
          Probably tweaking this portfolio again.
        </p>

        <h2 className="font-display text-[clamp(36px,6vw,72px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-10">
          That&apos;s the work.
          <br />
          Here&apos;s the{" "}
          <em className="font-display not-italic text-[var(--bg)]/40">
            awkward
          </em>
          <br />
          reaching out part.
        </h2>

        <div>
          <p className="font-mono text-[13px] text-[var(--bg)]/50 mb-3">
            Contact me:
          </p>

          <div className="relative inline-block">
            <button
              onClick={handleCopy}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="relative cursor-none text-left group"
              aria-label="Copy email address"
            >
              <span className="inline-flex items-end gap-3">
                <span className="font-display text-[clamp(28px,4vw,52px)] font-extrabold leading-none tracking-[-0.02em] text-[var(--bg)] transition-opacity duration-150 group-hover:opacity-60">
                  matigolo@gmail.com
                </span>
                <svg
                  className="translate-y-[6px] transition-opacity duration-150 group-hover:opacity-60 shrink-0"
                  width="32" height="38" viewBox="0 0 20 24" fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2L18 11.5L10.5 13.5L7.5 21L2 2Z"
                    fill="var(--bg)"
                    stroke="var(--bg)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* Custom cursor arrow — follows mouse */}
              {hovering && !copied && (
                <span
                  className="pointer-events-none fixed z-50"
                  style={{
                    left: cursorPos.x + (hovering ? 16 : 0),
                    top: cursorPos.y,
                    position: "absolute",
                  }}
                >
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path
                      d="M2 2L18 11.5L10.5 13.5L7.5 21L2 2Z"
                      fill="var(--bg)"
                      stroke="var(--fg)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>

            {/* Toast — appears below the email on copy */}
            <span
              className={`absolute left-0 top-full mt-4 flex items-center gap-2 bg-[var(--bg)] text-[var(--fg)] font-mono text-[13px] font-bold px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                copied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              Email copied! ✓
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
