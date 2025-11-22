# Stack utilities refactor diff

Unified diff of changes made to remove stack utilities from `globals.css`:

```diff
diff --git a/styles/globals.css b/styles/globals.css
index 18cf071..8ca557f 100644
--- a/styles/globals.css
+++ b/styles/globals.css
@@ -9,1565 +9,1558 @@
   font-display: swap;
 }
 
-html,
-body {
-  background: var(--bg);
-  color: var(--text);
-  font-family: var(--font-body);
-  min-height: 100%;
-  hyphens: none !important;
-  -webkit-hyphens: none !important;
-  -moz-hyphens: none !important;
-  -ms-hyphens: none !important;
-}
+@layer base {
+  html,
+  body {
+    background: var(--bg);
+    color: var(--text);
+    font-family: var(--font-body);
+    min-height: 100%;
+    hyphens: none !important;
+    -webkit-hyphens: none !important;
+    -moz-hyphens: none !important;
+    -ms-hyphens: none !important;
+  }
 
-* {
-  box-sizing: border-box;
-}
+  * {
+    box-sizing: border-box;
+  }
 
-a {
-  color: inherit;
-  text-decoration: none;
-}
+  a {
+    color: inherit;
+    text-decoration: none;
+  }
 
-a:focus-visible,
-button:focus-visible,
-input:focus-visible,
-textarea:focus-visible,
-select:focus-visible {
-  outline: 2px solid currentColor;
-  outline-offset: 2px;
-}
+  a:focus-visible,
+  button:focus-visible,
+  input:focus-visible,
+  textarea:focus-visible,
+  select:focus-visible {
+    outline: 2px solid currentColor;
+    outline-offset: 2px;
+  }
 
-h1,
-h2,
-h3 {
-  font-family: var(--font-display);
-  margin: 0;
-}
+  h1,
+  h2,
+  h3 {
+    font-family: var(--font-display);
+    margin: 0;
+  }
 
-h1 {
-  font-size: var(--text-h1);
-  line-height: var(--lh-tight);
-  color: var(--text-strong);
-}
+  h1 {
+    font-size: var(--text-h1);
+    line-height: var(--lh-tight);
+    color: var(--text-strong);
+  }
 
-h2 {
-  font-size: var(--text-h2);
-  line-height: var(--lh-tight);
-  color: var(--text-strong);
-}
+  h2 {
+    font-size: var(--text-h2);
+    line-height: var(--lh-tight);
+    color: var(--text-strong);
+  }
 
-h3 {
-  font-size: var(--text-h3);
-  line-height: var(--lh-snug);
-  color: var(--text-strong);
-}
+  h3 {
+    font-size: var(--text-h3);
+    line-height: var(--lh-snug);
+    color: var(--text-strong);
+  }
 
-p {
-  font-size: var(--text-body);
-  line-height: var(--lh-normal);
-  margin: 0;
-  hyphens: none !important;
-  -webkit-hyphens: none !important;
-  -moz-hyphens: none !important;
-  -ms-hyphens: none !important;
-}
+  p {
+    font-size: var(--text-body);
+    line-height: var(--lh-normal);
+    margin: 0;
+    hyphens: none !important;
+    -webkit-hyphens: none !important;
+    -moz-hyphens: none !important;
+    -ms-hyphens: none !important;
+  }
 
-.container-page {
-  width: 100%;
-  max-width: 1200px;
-  margin-inline: auto;
-  padding-inline: var(--space-4);
-}
+  /* Editorial typography */
+  article,
+  .prose-measure {
+    font-size: var(--text-body);
+    line-height: var(--lh-normal);
+    color: var(--text);
+  }
 
-@media (min-width: 1200px) {
-  .container-page {
-    padding-inline: 0;
+  article h1,
+  .prose-measure h1 {
+    font-size: var(--text-h1);
+    line-height: var(--lh-tight);
+    margin-top: var(--space-8);
+    margin-bottom: var(--space-4);
   }
-}
 
-.stack-lg > * + * {
-  margin-top: var(--space-8);
-}
+  article h2,
+  .prose-measure h2 {
+    font-size: var(--text-h2);
+    line-height: var(--lh-tight);
+    margin-top: var(--space-6);
+    margin-bottom: var(--space-3);
+  }
 
-.stack-md > * + * {
-  margin-top: var(--space-6);
-}
+  article h3,
+  .prose-measure h3 {
+    font-size: var(--text-h3);
+    line-height: var(--lh-snug);
+    margin-top: var(--space-6);
+    margin-bottom: var(--space-3);
+  }
 
-.stack-sm > * + * {
-  margin-top: var(--space-4);
-}
+  article p,
+  .prose-measure p {
+    margin-bottom: var(--space-4);
+  }
 
-.prose-measure {
-  max-width: var(--measure);
-}
+  article ul,
+  article ol,
+  .prose-measure ul,
+  .prose-measure ol {
+    margin: var(--space-4) 0;
+    padding-left: var(--space-6);
+  }
 
-/* Editorial typography */
-article,
-.prose-measure {
-  font-size: var(--text-body);
-  line-height: var(--lh-normal);
-  color: var(--text);
-}
+  article li,
+  .prose-measure li {
+    margin-bottom: var(--space-2);
+  }
 
-article h1,
-.prose-measure h1 {
-  font-size: var(--text-h1);
-  line-height: var(--lh-tight);
-  margin-top: var(--space-8);
-  margin-bottom: var(--space-4);
-}
+  /* Blockquote default */
+  blockquote {
+    border-left: 3px solid var(--border-accent-strong);
+    padding-left: var(--space-4);
+    margin: var(--space-6) 0;
+    font-style: normal;
+    color: var(--text);
+  }
 
-article h2,
-.prose-measure h2 {
-  font-size: var(--text-h2);
-  line-height: var(--lh-tight);
-  margin-top: var(--space-6);
-  margin-bottom: var(--space-3);
+  @media (prefers-reduced-motion: reduce) {
+    *,
+    *::before,
+    *::after {
+      animation-duration: 0.01ms !important;
+      animation-iteration-count: 1 !important;
+      transition-duration: 0.01ms !important;
+      scroll-behavior: auto !important;
+    }
+  }
 }
 
-article h3,
-.prose-measure h3 {
-  font-size: var(--text-h3);
-  line-height: var(--lh-snug);
-  margin-top: var(--space-6);
-  margin-bottom: var(--space-3);
-}
+@layer utilities {
+  .container-page {
+    width: 100%;
+    max-width: 1200px;
+    margin-inline: auto;
+    padding-inline: var(--space-4);
+  }
 
-article p,
-.prose-measure p {
-  margin-bottom: var(--space-4);
-}
+  @media (min-width: 1200px) {
+    .container-page {
+      padding-inline: 0;
+    }
+  }
 
-article ul,
-article ol,
-.prose-measure ul,
-.prose-measure ol {
-  margin: var(--space-4) 0;
-  padding-left: var(--space-6);
-}
+  .prose-measure {
+    max-width: var(--measure);
+  }
 
-article li,
-.prose-measure li {
-  margin-bottom: var(--space-2);
-}
+  /* Kicker style */
+  .kicker {
+    margin: 0;
+    font-size: var(--text-caption);
+    font-variant-caps: all-small-caps;
+    font-weight: 500;
+    letter-spacing: 0.08em;
+    color: color-mix(in oklab, var(--brand-purple-800) 70%, transparent);
+  }
 
-/* Kicker style */
-.kicker {
-  margin: 0;
-  font-size: var(--text-caption);
-  font-variant-caps: all-small-caps;
-  font-weight: 500;
-  letter-spacing: 0.08em;
-  color: color-mix(in oklab, var(--brand-purple-800) 70%, transparent);
-}
+  .section-title {
+    position: relative;
+    display: inline-flex;
+    align-items: flex-end;
+    padding-bottom: 0.25rem;
+  }
 
-.section-title {
-  position: relative;
-  display: inline-flex;
-  align-items: flex-end;
-  padding-bottom: 0.25rem;
-}
+  .section-title::after {
+    content: "";
+    position: absolute;
+    left: 0;
+    bottom: 0;
+    width: 100%;
+    height: 1px;
+    background: color-mix(in oklab, var(--brand-purple-800) 55%, transparent);
+  }
 
-.section-title::after {
-  content: "";
-  position: absolute;
-  left: 0;
-  bottom: 0;
-  width: 100%;
-  height: 1px;
-  background: color-mix(in oklab, var(--brand-purple-800) 55%, transparent);
-}
+  .focus-chamfer {
+    position: relative;
+    outline: 2px solid transparent;
+    outline-offset: 4px;
+    z-index: 0;
+  }
 
-.focus-chamfer {
-  position: relative;
-  outline: 2px solid transparent;
-  outline-offset: 4px;
-  z-index: 0;
-}
+  .focus-chamfer:focus-visible {
+    outline-color: color-mix(in oklab, var(--brand-purple-800) 55%, transparent);
+    box-shadow: var(--card-shadow-focus);
+  }
 
-.focus-chamfer:focus-visible {
-  outline-color: color-mix(in oklab, var(--brand-purple-800) 55%, transparent);
-  box-shadow: var(--card-shadow-focus);
-}
+  .focus-chamfer:focus-visible::after {
+    content: "";
+    position: absolute;
+    inset: var(--focus-chamfer-inset, 0);
+    border: 2px solid color-mix(in oklab, var(--brand-purple-800) 70%, transparent);
+    clip-path: polygon(
+      var(--focus-chamfer-size, var(--ch)) 0,
+      calc(100% - var(--focus-chamfer-size, var(--ch))) 0,
+      100% var(--focus-chamfer-size, var(--ch)),
+      100% calc(100% - var(--focus-chamfer-size, var(--ch))),
+      calc(100% - var(--focus-chamfer-size, var(--ch))) 100%,
+      var(--focus-chamfer-size, var(--ch)) 100%,
+      0 calc(100% - var(--focus-chamfer-size, var(--ch))),
+      0 var(--focus-chamfer-size, var(--ch))
+    );
+    pointer-events: none;
+    border-radius: 0;
+    z-index: 1;
+  }
 
-.focus-chamfer:focus-visible::after {
-  content: "";
-  position: absolute;
-  inset: var(--focus-chamfer-inset, 0);
-  border: 2px solid color-mix(in oklab, var(--brand-purple-800) 70%, transparent);
-  clip-path: polygon(
-    var(--focus-chamfer-size, var(--ch)) 0,
-    calc(100% - var(--focus-chamfer-size, var(--ch))) 0,
-    100% var(--focus-chamfer-size, var(--ch)),
-    100% calc(100% - var(--focus-chamfer-size, var(--ch))),
-    calc(100% - var(--focus-chamfer-size, var(--ch))) 100%,
-    var(--focus-chamfer-size, var(--ch)) 100%,
-    0 calc(100% - var(--focus-chamfer-size, var(--ch))),
-    0 var(--focus-chamfer-size, var(--ch))
-  );
-  pointer-events: none;
-  border-radius: 0;
-  z-index: 1;
-}
+  /* Caption utility */
+  .caption {
+    font-size: var(--text-caption);
+    color: var(--text-muted);
+    margin-top: var(--space-2);
+  }
 
-/* Caption utility */
-.caption {
-  font-size: var(--text-caption);
-  color: var(--text-muted);
-  margin-top: var(--space-2);
-}
+  .paper-grain {
+    position: relative;
+    background-color: var(--surface);
+  }
 
-.paper-grain {
-  position: relative;
-  background-color: var(--surface);
-}
+  .paper-grain::before {
+    content: "";
+    position: absolute;
+    inset: 0;
+    background-image: url("/textures/paper-grain.svg");
+    background-size: 512px 512px;
+    opacity: var(--paper-grain-opacity, 0.12);
+    mix-blend-mode: multiply;
+    pointer-events: none;
+    border-radius: inherit;
+    clip-path: inherit;
+  }
 
-.paper-grain::before {
-  content: "";
-  position: absolute;
-  inset: 0;
-  background-image: url("/textures/paper-grain.svg");
-  background-size: 512px 512px;
-  opacity: var(--paper-grain-opacity, 0.12);
-  mix-blend-mode: multiply;
-  pointer-events: none;
-  border-radius: inherit;
-  clip-path: inherit;
-}
+  .home-card.paper-grain::before {
+    opacity: 0.25;
+  }
 
-.home-card.paper-grain::before {
-  opacity: 0.25;
-}
+  .paper-grain > * {
+    position: relative;
+    z-index: 1;
+  }
 
-.paper-grain > * {
-  position: relative;
-  z-index: 1;
-}
+  .line-clamp-2 {
+    display: -webkit-box;
+    -webkit-line-clamp: 2;
+    -webkit-box-orient: vertical;
+    overflow: hidden;
+  }
 
-.line-clamp-2 {
-  display: -webkit-box;
-  -webkit-line-clamp: 2;
-  -webkit-box-orient: vertical;
-  overflow: hidden;
-}
+  .line-clamp-3 {
+    display: -webkit-box;
+    -webkit-line-clamp: 3;
+    -webkit-box-orient: vertical;
+    overflow: hidden;
+  }
 
-.line-clamp-3 {
-  display: -webkit-box;
-  -webkit-line-clamp: 3;
-  -webkit-box-orient: vertical;
-  overflow: hidden;
-}
+  .surface-frost-pink-70 {
+    background: var(--surface-frost-pink-70);
+  }
 
-.nav-list {
-  display: flex;
-  align-items: center;
-  gap: 1.5rem;
-  font-family: var(--font-display);
-  text-transform: uppercase;
-  letter-spacing: 0.12em;
-  font-size: 0.95rem;
-}
+  .surface-frost-pink-85 {
+    background: var(--surface-frost-pink-85);
+  }
 
-.nav-link {
-  position: relative;
-  display: inline-flex;
-  align-items: center;
-  padding: 0.5rem 0.75rem;
-  color: var(--brand-purple-800);
-  transition: color 150ms ease;
-}
+  .surface-frost-purple-30 {
+    background: var(--surface-frost-purple-30);
+  }
 
-.nav-link:hover {
-  color: var(--brand-purple-600);
-}
+  .surface-frost-white-90 {
+    background: var(--surface-frost-white-90);
+  }
 
-.nav-link::before {
-  content: "";
-  position: absolute;
-  left: -1rem;
-  top: 50%;
-  width: 2px;
-  height: 2rem;
-  background: color-mix(in oklab, var(--brand-purple-800) 25%, transparent);
-  transform: translateY(-50%) rotate(-18deg);
-  pointer-events: none;
-  opacity: 0.65;
-}
+  .gradient-card-review {
+    background-image: var(--gradient-card-review);
+  }
 
-.nav-link.nav-angle-1::before {
-  transform: translateY(-50%) rotate(-12deg);
-}
+  .gradient-card-podcast {
+    background-image: var(--gradient-card-podcast);
+  }
 
-.nav-link.nav-angle-2::before {
-  transform: translateY(-50%) rotate(-22deg);
-}
+  .gradient-hero-title {
+    background-image: var(--gradient-hero-title);
+  }
 
-.nav-link:first-child::before {
-  display: none;
-}
+  .surface-chamfer {
+    --chamfer-size: var(--ch);
+  }
 
-.nav-link.is-active,
-.nav-link[aria-current="page"] {
-  background: transparent;
-  border-radius: 0;
-}
+  :where(.chamfered, .surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
+    --chamfer-amount: var(--chamfer-size, var(--ch));
+    border-radius: 0;
+    -webkit-clip-path: polygon(
+      var(--chamfer-amount) 0,
+      calc(100% - var(--chamfer-amount)) 0,
+      100% var(--chamfer-amount),
+      100% calc(100% - var(--chamfer-amount)),
+      calc(100% - var(--chamfer-amount)) 100%,
+      var(--chamfer-amount) 100%,
+      0 calc(100% - var(--chamfer-amount)),
+      0 var(--chamfer-amount)
+    );
+    clip-path: polygon(
+      var(--chamfer-amount) 0,
+      calc(100% - var(--chamfer-amount)) 0,
+      100% var(--chamfer-amount),
+      100% calc(100% - var(--chamfer-amount)),
+      calc(100% - var(--chamfer-amount)) 100%,
+      var(--chamfer-amount) 100%,
+      0 calc(100% - var(--chamfer-amount)),
+      0 var(--chamfer-amount)
+    );
+    background-clip: padding-box;
+    -webkit-background-clip: padding-box;
+    overflow: hidden;
+  }
 
-.nav-link.is-active::after,
-.nav-link[aria-current="page"]::after {
-  content: "";
-  position: absolute;
-  left: 0.75rem;
-  right: 0.75rem;
-  bottom: -0.35rem;
-  height: 0.4rem;
-  background: color-mix(in oklab, var(--brand-purple-600) 40%, transparent);
-  clip-path: polygon(15% 0, 85% 0, 100% 100%, 0 100%);
-}
+  :where(
+    .home-card img,
+    .home-card picture,
+    .home-card video,
+    .home-card iframe,
+    .home-card button
+  ) {
+    border-radius: 0;
+  }
 
-.nav-list--wrap {
-  flex-wrap: wrap;
-  row-gap: 0.75rem;
-}
+  .chamfered-border {
+    border-width: var(--chamfer-border-width, var(--border-strong-width));
+    border-style: solid;
+    border-color: var(--chamfer-border-color, var(--border-strong-color));
+    background-clip: padding-box;
+    -webkit-background-clip: padding-box;
+  }
 
-.nav-link--footer {
-  color: var(--brand-purple-800);
-}
+  .ch-14 {
+    --chamfer-size: var(--ch);
+  }
 
-.nav-link--footer:hover {
-  color: var(--brand-purple-600);
-}
+  .button-trapezoid {
+    border-radius: 0 !important;
+  }
 
-.nav-link--footer::before {
-  background: color-mix(in oklab, var(--brand-purple-800) 25%, transparent);
-}
+  /* Fallback for very old browsers: square corners maintain layout */
+  @supports not (clip-path: polygon(0 0)) {
+    :where(.chamfered, .surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
+      border-radius: 0;
+    }
+  }
 
-.nav-link--footer.is-active::after,
-.nav-link--footer[aria-current="page"]::after {
-  background: color-mix(in oklab, var(--brand-purple-600) 50%, transparent);
-}
+  /* Aspect ratio utilities */
+  .ratio-4x5 {
+    aspect-ratio: 4 / 5;
+    position: relative;
+  }
 
-.site-header__nav .nav-list {
-  --nav-divider-gap: 1.5rem;
-  gap: var(--nav-divider-gap);
-  justify-content: center;
-}
+  .ratio-1x1 {
+    aspect-ratio: 1 / 1;
+    position: relative;
+  }
 
-.site-header__nav .nav-link::before {
-  display: none;
-}
+  @supports not (aspect-ratio: 4 / 5) {
+    .ratio-4x5::before {
+      content: "";
+      display: block;
+      padding-bottom: 125%; /* 5/4 = 1.25 */
+    }
+    
+    .ratio-4x5 > * {
+      position: absolute;
+      top: 0;
+      left: 0;
+      width: 100%;
+      height: 100%;
+    }
+  }
 
-.site-header__nav .nav-list > li {
-  position: relative;
-  --nav-divider-angle: -10deg;
-}
+  @supports not (aspect-ratio: 1 / 1) {
+    .ratio-1x1::before {
+      content: "";
+      display: block;
+      padding-bottom: 100%;
+    }
+    
+    .ratio-1x1 > * {
+      position: absolute;
+      top: 0;
+      left: 0;
+      width: 100%;
+      height: 100%;
+    }
+  }
 
-.site-header__nav .nav-list > li::after {
-  content: "";
-  position: absolute;
-  top: 50%;
-  right: calc(var(--nav-divider-gap) / -2);
-  width: 2px;
-  height: 2.5rem;
-  background: color-mix(in oklab, var(--brand-purple-800) 35%, transparent);
-  transform: translate(50%, -50%) rotate(var(--nav-divider-angle));
-  transform-origin: center;
-  opacity: 0.65;
-  pointer-events: none;
+  /* Screen reader only utility */
+  .sr-only {
+    position: absolute;
+    width: 1px;
+    height: 1px;
+    padding: 0;
+    margin: -1px;
+    overflow: hidden;
+    clip: rect(0, 0, 0, 0);
+    white-space: nowrap;
+    border-width: 0;
+  }
 }
 
-.site-header__nav .nav-list > li:last-child::after {
-  display: none;
-}
+@layer components {
+  .nav-list {
+    display: flex;
+    align-items: center;
+    gap: 1.5rem;
+    font-family: var(--font-display);
+    text-transform: uppercase;
+    letter-spacing: 0.12em;
+    font-size: 0.95rem;
+  }
 
-.site-header__nav .nav-list > li:nth-child(4n + 1) {
-  --nav-divider-angle: -8deg;
-}
+  .nav-link {
+    position: relative;
+    display: inline-flex;
+    align-items: center;
+    padding: 0.5rem 0.75rem;
+    color: var(--brand-purple-800);
+    transition: color 150ms ease;
+  }
 
-.site-header__nav .nav-list > li:nth-child(4n + 2) {
-  --nav-divider-angle: -12deg;
-}
+  .nav-link:hover {
+    color: var(--brand-purple-600);
+  }
 
-.site-header__nav .nav-list > li:nth-child(4n + 3) {
-  --nav-divider-angle: -17deg;
-}
+  .nav-link::before {
+    content: "";
+    position: absolute;
+    left: -1rem;
+    top: 50%;
+    width: 2px;
+    height: 2rem;
+    background: color-mix(in oklab, var(--brand-purple-800) 25%, transparent);
+    transform: translateY(-50%) rotate(-18deg);
+    pointer-events: none;
+    opacity: 0.65;
+  }
 
-.site-header__nav .nav-list > li:nth-child(4n + 4) {
-  --nav-divider-angle: -22deg;
-}
+  .nav-link.nav-angle-1::before {
+    transform: translateY(-50%) rotate(-12deg);
+  }
 
-.site-header__mobile-panel .nav-link::before {
-  display: none;
-}
+  .nav-link.nav-angle-2::before {
+    transform: translateY(-50%) rotate(-22deg);
+  }
 
-.surface-frost-pink-70 {
-  background: var(--surface-frost-pink-70);
-}
+  .nav-link:first-child::before {
+    display: none;
+  }
 
-.surface-frost-pink-85 {
-  background: var(--surface-frost-pink-85);
-}
+  .nav-link.is-active,
+  .nav-link[aria-current="page"] {
+    background: transparent;
+    border-radius: 0;
+  }
 
-.surface-frost-purple-30 {
-  background: var(--surface-frost-purple-30);
-}
+  .nav-link.is-active::after,
+  .nav-link[aria-current="page"]::after {
+    content: "";
+    position: absolute;
+    left: 0.75rem;
+    right: 0.75rem;
+    bottom: -0.35rem;
+    height: 0.4rem;
+    background: color-mix(in oklab, var(--brand-purple-600) 40%, transparent);
+    clip-path: polygon(15% 0, 85% 0, 100% 100%, 0 100%);
+  }
 
-.surface-frost-white-90 {
-  background: var(--surface-frost-white-90);
-}
+  .nav-list--wrap {
+    flex-wrap: wrap;
+    row-gap: 0.75rem;
+  }
 
-.gradient-card-review {
-  background-image: var(--gradient-card-review);
-}
+  .nav-link--footer {
+    color: var(--brand-purple-800);
+  }
 
-.gradient-card-podcast {
-  background-image: var(--gradient-card-podcast);
-}
+  .nav-link--footer:hover {
+    color: var(--brand-purple-600);
+  }
 
-.gradient-hero-title {
-  background-image: var(--gradient-hero-title);
-}
+  .nav-link--footer::before {
+    background: color-mix(in oklab, var(--brand-purple-800) 25%, transparent);
+  }
 
-/* Blockquote default */
-blockquote {
-  border-left: 3px solid var(--border-accent-strong);
-  padding-left: var(--space-4);
-  margin: var(--space-6) 0;
-  font-style: normal;
-  color: var(--text);
-}
+  .nav-link--footer.is-active::after,
+  .nav-link--footer[aria-current="page"]::after {
+    background: color-mix(in oklab, var(--brand-purple-600) 50%, transparent);
+  }
 
-.surface-chamfer {
-  --chamfer-size: var(--ch);
-}
+  .site-header__nav .nav-list {
+    --nav-divider-gap: 1.5rem;
+    gap: var(--nav-divider-gap);
+    justify-content: center;
+  }
 
-:where(.chamfered, .surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
-  --chamfer-amount: var(--chamfer-size, var(--ch));
-  border-radius: 0;
-  -webkit-clip-path: polygon(
-    var(--chamfer-amount) 0,
-    calc(100% - var(--chamfer-amount)) 0,
-    100% var(--chamfer-amount),
-    100% calc(100% - var(--chamfer-amount)),
-    calc(100% - var(--chamfer-amount)) 100%,
-    var(--chamfer-amount) 100%,
-    0 calc(100% - var(--chamfer-amount)),
-    0 var(--chamfer-amount)
-  );
-  clip-path: polygon(
-    var(--chamfer-amount) 0,
-    calc(100% - var(--chamfer-amount)) 0,
-    100% var(--chamfer-amount),
-    100% calc(100% - var(--chamfer-amount)),
-    calc(100% - var(--chamfer-amount)) 100%,
-    var(--chamfer-amount) 100%,
-    0 calc(100% - var(--chamfer-amount)),
-    0 var(--chamfer-amount)
-  );
-  background-clip: padding-box;
-  -webkit-background-clip: padding-box;
-  overflow: hidden;
-}
+  .site-header__nav .nav-link::before {
+    display: none;
+  }
 
-:where(
-  .home-card img,
-  .home-card picture,
-  .home-card video,
-  .home-card iframe,
-  .home-card button
-) {
-  border-radius: 0;
-}
+  .site-header__nav .nav-list > li {
+    position: relative;
+    --nav-divider-angle: -10deg;
+  }
 
-.chamfered-border {
-  border-width: var(--chamfer-border-width, var(--border-strong-width));
-  border-style: solid;
-  border-color: var(--chamfer-border-color, var(--border-strong-color));
-  background-clip: padding-box;
-  -webkit-background-clip: padding-box;
-}
+  .site-header__nav .nav-list > li::after {
+    content: "";
+    position: absolute;
+    top: 50%;
+    right: calc(var(--nav-divider-gap) / -2);
+    width: 2px;
+    height: 2.5rem;
+    background: color-mix(in oklab, var(--brand-purple-800) 35%, transparent);
+    transform: translate(50%, -50%) rotate(var(--nav-divider-angle));
+    transform-origin: center;
+    opacity: 0.65;
+    pointer-events: none;
+  }
 
-.ch-14 {
-  --chamfer-size: var(--ch);
-}
+  .site-header__nav .nav-list > li:last-child::after {
+    display: none;
+  }
 
-.button-trapezoid {
-  border-radius: 0 !important;
-}
+  .site-header__nav .nav-list > li:nth-child(4n + 1) {
+    --nav-divider-angle: -8deg;
+  }
 
-/* Fallback for very old browsers: square corners maintain layout */
-@supports not (clip-path: polygon(0 0)) {
-  :where(.chamfered, .surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
-    border-radius: 0;
+  .site-header__nav .nav-list > li:nth-child(4n + 2) {
+    --nav-divider-angle: -12deg;
   }
-}
 
-/* Aspect ratio utilities */
-.ratio-4x5 {
-  aspect-ratio: 4 / 5;
-  position: relative;
-}
+  .site-header__nav .nav-list > li:nth-child(4n + 3) {
+    --nav-divider-angle: -17deg;
+  }
 
-.ratio-1x1 {
-  aspect-ratio: 1 / 1;
-  position: relative;
-}
+  .site-header__nav .nav-list > li:nth-child(4n + 4) {
+    --nav-divider-angle: -22deg;
+  }
 
-@supports not (aspect-ratio: 4 / 5) {
-  .ratio-4x5::before {
-    content: "";
-    display: block;
-    padding-bottom: 125%; /* 5/4 = 1.25 */
+  .site-header__mobile-panel .nav-link::before {
+    display: none;
   }
-  
-  .ratio-4x5 > * {
-    position: absolute;
-    top: 0;
-    left: 0;
+
+  .site-header {
+    position: relative;
+    color: var(--brand-purple-800);
     width: 100%;
-    height: 100%;
+    max-width: 1200px;
+    margin: var(--space-3) auto 0;
+    padding-inline: var(--space-4);
+    padding-block: var(--space-3);
   }
-}
 
-@supports not (aspect-ratio: 1 / 1) {
-  .ratio-1x1::before {
+  .site-header::before {
     content: "";
-    display: block;
-    padding-bottom: 100%;
-  }
-  
-  .ratio-1x1 > * {
     position: absolute;
     top: 0;
-    left: 0;
-    width: 100%;
+    left: 50%;
+    transform: translateX(-50%);
+    width: 100vw;
     height: 100%;
+    background: var(--brand-pink-100);
+    border-bottom: 1px solid color-mix(in oklab, var(--brand-pink-300) 55%, transparent);
+    z-index: -1;
   }
-}
-
-/* Screen reader only utility */
-.sr-only {
-  position: absolute;
-  width: 1px;
-  height: 1px;
-  padding: 0;
-  margin: -1px;
-  overflow: hidden;
-  clip: rect(0, 0, 0, 0);
-  white-space: nowrap;
-  border-width: 0;
-}
-
-.site-header {
-  position: relative;
-  color: var(--brand-purple-800);
-  width: 100%;
-  max-width: 1200px;
-  margin: var(--space-3) auto 0;
-  padding-inline: var(--space-4);
-  padding-block: var(--space-3);
-}
-
-.site-header::before {
-  content: "";
-  position: absolute;
-  top: 0;
-  left: 50%;
-  transform: translateX(-50%);
-  width: 100vw;
-  height: 100%;
-  background: var(--brand-pink-100);
-  border-bottom: 1px solid color-mix(in oklab, var(--brand-pink-300) 55%, transparent);
-  z-index: -1;
-}
-
-.site-header__layout {
-  display: flex;
-  align-items: center;
-  justify-content: space-between;
-  gap: var(--space-4);
-}
-
-.site-header__cluster {
-  display: flex;
-  align-items: stretch;
-  gap: 0;
-  min-width: 0;
-}
-
-.site-header__brand {
-  position: relative;
-  display: flex;
-  align-items: center;
-  gap: var(--space-3);
-  text-decoration: none;
-  color: inherit;
-  padding: var(--space-2) 0;
-}
-
-.site-header__brand::after {
-  content: "";
-  position: absolute;
-  inset: calc(-1 * var(--space-2)) calc(-1 * var(--space-3));
-  background: color-mix(in oklab, var(--surface) 88%, transparent);
-  border: 1px solid color-mix(in oklab, var(--brand-pink-300) 45%, transparent);
-  clip-path: polygon(
-    var(--ch) 0,
-    100% 0,
-    100% calc(100% - var(--ch)),
-    calc(100% - var(--ch)) 100%,
-    0 100%,
-    0 var(--ch)
-  );
-  z-index: -1;
-}
-
-.site-header__brand-mark {
-  display: inline-flex;
-  align-items: center;
-  justify-content: center;
-  width: clamp(120px, 10vw, 176px);
-}
-
-.site-header__brand-mark img {
-  width: 100%;
-  height: auto;
-}
-
-.site-header__logo-wordmark {
-  font-family: var(--font-display);
-  font-size: 1.1rem;
-  letter-spacing: 0.08em;
-  text-transform: uppercase;
-}
-
-.site-header__nav {
-  position: relative;
-  display: none;
-  align-items: center;
-  padding-block: var(--space-2);
-  padding-inline: calc(var(--space-6) + var(--nav-stripe));
-  margin-left: -0.125rem;
-  margin-top: 0;
-  margin-bottom: 0;
-  align-self: stretch;
-  z-index: 1;
-  background: color-mix(in oklab, var(--brand-pink-100) 80%, var(--brand-pink-500) 20%);
-  border: 1px solid color-mix(in oklab, var(--brand-pink-300) 65%, transparent);
-  clip-path: polygon(
-    0 0,
-    100% 0,
-    100% calc(100% - var(--ch)),
-    calc(100% - var(--ch)) 100%,
-    0 100%
-  );
-  box-shadow: var(--shadow-soft);
-}
 
-.site-header__nav-divider {
-  position: absolute;
-  left: 0;
-  top: 0;
-  bottom: 0;
-  width: var(--nav-stripe);
-  background: linear-gradient(135deg, color-mix(in oklab, var(--brand-pink-300) 55%, transparent), transparent);
-  clip-path: polygon(0 0, 100% 0, 0 100%);
-  pointer-events: none;
-}
-
-.site-header__mobile {
-  display: flex;
-  align-items: center;
-  margin-left: auto;
-  position: relative;
-}
+  .site-header__layout {
+    display: flex;
+    align-items: center;
+    justify-content: space-between;
+    gap: var(--space-4);
+  }
 
-.site-header__mobile-trigger {
-  display: inline-flex;
-  align-items: center;
-  justify-content: center;
-  width: 44px;
-  height: 44px;
-  border: none;
-  background: color-mix(in oklab, var(--brand-pink-300) 45%, transparent);
-  color: var(--brand-purple-800);
-  box-shadow: var(--shadow-soft);
-}
+  .site-header__cluster {
+    display: flex;
+    align-items: stretch;
+    gap: 0;
+    min-width: 0;
+  }
 
-.site-header__mobile-trigger svg {
-  width: 22px;
-  height: 22px;
-}
+  .site-header__brand {
+    position: relative;
+    display: flex;
+    align-items: center;
+    gap: var(--space-3);
+    text-decoration: none;
+    color: inherit;
+    padding: var(--space-2) 0;
+  }
 
-.site-header__mobile-panel {
-  position: absolute;
-  top: calc(100% + var(--space-2));
-  right: 0;
-  width: min(320px, 90vw);
-  background: var(--surface);
-  border: 1px solid var(--border-accent-strong);
-  box-shadow: var(--shadow-card);
-  padding: var(--space-4);
-  display: none;
-  flex-direction: column;
-  gap: var(--space-3);
-  z-index: 20;
-}
+  .site-header__brand::after {
+    content: "";
+    position: absolute;
+    inset: calc(-1 * var(--space-2)) calc(-1 * var(--space-3));
+    background: color-mix(in oklab, var(--surface) 88%, transparent);
+    border: 1px solid color-mix(in oklab, var(--brand-pink-300) 45%, transparent);
+    clip-path: polygon(
+      var(--ch) 0,
+      100% 0,
+      100% calc(100% - var(--ch)),
+      calc(100% - var(--ch)) 100%,
+      0 100%,
+      0 var(--ch)
+    );
+    z-index: -1;
+  }
 
-.site-header__mobile-panel[data-open="true"] {
-  display: flex;
-}
+  .site-header__brand-mark {
+    display: inline-flex;
+    align-items: center;
+    justify-content: center;
+    width: clamp(120px, 10vw, 176px);
+  }
 
-.site-header__mobile-panel a {
-  font-family: var(--font-display);
-  text-transform: uppercase;
-  letter-spacing: 0.08em;
-  color: var(--brand-purple-800);
-}
+  .site-header__brand-mark img {
+    width: 100%;
+    height: auto;
+  }
 
-@media (min-width: 768px) {
-  .site-header__nav {
-    display: flex;
+  .site-header__logo-wordmark {
+    font-family: var(--font-display);
+    font-size: 1.1rem;
+    letter-spacing: 0.08em;
+    text-transform: uppercase;
   }
 
-  .site-header__mobile {
+  .site-header__nav {
+    position: relative;
     display: none;
+    align-items: center;
+    padding-block: var(--space-2);
+    padding-inline: calc(var(--space-6) + var(--nav-stripe));
+    margin-left: -0.125rem;
+    margin-top: 0;
+    margin-bottom: 0;
+    align-self: stretch;
+    z-index: 1;
+    background: color-mix(in oklab, var(--brand-pink-100) 80%, var(--brand-pink-500) 20%);
+    border: 1px solid color-mix(in oklab, var(--brand-pink-300) 65%, transparent);
+    clip-path: polygon(
+      0 0,
+      100% 0,
+      100% calc(100% - var(--ch)),
+      calc(100% - var(--ch)) 100%,
+      0 100%
+    );
+    box-shadow: var(--shadow-soft);
   }
-}
 
-.home-hero-section {
-  display: none;
-  margin-top: var(--space-8);
-  margin-bottom: 0;
-}
-
-@media (min-width: 768px) {
-  .home-hero-section {
-    display: block;
+  .site-header__nav-divider {
+    position: absolute;
+    left: 0;
+    top: 0;
+    bottom: 0;
+    width: var(--nav-stripe);
+    background: linear-gradient(135deg, color-mix(in oklab, var(--brand-pink-300) 55%, transparent), transparent);
+    clip-path: polygon(0 0, 100% 0, 0 100%);
+    pointer-events: none;
   }
-}
-
-.home-hero-shell {
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  gap: var(--space-3);
-  padding: var(--space-6);
-  min-height: var(--hero-min-height);
-  background: var(--surface);
-  box-shadow: var(--shadow-soft);
-}
 
-.home-hero-copy {
-  display: flex;
-  flex-direction: column;
-  gap: var(--space-3);
-  text-align: center;
-  width: 100%;
-}
+  .site-header__mobile {
+    display: flex;
+    align-items: center;
+    margin-left: auto;
+    position: relative;
+  }
 
-.home-hero-badge {
-  display: inline-flex;
-  align-items: center;
-  justify-content: center;
-  width: 72px;
-  height: 72px;
-  background: color-mix(in oklab, var(--brand-purple-600) 12%, transparent);
-  border: 1px solid var(--border-accent-strong);
-  box-shadow: var(--shadow-soft);
-  margin-bottom: var(--space-2);
-}
+  .site-header__mobile-trigger {
+    display: inline-flex;
+    align-items: center;
+    justify-content: center;
+    width: 44px;
+    height: 44px;
+    border: none;
+    background: color-mix(in oklab, var(--brand-pink-300) 45%, transparent);
+    color: var(--brand-purple-800);
+    box-shadow: var(--shadow-soft);
+  }
 
-.home-hero-credit {
-  margin-top: var(--space-3);
-  font-size: 0.85rem;
-  color: var(--text-muted);
-}
+  .site-header__mobile-trigger svg {
+    width: 22px;
+    height: 22px;
+  }
 
-.home-feed-section {
-  padding-block: var(--space-4) var(--space-16);
-}
+  .site-header__mobile-panel {
+    position: absolute;
+    top: calc(100% + var(--space-2));
+    right: 0;
+    width: min(320px, 90vw);
+    background: var(--surface);
+    border: 1px solid var(--border-accent-strong);
+    box-shadow: var(--shadow-card);
+    padding: var(--space-4);
+    display: none;
+    flex-direction: column;
+    gap: var(--space-3);
+    z-index: 20;
+  }
 
-.home-section-heading {
-  display: flex;
-  flex-direction: column;
-  gap: var(--space-2);
-  margin-bottom: var(--space-4);
-}
+  .site-header__mobile-panel[data-open="true"] {
+    display: flex;
+  }
 
-.home-section-heading h1,
-.home-section-heading h2 {
-  margin: 0;
-}
+  .site-header__mobile-panel a {
+    font-family: var(--font-display);
+    text-transform: uppercase;
+    letter-spacing: 0.08em;
+    color: var(--brand-purple-800);
+  }
 
-.home-card-grid {
-  display: grid;
-  grid-template-columns: repeat(1, minmax(0, 1fr));
-  grid-auto-rows: minmax(0, 1fr);
-  gap: var(--home-grid-gap);
-}
+  @media (min-width: 768px) {
+    .site-header__nav {
+      display: flex;
+    }
 
-@media (min-width: 768px) {
-  .home-card-grid {
-    grid-template-columns: repeat(2, minmax(0, 1fr));
+    .site-header__mobile {
+      display: none;
+    }
   }
-}
 
-@media (min-width: 1024px) {
-  .home-card-grid {
-    grid-template-columns: repeat(3, minmax(0, 1fr));
+  .home-hero-section {
+    display: none;
+    margin-top: var(--space-8);
+    margin-bottom: 0;
   }
-}
 
-.home-card {
-  position: relative;
-  display: flex;
-  flex-direction: column;
-  gap: var(--home-card-gap);
-  padding: var(--home-card-padding);
-  background: var(--surface);
-  overflow: visible;
-  box-shadow: var(--card-shadow-rest);
-  border-width: var(--border-strong-width);
-  border-style: solid;
-  clip-path: polygon(
-    var(--ch) 0,
-    calc(100% - var(--ch)) 0,
-    100% var(--ch),
-    100% calc(100% - var(--ch)),
-    calc(100% - var(--ch)) 100%,
-    var(--ch) 100%,
-    0 calc(100% - var(--ch)),
-    0 var(--ch)
-  );
-}
-
-.home-card[data-interaction="hover"],
-.home-card[data-interaction="focus"] {
-  box-shadow: var(--card-shadow-hover);
-}
+  @media (min-width: 768px) {
+    .home-hero-section {
+      display: block;
+    }
+  }
 
-@media (prefers-reduced-motion: reduce) {
-  .home-card[data-interaction="hover"],
-  .home-card[data-interaction="focus"] {
-    transform: none !important;
+  .home-hero-shell {
+    display: flex;
+    flex-direction: column;
+    align-items: center;
+    gap: var(--space-3);
+    padding: var(--space-6);
+    min-height: var(--hero-min-height);
+    background: var(--surface);
+    box-shadow: var(--shadow-soft);
   }
-}
 
-.home-card--review {
-  border-color: var(--card-border-review) !important;
-}
+  .home-hero-copy {
+    display: flex;
+    flex-direction: column;
+    gap: var(--space-3);
+    text-align: center;
+    width: 100%;
+  }
 
-.home-card--podcast {
-  border-color: var(--brand-purple-800) !important;
-}
+  .home-hero-badge {
+    display: inline-flex;
+    align-items: center;
+    justify-content: center;
+    width: 72px;
+    height: 72px;
+    background: color-mix(in oklab, var(--brand-purple-600) 12%, transparent);
+    border: 1px solid var(--border-accent-strong);
+    box-shadow: var(--shadow-soft);
+    margin-bottom: var(--space-2);
+  }
 
-.home-card-head {
-  display: flex;
-  flex-direction: column;
-  gap: var(--space-2);
-}
+  .home-hero-credit {
+    margin-top: var(--space-3);
+    font-size: 0.85rem;
+    color: var(--text-muted);
+  }
 
-.home-card-title-heading {
-  margin: 0;
-  font-size: inherit;
-  font-weight: inherit;
-  line-height: inherit;
-  color: inherit;
-}
+  .home-feed-section {
+    padding-block: var(--space-4) var(--space-16);
+  }
 
-.home-card-title {
-  font-family: var(--font-display);
-  font-size: clamp(1.35rem, 1vw + 1rem, 1.65rem);
-  line-height: var(--lh-snug);
-  color: var(--brand-purple-800);
-}
+  .home-section-heading {
+    display: flex;
+    flex-direction: column;
+    gap: var(--space-2);
+    margin-bottom: var(--space-4);
+  }
 
-.home-card-meta {
-  font-size: 0.85rem;
-  letter-spacing: 0.06em;
-  text-transform: uppercase;
-  color: var(--text-muted);
-}
+  .home-section-heading h1,
+  .home-section-heading h2 {
+    margin: 0;
+  }
 
-.home-card-meta-primary {
-  border: none;
-  outline: none;
-  box-shadow: none;
-  background: transparent;
-}
+  .home-card-grid {
+    display: grid;
+    grid-template-columns: repeat(1, minmax(0, 1fr));
+    grid-auto-rows: minmax(0, 1fr);
+    gap: var(--home-grid-gap);
+  }
 
-.home-card-meta-secondary {
-  text-transform: none;
-  letter-spacing: 0;
-  color: color-mix(in oklab, var(--brand-purple-600) 70%, transparent);
-}
+  @media (min-width: 768px) {
+    .home-card-grid {
+      grid-template-columns: repeat(2, minmax(0, 1fr));
+    }
+  }
 
-.home-card-media {
-  position: relative;
-  flex: none;
-  width: 100%;
-  border-width: 0;
-  border-color: transparent;
-  background: color-mix(in oklab, var(--brand-pink-100) 12%, transparent);
-  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--brand-purple-600) 10%, transparent);
-}
+  @media (min-width: 1024px) {
+    .home-card-grid {
+      grid-template-columns: repeat(3, minmax(0, 1fr));
+    }
+  }
 
-.home-card-media[data-media-layout="youtube-pullquote"] {
-  display: grid;
-  grid-template-rows: 9fr 1fr 6fr;
-  overflow: hidden;
-}
+  .home-card {
+    position: relative;
+    display: flex;
+    flex-direction: column;
+    gap: var(--home-card-gap);
+    padding: var(--home-card-padding);
+    background: var(--surface);
+    overflow: visible;
+    box-shadow: var(--card-shadow-rest);
+    border-width: var(--border-strong-width);
+    border-style: solid;
+    clip-path: polygon(
+      var(--ch) 0,
+      calc(100% - var(--ch)) 0,
+      100% var(--ch),
+      100% calc(100% - var(--ch)),
+      calc(100% - var(--ch)) 100%,
+      var(--ch) 100%,
+      0 calc(100% - var(--ch)),
+      0 var(--ch)
+    );
+  }
 
-.home-card-media-image {
-  width: 100%;
-  height: 100%;
-  object-fit: cover;
-}
+  .home-card[data-interaction="hover"],
+  .home-card[data-interaction="focus"] {
+    box-shadow: var(--card-shadow-hover);
+  }
 
-.home-card-youtube-embed {
-  position: relative;
-  width: 100%;
-  height: 100%;
-  overflow: hidden;
-  background: #000;
-}
+  @media (prefers-reduced-motion: reduce) {
+    .home-card[data-interaction="hover"],
+    .home-card[data-interaction="focus"] {
+      transform: none !important;
+    }
+  }
 
-.home-card-youtube-iframe {
-  position: absolute;
-  inset: 0;
-  width: 100%;
-  height: 100%;
-  border: 0;
-}
+  .home-card--review {
+    border-color: var(--card-border-review) !important;
+  }
 
-.home-card-pullquote-spacer {
-  width: 100%;
-}
+  .home-card--podcast {
+    border-color: var(--brand-purple-800) !important;
+  }
 
-.home-card-pullquote-container {
-  display: flex;
-  align-items: center;
-  padding: var(--space-4);
-  background: color-mix(in oklab, var(--brand-pink-100) 40%, transparent);
-  overflow: hidden;
-}
+  .home-card-head {
+    display: flex;
+    flex-direction: column;
+    gap: var(--space-2);
+  }
 
-.home-card-pullquote-text {
-  font-size: 0.95rem;
-  line-height: var(--lh-normal);
-  color: color-mix(in oklab, var(--brand-purple-800) 90%, transparent);
-  text-align: left;
-  margin: 0;
-}
+  .home-card-title-heading {
+    margin: 0;
+    font-size: inherit;
+    font-weight: inherit;
+    line-height: inherit;
+    color: inherit;
+  }
 
-.home-card-media-overlay {
-  position: absolute;
-  inset: 0;
-  display: flex;
-  flex-direction: column;
-  align-items: center;
-  justify-content: center;
-  gap: var(--space-3);
-  background: color-mix(in oklab, var(--brand-purple-800) 40%, transparent);
-  color: var(--brand-pink-100);
-  z-index: 2;
-  pointer-events: none;
-}
+  .home-card-title {
+    font-family: var(--font-display);
+    font-size: clamp(1.35rem, 1vw + 1rem, 1.65rem);
+    line-height: var(--lh-snug);
+    color: var(--brand-purple-800);
+  }
 
-.home-card--review .home-card-media-overlay {
-  background: color-mix(in oklab, var(--brand-pink-500) 30%, transparent);
-}
+  .home-card-meta {
+    font-size: 0.85rem;
+    letter-spacing: 0.06em;
+    text-transform: uppercase;
+    color: var(--text-muted);
+  }
 
-.home-card--podcast .home-card-media-overlay {
-  background: color-mix(in oklab, var(--brand-purple-600) 30%, transparent);
-}
+  .home-card-meta-primary {
+    border: none;
+    outline: none;
+    box-shadow: none;
+    background: transparent;
+  }
 
-.home-card-media[data-media-layout="split"] .home-card-media-overlay {
-  position: static;
-  inset: auto;
-  grid-row: 2 / 3;
-  width: 100%;
-  opacity: 1 !important;
-  pointer-events: auto;
-  align-items: flex-start;
-  justify-content: center;
-  text-align: left;
-  gap: var(--space-2);
-  padding: var(--space-4);
-  background: color-mix(in oklab, var(--brand-pink-100) 40%, transparent);
-  color: color-mix(in oklab, var(--brand-purple-900) 90%, transparent);
-  border-top: 1px solid color-mix(in oklab, var(--brand-purple-600) 20%, transparent);
-}
+  .home-card-meta-secondary {
+    text-transform: none;
+    letter-spacing: 0;
+    color: color-mix(in oklab, var(--brand-purple-600) 70%, transparent);
+  }
 
-.home-card--podcast .home-card-media-overlay {
-  opacity: 1 !important;
-  pointer-events: none;
-}
+  .home-card-media {
+    position: relative;
+    flex: none;
+    width: 100%;
+    border-width: 0;
+    border-color: transparent;
+    background: color-mix(in oklab, var(--brand-pink-100) 12%, transparent);
+    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--brand-purple-600) 10%, transparent);
+  }
 
-.home-card--podcast .home-card-media[data-media-layout="split"] .home-card-media-overlay {
-  pointer-events: auto;
-  box-shadow: none;
-}
+  .home-card-media[data-media-layout="youtube-pullquote"] {
+    display: grid;
+    grid-template-rows: 9fr 1fr 6fr;
+    overflow: hidden;
+  }
 
-.home-card-pullquote {
-  font-size: 0.95rem;
-  line-height: var(--lh-normal);
-  text-align: center;
-  max-width: 26ch;
-}
+  .home-card-media-image {
+    width: 100%;
+    height: 100%;
+    object-fit: cover;
+  }
 
-.home-card-media[data-media-layout="split"] .home-card-pullquote {
-  text-align: left;
-  max-width: none;
-  opacity: 1 !important;
-  min-height: auto !important;
-}
+  .home-card-youtube-embed {
+    position: relative;
+    width: 100%;
+    height: 100%;
+    overflow: hidden;
+    background: #000;
+  }
 
-.home-card-copy {
-  flex: 1;
-  display: flex;
-  flex-direction: column;
-}
+  .home-card-youtube-iframe {
+    position: absolute;
+    inset: 0;
+    width: 100%;
+    height: 100%;
+    border: 0;
+  }
 
-.home-card--podcast .home-card-copy {
-  justify-content: flex-end;
-}
+  .home-card-pullquote-spacer {
+    width: 100%;
+  }
 
-.home-card-text {
-  font-size: 0.95rem;
-  line-height: var(--lh-normal);
-  color: color-mix(in oklab, var(--brand-purple-800) 90%, transparent);
-}
+  .home-card-pullquote-container {
+    display: flex;
+    align-items: center;
+    padding: var(--space-4);
+    background: color-mix(in oklab, var(--brand-pink-100) 40%, transparent);
+    overflow: hidden;
+  }
 
-.card-actions {
-  margin-top: auto;
-  position: relative;
-  z-index: 3;
-}
+  .home-card-pullquote-text {
+    font-size: 0.95rem;
+    line-height: var(--lh-normal);
+    color: color-mix(in oklab, var(--brand-purple-800) 90%, transparent);
+    text-align: left;
+    margin: 0;
+  }
 
-.card-actions .button-trapezoid {
-  background-color: color-mix(in oklab, var(--brand-pink-300) 40%, transparent);
-  color: var(--brand-purple-800);
-  border: 1px solid var(--brand-pink-300);
-  width: 100%;
-  text-align: center;
-  justify-content: center;
-}
+  .home-card-media-overlay {
+    position: absolute;
+    inset: 0;
+    display: flex;
+    flex-direction: column;
+    align-items: center;
+    justify-content: center;
+    gap: var(--space-3);
+    background: color-mix(in oklab, var(--brand-purple-800) 40%, transparent);
+    color: var(--brand-pink-100);
+    z-index: 2;
+    pointer-events: none;
+  }
 
-.card-actions--image-button {
-  margin-top: 0;
-  margin-bottom: var(--space-4);
-  display: flex;
-  align-items: baseline;
-}
+  .home-card--review .home-card-media-overlay {
+    background: color-mix(in oklab, var(--brand-pink-500) 30%, transparent);
+  }
 
-.card-actions--image-button .button-trapezoid {
-  background-color: var(--brand-purple-800) !important;
-  color: var(--brand-pink-500) !important;
-  border: 1px solid var(--brand-pink-100) !important;
-}
+  .home-card--podcast .home-card-media-overlay {
+    background: color-mix(in oklab, var(--brand-purple-600) 30%, transparent);
+  }
 
-.card-actions--image-button .button-trapezoid:hover {
-  background-color: var(--brand-purple-600) !important;
-}
+  .home-card-media[data-media-layout="split"] .home-card-media-overlay {
+    position: static;
+    inset: auto;
+    grid-row: 2 / 3;
+    width: 100%;
+    opacity: 1 !important;
+    pointer-events: auto;
+    align-items: flex-start;
+    justify-content: center;
+    text-align: left;
+    gap: var(--space-2);
+    padding: var(--space-4);
+    background: color-mix(in oklab, var(--brand-pink-100) 40%, transparent);
+    color: color-mix(in oklab, var(--brand-purple-900) 90%, transparent);
+    border-top: 1px solid color-mix(in oklab, var(--brand-purple-600) 20%, transparent);
+  }
 
-.review-strip-button .button-trapezoid {
-  background-color: transparent !important;
-  color: var(--brand-pink-500) !important;
-  border: 1px solid var(--brand-pink-100) !important;
-  min-width: 44px;
-  padding: var(--space-2) var(--space-3);
-}
+  .home-card--podcast .home-card-media-overlay {
+    opacity: 1 !important;
+    pointer-events: none;
+  }
 
-.review-strip-button .button-trapezoid:hover {
-  background-color: color-mix(in oklab, var(--brand-pink-100) 20%, transparent) !important;
-}
+  .home-card--podcast .home-card-media[data-media-layout="split"] .home-card-media-overlay {
+    pointer-events: auto;
+    box-shadow: none;
+  }
 
-.review-strip-artwork {
-  min-width: 200px;
-}
+  .home-card-pullquote {
+    font-size: 0.95rem;
+    line-height: var(--lh-normal);
+    text-align: center;
+    max-width: 26ch;
+  }
 
-@media (min-width: 768px) {
-  .review-strip-artwork {
-    width: auto;
-    min-width: 200px;
+  .home-card-media[data-media-layout="split"] .home-card-pullquote {
+    text-align: left;
+    max-width: none;
+    opacity: 1 !important;
+    min-height: auto !important;
   }
-  
-  .review-strip-artwork > a {
+
+  .home-card-copy {
+    flex: 1;
     display: flex;
-    align-items: stretch;
+    flex-direction: column;
   }
-  
-  .review-strip-artwork > a > div {
-    width: 100%;
-    height: 100%;
-    aspect-ratio: 1 / 1;
+
+  .home-card--podcast .home-card-copy {
+    justify-content: flex-end;
   }
-}
 
-.share-copy-button .button-trapezoid {
-  background-color: var(--brand-pink-500) !important;
-  color: var(--brand-purple-800) !important;
-  border: 1px solid var(--brand-pink-100) !important;
-}
+  .home-card-text {
+    font-size: 0.95rem;
+    line-height: var(--lh-normal);
+    color: color-mix(in oklab, var(--brand-purple-800) 90%, transparent);
+  }
 
-.share-copy-button .button-trapezoid:hover {
-  background-color: var(--brand-pink-300) !important;
-}
+  .card-actions {
+    margin-top: auto;
+    position: relative;
+    z-index: 3;
+  }
 
-.review-header {
-  margin-bottom: 0;
-}
+  .card-actions .button-trapezoid {
+    background-color: color-mix(in oklab, var(--brand-pink-300) 40%, transparent);
+    color: var(--brand-purple-800);
+    border: 1px solid var(--brand-pink-300);
+    width: 100%;
+    text-align: center;
+    justify-content: center;
+  }
 
-.podcast-header {
-  margin-bottom: 0;
-}
+  .card-actions--image-button {
+    margin-top: 0;
+    margin-bottom: var(--space-4);
+    display: flex;
+    align-items: baseline;
+  }
 
-.tracklist-panel ol {
-  padding-left: var(--space-4);
-}
+  .card-actions--image-button .button-trapezoid {
+    background-color: var(--brand-purple-800) !important;
+    color: var(--brand-pink-500) !important;
+    border: 1px solid var(--brand-pink-100) !important;
+  }
 
-.tracklist-panel ol li {
-  text-align: left;
-  padding-left: var(--space-2);
-}
+  .card-actions--image-button .button-trapezoid:hover {
+    background-color: var(--brand-purple-600) !important;
+  }
 
-.streaming-buttons-container {
-  flex-wrap: nowrap;
-}
+  .review-strip-button .button-trapezoid {
+    background-color: transparent !important;
+    color: var(--brand-pink-500) !important;
+    border: 1px solid var(--brand-pink-100) !important;
+    min-width: 44px;
+    padding: var(--space-2) var(--space-3);
+  }
 
-.streaming-button.button-trapezoid {
-  background-color: var(--brand-purple-800) !important;
-  color: var(--brand-pink-500) !important;
-  border: none !important;
-  padding: var(--space-3) var(--space-4) !important;
-  min-width: 44px;
-  display: inline-flex;
-  align-items: center;
-  justify-content: center;
-}
+  .review-strip-button .button-trapezoid:hover {
+    background-color: color-mix(in oklab, var(--brand-pink-100) 20%, transparent) !important;
+  }
 
-.streaming-button.button-trapezoid:hover {
-  background-color: var(--brand-purple-600) !important;
-}
+  .review-strip-artwork {
+    min-width: 200px;
+  }
 
-.streaming-button.button-trapezoid svg {
-  color: var(--brand-pink-500) !important;
-  fill: var(--brand-pink-500) !important;
-}
+  @media (min-width: 768px) {
+    .review-strip-artwork {
+      width: auto;
+      min-width: 200px;
+    }
+    
+    .review-strip-artwork > a {
+      display: flex;
+      align-items: stretch;
+    }
+    
+    .review-strip-artwork > a > div {
+      width: 100%;
+      height: 100%;
+      aspect-ratio: 1 / 1;
+    }
+  }
 
-.newsletter-section {
-  margin-top: var(--space-16);
-}
+  .share-copy-button .button-trapezoid {
+    background-color: var(--brand-pink-500) !important;
+    color: var(--brand-purple-800) !important;
+    border: 1px solid var(--brand-pink-100) !important;
+  }
 
-.newsletter-shell {
-  display: grid;
-  gap: var(--space-4);
-  background: var(--newsletter-surface);
-  border: 1px solid var(--newsletter-border);
-  padding: var(--space-6);
-  box-shadow: var(--shadow-soft);
-}
+  .share-copy-button .button-trapezoid:hover {
+    background-color: var(--brand-pink-300) !important;
+  }
 
-.newsletter-form {
-  display: flex;
-  align-items: center;
-}
+  .review-header {
+    margin-bottom: 0;
+  }
 
-.site-footer {
-  margin-top: var(--space-12);
-}
+  .podcast-header {
+    margin-bottom: 0;
+  }
 
-.site-footer__bar {
-  background: var(--brand-pink-500);
-  width: 100%;
-  padding-block: var(--space-6);
-}
+  .tracklist-panel ol {
+    padding-left: var(--space-4);
+  }
 
-.site-footer__inner {
-  display: flex;
-  align-items: center;
-  gap: var(--space-6);
-  flex-wrap: wrap;
-}
+  .tracklist-panel ol li {
+    text-align: left;
+    padding-left: var(--space-2);
+  }
 
-.site-footer__social {
-  display: flex;
-  align-items: center;
-  gap: var(--space-4);
-}
+  .streaming-buttons-container {
+    flex-wrap: nowrap;
+  }
 
-.site-footer__social-link {
-  display: inline-flex;
-  align-items: center;
-  justify-content: center;
-  color: var(--brand-purple-800);
-  transition: opacity 160ms ease;
-}
+  .streaming-button.button-trapezoid {
+    background-color: var(--brand-purple-800) !important;
+    color: var(--brand-pink-500) !important;
+    border: none !important;
+    padding: var(--space-3) var(--space-4) !important;
+    min-width: 44px;
+    display: inline-flex;
+    align-items: center;
+    justify-content: center;
+  }
 
-.site-footer__social-link:hover {
-  opacity: 0.8;
-}
+  .streaming-button.button-trapezoid:hover {
+    background-color: var(--brand-purple-600) !important;
+  }
 
-.site-footer__social-link:focus-visible {
-  outline: 2px solid var(--brand-purple-800);
-  outline-offset: 2px;
-  border-radius: 2px;
-}
+  .streaming-button.button-trapezoid svg {
+    color: var(--brand-pink-500) !important;
+    fill: var(--brand-pink-500) !important;
+  }
 
-.site-footer__nav {
-  flex: 1;
-}
+  .newsletter-section {
+    margin-top: var(--space-16);
+  }
 
-.site-footer__nav .nav-list {
-  display: flex;
-  align-items: center;
-  gap: var(--space-4);
-  flex-wrap: wrap;
-}
+  .newsletter-shell {
+    display: grid;
+    gap: var(--space-4);
+    background: var(--newsletter-surface);
+    border: 1px solid var(--newsletter-border);
+    padding: var(--space-6);
+    box-shadow: var(--shadow-soft);
+  }
 
-.site-footer__meta {
-  padding-block: var(--space-4);
-  color: color-mix(in oklab, var(--brand-purple-800) 70%, transparent);
-}
+  .newsletter-form {
+    display: flex;
+    align-items: center;
+  }
 
-.site-footer__meta .caption {
-  color: inherit;
-}
+  .site-footer {
+    margin-top: var(--space-12);
+  }
 
-.site-footer__meta a {
-  color: inherit;
-  text-decoration: underline;
-  text-underline-offset: 2px;
-}
+  .site-footer__bar {
+    background: var(--brand-pink-500);
+    width: 100%;
+    padding-block: var(--space-6);
+  }
 
-.site-footer__meta a:hover {
-  color: var(--brand-purple-800);
-}
+  .site-footer__inner {
+    display: flex;
+    align-items: center;
+    gap: var(--space-6);
+    flex-wrap: wrap;
+  }
 
-/* Special H1 styling */
-.special-h1-wrapper {
-  min-height: clamp(120px, 15vh, 180px);
-  position: relative;
-}
+  .site-footer__social {
+    display: flex;
+    align-items: center;
+    gap: var(--space-4);
+  }
 
-.special-h1-bg-text {
-  font-family: var(--font-display) !important;
-  color: rgb(255, 211, 232) !important; /* var(--brand-pink-100) as RGB */
-  -webkit-text-stroke: 1px rgb(255, 211, 232);
-  text-stroke: 1px rgb(255, 211, 232);
-  font-size: 88px !important; /* ~2x H1 (44px) - explicit pixel value */
-  line-height: 1 !important;
-  text-align: center !important;
-  white-space: nowrap;
-  display: block !important;
-  visibility: visible !important;
-  opacity: 1 !important;
-}
+  .site-footer__social-link {
+    display: inline-flex;
+    align-items: center;
+    justify-content: center;
+    color: var(--brand-purple-800);
+    transition: opacity 160ms ease;
+  }
 
-.special-h1-background {
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  width: 100%;
-  height: 100%;
-}
+  .site-footer__social-link:hover {
+    opacity: 0.8;
+  }
 
-.special-h1-foreground {
-  font-family: var(--font-display);
-  font-size: var(--text-h1);
-  line-height: var(--lh-tight);
-  color: var(--text-deep-purple);
-  text-align: center;
-}
+  .site-footer__social-link:focus-visible {
+    outline: 2px solid var(--brand-purple-800);
+    outline-offset: 2px;
+    border-radius: 2px;
+  }
 
-/* Mission page styling */
-.mission-columns-wrapper {
-  position: relative;
-}
+  .site-footer__nav {
+    flex: 1;
+  }
 
-.mission-divider {
-  width: var(--divider-thickness);
-  min-width: var(--divider-thickness);
-  background: color-mix(in oklab, var(--brand-purple-800) 35%, transparent);
-  transform: rotate(var(--slant-base));
-  transform-origin: center;
-  pointer-events: none;
-  align-self: stretch;
-}
+  .site-footer__nav .nav-list {
+    display: flex;
+    align-items: center;
+    gap: var(--space-4);
+    flex-wrap: wrap;
+  }
 
-@media (max-width: 767px) {
-  .mission-divider {
-    display: none;
+  .site-footer__meta {
+    padding-block: var(--space-4);
+    color: color-mix(in oklab, var(--brand-purple-800) 70%, transparent);
   }
-}
 
-/* Entry column styling */
-.entry-column {
-  border-left-width: 2px;
-  border-right-width: 2px;
-  border-left-style: solid;
-  border-right-style: solid;
-}
+  .site-footer__meta .caption {
+    color: inherit;
+  }
 
-.entry-column--review {
-  border-left-color: var(--brand-pink-100);
-  border-right-color: var(--brand-pink-100);
-}
+  .site-footer__meta a {
+    color: inherit;
+    text-decoration: underline;
+    text-underline-offset: 2px;
+  }
 
-.entry-column--podcast {
-  border-left-color: var(--brand-purple-600);
-  border-right-color: var(--brand-purple-600);
-}
+  .site-footer__meta a:hover {
+    color: var(--brand-purple-800);
+  }
 
-/* Entry header alignment */
-.entry-header {
-  display: flex;
-  flex-direction: column;
-  gap: var(--space-6);
-}
+  /* Special H1 styling */
+  .special-h1-wrapper {
+    min-height: clamp(120px, 15vh, 180px);
+    position: relative;
+  }
 
-@media (min-width: 768px) {
-  .entry-header {
-    flex-direction: row;
-    align-items: flex-start;
-    gap: var(--space-8);
+  .special-h1-bg-text {
+    font-family: var(--font-display) !important;
+    color: rgb(255, 211, 232) !important; /* var(--brand-pink-100) as RGB */
+    -webkit-text-stroke: 1px rgb(255, 211, 232);
+    text-stroke: 1px rgb(255, 211, 232);
+    font-size: 88px !important; /* ~2x H1 (44px) - explicit pixel value */
+    line-height: 1 !important;
+    text-align: center !important;
+    white-space: nowrap;
+    display: block !important;
+    visibility: visible !important;
+    opacity: 1 !important;
   }
 
-  .entry-header-left {
-    flex: 1;
+  .special-h1-background {
     display: flex;
-    flex-direction: column;
-    gap: var(--space-4);
+    align-items: center;
+    justify-content: center;
+    width: 100%;
+    height: 100%;
   }
 
-  .entry-header-right {
-    flex-shrink: 0;
+  .special-h1-foreground {
+    font-family: var(--font-display);
+    font-size: var(--text-h1);
+    line-height: var(--lh-tight);
+    color: var(--text-deep-purple);
+    text-align: center;
   }
 
-  /* Align headline top with album art top */
-  .entry-header-left [data-role="headline"] {
-    margin-top: 0;
+  /* Mission page styling */
+  .mission-columns-wrapper {
+    position: relative;
   }
 
-  /* Align share chips bottom with album art bottom */
-  .entry-header-left [data-role="share-chips"] {
-    margin-top: auto;
+  .mission-divider {
+    width: var(--divider-thickness);
+    min-width: var(--divider-thickness);
+    background: color-mix(in oklab, var(--brand-purple-800) 35%, transparent);
+    transform: rotate(var(--slant-base));
+    transform-origin: center;
+    pointer-events: none;
+    align-self: stretch;
   }
-}
 
-/* Electric Border Styles */
-.electric-border {
-  position: absolute;
-  inset: 0;
-  pointer-events: none;
-  z-index: 1;
-  clip-path: polygon(
-    var(--ch) 0,
-    calc(100% - var(--ch)) 0,
-    100% var(--ch),
-    100% calc(100% - var(--ch)),
-    calc(100% - var(--ch)) 100%,
-    var(--ch) 100%,
-    0 calc(100% - var(--ch)),
-    0 var(--ch)
-  );
-  -webkit-clip-path: polygon(
-    var(--ch) 0,
-    calc(100% - var(--ch)) 0,
-    100% var(--ch),
-    100% calc(100% - var(--ch)),
-    calc(100% - var(--ch)) 100%,
-    var(--ch) 100%,
-    0 calc(100% - var(--ch)),
-    0 var(--ch)
-  );
-  overflow: hidden;
-}
+  @media (max-width: 767px) {
+    .mission-divider {
+      display: none;
+    }
+  }
 
-.electric-border::before {
-  content: "";
-  position: absolute;
-  inset: -2px;
-  border: 1.5px solid;
-  opacity: 0.4;
-  transition: opacity 200ms ease-out, border-width 200ms ease-out;
-  clip-path: polygon(
-    var(--ch) 0,
-    calc(100% - var(--ch)) 0,
-    100% var(--ch),
-    100% calc(100% - var(--ch)),
-    calc(100% - var(--ch)) 100%,
-    var(--ch) 100%,
-    0 calc(100% - var(--ch)),
-    0 var(--ch)
-  );
-  -webkit-clip-path: polygon(
-    var(--ch) 0,
-    calc(100% - var(--ch)) 0,
-    100% var(--ch),
-    100% calc(100% - var(--ch)),
-    calc(100% - var(--ch)) 100%,
-    var(--ch) 100%,
-    0 calc(100% - var(--ch)),
-    0 var(--ch)
-  );
-  background: conic-gradient(
-    from 0deg at 50% 50%,
-    transparent 0deg,
-    transparent 60deg,
-    currentColor 90deg,
-    currentColor 120deg,
-    transparent 150deg,
-    transparent 210deg,
-    currentColor 240deg,
-    currentColor 270deg,
-    transparent 300deg,
-    transparent 360deg
-  );
-  mask-image: 
-    linear-gradient(#fff 0 0),
-    linear-gradient(#fff 0 0);
-  mask-clip: content-box, border-box;
-  mask-composite: exclude;
-  -webkit-mask-image: 
-    linear-gradient(#fff 0 0),
-    linear-gradient(#fff 0 0);
-  -webkit-mask-clip: content-box, border-box;
-  -webkit-mask-composite: xor;
-  animation: electric-border-rotate 4s linear infinite;
-}
+  /* Entry column styling */
+  .entry-column {
+    border-left-width: 2px;
+    border-right-width: 2px;
+    border-left-style: solid;
+    border-right-style: solid;
+  }
 
-.electric-border[data-active="true"]::before {
-  opacity: 0.8;
-  border-width: 2px;
-  animation-duration: 2s;
-}
+  .entry-column--review {
+    border-left-color: var(--brand-pink-100);
+    border-right-color: var(--brand-pink-100);
+  }
 
-.electric-border--review::before {
-  border-color: var(--brand-pink-500);
-  color: var(--brand-pink-500);
-}
+  .entry-column--podcast {
+    border-left-color: var(--brand-purple-600);
+    border-right-color: var(--brand-purple-600);
+  }
 
-.electric-border--podcast::before {
-  border-color: var(--brand-purple-600);
-  color: var(--brand-purple-600);
-}
+  /* Entry header alignment */
+  .entry-header {
+    display: flex;
+    flex-direction: column;
+    gap: var(--space-6);
+  }
 
-@keyframes electric-border-rotate {
-  0% {
-    transform: rotate(0deg);
+  @media (min-width: 768px) {
+    .entry-header {
+      flex-direction: row;
+      align-items: flex-start;
+      gap: var(--space-8);
+    }
+
+    .entry-header-left {
+      flex: 1;
+      display: flex;
+      flex-direction: column;
+      gap: var(--space-4);
+    }
+
+    .entry-header-right {
+      flex-shrink: 0;
+    }
+
+    /* Align headline top with album art top */
+    .entry-header-left [data-role="headline"] {
+      margin-top: 0;
+    }
+
+    /* Align share chips bottom with album art bottom */
+    .entry-header-left [data-role="share-chips"] {
+      margin-top: auto;
+    }
   }
-  100% {
-    transform: rotate(360deg);
+
+  /* Electric Border Styles */
+  .electric-border {
+    position: absolute;
+    inset: 0;
+    pointer-events: none;
+    z-index: 1;
+    clip-path: polygon(
+      var(--ch) 0,
+      calc(100% - var(--ch)) 0,
+      100% var(--ch),
+      100% calc(100% - var(--ch)),
+      calc(100% - var(--ch)) 100%,
+      var(--ch) 100%,
+      0 calc(100% - var(--ch)),
+      0 var(--ch)
+    );
+    -webkit-clip-path: polygon(
+      var(--ch) 0,
+      calc(100% - var(--ch)) 0,
+      100% var(--ch),
+      100% calc(100% - var(--ch)),
+      calc(100% - var(--ch)) 100%,
+      var(--ch) 100%,
+      0 calc(100% - var(--ch)),
+      0 var(--ch)
+    );
+    overflow: hidden;
   }
-}
 
-@media (prefers-reduced-motion: reduce) {
   .electric-border::before {
-    animation: none;
-    opacity: 0.3;
-    background: currentColor;
+    content: "";
+    position: absolute;
+    inset: -2px;
+    border: 1.5px solid;
+    opacity: 0.4;
+    transition: opacity 200ms ease-out, border-width 200ms ease-out;
+    clip-path: polygon(
+      var(--ch) 0,
+      calc(100% - var(--ch)) 0,
+      100% var(--ch),
+      100% calc(100% - var(--ch)),
+      calc(100% - var(--ch)) 100%,
+      var(--ch) 100%,
+      0 calc(100% - var(--ch)),
+      0 var(--ch)
+    );
+    -webkit-clip-path: polygon(
+      var(--ch) 0,
+      calc(100% - var(--ch)) 0,
+      100% var(--ch),
+      100% calc(100% - var(--ch)),
+      calc(100% - var(--ch)) 100%,
+      var(--ch) 100%,
+      0 calc(100% - var(--ch)),
+      0 var(--ch)
+    );
+    background: conic-gradient(
+      from 0deg at 50% 50%,
+      transparent 0deg,
+      transparent 60deg,
+      currentColor 90deg,
+      currentColor 120deg,
+      transparent 150deg,
+      transparent 210deg,
+      currentColor 240deg,
+      currentColor 270deg,
+      transparent 300deg,
+      transparent 360deg
+    );
+    mask-image: 
+      linear-gradient(#fff 0 0),
+      linear-gradient(#fff 0 0);
+    mask-clip: content-box, border-box;
+    mask-composite: exclude;
+    -webkit-mask-image: 
+      linear-gradient(#fff 0 0),
+      linear-gradient(#fff 0 0);
+    -webkit-mask-clip: content-box, border-box;
+    -webkit-mask-composite: xor;
+    animation: electric-border-rotate 4s linear infinite;
   }
-  
+
   .electric-border[data-active="true"]::before {
-    opacity: 0.6;
-    animation: none;
+    opacity: 0.8;
+    border-width: 2px;
+    animation-duration: 2s;
   }
-}
 
-@media (prefers-reduced-motion: reduce) {
-  *,
-  *::before,
-  *::after {
-    animation-duration: 0.01ms !important;
-    animation-iteration-count: 1 !important;
-    transition-duration: 0.01ms !important;
-    scroll-behavior: auto !important;
+  .electric-border--review::before {
+    border-color: var(--brand-pink-500);
+    color: var(--brand-pink-500);
   }
-}
-
-/* Review body image utilities */
-.review-image {
-  display: block;
-  overflow: hidden;
-  background: var(--surface);
-}
 
-.review-image img {
-  display: block;
-  width: 100%;
-  height: auto;
-  object-fit: cover;
-}
+  .electric-border--podcast::before {
+    border-color: var(--brand-purple-600);
+    color: var(--brand-purple-600);
+  }
 
-.review-image-small {
-  max-width: 320px;
-}
+  @keyframes electric-border-rotate {
+    0% {
+      transform: rotate(0deg);
+    }
+    100% {
+      transform: rotate(360deg);
+    }
+  }
 
-.review-image-medium {
-  max-width: 448px;
-}
+  @media (prefers-reduced-motion: reduce) {
+    .electric-border::before {
+      animation: none;
+      opacity: 0.3;
+      background: currentColor;
+    }
+    
+    .electric-border[data-active="true"]::before {
+      opacity: 0.6;
+      animation: none;
+    }
+  }
 
-.review-image-large {
-  max-width: 672px;
-}
+  /* Review body image utilities */
+  .review-image {
+    display: block;
+    overflow: hidden;
+    background: var(--surface);
+  }
 
-.review-image-featured {
-  max-width: 100%;
-  width: 100%;
-}
+  .review-image img {
+    display: block;
+    width: 100%;
+    height: auto;
+    object-fit: cover;
+  }
 
-.review-image-left {
-  float: left;
-  margin-right: var(--space-4);
-  margin-bottom: var(--space-4);
-  margin-top: 0;
-}
+  .review-image-small {
+    max-width: 320px;
+  }
 
-.review-image-right {
-  float: right;
-  margin-left: var(--space-4);
-  margin-bottom: var(--space-4);
-  margin-top: 0;
-}
+  .review-image-medium {
+    max-width: 448px;
+  }
 
-.review-image-center {
-  display: block;
-  margin-left: auto;
-  margin-right: auto;
-  margin-top: var(--space-6);
-  margin-bottom: var(--space-6);
-  clear: both;
-}
+  .review-image-large {
+    max-width: 672px;
+  }
 
-.review-image-featured.review-image-center {
-  margin-top: var(--space-8);
-  margin-bottom: var(--space-8);
-}
+  .review-image-featured {
+    max-width: 100%;
+    width: 100%;
+  }
 
-/* Clear floats after images */
-.portable-text-content::after {
-  content: "";
-  display: table;
-  clear: both;
-}
+  .review-image-left {
+    float: left;
+    margin-right: var(--space-4);
+    margin-bottom: var(--space-4);
+    margin-top: 0;
+  }
 
-@media (max-width: 768px) {
-  .review-image-left,
   .review-image-right {
-    float: none;
+    float: right;
+    margin-left: var(--space-4);
+    margin-bottom: var(--space-4);
+    margin-top: 0;
+  }
+
+  .review-image-center {
+    display: block;
     margin-left: auto;
     margin-right: auto;
-    display: block;
+    margin-top: var(--space-6);
+    margin-bottom: var(--space-6);
+    clear: both;
   }
-  
-  .review-image-small,
-  .review-image-medium,
-  .review-image-large {
-    max-width: 100%;
+
+  .review-image-featured.review-image-center {
+    margin-top: var(--space-8);
+    margin-bottom: var(--space-8);
+  }
+
+  /* Clear floats after images */
+  .portable-text-content::after {
+    content: "";
+    display: table;
+    clear: both;
   }
-}
 
+  @media (max-width: 768px) {
+    .review-image-left,
+    .review-image-right {
+      float: none;
+      margin-left: auto;
+      margin-right: auto;
+      display: block;
+    }
+    
+    .review-image-small,
+    .review-image-medium,
+    .review-image-large {
+      max-width: 100%;
+    }
+  }
+}
```
