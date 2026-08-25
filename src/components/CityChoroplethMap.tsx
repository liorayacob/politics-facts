"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Map as LeafletMap, Layer, Path, LeafletMouseEvent, PathOptions } from "leaflet";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import "leaflet/dist/leaflet.css";
import type { CityResult } from "@/data/types";
import { parties, getPartyBySlug } from "@/data/parties";
import { getWinningPartySlug } from "@/data/cities";
import PartyLegend from "./PartyLegend";

function cityFromFeature(feature: Feature<Geometry, GeoJsonProperties> | undefined, cities: CityResult[]) {
  const slug = feature?.properties?.slug as string | undefined;
  return cities.find((c) => c.slug === slug);
}

export default function CityChoroplethMap({ cities }: { cities: CityResult[] }) {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mapRef = useRef<LeafletMap | null>(null);
  const layersRef = useRef<Map<string, Layer>>(new Map());

  useEffect(() => {
    setMounted(true);
    fetch("/data/cities-boundaries.json")
      .then((res) => res.json())
      .then(setGeoData)
      .catch(() => setGeoData({ type: "FeatureCollection", features: [] }));
  }, []);

  const selectedCity = cities.find((c) => c.slug === selectedSlug) ?? null;

  const suggestions =
    query.trim().length > 0
      ? cities.filter((c) => c.name.includes(query.trim())).slice(0, 8)
      : [];

  function focusCity(slug: string) {
    setSelectedSlug(slug);
    setQuery("");
    setShowSuggestions(false);
    const layer = layersRef.current.get(slug) as (Layer & { getBounds?: () => L_LatLngBounds }) | undefined;
    if (layer?.getBounds && mapRef.current) {
      mapRef.current.flyToBounds(layer.getBounds(), { maxZoom: 12, duration: 0.75 });
    }
  }

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

    layersRef.current.set(city.slug, layer);

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
        <p className="muted" style={{ marginBottom: 0 }}>
          אחוז הצבעה: {selectedCity.turnoutPercent}%
        </p>
        <div className="modal-body">
          <table>
            <thead>
              <tr>
                <th>מפלגה</th>
                <th>אחוז הצבעה</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedCity.votePercentByParty)
                .filter(([, percent]) => percent > 0)
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
    </div>
  );

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              focusCity(suggestions[0].slug);
            }
          }}
          placeholder="חיפוש עיר במפה…"
          className="search-box-input"
          aria-label="חיפוש עיר"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-box-suggestions">
            {suggestions.map((c) => (
              <button
                key={c.slug}
                type="button"
                className="search-box-suggestion"
                onMouseDown={() => focusCity(c.slug)}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="map-layout">
        <div className="map-card">
          {!geoData ? (
            <div className="map-loading">טוען מפה…</div>
          ) : (
            <MapContainer
              ref={mapRef}
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

        <PartyLegend />
      </div>

      <p className="muted map-caption">
        עברו עם העכבר מעל עיר לצפייה באחוז ההצבעה, ולחצו עליה כדי לראות את
        פילוח הקולות בין המפלגות. צבע העיר מציין את המפלגה המובילה בה.
      </p>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}

type L_LatLngBounds = ReturnType<LeafletMap["getBounds"]>;
