import { notFound } from "next/navigation";
import { parties, getPartyBySlug } from "@/data/parties";
import { getPartyMembers } from "@/data/politicians";
import MemberRow from "@/components/MemberRow";

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

  const members = getPartyMembers(party.slug);

  return (
    <div>
      <h1>{party.name}</h1>
      <p className="muted">נוסדה ב-{party.founded}</p>
      <div className="tag-list">
        {party.ideology.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p>{party.description}</p>

      <h2>חברי המפלגה</h2>
      {members.length > 0 ? (
        <div className="member-grid">
          {members.map((member, i) => (
            <MemberRow key={member.slug} politician={member} color={party.color} delay={i * 60} />
          ))}
        </div>
      ) : (
        <p className="muted">עדיין לא נוספו חברי כנסת למפלגה זו.</p>
      )}
    </div>
  );
}
