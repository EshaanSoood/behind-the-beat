# Behind the Beat Layout Acceptance Test Failures

## Summary
Total failures: 22 errors across 2 pages

## Special H1 Issues (Both Review and Podcast Entry Pages)

### Root Cause
The script is not finding the `.special-h1-bg-text` element. Debug output shows:
- `bgText: null` - Background text element not found
- Script is matching a `<TITLE>` element instead (16px font-size)
- This suggests the background text element isn't rendering or selector isn't matching

### Errors:
1. **[/reviews/acoustic-sessions] Special heading: oversized twin font-size not ~2× H1 (H1=44, twin=16)**
   - Expected: Background text should be ~88px (2× 44px)
   - Actual: Script finding TITLE element at 16px

2. **[/reviews/acoustic-sessions] Special heading: twin should use different (light pink) color than H1**
   - Expected: Background text should be light pink (rgb(255, 211, 232))
   - Actual: TITLE element has same color as H1

3. **[/reviews/acoustic-sessions] Special heading: H1 and oversized twin not roughly center-aligned**
   - Expected: Background text centered with H1
   - Actual: TITLE element not aligned

4. **[/podcast/city-sounds] Special heading: oversized twin font-size not ~2× H1 (H1=44, twin=16)**
   - Same as #1

5. **[/podcast/city-sounds] Special heading: twin should use different (light pink) color than H1**
   - Same as #2

6. **[/podcast/city-sounds] Special heading: H1 and oversized twin not roughly center-aligned**
   - Same as #3

## Review Entry Page Issues (/reviews/acoustic-sessions)

### Layout Issues:
7. **Review entry: main column should be narrower than site container (page feel)**
   - Status: Fixed (reduced EntryColumn max-width to 700px)
   - May need verification that fix is working

### Missing Elements (All elements exist in code, script not finding them):
8. **Review entry: missing meta data in header**
   - Element exists: `<p data-role="meta">` in ReviewHeader component
   - Issue: Script not finding element within `[data-role="entry-header"]`

9. **Review entry: missing share chips row**
   - Element exists: `<div data-role="share-chips">` in ReviewHeader component
   - Issue: Script not finding element

10. **Review entry: missing album art in header**
    - Element exists: `<div data-role="album-art">` in ReviewHeader component (conditional on review.cover)
    - Issue: Script not finding element

11. **Review entry: missing styled pull quote under header**
    - Element exists: `<div data-role="pull-quote">` in page.tsx (conditional on review.pullQuote)
    - Issue: Script not finding element

12. **Review entry: missing tracklist panel near the end**
    - Element exists: `<aside data-role="tracklist-panel">` in TracklistBox component
    - Issue: Script not finding element

13. **Review entry: missing streaming chips row below tracklist**
    - Element exists: `<div data-role="streaming-row">` in TracklistBox component (conditional on review.streaming)
    - Issue: Script not finding element

14. **Review entry: streaming row should contain platform chips/buttons**
    - Element exists: StreamingButtons component within streaming-row
    - Issue: Script not finding chips/buttons

15. **Review entry: expected inline images in body for size S/M/L checks**
    - Status: Content issue - review markdown doesn't contain images
    - May need to add test images to review content

## Podcast Entry Page Issues (/podcast/city-sounds)

### Layout Issues:
16. **Podcast entry: main column should be narrower than site container (page feel)**
    - Status: Fixed (reduced EntryColumn max-width to 700px)
    - May need verification that fix is working

### Missing Elements (All elements exist in code, script not finding them):
17. **Podcast entry: missing meta data under headline**
    - Element exists: `<p data-role="meta">` in EpisodeHeader component
    - Issue: Script not finding element

18. **Podcast entry: missing share chips row**
    - Element exists: `<div data-role="share-chips">` in EpisodeHeader component
    - Issue: Script not finding element

19. **Podcast entry: missing YouTube embed player below header**
    - Element exists: `<section data-role="episode-player">` in EpisodePlayer component
    - Issue: Script not finding element (may be in separate Section)

20. **Podcast entry: missing "About the Artist" section**
    - Element exists: `<section data-section="about-artist">` in EpisodeNotes component
    - Issue: Script not finding element

21. **Podcast entry: missing "Where to Find Them" section**
    - Element exists: `<section data-section="where-to-find">` in EpisodeNotes component
    - Issue: Script not finding element

22. **Podcast entry: "Where to Find Them" should contain social link chips/buttons**
    - Element exists: `<a data-role="social-chip">` elements in EpisodeNotes component
    - Issue: Script not finding chips/buttons

## Analysis

### Common Issues:
1. **SpecialH1 Background Text**: Element not being found by script - likely rendering/hydration issue
2. **Missing Elements**: All reported "missing" elements actually exist in code - script not finding them due to:
   - Timing/hydration issues (despite increased wait times)
   - Selector issues (elements nested in multiple containers)
   - React Server Components not fully hydrated when script runs

### Next Steps:
1. Fix SpecialH1 background text rendering/selector issue
2. Verify elements are actually rendered in DOM (check with browser DevTools)
3. Adjust script selectors or wait conditions
4. Consider if elements need to be client components vs server components

