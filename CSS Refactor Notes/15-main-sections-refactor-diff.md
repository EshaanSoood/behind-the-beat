# Main sections CSS → Tailwind refactor diff

```diff
diff --git a/app/(home)/components/HomeHero.tsx b/app/(home)/components/HomeHero.tsx
@@ -2,9 +2,9 @@ import { Section } from "../../../components/Section";
 
 export function HomeHero() {
   return (
-    <Section as="section" className="home-hero-section" aria-labelledby="home-hero-heading">
-      <div className="home-hero-shell surface-chamfer paper-grain">
-        <div className="home-hero-copy">
+    <Section as="section" className="home-hero-section hidden md:block mt-8 mb-0" aria-labelledby="home-hero-heading">
+      <div className="home-hero-shell surface-chamfer paper-grain flex flex-col items-center gap-3 p-6 min-h-[var(--hero-min-height)] bg-[var(--surface)] shadow-soft">
+        <div className="home-hero-copy flex flex-col gap-3 text-center w-full">
           <h1 id="home-hero-heading" className="font-display">Welcome To Behind The Beat</h1>
           <p className="text-lg text-brand-purple800/80">
             A quiet corner of the internet away from algorithmic noise.

diff --git a/components/ReviewStrip.tsx b/components/ReviewStrip.tsx
@@ -47,9 +47,9 @@ export function ReviewStrip({ review }: ReviewStripProps) {
 
       {/* Album art - right side on desktop */}
       {review.cover && (
-        <div className="review-strip-artwork flex-shrink-0 md:self-stretch" data-role="artwork">
-          <Link href={`/reviews/${review.slug}`} className="focus-chamfer block h-full">
-            <div className="surface-chamfer relative h-full overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)]" style={{ aspectRatio: "1 / 1", width: "100%" }}>
+        <div className="review-strip-artwork flex-shrink-0 md:self-stretch min-w-[200px] md:w-auto md:min-w-[200px]" data-role="artwork">
+          <Link href={`/reviews/${review.slug}`} className="focus-chamfer block h-full md:flex md:items-stretch">
+            <div className="surface-chamfer relative h-full overflow-hidden border border-[var(--border-accent-strong)] bg-[var(--surface)] md:w-full md:h-full md:aspect-square" style={{ aspectRatio: "1 / 1", width: "100%" }}>
               <Image
                 src={review.cover}
                 alt={review.alt}

diff --git a/app/(home)/components/NewsletterSignup.tsx b/app/(home)/components/NewsletterSignup.tsx
@@ -11,8 +11,8 @@ export function NewsletterSignup() {
 
   return (
     <>
-      <section className="newsletter-section" role="region" aria-labelledby={headingId} data-newsletter="true">
-        <div className="newsletter-shell surface-chamfer paper-grain">
+      <section className="newsletter-section mt-16" role="region" aria-labelledby={headingId} data-newsletter="true">
+        <div className="newsletter-shell surface-chamfer paper-grain grid gap-4 bg-[var(--newsletter-surface)] border border-[var(--newsletter-border)] p-6 shadow-soft">
           <div>
             <h2 id={headingId} className="font-display text-[clamp(1.5rem,1.4vw+1rem,2rem)] leading-tight text-brand-purple800">
               Be The First To Know
@@ -22,7 +22,7 @@ export function NewsletterSignup() {
               <span className="font-display">Behind The Beat</span> before anyone else.
             </p>
           </div>
-          <div className="newsletter-form">
+          <div className="newsletter-form flex items-center">
             <ButtonTrapezoid
               type="button"
               tone="primary"

diff --git a/app/mission/components/MissionProse.tsx b/app/mission/components/MissionProse.tsx
@@ -6,7 +6,7 @@ export function MissionProse() {
       <SpecialH1>Our Mission</SpecialH1>
       
       {/* Three-column layout: Mission body, divider, and Meet the Editor */}
-      <div className="mission-columns-wrapper grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-8">
+      <div className="mission-columns-wrapper relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-8">
         {/* Left column: Mission body */}
           <div className="mission-body" data-section="mission-body" data-role="mission-body">

diff --git a/components/Footer.tsx b/components/Footer.tsx
@@ -26,15 +26,15 @@ export function Footer() {
   const currentYear = new Date().getFullYear();
 
   return (
-    <footer className="site-footer" role="contentinfo">
-      <div className="site-footer__bar">
-        <div className="container-page site-footer__inner">
-          <div className="site-footer__social">
+    <footer className="site-footer mt-12" role="contentinfo">
+      <div className="site-footer__bar bg-brand-pink500 w-full py-6">
+        <div className="container-page site-footer__inner flex items-center gap-6 flex-wrap">
+          <div className="site-footer__social flex items-center gap-4">
             {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
               <a
                 key={href}
                 href={href}
-                className="site-footer__social-link"
+                className="site-footer__social-link inline-flex items-center justify-center text-brand-purple800 transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-purple800 focus-visible:outline-offset-2 focus-visible:rounded-sm"
                 aria-label={label}
                 target={href.startsWith("http") ? "_blank" : undefined}
                 rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
@@ -44,7 +44,7 @@ export function Footer() {
             ))}
           </div>
 
-          <nav className="site-footer__nav" aria-label="Footer navigation">
+          <nav className="site-footer__nav flex-1" aria-label="Footer navigation">
             <ul className="nav-list">
               {NAV_ITEMS.map((item, index) => {
                 const angleClass = ANGLE_CLASSES[index % ANGLE_CLASSES.length];
@@ -61,10 +61,10 @@ export function Footer() {
         </div>
       </div>
 
-      <div className="site-footer__meta">
+      <div className="site-footer__meta py-4 text-[color-mix(in_oklab,var(--brand-purple-800)_70%,transparent)]">
         <div className="container-page">
-          <p className="caption">
-            <Link href="/privacy">Privacy</Link> · © {currentYear} Behind the Beat
+          <p className="caption text-inherit">
+            <Link href="/privacy" className="text-inherit underline underline-offset-2 hover:text-brand-purple800">Privacy</Link> · © {currentYear} Behind the Beat
           </p>
         </div>
       </div>

diff --git a/styles/globals.css b/styles/globals.css
@@ -553,11 +553,6 @@
     }
   }
 
-  .home-hero-section {
-    display: none;
-    margin-top: var(--space-8);
-    margin-bottom: 0;
-  }
-
-  @media (min-width: 768px) {
-    .home-hero-section {
-      display: block;
-    }
-  }
-
   .home-hero-shell {
     display: flex;
@@ -576,13 +571,6 @@
     box-shadow: var(--shadow-soft);
   }
 
-  .home-hero-copy {
-    display: flex;
-    flex-direction: column;
-    gap: var(--space-3);
-    text-align: center;
-    width: 100%;
-  }
-
   .home-hero-badge {
     display: inline-flex;
@@ -780,21 +768,6 @@
     background-color: color-mix(in oklab, var(--brand-pink-100) 20%, transparent) !important;
   }
 
-  .review-strip-artwork {
-    min-width: 200px;
-  }
-
-  @media (min-width: 768px) {
-    .review-strip-artwork {
-      width: auto;
-      min-width: 200px;
-    }
-    
-    .review-strip-artwork > a {
-      display: flex;
-      align-items: stretch;
-    }
-    
-    .review-strip-artwork > a > div {
-      width: 100%;
-      height: 100%;
-      aspect-ratio: 1 / 1;
-    }
-  }
-
   .review-header {
     margin-bottom: 0;
@@ -843,17 +826,6 @@
     fill: var(--brand-pink-500) !important;
   }
 
-  .newsletter-section {
-    margin-top: var(--space-16);
-  }
-
   .newsletter-shell {
     display: grid;
@@ -856,10 +828,6 @@
     box-shadow: var(--shadow-soft);
   }
 
-  .newsletter-form {
-    display: flex;
-    align-items: center;
-  }
-
   .site-footer {
     margin-top: var(--space-12);
   }
@@ -861,11 +829,6 @@
     margin-top: var(--space-12);
   }
 
-  .site-footer {
-    margin-top: var(--space-12);
-  }
-
   .site-footer__bar {
     background: var(--brand-pink-500);
     width: 100%;
@@ -865,11 +829,6 @@
     padding-block: var(--space-6);
   }
 
-  .site-footer__bar {
-    background: var(--brand-pink-500);
-    width: 100%;
-    padding-block: var(--space-6);
-  }
-
   .site-footer__inner {
     display: flex;
     align-items: center;
@@ -871,11 +830,6 @@
     flex-wrap: wrap;
   }
 
-  .site-footer__inner {
-    display: flex;
-    align-items: center;
-    gap: var(--space-6);
-    flex-wrap: wrap;
-  }
-
   .site-footer__social {
     display: flex;
@@ -878,11 +832,6 @@
     gap: var(--space-4);
   }
 
-  .site-footer__social {
-    display: flex;
-    align-items: center;
-    gap: var(--space-4);
-  }
-
   .site-footer__social-link {
     display: inline-flex;
@@ -884,20 +833,6 @@
     transition: opacity 160ms ease;
   }
 
-  .site-footer__social-link {
-    display: inline-flex;
-    align-items: center;
-    justify-content: center;
-    color: var(--brand-purple-800);
-    transition: opacity 160ms ease;
-  }
-
-  .site-footer__social-link:hover {
-    opacity: 0.8;
-  }
-
-  .site-footer__social-link:focus-visible {
-    outline: 2px solid var(--brand-purple-800);
-    outline-offset: 2px;
-    border-radius: 2px;
-  }
-
   .site-footer__nav {
     flex: 1;
@@ -902,11 +837,6 @@
     flex: 1;
   }
 
-  .site-footer__nav {
-    flex: 1;
-  }
-
   .site-footer__nav .nav-list {
     display: flex;
@@ -913,20 +843,6 @@
     flex-wrap: wrap;
   }
 
-  .site-footer__meta .caption {
-    color: inherit;
-  }
-
-  .site-footer__meta a {
-    color: inherit;
-    text-decoration: underline;
-    text-underline-offset: 2px;
-  }
-
-  .site-footer__meta a:hover {
-    color: var(--brand-purple-800);
-  }
-
   /* Special H1 styling */
   .special-h1-wrapper {
@@ -969,11 +885,6 @@
     color: var(--text-deep-purple);
   }
 
-  .mission-columns-wrapper {
-    position: relative;
-  }
-
   /* Mission page styling */
   .mission-divider {
     width: var(--divider-thickness);
```


