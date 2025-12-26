# Entry Page Layout Fix Diff

This document shows the layout changes applied to entry pages (review and podcast) from commit `457a790` on top of the CSS refactor branch.

## Files Changed

- `app/podcast/[slug]/page.tsx`
- `app/podcast/[slug]/components/EpisodeHeader.tsx`
- `app/reviews/[slug]/page.tsx`
- `app/reviews/[slug]/components/ReviewHeader.tsx`

## Key Changes

### EpisodeHeader.tsx
- Added `items-center` to header for centering content
- Added `text-center` to meta paragraph
- Added `flex justify-center` to share chips container
- Removed `entry-header` class (replaced with Tailwind utilities)

### ReviewHeader.tsx
- Added `items-center` to inner content div
- Added `text-center` to meta paragraph
- Changed share chips from `md:absolute md:bottom-0` positioning to `flex justify-center`
- Changed from `md:h-[240px] md:relative` to `md:min-h-[240px] md:justify-between` for better flex behavior

### Podcast Entry Page (page.tsx)
- Added wider container (`max-w-[900px]`) for header section
- Added wider container for player section
- Maintained `EntryColumn` for episode notes (constrained prose width)

### Review Entry Page (page.tsx)
- Added wider container (`max-w-[900px]`) for header section
- Moved pull quote outside of header container, into its own `EntryColumn`
- Added wider container for footer section (tracklist and artist links)
- Maintained `EntryColumn` for review body (constrained prose width)

## Layout Structure

### Podcast Entry
```
Section (article)
  ├── Breadcrumbs
  └── podcast-header-container (max-w-900px, centered)
      └── EpisodeHeader (centered content)

Section
  └── podcast-player-container (max-w-900px, centered)
      └── EpisodePlayer

Section
  └── EntryColumn (constrained prose width)
      └── EpisodeNotes
```

### Review Entry
```
Section (article)
  ├── Breadcrumbs
  ├── review-header-container (max-w-900px, centered)
  │   └── ReviewHeader (centered left column, album art right)
  └── EntryColumn (constrained prose width)
      └── PullQuote

Section
  └── EntryColumn (constrained prose width)
      └── ReviewBody

Section
  └── review-footer-container (max-w-900px, centered)
      ├── TracklistBox
      └── ArtistLinks (if Live review)
```

## Notes

- All layout fixes preserve the refactored CSS and Tailwind utilities
- Centering is achieved through Flexbox utilities (`items-center`, `justify-center`)
- Wider containers use `max-w-[900px]` for headers/footers
- Prose content maintains constrained width via `EntryColumn` component
- Changes maintain accessibility and semantic HTML structure






