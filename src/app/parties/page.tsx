import { parties } from "@/data/parties";
import { getPartyChair } from "@/data/politicians";
import PartiesList from "@/components/PartiesList";

export default function PartiesPage() {
  const chairNameBySlug: Record<string, string | undefined> = {};
  for (const party of parties) {
    chairNameBySlug[party.slug] = getPartyChair(party.slug)?.name;
  }

  return (
    <div>
      <h1>מפלגות</h1>
      <PartiesList parties={parties} chairNameBySlug={chairNameBySlug} />
    </div>
  );
}
