"use client";
import { useRef, useEffect, useCallback } from "react";

function parseFVS(s: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const m of s.matchAll(/'([^']+)'\s+([\d.]+)/g)) {
    out[m[1]] = parseFloat(m[2]);
  }
  return out;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function VariableFontCursorProximity({
  children,
  className,
  containerRef,
  fromFontVariationSettings,
  toFontVariationSettings,
  radius = 100,
}: {
  children: string;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  radius?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);

  const applyStyles = useCallback(() => {
    const span = spanRef.current;
    if (!span) return;

    const from = parseFVS(fromFontVariationSettings);
    const to = parseFVS(toFontVariationSettings);
    const mouse = mouseRef.current;
    const chars = span.querySelectorAll<HTMLSpanElement>("[data-char]");

    chars.forEach((el) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const t = mouse
        ? Math.max(0, 1 - Math.hypot(mouse.x - cx, mouse.y - cy) / radius)
        : 0;
      const fvs = Object.keys(from)
        .map(
          (axis) =>
            `'${axis}' ${lerp(from[axis], to[axis] ?? from[axis], t).toFixed(1)}`
        )
        .join(", ");
      el.style.fontVariationSettings = fvs;
    });
  }, [fromFontVariationSettings, toFontVariationSettings, radius]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(applyStyles);
    };

    const onLeave = () => {
      mouseRef.current = null;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(applyStyles);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, applyStyles]);

  const chars = children.split("");

  return (
    <span ref={spanRef} className={className} aria-label={children}>
      {chars.map((char, i) => (
        <span
          key={i}
          data-char
          aria-hidden="true"
          style={{
            display: "inline-block",
            transition: "font-variation-settings 0.08s ease-out",
            whiteSpace: char === " " ? "pre" : undefined,
            fontVariationSettings: fromFontVariationSettings,
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
