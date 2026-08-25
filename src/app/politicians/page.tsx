import Link from "next/link";
import { politicians } from "@/data/politicians";
import { getPartyBySlug } from "@/data/parties";

export default function PoliticiansPage() {
  return (
    <div>
      <h1>חברי כנסת</h1>
      <div className="card-grid">
        {politicians.map((politician) => {
          const party = getPartyBySlug(politician.partySlug);
          return (
            <Link
              key={politician.slug}
              href={`/politicians/${politician.slug}`}
              className="card card-link"
            >
              <strong>{politician.name}</strong>
              <p className="muted">
                {politician.role}
                {party ? ` · ${party.name}` : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
