"use client";

import { useState } from "react";
import MemberRow from "./MemberRow";
import type { Party, Politician } from "@/data/types";

export default function PoliticiansList({
  groups,
}: {
  groups: { party: Party; members: Politician[] }[];
}) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const filteredGroups = groups
    .map(({ party, members }) => ({
      party,
      members: members.filter((m) => m.name.includes(trimmed)),
    }))
    .filter(({ members }) => members.length > 0);

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש חבר/ת כנסת…"
          className="search-box-input"
          aria-label="חיפוש חבר כנסת"
        />
      </div>

      {filteredGroups.length === 0 ? (
        <p className="muted" style={{ marginTop: "1.5rem" }}>
          לא נמצא/ה חבר/ת כנסת בשם &quot;{query}&quot;.
        </p>
      ) : (
        filteredGroups.map(({ party, members }) => (
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
        ))
      )}
    </div>
  );
}
