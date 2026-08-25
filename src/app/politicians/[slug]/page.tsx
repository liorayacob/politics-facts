import { notFound } from "next/navigation";
import Link from "next/link";
import { politicians, getPoliticianBySlug } from "@/data/politicians";
import { getPartyBySlug } from "@/data/parties";

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

  return (
    <div>
      <h1>{politician.name}</h1>
      <p className="muted">
        {politician.role}
        {party && (
          <>
            {" · "}
            <Link href={`/parties/${party.slug}`}>{party.name}</Link>
          </>
        )}
      </p>
      <p>{politician.bio}</p>
    </div>
  );
}
