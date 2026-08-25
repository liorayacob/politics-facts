import Link from "next/link";
import { parties } from "@/data/parties";
import { politicians, getPartyChair } from "@/data/politicians";
import { elections } from "@/data/elections";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  const latestElection = elections[elections.length - 1];

  return (
    <div>
      <FadeIn>
        <div className="hero">
          <span className="hero-eyebrow">כנסת {latestElection.knesset} · {latestElection.year}</span>
          <h1>עובדות וסטטיסטיקות על הפוליטיקה בישראל</h1>
          <p className="muted">
            אתר עצמאי שאוסף עובדות, נתוני בחירות ופרופילים של מפלגות וחברי כנסת.
          </p>
          <p>
            אחוז ההצבעה בבחירות האחרונות עמד על {latestElection.turnoutPercent}%.{" "}
            <Link href="/elections" className="link-arrow">
              לכל נתוני הבחירות <span className="arrow">←</span>
            </Link>
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 20a5 5 0 0 1 10 0M15 20a4 4 0 0 1 6-3.5M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="stat-value">{politicians.length}</div>
              <div className="stat-label">חברי כנסת באתר</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 3v18M5 4h11l-2 3.5L16 11H5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="stat-value">{parties.length}</div>
              <div className="stat-label">מפלגות</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="stat-value">כנסת {latestElection.knesset}</div>
              <div className="stat-label">כהונה נוכחית</div>
            </div>
          </div>
        </div>
      </FadeIn>

      <h2>מפלגות</h2>
      <div className="card-grid">
        {parties.map((party, i) => {
          const chair = getPartyChair(party.slug);
          return (
            <FadeIn key={party.slug} delay={i * 0.06} y={10}>
              <Link
                href={`/parties/${party.slug}`}
                className="card card-link party-card"
                style={{ ["--party-color" as string]: party.color }}
              >
                <strong>{party.name}</strong>
                <p className="muted">{chair ? `יו"ר: ${chair.name}` : ""}</p>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
