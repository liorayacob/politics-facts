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
  const [partySlug, setPartySlug] = useState("all");
  const trimmed = query.trim();

  const filteredGroups = groups
    .filter(({ party }) => partySlug === "all" || party.slug === partySlug)
    .map(({ party, members }) => ({
      party,
      members: members.filter((m) => m.name.includes(trimmed)),
    }))
    .filter(({ members }) => members.length > 0);

  return (
    <div>
      <div className="search-row">
        <div className="search-box search-box-flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש חבר/ת כנסת…"
            className="search-box-input"
            aria-label="חיפוש חבר כנסת"
          />
        </div>
        <select
          value={partySlug}
          onChange={(e) => setPartySlug(e.target.value)}
          className="search-box-select"
          aria-label="סינון לפי מפלגה"
        >
          <option value="all">כל המפלגות</option>
          {groups.map(({ party }) => (
            <option key={party.slug} value={party.slug}>
              {party.name}
            </option>
          ))}
        </select>
      </div>

      {filteredGroups.length === 0 ? (
        <p className="muted" style={{ marginTop: "1.5rem" }}>
          לא נמצא/ה חבר/ת כנסת מתאים/ה.
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
