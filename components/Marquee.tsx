const skills = [
  "User empathy",
  "Critical thinking",
  "Design to dev handoff",
  "Prompt-Driven Workflows",
];

const diamondColors = [
  "text-[var(--accent)]",
  "text-[var(--highlight)]",
  "text-[var(--green)]",
  "text-[var(--accent)]",
];

const diamondStyle = { fontFamily: "system-ui, Arial, sans-serif" };

function MarqueeTrack() {
  return (
    <>
      {skills.map((skill, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className={`text-[22px] mx-4 ${diamondColors[i % diamondColors.length]}`}
            style={diamondStyle}
          >
            ✦
          </span>
          <span className="font-display font-bold text-[30px] text-[var(--bg)]">
            {skill}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      className="w-full bg-[var(--fg)] overflow-hidden"
      style={{ height: "72px", display: "flex", alignItems: "center" }}
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  );
}
