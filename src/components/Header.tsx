import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="site-title">
          עובדות ופוליטיקה
        </Link>
        <nav className="site-nav">
          <Link href="/parties">מפלגות</Link>
          <Link href="/politicians">פוליטיקאים</Link>
          <Link href="/elections">בחירות</Link>
        </nav>
      </div>
    </header>
  );
}
