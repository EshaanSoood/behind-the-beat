diff --git a/components/ReviewStrip.tsx b/components/ReviewStrip.tsx
index 0e1d7a8..312ffa5 100644
--- a/components/ReviewStrip.tsx
+++ b/components/ReviewStrip.tsx
@@ -40,9 +40,13 @@ export function ReviewStrip({ review }: ReviewStripProps) {
             {isTruncated && "..."}
           </p>
           <div className="review-strip-button mt-4 flex justify-center md:mt-auto" role="presentation">
-            <div className="button-trapezoid inline-flex items-center justify-center px-4 py-2 text-sm bg-transparent text-brand-pink500 border border-brand-pink100 md:group-hover:bg-brand-pink100/20 transition-colors duration-150">
+            <ButtonTrapezoid
+              href={`/reviews/${review.slug}`}
+              size="sm"
+              className="!bg-transparent !text-brand-pink500 !border-brand-pink100 hover:!bg-brand-pink100/20"
+            >
               Read More <span className="ml-2 font-display text-xl leading-none">+</span>
-            </div>
+            </ButtonTrapezoid>
           </div>
         </div>
 
diff --git a/styles/globals.css b/styles/globals.css
index 47c6a99..581391c 100644
--- a/styles/globals.css
+++ b/styles/globals.css
@@ -884,6 +884,22 @@
     fill: var(--brand-pink-500) !important;
   }
 
+  .card-actions .button-trapezoid {
+    background-color: color-mix(in oklab, var(--brand-pink-300) 40%, transparent);
+    color: var(--brand-purple-800);
+    border: 1px solid var(--brand-pink-300);
+    width: 100%;
+    text-align: center;
+    justify-content: center;
+  }
+
+  .card-actions--image-button {
+    margin-top: 0;
+    margin-bottom: var(--space-4);
+    display: flex;
+    align-items: baseline;
+  }
+
   .newsletter-shell {
     display: grid;
     gap: var(--space-4);
