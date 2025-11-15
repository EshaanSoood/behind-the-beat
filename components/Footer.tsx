"use client";

import Link from "next/link";

import { InstagramIcon } from "./icons/Instagram";
import { PodcastIcon } from "./icons/Podcast";
import { YouTubeIcon } from "./icons/YouTube";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Mission" },
  { href: "/reviews", label: "Reviews" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/contact", label: "Contact" },
];

const ANGLE_CLASSES = ["nav-angle-1", "", "nav-angle-2", "nav-angle-1", "nav-angle-2"] as const;

const SOCIAL_LINKS = [
  { href: "https://youtube.com/@behindthebeat", label: "YouTube", icon: YouTubeIcon },
  { href: "/podcast", label: "Podcast", icon: PodcastIcon },
  { href: "https://instagram.com/behindthebeat", label: "Instagram", icon: InstagramIcon },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__bar">
        <div className="container-page site-footer__inner">
          <div className="site-footer__social">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="site-footer__social-link"
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <ul className="nav-list">
              {NAV_ITEMS.map((item, index) => {
                const angleClass = ANGLE_CLASSES[index % ANGLE_CLASSES.length];
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
        </div>
      </div>

      <div className="site-footer__meta">
        <div className="container-page">
          <p className="caption">
            <Link href="/privacy">Privacy</Link> · © {currentYear} Behind the Beat
          </p>
        </div>
      </div>
    </footer>
  );
}

