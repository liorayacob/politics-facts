// Placeholder data — real, recognizable party names so the map/legend look
// meaningful, but colors, founding years, and descriptions are all
// placeholders for you to replace with sourced facts. Colors were picked
// purely for maximum visual distinction on the map/legend (evenly spread
// hues) — they don't try to match each party's real branding.
import type { Party } from "./types";

export const parties: Party[] = [
  {
    slug: "likud",
    name: "הליכוד",
    founded: 1973,
    color: "#3ea6da",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yesh-atid",
    name: "יש עתיד",
    founded: 2012,
    color: "#29ae45",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "national-unity",
    name: "המחנה הממלכתי",
    founded: 2020,
    color: "#6029ae",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "religious-zionism",
    name: "הציונות הדתית",
    founded: 1999,
    color: "#ae7d29",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "shas",
    name: "ש\"ס",
    founded: 1984,
    color: "#29ae9a",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "torah-judaism",
    name: "יהדות התורה",
    founded: 1992,
    color: "#ae29a7",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yisrael-beiteinu",
    name: "ישראל ביתנו",
    founded: 1999,
    color: "#8aae29",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "labor",
    name: "העבודה",
    founded: 1968,
    color: "#2970ae",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "raam",
    name: "רע״ם",
    founded: 1996,
    color: "#ae2953",
    description: "הרשימה הערבית המאוחדת.",
    ideology: ["ערבית", "אסלאמית"],
  },
  {
    slug: "hadash-taal",
    name: "חד״ש־תע״ל",
    founded: 2022,
    color: "#36ae29",
    description: "רשימה משותפת של חד״ש ותע״ל בבחירות לכנסת ה־25.",
    ideology: ["ערבית", "שמאל"],
  },
  {
    slug: "meretz",
    name: "מרצ",
    founded: 1992,
    color: "#3629ae",
    description: "מפלגת שמאל ציונית.",
    ideology: ["שמאל", "חברתי"],
  },
  {
    slug: "balad",
    name: "בל״ד",
    founded: 1995,
    color: "#ae5329",
    description: "ברית לאומית דמוקרטית.",
    ideology: ["ערבית", "לאומית"],
  },
  {
    slug: "jewish-home",
    name: "הבית היהודי",
    founded: 2008,
    color: "#29ae70",
    description: "מפלגה ציונית־דתית.",
    ideology: ["ציונות דתית", "ימין"],
  },
  {
    slug: "economic-freedom",
    name: "חופש כלכלי",
    founded: 2022,
    color: "#8a29ae",
    description: "רשימת חופש כלכלי בראשות אביר קארה.",
    ideology: ["כלכלה", "ליברלי"],
  },
  {
    slug: "courage-for-you",
    name: "באומץ בשבילך",
    founded: 2022,
    color: "#aea729",
    description: "רשימת באומץ בשבילך.",
    ideology: ["אחר"],
  },
  {
    slug: "new-economic",
    name: "הכלכלית החדשה",
    founded: 2020,
    color: "#299aae",
    description: "המפלגה הכלכלית החדשה.",
    ideology: ["כלכלה"],
  },
  {
    slug: "burning-youth",
    name: "צעירים בוערים",
    founded: 2022,
    color: "#ae297d",
    description: "צעירים בוערים בהנהגת הדר מוכתר.",
    ideology: ["צעירים", "כלכלה"],
  },
  {
    slug: "pirates",
    name: "הפיראטים",
    founded: 2012,
    color: "#60ae29",
    description: "מפלגת הפיראטים.",
    ideology: ["דיגיטל", "זכויות"],
  },
  {
    slug: "environment-and-animals",
    name: "קול הסביבה והחי",
    founded: 2022,
    color: "#2945ae",
    description: "רשימה בנושאי סביבה ובעלי חיים.",
    ideology: ["סביבה", "בעלי חיים"],
  },

];

export function getPartyBySlug(slug: string): Party | undefined {
  return parties.find((p) => p.slug === slug);
}
