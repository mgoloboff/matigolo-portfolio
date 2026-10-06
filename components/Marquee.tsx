const skills = [
  "Full-cycle design",
  "User empathy",
  "AI-native",
  "Research-led",
  "Behavioral design",
  "DesignOps",
];

const diamondColors = [
  "text-[var(--accent)]",
  "text-[var(--highlight)]",
  "text-[var(--green)]",
];

const diamondStyle = { fontFamily: "system-ui, Arial, sans-serif" };

function MarqueeTrack() {
  return (
    <div className="flex items-center flex-shrink-0">
      {skills.map((skill, i) => (
        <span key={i} className="inline-flex items-center flex-shrink-0">
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
    </div>
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
        <MarqueeTrack />
      </div>
    </div>
  );
}
