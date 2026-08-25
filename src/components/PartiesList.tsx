"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "./FadeIn";
import type { Party } from "@/data/types";

export default function PartiesList({
  parties,
  chairNameBySlug,
}: {
  parties: Party[];
  chairNameBySlug: Record<string, string | undefined>;
}) {
  const [query, setQuery] = useState("");

  const filtered = parties.filter((party) => party.name.includes(query.trim()));

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש מפלגה…"
          className="search-box-input"
          aria-label="חיפוש מפלגה"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="muted" style={{ marginTop: "1.5rem" }}>
          לא נמצאה מפלגה בשם &quot;{query}&quot;.
        </p>
      ) : (
        <div className="card-grid">
          {filtered.map((party, i) => {
            const chairName = chairNameBySlug[party.slug];
            return (
              <FadeIn key={party.slug} delay={i * 0.06} y={10}>
                <Link
                  href={`/parties/${party.slug}`}
                  className="card card-link party-card"
                  style={{ ["--party-color" as string]: party.color }}
                >
                  <strong>{party.name}</strong>
                  <p className="muted">
                    נוסדה ב-{party.founded}
                    {chairName ? ` · יו"ר: ${chairName}` : ""}
                  </p>
                  <div className="tag-list">
                    {party.ideology.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
