"use client";
import { useRef } from "react";
import { VariableFontCursorProximity } from "@/components/ui/variable-font-cursor-proximity";

export default function HeroHeading() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <h1 className="font-heading text-[42px] md:text-[60px] font-semibold leading-[1.1] tracking-tight text-[#111111] max-w-3xl">
        <VariableFontCursorProximity
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 600"
          toFontVariationSettings="'wght' 900"
          radius={120}
        >
          Turning complexity
        </VariableFontCursorProximity>
        <br />
        <VariableFontCursorProximity
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 600"
          toFontVariationSettings="'wght' 900"
          radius={120}
        >
          into clarity
        </VariableFontCursorProximity>
      </h1>
    </div>
  );
}
