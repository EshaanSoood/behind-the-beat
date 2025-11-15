import { SpecialH1 } from "../../../components/SpecialH1";

export function MissionProse() {
  return (
    <article className="flex flex-col gap-8">
      <SpecialH1>Our Mission</SpecialH1>
      
      {/* Two-column layout: Mission body and Meet the Editor */}
      <div className="mission-columns-wrapper grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Left column: Mission body */}
        <div className="mission-body" data-section="mission-body" data-role="mission-body">
          <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
            <p>
              Placeholder mission statement. In Step 3 we will weave in the brand
              voice, visuals, and supporting photography that speak to the magazine
              vibe.
            </p>
            <p>
              For now, this copy shell reminds us of the desired cadence and text
              measure so long-form stories stay comfortable to read.
            </p>
          </div>
        </div>

        {/* Slanted divider - visible on desktop */}
        <div
          className="mission-divider hidden md:block"
          data-role="mission-divider"
          aria-hidden="true"
        />

        {/* Right column: Meet the Editor */}
        <div className="mission-editor" data-section="mission-editor" data-role="mission-editor">
          <h2 className="mb-4 font-display text-[var(--text-h2)] leading-tight text-[var(--text-strong)]">
            Meet the Editor
          </h2>
          <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-[var(--text)]">
            <p>
              Short introduction about the editor. This section provides context
              about who is behind Behind the Beat and their vision for the magazine.
            </p>
            <p>
              Additional details about the editor&apos;s background, musical interests,
              and what drives their passion for music journalism.
            </p>
          </div>
        </div>
      </div>

      {/* Editor photo - centered below columns */}
      <div className="mission-photo-wrapper flex justify-center">
        <div
          className="mission-photo surface-chamfer relative max-w-md overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)]"
          data-role="mission-photo"
        >
          {/* Placeholder for editor photo - replace with actual image */}
          <div className="aspect-[4/3] bg-[var(--brand-pink-100)] flex items-center justify-center text-[var(--text-muted)]">
            Editor Photo
          </div>
        </div>
      </div>
    </article>
  );
}

