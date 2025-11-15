// puppeteer-check-behindthebeat.js

// Run with: node puppeteer-check-behindthebeat.js



const puppeteer = require('puppeteer');



(async () => {

  const baseUrl = 'http://localhost:3000';

  const browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();

  const failures = [];



  async function go(path) {

    await page.goto(baseUrl + path, { waitUntil: 'networkidle2' });

  }



  async function check(name, fn) {

    try {

      const ok = await fn();

      if (ok) {

        console.log('PASS:', name);

      } else {

        console.log('FAIL:', name);

        failures.push(name);

      }

    } catch (err) {

      console.log('ERROR:', name, '-', err.message);

      failures.push(name);

    }

  }



  // Get first review + podcast slugs dynamically

  await go('/reviews');

  const firstReviewPath = await page.evaluate(() => {

    const link = document.querySelector('a[href^="/reviews/"]');

    return link ? new URL(link.getAttribute('href'), location.origin).pathname : null;

  });



  await go('/podcast');

  const firstPodcastPath = await page.evaluate(() => {

    const link = document.querySelector('a[href^="/podcast/"]');

    return link ? new URL(link.getAttribute('href'), location.origin).pathname : null;

  });



  // 1) Footer order on /reviews, /podcast, review slug, podcast slug

  const footerPages = ['/reviews', '/podcast'];

  if (firstReviewPath) footerPages.push(firstReviewPath);

  if (firstPodcastPath) footerPages.push(firstPodcastPath);



  for (const path of footerPages) {

    await check(`footer-after-main ${path}`, async () => {

      await go(path);

      return page.evaluate(() => {

        const footer = document.querySelector('footer');

        const main = document.querySelector('main');

        if (!footer || !main) return false;



        const all = [];

        (function walk(node) {

          for (const el of node.children) {

            all.push(el);

            walk(el);

          }

        })(document.body);



        const fIndex = all.indexOf(footer);

        const mIndex = all.indexOf(main);

        return mIndex !== -1 && fIndex !== -1 && fIndex > mIndex;

      });

    });

  }



  // 2) Breadcrumb above H1 on detail pages

  const detailPages = [];

  if (firstReviewPath) detailPages.push(firstReviewPath);

  if (firstPodcastPath) detailPages.push(firstPodcastPath);



  for (const path of detailPages) {

    await check(`breadcrumb-before-h1 ${path}`, async () => {

      await go(path);

      return page.evaluate(() => {

        const breadcrumb =

          document.querySelector('nav[aria-label*="crumb" i]') ||

          document.querySelector('nav.breadcrumb') ||

          document.querySelector('.breadcrumbs');

        const h1 =

          document.querySelector('main h1') ||

          document.querySelector('h1');

        if (!breadcrumb || !h1) return false;



        const all = [];

        (function walk(node) {

          for (const el of node.children) {

            all.push(el);

            walk(el);

          }

        })(document.body);



        const bIndex = all.indexOf(breadcrumb);

        const hIndex = all.indexOf(h1);

        return bIndex !== -1 && hIndex !== -1 && bIndex < hIndex;

      });

    });

  }



  // 3) Homepage: no duplicated summary lines in specific tiles

  await check('home-no-duplicate-summaries', async () => {

    await go('/');

    return page.evaluate(() => {

      const titles = ['The Creative Process', 'City Sounds', 'Coastal Vibes'];



      function hasDupLines(card) {

        if (!card) return false;

        const lines = card.innerText

          .split('\n')

          .map(l => l.trim())

          .filter(Boolean);

        // allow title line; check for back-to-back identical lines after that

        for (let i = 0; i < lines.length - 1; i++) {

          if (lines[i] === lines[i + 1]) return true;

        }

        return false;

      }



      for (const title of titles) {

        const el = Array.from(document.querySelectorAll('a, h2, h3, article, div'))

          .find(e => e.textContent.includes(title));

        if (!el) continue;

        const card = el.closest('article') || el.closest('div');

        if (hasDupLines(card)) return false;

      }

      return true;

    });

  });



  // 4) /mission: no orphan "Editor Photo" placeholder

  await check('mission-no-editor-photo-placeholder', async () => {

    await go('/mission');

    return page.evaluate(() => {

      const matches = Array.from(document.querySelectorAll('body *'))

        .filter(el => el.childElementCount === 0 && el.textContent.trim() === 'Editor Photo');

      return matches.length === 0;

    });

  });



  // 5) /podcast/[slug]: "Listen in" has a player/embed after it

  if (firstPodcastPath) {

    await check('podcast-listen-in-has-player', async () => {

      await go(firstPodcastPath);

      return page.evaluate(() => {

        const headings = Array.from(document.querySelectorAll('h2, h3'));

        const listenHeading = headings.find(h =>

          h.textContent.trim().toLowerCase() === 'listen in'

        );

        if (!listenHeading) return false;



        const all = [];

        (function walk(node) {

          for (const el of node.children) {

            all.push(el);

            walk(el);

          }

        })(document.body);



        const idx = all.indexOf(listenHeading);

        if (idx === -1) return false;



        const after = all.slice(idx + 1);

        return after.some(el => {

          const tag = el.tagName;

          if (!tag) return false;

          const t = tag.toLowerCase();

          return t === 'audio' || t === 'iframe' || t === 'video';

        });

      });

    });

  }



  // 6) /podcast/[slug]: "Where to Find Them" has separate links "Website" and "Instagram"

  if (firstPodcastPath) {

    await check('podcast-where-to-find-links-separated', async () => {

      await go(firstPodcastPath);

      return page.evaluate(() => {

        const headings = Array.from(document.querySelectorAll('h2, h3'));

        const sectionHeading = headings.find(h =>

          h.textContent.trim().toLowerCase() === 'where to find them'

        );

        if (!sectionHeading) return false;



        const container = sectionHeading.parentElement;

        if (!container) return false;

        const links = Array.from(container.querySelectorAll('a'));

        const hasWebsite = links.some(a =>

          a.textContent.toLowerCase().includes('website')

        );

        const hasInstagram = links.some(a =>

          a.textContent.toLowerCase().includes('instagram')

        );

        return hasWebsite && hasInstagram && links.length >= 2;

      });

    });

  }



  // 7) /podcast/[slug]: "About the Artist" has no duplicated paragraphs

  if (firstPodcastPath) {

    await check('podcast-about-artist-no-duplicate-paragraphs', async () => {

      await go(firstPodcastPath);

      return page.evaluate(() => {

        const headings = Array.from(document.querySelectorAll('h2, h3'));

        const aboutHeading = headings.find(h =>

          h.textContent.trim().toLowerCase() === 'about the artist'

        );

        if (!aboutHeading) return false;



        const all = [];

        (function walk(node) {

          for (const el of node.children) {

            all.push(el);

            walk(el);

          }

        })(document.body);



        const idx = all.indexOf(aboutHeading);

        if (idx === -1) return false;



        const after = all.slice(idx + 1);

        const paras = [];

        for (const el of after) {

          const tag = el.tagName && el.tagName.toLowerCase();

          if (tag === 'h2' || tag === 'h3') break; // next section

          if (tag === 'p') {

            const text = el.textContent.trim();

            if (text) paras.push(text);

          }

        }

        const set = new Set(paras);

        return set.size === paras.length;

      });

    });

  }



  await browser.close();

  if (failures.length) {

    console.error('\nSome checks failed:', failures);

    process.exit(1);

  } else {

    console.log('\nAll checks passed.');

  }

})();

