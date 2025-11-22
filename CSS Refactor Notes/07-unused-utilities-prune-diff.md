```diff
--- a/styles/globals.css
+++ b/styles/globals.css
@@ -167,16 +167,6 @@
   .prose-measure {
     max-width: var(--measure);
   }
 
-  /* Kicker style */
-  .kicker {
-    margin: 0;
-    font-size: var(--text-caption);
-    font-variant-caps: all-small-caps;
-    font-weight: 500;
-    letter-spacing: 0.08em;
-    color: color-mix(in oklab, var(--brand-purple-800) 70%, transparent);
-  }
-
-  .section-title {
-    position: relative;
-    display: inline-flex;
-    align-items: flex-end;
-    padding-bottom: 0.25rem;
-  }
-
-  .section-title::after {
-    content: "";
-    position: absolute;
-    left: 0;
-    bottom: 0;
-    width: 100%;
-    height: 1px;
-    background: color-mix(in oklab, var(--brand-purple-800) 55%, transparent);
-  }
-
   .focus-chamfer {
     position: relative;
     outline: 2px solid transparent;
@@ -274,24 +264,6 @@
   .surface-frost-pink-70 {
     background: var(--surface-frost-pink-70);
   }
 
-  .surface-frost-pink-85 {
-    background: var(--surface-frost-pink-85);
-  }
-
-  .surface-frost-purple-30 {
-    background: var(--surface-frost-purple-30);
-  }
-
-  .surface-frost-white-90 {
-    background: var(--surface-frost-white-90);
-  }
-
-  .gradient-card-review {
-    background-image: var(--gradient-card-review);
-  }
-
-  .gradient-card-podcast {
-    background-image: var(--gradient-card-podcast);
-  }
-
-  .gradient-hero-title {
-    background-image: var(--gradient-hero-title);
-  }
-
   .surface-chamfer {
     --chamfer-size: var(--ch);
   }
 
-  :where(.chamfered, .surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
+  :where(.surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
     --chamfer-amount: var(--chamfer-size, var(--ch));
     border-radius: 0;
     -webkit-clip-path: polygon(
@@ -344,18 +316,6 @@
     border-radius: 0;
   }
 
-  .chamfered-border {
-    border-width: var(--chamfer-border-width, var(--border-strong-width));
-    border-style: solid;
-    border-color: var(--chamfer-border-color, var(--border-strong-color));
-    background-clip: padding-box;
-    -webkit-background-clip: padding-box;
-  }
-
-  .ch-14 {
-    --chamfer-size: var(--ch);
-  }
-
   .button-trapezoid {
     border-radius: 0 !important;
   }
 
   /* Fallback for very old browsers: square corners maintain layout */
   @supports not (clip-path: polygon(0 0)) {
-    :where(.chamfered, .surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
+    :where(.surface-chamfer, .home-card, .home-card-media, .home-card-media-overlay) {
       border-radius: 0;
     }
   }
 
   /* Aspect ratio utilities */
-  .ratio-4x5 {
-    aspect-ratio: 4 / 5;
-    position: relative;
-  }
-
   .ratio-1x1 {
     aspect-ratio: 1 / 1;
     position: relative;
   }
 
-  @supports not (aspect-ratio: 4 / 5) {
-    .ratio-4x5::before {
-      content: "";
-      display: block;
-      padding-bottom: 125%; /* 5/4 = 1.25 */
-    }
-    
-    .ratio-4x5 > * {
-      position: absolute;
-      top: 0;
-      left: 0;
-      width: 100%;
-      height: 100%;
-    }
-  }
-
   @supports not (aspect-ratio: 1 / 1) {
     .ratio-1x1::before {
       content: "";
       display: block;
```


