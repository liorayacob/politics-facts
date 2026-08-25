import Link from "next/link";
import type { Politician } from "@/data/types";
import Avatar from "./Avatar";
import TenureBadge from "./TenureBadge";
import FadeIn from "./FadeIn";

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
    <FadeIn delay={delay / 1000} y={10}>
      <Link href={`/politicians/${politician.slug}`} className="member-row">
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
    </FadeIn>
  );
}
