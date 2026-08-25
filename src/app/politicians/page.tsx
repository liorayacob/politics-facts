import { parties } from "@/data/parties";
import { getPartyMembers } from "@/data/politicians";
import MemberRow from "@/components/MemberRow";

export default function PoliticiansPage() {
  return (
    <div>
      <h1>חברי כנסת</h1>
      <p className="muted">מסודרים לפי מפלגה — היו&quot;ר תמיד ראשון, ולאחריו לפי ותק.</p>

      {parties.map((party) => {
        const members = getPartyMembers(party.slug);
        if (members.length === 0) return null;
        return (
          <div key={party.slug} className="party-section">
            <div className="party-section-title">
              <span className="party-dot" style={{ background: party.color }} />
              <h2 style={{ margin: 0 }}>{party.name}</h2>
            </div>
            <div className="member-grid">
              {members.map((member, i) => (
                <MemberRow key={member.slug} politician={member} color={party.color} delay={i * 60} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
