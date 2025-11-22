# HomeCard Component Refactor Diff

```diff
diff --git a/app/(home)/components/HomeCard.tsx b/app/(home)/components/HomeCard.tsx
index 16526ca..2a5ca55 100644
--- a/app/(home)/components/HomeCard.tsx
+++ b/app/(home)/components/HomeCard.tsx
@@ -130,7 +130,7 @@ export function HomeCard({
 
   const overlayPullQuote = (
     <p
-      className={`home-card-pullquote line-clamp-3 ${
+      className={`home-card-pullquote line-clamp-3 text-[0.95rem] leading-normal text-center max-w-[26ch] ${
         !isPodcastCard
           ? `opacity-10 transition-opacity duration-200 ease-out min-h-[4.5rem] ${
               isInteracting ? "opacity-100" : ""
@@ -145,7 +145,11 @@ export function HomeCard({
 
   return (
     <article
-      className={`paper-grain surface-chamfer home-card home-card--${variant} transition-transform transition-shadow duration-200 ease-out motion-reduce:transform-none ${
+      className={`paper-grain surface-chamfer home-card home-card--${variant} flex flex-col gap-4 p-6 bg-surface shadow-card-rest border-[1.5px] border-solid ${
+        variant === "review" ? "border-[var(--card-border-review)]" : ""
+      } ${
+        variant === "podcast" ? "border-brand-purple-800" : ""
+      } transition-transform transition-shadow duration-200 ease-out motion-reduce:transform-none ${
         isInteracting ? "-translate-y-1 scale-[1.02]" : ""
       }`}
       data-card="true"
@@ -160,16 +164,16 @@ export function HomeCard({
       onBlurCapture={clearInteraction}
     >
       <ElectricBorder variant={variant} isActive={isInteracting} />
-      <header className="home-card-head">
-        <h3 id={headingId} className="home-card-title-heading">
-          <Link href={href} className="focus-chamfer home-card-title">
+      <header className="home-card-head flex flex-col gap-2">
+        <h3 id={headingId} className="home-card-title-heading m-0">
+          <Link href={href} className="focus-chamfer home-card-title font-display text-[clamp(1.35rem,1vw+1rem,1.65rem)] leading-snug text-brand-purple-800">
             <span className="line-clamp-2">{title}</span>
           </Link>
         </h3>
-        <p className="home-card-meta home-card-meta-primary">{metaPrimary}</p>
+        <p className="home-card-meta home-card-meta-primary text-[0.85rem] tracking-[0.06em] uppercase text-text-muted border-0 outline-none shadow-none bg-transparent">{metaPrimary}</p>
         <time
           id={publishedId}
-          className="home-card-meta home-card-meta-secondary"
+          className="home-card-meta home-card-meta-secondary text-[0.85rem] tracking-[0.06em] uppercase text-text-muted normal-case tracking-[0] text-[color-mix(in_oklab,var(--brand-purple-600)_70%,transparent)]"
           dateTime={published.iso}
         >
           {published.display}
@@ -177,12 +181,14 @@ export function HomeCard({
       </header>
 
       <div
-        className="paper-grain surface-chamfer home-card-media ratio-1x1"
+        className={`paper-grain surface-chamfer home-card-media relative aspect-square flex-none w-full border-0 bg-[color-mix(in_oklab,var(--brand-pink-100)_12%,transparent)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--brand-purple-600)_10%,transparent)] ${
+          isPodcastCard ? "grid grid-rows-[9fr_1fr_6fr] overflow-hidden" : ""
+        }`}
         data-media-layout={isPodcastCard ? "youtube-pullquote" : undefined}
       >
         {isPodcastCard && youtubeId ? (
           <>
-            <div className="home-card-youtube-embed">
+            <div className="home-card-youtube-embed relative w-full h-full overflow-hidden bg-black">
               <iframe
                 src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&autoplay=0`}
                 title={`Watch ${title}`}
                 loading="lazy"
                 referrerPolicy="strict-origin-when-cross-origin"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowFullScreen
-                className="home-card-youtube-iframe"
+                className="home-card-youtube-iframe absolute inset-0 w-full h-full border-0"
               />
             </div>
-            <div className="home-card-pullquote-spacer" />
-            <div className="home-card-pullquote-container">
-              <p className="home-card-pullquote-text line-clamp-3">
+            <div className="home-card-pullquote-spacer w-full" />
+            <div className="home-card-pullquote-container flex items-center p-4 bg-[color-mix(in_oklab,var(--brand-pink-100)_40%,transparent)] overflow-hidden">
+              <p className="home-card-pullquote-text line-clamp-3 text-[0.95rem] leading-normal text-[color-mix(in_oklab,var(--brand-purple-800)_90%,transparent)] text-left m-0">
                 {displayPullQuote}
               </p>
             </div>
           </>
         ) : (
           <>
             <Image
               src={media.src}
               alt={media.alt}
               width={media.width}
               height={media.height}
               priority={media.priority}
               sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 640px) 340px, 88vw"
-              className="home-card-media-image"
+              className="home-card-media-image w-full h-full object-cover"
               loading={media.priority ? "eager" : "lazy"
               decoding="async"
             />
             {overlayAction ? (
               <button
                 type="button"
-                className={`focus-chamfer home-card-media-overlay transition-opacity duration-200 ease-out ${
+                className={`focus-chamfer home-card-media-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)] text-brand-pink-100 z-[2] pointer-events-none transition-opacity duration-200 ease-out ${
+                  variant === "review" ? "bg-[color-mix(in_oklab,var(--brand-pink-500)_30%,transparent)]" : ""
+                } ${
+                  variant === "podcast" ? "bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]" : ""
+                } ${
                   isInteracting ? "opacity-100" : "opacity-0"
                 }`}
                 aria-label={overlayAction.label}
                 aria-hidden={isInteracting ? "false" : "true"}
                 onClick={handleOverlayClick}
               >
                 <svg aria-hidden="true" width="52" height="52" viewBox="0 0 52 52" fill="currentColor">
                   <path d="M21 16.667 37 26l-16 9.333V16.667Z" />
                 </svg>
                 {overlayPullQuote}
               </button>
             ) : (
               <div
-                className={`home-card-media-overlay transition-opacity duration-200 ease-out ${
+                className={`home-card-media-overlay absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[color-mix(in_oklab,var(--brand-purple-800)_40%,transparent)] text-brand-pink-100 z-[2] pointer-events-none transition-opacity duration-200 ease-out ${
+                  variant === "review" ? "bg-[color-mix(in_oklab,var(--brand-pink-500)_30%,transparent)]" : ""
+                } ${
+                  variant === "podcast" ? "bg-[color-mix(in_oklab,var(--brand-purple-600)_30%,transparent)]" : ""
+                } ${
                   isInteracting ? "opacity-100" : "opacity-0"
                 }`}
                 aria-hidden={isInteracting ? "false" : "true"}
               >
                 {overlayPullQuote}
               </div>
             )}
           </>
         )}
       </div>
 
       {displaySummary && (
-        <div className="home-card-copy">
+        <div className={`home-card-copy flex-1 flex flex-col ${
+          isPodcastCard ? "justify-end" : ""
+        }`}>
           <p
-            className={`home-card-text line-clamp-3 transition-opacity duration-200 ease-out ${
+            className={`home-card-text line-clamp-3 text-[0.95rem] leading-normal text-[color-mix(in_oklab,var(--brand-purple-800)_90%,transparent)] transition-opacity duration-200 ease-out ${
               isInteracting ? "opacity-[0.15]" : "opacity-100"
             }`}
             aria-hidden={isInteracting ? "true" : "false"}
           >
             {displaySummary}
           </p>
         </div>
       )}
 
-      <div className="card-actions">
+      <div className="card-actions mt-auto relative z-[3]">
         <ButtonTrapezoid href={cta.href} tone={cta.tone} size="sm" aria-describedby={publishedId}>
           {cta.label}
         </ButtonTrapezoid>
       </div>
     </article>
   );
 }
```

