import fs from "node:fs";
import puppeteer from "puppeteer";

const TARGET_URL = process.env.TARGET_URL ?? "http://localhost:3000/";
const VIEWPORTS = [
  { label: "desktop-1280", width: 1280, height: 720 },
  { label: "tablet-1024", width: 1024, height: 768 },
];

function formatRect(rect) {
  if (!rect) return null;
  return {
    left: Number(rect.left.toFixed(2)),
    top: Number(rect.top.toFixed(2)),
    width: Number(rect.width.toFixed(2)),
    height: Number(rect.height.toFixed(2)),
    right: Number(rect.right.toFixed(2)),
    bottom: Number(rect.bottom.toFixed(2)),
  };
}

function formatCssNumeric(value) {
  if (value == null) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : value;
}

async function measureAlignment(browser, viewport) {
  const page = await browser.newPage();
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
  });

  await page.goto(TARGET_URL, { waitUntil: "networkidle0" });
  await page.waitForSelector(".home-card-grid");

  const measurement = await page.evaluate(() => {
    const pickHeading = () => {
      const textMatch = (node) => {
        const text = node.textContent?.trim().toLowerCase();
        return text === "latest" || text === "latest stories" || text === "latest posts";
      };

      const preferredSelectors = [
        ".home-feed-section .home-section-heading h2",
        ".home-feed-section .home-section-heading",
        ".home-feed-section h2",
        ".home-section h2",
      ];

      for (const selector of preferredSelectors) {
        const el = document.querySelector(selector);
        if (el && el.textContent?.trim()) {
          if (textMatch(el)) return el;
          if (el.matches(".home-section-heading") && el.querySelector("h2")) {
            const child = el.querySelector("h2");
            if (child && textMatch(child)) return child;
          }
        }
      }

      const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"));
      return headings.find((node) => textMatch(node)) ?? null;
    };

    const headingEl = pickHeading();
    const cardEl = document.querySelector(".home-card-grid > *");
    const gridEl = document.querySelector(".home-card-grid");
    const containerEl = document.querySelector(".container-page.home-feed-section");

    const extractRect = (node) => {
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    };

    const headingComputed = headingEl ? getComputedStyle(headingEl) : null;
    const containerComputed = containerEl ? getComputedStyle(containerEl) : null;

    return {
      heading: headingEl
        ? {
            selector: headingEl.tagName.toLowerCase(),
            text: headingEl.textContent?.trim() ?? "",
            rect: extractRect(headingEl),
            marginLeft: headingComputed?.marginLeft ?? null,
            paddingLeft: headingComputed?.paddingLeft ?? null,
          }
        : null,
      firstCard: cardEl
        ? {
            selector: cardEl.tagName.toLowerCase(),
            rect: extractRect(cardEl),
          }
        : null,
      grid: gridEl
        ? {
            selector: gridEl.tagName.toLowerCase(),
            rect: extractRect(gridEl),
          }
        : null,
      container: containerEl
        ? {
            selector: containerEl.tagName.toLowerCase(),
            rect: extractRect(containerEl),
            paddingLeft: containerComputed?.paddingLeft ?? null,
          }
        : null,
    };
  });

  await page.close();

  const headingRect = measurement.heading?.rect ?? null;
  const cardRect = measurement.firstCard?.rect ?? null;

  const alignmentDelta =
    headingRect && cardRect ? Number((headingRect.left - cardRect.left).toFixed(2)) : null;

  return {
    viewport: viewport.label,
    headingFound: Boolean(measurement.heading),
    headingText: measurement.heading?.text ?? null,
    headingRect: formatRect(headingRect),
    headingMarginLeft: formatCssNumeric(measurement.heading?.marginLeft ?? null),
    headingPaddingLeft: formatCssNumeric(measurement.heading?.paddingLeft ?? null),
    firstCardRect: formatRect(cardRect),
    gridRect: formatRect(measurement.grid?.rect ?? null),
    containerRect: formatRect(measurement.container?.rect ?? null),
    containerPaddingLeft: formatCssNumeric(measurement.container?.paddingLeft ?? null),
    alignmentDelta,
    alignsWithin1px: alignmentDelta == null ? null : Math.abs(alignmentDelta) <= 1,
  };
}

async function main() {
  const defaultChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const requestedChromePath = process.env.CHROME_PATH;
  const chromeExecutablePath =
    requestedChromePath && fs.existsSync(requestedChromePath)
      ? requestedChromePath
      : fs.existsSync(defaultChromePath)
        ? defaultChromePath
        : undefined;

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
    ...(chromeExecutablePath ? { executablePath: chromeExecutablePath } : {}),
  });

  try {
    const results = [];
    for (const viewport of VIEWPORTS) {
      const result = await measureAlignment(browser, viewport);
      results.push(result);
    }

    for (const result of results) {
      console.log(`\nViewport: ${result.viewport}`);
      if (!result.headingFound) {
        console.log("  ⚠️  Heading with text “Latest” not found.");
      } else {
        console.log(`  Heading text: ${result.headingText}`);
        console.log(`  Heading left: ${result.headingRect?.left}px (margin-left: ${result.headingMarginLeft})`);
      }

      if (!result.firstCardRect) {
        console.log("  ⚠️  First card not found.");
      } else {
        console.log(`  First card left: ${result.firstCardRect.left}px`);
      }

      if (result.alignmentDelta != null) {
        console.log(`  Alignment delta (heading - card): ${result.alignmentDelta}px`);
        console.log(
          `  Within ±1px tolerance: ${result.alignsWithin1px ? "✅ yes" : "❌ no"}`
        );
      }

      if (result.containerRect) {
        console.log(
          `  Container padding-left: ${result.containerPaddingLeft} (container left: ${result.containerRect.left}px)`
        );
      }
    }
  } catch (error) {
    console.error("Error measuring alignment:", error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main();

