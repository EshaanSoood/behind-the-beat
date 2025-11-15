import puppeteer from "puppeteer";

const url = process.env.TEST_URL ?? "http://localhost:3000";

const browser = await puppeteer.launch({
  headless: "new",
});

try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const measurements = await page.evaluate(() => {
    const header = document.querySelector("header.brand-bar");
    const hero = document.querySelector(".home-hero-section");
    const title = document.querySelector(".home-hero-section .hero-title");
    const sectionHeading = document.querySelector(".home-section-heading h2");
    const firstCard = document.querySelector(".home-card-grid .home-card");
    const firstCardButton = firstCard?.querySelector(".button-trapezoid");
    const firstCardMedia = firstCard?.querySelector(".home-card-media");

    if (!header || !hero || !title || !sectionHeading || !firstCard) {
      return null;
    }

    const headerRect = header.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const headingRect = sectionHeading.getBoundingClientRect();
    const cardRect = firstCard.getBoundingClientRect();

    const gap = titleRect.top - headerRect.bottom;

    const getBox = (el) => {
      const computed = window.getComputedStyle(el);
      return {
        marginTop: computed.marginTop,
        marginBottom: computed.marginBottom,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
      };
    };

    const getComputedProps = (el) => {
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      return {
        marginTop: computed.marginTop,
        marginBottom: computed.marginBottom,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        marginLeft: computed.marginLeft,
        paddingLeft: computed.paddingLeft,
        borderRadius: computed.borderRadius,
        clipPath: computed.clipPath,
        borderWidth: computed.borderWidth,
        borderColor: computed.borderColor,
        aspectRatio: computed.aspectRatio,
      };
    };

    return {
      headerBottom: headerRect.bottom,
      heroTop: heroRect.top,
      titleTop: titleRect.top,
      gap,
      headerBox: getBox(header),
      pageWellBox: getBox(document.querySelector("main.page-well")),
      heroBox: getBox(hero),
      titleBox: getBox(title),
      headingLeft: headingRect.left,
      cardLeft: cardRect.left,
      alignmentDiff: headingRect.left - cardRect.left,
      headingToGridGap: cardRect.top - headingRect.bottom,
      headingBox: getComputedProps(sectionHeading),
      cardBox: getComputedProps(firstCard),
      cardMediaBox: getComputedProps(firstCardMedia),
      cardButtonBox: getComputedProps(firstCardButton),
      cardHeight: cardRect.height,
      cardButtonOffsetBottom: firstCardButton
        ? cardRect.bottom - firstCardButton.getBoundingClientRect().bottom
        : null,
    };
  });

  if (!measurements) {
    console.error("Could not locate elements to measure.");
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(measurements, null, 2));
  }
} finally {
  await browser.close();
}

