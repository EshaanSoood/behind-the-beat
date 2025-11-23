```diff
diff --git a/app/(home)/components/HomeCard.tsx b/app/(home)/components/HomeCard.tsx
index 16526ca..339832f 100644
--- a/app/(home)/components/HomeCard.tsx
+++ b/app/(home)/components/HomeCard.tsx
@@ -177,7 +177,7 @@ export function HomeCard({
       </header>
 
       <div
-        className="paper-grain surface-chamfer home-card-media ratio-1x1"
+        className="paper-grain surface-chamfer home-card-media relative aspect-square"
         data-media-layout={isPodcastCard ? "youtube-pullquote" : undefined}
       >
         {isPodcastCard && youtubeId ? (
diff --git a/styles/globals.css b/styles/globals.css
index 18cf071..01522e3 100644
--- a/styles/globals.css
+++ b/styles/globals.css
@@ -304,24 +304,6 @@ export function HomeCard({
     overflow: hidden;
   }
 
-  /* Aspect ratio utilities */
-  .ratio-1x1 {
-    aspect-ratio: 1 / 1;
-    position: relative;
-  }
-
-  @supports not (aspect-ratio: 1 / 1) {
-    .ratio-1x1::before {
-      content: "";
-      display: block;
-      padding-bottom: 100%;
-    }
-    
-    .ratio-1x1 > * {
-      position: absolute;
-      top: 0;
-      left: 0;
-      width: 100%;
-      height: 100%;
-    }
-  }
-
-  /* Screen reader only utility */
-  .sr-only {
-    position: absolute;
-    width: 1px;
-    height: 1px;
-    padding: 0;
-    margin: -1px;
-    overflow: hidden;
-    clip: rect(0, 0, 0, 0);
-    white-space: nowrap;
-    border-width: 0;
-  }
 }
```


