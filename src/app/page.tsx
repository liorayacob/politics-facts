import Link from "next/link";
import { parties } from "@/data/parties";
import { politicians } from "@/data/politicians";
import { elections } from "@/data/elections";

export default function Home() {
  const latestElection = elections[elections.length - 1];

  return (
    <div>
      <div className="hero">
        <h1>עובדות וסטטיסטיקות על הפוליטיקה בישראל</h1>
        <p className="muted">
          אתר עצמאי שאוסף עובדות, נתוני בחירות ופרופילים של מפלגות וחברי כנסת.
        </p>
        <p>
          בבחירות לכנסת ה-{latestElection.knesset} ({latestElection.year}) עמד
          אחוז ההצבעה על {latestElection.turnoutPercent}%.{" "}
          <Link href="/elections">לכל נתוני הבחירות ←</Link>
        </p>
      </div>

      <h2>מפלגות</h2>
      <div className="card-grid">
        {parties.map((party) => (
          <Link key={party.slug} href={`/parties/${party.slug}`} className="card card-link">
            <strong>{party.name}</strong>
            <p className="muted">{party.leader}</p>
          </Link>
        ))}
      </div>

      <h2>חברי כנסת</h2>
      <div className="card-grid">
        {politicians.map((politician) => (
          <Link
            key={politician.slug}
            href={`/politicians/${politician.slug}`}
            className="card card-link"
          >
            <strong>{politician.name}</strong>
            <p className="muted">{politician.role}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
