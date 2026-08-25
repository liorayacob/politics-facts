import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "עובדות ופוליטיקה",
  description: "עובדות וסטטיסטיקות על פוליטיקה, בחירות ומפלגות בישראל",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Header />
        <main className="container page-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
