import { notFound } from "next/navigation";
import { parties, getPartyBySlug } from "@/data/parties";
import { politicians } from "@/data/politicians";
import Link from "next/link";

export function generateStaticParams() {
  return parties.map((party) => ({ slug: party.slug }));
}

export default async function PartyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const party = getPartyBySlug(slug);
  if (!party) notFound();

  const members = politicians.filter((p) => p.partySlug === party.slug);

  return (
    <div>
      <h1>{party.name}</h1>
      <p className="muted">
        נוסדה ב-{party.founded} · יו&quot;ר: {party.leader}
      </p>
      <div className="tag-list">
        {party.ideology.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p>{party.description}</p>

      {members.length > 0 && (
        <>
          <h2>חברי המפלגה</h2>
          <div className="card-grid">
            {members.map((m) => (
              <Link key={m.slug} href={`/politicians/${m.slug}`} className="card card-link">
                <strong>{m.name}</strong>
                <p className="muted">{m.role}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
