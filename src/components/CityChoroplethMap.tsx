"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Layer, Path, LeafletMouseEvent, PathOptions } from "leaflet";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import "leaflet/dist/leaflet.css";
import type { CityResult } from "@/data/types";
import { parties, getPartyBySlug } from "@/data/parties";
import { getWinningPartySlug } from "@/data/cities";

function cityFromFeature(feature: Feature<Geometry, GeoJsonProperties> | undefined, cities: CityResult[]) {
  const slug = feature?.properties?.slug as string | undefined;
  return cities.find((c) => c.slug === slug);
}

export default function CityChoroplethMap({ cities }: { cities: CityResult[] }) {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/data/cities-boundaries.json")
      .then((res) => res.json())
      .then(setGeoData)
      .catch(() => setGeoData({ type: "FeatureCollection", features: [] }));
  }, []);

  const selectedCity = cities.find((c) => c.slug === selectedSlug) ?? null;

  function styleFeature(feature?: Feature<Geometry, GeoJsonProperties>): PathOptions {
    const city = cityFromFeature(feature, cities);
    const color = city ? getPartyBySlug(getWinningPartySlug(city))?.color ?? "#cbd5e1" : "#e2e8f0";
    return {
      fillColor: color,
      fillOpacity: 0.8,
      color: "#241f16",
      weight: 1.2,
    };
  }

  function onEachFeature(feature: Feature<Geometry, GeoJsonProperties>, layer: Layer) {
    const city = cityFromFeature(feature, cities);
    if (!city) return;

    layer.bindTooltip(
      `<strong>${city.name}</strong><br/>אחוז הצבעה: ${city.turnoutPercent}%`,
      { sticky: true, className: "map-tooltip" }
    );

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle({ fillOpacity: 0.95, weight: 3, color: "#b8791a" });
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as Path).setStyle(styleFeature(feature));
      },
      click: () => setSelectedSlug(city.slug),
    });
  }

  const modal = selectedCity && (
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
  );

  return (
    <>
      <div className="map-layout">
        <div className="map-card">
          {!geoData ? (
            <div className="map-loading">טוען מפה…</div>
          ) : (
            <MapContainer
              center={[31.6, 34.95]}
              zoom={8}
              minZoom={7}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <GeoJSON data={geoData} style={styleFeature} onEachFeature={onEachFeature} />
            </MapContainer>
          )}
        </div>

        <div className="map-legend-panel">
          <h3>מקרא מפלגות</h3>
          {parties.map((party) => (
            <div key={party.slug} className="map-legend-row">
              <span className="party-dot" style={{ background: party.color }} />
              {party.name}
            </div>
          ))}
        </div>
      </div>

      <p className="muted map-caption">
        עברו עם העכבר מעל עיר לצפייה באחוז ההצבעה, ולחצו עליה כדי לראות את
        פילוח הקולות בין המפלגות. צבע העיר מציין את המפלגה המובילה בה.
      </p>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
