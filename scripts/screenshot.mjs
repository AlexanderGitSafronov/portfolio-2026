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

async function shoot(browser, { slug, url }) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30_000 });
    // Give animations / lazy content a moment to settle
    await new Promise((r) => setTimeout(r, 1500));
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

// Run 3 in parallel to avoid stressing target servers
const concurrency = 3;
for (let i = 0; i < projects.length; i += concurrency) {
  const batch = projects.slice(i, i + concurrency);
  await Promise.all(batch.map((p) => shoot(browser, p)));
}

await browser.close();
console.log("done");
