"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { SubscribeModal } from "./SubscribeModal";

const NAV_ITEMS = [
  { href: "/mission", label: "Mission" },
  { href: "/reviews", label: "Deep Dives" },
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
    <header className="site-header relative w-full max-w-[1200px] mx-auto mt-3 px-4 py-3 text-brand-purple-800" role="banner">
      <div className="site-header__layout flex items-center justify-between gap-4">
        <div className="site-header__cluster flex items-stretch gap-0 min-w-0">
          <Link
            href="/"
            className="site-header__brand relative flex items-center gap-3 no-underline text-inherit py-2"
            aria-label="Behind the Beat home"
            data-logo-block="true"
          >
            <span className="site-header__brand-mark inline-flex items-center justify-center w-[clamp(120px,10vw,176px)]" data-logo="true">
              <Image src="/images/logo.png" alt="Behind the Beat logo" width={144} height={56} priority />
            </span>
          </Link>
          <nav className="site-header__nav relative hidden md:flex items-center py-2 px-[calc(var(--space-6)+var(--nav-stripe))] -ml-0.5 self-stretch z-[1] shadow-soft" aria-label="Primary navigation">
            <span aria-hidden="true" data-divider="angled" className="site-header__nav-divider" />
            <ul className="nav-list flex items-center gap-[1.5rem] font-display uppercase tracking-[0.12em] text-[0.95rem] justify-center">
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                const angleClass = ANGLE_CLASSES[index % ANGLE_CLASSES.length];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600 ${angleClass} ${isActive ? "is-active" : ""}`.trim()}
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
                  className="nav-link nav-angle-2 relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600"
                  onClick={() => setSubscribeOpen(true)}
                  aria-label="Subscribe to newsletter"
                >
                  SUBSCRIBE
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-header__mobile flex items-center ml-auto relative">
          <button
            type="button"
            className="site-header__mobile-trigger inline-flex items-center justify-center w-11 h-11 border-none text-brand-purple-800 shadow-soft"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <svg className="w-[22px] h-[22px]" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              {mobileOpen ? (
                <path d="M6.343 6.343a1 1 0 0 1 1.414 0L12 10.586l4.243-4.243a1 1 0 1 1 1.414 1.414L13.414 12l4.243 4.243a1 1 0 0 1-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 0 1-1.414-1.414L10.586 12 6.343 7.757a1 1 0 0 1 0-1.414Z" />
              ) : (
                <path d="M3.75 7.5a1 1 0 0 1 1-1h14.5a1 1 0 1 1 0 2H4.75a1 1 0 0 1-1-1Zm0 5.5a1 1 0 0 1 1-1h14.5a1 1 0 1 1 0 2H4.75a1 1 0 0 1-1-1Zm1 4.5a1 1 0 1 0 0 2h14.5a1 1 0 1 0 0-2H4.75Z" />
              )}
            </svg>
          </button>

          <div className="site-header__mobile-panel absolute top-[calc(100%+var(--space-2))] right-0 w-[min(320px,90vw)] bg-surface border border-accent-strong shadow-card p-4 hidden flex-col gap-3 z-20 data-[open=true]:flex" data-open={mobileOpen} id={menuId} role="dialog" aria-modal="false">
            <nav aria-label="Mobile primary navigation">
              <ul className="nav-list nav-list--wrap flex items-center gap-6 font-display uppercase tracking-[0.12em] text-[0.95rem] flex-wrap gap-y-3">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`nav-link relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600 font-display uppercase tracking-[0.08em] ${isActive ? "is-active" : ""}`.trim()}
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
                    className="nav-link relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600 font-display uppercase tracking-[0.08em]"
                    onClick={() => {
                      setSubscribeOpen(true);
                      handleMobileNavClick();
                    }}
                    aria-label="Subscribe to newsletter"
                  >
                    SUBSCRIBE
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

