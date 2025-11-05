import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Mission" },
  { href: "/reviews", label: "Reviews" },
  { href: "/podcast", label: "Podcasts" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header>
      <nav aria-label="Main">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

