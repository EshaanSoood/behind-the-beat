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
    <footer className="site-footer mt-12" role="contentinfo">
      <div className="site-footer__bar bg-brand-pink500 w-full py-6">
        <div className="container-page site-footer__inner flex items-center gap-6 flex-wrap">
          <div className="site-footer__social flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="site-footer__social-link inline-flex items-center justify-center text-brand-purple800 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-purple800 focus-visible:outline-offset-2 focus-visible:rounded-sm"
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <nav className="site-footer__nav flex-1" aria-label="Footer navigation">
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

      <div className="site-footer__meta py-4 text-[color-mix(in_oklab,var(--brand-purple-800)_70%,transparent)]">
        <div className="container-page">
          <p className="caption text-inherit">
            <Link href="/privacy" className="text-inherit underline underline-offset-2 hover:text-brand-purple800">Privacy</Link> · © {currentYear} Behind the Beat
          </p>
        </div>
      </div>
    </footer>
  );
}

