# Glass surface effect for tracklist panel diff

Added glassmorphism effect to the tracklist panel on review entry pages. The glass surface effect uses `backdrop-filter` to create a frosted glass appearance while preserving the trapezoid shape and pink background color.

## Changes

```diff
diff --git a/styles/globals.css b/styles/globals.css
index 0000000..0000000 100644
--- a/styles/globals.css
+++ b/styles/globals.css
@@ -297,6 +297,11 @@
   /* Fallback for very old browsers: square corners maintain layout */
   @supports not (clip-path: polygon(0 0)) {
     :where(.surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
       border-radius: 0;
     }
   }
+
+  /* Glass surface effect for tracklist panel */
+  .tracklist-panel {
+    backdrop-filter: blur(12px) saturate(180%);
+    -webkit-backdrop-filter: blur(12px) saturate(180%);
+  }
 
   /* HomeCard wiggle animation */
```

## Notes

- The `tracklist-panel` class already existed in `app/reviews/[slug]/components/TracklistBox.tsx`, so no component changes were needed
- The glass effect is applied only to the tracklist panel on review entry pages
- The trapezoid shape (`surface-chamfer`) and pink background color (`bg-[var(--surface-frost-pink-70)]`) are preserved
- The `backdrop-filter` creates a frosted glass effect by blurring and saturating content behind the panel
- Includes `-webkit-backdrop-filter` for Safari browser support
- Inspired by the glass surface component from reactbits.dev

