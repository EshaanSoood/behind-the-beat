import fs from "node:fs";
import puppeteer from "puppeteer";

const TARGET_URL = process.env.TARGET_URL ?? "http://localhost:3000/";
const VIEWPORTS = [
  { label: "desktop-1280", width: 1280, height: 832 },
  { label: "tablet-900", width: 900, height: 1024 },
  { label: "mobile-414", width: 414, height: 896 },
];
const TOLERANCE_PX = 2;
const ALIGN_TOLERANCE_PX = 1;
const SQUARE_TOLERANCE_PX = 2;
const CTA_OPACITY_THRESHOLD = 0.99;
const OVERLAY_OPACITY_THRESHOLD = 0.8;
const GUTTER_VARIANCE_TOLERANCE_PX = 2;
const HERO_GAP_MIN_PX = 24;
const HERO_GAP_MAX_PX = 40;
const FOCUS_ALPHA_THRESHOLD = 0.3;
const CHAMFER_MAX_PX = 14.1;
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

function colorDistance(colorA, colorB) {
  if (!colorA || !colorB) return Number.POSITIVE_INFINITY;
  const dr = colorA.r - colorB.r;
  const dg = colorA.g - colorB.g;
  const db = colorA.b - colorB.b;
  const da = (colorA.a ?? 1) - (colorB.a ?? 1);
  return Math.sqrt(dr * dr + dg * dg + db * db + (da * 100) * (da * 100));
}

function rectsOverlap(rectA, rectB, tolerance = 0) {
  if (!rectA || !rectB) return false;
  const horizontal = Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left);
  const vertical = Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top);
  return horizontal > tolerance && vertical > tolerance;
}

function uniqueWithinTolerance(values, tolerance = TOLERANCE_PX) {
  const uniques = [];
  for (const value of values) {
    if (!Number.isFinite(value)) continue;
    if (uniques.every((existing) => Math.abs(existing - value) > tolerance)) {
      uniques.push(value);
    }
  }
  return uniques;
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
  return numericMatches.some((match) => Number.parseFloat(match) > CHAMFER_MAX_PX);
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
      const grid = document.querySelector(".home-card-grid");
      const container = document.querySelector(".container-page.home-feed-section");
      const cards = Array.from(document.querySelectorAll(".home-card"));

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
        const overlayCenterHit =
          overlay && overlayRect
            ? document.elementFromPoint(
                overlayRect.left + overlayRect.width / 2,
                overlayRect.top + overlayRect.height / 2
              )
            : null;
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

        const gapValueRaw = styles.getPropertyValue("--home-card-gap");
        const gapValue = gapValueRaw ? Number.parseFloat(gapValueRaw) : Number.NaN;

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
          gapValue,
          boxShadow: styles.boxShadow,
          titleRect: toRect(title),
          titleText: title?.textContent?.trim() ?? "",
          metaRect: toRect(metaPrimary),
          metaText: metaPrimary?.textContent?.trim() ?? "",
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
                centerCapturesOverlay:
                  overlayVisible &&
                  overlayCenterHit &&
                  (overlayCenterHit === overlay || overlay.contains(overlayCenterHit)),
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

  const podcastOverlayIndexes = cards
    .filter((card) => card.type === "podcast" && card.overlay)
    .map((card) => card.index);

  if (podcastOverlayIndexes.length > 0) {
    const overlayResults = await verifyOverlayNavigation(browser, viewport, podcastOverlayIndexes);
    overlayNavigation.push(...overlayResults);
  }

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

function computeSpacing(card) {
  const values = [];
  const addGap = (prevRect, nextRect) => {
    if (!prevRect || !nextRect) return;
    const gap = Number((nextRect.top - prevRect.bottom).toFixed(2));
    values.push(gap);
  };

  addGap(card.titleRect, card.metaRect);
  addGap(card.metaRect, card.media?.rect ?? null);
  addGap(card.media?.rect ?? null, card.copyRect);
  addGap(card.copyRect, card.cta?.rect ?? null);
  return values;
}

function evaluateObjectives(base, interactions, viewport) {
  const objectives = [];
  const rows = groupCardsIntoRows(base.cards);
  const row0Cards = rows[0]?.cards ?? [];
  const firstColumnLeft = row0Cards[0]?.rect.left ?? base.firstCardRect?.left ?? null;
  const secondRowFirstLeft = rows[1]?.cards[0]?.rect.left ?? null;
  const alignmentTargets = [
    { label: "hero", left: base.heroRect?.left ?? null },
    { label: "latest", left: base.headingRect?.left ?? null },
    { label: "row0-card0", left: firstColumnLeft },
  ];
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
    return (
      !overlay.visible ||
      area <= 0.5 ||
      opacity < OVERLAY_OPACITY_THRESHOLD ||
      overlay.pointerEvents === "none" ||
      overlay.centerCapturesOverlay === false
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
    pass: objective5Pass,
    details: { focusIndicatorIssues },
  });

  const heroGap = base.heroToHeadingGap ?? null;
  const objective6Pass =
    heroGap != null && heroGap >= HERO_GAP_MIN_PX && heroGap <= HERO_GAP_MAX_PX;
  objectives.push({
    id: 6,
    pass: objective6Pass,
    details: { heroGap, acceptableRange: [HERO_GAP_MIN_PX, HERO_GAP_MAX_PX] },
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
    pass: objective10Pass,
    details: { collisionIssues },
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
      await page.waitForSelector(".home-card-grid");

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
      console.log(`  ${status} Objective ${objective.id}`);
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
    console.log("\nAt least one objective failed. See details above.");
    process.exitCode = 1;
  } else {
    console.log("\nAll objectives passed across all viewports.");
  }
}

main();

