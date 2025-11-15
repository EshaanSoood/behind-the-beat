"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { SubscribeModal } from "./SubscribeModal";

const NAV_ITEMS = [
  { href: "/mission", label: "Mission" },
  { href: "/reviews", label: "Reviews" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/contact", label: "Contact" },
];

const ANGLE_CLASSES = ["nav-angle-1", "", "nav-angle-2", "nav-angle-1", "nav-angle-2"] as const;

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="site-header" role="banner">
      <div className="site-header__layout">
        <div className="site-header__cluster">
          <Link
            href="/"
            className="site-header__brand"
            aria-label="Behind the Beat home"
            data-logo-block="true"
          >
            <span className="site-header__brand-mark" data-logo="true">
              <Image src="/images/logo.png" alt="Behind the Beat logo" width={144} height={56} priority />
            </span>
          </Link>
          <nav className="site-header__nav" aria-label="Primary navigation">
            <span aria-hidden="true" data-divider="angled" className="site-header__nav-divider" />
            <ul className="nav-list">
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                const angleClass = ANGLE_CLASSES[index % ANGLE_CLASSES.length];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link ${angleClass} ${isActive ? "is-active" : ""}`.trim()}
                      aria-current={isActive ? "page" : undefined}
                      onClick={handleMobileNavClick}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  className="nav-link nav-angle-2"
                  onClick={() => setSubscribeOpen(true)}
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-header__mobile">
          <button
            type="button"
            className="site-header__mobile-trigger"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              {mobileOpen ? (
                <path d="M6.343 6.343a1 1 0 0 1 1.414 0L12 10.586l4.243-4.243a1 1 0 1 1 1.414 1.414L13.414 12l4.243 4.243a1 1 0 0 1-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 0 1-1.414-1.414L10.586 12 6.343 7.757a1 1 0 0 1 0-1.414Z" />
              ) : (
                <path d="M3.75 7.5a1 1 0 0 1 1-1h14.5a1 1 0 1 1 0 2H4.75a1 1 0 0 1-1-1Zm0 5.5a1 1 0 0 1 1-1h14.5a1 1 0 1 1 0 2H4.75a1 1 0 0 1-1-1Zm1 4.5a1 1 0 1 0 0 2h14.5a1 1 0 1 0 0-2H4.75Z" />
              )}
            </svg>
          </button>

          <div className="site-header__mobile-panel" data-open={mobileOpen} id={menuId} role="dialog" aria-modal="false">
            <nav aria-label="Mobile primary navigation">
              <ul className="nav-list nav-list--wrap">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`nav-link ${isActive ? "is-active" : ""}`.trim()}
                        aria-current={isActive ? "page" : undefined}
                        onClick={handleMobileNavClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    type="button"
                    className="nav-link"
                    onClick={() => {
                      setSubscribeOpen(true);
                      handleMobileNavClick();
                    }}
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <SubscribeModal isOpen={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </header>
  );
}

