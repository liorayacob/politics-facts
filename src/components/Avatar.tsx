function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function Avatar({
  name,
  color,
  size = 56,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        fontSize: size * 0.38,
      }}
    >
      {initials(name)}
    </div>
  );
}
