import Link from "next/link";
import type { Politician } from "@/data/types";
import Avatar from "./Avatar";
import TenureBadge from "./TenureBadge";

export default function MemberRow({
  politician,
  color,
  delay = 0,
}: {
  politician: Politician;
  color: string;
  delay?: number;
}) {
  return (
    <Link
      href={`/politicians/${politician.slug}`}
      className="member-row reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Avatar name={politician.name} color={color} />
      <div className="member-info">
        <div className="member-name-line">
          <strong>{politician.name}</strong>
          {politician.isChair && <span className="chair-badge">יו&quot;ר</span>}
        </div>
        <p className="muted">{politician.role}</p>
      </div>
      <TenureBadge termCount={politician.termCount} />
    </Link>
  );
}
