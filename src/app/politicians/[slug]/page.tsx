import { notFound } from "next/navigation";
import Link from "next/link";
import { politicians, getPoliticianBySlug } from "@/data/politicians";
import { getPartyBySlug } from "@/data/parties";
import Avatar from "@/components/Avatar";
import TenureBadge from "@/components/TenureBadge";

export function generateStaticParams() {
  return politicians.map((politician) => ({ slug: politician.slug }));
}

export default async function PoliticianPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const politician = getPoliticianBySlug(slug);
  if (!politician) notFound();

  const party = getPartyBySlug(politician.partySlug);
  const color = party?.color ?? "#4f8ef7";

  return (
    <div>
      <div className="member-name-line" style={{ marginBottom: "1rem" }}>
        <Avatar name={politician.name} color={color} size={72} />
        <div style={{ marginRight: "1rem" }}>
          <div className="member-name-line">
            <h1 style={{ margin: 0 }}>{politician.name}</h1>
            {politician.isChair && <span className="chair-badge">יו&quot;ר</span>}
          </div>
          <p className="muted" style={{ margin: 0 }}>
            {politician.role}
            {party && (
              <>
                {" · "}
                <Link href={`/parties/${party.slug}`}>{party.name}</Link>
              </>
            )}
          </p>
        </div>
      </div>
      <TenureBadge termCount={politician.termCount} />
      <p style={{ marginTop: "1.25rem" }}>{politician.bio}</p>
    </div>
  );
}
