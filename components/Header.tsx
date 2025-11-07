"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Mission" },
  { href: "/reviews", label: "Reviews" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="brand-bar">
      <div className="container-page">
        <div className="site-frame brand-row">
          <Link href="/" className="brand-wordmark">
            <Image
              src="/images/logo.png"
              alt="Behind the Beat"
              width={200}
              height={60}
              priority
              className="brand-logo"
            />
          </Link>
          <nav className="nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  data-active={active ? "true" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

