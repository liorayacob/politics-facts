import { parties as allParties } from "@/data/parties";
import type { Party } from "@/data/types";

export default function PartyLegend({
  title = "מקרא מפלגות",
  parties = allParties,
}: {
  title?: string;
  parties?: Party[];
}) {
  return (
    <div className="map-legend-panel">
      <h3>{title}</h3>
      <div className="map-legend-grid">
        {parties.map((party) => (
          <div key={party.slug} className="map-legend-row">
            <span className="party-dot" style={{ background: party.color }} />
            {party.name}
          </div>
        ))}
      </div>
    </div>
  );
}
