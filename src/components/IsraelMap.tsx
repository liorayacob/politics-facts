"use client";

import { useState } from "react";
import type { CityResult } from "@/data/types";
import { parties, getPartyBySlug } from "@/data/parties";
import { projectToPercent } from "@/lib/geo";
import { getWinningPartySlug } from "@/data/cities";

export default function IsraelMap({ cities }: { cities: CityResult[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedCity = cities.find((c) => c.slug === selectedSlug) ?? null;

  return (
    <>
      <div className="map-card">
        {cities.map((city) => {
          const { xPercent, yPercent } = projectToPercent(city.lat, city.lng);
          const winnerColor = getPartyBySlug(getWinningPartySlug(city))?.color ?? "#4f8ef7";
          return (
            <button
              key={city.slug}
              type="button"
              className="city-marker"
              style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
              onClick={() => setSelectedSlug(city.slug)}
            >
              <span className="city-dot" style={{ background: winnerColor }} />
              <span className="city-tooltip">
                <strong>{city.name}</strong>
                <br />
                אחוז הצבעה: {city.turnoutPercent}%
              </span>
              <span className="city-label">{city.name}</span>
            </button>
          );
        })}
      </div>
      <p className="muted map-caption">
        המפה סכמטית (לא גבולות מדויקים) ומיועדת למיקום ערים בלבד. צבע הנקודה
        מציין את המפלגה המובילה בעיר. לחצו על עיר לפירוט מלא.
      </p>

      {selectedCity && (
        <div className="modal-backdrop" onClick={() => setSelectedSlug(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ margin: 0 }}>{selectedCity.name}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedSlug(null)}
                aria-label="סגור"
              >
                ✕
              </button>
            </div>
            <p className="muted">אחוז הצבעה: {selectedCity.turnoutPercent}%</p>
            <table>
              <thead>
                <tr>
                  <th>מפלגה</th>
                  <th>אחוז הצבעה</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedCity.votePercentByParty)
                  .sort((a, b) => b[1] - a[1])
                  .map(([partySlug, percent]) => {
                    const party = parties.find((p) => p.slug === partySlug);
                    return (
                      <tr key={partySlug}>
                        <td>
                          <span
                            className="party-dot"
                            style={{ background: party?.color ?? "#999", marginInlineEnd: "0.5rem" }}
                          />
                          {party?.name ?? partySlug}
                        </td>
                        <td>{percent}%</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
