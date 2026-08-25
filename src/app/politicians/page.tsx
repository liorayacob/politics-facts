import { parties } from "@/data/parties";
import { getPartyMembers } from "@/data/politicians";
import PoliticiansList from "@/components/PoliticiansList";

export default function PoliticiansPage() {
  const groups = parties.map((party) => ({
    party,
    members: getPartyMembers(party.slug),
  }));

  return (
    <div>
      <h1>חברי כנסת</h1>
      <p className="muted">מסודרים לפי מפלגה — היו&quot;ר תמיד ראשון, ולאחריו לפי ותק.</p>
      <PoliticiansList groups={groups} />
    </div>
  );
}
