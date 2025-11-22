# HomeCard CSS Prune Diff

```diff
diff --git a/styles/globals.css b/styles/globals.css
index 18cf071..93862fd 100644
--- a/styles/globals.css
+++ b/styles/globals.css
@@ -752,56 +752,6 @@
     border-color: var(--brand-purple-800) !important;
   }
 
-  .home-card-head {
-    display: flex;
-    flex-direction: column;
-    gap: var(--space-2);
-  }
-
-  .home-card-title-heading {
-    margin: 0;
-    font-size: inherit;
-    font-weight: inherit;
-    line-height: inherit;
-    color: inherit;
-  }
-
-  .home-card-title {
-    font-family: var(--font-display);
-    font-size: clamp(1.35rem, 1vw + 1rem, 1.65rem);
-    line-height: var(--lh-snug);
-    color: var(--brand-purple-800);
-  }
-
-  .home-card-meta {
-    font-size: 0.85rem;
-    letter-spacing: 0.06em;
-    text-transform: uppercase;
-    color: var(--text-muted);
-  }
-
-  .home-card-meta-primary {
-    border: none;
-    outline: none;
-    box-shadow: none;
-    background: transparent;
-  }
-
-  .home-card-meta-secondary {
-    text-transform: none;
-    letter-spacing: 0;
-    color: color-mix(in oklab, var(--brand-purple-600) 70%, transparent);
-  }
-
   .home-card-media {
     position: relative;
     flex: none;
@@ -811,38 +761,6 @@
     box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--brand-purple-600) 10%, transparent);
   }
 
-  .home-card-media[data-media-layout="youtube-pullquote"] {
-    display: grid;
-    grid-template-rows: 9fr 1fr 6fr;
-    overflow: hidden;
-  }
-
-  .home-card-media-image {
-    width: 100%;
-    height: 100%;
-    object-fit: cover;
-  }
-
-  .home-card-youtube-embed {
-    position: relative;
-    width: 100%;
-    height: 100%;
-    overflow: hidden;
-    background: #000;
-  }
-
-  .home-card-youtube-iframe {
-    position: absolute;
-    inset: 0;
-    width: 100%;
-    height: 100%;
-    border: 0;
-  }
-
-  .home-card-pullquote-spacer {
-    width: 100%;
-  }
-
   .home-card-pullquote-container {
     display: flex;
     align-items: center;
     padding: var(--space-4);
@@ -851,13 +769,6 @@
     overflow: hidden;
   }
 
-  .home-card-pullquote-text {
-    font-size: 0.95rem;
-    line-height: var(--lh-normal);
-    color: color-mix(in oklab, var(--brand-purple-800) 90%, transparent);
-    text-align: left;
-    margin: 0;
-  }
-
   .home-card-media-overlay {
     position: absolute;
     inset: 0;
@@ -905,13 +816,6 @@
     box-shadow: none;
   }
 
-  .home-card-pullquote {
-    font-size: 0.95rem;
-    line-height: var(--lh-normal);
-    text-align: center;
-    max-width: 26ch;
-  }
-
   .home-card-media[data-media-layout="split"] .home-card-pullquote {
     text-align: left;
     max-width: none;
@@ -920,23 +824,6 @@
     min-height: auto !important;
   }
 
-  .home-card-copy {
-    flex: 1;
-    display: flex;
-    flex-direction: column;
-  }
-
-  .home-card--podcast .home-card-copy {
-    justify-content: flex-end;
-  }
-
-  .home-card-text {
-    font-size: 0.95rem;
-    line-height: var(--lh-normal);
-    color: color-mix(in oklab, var(--brand-purple-800) 90%, transparent);
-  }
-
-  .card-actions {
-    margin-top: auto;
-    position: relative;
-    z-index: 3;
-  }
-
   .card-actions .button-trapezoid {
     background-color: color-mix(in oklab, var(--brand-pink-300) 40%, transparent);
     color: var(--brand-purple-800);
```


