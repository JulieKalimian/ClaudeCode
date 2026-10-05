// Builds moda.html: the whole app in one HTML file. The stylesheet, scripts,
// trend data and every photo (as base64 data URIs) are inlined, so the file
// opens on its own from anywhere, offline included. Only the Google Fonts
// stylesheet stays external; without a connection the page uses fallback fonts.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

// Inlined code must not close its own <script> or <style> tag early.
const safeScript = (code) => code.replace(/<\/script/gi, "<\\/script");
const safeStyle = (css) => css.replace(/<\/style/gi, "<\\/style");

const images = {};
for (const file of readdirSync(join(root, "images")).sort()) {
  if (!file.endsWith(".jpg")) continue;
  const data = readFileSync(join(root, "images", file)).toString("base64");
  images[file.replace(/\.jpg$/, "")] = `data:image/jpeg;base64,${data}`;
}

let html = read("index.html");

function inline(tag, replacement) {
  if (!html.includes(tag)) throw new Error(`index.html no longer contains: ${tag}`);
  html = html.replace(tag, () => replacement);
}

inline('<link rel="stylesheet" href="assets/styles.css">', `<style>\n${safeStyle(read("assets/styles.css"))}\n</style>`);
inline('<script src="data/trends.js"></script>', `<script>\n${safeScript(read("data/trends.js"))}\n</script>`);
inline('<script src="data/credits.js"></script>', `<script>\n${safeScript(read("data/credits.js"))}\n</script>`);
inline(
  '<script src="assets/app.js"></script>',
  `<script>\nwindow.MODA_IMAGES = ${JSON.stringify(images)};\n</script>\n` +
    `<script>\n${safeScript(read("assets/app.js"))}\n</script>`
);

writeFileSync(join(root, "moda.html"), html);
const mb = (Buffer.byteLength(html) / 1024 / 1024).toFixed(1);
console.log(`Wrote moda.html (${mb} MB, ${Object.keys(images).length} photos embedded)`);
