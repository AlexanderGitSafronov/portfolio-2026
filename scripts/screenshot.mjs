import puppeteer from "puppeteer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, "..", "public", "previews");

const projects = [
  { slug: "myitems", url: "https://myitems-lilac.vercel.app" },
  { slug: "myfilms", url: "https://myfilms-app.vercel.app" },
  { slug: "uptolife", url: "https://uptolife.vercel.app" },
  { slug: "wishlist", url: "https://wishlist-app-inky-chi.vercel.app" },
  { slug: "homepay", url: "https://homepay-tau.vercel.app" },
  { slug: "mycash", url: "https://mycash-mu.vercel.app" },
  { slug: "mysmak", url: "https://mysmak.vercel.app" },
  { slug: "pdfreduct", url: "https://pdfreduct.vercel.app" },
  { slug: "magaz7km", url: "https://magaz7km.vercel.app" },
  { slug: "timergame", url: "https://timergame-jqnx.vercel.app" },
  { slug: "rashod", url: "https://rashod.vercel.app" },
  { slug: "clue", url: "https://clue-phi.vercel.app" },
  { slug: "task-tracker", url: "https://task-tracker-teal-phi.vercel.app" },
  { slug: "crmpro", url: "https://crmpro-gamma.vercel.app" },
];

// Common cookie / consent / popup selectors that should be hidden so they
// don't ruin the shot. We just hide them, the page state otherwise stays
// authentic.
const HIDE_SELECTORS = [
  '[class*="cookie" i]',
  '[id*="cookie" i]',
  '[class*="consent" i]',
  '[id*="consent" i]',
  '[class*="banner" i][class*="bottom" i]',
  '[role="dialog"][aria-label*="cookie" i]',
  '[data-cookie-banner]',
  '#cookieConsent',
  '#cookie-banner',
  '#cookie-notice',
  ".CookieConsent",
];

async function shoot(browser, { slug, url }) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // Disable browser cache + send no-cache headers so we always pull the latest
  // build. Without this, puppeteer happily reuses cached HTML/JS chunks from
  // older deploys and we end up screenshotting yesterday's site.
  await page.setCacheEnabled(false);
  await page.setExtraHTTPHeaders({
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  });

  // Kill CSS animations + reveal-on-scroll scripts that hide content until
  // intersection. With reduced-motion, framer-motion plays its target state
  // immediately instead of fading in.
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
    { name: "prefers-color-scheme", value: "dark" },
  ]);

  try {
    // Cache-bust the URL too — Vercel's edge cache keys on the full URL, so a
    // unique query param forces a fresh render past any stale CDN entry.
    const bustedUrl = `${url}${url.includes("?") ? "&" : "?"}_t=${Date.now()}`;
    await page.goto(bustedUrl, { waitUntil: "networkidle2", timeout: 60_000 });

    // Cold-start grace: Vercel free tier wakes the function on first hit, and
    // some landing pages defer hero images / lazy-load fonts even after
    // networkidle. Give them a moment before we touch the DOM.
    await new Promise((r) => setTimeout(r, 4000));

    // Wait for fonts so type isn't swapping during the screenshot
    await page.evaluate(() => document.fonts && document.fonts.ready);

    // Hide cookie banners + force-show any `whileInView` content by nuking
    // common reveal-animation classes' opacity:0 / transform.
    await page.evaluate((selectors) => {
      const css = `
        ${selectors.join(",")}
        { display: none !important; visibility: hidden !important; }
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        [style*="opacity: 0"],
        [style*="opacity:0"] { opacity: 1 !important; }
        [style*="filter: blur"] { filter: none !important; }
      `;
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    }, HIDE_SELECTORS);

    // Trigger a small scroll-up cycle to nudge any IntersectionObservers
    await page.evaluate(() => {
      window.scrollTo(0, 200);
      window.scrollTo(0, 0);
    });

    // Settle — let revealed sections render, images decode, hero animations land
    await new Promise((r) => setTimeout(r, 4000));

    const file = path.join(outDir, `${slug}.jpg`);
    await page.screenshot({
      path: file,
      type: "jpeg",
      quality: 82,
      fullPage: false,
    });
    console.log(`✔ ${slug}`);
  } catch (err) {
    console.error(`✘ ${slug}: ${err.message}`);
  } finally {
    await page.close();
  }
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const concurrency = 3;
for (let i = 0; i < projects.length; i += concurrency) {
  const batch = projects.slice(i, i + concurrency);
  await Promise.all(batch.map((p) => shoot(browser, p)));
}

await browser.close();
console.log("done");
