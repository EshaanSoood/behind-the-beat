"use client";

import Image from "next/image";
import Link from "next/link";

import { InstagramIcon } from "./icons/Instagram";
import { LinkedInIcon } from "./icons/LinkedIn";
import { XIcon } from "./icons/X";
import { YouTubeIcon } from "./icons/YouTube";

const NAV_ITEMS = [
  { href: "/mission", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/reviews", label: "Reviews" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/rss.xml", label: "RSS" },
];

const ANGLE_CLASSES = ["nav-angle-1", "", "nav-angle-2", "nav-angle-1", "nav-angle-2"] as const;

const SOCIAL_LINKS = [
  { href: "https://instagram.com/behindthebeat", label: "Instagram", icon: InstagramIcon },
  { href: "https://youtube.com/@behindthebeat", label: "YouTube", icon: YouTubeIcon },
  { href: "https://twitter.com/behindthebeat", label: "X", icon: XIcon },
  { href: "https://linkedin.com/company/behindthebeat", label: "LinkedIn", icon: LinkedInIcon },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container-page site-footer__inner">
        <div className="surface-chamfer site-footer__brand">
          <Image src="/images/logo.png" alt="" width={120} height={52} />
          <span className="site-header__logo-wordmark" aria-hidden="true">
            Behind the Beat
          </span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="nav-list nav-list--wrap">
            {NAV_ITEMS.map((item, index) => {
              const angleClass = ANGLE_CLASSES[index % ANGLE_CLASSES.length];
              if (item.href.startsWith("http")) {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`nav-link nav-link--footer ${angleClass}`.trim()}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`nav-link nav-link--footer ${angleClass}`.trim()}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ul className="flex flex-wrap items-center gap-3">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                className="focus-chamfer surface-chamfer inline-flex items-center gap-2 border border-brand-pink300/60 bg-brand-pink100/10 px-4 py-2 text-sm font-medium text-brand-pink100 shadow-soft"
                aria-label={`Follow on ${label}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="site-footer__meta">
          <p>© {currentYear} Behind the Beat.</p>
          <p>Crafted for listeners who love the stories behind every song.</p>
        </div>
      </div>
    </footer>
  );
}

