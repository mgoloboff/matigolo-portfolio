"use client";

const tools = [
  { name: "Figma", icon: "/tool-figma.png" },
  { name: "Cursor", icon: "/tool-cursor.png" },
  { name: "Slack", icon: "/tool-slack.png" },
  { name: "Wispr", icon: "/tool-wispr.png" },
  { name: "GitHub", icon: "/tool-github-icon.svg" },
  { name: "Confluence", icon: "/tool-confluence.png" },
  { name: "Mixpanel", icon: "/tool-mixpanel-icon.svg" },
];

function ToolIcon({ tool }: { tool: (typeof tools)[number] }) {
  const size = tool.size ?? "52px";
  return (
    <div className="flex-shrink-0 w-[80px] h-[80px] rounded-2xl bg-[#e8e4f0] flex items-center justify-center mx-3">
      <img
        src={tool.icon}
        alt={tool.name}
        style={{ width: size, height: size }}
        className="object-contain rounded-xl"
      />
    </div>
  );
}

function ToolTrack() {
  return (
    <>
      {tools.map((tool, i) => (
        <ToolIcon key={i} tool={tool} />
      ))}
    </>
  );
}

export default function ToolkitMarquee() {
  return (
    <div className="w-full rounded-3xl border-2 border-[var(--fg)] overflow-hidden bg-[var(--bg)]">
      <div className="px-8 pt-8 pb-6">
        <h3 className="font-display text-[28px] font-extrabold italic text-[var(--fg)] mb-2">
          Toolkit
        </h3>
        <p className="text-[18px] leading-relaxed text-[var(--fg)]">
          This is my collection of tools that help me transform ideas into
          amazing designs.
        </p>
      </div>

      <div className="border-t-2 border-[var(--fg)]" />

      <div className="py-5 overflow-hidden">
        <div className="animate-marquee-tools flex items-center whitespace-nowrap">
          <ToolTrack />
          <ToolTrack />
        </div>
      </div>
    </div>
  );
}
