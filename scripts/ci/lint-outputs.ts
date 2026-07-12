/**
 * Outputs layer linter.
 *
 * The outputs archive is what lets plays be ranked by results instead of
 * opinions, which only works if every entry says what it produced. So:
 *
 * Errors (exit 1):
 *   - an entry directory with no README.md
 *   - a README.md with no frontmatter, or missing `title` / `description`
 *   - a missing or empty `outcome:` field (meetings, replies, pipeline
 *     attributed: what this run actually produced)
 *   - a directory name that is not outputs/YYYY-MM-DD-<slug>/ (absolute dates
 *     everywhere)
 *
 * Usage: tsx scripts/ci/lint-outputs.ts [outputsDir]
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parse as parseYaml } from "yaml";

const OUTPUTS_DIR = resolve(process.argv[2] ?? "outputs");
const ENTRY_PATTERN = /^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*$/;

const errors: string[] = [];

if (!existsSync(OUTPUTS_DIR)) {
  console.error(`outputs directory not found: ${OUTPUTS_DIR}`);
  process.exit(1);
}

const entries = readdirSync(OUTPUTS_DIR, { withFileTypes: true }).filter(
  (entry) => entry.isDirectory(),
);

for (const entry of entries) {
  if (!ENTRY_PATTERN.test(entry.name)) {
    errors.push(
      `${entry.name}: entry directories are named outputs/YYYY-MM-DD-<slug>/ (absolute dates, kebab-case slug)`,
    );
    continue;
  }

  const readme = join(OUTPUTS_DIR, entry.name, "README.md");
  if (!existsSync(readme)) {
    errors.push(`${entry.name}: no README.md (every entry states what it was)`);
    continue;
  }

  const raw = readFileSync(readme, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    errors.push(`${entry.name}/README.md: no frontmatter block`);
    continue;
  }

  let frontmatter: Record<string, unknown>;
  try {
    const parsed = parseYaml(match[1]);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      errors.push(`${entry.name}/README.md: frontmatter is not a mapping`);
      continue;
    }
    frontmatter = parsed as Record<string, unknown>;
  } catch (e) {
    errors.push(
      `${entry.name}/README.md: frontmatter parse error: ${(e as Error).message}`,
    );
    continue;
  }

  for (const field of ["title", "description", "outcome"]) {
    const value = frontmatter[field];
    if (value === null || value === undefined || String(value).trim() === "") {
      const hint =
        field === "outcome"
          ? ' (what this produced: meetings, replies, pipeline attributed, or "none" with a reason)'
          : "";
      errors.push(
        `${entry.name}/README.md: missing or empty frontmatter field "${field}"${hint}`,
      );
    }
  }
}

for (const e of errors) console.error(`error ${e}`);
console.log(
  `\noutputs lint: ${entries.length} entries, ${errors.length} errors`,
);
process.exit(errors.length > 0 ? 1 : 0);
