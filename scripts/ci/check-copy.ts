/**
 * Copy-style linter.
 *
 * Enforces the one repo-wide copy rule from AGENTS.md: no em dashes anywhere.
 * Use colons, parentheses, commas, or split the sentence.
 *
 * Scans git-tracked text files and fails (exit 1) on any em dash (U+2014).
 *
 * Usage: tsx scripts/ci/check-copy.ts
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const EM_DASH = "\u2014";

// Lockfiles and this linter are exempt: lockfiles are machine-generated, and
// the linter must be able to name the character it forbids.
const SKIP = new Set([
  "package-lock.json",
  "infra/package-lock.json",
  "scripts/ci/check-copy.ts",
]);

const BINARY_EXT = /\.(png|jpe?g|gif|webp|ico|pdf|zip|gz|woff2?|ttf|eot)$/i;

const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .map((f) => f.trim())
  .filter(Boolean)
  .filter((f) => !SKIP.has(f) && !BINARY_EXT.test(f));

const offenders: string[] = [];

for (const file of tracked) {
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (!text.includes(EM_DASH)) continue;
  text.split(/\r?\n/).forEach((line, i) => {
    if (line.includes(EM_DASH)) {
      offenders.push(`${file}:${i + 1}: ${line.trim()}`);
    }
  });
}

if (offenders.length > 0) {
  console.error("copy check: em dashes are not allowed. Use a colon, parentheses, a comma, or split the sentence.\n");
  for (const o of offenders) console.error(`error ${o}`);
  console.error(`\ncopy check: ${offenders.length} em dash(es) found`);
  process.exit(1);
}

console.log(`copy check: ${tracked.length} files, 0 em dashes`);
