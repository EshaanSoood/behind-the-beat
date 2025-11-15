// btb-layout-acceptance.mjs

//

// Extremely strict Puppeteer layout checks for the Behind the Beat tech spec.

//

// Usage:

//   BTB_BASE_URL="http://localhost:3000" node btb-layout-acceptance.mjs

//

// Assumes you add data-* hooks as described in comments below.

import puppeteer from 'puppeteer';

const BASE_URL = process.env.BTB_BASE_URL || 'http://localhost:3000';

const BRAND = {

  // TODO: Replace these with your real computed rgb() values

  magazineWhite: 'rgb(253, 250, 245)',

  darkPurple: 'rgb(40, 15, 50)',

  lightPink: 'rgb(255, 210, 230)',

  brandPink: 'rgb(230, 120, 160)',

  brandPurple: 'rgb(120, 80, 200)',

};

const PAGES = {

  home: '/',

  mission: '/mission',

  reviewListing: '/reviews',

  podcastListing: '/podcast',

  reviewEntry: '/reviews/acoustic-sessions',

  podcastEntry: '/podcast/city-sounds',

};

const DESKTOP_VIEWPORT = { width: 1280, height: 800 };

const MOBILE_VIEWPORT = { width: 390, height: 844 };

function fmt(path, msg) {

  return `[${path}] ${msg}`;

}

async function checkContainerWidths(page, paths, errors) {

  const widths = [];

  for (const path of paths) {

    try {
      await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
      await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (e) {
      console.error(`Failed to load ${path}:`, e.message);
      continue;
    }

    const width = await page.evaluate(() => {

      const el =

        document.querySelector('[data-site-container]') ||

        document.querySelector('.site-container');

      if (!el) return null;

      return el.getBoundingClientRect().width;

    });

    widths.push({ path, width });

  }

  const baseline = widths[0];

  if (!baseline.width) {

    errors.push(fmt(baseline.path, 'No [data-site-container]/.site-container found'));

    return;

  }

  for (const { path, width } of widths.slice(1)) {

    if (!width) {

      errors.push(fmt(path, 'No [data-site-container]/.site-container found'));

      continue;

    }

    const delta = Math.abs(width - baseline.width);

    if (delta > 1) {

      errors.push(

        fmt(

          path,

          `Site container width inconsistent. Expected ~${baseline.width}px, got ${width}px (Δ=${delta}px)`,

        ),

      );

    }

  }

}

async function checkGlobalTextRules(page, path, errors) {

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    // 1) Exactly one H1 per page

    const h1s = document.querySelectorAll('main h1, h1');

    if (h1s.length !== 1) {

      errs.push(`Expected exactly 1 <h1> in main, found ${h1s.length}`);

    }

    // 2) hyphens: none on body text

    const p =

      document.querySelector('main p') ||

      document.querySelector('[data-site-container] p') ||

      document.querySelector('p');

    if (p) {

      const hyphens = getComputedStyle(p).hyphens;

      if (hyphens !== 'none') {

        errs.push(`Body text hyphens should be 'none', got '${hyphens}'`);

      }

    } else {

      errs.push('No <p> found to verify hyphenation');

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkSpecialH1(page, path, errors) {
  // Capture console logs for debugging
  const debugLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[DEBUG]')) {
      debugLogs.push(text);
      console.log(`[${path}] ${text}`);
    }
  });

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const h1 = document.querySelector('main h1, h1');

    if (!h1) {

      errs.push('Missing <h1> for special heading check');

      return errs;

    }

    const h1Text = h1.textContent.trim();

    if (!h1Text) {

      errs.push('H1 has empty text');

      return errs;

    }

    // First try to find the background text explicitly by class
    // Look within the special-h1-wrapper if it exists
    const wrapper = h1.closest('.special-h1-wrapper');
    let bgText = null;
    if (wrapper) {
      bgText = wrapper.querySelector('.special-h1-bg-text') || 
               wrapper.querySelector('[data-role="special-h1-background"]');
    }
    if (!bgText) {
      // Search from document root, but exclude head elements
      const candidates = document.querySelectorAll('.special-h1-bg-text, [data-role="special-h1-background"]');
      for (const candidate of candidates) {
        // Only consider elements in the body/main, not in head
        if (candidate.closest('head') === null && candidate.closest('main') !== null) {
          bgText = candidate;
          break;
        }
      }
    }
    
    // DEBUG: Log what we found
    console.log('[DEBUG] H1 text:', h1Text);
    console.log('[DEBUG] Found bgText:', bgText ? bgText.outerHTML.substring(0, 100) : 'null');
    if (bgText) {
      const bgStyle = getComputedStyle(bgText);
      console.log('[DEBUG] bgText font-size:', bgStyle.fontSize, 'color:', bgStyle.color);
    }
    
    // If we found bgText by class/data-role, use it directly
    // Otherwise, search for matching text elements but exclude TITLE and other head elements
    const allEls = bgText ? [bgText] : Array.from(document.querySelectorAll('*')).filter(
      (el) => {
        // Exclude head elements (TITLE, META, etc.)
        if (el.closest('head') !== null) return false;
        if (el.tagName === 'TITLE') return false;
        if (el === h1 || el.closest('h1') === h1) return false;
        if (el.nodeType !== 1) return false; // Only element nodes
        // Exclude navigation, breadcrumbs, etc.
        if (el.closest('nav') || el.closest('.breadcrumbs')) return false;
        // Only consider elements in main content area
        if (el.closest('main') === null && el.closest('[data-page]') === null) return false;
        const text = el.textContent.trim();
        return text === h1Text && text.length > 0;
      }
    );

    // DEBUG: Log all matching elements
    console.log('[DEBUG] All matching elements:', allEls.length);
    allEls.forEach((el, idx) => {
      const style = getComputedStyle(el);
      console.log(`[DEBUG] Element ${idx}:`, el.tagName, el.className, 'font-size:', style.fontSize, 'color:', style.color, 'text:', el.textContent.trim().substring(0, 30));
    });

    if (!allEls.length) {

      errs.push('Special heading: no oversized light-pink twin found for H1 text');

      return errs;

    }

    // Choose the largest font-size element as the "big" twin
    // Prefer elements with special-h1-bg-text class or data-role
    let twin = null;
    let twinSize = 0;

    for (const el of allEls) {
      const fs = parseFloat(getComputedStyle(el).fontSize || '0');
      // Prefer background text element by class or data-role
      const isBgText = el.classList.contains('special-h1-bg-text') || 
                       el.getAttribute('data-role') === 'special-h1-background';
      console.log('[DEBUG] Checking element:', el.tagName, 'font-size:', fs, 'isBgText:', isBgText);
      if (isBgText && fs > 0) {
        twin = el;
        twinSize = fs;
        console.log('[DEBUG] Selected bgText as twin, size:', twinSize);
        break; // Found the background text, use it
      }
      if (fs > twinSize) {
        twinSize = fs;
        twin = el;
        console.log('[DEBUG] New largest twin:', el.tagName, 'size:', twinSize);
      }
    }
    
    console.log('[DEBUG] Final twin:', twin ? twin.tagName : 'null', 'size:', twinSize);

    if (!twin) {

      errs.push('Special heading: could not identify a larger twin element');

      return errs;

    }

    const h1Size = parseFloat(getComputedStyle(h1).fontSize || '0');

    if (!(twinSize >= h1Size * 1.8)) {

      errs.push(

        `Special heading: oversized twin font-size not ~2× H1 (H1=${h1Size}, twin=${twinSize})`,

      );

    }

    const h1Color = getComputedStyle(h1).color;

    const twinColor = getComputedStyle(twin).color;

    if (h1Color === twinColor) {

      errs.push('Special heading: twin should use different (light pink) color than H1');

    }

    const h1Rect = h1.getBoundingClientRect();

    const twinRect = twin.getBoundingClientRect();

    const h1Center = h1Rect.left + h1Rect.width / 2;

    const twinCenter = twinRect.left + twinRect.width / 2;

    if (Math.abs(h1Center - twinCenter) > 4) {

      errs.push('Special heading: H1 and oversized twin not roughly center-aligned');

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkMissionDesktop(page, errors) {

  const path = PAGES.mission;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="mission"]') || document.body;

    // H1 text

    const h1 = root.querySelector('h1');

    if (!h1 || h1.textContent.trim() !== 'Our Mission') {

      errs.push('Mission page should have H1 text "Our Mission"');

    }

    // Mission body and Meet the Editor columns

    const missionBody =

      root.querySelector('[data-section="mission-body"]') ||

      root.querySelector('[data-role="mission-body"]');

    const editorSection =

      root.querySelector('[data-section="mission-editor"]') ||

      root.querySelector('[data-role="mission-editor"]');

    if (!missionBody) errs.push('Missing mission body section ([data-section="mission-body"])');

    if (!editorSection) errs.push('Missing "Meet the Editor" section wrapper');

    const h2Editor = root.querySelector('h2');

    if (!h2Editor || !/meet the editor/i.test(h2Editor.textContent)) {

      errs.push('Expected H2 "Meet The Editor" on mission page');

    }

    if (missionBody && editorSection) {

      const bodyRect = missionBody.getBoundingClientRect();

      const editorRect = editorSection.getBoundingClientRect();

      if (!(editorRect.left > bodyRect.left + bodyRect.width / 2)) {

        errs.push(

          'On desktop, mission body and Meet the Editor should form two columns (editor clearly to the right of mission body)',

        );

      }

      if (

        !(

          editorRect.top < editorRect.bottom &&

          bodyRect.top < editorRect.bottom

        )

      ) {

        errs.push('Mission columns should overlap vertically (not completely staggered)');

      }

    }

    const divider =

      root.querySelector('[data-role="mission-divider"]') ||

      root.querySelector('[data-role="slanted-divider"]');

    if (!divider) {

      errs.push('Missing slanted divider between mission body and editor section');

    } else {

      const style = getComputedStyle(divider);

      if (!style.transform || style.transform === 'none') {

        errs.push('Mission divider exists but does not appear slanted (no CSS transform applied)');

      }

    }

    const photo =

      root.querySelector('[data-role="mission-photo"]') ||

      root.querySelector('img[data-role="editor-photo"]');

    if (!photo) {

      errs.push('Mission page should have a centered editor picture below the columns');

    } else {

      const rect = photo.getBoundingClientRect();

      if (!(rect.width > 0 && rect.height > 0)) {

        errs.push('Mission editor photo has zero size');

      }

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkMissionMobile(page, errors) {

  const path = PAGES.mission;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="mission"]') || document.body;

    const missionBody =

      root.querySelector('[data-section="mission-body"]') ||

      root.querySelector('[data-role="mission-body"]');

    const editorSection =

      root.querySelector('[data-section="mission-editor"]') ||

      root.querySelector('[data-role="mission-editor"]');

    const photo =

      root.querySelector('[data-role="mission-photo"]') ||

      root.querySelector('img[data-role="editor-photo"]');

    if (missionBody && editorSection) {

      const bodyRect = missionBody.getBoundingClientRect();

      const editorRect = editorSection.getBoundingClientRect();

      if (!(bodyRect.top < editorRect.top)) {

        errs.push('On mobile, mission body should appear above Meet the Editor section');

      }

    }

    if (editorSection && photo) {

      const editorRect = editorSection.getBoundingClientRect();

      const photoRect = photo.getBoundingClientRect();

      if (!(photoRect.top > editorRect.top)) {

        errs.push('On mobile, mission photo should appear below both mission body and editor');

      }

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkReviewListDesktop(page, errors) {

  const path = PAGES.reviewListing;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate((brand) => {

    const errs = [];

    const root = document.querySelector('[data-page="review-list"]') || document.body;

    const strips =

      root.querySelectorAll('[data-kind="review-strip"]') ||

      root.querySelectorAll('.review-strip');

    if (!strips.length) {

      errs.push('No review strips found ([data-kind="review-strip"] or .review-strip)');

      return errs;

    }

    strips.forEach((strip, index) => {

      const style = getComputedStyle(strip);

      if (style.backgroundColor === 'rgba(0, 0, 0, 0)') {

        errs.push(`Strip ${index}: background is transparent, expected magazine white`);

      }

      // If you know brand pink, you can uncomment:

      // if (style.borderTopColor !== brand.brandPink) {

      //   errs.push(`Strip ${index}: border color is not brand pink`);

      // }

      const headline = strip.querySelector('[data-role="headline"], h2, h3');

      if (!headline) errs.push(`Strip ${index}: missing headline`);

      const meta = strip.querySelector('[data-role="meta"]');

      if (!meta) errs.push(`Strip ${index}: missing metadata block`);

      const excerpt = strip.querySelector('[data-role="excerpt"]');

      if (!excerpt) errs.push(`Strip ${index}: missing excerpt`);

      const art = strip.querySelector('[data-role="artwork"], img');

      if (!art) {

        errs.push(`Strip ${index}: missing album art image`);

      } else {

        const rect = art.getBoundingClientRect();

        if (!(rect.width > 0 && rect.height > 0)) {

          errs.push(`Strip ${index}: album art size is zero`);

        } else {

          const ratio = rect.width / rect.height;

          if (Math.abs(ratio - 1) > 0.05) {

            errs.push(`Strip ${index}: album art not roughly square (ratio=${ratio.toFixed(2)})`);

          }

        }

      }

      // Check left/right layout: text on left, image on right

      const textBlock =

        strip.querySelector('[data-role="text-block"]') ||

        strip.querySelector('[data-role="headline"]')?.parentElement;

      if (textBlock && art) {

        const textRect = textBlock.getBoundingClientRect();

        const artRect = art.getBoundingClientRect();

        if (!(artRect.left > textRect.left + textRect.width / 2)) {

          errs.push(

            `Strip ${index}: album art should be clearly on the right side of the text block`,

          );

        }

      }

    });

    return errs;

  }, BRAND);

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkReviewListMobile(page, errors) {

  const path = PAGES.reviewListing;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="review-list"]') || document.body;

    const strips =

      root.querySelectorAll('[data-kind="review-strip"]') ||

      root.querySelectorAll('.review-strip');

    strips.forEach((strip, index) => {

      const textBlock =

        strip.querySelector('[data-role="text-block"]') ||

        strip.querySelector('[data-role="headline"]')?.parentElement;

      const art = strip.querySelector('[data-role="artwork"], img');

      if (textBlock && art) {

        const textRect = textBlock.getBoundingClientRect();

        const artRect = art.getBoundingClientRect();

        if (!(textRect.top < artRect.top)) {

          errs.push(

            `Strip ${index}: on mobile, text block should appear above album art (stacked layout)`,

          );

        }

      }

    });

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkPodcastListDesktop(page, errors) {

  const path = PAGES.podcastListing;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate((brand) => {

    const errs = [];

    const root = document.querySelector('[data-page="podcast-list"]') || document.body;

    const strips =

      root.querySelectorAll('[data-kind="podcast-strip"]') ||

      root.querySelectorAll('.podcast-strip');

    if (!strips.length) {

      errs.push('No podcast strips found ([data-kind="podcast-strip"] or .podcast-strip)');

      return errs;

    }

    strips.forEach((strip, index) => {

      const headline = strip.querySelector('[data-role="headline"], h2, h3');

      if (!headline) errs.push(`Podcast strip ${index}: missing headline`);

      const meta = strip.querySelector('[data-role="meta"]');

      if (!meta) errs.push(`Podcast strip ${index}: missing metadata block`);

      const listenBtn =

        strip.querySelector('[data-role="listen-button"]') ||

        strip.querySelector('button, a');

      if (!listenBtn) {

        errs.push(`Podcast strip ${index}: missing "Listen now" button`);

      }

      const art = strip.querySelector('[data-role="artwork"], img');

      if (!art) {

        errs.push(`Podcast strip ${index}: missing square image`);

      } else {

        const rect = art.getBoundingClientRect();

        const ratio = rect.width / rect.height;

        if (Math.abs(ratio - 1) > 0.05) {

          errs.push(

            `Podcast strip ${index}: image not roughly square (ratio=${ratio.toFixed(2)})`,

          );

        }

      }

      const textBlock =

        strip.querySelector('[data-role="text-block"]') ||

        strip.querySelector('[data-role="headline"]')?.parentElement;

      if (textBlock && art) {

        const textRect = textBlock.getBoundingClientRect();

        const artRect = art.getBoundingClientRect();

        if (!(artRect.left > textRect.left + textRect.width / 2)) {

          errs.push(

            `Podcast strip ${index}: album art should be clearly on the right of text block`,

          );

        }

      }

    });

    return errs;

  }, BRAND);

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkPodcastListMobile(page, errors) {

  const path = PAGES.podcastListing;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="podcast-list"]') || document.body;

    const strips =

      root.querySelectorAll('[data-kind="podcast-strip"]') ||

      root.querySelectorAll('.podcast-strip');

    strips.forEach((strip, index) => {

      const textBlock =

        strip.querySelector('[data-role="text-block"]') ||

        strip.querySelector('[data-role="headline"]')?.parentElement;

      const art = strip.querySelector('[data-role="artwork"], img');

      if (textBlock && art) {

        const textRect = textBlock.getBoundingClientRect();

        const artRect = art.getBoundingClientRect();

        if (!(textRect.top < artRect.top)) {

          errs.push(

            `Podcast strip ${index}: on mobile, text block should appear above image (stacked layout)`,

          );

        }

      }

    });

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkReviewEntryDesktop(page, errors) {

  const path = PAGES.reviewEntry;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="review-entry"]') || document.body;

    // Narrower column than site container

    const siteContainer =

      document.querySelector('[data-site-container]') ||

      document.querySelector('.site-container');

    const entryColumn =

      root.querySelector('[data-role="entry-column"]') ||

      root.querySelector('[data-role="review-body"]') ||

      root.querySelector('article');

    if (siteContainer && entryColumn) {

      const cRect = siteContainer.getBoundingClientRect();

      const eRect = entryColumn.getBoundingClientRect();

      if (!(eRect.width < cRect.width)) {

        errs.push('Review entry: main column should be narrower than site container (page feel)');

      }

    } else {

      errs.push('Review entry: missing site container or entry column to check margin inset');

    }

    // Header alignment: headline/meta/share vs album art

    const header = root.querySelector('[data-role="entry-header"]') || root;

    // Search for elements: first within header, then fallback to root
    const headline =

      header.querySelector('[data-role="headline"]') || 
      header.querySelector('h1') ||
      root.querySelector('[data-role="headline"]') ||
      root.querySelector('h1');

    const meta = header.querySelector('[data-role="meta"]') ||
                 root.querySelector('[data-role="meta"]');

    const shareChips = header.querySelector('[data-role="share-chips"]') ||
                      root.querySelector('[data-role="share-chips"]');

    const albumArt =

      header.querySelector('[data-role="album-art"]') ||

      header.querySelector('img[data-role="album-art"]') ||
      root.querySelector('[data-role="album-art"]') ||
      root.querySelector('img[data-role="album-art"]');

    if (!headline) errs.push('Review entry: missing headline in header');

    if (!meta) errs.push('Review entry: missing meta data in header');

    if (!shareChips) errs.push('Review entry: missing share chips row');

    // Album art is conditional - only check if it should exist
    // We can't easily check if review.cover exists from here, so we'll check if header exists
    // and assume album art should be present for the test review
    if (!albumArt) errs.push('Review entry: missing album art in header');

    if (headline && albumArt) {

      const hRect = headline.getBoundingClientRect();

      const aRect = albumArt.getBoundingClientRect();

      if (Math.abs(hRect.top - aRect.top) > 4) {

        errs.push('Review entry: headline and album art tops should share same baseline');

      }

    }

    if (shareChips && albumArt) {

      const sRect = shareChips.getBoundingClientRect();

      const aRect = albumArt.getBoundingClientRect();

      if (Math.abs(sRect.bottom - aRect.bottom) > 4) {

        errs.push('Review entry: share chips bottom should align with album art bottom');

      }

    }

    // Pull quote

    const pullQuote =

      root.querySelector('[data-role="pull-quote"]') ||

      root.querySelector('.pull-quote');

    if (!pullQuote) {

      errs.push('Review entry: missing styled pull quote under header');

    }

    // Tracklist + streaming row

    const tracklist =

      root.querySelector('[data-role="tracklist-panel"]') ||

      root.querySelector('.review-trackbox');

    if (!tracklist) {

      errs.push('Review entry: missing tracklist panel near the end');

    }

    const streamingRow =

      root.querySelector('[data-role="streaming-row"]') ||

      root.querySelector('.stream-links');

    if (!streamingRow) {

      errs.push('Review entry: missing streaming chips row below tracklist');

    } else if (tracklist) {

      const tRect = tracklist.getBoundingClientRect();

      const sRect = streamingRow.getBoundingClientRect();

      if (!(sRect.top > tRect.top)) {

        errs.push('Review entry: streaming row should appear below tracklist panel');

      }

    }

    const chips =

      streamingRow?.querySelectorAll('[data-role="stream-chip"], .stream-logo') || [];

    if (!chips.length) {

      errs.push('Review entry: streaming row should contain platform chips/buttons');

    }

    // Image sizes S/M/L (basic presence check)

    const imgs = root.querySelectorAll('article img, [data-role="review-body"] img');

    if (!imgs.length) {

      errs.push('Review entry: expected inline images in body for size S/M/L checks');

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkReviewEntryMobile(page, errors) {

  const path = PAGES.reviewEntry;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="review-entry"]') || document.body;

    const header = root.querySelector('[data-role="entry-header"]') || root;

    const headline =

      header.querySelector('[data-role="headline"]') || header.querySelector('h1');

    const albumArt =

      header.querySelector('[data-role="album-art"]') ||

      header.querySelector('img[data-role="album-art"]');

    if (headline && albumArt) {

      const hRect = headline.getBoundingClientRect();

      const aRect = albumArt.getBoundingClientRect();

      if (!(hRect.top < aRect.top || Math.abs(hRect.top - aRect.top) < 4)) {

        errs.push(

          'Review entry (mobile): headline should not sit visually below album art in header stack',

        );

      }

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkPodcastEntryDesktop(page, errors) {

  const path = PAGES.podcastEntry;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="podcast-entry"]') || document.body;

    const siteContainer =

      document.querySelector('[data-site-container]') ||

      document.querySelector('.site-container');

    const entryColumn =

      root.querySelector('[data-role="entry-column"]') ||

      root.querySelector('[data-role="podcast-body"]') ||

      root.querySelector('article');

    if (siteContainer && entryColumn) {

      const cRect = siteContainer.getBoundingClientRect();

      const eRect = entryColumn.getBoundingClientRect();

      if (!(eRect.width < cRect.width)) {

        errs.push('Podcast entry: main column should be narrower than site container (page feel)');

      }

    }

    const header = root.querySelector('[data-role="entry-header"]') || root;

    // Search for elements: first within header, then fallback to root
    const headline =

      header.querySelector('[data-role="headline"]') || 
      header.querySelector('h1') ||
      root.querySelector('[data-role="headline"]') ||
      root.querySelector('h1');

    const meta = header.querySelector('[data-role="meta"]') ||
                 root.querySelector('[data-role="meta"]');

    const shareChips = header.querySelector('[data-role="share-chips"]') ||
                      root.querySelector('[data-role="share-chips"]');

    if (!headline) errs.push('Podcast entry: missing headline');

    if (!meta) errs.push('Podcast entry: missing meta data under headline');

    if (!shareChips) errs.push('Podcast entry: missing share chips row');

    const player =

      root.querySelector('[data-role="episode-player"]') ||

      root.querySelector('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');

    if (!player) {

      errs.push('Podcast entry: missing YouTube embed player below header');

    }

    const aboutSection =

      root.querySelector('[data-section="about-artist"]') ||

      Array.from(root.querySelectorAll('h2')).find((h2) =>

        /about the artist/i.test(h2.textContent),

      )?.parentElement;

    if (!aboutSection) {

      errs.push('Podcast entry: missing "About the Artist" section');

    }

    const whereSection =

      root.querySelector('[data-section="where-to-find"]') ||

      Array.from(root.querySelectorAll('h2')).find((h2) =>

        /where to find/i.test(h2.textContent),

      )?.parentElement;

    if (!whereSection) {

      errs.push('Podcast entry: missing "Where to Find Them" section');

    }

    if (aboutSection && whereSection) {

      const aRect = aboutSection.getBoundingClientRect();

      const wRect = whereSection.getBoundingClientRect();

      if (!(wRect.top > aRect.top)) {

        errs.push('"Where to Find Them" should appear below "About the Artist"');

      }

    }

    const socialChips =

      whereSection?.querySelectorAll('[data-role="social-chip"]') ||

      whereSection?.querySelectorAll('a, button') ||

      [];

    if (!socialChips || !socialChips.length) {

      errs.push('Podcast entry: "Where to Find Them" should contain social link chips/buttons');

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function checkPodcastEntryMobile(page, errors) {

  const path = PAGES.podcastEntry;

    await page.goto(BASE_URL + path, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('main', { timeout: 15000 }).catch(() => {});
  // Wait for React hydration - check for actual content, not loading states
  const currentPath = path;
  await page.waitForFunction((p) => {
    const main = document.querySelector('main');
    if (!main) return false;
    // Check that we're not seeing loading skeletons
    const hasLoadingSkeleton = main.querySelector('.animate-pulse') !== null;
    if (hasLoadingSkeleton) return false;
    // For entry pages, wait for specific elements
    if (p.includes('/reviews/') && !p.endsWith('/reviews')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    if (p.includes('/podcast/') && !p.endsWith('/podcast')) {
      const hasEntryColumn = main.querySelector('[data-role="entry-column"]') !== null;
      const hasHeader = main.querySelector('[data-role="entry-header"]') !== null;
      return hasEntryColumn && hasHeader;
    }
    // Wait for either strips (client components) or H1s (server components)
    const hasStrips = main.querySelectorAll('[data-kind="review-strip"], [data-kind="podcast-strip"]').length > 0;
    const hasH1 = main.querySelector('h1') !== null;
    const hasContent = main.textContent.trim().length > 100; // Has some content
    // For listing pages with client components, wait for them to render
    if (p.includes('/reviews') || p.includes('/podcast')) {
      return hasContent && (hasStrips || main.querySelectorAll('article').length > 0);
    }
    // For server-rendered pages, just check for content
    return hasContent && (hasH1 || main.querySelector('p') !== null);
  }, { timeout: 30000, polling: 500 }, currentPath).catch(() => {});
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pageErrors = await page.evaluate(() => {

    const errs = [];

    const root = document.querySelector('[data-page="podcast-entry"]') || document.body;

    const header = root.querySelector('[data-role="entry-header"]') || root;

    const player =

      root.querySelector('[data-role="episode-player"]') ||

      root.querySelector('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');

    if (header && player) {

      const hRect = header.getBoundingClientRect();

      const pRect = player.getBoundingClientRect();

      if (!(pRect.top > hRect.top)) {

        errs.push('Podcast entry (mobile): YouTube player should appear below header block');

      }

    }

    return errs;

  });

  pageErrors.forEach((msg) => errors.push(fmt(path, msg)));

}

async function main() {

  const browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();
  
  // Wait for React to hydrate
  await page.evaluateOnNewDocument(() => {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        setTimeout(resolve, 5000);
      } else {
        window.addEventListener('load', () => setTimeout(resolve, 5000));
      }
    });
  });

  const errors = [];

  // DESKTOP RUN

  await page.setViewport(DESKTOP_VIEWPORT);

  // Global container consistency on key pages

  await checkContainerWidths(

    page,

    [PAGES.home, PAGES.mission, PAGES.reviewListing, PAGES.podcastListing, PAGES.reviewEntry, PAGES.podcastEntry],

    errors,

  );

  // Global text rules

  for (const path of [

    PAGES.mission,

    PAGES.reviewListing,

    PAGES.podcastListing,

    PAGES.reviewEntry,

    PAGES.podcastEntry,

  ]) {

    await checkGlobalTextRules(page, path, errors);

  }

  // Special H1 on all non-home pages

  for (const path of [

    PAGES.mission,

    PAGES.reviewListing,

    PAGES.podcastListing,

    PAGES.reviewEntry,

    PAGES.podcastEntry,

  ]) {

    await checkSpecialH1(page, path, errors);

  }

  await checkMissionDesktop(page, errors);

  await checkReviewListDesktop(page, errors);

  await checkPodcastListDesktop(page, errors);

  await checkReviewEntryDesktop(page, errors);

  await checkPodcastEntryDesktop(page, errors);

  // MOBILE RUN

  await page.setViewport(MOBILE_VIEWPORT);

  await checkMissionMobile(page, errors);

  await checkReviewListMobile(page, errors);

  await checkPodcastListMobile(page, errors);

  await checkReviewEntryMobile(page, errors);

  await checkPodcastEntryMobile(page, errors);

  if (errors.length) {

    console.error('❌ Behind the Beat layout checks FAILED:\n');

    for (const e of errors) console.error(' - ' + e);

    await browser.close();

    process.exit(1);

  } else {

    console.log('✅ All Behind the Beat layout checks PASSED.');

    await browser.close();

  }

}

main().catch((err) => {

  console.error('Puppeteer run errored:', err);

  process.exit(1);

});

