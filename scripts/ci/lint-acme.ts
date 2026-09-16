/**
 * Worked-example tracker.
 *
 * The knowledge layers ship a worked example for a fictional company, Acme.
 * AGENTS.md tells you to search for `ACME:` markers to find every file that is
 * fiction; this reports them so you do not have to remember to run that grep,
 * and so a partial replacement is visible.
 *
 * Partial replacement is the case worth catching. The examples reference each
 * other (`plan/outcomes.md` names `initiatives/outbound-motion.md`), so
 * replacing some and keeping others leaves real files citing fiction and
 * fictional files citing real outcomes.
 *
 * Warnings (exit 0):
 *   - a git-tracked file still carrying an `ACME:` marker
 *
 * Report-only by design: a freshly scaffolded repo legitimately carries every
 * marker, and a scaffold whose lint fails out of the box is a scaffold nobody
 * trusts. Pass `--strict` to turn them into errors (exit 1) once the repo is
 * yours, so CI keeps fiction from coming back.
 *
 * Usage: tsx scripts/ci/lint-acme.ts [--strict]
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const MARKER = "ACME:";
// The marker opens its line, optionally behind a comment or list prefix. Prose
// that merely names the convention (outputs/README.md explains it) mentions it
// mid-sentence and is not itself fiction.
const MARKER_LINE = /^\s*(?:\/\/\s*|#\s*|\*\s*|[-*>]\s*)?ACME:/;
const STRICT = process.argv.includes("--strict");

// This linter has to be able to name the marker it looks for.
const SKIP = new Set(["scripts/ci/lint-acme.ts"]);

const BINARY_EXT = /\.(png|jpe?g|gif|webp|ico|pdf|zip|gz|woff2?|ttf|eot)$/i;

const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .map((f) => f.trim())
  .filter(Boolean)
  .filter((f) => !SKIP.has(f) && !BINARY_EXT.test(f));

const found: string[] = [];

for (const file of tracked) {
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (!text.includes(MARKER)) continue;
  text.split(/\r?\n/).forEach((line, i) => {
    if (MARKER_LINE.test(line)) {
      found.push(`${file}:${i + 1}: ${line.trim()}`);
    }
  });
}

const label = STRICT ? "error" : "warn ";
const log = STRICT ? console.error : console.warn;

for (const f of found) log(`${label} ${f}`);

if (found.length > 0) {
  log(
    `\nThese files are Acme's, not yours. Replace the content and delete the marker.`,
  );
}

console.log(
  `\nworked examples: ${tracked.length} files scanned, ${found.length} still fiction${
    STRICT ? "" : " (report-only; --strict to enforce)"
  }`,
);

process.exit(STRICT === true && found.length > 0 ? 1 : 0);
