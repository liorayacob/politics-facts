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
    color: "#c73e3e",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yesh-atid",
    name: "יש עתיד",
    founded: 2012,
    color: "#1b998b",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "national-unity",
    name: "המחנה הממלכתי",
    founded: 2020,
    color: "#2f66c9",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "religious-zionism",
    name: "הציונות הדתית",
    founded: 1999,
    color: "#2e7d5b",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "shas",
    name: "ש\"ס",
    founded: 1984,
    color: "#c15a2e",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "torah-judaism",
    name: "יהדות התורה",
    founded: 1992,
    color: "#6a3fd6",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "yisrael-beiteinu",
    name: "ישראל ביתנו",
    founded: 1999,
    color: "#a3348a",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "labor",
    name: "העבודה",
    founded: 1968,
    color: "#6f8a1f",
    description: "תיאור לדוגמה — יש להחליף בפרטים אמיתיים ומתועדים.",
    ideology: ["תגית 1", "תגית 2"],
  },
  {
    slug: "raam",
    name: "רע״ם",
    founded: 1996,
    color: "#2f8f4e",
    description: "הרשימה הערבית המאוחדת.",
    ideology: ["ערבית", "אסלאמית"],
  },
  {
    slug: "hadash-taal",
    name: "חד״ש־תע״ל",
    founded: 2022,
    color: "#8b3d7a",
    description: "רשימה משותפת של חד״ש ותע״ל בבחירות לכנסת ה־25.",
    ideology: ["ערבית", "שמאל"],
  },
  {
    slug: "meretz",
    name: "מרצ",
    founded: 1992,
    color: "#4a9b4f",
    description: "מפלגת שמאל ציונית.",
    ideology: ["שמאל", "חברתי"],
  },
  {
    slug: "balad",
    name: "בל״ד",
    founded: 1995,
    color: "#d08a2e",
    description: "ברית לאומית דמוקרטית.",
    ideology: ["ערבית", "לאומית"],
  },
  {
    slug: "jewish-home",
    name: "הבית היהודי",
    founded: 2008,
    color: "#5976b8",
    description: "מפלגה ציונית־דתית.",
    ideology: ["ציונות דתית", "ימין"],
  },
  {
    slug: "economic-freedom",
    name: "חופש כלכלי",
    founded: 2022,
    color: "#7b8794",
    description: "רשימת חופש כלכלי בראשות אביר קארה.",
    ideology: ["כלכלה", "ליברלי"],
  },
  {
    slug: "courage-for-you",
    name: "באומץ בשבילך",
    founded: 2022,
    color: "#9b6f55",
    description: "רשימת באומץ בשבילך.",
    ideology: ["אחר"],
  },
  {
    slug: "new-economic",
    name: "הכלכלית החדשה",
    founded: 2020,
    color: "#5b8890",
    description: "המפלגה הכלכלית החדשה.",
    ideology: ["כלכלה"],
  },
  {
    slug: "burning-youth",
    name: "צעירים בוערים",
    founded: 2022,
    color: "#bd6b3d",
    description: "צעירים בוערים בהנהגת הדר מוכתר.",
    ideology: ["צעירים", "כלכלה"],
  },
  {
    slug: "pirates",
    name: "הפיראטים",
    founded: 2012,
    color: "#6d6d8f",
    description: "מפלגת הפיראטים.",
    ideology: ["דיגיטל", "זכויות"],
  },
  {
    slug: "environment-and-animals",
    name: "קול הסביבה והחי",
    founded: 2022,
    color: "#6d8e56",
    description: "רשימה בנושאי סביבה ובעלי חיים.",
    ideology: ["סביבה", "בעלי חיים"],
  },

];

export function getPartyBySlug(slug: string): Party | undefined {
  return parties.find((p) => p.slug === slug);
}
