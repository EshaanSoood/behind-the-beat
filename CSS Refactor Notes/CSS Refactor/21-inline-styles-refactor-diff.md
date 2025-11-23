# Inline styles refactor diff

```diff
diff --git a/components/ReviewStrip.tsx b/components/ReviewStrip.tsx
index 0000000..0000000 100644
--- a/components/ReviewStrip.tsx
+++ b/components/ReviewStrip.tsx
@@ -49,7 +49,7 @@ export function ReviewStrip({ review }: ReviewStripProps) {
         <div className="review-strip-artwork flex-shrink-0 md:self-stretch min-w-[200px] md:w-auto md:min-w-[200px]" data-role="artwork">
           <Link href={`/reviews/${review.slug}`} className="focus-chamfer block h-full md:flex md:items-stretch">
-            <div className="surface-chamfer relative h-full overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)] md:w-full md:h-full md:aspect-square" style={{ aspectRatio: "1 / 1", width: "100%" }}>
+            <div className="surface-chamfer relative h-full overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)] aspect-square w-full md:w-full md:h-full md:aspect-square">
               <Image
                 src={review.cover}
                 alt={review.alt}
diff --git a/components/SubscribeModal.tsx b/components/SubscribeModal.tsx
index 0000000..0000000 100644
--- a/components/SubscribeModal.tsx
+++ b/components/SubscribeModal.tsx
@@ -123,8 +123,7 @@ export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
       <div
         ref={dialogRef}
-        className="subscribe-dialog fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-neutral-ui-surface p-6 shadow-soft focus:outline-none surface-chamfer"
-        style={{ backgroundColor: "var(--magazine-white)" }}
+        className="subscribe-dialog fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-neutral-ui-surface bg-[var(--magazine-white)] p-6 shadow-soft focus:outline-none surface-chamfer"
         role="dialog"
         aria-modal="true"
         aria-labelledby="subscribe-title"
@@ -346,11 +345,11 @@ export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
                 </div>
                 <div id="mce-responses" className="clear foot">
-                  <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
-                  <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
+                  <div className="response hidden" id="mce-error-response"></div>
+                  <div className="response hidden" id="mce-success-response"></div>
                 </div>
-                <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
+                <div aria-hidden="true" className="absolute -left-[5000px]">
                   <input
                     type="text"
                     name="b_f1b69e21f3230273dacff4ed5_9df3622d09"
@@ -368,9 +367,9 @@ export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
                       />
                     </span>
-                    <p className="btb-badge" style={{ margin: 0 }}>
+                    <p className="btb-badge m-0">
                       <a href="http://eepurl.com/jpl9DA" title="Mailchimp - email marketing made easy and fun">
-                        <span style={{ display: "inline-block", backgroundColor: "transparent", borderRadius: "4px" }}>
+                        <span className="inline-block bg-transparent rounded">
                           <img
                             className="refferal_badge"
                             src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
diff --git a/components/SpecialH1.tsx b/components/SpecialH1.tsx
index 0000000..0000000 100644
--- a/components/SpecialH1.tsx
+++ b/components/SpecialH1.tsx
@@ -14,18 +14,8 @@ export function SpecialH1({ children, className }: SpecialH1Props) {
         className="special-h1-background absolute inset-0 flex items-center justify-center pointer-events-none"
       >
         <div 
-          className="special-h1-bg-text font-display leading-none" 
+          className="special-h1-bg-text block font-display text-[88px] text-[rgb(255,211,232)] leading-[1] text-center whitespace-nowrap visible opacity-100" 
           data-role="special-h1-background"
-          style={{ 
-            fontFamily: 'var(--font-display)',
-            fontSize: '88px', // ~2x H1 (44px) - explicit pixel value for Puppeteer
-            color: 'rgb(255, 211, 232)', // var(--brand-pink-100) as RGB
-            lineHeight: '1',
-            textAlign: 'center',
-            whiteSpace: 'nowrap',
-            display: 'block',
-            visibility: 'visible',
-            opacity: '1'
-          }}
         >
           {text}
         </div>
diff --git a/app/podcast/[slug]/components/EpisodePlayer.tsx b/app/podcast/[slug]/components/EpisodePlayer.tsx
index 0000000..0000000 100644
--- a/app/podcast/[slug]/components/EpisodePlayer.tsx
+++ b/app/podcast/[slug]/components/EpisodePlayer.tsx
@@ -80,8 +80,7 @@ export function EpisodePlayer({ youtubeId, title, autoplay = false }: EpisodePl
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             allowFullScreen
-            className="absolute inset-0 h-full w-full border-0"
-            style={{ minHeight: "200px" }}
+            className="absolute inset-0 h-full w-full min-h-[200px] border-0"
           />
         </div>
       </div>
```

