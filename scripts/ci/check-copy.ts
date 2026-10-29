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

// The Cargo skill bundle the CLI installs at scaffold time is vendored, not
// written here: it follows its own upstream style, and without this every new
// project's first pull request fails on thousands of em dashes it never wrote.
const VENDORED = ["agent/skills/", ".agents/skills/"];

// The repo's own skills share `.agents/skills/` with the vendored bundle and
// are not exempt. One is told apart the way AGENTS.md defines it: a committed
// symlink at `.claude/skills/<name>`. The installer's symlinks are gitignored,
// so they never appear here.
const OWN_SKILLS = execFileSync("git", ["ls-files", "-s", ".claude/skills"], {
  encoding: "utf8",
})
  .split("\n")
  .filter((line) => line.startsWith("120000 "))
  .map((line) => line.split("\t")[1].slice(".claude/skills/".length))
  .map((name) => `.agents/skills/${name}/`);

const isVendored = (f: string) =>
  VENDORED.some((dir) => f.startsWith(dir)) &&
  !OWN_SKILLS.some((dir) => f.startsWith(dir));

// Pages captured from the web are quoted, not written here: `cargo-ai project
// init` and the web-capture cookbook save them verbatim so a later read diffs
// against them. Rewriting their dashes would read as a change on the site, and
// leaving them would fail the first pull request of every project that read one.
const CAPTURED = ["cadence/log/raw/"];

const BINARY_EXT = /\.(png|jpe?g|gif|webp|ico|pdf|zip|gz|woff2?|ttf|eot)$/i;

const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .map((f) => f.trim())
  .filter(Boolean)
  .filter((f) => !SKIP.has(f) && !BINARY_EXT.test(f))
  .filter((f) => !isVendored(f))
  .filter((f) => !CAPTURED.some((dir) => f.startsWith(dir)));

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
