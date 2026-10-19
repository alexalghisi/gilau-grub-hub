// Daily worker: reads the latest "Meniul Zilei" posts from the Optim Catering
// Facebook page (via the Apify facebook-posts-scraper actor), downloads the
// photos and writes posts.json into the data directory (the `meniu-data` branch).
//
// Usage: APIFY_TOKEN=... node scripts/sync-fb-menu.mjs <dataDir>
import { mkdir, readFile, writeFile, access, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const PAGE_URL = "https://www.facebook.com/p/Optim-Catering-100080055056942/";
const RAW_BASE = "https://raw.githubusercontent.com/alexalghisi/gilau-grub-hub/meniu-data";
const KEEP = 30;
const MAX_IMAGES = 6;

const dataDir = process.argv[2] ?? "meniu-data";
const token = process.env.APIFY_TOKEN;
if (!token) throw new Error("APIFY_TOKEN is not set");

const exists = (p) => access(p).then(() => true, () => false);

async function scrape() {
  const url = "https://api.apify.com/v2/acts/apify~facebook-posts-scraper/run-sync-get-dataset-items?timeout=280";
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ startUrls: [{ url: PAGE_URL }], resultsLimit: 4 }),
  });
  if (!res.ok) throw new Error(`Apify ${res.status}: ${await res.text()}`);
  return res.json();
}

// "Meniul Zilei – 20.10.2026" -> "2026-10-20"; falls back to the day after posting
// (the page posts tomorrow's menu in the evening).
function menuDate(text, time) {
  const m = text.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  const d = new Date(time);
  if (d.getUTCHours() >= 12) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

async function download(src, file) {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`image ${res.status}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

const items = await scrape();
const menus = items.filter((p) => /meniu/i.test(p.text ?? "") && p.postId);
console.log(`Apify: ${items.length} posts, ${menus.length} menu posts`);

await mkdir(join(dataDir, "img"), { recursive: true });
const jsonPath = join(dataDir, "posts.json");
const existing = (await exists(jsonPath)) ? JSON.parse(await readFile(jsonPath, "utf8")) : [];
const byId = new Map(existing.map((p) => [p.id, p]));

for (const p of menus) {
  const photos = (p.media ?? [])
    .filter((m) => m.__typename === "Photo")
    .map((m) => m.photo_image?.uri ?? m.image?.uri ?? m.thumbnail)
    .filter(Boolean)
    .slice(0, MAX_IMAGES);
  const images = [];
  for (const [i, src] of photos.entries()) {
    const name = `${p.postId}-${i + 1}.jpg`;
    const file = join(dataDir, "img", name);
    try {
      if (!(await exists(file))) await download(src, file);
      images.push(`${RAW_BASE}/img/${name}`);
    } catch (e) {
      console.warn(`skip image ${name}: ${e.message}`);
    }
  }
  const prev = byId.get(p.postId);
  byId.set(p.postId, {
    id: p.postId,
    message: p.text ?? null,
    images: images.length ? images : (prev?.images ?? []),
    permalink: p.url ?? p.topLevelUrl ?? null,
    created_time: p.time,
    menu_date: menuDate(p.text ?? "", p.time),
  });
}

const posts = [...byId.values()]
  .sort((a, b) => b.created_time.localeCompare(a.created_time))
  .slice(0, KEEP);
await writeFile(jsonPath, JSON.stringify(posts, null, 2) + "\n");

// Drop photos of posts that fell out of the history.
const keep = new Set(posts.flatMap((p) => p.images.map((u) => u.split("/").pop())));
for (const f of await readdir(join(dataDir, "img"))) if (!keep.has(f)) await rm(join(dataDir, "img", f));
console.log(`posts.json: ${posts.length} posts, latest ${posts[0]?.menu_date}`);
