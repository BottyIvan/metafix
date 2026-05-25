import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const SOCIAL_LINKS = [
  { href: process.env.NEXT_PUBLIC_GITHUB_URL, icon: Github, label: "GitHub" },
  {
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    icon: Linkedin,
    label: "LinkedIn",
  },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const LEGAL_LINKS = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/cookies", label: "Cookie" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-20 pb-0">
        <div className="mb-12 sm:mb-16 grid gap-10 sm:gap-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight">MetaFix</h2>
              <p className="text-sm text-foreground/70 mt-1">
                © {year} MetaFix. All rights reserved.
              </p>
            </div>
            <p className="text-sm text-foreground/80">
              Effortlessly inspect and remove metadata from your files.
            </p>
            <div className="flex gap-3 mt-2">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={`https://${href}`}
                  aria-label={label}
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={24} className="text-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-tight">Navigate</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-tight">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 sm:mt-4 -mx-4 sm:-mx-10 lg:-mx-20 overflow-hidden flex justify-center">
          <h1
            aria-hidden="true"
            className="font-sans font-semibold uppercase whitespace-nowrap tracking-[-0.055em] leading-[0.8] text-[clamp(3.5rem,22vw,21rem)] select-none text-center"
          >
            META-FIX
          </h1>
        </div>
      </div>
    </footer>
  );
}
