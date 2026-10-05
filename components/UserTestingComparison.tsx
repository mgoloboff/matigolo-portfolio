"use client";
import { useState } from "react";
import Image from "next/image";

const HOTSPOTS: {
  x: string;
  y: string;
  w: string;
  h: string;
  text: string;
  tooltipSide?: "left" | "right";
  tooltipVert?: "above" | "below";
}[] = [
  { x: "6.7%",   y: "13%",   w: "11.16%", h: "5.5%", text: "Took up valuable screen space" },
  { x: "89.37%", y: "6.3%",  w: "9.74%",  h: "5.5%", text: "Actions were not clear enough",       tooltipSide: "left" },
  { x: "7.14%",  y: "22.8%", w: "9.74%",  h: "5.5%", text: "Not recognized as a button" },
  { x: "39.37%", y: "27.5%", w: "9.74%",  h: "5.5%", text: "Attracted too much attention" },
  { x: "5.45%",  y: "32.2%", w: "9.73%",  h: "5.5%", text: "Main CTA unclear and missing 'clear' button" },
  { x: "5.89%",  y: "38.5%", w: "37.5%",  h: "5.5%", text: "Not aligned with the user flow" },
  { x: "59.91%", y: "51.9%", w: "9.73%",  h: "5.5%", text: "Confusing font" },
  { x: "0.62%",  y: "94.2%", w: "4.02%",  h: "5.7%", text: "Users didn't understand button function", tooltipVert: "above" },
];

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M12 8v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill={color} />
    </svg>
  );
}

function FaceIcon({ color, happy }: { color: string; happy: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <circle cx="9"  cy="10" r="1" fill={color} />
      <circle cx="15" cy="10" r="1" fill={color} />
      {happy
        ? <path d="M8 14.5s1.5 2 4 2 4-2 4-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        : <path d="M8 16s1.5-2 4-2 4 2 4 2"   stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      }
    </svg>
  );
}

const RED   = "var(--accent)";
const GREEN = "var(--green)";

export default function UserTestingComparison() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-16 mt-8">

      {/* ── Before ── */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex items-baseline gap-3">
          <p className="font-display font-bold text-[20px] leading-[24px] text-[var(--fg)]">
            Before
          </p>
          <span className="font-sans text-[14px] text-[var(--accent)]">
            *Hover for insights
          </span>
        </div>

        {/* Annotated screenshot + hotspot layer */}
        <div className="relative shadow-[0px_40px_40px_0px_rgba(0,0,0,0.09)]">
          <Image
            src="/real-time-reports-before.png"
            alt="Before – original interface with highlighted usability issues"
            width={4096}
            height={2913}
            className="w-full h-auto block"
          />

          {HOTSPOTS.map((h, i) => {
            const isLeft  = h.tooltipSide === "left";
            const isAbove = h.tooltipVert === "above";

            return (
              <div
                key={i}
                className="absolute cursor-pointer bg-[rgba(255,0,0,0.05)] border-[0.5px] border-red-500 rounded-[3.5px]"
                style={{ left: h.x, top: h.y, width: h.w, height: h.h }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {active === i && (
                  <div
                    className="pointer-events-none absolute z-20 bg-[var(--fg)] text-[var(--bg)] font-mono text-[11px] leading-none px-3 py-2 rounded-full whitespace-nowrap shadow-lg"
                    style={{
                      ...(isAbove  ? { bottom: "calc(100% + 6px)" } : { top: "calc(100% + 6px)" }),
                      ...(isLeft   ? { right: 0 }                  : { left: 0 }),
                    }}
                  >
                    {h.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Before metrics */}
        <div className="flex flex-col gap-[4px]">
          {[
            { Icon: ClockIcon,   text: "Average tasks completion: 7.5 minutes" },
            { Icon: WarningIcon, text: "Error rate: 35%" },
            { Icon: FaceIcon,    text: "User satisfaction score: 5/7" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon color={RED} {...(Icon === FaceIcon ? { happy: false } : {})} />
              <span className="font-sans text-[16px] leading-[2] text-[var(--fg)]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── After ── */}
      <div className="flex-1 flex flex-col gap-8">
        <p className="font-display font-bold text-[20px] leading-[24px] text-[var(--fg)]">
          After
        </p>

        <div className="shadow-[0px_40px_40px_0px_rgba(0,0,0,0.09)]">
          <Image
            src="/real-time-reports-after.png"
            alt="After – redesigned interface"
            width={4096}
            height={2916}
            className="w-full h-auto block"
          />
        </div>

        {/* After metrics */}
        <div className="flex flex-col gap-[4px]">
          {[
            { Icon: ClockIcon,   text: "Average task completion time: 4 minutes" },
            { Icon: WarningIcon, text: "Error rate: 5%" },
            { Icon: FaceIcon,    text: "User satisfaction score: 6.5/7" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon color={GREEN} {...(Icon === FaceIcon ? { happy: true } : {})} />
              <span className="font-sans text-[16px] leading-[2] text-[var(--fg)]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
