import { elections } from "@/data/elections";
import { getTicketsByKnesset } from "@/data/tickets";
import { getPartyBySlug } from "@/data/parties";
import { cities } from "@/data/cities";
import SeatsChart from "@/components/SeatsChart";
import MapSection from "@/components/MapSection";

export default function ElectionsPage() {
  return (
    <div>
      <h1>נתוני בחירות</h1>
      <p className="muted">מספר מנדטים ואחוזי הצבעה לפי מחזור בחירות.</p>

      <SeatsChart elections={elections} />

      <h2>טבלת נתונים</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>כנסת</th>
              <th>אות</th>
              <th>רשימה</th>
              <th>אחוז הצבעה</th>
              <th>מנדטים</th>
            </tr>
          </thead>
          <tbody>
            {elections.map((election) =>
              getTicketsByKnesset(election.knesset).map((ticket) => (
                <tr key={ticket.slug}>
                  <td>{election.knesset}</td>
                  <td>{ticket.letter}</td>
                  <td>
                    <span className="party-dot" style={{ background: ticket.color }} />{" "}
                    {ticket.name}
                    {ticket.memberPartySlugs.length > 1 && (
                      <span className="muted">
                        {" "}
                        (רשימה משותפת עם{" "}
                        {ticket.memberPartySlugs
                          .filter((slug) => getPartyBySlug(slug)?.name !== ticket.name)
                          .map((slug) => getPartyBySlug(slug)?.name ?? slug)
                          .join(" ו")}
                        )
                      </span>
                    )}
                  </td>
                  <td>{ticket.votePct}%</td>
                  <td>{ticket.seats}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2>מפה לפי ערים</h2>
      <MapSection cities={cities} />
    </div>
  );
}
