import type { Episode } from "../../../../lib/content";
import { PortableTextRenderer } from "../../../../components/PortableTextRenderer";
import { ArtistLinks } from "../../../../components/ArtistLinks";

type EpisodeNotesProps = {
  episode: Episode;
};

export function EpisodeNotes({ episode }: EpisodeNotesProps) {
  const hasAboutTheArtist = episode.aboutTheArtist && episode.aboutTheArtist.length > 0;
  const hasArtistLinks = episode.artistLinks && (
    episode.artistLinks.instagram ||
    episode.artistLinks.youtube ||
    episode.artistLinks.website
  );

  return (
    <>
      {/* About the Artist section */}
      {hasAboutTheArtist && (
        <section className="about-artist flex flex-col gap-4" data-section="about-artist">
          <h2 className="font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]">
            About the Artist
          </h2>
          <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
            {episode.aboutTheArtist && <PortableTextRenderer value={episode.aboutTheArtist} />}
            {episode.transcriptUrl && (
              <p className="text-sm text-[var(--text-muted)]">
                <a href={episode.transcriptUrl} target="_blank" rel="noopener noreferrer" className="focus-chamfer hover:underline">
                  Read transcript →
                </a>
              </p>
            )}
          </div>
        </section>
      )}

      {/* Where to Find Them section */}
      {hasArtistLinks && (
        <section className="where-to-find flex flex-col gap-4 mt-8" data-section="where-to-find">
          <h2 className="font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)]">
            Where to Find Them
          </h2>
          <ArtistLinks
            instagram={episode.artistLinks?.instagram}
            youtube={episode.artistLinks?.youtube}
            website={episode.artistLinks?.website}
          />
        </section>
      )}
    </>
  );
}

