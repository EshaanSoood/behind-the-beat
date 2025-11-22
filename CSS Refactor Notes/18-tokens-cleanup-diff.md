# Tokens Cleanup Diff (Step 18)

## Summary

Removed 8 unused tokens from `tokens.css` that had zero references in the codebase.

## Diff

```diff
diff --git a/styles/tokens.css b/styles/tokens.css
index ed18606..0ed9f5b 100644
--- a/styles/tokens.css
+++ b/styles/tokens.css
@@ -16,9 +16,6 @@
   --surface-frost-pink-85: color-mix(in oklab, var(--brand-pink-100) 85%, transparent);
   --surface-frost-purple-30: color-mix(in oklab, var(--brand-purple-600) 30%, transparent);
   --surface-frost-white-90: color-mix(in oklab, var(--offwhite) 90%, transparent);
-  --gradient-card-review: linear-gradient(135deg, color-mix(in oklab, var(--magazine-white) 90%, var(--brand-pink-100) 10%) 0%, color-mix(in oklab, var(--magazine-white) 85%, var(--brand-pink-100) 15%) 100%);
-  --gradient-card-podcast: linear-gradient(135deg, color-mix(in oklab, var(--magazine-white) 88%, var(--brand-pink-100) 12%) 0%, color-mix(in oklab, var(--magazine-white) 80%, var(--brand-purple-600) 20%) 100%);
-  --gradient-hero-title: linear-gradient(90deg, color-mix(in oklab, var(--brand-purple-800) 65%, transparent) 0%, color-mix(in oklab, var(--brand-purple-800) 20%, transparent) 60%, transparent 100%);
   
   /* Shared color tokens */
   --text-deep-purple: var(--brand-purple-800);
@@ -54,7 +51,6 @@
   
   /* Paper grain opacity (for SVG) */
   --paper-grain-opacity: 0.12;
-  --asset-root: /;
 
   /* Typography */
   --font-display: "GrobeDeutschmeister", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
@@ -90,13 +86,9 @@
   
   /* Slant angles */
   --slant-base: -18deg; /* default divider angle */
-  --slant-1: -14deg;
-  --slant-2: -18deg;
-  --slant-3: -22deg;
   --divider-thickness: 8px; /* hairline thickness for slanted rules */
 
   /* Layout rhythm */
-  --gutter-horizontal: clamp(1rem, 2vw, 2.5rem);
   --home-grid-gap: var(--space-6);
   --home-card-padding: var(--space-6);
   --home-card-gap: var(--space-4);
```

