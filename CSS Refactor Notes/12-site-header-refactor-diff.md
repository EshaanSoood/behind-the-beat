```diff
diff --git a/components/Header.tsx b/components/Header.tsx
index 007e14c..4d7f02e 100644
--- a/components/Header.tsx
+++ b/components/Header.tsx
@@ -26,22 +26,22 @@ export function Header() {
   };
 
   return (
-    <header className="site-header" role="banner">
-      <div className="site-header__layout">
-        <div className="site-header__cluster">
+    <header className="site-header relative w-full max-w-[1200px] mx-auto mt-3 px-4 py-3 text-brand-purple-800" role="banner">
+      <div className="site-header__layout flex items-center justify-between gap-4">
+        <div className="site-header__cluster flex items-stretch gap-0 min-w-0">
           <Link
             href="/"
-            className="site-header__brand"
+            className="site-header__brand relative flex items-center gap-3 no-underline text-inherit py-2"
             aria-label="Behind the Beat home"
             data-logo-block="true"
           >
-            <span className="site-header__brand-mark" data-logo="true">
+            <span className="site-header__brand-mark inline-flex items-center justify-center w-[clamp(120px,10vw,176px)]" data-logo="true">
               <Image src="/images/logo.png" alt="Behind the Beat logo" width={144} height={56} priority />
             </span>
           </Link>
-          <nav className="site-header__nav" aria-label="Primary navigation">
+          <nav className="site-header__nav relative hidden md:flex items-center py-2 px-[calc(var(--space-6)+var(--nav-stripe))] -ml-0.5 self-stretch z-[1] shadow-soft" aria-label="Primary navigation">
             <span aria-hidden="true" data-divider="angled" className="site-header__nav-divider" />
-            <ul className="nav-list">
+            <ul className="nav-list flex items-center gap-[1.5rem] font-display uppercase tracking-[0.12em] text-[0.95rem] justify-center">
               {NAV_ITEMS.map((item, index) => {
                 const isActive = pathname === item.href;
                 const angleClass = ANGLE_CLASSES[index % ANGLE_CLASSES.length];
                 return (
                   <li key={item.href}>
                     <Link
                       href={item.href}
-                      className={`nav-link ${angleClass} ${isActive ? "is-active" : ""}`.trim()}
+                      className={`nav-link relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600 ${angleClass} ${isActive ? "is-active" : ""}`.trim()}
                       aria-current={isActive ? "page" : undefined}
                       onClick={handleMobileNavClick}
                     >
                       {item.label}
                     </Link>
                   </li>
                 );
               })}
               <li>
                 <button
                   type="button"
-                  className="nav-link nav-angle-2"
+                  className="nav-link nav-angle-2 relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600"
                   onClick={() => setSubscribeOpen(true)}
                   aria-label="Subscribe to newsletter"
                 >
                   SUBSCRIBE
                 </button>
               </li>
             </ul>
           </nav>
         </div>
 
-        <div className="site-header__mobile">
+        <div className="site-header__mobile flex items-center ml-auto relative">
           <button
             type="button"
-            className="site-header__mobile-trigger"
+            className="site-header__mobile-trigger inline-flex items-center justify-center w-11 h-11 border-none text-brand-purple-800 shadow-soft"
             aria-expanded={mobileOpen}
             aria-controls={menuId}
             aria-label={mobileOpen ? "Close menu" : "Open menu"}
             onClick={() => setMobileOpen((prev) => !prev)}
           >
             <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
-            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
+            <svg className="w-[22px] h-[22px]" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
               {mobileOpen ? (
                 <path d="M6.343 6.343a1 1 0 0 1 1.414 0L12 10.586l4.243-4.243a1 1 0 1 1 1.414 1.414L13.414 12l4.243 4.243a1 1 0 0 1-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 0 1-1.414-1.414L10.586 12 6.343 7.757a1 1 0 0 1 0-1.414Z" />
               ) : (
                 <path d="M3.75 7.5a1 1 0 0 1 1-1h14.5a1 1 0 1 1 0 2H4.75a1 1 0 0 1-1-1Zm0 5.5a1 1 0 0 1 1-1h14.5a1 1 0 1 1 0 2H4.75a1 1 0 0 1-1-1Zm1 4.5a1 1 0 1 0 0 2h14.5a1 1 0 1 0 0-2H4.75Z" />
               )}
             </svg>
           </button>
 
-          <div className="site-header__mobile-panel" data-open={mobileOpen} id={menuId} role="dialog" aria-modal="false">
+          <div className="site-header__mobile-panel absolute top-[calc(100%+var(--space-2))] right-0 w-[min(320px,90vw)] bg-surface border border-accent-strong shadow-card p-4 hidden flex-col gap-3 z-20 data-[open=true]:flex" data-open={mobileOpen} id={menuId} role="dialog" aria-modal="false">
             <nav aria-label="Mobile primary navigation">
-              <ul className="nav-list nav-list--wrap">
+              <ul className="nav-list nav-list--wrap flex items-center gap-6 font-display uppercase tracking-[0.12em] text-[0.95rem] flex-wrap gap-y-3">
                 {NAV_ITEMS.map((item) => {
                   const isActive = pathname === item.href;
                   return (
                     <li key={item.href}>
                       <Link
                         href={item.href}
-                        className={`nav-link ${isActive ? "is-active" : ""}`.trim()}
+                        className={`nav-link relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600 font-display uppercase tracking-[0.08em] ${isActive ? "is-active" : ""}`.trim()}
                         aria-current={isActive ? "page" : undefined}
                         onClick={handleMobileNavClick}
                       >
                         {item.label}
                       </Link>
                     </li>
                   );
                 })}
                 <li>
                   <button
                     type="button"
-                    className="nav-link"
+                    className="nav-link relative inline-flex items-center px-3 py-2 text-brand-purple-800 transition-colors duration-150 ease-in-out hover:text-brand-purple-600 font-display uppercase tracking-[0.08em]"
                     onClick={() => {
                       setSubscribeOpen(true);
                       handleMobileNavClick();
                     }}
                     aria-label="Subscribe to newsletter"
                   >
                     SUBSCRIBE
                   </button>
                 </li>
               </ul>
             </nav>
           </div>
         </div>
       </div>
       <SubscribeModal isOpen={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
     </header>
   );
 }
 
diff --git a/styles/globals.css b/styles/globals.css
index 18cf071..a85a781 100644
--- a/styles/globals.css
+++ b/styles/globals.css
@@ -471,18 +471,6 @@
     z-index: -1;
   }
 
-  .site-header__layout {
-    display: flex;
-    align-items: center;
-    justify-content: space-between;
-    gap: var(--space-4);
-  }
-
-  .site-header__cluster {
-    display: flex;
-    align-items: stretch;
-    gap: 0;
-    min-width: 0;
-  }
-
   .site-header__brand {
     position: relative;
     display: flex;
@@ -512,16 +500,6 @@
     z-index: -1;
   }
 
-  .site-header__brand-mark {
-    display: inline-flex;
-    align-items: center;
-    justify-content: center;
-    width: clamp(120px, 10vw, 176px);
-  }
-
-  .site-header__brand-mark img {
-    width: 100%;
-    height: auto;
-  }
-
   .site-header__logo-wordmark {
     font-family: var(--font-display);
     font-size: 1.1rem;
@@ -565,11 +543,6 @@
     pointer-events: none;
   }
 
-  .site-header__mobile {
-    display: flex;
-    align-items: center;
-    margin-left: auto;
-    position: relative;
-  }
-
   .site-header__mobile-trigger {
     display: inline-flex;
     align-items: center;
@@ -583,24 +556,6 @@
     box-shadow: var(--shadow-soft);
   }
 
-  .site-header__mobile-trigger svg {
-    width: 22px;
-    height: 22px;
-  }
-
-  .site-header__mobile-panel {
-    position: absolute;
-    top: calc(100% + var(--space-2));
-    right: 0;
-    width: min(320px, 90vw);
-    background: var(--surface);
-    border: 1px solid var(--border-accent-strong);
-    box-shadow: var(--shadow-card);
-    padding: var(--space-4);
-    display: none;
-    flex-direction: column;
-    gap: var(--space-3);
-    z-index: 20;
-  }
-
-  .site-header__mobile-panel[data-open="true"] {
-    display: flex;
-  }
-
-  .site-header__mobile-panel a {
-    font-family: var(--font-display);
-    text-transform: uppercase;
-    letter-spacing: 0.08em;
-    color: var(--brand-purple-800);
-  }
-
   @media (min-width: 768px) {
     .site-header__nav {
       display: flex;
     }
 
     .site-header__mobile {
       display: none;
     }
   }
 
   .site-header__nav .nav-list {
-    --nav-divider-gap: 1.5rem;
-    gap: var(--nav-divider-gap);
-    justify-content: center;
+    --nav-divider-gap: 1.5rem;
   }
```


