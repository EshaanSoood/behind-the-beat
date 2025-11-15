// home-feed-acceptance-all.mjs
// Run: node home-feed-acceptance-all.mjs https://your-site/
// Requires: puppeteer (^22+)

import puppeteer from 'puppeteer';

const TARGET = process.argv[2] || process.env.TARGET_URL || 'http://localhost:3000';

const VIEWPORTS = {
  desktop: { width: 1280, height: 900, deviceScaleFactor: 1 },
  tablet: { width: 834, height: 1112, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 1 },
};

const PINK_HEX = '#ffc3d9'; // liberal token checks (tolerant)
const PURPLE_HEX = '#5a2a82';

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function srgbToLin(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function contrast(hex1, hex2) {
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  const L1 = 0.2126 * srgbToLin(a.r) + 0.7152 * srgbToLin(a.g) + 0.0722 * srgbToLin(a.b);
  const L2 = 0.2126 * srgbToLin(b.r) + 0.7152 * srgbToLin(b.g) + 0.0722 * srgbToLin(b.b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

const fails = [];

function expect(cond, msg) {
  if (!cond) fails.push(msg);
}

async function withVP(page, vp, fn) {
  await page.setViewport(vp);
  await page.goto(TARGET, { waitUntil: 'networkidle2' });
  return fn();
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: null });
  const page = await browser.newPage();

  // ─────────────────────────────────────────────────────────────
  // DESKTOP CHECKS
  // ─────────────────────────────────────────────────────────────

  await withVP(page, VIEWPORTS.desktop, async () => {
    // 0) Skip link visible/focusable (optional quick AX sanity)
    await page.keyboard.press('Tab'); // should land on Skip to content
    const skipVisible = await page.evaluate(() => {
      const el = document.querySelector('a[href^="#"],a.skip-to-content,[data-skip]');
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && style.outlineStyle !== 'none';
    });
    expect(skipVisible, 'Skip link not focusable/visible on first tab');

    // 1) Global gutters: header, hero, latest, newsletter, footer share same inline start
    const gutterOK = await page.evaluate(() => {
      const blocks = [
        document.querySelector('header'),
        document.querySelector('[data-hero], .HomeHero, section[aria-labelledby*="hero"]'),
        document.querySelector('h2, [data-latest]')?.closest('section, div, main') ?? null,
        document.querySelector('[data-newsletter], .Newsletter'),
        document.querySelector('footer'),
      ].filter(Boolean);
      if (blocks.length < 3) return false;
      const xs = blocks.map((el) => el.getBoundingClientRect().left.toFixed(2));
      return xs.every((x) => x === xs[0]);
    });
    expect(gutterOK, 'Global gutters not aligned across major sections');

    // 2) Header composition: nav bar visually flows from logo block + angled dividers exist
    const headerOK = await page.evaluate(() => {
      const logoBlock = document.querySelector('[data-logo-block], .logo-block, header [data-logo], header .logo');
      const nav = document.querySelector('header nav');
      if (!logoBlock || !nav) return false;
      const lb = logoBlock.getBoundingClientRect();
      const nb = nav.getBoundingClientRect();
      const touch = Math.abs(lb.right - nb.left) <= 2; // abut
      const angled = !!nav.querySelector('[data-divider="angled"], .nav-divider-angled, .divider-angled');
      return touch && angled;
    });
    expect(headerOK, 'Header: nav bar does not visually emerge from logo block or angled dividers missing');

    // NEW — Nav must visually grow out of the logo block: abut, aligned top/height, no visible seam
    const logoNavJoinOK = await page.evaluate(() => {
      const logoBlock = document
        .querySelector('[data-logo-block], .logo-block, header [data-logo], header .logo')
        ?.closest('[data-logo-block], .logo-block, header [data-logo], header .logo');
      const nav = document.querySelector('header nav');
      if (!logoBlock || !nav) return false;
      const lb = logoBlock.getBoundingClientRect();
      const nb = nav.getBoundingClientRect();
      const abutX = Math.abs(lb.right - nb.left) <= 1;
      const topAligned = Math.abs(lb.top - nb.top) <= 1;
      const heightAligned = Math.abs(lb.height - nb.height) <= 1;
      const el = document.elementFromPoint(
        Math.min(lb.right, nb.left) + 0.5,
        nb.top + Math.min(nb.height * 0.5, 20),
      );
      const seamOK = !!(el && (el === nav || nav.contains(el)));
      return abutX && topAligned && heightAligned && seamOK;
    });
    expect(
      logoNavJoinOK,
      'Logo block and nav do not perfectly abut/align — they must share edge, top, height, and show no seam',
    );

    // NEW — Angled dividers must be visible (non-zero size, opacity, and rotated/angled)
    const angledDividersVisible = await page.evaluate(() => {
      const divs = [
        ...document.querySelectorAll(
          'header nav [data-divider="angled"], header nav .nav-divider-angled, header nav .divider-angled',
        ),
      ];
      if (divs.length === 0) return false;
      return divs.every((d) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        const visible =
          r.width > 4 && r.height > 1 && parseFloat(cs.opacity) > 0.95 && cs.display !== 'none' && cs.visibility !== 'hidden';
        const isTransformed = cs.transform && cs.transform !== 'none';
        const isSkewedBg =
          /linear-gradient/i.test(cs.backgroundImage) || /skew|rotate/i.test((d.getAttribute('style') || ''));
        return visible && (isTransformed || isSkewedBg);
      });
    });
    expect(angledDividersVisible, 'Nav angled dividers exist but are not visibly rendered (width/opacity/transform)');

    // 3) NAV active style (no pill)
    const noPill = await page.evaluate(() => {
      const active = document.querySelector('header nav [aria-current], header nav .is-active');
      if (!active) return true;
      const br = getComputedStyle(active).borderRadius;
      return br === '0px';
    });
    expect(noPill, 'Nav active state uses a rounded pill; should use underline trapezoid');

    // NEW — Nav container must not be rounded; require chamfer/clip-path
    const navContainerShapeOK = await page.evaluate(() => {
      const nav = document.querySelector('header nav');
      if (!nav) return false;
      const cs = getComputedStyle(nav);
      const noRound = cs.borderRadius === '0px';
      const hasChamferClass = nav.className.toLowerCase().includes('chamfer');
      const clip = cs.clipPath && cs.clipPath !== 'none';
      return noRound && (hasChamferClass || clip);
    });
    expect(
      navContainerShapeOK,
      'Nav container is rounded/capsule — needs chamfer/clip-path on the container',
    );

    // 4) “Latest posts” heading present under hero
    const latestPresent = await page.evaluate(
      () => !![...document.querySelectorAll('h2,h3')].find((h) => /latest\s+posts/i.test(h.textContent || '')),
    );
    expect(latestPresent, '“Latest posts” heading missing');

    // 5) Grid: 3 columns on desktop
    const desktopColsOK = await page.evaluate(() => {
      const grid = document.querySelector('[data-card-grid], .CardGrid, main [role="list"], .cards');
      if (!grid) return false;
      const styles = getComputedStyle(grid);
      // Works for CSS grid or flex wrap; fall back to measuring first row
      const template = styles.gridTemplateColumns;
      if (template && template.split(' ').length >= 3) return true;
      // fallback: count items in first row
      const items = [...grid.children].filter((c) => c.getBoundingClientRect().height > 0);
      if (items.length < 3) return false;
      const y = items[0].getBoundingClientRect().top;
      return items.slice(0, 3).every((i) => Math.abs(i.getBoundingClientRect().top - y) < 2);
    });
    expect(desktopColsOK, 'Desktop grid is not 3 columns');

    // 6) Card container aspect 4:5, media 1:1; no border-radius; subtle shadow present
    const cardAspectOK = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.ReviewCard, .PodcastCard, [data-card]')];
      if (cards.length === 0) return false;
      let ok = true;
      let sawShadow = false;
      for (const c of cards.slice(0, 6)) {
        const r = c.getBoundingClientRect();
        const ratio = r.width / r.height;
        if (Math.abs(ratio - 0.8) > 0.06) ok = false;
        const br = getComputedStyle(c).borderRadius;
        if (br !== '0px') ok = false;
        const sh = getComputedStyle(c).boxShadow;
        if (sh && sh !== 'none') sawShadow = true;
        const media = c.querySelector('img, [role="img"], .media, .thumb');
        if (media) {
          const m = media.getBoundingClientRect();
          const mratio = m.width / m.height;
          if (Math.abs(mratio - 1.0) > 0.04) ok = false;
        } else ok = false;
      }
      return ok && sawShadow;
    });
    expect(cardAspectOK, 'Cards: need 4:5 container, 1:1 media, no rounded corners, and a subtle shadow');

    // NEW — Card CONTAINER must be chamfered (clip-path or chamfer utility), not square
    const cardContainerChamferOK = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.ReviewCard, .PodcastCard, [data-card]')].slice(0, 6);
      if (cards.length === 0) return true;
      return cards.every((c) => {
        const cs = getComputedStyle(c);
        const noRound = cs.borderRadius === '0px';
        const hasChamferClass = (c.className || '').toLowerCase().includes('chamfer');
        const clip = cs.clipPath && cs.clipPath !== 'none';
        return noRound && (hasChamferClass || clip);
      });
    });
    expect(cardContainerChamferOK, 'Card containers are square — apply chamfer (clip-path or chamfer utility) to the container');

    // NEW — First row equal heights (±2px)
    const firstRowEqualHeights = await page.evaluate(() => {
      const grid = document.querySelector('[data-card-grid], .CardGrid, main [role="list"], .cards');
      if (!grid) return true;
      const items = [...grid.children].filter((el) => el.getBoundingClientRect().height > 0);
      if (items.length < 3) return true;
      const y = items[0].getBoundingClientRect().top;
      const row = items.filter((i) => Math.abs(i.getBoundingClientRect().top - y) < 2);
      if (row.length < 3) return true;
      const hs = row.map((i) => i.getBoundingClientRect().height);
      const min = Math.min(...hs);
      const max = Math.max(...hs);
      return max - min <= 2;
    });
    expect(firstRowEqualHeights, 'First row card heights are uneven — lock equal heights within ±2px');

    // 7) Type borders (Reviews = pink, Podcasts = purple)
    const typeBordersOK = await page.evaluate(
      (PINK_HEX, PURPLE_HEX) => {
        const near = (a, b) => a.toLowerCase() === b.toLowerCase();
        const reviews = [...document.querySelectorAll('.ReviewCard,[data-type="review"]')];
        const podcasts = [...document.querySelectorAll('.PodcastCard,[data-type="podcast"]')];
        const okR = reviews.length === 0 || reviews.every((el) => near(getComputedStyle(el).borderColor, PINK_HEX));
        const okP =
          podcasts.length === 0 || podcasts.every((el) => near(getComputedStyle(el).borderColor, PURPLE_HEX));
        return okR && okP;
      },
      PINK_HEX,
      PURPLE_HEX,
    );
    expect(typeBordersOK, 'Type borders not applied (Reviews=pink, Podcasts=purple)');

    // 8) Overlay no layout shift & CTA present/stable
    const overlayOK = await page.evaluate(async () => {
      const c = document.querySelector('.ReviewCard,[data-type="review"]');
      if (!c) return true;
      const media = c.querySelector('img, .media, .thumb');
      const cta = c.querySelector('a,button,[role="button"]');
      if (!media || !cta) return false;
      const before = c.getBoundingClientRect().height;
      c.classList.add('force-hover'); // let CSS hook it (or simulate)
      const after = c.getBoundingClientRect().height;
      return Math.abs(before - after) < 2 && !!cta.getBoundingClientRect().height;
    });
    expect(overlayOK, 'Review overlay causes layout shift or CTA not fixed/visible');

    // 9) Podcast rules: static thumbnail (no iframe) + alignment with review media/pull-quote bottoms
    const podcastOK = await page.evaluate(() => {
      const p = document.querySelector('.PodcastCard,[data-type="podcast"]');
      const r = document.querySelector('.ReviewCard,[data-type="review"]');
      if (!p || !r) return true;
      if (p.querySelector('iframe')) return false;
      const pImg = p.querySelector('img, .thumb');
      const rImg = r.querySelector('img, .thumb');
      if (!pImg || !rImg) return false;
      const pt = pImg.getBoundingClientRect().top;
      const rt = rImg.getBoundingClientRect().top;
      const pQuote = p.querySelector('[data-pull], .pull, .excerpt');
      const rImgB = rImg.getBoundingClientRect().bottom;
      const pQB = pQuote ? pQuote.getBoundingClientRect().bottom : pImg.getBoundingClientRect().bottom;
      return Math.abs(pt - rt) < 2 && Math.abs(pQB - rImgB) < 2;
    });
    expect(podcastOK, 'Podcast: must use static thumbnail and align with review media top/bottom');

    // NEW — Podcast vs Review alignment: top of media equal; bottom of podcast pull-quote == bottom of review image
    const crossTileAlignmentOK = await page.evaluate(() => {
      const p = document.querySelector('.PodcastCard,[data-type="podcast"]');
      const r = document.querySelector('.ReviewCard,[data-type="review"]');
      if (!p || !r) return true;
      const pImg = p.querySelector('img, .thumb, .media');
      const rImg = r.querySelector('img, .thumb, .media');
      if (!pImg || !rImg) return true;
      const pQ = p.querySelector('[data-pull], .pull, .excerpt');
      const topOK = Math.abs(pImg.getBoundingClientRect().top - rImg.getBoundingClientRect().top) <= 2;
      const pBottom = pQ ? pQ.getBoundingClientRect().bottom : pImg.getBoundingClientRect().bottom;
      const rBottom = rImg.getBoundingClientRect().bottom;
      const bottomOK = Math.abs(pBottom - rBottom) <= 2;
      return topOK && bottomOK;
    });
    expect(
      crossTileAlignmentOK,
      'Podcast/Review baselines misaligned — align media tops and pull-quote bottom to review image bottom (±2px)',
    );

    // 10) Feed membership + chronological order
    const feedOK = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.ReviewCard,.PodcastCard,[data-card]')];
      if (cards.length < 3) return false;
      const okTypes = cards.every((c) => /review|podcast/i.test((c.dataset.type || '') + c.className));
      const dates = cards
        .map((c) => {
          const t = c.querySelector('time,[datetime],[data-date]');
          if (!t) return null;
          const v = t.getAttribute('datetime') || t.textContent || '';
          return new Date(v);
        })
        .filter(Boolean);
      if (dates.length < 3) return false;
      for (let i = 1; i < dates.length; i += 1) {
        if (!(dates[i - 1] >= dates[i])) return false; // descending
      }
      return okTypes;
    });
    expect(feedOK, 'Feed must be only Reviews+Podcasts and sorted newest→oldest');

    // 11) Newsletter present & footer present; share gutters (already checked) and focusable
    const nlFooterOK = await page.evaluate(() => {
      const nl = document.querySelector('[data-newsletter], .Newsletter, section[aria-label*="newsletter" i]');
      const ft = document.querySelector('footer');
      if (!nl || !ft) return false;
      const f = nl.querySelector('input,button,[role="button"],a');
      return !!f;
    });
    expect(nlFooterOK, 'Newsletter/Footer presence or focusable control missing');

    // 12) Accessibility landmarks & heading order (H1 then section heading)
    const a11yOK = await page.evaluate(() => {
      const header = document.querySelector('header');
      const main = document.querySelector('main,[role="main"]');
      const footer = document.querySelector('footer');
      const h1 = document.querySelector('h1');
      const latest = [...document.querySelectorAll('h2,h3')].find((h) =>
        /latest\s+posts/i.test(h.textContent || ''),
      );
      return !!(header && main && footer && h1 && latest);
    });
    expect(a11yOK, 'Landmarks/heading order incomplete (need header/main/footer, H1, and “Latest posts”)');

    // 13) Focus visible on card link
    const focusOK = await page.evaluate(() => {
      const link = document.querySelector('[data-card] a, .ReviewCard a, .PodcastCard a');
      if (!link) return true;
      link.focus();
      const st = getComputedStyle(link);
      return st.outlineStyle !== 'none' || parseFloat(st.outlineWidth) > 0;
    });
    expect(focusOK, 'Focus not visibly indicated on primary card link');

    // 14) Contrast (approximate): meta text vs card background
    const contrastOK = await page.evaluate(() => {
      const getHex = (rgb) => {
        const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (!m) return '#000000';
        const [r, g, b] = [m[1], m[2], m[3]].map(Number);
        return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
      };
      const card = document.querySelector('[data-card], .ReviewCard, .PodcastCard');
      if (!card) return true;
      const txt = card.querySelector('.meta,[data-meta], time');
      if (!txt) return true;
      const cs = getComputedStyle(txt);
      const bg = getComputedStyle(card).backgroundColor;
      return { fg: getHex(cs.color), bg: getHex(bg) };
    });
    if (typeof contrastOK === 'object') {
      const ratio = contrast(contrastOK.fg, contrastOK.bg);
      expect(ratio >= 4.5, `Meta text contrast too low (${ratio.toFixed(2)}:1)`);
    }

    // 15) Performance hygiene: no iframes in grid; images reserve space + lazy below the fold
    const perfOK = await page.evaluate(() => {
      const grid = document.querySelector('[data-card-grid], .CardGrid, .cards');
      if (!grid) return false;
      if (grid.querySelector('iframe')) return false;
      const imgs = [...grid.querySelectorAll('img')];
      const sized = imgs.every((i) => i.getAttribute('width') && i.getAttribute('height'));
      const lazy = imgs.slice(3).every((i) => i.loading === 'lazy'); // below first row
      return sized && lazy;
    });
    expect(perfOK, 'Grid performance: iframes present or images missing width/height/lazy');

    // 16) **Logo PNG transparency + no background behind it**
    const logoTransparencyOK = await page.evaluate(async () => {
      const img = document.querySelector(
        'header [data-logo] img, header .logo img, header img[alt*="Behind the Beat" i]',
      );
      if (!img) return false;
      // Check computed backgrounds on img and its container
      const containers = [img, img.parentElement, img.closest('[data-logo-block], .logo-block, header')];
      if (containers.some((n) => !n)) return false;
      const bgPainted = containers.some((n) => {
        const cs = getComputedStyle(n);
        const hasBgImage = cs.backgroundImage && cs.backgroundImage !== 'none';
        const hasBgColor =
          cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent';
        return hasBgImage || hasBgColor;
      });
      if (bgPainted) return false;
      // Pixel alpha sampling from corners to ensure actual transparency
      const src = img.currentSrc || img.src;
      if (!src) return false;
      const picture = await new Promise((resolve) => {
        const im = new Image();
        im.crossOrigin = 'anonymous';
        im.onload = () => resolve(im);
        im.onerror = () => resolve(null);
        im.src = src;
      });
      if (!picture) return false;
      const w = Math.max(4, Math.min(64, picture.naturalWidth));
      const h = Math.max(4, Math.min(64, picture.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(picture, 0, 0, w, h);
      const pts = [
        [1, 1],
        [w - 2, 1],
        [1, h - 2],
        [w - 2, h - 2],
        [Math.floor(w * 0.5), 1],
        [Math.floor(w * 0.5), h - 2],
      ];
      const transparentCorners = pts.every(([x, y]) => {
        const a = ctx.getImageData(x, y, 1, 1).data[3]; // alpha
        return a < 10; // near fully transparent
      });
      return transparentCorners;
    });
    expect(logoTransparencyOK, 'Logo file must have real transparent background and no background painted behind it');

    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    const angledDividersVisibleReduced = await page.evaluate(() => {
      const divs = [
        ...document.querySelectorAll(
          'header nav [data-divider="angled"], header nav .nav-divider-angled, header nav .divider-angled',
        ),
      ];
      if (divs.length === 0) return false;
      return divs.every((d) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        return (
          r.width > 4 &&
          r.height > 1 &&
          parseFloat(cs.opacity) > 0.95 &&
          cs.display !== 'none' &&
          cs.visibility !== 'hidden'
        );
      });
    });
    expect(angledDividersVisibleReduced, 'Reduced-motion hides or collapses angled dividers');
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  });

  // ─────────────────────────────────────────────────────────────
  // TABLET CHECKS
  // ─────────────────────────────────────────────────────────────

  await withVP(page, VIEWPORTS.tablet, async () => {
    const colsOK = await page.evaluate(() => {
      const grid = document.querySelector('[data-card-grid], .CardGrid, .cards');
      if (!grid) return false;
      const template = getComputedStyle(grid).gridTemplateColumns;
      if (template && template.split(' ').length >= 2 && template.split(' ').length <= 2) return true;
      // fallback: first row count
      const items = [...grid.children].filter((c) => c.getBoundingClientRect().height > 0);
      const y = items[0]?.getBoundingClientRect().top ?? 0;
      const firstRow = items.filter((i) => Math.abs(i.getBoundingClientRect().top - y) < 2);
      return firstRow.length === 2;
    });
    expect(colsOK, 'Tablet grid is not 2 columns');
  });

  // ─────────────────────────────────────────────────────────────
  // MOBILE CHECKS
  // ─────────────────────────────────────────────────────────────

  await withVP(page, VIEWPORTS.mobile, async () => {
    // 1) One column
    const oneCol = await page.evaluate(() => {
      const grid = document.querySelector('[data-card-grid], .CardGrid, .cards');
      if (!grid) return false;
      const template = getComputedStyle(grid).gridTemplateColumns;
      if (template && template.split(' ').length === 1) return true;
      // fallback: first row contains exactly 1 item
      const items = [...grid.children].filter((c) => c.getBoundingClientRect().height > 0);
      const y = items[0]?.getBoundingClientRect().top ?? 0;
      const firstRow = items.filter((i) => Math.abs(i.getBoundingClientRect().top - y) < 2);
      return firstRow.length === 1;
    });
    expect(oneCol, 'Mobile grid is not 1 column (~1 card per viewport)');

    // 2) Hero removed on mobile
    const heroGone = await page.evaluate(() => {
      const hero = document.querySelector('[data-hero], .HomeHero, section[aria-labelledby*="hero"]');
      if (!hero) return true;
      const st = getComputedStyle(hero);
      return st.display === 'none' || st.visibility === 'hidden' || hero.getBoundingClientRect().height === 0;
    });
    expect(heroGone, 'Hero should be removed/hidden on mobile');

    // 3) Header becomes logo + hamburger
    const burgerOK = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return false;
      const hasBurger = !!header.querySelector('button[aria-label*="menu" i], [data-hamburger], .hamburger');
      const navHidden = (() => {
        const nav = header.querySelector('nav');
        if (!nav) return true;
        const st = getComputedStyle(nav);
        return st.display === 'none' || st.visibility === 'hidden' || nav.getBoundingClientRect().height === 0;
      })();
      return hasBurger && navHidden;
    });
    expect(burgerOK, 'Mobile header should show hamburger and hide full nav');

    // 4) prefers-reduced-motion: hover/overlay has no long transitions
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    const reducedOK = await page.evaluate(() => {
      const card = document.querySelector('[data-card], .ReviewCard, .PodcastCard');
      if (!card) return true;
      const st = getComputedStyle(card);
      const dur = (st.transitionDuration || '0s')
        .split(',')
        .map((s) => parseFloat(s))
        .reduce((a, b) => Math.max(a, b), 0);
      return dur <= 0.2; // short or none
    });
    expect(reducedOK, 'Reduced-motion mode still uses long transitions on cards');
  });

  await browser.close();

  // ─────────────────────────────────────────────────────────────
  // REPORT
  // ─────────────────────────────────────────────────────────────

  if (fails.length) {
    console.error('\n❌ Home — Tech Spec Acceptance failures:');
    for (const f of fails) console.error(' -', f);
    process.exit(1);
  } else {
    console.log('✅ Home — Tech Spec Acceptance: all checks passed.');
    process.exit(0);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


