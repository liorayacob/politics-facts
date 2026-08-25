import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "עובדות ופוליטיקה",
  description: "עובדות וסטטיסטיקות על פוליטיקה, בחירות ומפלגות בישראל",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body>
        <Header />
        <main className="container page-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
