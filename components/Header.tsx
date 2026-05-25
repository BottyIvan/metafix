import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          MetaFix
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
