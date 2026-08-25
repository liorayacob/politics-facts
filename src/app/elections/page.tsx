import { elections } from "@/data/elections";
import { parties } from "@/data/parties";
import { cities } from "@/data/cities";
import SeatsChart from "@/components/SeatsChart";
import IsraelMap from "@/components/IsraelMap";

export default function ElectionsPage() {
  return (
    <div>
      <h1>נתוני בחירות</h1>
      <p className="muted">מספר מנדטים ואחוזי הצבעה לפי מחזור בחירות.</p>

      <SeatsChart elections={elections} />

      <h2>טבלת נתונים</h2>
      <table>
        <thead>
          <tr>
            <th>שנה</th>
            <th>כנסת</th>
            <th>אחוז הצבעה</th>
            {parties.map((party) => (
              <th key={party.slug}>{party.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {elections.map((election) => (
            <tr key={election.knesset}>
              <td>{election.year}</td>
              <td>{election.knesset}</td>
              <td>{election.turnoutPercent}%</td>
              {parties.map((party) => (
                <td key={party.slug}>{election.seatsByParty[party.slug] ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>מפה לפי ערים</h2>
      <p className="muted">
        עברו עם העכבר מעל עיר לצפייה באחוז ההצבעה, ולחצו עליה כדי לראות את
        פילוח הקולות בין המפלגות.
      </p>
      <IsraelMap cities={cities} />
    </div>
  );
}
