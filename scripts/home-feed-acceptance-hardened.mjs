import fs from "node:fs";
import puppeteer from "puppeteer";

const TARGET_URL = process.env.TARGET_URL ?? "http://localhost:3000/";
const VIEWPORTS = [
  { label: "desktop-1280", width: 1280, height: 832 },
  { label: "tablet-900", width: 900, height: 1024 },
  { label: "mobile-414", width: 414, height: 896 },
];

// HARDENED THRESHOLDS
const TOLERANCE_PX = 1; // Stricter: was 2
const ALIGN_TOLERANCE_PX = 1;
const SQUARE_TOLERANCE_PX = 1; // Stricter: was 2
const CTA_OPACITY_THRESHOLD = 0.99;
const OVERLAY_OPACITY_THRESHOLD = 0.8;
const GUTTER_VARIANCE_TOLERANCE_PX = 1; // Stricter: was 2
const HERO_GAP_MIN_PX = 14; // Updated for var(--space-4) = 16px
const HERO_GAP_MAX_PX = 18;
const FOCUS_ALPHA_THRESHOLD = 0.3;
const CHAMFER_SIZE_PX = 14; // Exact: var(--ch)
const CHAMFER_TOLERANCE_PX = 0.5;
const ASPECT_RATIO_TOLERANCE = 0.01; // 1% tolerance for 4:5 ratio
const MEDIA_SAMPLE_COUNT = 8;
const DEFAULT_CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CARD_ATTR = "data-home-card-acceptance";
const FOCUS_ATTR = "data-focus-probe";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function resolveChromeExecutable() {
  const requestedPath = process.env.CHROME_PATH;
  if (requestedPath && fs.existsSync(requestedPath)) {
    return requestedPath;
  }
  if (fs.existsSync(DEFAULT_CHROME_PATH)) {
    return DEFAULT_CHROME_PATH;
  }
  return undefined;
}

function withinTolerance(a, b, tolerance = TOLERANCE_PX) {
  if (a == null || b == null) return false;
  return Math.abs(a - b) <= tolerance;
}

function parseColor(value) {
  if (!value) return null;
  const color = value.trim();
  if (color.startsWith("oklab")) {
    const matches = color.match(/-?\d*\.?\d+/g);
    if (!matches || matches.length < 3) return null;
    const l = Number.parseFloat(matches[0]);
    const a = Number.parseFloat(matches[1]);
    const b = Number.parseFloat(matches[2]);
    const alpha = matches.length >= 4 ? Number.parseFloat(matches[3]) : 1;
    return { r: l, g: a, b: b, a: alpha, space: "oklab" };
  }
  if (color.startsWith("rgba") || color.startsWith("rgb")) {
    const matches = color.match(/[\d.]+/g);
    if (!matches || matches.length < 3) return null;
    const [r, g, b, a] = matches.map((num, index) =>
      index < 3 ? Number.parseFloat(num) : Number.parseFloat(num)
    );
    return {
      r,
      g,
      b,
      a: matches.length >= 4 ? a : 1,
    };
  }

  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    if (hex.length === 3) {
      const r = Number.parseInt(hex[0] + hex[0], 16);
      const g = Number.parseInt(hex[1] + hex[1], 16);
      const b = Number.parseInt(hex[2] + hex[2], 16);
      return { r, g, b, a: 1 };
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, a };
    }
  }

  return null;
}

function colorMostlyEqual(colorA, colorB) {
  if (!colorA || !colorB) return false;
  const componentTolerance = Math.max(
    Math.abs(colorA.r) <= 1 && Math.abs(colorB.r) <= 1 ? 0.02 : 5,
    Math.abs(colorA.g) <= 1 && Math.abs(colorB.g) <= 1 ? 0.02 : 5,
    Math.abs(colorA.b) <= 1 && Math.abs(colorB.b) <= 1 ? 0.02 : 5,
  );
  const dr = Math.abs(colorA.r - colorB.r);
  const dg = Math.abs(colorA.g - colorB.g);
  const db = Math.abs(colorA.b - colorB.b);
  const da = Math.abs((colorA.a ?? 1) - (colorB.a ?? 1));
  return dr <= componentTolerance && dg <= componentTolerance && db <= componentTolerance && da <= 0.25;
}

function approxEqual(a, b, tolerance = 0.5) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= tolerance;
}

function hasRoundedCorners(borderRadius) {
  if (!borderRadius) return false;
  const value = borderRadius.trim().toLowerCase();
  if (!value || value === "0" || value === "0px") return false;
  if (value.includes("999") || value.includes("50%") || value.includes("100%")) {
    return true;
  }
  const numericMatches = value.match(/-?\d+(\.\d+)?/g);
  if (!numericMatches) return false;
  return numericMatches.some((match) => Number.parseFloat(match) > CHAMFER_SIZE_PX + 0.5);
}

// NEW: Check if clip-path represents a chamfer
function hasChamferClipPath(clipPath) {
  if (!clipPath || clipPath === "none") return false;
  // Look for polygon - chamfered rectangle has 8 coordinate pairs
  const polygonMatch = clipPath.match(/polygon\(([^)]+)\)/);
  if (!polygonMatch) return false;
  // Count coordinate pairs (each point is "x y" separated by commas)
  const content = polygonMatch[1];
  // Split by comma and count non-empty parts
  const parts = content.split(",").filter(p => p.trim().length > 0);
  // Chamfered rectangle has 8 points, but some browsers may format differently
  // Just check that it's a polygon (exists) and has the chamfer keyword or multiple points
  return parts.length >= 8 || content.includes("calc");
}

// NEW: Extract chamfer size from clip-path
function extractChamferSize(clipPath) {
  if (!clipPath) return null;
  // Look for the first point's x-coordinate (should be the chamfer size)
  const match = clipPath.match(/polygon\(\s*([0-9.]+)px/);
  if (match) {
    return Number.parseFloat(match[1]);
  }
  return null;
}

function maxAlphaFromShadow(shadow) {
  if (!shadow) return null;
  const colorMatches = shadow.match(/(?:oklab|rgba?|hsla?)\([^)]*\)/g);
  if (!colorMatches) return null;
  let maxAlpha = 0;
  for (const color of colorMatches) {
    let alpha = 1;
    const slashMatch = color.match(/\/\s*([0-9.]+)/);
    if (slashMatch) {
      alpha = Number.parseFloat(slashMatch[1]);
    } else {
      const rgbaMatch = color.match(/rgba?\(([^)]+)\)/);
      if (rgbaMatch) {
        const parts = rgbaMatch[1].split(",").map((part) => part.trim());
        if (parts.length >= 4) {
          alpha = Number.parseFloat(parts[3]);
        }
      }
    }
    if (Number.isFinite(alpha)) {
      maxAlpha = Math.max(maxAlpha, alpha);
    }
  }
  return maxAlpha;
}

function rectsOverlap(rectA, rectB, tolerance = 0) {
  if (!rectA || !rectB) return false;
  const horizontal = Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left);
  const vertical = Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top);
  return horizontal > tolerance && vertical > tolerance;
}

function collectAXStrings(node, bucket = []) {
  if (!node) return bucket;
  if (typeof node.name === "string" && node.name.trim().length > 0) {
    bucket.push(node.name.trim());
  }
  if (typeof node.value === "string" && node.value.trim().length > 0) {
    bucket.push(node.value.trim());
  }
  if (node.description && node.description.trim().length > 0) {
    bucket.push(node.description.trim());
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      collectAXStrings(child, bucket);
    }
  }
  return bucket;
}

async function captureBaseMetrics(page) {
  return page.evaluate(
    ({ cardAttr, focusAttr }) => {
      const toRect = (element) => {
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
      };

      const heroHeading = document.querySelector("#home-hero-heading");
      const heroSection = document.querySelector(".home-hero-section");
      const headingContainer = document.querySelector(".home-section-heading");
      const sectionHeading = headingContainer?.querySelector("h2") ?? null;
      const grid = document.querySelector('[data-card-grid="true"]') || 
                   document.querySelector(".home-card-grid") ||
                   document.querySelector('[role="list"]');
      const container = document.querySelector(".container-page.home-feed-section");
      const cards = Array.from(document.querySelectorAll(".home-card"));
      const header = document.querySelector(".site-header");
      const logo = document.querySelector(".site-header__brand");
      const navShell = document.querySelector(".site-header__nav-shell");
      const navLinks = Array.from(document.querySelectorAll(".nav-link"));

      const resolveTokenColor = (variableName) => {
        const probe = document.createElement("div");
        probe.style.position = "fixed";
        probe.style.opacity = "0";
        probe.style.pointerEvents = "none";
        probe.style.border = `1px solid var(${variableName})`;
        document.body.appendChild(probe);
        const color = getComputedStyle(probe).borderTopColor;
        probe.remove();
        return color.trim();
      };

      const pinkOutline = resolveTokenColor("--pink-outline");
      const purpleOutline = resolveTokenColor("--purple-outline");

      // NEW: Capture nav divider angles
      // Note: getComputedStyle on ::before doesn't reliably return transform in headless
      // Instead, check if the pseudo-element exists by checking content property
      const navDividers = navLinks.map((link, index) => {
        const styles = getComputedStyle(link, "::before");
        const content = styles.content;
        const width = styles.width;
        const height = styles.height;
        
        // Pseudo-element exists if content is not "none"
        const hasPseudoElement = content && content !== "none";
        const hasExpectedSize = Number.parseFloat(width) >= 1 && Number.parseFloat(height) >= 20;
        
        return {
          index,
          hasPseudoElement,
          hasExpectedSize,
          width: Number.parseFloat(width),
          height: Number.parseFloat(height),
          visible: hasPseudoElement && hasExpectedSize && index > 0, // First link has no divider
        };
      });

      const cardData = cards.map((card, index) => {
        card.setAttribute(cardAttr, String(index));
        const cardSelector = `.home-card[${cardAttr}="${index}"]`;
        const styles = getComputedStyle(card);
        const media = card.querySelector(".home-card-media");
        const mediaStyles = media ? getComputedStyle(media) : null;
        const mediaImage = card.querySelector(".home-card-media-image");
        const mediaImageRect = mediaImage ? toRect(mediaImage) : null;
        const overlay = card.querySelector(".home-card-media-overlay");
        const overlayStyles = overlay ? getComputedStyle(overlay) : null;
        const overlayRect = overlay ? overlay.getBoundingClientRect() : null;
        const cta = card.querySelector(".card-actions .button-trapezoid");
        const ctaStyles = cta ? getComputedStyle(cta) : null;
        const ctaHasOffsetParent = Boolean(cta && cta.offsetParent);
        const copyWrapper = card.querySelector(".home-card-copy");
        const summary = card.querySelector(".home-card-text");
        const pullquote = card.querySelector(".home-card-pullquote");
        const title = card.querySelector(".home-card-title");
        const metaPrimary = card.querySelector(".home-card-meta-primary");

        const focusableSelectors = [
          "a[href]",
          "button",
          '[tabindex]:not([tabindex="-1"])',
          "input",
          "select",
          "textarea",
        ];
        const focusTargets = [];
        const focusableElements = focusableSelectors
          .map((selector) => Array.from(card.querySelectorAll(selector)))
          .flat()
          .filter((element, idx, arr) => element && arr.indexOf(element) === idx);
        for (const candidate of focusableElements) {
          if (!candidate || focusTargets.length >= 3) {
            break;
          }
          const attrValue = `card-${index}-${focusTargets.length}`;
          candidate.setAttribute(focusAttr, attrValue);
          focusTargets.push({
            selector: `[${focusAttr}="${attrValue}"]`,
            tagName: candidate.tagName.toLowerCase(),
            role: candidate.getAttribute("role"),
            rect: toRect(candidate),
            borderRadius: getComputedStyle(candidate).borderRadius ?? null,
          });
        }

        const overlayVisible =
          overlayStyles &&
          overlayStyles.display !== "none" &&
          overlayStyles.visibility !== "hidden" &&
          Number.parseFloat(overlayStyles.opacity) > 0.01;

        const ctaVisible =
          ctaStyles &&
          ctaStyles.display !== "none" &&
          ctaStyles.visibility !== "hidden" &&
          Number.parseFloat(ctaStyles.opacity) > 0.01;

        const cardType = card.classList.contains("home-card--podcast")
          ? "podcast"
          : card.classList.contains("home-card--review")
            ? "review"
            : "unknown";

        return {
          index,
          type: cardType,
          selector: cardSelector,
          focusTargets,
          rect: toRect(card),
          borderColor: styles.borderTopColor,
          borderWidth: Number.parseFloat(styles.borderTopWidth),
          clipPath: styles.clipPath,
          borderRadius: styles.borderRadius,
          boxShadow: styles.boxShadow,
          aspectRatio: styles.aspectRatio,
          titleRect: toRect(title),
          titleText: title?.textContent?.trim() ?? "",
          metaRect: toRect(metaPrimary),
          metaText: metaPrimary?.textContent?.trim() ?? "",
          metaStyles: metaPrimary ? {
            background: getComputedStyle(metaPrimary).background,
            border: getComputedStyle(metaPrimary).border,
            borderRadius: getComputedStyle(metaPrimary).borderRadius,
            boxShadow: getComputedStyle(metaPrimary).boxShadow,
          } : null,
          copyRect: toRect(copyWrapper),
          summary: {
            rect: toRect(summary),
            opacity: summary ? Number.parseFloat(getComputedStyle(summary).opacity) : null,
            text: summary?.textContent?.trim() ?? "",
          },
          pullQuote: pullquote
            ? {
                rect: toRect(pullquote),
                opacity: Number.parseFloat(getComputedStyle(pullquote).opacity),
                text: pullquote.textContent?.trim() ?? "",
                ariaHidden: pullquote.getAttribute("aria-hidden"),
              }
            : null,
          media: media
            ? {
                rect: toRect(media),
                borderColor: mediaStyles?.borderTopColor ?? null,
                borderWidth: mediaStyles ? Number.parseFloat(mediaStyles.borderTopWidth) : null,
                clipPath: mediaStyles?.clipPath ?? null,
                imageRect: mediaImageRect,
                imageFit: mediaImage ? getComputedStyle(mediaImage).objectFit : null,
              }
            : null,
          overlay: overlay
            ? {
                rect: overlayRect ? toRect(overlay) : null,
                clipPath: overlayStyles?.clipPath ?? null,
                visible: overlayVisible,
                pointerEvents: overlayStyles?.pointerEvents ?? null,
                area:
                  overlayRect && overlayRect.width != null && overlayRect.height != null
                    ? overlayRect.width * overlayRect.height
                    : null,
                opacity: overlayStyles ? Number.parseFloat(overlayStyles.opacity) : null,
              }
            : null,
          cta: cta
            ? {
                rect: toRect(cta),
                text: cta.textContent?.trim() ?? "",
                tagName: cta.tagName,
                href: cta.getAttribute("href"),
                role: cta.getAttribute("role"),
                clipPath: ctaStyles?.clipPath ?? null,
                borderRadius: ctaStyles?.borderRadius ?? null,
                visible: ctaVisible,
                opacity: ctaStyles ? Number.parseFloat(ctaStyles.opacity) : null,
                offsetParent: ctaHasOffsetParent,
              }
            : null,
        };
      });

      const heroRect = toRect(heroHeading);
      const heroSectionRect = toRect(heroSection ?? heroHeading);
      const headingRect = toRect(sectionHeading);
      const heroGap =
        heroSectionRect && headingRect ? headingRect.top - heroSectionRect.bottom : null;

      return {
        heroRect,
        heroSectionRect,
        headingRect,
        headingContainerRect: toRect(headingContainer ?? sectionHeading),
        firstCardRect: cardData[0]?.rect ?? null,
        secondCardRect: cardData[1]?.rect ?? null,
        gridRect: toRect(grid),
        gridColumnGap: grid ? Number.parseFloat(getComputedStyle(grid).columnGap) : null,
        gridRowGap: grid ? Number.parseFloat(getComputedStyle(grid).rowGap) : null,
        containerRect: toRect(container),
        containerPaddingLeft: container
          ? Number.parseFloat(getComputedStyle(container).paddingLeft)
          : null,
        header: header ? {
          rect: toRect(header),
          background: getComputedStyle(header).background,
        } : null,
        logo: logo ? {
          rect: toRect(logo),
          background: getComputedStyle(logo).background,
          boxShadow: getComputedStyle(logo).boxShadow,
        } : null,
        navShell: navShell ? {
          rect: toRect(navShell),
          background: getComputedStyle(navShell).background,
          boxShadow: getComputedStyle(navShell).boxShadow,
          clipPath: getComputedStyle(navShell).clipPath,
          transform: getComputedStyle(navShell).transform,
        } : null,
        navDividers,
        tokens: {
          pinkOutline,
          purpleOutline,
        },
        heroToHeadingGap: heroGap,
        cards: cardData,
      };
    },
    { cardAttr: CARD_ATTR, focusAttr: FOCUS_ATTR },
  );
}

async function getCardVisualState(page, cardSelector, focusSelector = null) {
  return page.evaluate(
    (cardSel, focusSel) => {
      const card = document.querySelector(cardSel);
      if (!card) return null;
      const focusTarget = focusSel ? document.querySelector(focusSel) : null;
      const pullQuote = card.querySelector(".home-card-pullquote");
      const summary = card.querySelector(".home-card-text");
      const cardStyles = getComputedStyle(card);
      const targetStyles = focusTarget ? getComputedStyle(focusTarget) : null;
      const activeMatches = focusTarget ? document.activeElement === focusTarget : false;

      const toRect = (element) => {
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
      };

      return {
        pullQuoteOpacity: pullQuote ? Number.parseFloat(getComputedStyle(pullQuote).opacity) : null,
        pullQuoteAriaHidden: pullQuote?.getAttribute("aria-hidden") ?? null,
        summaryOpacity: summary ? Number.parseFloat(getComputedStyle(summary).opacity) : null,
        cardBoxShadow: cardStyles.boxShadow,
        focusOutlineStyle: targetStyles?.outlineStyle ?? null,
        focusOutlineWidth: targetStyles?.outlineWidth ?? null,
        focusOutlineColor: targetStyles?.outlineColor ?? null,
        focusOutlineOffset: targetStyles?.outlineOffset ?? null,
        targetBoxShadow: targetStyles?.boxShadow ?? null,
        targetBorderRadius: targetStyles?.borderRadius ?? null,
        targetRect: toRect(focusTarget),
        activeMatches,
        dataInteracting: card.getAttribute("data-interacting") ?? null,
      };
    },
    cardSelector,
    focusSelector,
  );
}

async function resetFocus(page) {
  await page.evaluate(() => {
    let sentinel = document.getElementById("acceptance-focus-sentinel");
    if (!sentinel) {
      sentinel = document.createElement("button");
      sentinel.id = "acceptance-focus-sentinel";
      sentinel.type = "button";
      sentinel.style.position = "fixed";
      sentinel.style.top = "-10000px";
      sentinel.style.left = "-10000px";
      sentinel.style.opacity = "0";
      sentinel.style.pointerEvents = "none";
      sentinel.setAttribute("tabindex", "-1");
      document.body.appendChild(sentinel);
    }
    sentinel.focus();
  });
}

async function getAccessibilitySnapshot(page, cardSelector) {
  const handle = await page.$(cardSelector);
  if (!handle) return null;
  try {
    const snapshot = await page.accessibility.snapshot({ root: handle, interestingOnly: false });
    return snapshot;
  } finally {
    await handle.dispose();
  }
}

async function runInteractiveChecks(page, cards, browser, viewport) {
  const sampleSet = [];
  const seen = new Set();
  const pushUnique = (card) => {
    if (!card || seen.has(card.index)) return;
    seen.add(card.index);
    sampleSet.push(card);
  };

  cards
    .filter((card) => card.type === "review")
    .slice(0, 3)
    .forEach(pushUnique);
  cards
    .filter((card) => card.type === "podcast")
    .slice(0, 3)
    .forEach(pushUnique);

  if (sampleSet.length < 5) {
    cards.slice(0, 5).forEach(pushUnique);
  }

  const hoverStates = [];
  const focusStates = [];
  const accessibilityStates = [];
  const overlayNavigation = [];

  for (const card of sampleSet) {
    if (!card.selector) continue;

    await page.hover(card.selector);
    await delay(140);
    const hoverState = await getCardVisualState(page, card.selector);
    hoverStates.push({ index: card.index, state: hoverState });
    await page.mouse.move(0, 0);
    await delay(80);

    if (Array.isArray(card.focusTargets) && card.focusTargets.length > 0) {
      let snapshotCaptured = false;
      for (const target of card.focusTargets) {
        await page.focus(target.selector);
        await delay(160);
        const focusState = await getCardVisualState(page, card.selector, target.selector);
        focusStates.push({
          index: card.index,
          target,
          state: focusState,
        });
        if (!snapshotCaptured) {
          const snapshot = await getAccessibilitySnapshot(page, card.selector);
          const strings = snapshot ? collectAXStrings(snapshot, []) : [];
          accessibilityStates.push({ index: card.index, strings });
          snapshotCaptured = true;
        }
      }
      await resetFocus(page);
      await delay(80);
    }
  }

  // Podcast overlays should NOT capture clicks (pointer-events: none)
  // Only verify that they exist and are visible, not clickable

  return { hoverStates, focusStates, accessibilityStates, overlayNavigation };
}

async function cleanupAcceptanceAttributes(page) {
  await page.evaluate(
    ({ cardAttr, focusAttr }) => {
      document.querySelectorAll(`[${cardAttr}]`).forEach((el) => el.removeAttribute(cardAttr));
      document.querySelectorAll(`[${focusAttr}]`).forEach((el) => el.removeAttribute(focusAttr));
      const sentinel = document.getElementById("acceptance-focus-sentinel");
      if (sentinel) {
        sentinel.remove();
      }
    },
    { cardAttr: CARD_ATTR, focusAttr: FOCUS_ATTR },
  );
}

async function verifyOverlayNavigation(browser, viewport, overlayIndexes) {
  if (overlayIndexes.length === 0) {
    return [];
  }

  const page = await browser.newPage();
  try {
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
    });

    const assignCardIndices = async () => {
      await page.evaluate((cardAttr) => {
        const cards = Array.from(document.querySelectorAll(".home-card"));
        cards.forEach((card, idx) => card.setAttribute(cardAttr, String(idx)));
      }, CARD_ATTR);
    };

    await page.goto(TARGET_URL, { waitUntil: "networkidle0" });
    await assignCardIndices();

    const results = [];

    for (const index of overlayIndexes) {
      const overlayDetails = await page.evaluate(
        ({ cardAttr, idx }) => {
          const card = document.querySelector(`.home-card[${cardAttr}="${idx}"]`);
          const overlay = card?.querySelector(".home-card-media-overlay");
          if (!overlay) {
            return null;
          }
          const rect = overlay.getBoundingClientRect();
          window.__overlayClicks = window.__overlayClicks ?? {};
          window.__overlayClicks[idx] = 0;
          overlay.addEventListener(
            "click",
            () => {
              window.__overlayClicks[idx] = (window.__overlayClicks[idx] ?? 0) + 1;
            },
            { capture: false },
          );
          return {
            centerX: rect.left + rect.width / 2,
            centerY: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
            opacity: Number.parseFloat(getComputedStyle(overlay).opacity),
          };
        },
        { cardAttr: CARD_ATTR, idx: index },
      );

      if (!overlayDetails || !overlayDetails.width || !overlayDetails.height) {
        results.push({ index, success: false, reason: "overlay-missing" });
        continue;
      }

      let success = false;
      try {
        await page.mouse.click(overlayDetails.centerX, overlayDetails.centerY);
        await page.waitForTimeout(120);
        success = await page.evaluate((idx) => {
          try {
            return Boolean(window.__overlayClicks && window.__overlayClicks[idx] > 0);
          } catch {
            return false;
          }
        }, index);
      } catch {
        success = false;
      }

      results.push({ index, success });

      if (!success) {
        continue;
      }

      await page.goto(TARGET_URL, { waitUntil: "networkidle0" });
      await assignCardIndices();
    }

    return results;
  } finally {
    await page.close();
  }
}

function groupCardsIntoRows(cards) {
  const sorted = [...cards].sort((a, b) => a.rect.top - b.rect.top);
  const rows = [];
  const ROW_TOLERANCE = 4;

  for (const card of sorted) {
    const existingRow = rows.find((row) => Math.abs(row.top - card.rect.top) <= ROW_TOLERANCE);
    if (existingRow) {
      existingRow.cards.push(card);
      const count = existingRow.cards.length;
      existingRow.top = (existingRow.top * (count - 1) + card.rect.top) / count;
    } else {
      rows.push({ top: card.rect.top, cards: [card] });
    }
  }

  return rows
    .map((row) => ({
      top: row.top,
      cards: row.cards.sort((a, b) => a.rect.left - b.rect.left),
    }))
    .sort((a, b) => a.top - b.top);
}

function evaluateObjectives(base, interactions, viewport) {
  const objectives = [];
  const rows = groupCardsIntoRows(base.cards);
  const row0Cards = rows[0]?.cards ?? [];
  const firstColumnLeft = row0Cards[0]?.rect.left ?? base.firstCardRect?.left ?? null;
  const secondRowFirstLeft = rows[1]?.cards[0]?.rect.left ?? null;
  
  // Hero is hidden on mobile, so only check it on desktop/tablet
  const isMobile = viewport.width < 768;
  const alignmentTargets = [];
  
  if (!isMobile && base.heroRect?.left != null) {
    alignmentTargets.push({ label: "hero", left: base.heroRect.left });
  }
  
  alignmentTargets.push(
    { label: "latest", left: base.headingRect?.left ?? null },
    { label: "row0-card0", left: firstColumnLeft }
  );
  
  if (rows.length > 1) {
    alignmentTargets.push({ label: "row1-card0", left: secondRowFirstLeft });
  }
  
  const pairwiseAlignment = [];
  let alignmentPass = alignmentTargets.every((entry) => Number.isFinite(entry.left));
  if (alignmentPass) {
    for (let i = 0; i < alignmentTargets.length; i += 1) {
      for (let j = i + 1; j < alignmentTargets.length; j += 1) {
        const delta = Math.abs(alignmentTargets[i].left - alignmentTargets[j].left);
        pairwiseAlignment.push({
          a: alignmentTargets[i].label,
          b: alignmentTargets[j].label,
          delta,
        });
        if (delta > ALIGN_TOLERANCE_PX) {
          alignmentPass = false;
        }
      }
    }
  }
  objectives.push({
    id: 1,
    name: "Container alignment",
    pass: alignmentPass,
    details: { alignmentTargets, pairwiseAlignment, tolerance: ALIGN_TOLERANCE_PX },
  });

  const reviewOverlayIssues = base.cards.filter((card) => {
    if (card.type !== "review") return false;
    if (!card.overlay) return false;
    const area = card.overlay.area ?? 0;
    const opacity = card.overlay.opacity ?? 0;
    return card.overlay.visible && area > 0.5 && opacity > OVERLAY_OPACITY_THRESHOLD;
  });
  
  const podcastOverlayIssues = base.cards.filter((card) => {
    if (card.type !== "podcast") return false;
    const overlay = card.overlay;
    if (!overlay) return true;
    const area = overlay.area ?? 0;
    const opacity = overlay.opacity ?? 0;
    // Podcast overlays should be visible but NOT capture pointer events
    return (
      !overlay.visible ||
      area <= 0.5 ||
      opacity < OVERLAY_OPACITY_THRESHOLD ||
      overlay.pointerEvents !== "none"
    );
  });
  
  const overlayNavigationFailures = (interactions.overlayNavigation ?? []).filter(
    (entry) => !entry.success,
  );
  
  const objective2Pass =
    reviewOverlayIssues.length === 0 &&
    podcastOverlayIssues.length === 0 &&
    overlayNavigationFailures.length === 0;
    
  objectives.push({
    id: 2,
    name: "Overlay behavior",
    pass: objective2Pass,
    details: { reviewOverlayIssues, podcastOverlayIssues, overlayNavigationFailures },
  });

  const ctaVisibilityIssues = base.cards.filter((card) => {
    const cta = card.cta;
    if (!cta || !cta.visible || !cta.rect || !cta.offsetParent) return true;
    const opacity = cta.opacity ?? 0;
    return opacity < CTA_OPACITY_THRESHOLD;
  });
  
  const hoverIssues = (interactions.hoverStates ?? []).filter(({ state }) => {
    if (!state) return true;
    const pullOpacity = state.pullQuoteOpacity;
    const summaryOpacity = state.summaryOpacity;
    return (
      pullOpacity == null ||
      summaryOpacity == null ||
      pullOpacity < 0.8 ||
      summaryOpacity > 0.2 ||
      state.dataInteracting !== "true"
    );
  });
  
  const focusIssues = (interactions.focusStates ?? []).filter(({ state }) => {
    if (!state) return true;
    const pullOpacity = state.pullQuoteOpacity;
    const summaryOpacity = state.summaryOpacity;
    return (
      pullOpacity == null ||
      summaryOpacity == null ||
      pullOpacity < 0.8 ||
      summaryOpacity > 0.2 ||
      state.pullQuoteAriaHidden !== "false"
    );
  });
  
  const objective3Pass =
    ctaVisibilityIssues.length === 0 && hoverIssues.length === 0 && focusIssues.length === 0;
    
  objectives.push({
    id: 3,
    name: "CTA visibility and hover/focus states",
    pass: objective3Pass,
    details: { ctaVisibilityIssues, hoverIssues, focusIssues },
  });

  const tokenReviewColor = parseColor(base.tokens.pinkOutline);
  const tokenPodcastColor = parseColor(base.tokens.purpleOutline);
  const reviewSamples = base.cards.filter((card) => card.type === "review").slice(0, 3);
  const podcastSamples = base.cards.filter((card) => card.type === "podcast").slice(0, 3);
  
  const reviewColors = reviewSamples.map((card) => {
    const cardColor = parseColor(card.borderColor);
    return {
      index: card.index,
      color: card.borderColor,
      matchesReview: colorMostlyEqual(cardColor, tokenReviewColor),
    };
  });
  
  const podcastColors = podcastSamples.map((card) => {
    const cardColor = parseColor(card.borderColor);
    return {
      index: card.index,
      color: card.borderColor,
      matchesPodcast: colorMostlyEqual(cardColor, tokenPodcastColor),
      matchesReview: colorMostlyEqual(cardColor, tokenReviewColor),
    };
  });
  
  const objective4Pass =
    Boolean(tokenReviewColor) &&
    Boolean(tokenPodcastColor) &&
    reviewColors.length >= 3 &&
    podcastColors.length >= 3 &&
    reviewColors.every((entry) => entry.matchesReview) &&
    podcastColors.every((entry) => entry.matchesPodcast && !entry.matchesReview);
    
  objectives.push({
    id: 4,
    name: "Border colors (Review=pink, Podcast=purple)",
    pass: objective4Pass,
    details: { reviewColors, podcastColors, tokenReviewColor, tokenPodcastColor },
  });

  const baseCardMap = new Map(base.cards.map((card) => [card.index, card]));
  const focusIndicatorIssues = (interactions.focusStates ?? []).filter(({ index, target, state }) => {
    const baseCard = baseCardMap.get(index);
    if (!baseCard || !target || !state) return true;
    const baseTarget =
      (baseCard.focusTargets ?? []).find((candidate) => candidate.selector === target.selector) ??
      null;
    if (!baseTarget || !baseTarget.rect || !state.targetRect) return true;
    const widthStable = approxEqual(state.targetRect.width, baseTarget.rect.width, 0.5);
    const heightStable = approxEqual(state.targetRect.height, baseTarget.rect.height, 0.5);
    const shadowChanged =
      typeof state.cardBoxShadow === "string" &&
      state.cardBoxShadow.length > 0 &&
      state.cardBoxShadow !== baseCard.boxShadow;
    const focusAlpha = maxAlphaFromShadow(state.cardBoxShadow ?? "") ?? 0;
    const borderStable =
      !hasRoundedCorners(baseTarget.borderRadius) && !hasRoundedCorners(state.targetBorderRadius);
    return !(
      widthStable &&
      heightStable &&
      shadowChanged &&
      focusAlpha >= FOCUS_ALPHA_THRESHOLD &&
      borderStable
    );
  });
  
  const objective5Pass = focusIndicatorIssues.length === 0;
  objectives.push({
    id: 5,
    name: "Focus indicators",
    pass: objective5Pass,
    details: { focusIndicatorIssues },
  });

  const heroGap = base.heroToHeadingGap ?? null;
  // Hero is hidden on mobile, so skip this check on mobile
  const objective6Pass = isMobile || 
    (heroGap != null && heroGap >= HERO_GAP_MIN_PX && heroGap <= HERO_GAP_MAX_PX);
    
  objectives.push({
    id: 6,
    name: "Hero to heading gap",
    pass: objective6Pass,
    details: { 
      heroGap, 
      acceptableRange: [HERO_GAP_MIN_PX, HERO_GAP_MAX_PX],
      skipped: isMobile ? "hero hidden on mobile" : false,
    },
  });

  const horizontalGaps = [];
  rows.forEach((row) => {
    for (let i = 1; i < row.cards.length; i += 1) {
      const prev = row.cards[i - 1];
      const current = row.cards[i];
      horizontalGaps.push(current.rect.left - prev.rect.right);
    }
  });
  
  const verticalGaps = [];
  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const currentRow = rows[rowIndex];
    const prevRow = rows[rowIndex - 1];
    const columns = Math.min(prevRow.cards.length, currentRow.cards.length);
    for (let col = 0; col < columns; col += 1) {
      const prevCard = prevRow.cards[col];
      const currentCard = currentRow.cards[col];
      verticalGaps.push(currentCard.rect.top - prevCard.rect.bottom);
    }
  }
  
  const horizontalVariance =
    horizontalGaps.length > 0 ? Math.max(...horizontalGaps) - Math.min(...horizontalGaps) : 0;
  const verticalVariance =
    verticalGaps.length > 0 ? Math.max(...verticalGaps) - Math.min(...verticalGaps) : 0;
    
  const objective7Pass =
    horizontalVariance <= GUTTER_VARIANCE_TOLERANCE_PX &&
    verticalVariance <= GUTTER_VARIANCE_TOLERANCE_PX;
    
  objectives.push({
    id: 7,
    name: "Grid gap consistency",
    pass: objective7Pass,
    details: { horizontalGaps, verticalGaps, horizontalVariance, verticalVariance },
  });

  const hierarchyIssues = base.cards
    .filter((card) => card.media)
    .filter((card) => {
      const cardColor = parseColor(card.borderColor);
      const mediaColor = parseColor(card.media?.borderColor ?? null);
      const cardAlpha = cardColor?.a ?? null;
      const mediaAlpha = mediaColor?.a ?? null;
      const cardWidth = card.borderWidth ?? null;
      const mediaWidth = card.media?.borderWidth ?? null;
      if (cardWidth == null || mediaWidth == null) return true;
      if (cardWidth + 0.05 < mediaWidth) return true;
      if (cardAlpha != null && mediaAlpha != null && cardAlpha + 0.01 < mediaAlpha) return true;
      return false;
    })
    .map((card) => card.index);
    
  const objective8Pass = hierarchyIssues.length === 0;
  objectives.push({
    id: 8,
    name: "Visual hierarchy (card border > media border)",
    pass: objective8Pass,
    details: { hierarchyIssues },
  });

  const squareSamples = base.cards.filter((card) => card.media).slice(0, MEDIA_SAMPLE_COUNT);
  const squareIssues = squareSamples
    .map((card) => {
      const mediaRect = card.media?.rect;
      const imageRect = card.media?.imageRect;
      const fit = card.media?.imageFit;
      if (!mediaRect || !imageRect) {
        return { index: card.index, reason: "missing-rect" };
      }
      const sizeDelta = Math.abs(mediaRect.width - mediaRect.height);
      const imageDelta = Math.abs(imageRect.width - imageRect.height);
      const edgeDelta =
        Math.max(
          Math.abs(mediaRect.left - imageRect.left),
          Math.abs(mediaRect.top - imageRect.top),
          Math.abs(mediaRect.right - imageRect.right),
          Math.abs(mediaRect.bottom - imageRect.bottom),
        );
      if (
        sizeDelta > SQUARE_TOLERANCE_PX ||
        imageDelta > SQUARE_TOLERANCE_PX ||
        edgeDelta > ALIGN_TOLERANCE_PX ||
        fit !== "cover"
      ) {
        return { index: card.index, reason: { sizeDelta, imageDelta, edgeDelta, fit } };
      }
      return null;
    })
    .filter(Boolean);
    
  const objective9Pass = squareIssues.length === 0;
  objectives.push({
    id: 9,
    name: "Media 1:1 aspect ratio",
    pass: objective9Pass,
    details: { squareIssues },
  });

  const collisionIssues = base.cards
    .map((card) => {
      const overlayRect = card.overlay?.rect ?? null;
      if (!overlayRect) return null;
      const textRects = [card.titleRect, card.metaRect, card.copyRect, card.cta?.rect ?? null];
      const intersects = textRects.some((rect) => rectsOverlap(overlayRect, rect, 1));
      const clippedText = textRects.some((rect) => rect && (rect.width <= 0 || rect.height <= 0));
      if (intersects || clippedText) {
        return { index: card.index, intersects, clippedText };
      }
      return null;
    })
    .filter(Boolean);
    
  const objective10Pass = collisionIssues.length === 0;
  objectives.push({
    id: 10,
    name: "No overlay/text collisions",
    pass: objective10Pass,
    details: { collisionIssues },
  });

  // NEW OBJECTIVE 11: Card chamfer check
  const chamferIssues = base.cards
    .map((card) => {
      const hasClipPath = hasChamferClipPath(card.clipPath);
      const chamferSize = extractChamferSize(card.clipPath);
      const hasRounded = hasRoundedCorners(card.borderRadius);
      
      if (!hasClipPath) {
        return { index: card.index, reason: "no-chamfer-clip-path", clipPath: card.clipPath };
      }
      if (hasRounded) {
        return { index: card.index, reason: "has-rounded-corners", borderRadius: card.borderRadius };
      }
      if (chamferSize && Math.abs(chamferSize - CHAMFER_SIZE_PX) > CHAMFER_TOLERANCE_PX) {
        return { index: card.index, reason: "wrong-chamfer-size", expected: CHAMFER_SIZE_PX, actual: chamferSize };
      }
      return null;
    })
    .filter(Boolean);
    
  const objective11Pass = chamferIssues.length === 0;
  objectives.push({
    id: 11,
    name: "Card chamfered corners (14px, no rounded)",
    pass: objective11Pass,
    details: { chamferIssues, expectedChamfer: CHAMFER_SIZE_PX },
  });

  // NEW OBJECTIVE 12: CTA trapezoid check
  const ctaTrapezoidIssues = base.cards
    .filter((card) => card.cta)
    .map((card) => {
      const cta = card.cta;
      // CTA should have clip-path (trapezoid/chamfer) and no border-radius
      const hasClipPath = cta.clipPath && cta.clipPath !== "none" && 
        (cta.clipPath.includes("polygon") || cta.clipPath.includes("path"));
      const hasRounded = hasRoundedCorners(cta.borderRadius);
      
      if (!hasClipPath) {
        return { index: card.index, reason: "no-trapezoid-clip-path", clipPath: cta.clipPath };
      }
      if (hasRounded) {
        return { index: card.index, reason: "has-rounded-corners", borderRadius: cta.borderRadius };
      }
      return null;
    })
    .filter(Boolean);
    
  const objective12Pass = ctaTrapezoidIssues.length === 0;
  objectives.push({
    id: 12,
    name: "CTA trapezoid shape (no rounded)",
    pass: objective12Pass,
    details: { ctaTrapezoidIssues },
  });

  // NEW OBJECTIVE 13: Card 4:5 aspect ratio
  const aspectRatioIssues = base.cards
    .map((card) => {
      if (!card.rect || !card.rect.width || !card.rect.height) {
        return { index: card.index, reason: "missing-dimensions" };
      }
      const actualRatio = card.rect.width / card.rect.height;
      const expectedRatio = 4 / 5; // 0.8
      const ratioDelta = Math.abs(actualRatio - expectedRatio);
      
      if (ratioDelta > ASPECT_RATIO_TOLERANCE) {
        return {
          index: card.index,
          expected: expectedRatio,
          actual: actualRatio,
          delta: ratioDelta,
          width: card.rect.width,
          height: card.rect.height,
        };
      }
      return null;
    })
    .filter(Boolean);
    
  const objective13Pass = aspectRatioIssues.length === 0;
  objectives.push({
    id: 13,
    name: "Card 4:5 aspect ratio",
    pass: objective13Pass,
    details: { aspectRatioIssues, expectedRatio: 4/5, tolerance: ASPECT_RATIO_TOLERANCE },
  });

  // NEW OBJECTIVE 14: Nav divider angles
  // Check that dividers exist (pseudo-elements with content)
  const navDividerIssues = (base.navDividers ?? [])
    .filter((divider) => divider.index > 0) // Skip first nav item (no divider)
    .map((divider) => {
      if (!divider.hasPseudoElement) {
        return { index: divider.index, reason: "no-pseudo-element" };
      }
      if (!divider.hasExpectedSize) {
        return {
          index: divider.index,
          reason: "wrong-size",
          width: divider.width,
          height: divider.height,
        };
      }
      return null;
    })
    .filter(Boolean);
    
  // Count visible dividers
  const visibleDividers = (base.navDividers ?? [])
    .filter((d) => d.visible);
    
  const hasEnoughDividers = visibleDividers.length >= 2; // At least 2 nav items with dividers
    
  const objective14Pass = navDividerIssues.length === 0 && hasEnoughDividers;
  objectives.push({
    id: 14,
    name: "Nav angled dividers (pseudo-elements exist)",
    pass: objective14Pass,
    details: {
      navDividerIssues,
      visibleDividers: visibleDividers.length,
      hasEnoughDividers,
      dividers: base.navDividers,
    },
  });

  // NEW OBJECTIVE 15: Nav emerges from logo
  // Nav is hidden on mobile (hamburger menu instead), so skip this check on mobile
  const navEmergenceIssues = [];
  if (!isMobile && base.logo && base.navShell) {
    const logoRight = base.logo.rect.right;
    const navLeft = base.navShell.rect.left;
    const overlap = logoRight - navLeft;
    
    // Should overlap by ~32px
    if (overlap < 25 || overlap > 40) {
      navEmergenceIssues.push({
        reason: "insufficient-overlap",
        expected: "25-40px",
        actual: overlap,
        logoRight,
        navLeft,
      });
    }
    
    // Check that nav has no box-shadow (should be removed)
    if (base.navShell.boxShadow && base.navShell.boxShadow !== "none") {
      navEmergenceIssues.push({
        reason: "nav-has-shadow",
        boxShadow: base.navShell.boxShadow,
      });
    }
    
    // Check that logo has no box-shadow
    if (base.logo.boxShadow && base.logo.boxShadow !== "none") {
      navEmergenceIssues.push({
        reason: "logo-has-shadow",
        boxShadow: base.logo.boxShadow,
      });
    }
  } else if (!isMobile) {
    navEmergenceIssues.push({ reason: "missing-elements" });
  }
  
  const objective15Pass = isMobile || navEmergenceIssues.length === 0;
  objectives.push({
    id: 15,
    name: "Nav emerges from logo (overlap, no shadows)",
    pass: objective15Pass,
    details: { navEmergenceIssues },
  });

  // NEW OBJECTIVE 16: Metadata has no border/box
  const metadataBoxIssues = base.cards
    .filter((card) => card.metaStyles)
    .map((card) => {
      const styles = card.metaStyles;
      const hasBorder = styles.border && styles.border !== "none" && !styles.border.includes("0px");
      const hasBoxShadow = styles.boxShadow && styles.boxShadow !== "none";
      const hasBackground = styles.background && 
        styles.background !== "none" && 
        !styles.background.includes("transparent") &&
        !styles.background.includes("rgba(0, 0, 0, 0)");
      
      if (hasBorder || hasBoxShadow || hasBackground) {
        return {
          index: card.index,
          hasBorder,
          hasBoxShadow,
          hasBackground,
          styles,
        };
      }
      return null;
    })
    .filter(Boolean);
    
  const objective16Pass = metadataBoxIssues.length === 0;
  objectives.push({
    id: 16,
    name: "Metadata has no border/box/background",
    pass: objective16Pass,
    details: { metadataBoxIssues },
  });

  const allPassed = objectives.every((objective) => objective.pass);
  return { objectives, allPassed };
}

async function main() {
  const chromeExecutable = resolveChromeExecutable();
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    ...(chromeExecutable ? { executablePath: chromeExecutable } : {}),
  });

  const summary = [];

  try {
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
      });

      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

      await page.goto(TARGET_URL, { waitUntil: "networkidle0" });
      await page.waitForSelector('[data-card-grid="true"], .home-card-grid, [role="list"]', { timeout: 10000 });

      const baseMetrics = await captureBaseMetrics(page);
      const interactions = await runInteractiveChecks(page, baseMetrics.cards, browser, viewport);
      const evaluation = evaluateObjectives(baseMetrics, interactions, viewport);
      summary.push({ viewport, evaluation });

      await cleanupAcceptanceAttributes(page);
      await page.close();
    }
  } catch (error) {
    console.error("Acceptance check error:", error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }

  let globalPass = true;

  for (const entry of summary) {
    console.log(`\nViewport: ${entry.viewport.label} (${entry.viewport.width}x${entry.viewport.height})`);
    for (const objective of entry.evaluation.objectives) {
      const status = objective.pass ? "✅" : "❌";
      console.log(`  ${status} Objective ${objective.id}: ${objective.name}`);
      if (!objective.pass) {
        globalPass = false;
        console.log(
          `    Details: ${JSON.stringify(objective.details, (key, value) => {
            if (value == null) return value;
            if (typeof value === "number") {
              return Math.round(value * 100) / 100;
            }
            return value;
          }, 2)
            .split("\n")
            .map((line) => `    ${line}`)
            .join("\n")}`,
        );
      }
    }
  }

  if (!globalPass) {
    console.log("\n❌ FAILED: At least one objective failed. See details above.");
    process.exitCode = 1;
  } else {
    console.log("\n✅ SUCCESS: All objectives passed across all viewports.");
  }
}

main();

