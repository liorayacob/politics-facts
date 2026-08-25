"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/parties", label: "מפלגות" },
  { href: "/politicians", label: "חברי כנסת" },
  { href: "/elections", label: "בחירות" },
  { href: "/about", label: "אודות" },
];

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="9" fill="url(#logo-gradient)" />
      <path
        d="M9 16.5 14 21.5 23 11"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="#4f8ef7" />
          <stop offset="1" stopColor="#2f66c9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="site-title">
          <Logo />
          עובדות ופוליטיקה
        </Link>
        <nav className="site-nav">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className="nav-link-wrap">
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className={`nav-link-label${isActive ? " active" : ""}`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
