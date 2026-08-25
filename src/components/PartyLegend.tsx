import { parties } from "@/data/parties";

export default function PartyLegend({ title = "מקרא מפלגות" }: { title?: string }) {
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
