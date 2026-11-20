// gta6-clipper-01 — copies VIDEO.json to /output for the make.fun harness.
// Stdlib only, deterministic. Never deletes or recreates /output.
import { mkdirSync, copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = new URL(".", import.meta.url).pathname;
const outputDir = "/output";

mkdirSync(outputDir, { recursive: true });

const video = JSON.parse(readFileSync(join(repoRoot, "VIDEO.json"), "utf8"));
if (typeof video.url !== "string" || !video.url.startsWith("https://")) {
  throw new Error("VIDEO.json must contain a valid https URL");
}
const host = new URL(video.url).hostname.replace(/^www\./, "");
if (host !== "youtube.com" && host !== "youtu.be") {
  throw new Error("VIDEO.json url must point to YouTube");
}

copyFileSync(join(repoRoot, "VIDEO.json"), join(outputDir, "VIDEO.json"));
console.log("Copied VIDEO.json -> /output/VIDEO.json:", video.url);
