import type { Episode } from "../../../../lib/content";
import { PullQuote } from "../../../../components/PullQuote";

type EpisodeNotesProps = {
  episode: Episode;
};

export function EpisodeNotes({ episode }: EpisodeNotesProps) {
  return (
    <>
      {/* About the Artist section */}
      <section className="about-artist flex flex-col gap-4" data-section="about-artist">
        <h2 className="font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]">
          About the Artist
        </h2>
        <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
          {episode.notes && <p>{episode.notes}</p>}
          {episode.body.raw && (
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: episode.body.raw }}
            />
          )}
          {episode.transcriptUrl && (
            <p className="text-sm text-[var(--text-muted)]">
              <a href={episode.transcriptUrl} target="_blank" rel="noopener noreferrer" className="focus-chamfer hover:underline">
                Read transcript →
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Where to Find Them section */}
      <section className="where-to-find flex flex-col gap-4 mt-8" data-section="where-to-find">
        <h2 className="font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]">
          Where to Find Them
        </h2>
        <div className="flex flex-wrap gap-3">
          {/* Placeholder social chips - will be populated when Episode type includes social links */}
          <a
            href="#"
            className="focus-chamfer surface-chamfer inline-flex items-center gap-2 border border-[var(--border-accent-strong)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] shadow-soft transition hover:bg-[var(--bg-elevated)]"
            data-role="social-chip"
            aria-label="Artist website (placeholder)"
          >
            <span>Website</span>
          </a>
          <a
            href="#"
            className="focus-chamfer surface-chamfer inline-flex items-center gap-2 border border-[var(--border-accent-strong)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text)] shadow-soft transition hover:bg-[var(--bg-elevated)]"
            data-role="social-chip"
            aria-label="Artist Instagram (placeholder)"
          >
            <span>Instagram</span>
          </a>
        </div>
      </section>
    </>
  );
}

