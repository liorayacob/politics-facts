import Link from "next/link";
import { parties } from "@/data/parties";
import { getPartyChair } from "@/data/politicians";
import FadeIn from "@/components/FadeIn";

export default function PartiesPage() {
  return (
    <div>
      <h1>מפלגות</h1>
      <div className="card-grid">
        {parties.map((party, i) => {
          const chair = getPartyChair(party.slug);
          return (
            <FadeIn key={party.slug} delay={i * 0.06} y={10}>
              <Link
                href={`/parties/${party.slug}`}
                className="card card-link party-card"
                style={{ ["--party-color" as string]: party.color }}
              >
                <strong>{party.name}</strong>
                <p className="muted">
                  נוסדה ב-{party.founded}
                  {chair ? ` · יו"ר: ${chair.name}` : ""}
                </p>
                <div className="tag-list">
                  {party.ideology.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
