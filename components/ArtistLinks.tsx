import { InstagramIcon } from "./icons/Instagram";
import { YouTubeIcon } from "./icons/YouTube";
import { LinkIcon } from "./icons/Link";

type ArtistLinksProps = {
  instagram?: string;
  youtube?: string;
  website?: string;
};

export function ArtistLinks({ instagram, youtube, website }: ArtistLinksProps) {
  const links = [];

  if (website) {
    links.push(
      <a
        key="website"
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-chamfer surface-chamfer inline-flex items-center gap-2 border border-[var(--border-accent-strong)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] shadow-soft transition hover:bg-[var(--bg-elevated)]"
        data-role="social-chip"
        aria-label="Artist website"
      >
        <LinkIcon className="h-4 w-4" />
        <span>Website</span>
      </a>
    );
  }

  if (instagram) {
    links.push(
      <a
        key="instagram"
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-chamfer surface-chamfer inline-flex items-center gap-2 border border-[var(--border-accent-strong)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] shadow-soft transition hover:bg-[var(--bg-elevated)]"
        data-role="social-chip"
        aria-label="Artist Instagram"
      >
        <InstagramIcon className="h-4 w-4" />
        <span>Instagram</span>
      </a>
    );
  }

  if (youtube) {
    links.push(
      <a
        key="youtube"
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-chamfer surface-chamfer inline-flex items-center gap-2 border border-[var(--border-accent-strong)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] shadow-soft transition hover:bg-[var(--bg-elevated)]"
        data-role="social-chip"
        aria-label="Artist YouTube"
      >
        <YouTubeIcon className="h-4 w-4" />
        <span>YouTube</span>
      </a>
    );
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((link, index) => (
        <span key={index} className="flex items-center">
          {link}
          {index < links.length - 1 && (
            <span className="text-[var(--text-muted)] ml-3" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

