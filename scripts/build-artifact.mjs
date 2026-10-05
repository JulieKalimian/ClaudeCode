// Builds dist/artifact.html: the page fragment used when publishing Moda as a
// claude.ai Artifact. The Artifact host supplies its own <!doctype>, <html>,
// <head> and <body>, so this keeps only what sits between the artifact markers
// in index.html. Stylesheets, scripts, data and images are published alongside
// it as separate files under the same relative paths.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");

function between(start, end) {
  const a = html.indexOf(start);
  const b = html.indexOf(end);
  if (a === -1 || b === -1 || b < a) throw new Error(`Missing marker ${start} / ${end} in index.html`);
  return html.slice(a + start.length, b).trim();
}

const head = between("<!-- artifact:head -->", "<!-- /artifact:head -->");
const body = between("<!-- artifact:body -->", "<!-- /artifact:body -->");

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist", "artifact.html"), `${head}\n\n${body}\n`);
console.log("Wrote dist/artifact.html");
