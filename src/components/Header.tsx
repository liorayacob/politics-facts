"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/parties", label: "מפלגות" },
  { href: "/politicians", label: "חברי כנסת" },
  { href: "/elections", label: "בחירות" },
  { href: "/about", label: "אודות" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="site-title">
          עובדות ופוליטיקה
        </Link>
        <nav className="site-nav">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "active" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
