import Link from "next/link";
import { parties } from "@/data/parties";

export default function PartiesPage() {
  return (
    <div>
      <h1>מפלגות</h1>
      <div className="card-grid">
        {parties.map((party) => (
          <Link key={party.slug} href={`/parties/${party.slug}`} className="card card-link">
            <strong>{party.name}</strong>
            <p className="muted">נוסדה ב-{party.founded}</p>
            <div className="tag-list">
              {party.ideology.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
