/**
 * Context layer linter.
 *
 * Errors (exit 1):
 *   - missing or empty `title` / `description` frontmatter
 *   - unparseable frontmatter
 *   - `references:` entries that don't resolve to a context file
 *   - [[wikilinks]] or relative .md links that don't resolve
 *   - files outside a known domain
 * Warnings (exit 0):
 *   - orphan files (nothing references them)
 *   - stale files (no git commit touching them in STALE_DAYS)
 *
 * Usage: tsx scripts/ci/lint-context.ts [contextDir]
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { parse as parseYaml } from "yaml";

const CONTEXT_DIR = resolve(process.argv[2] ?? "context");
const STALE_DAYS = 90;
const DOMAINS = [
  "global",
  "icp",
  "persona",
  "jtbd",
  "alternative",
  "objection",
  "proof",
  "signal",
  "play",
  "client",
  "insight",
];

interface Doc {
  path: string; // absolute
  rel: string; // relative to context dir, e.g. "icp/mid-market-b2b-saas.md"
  slug: string; // rel without extension, e.g. "icp/mid-market-b2b-saas"
  body: string;
  frontmatter: Record<string, unknown> | null;
  frontmatterError?: string;
}

const errors: string[] = [];
const warnings: string[] = [];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

function parseDoc(path: string): Doc {
  const raw = readFileSync(path, "utf8");
  const rel = relative(CONTEXT_DIR, path);
  const slug = rel.replace(/\.mdx?$/, "");
  const doc: Doc = { path, rel, slug, body: raw, frontmatter: null };
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    doc.frontmatterError = "no frontmatter block";
    return doc;
  }
  try {
    const parsed = parseYaml(match[1]);
    if (parsed === null || typeof parsed !== "object") {
      doc.frontmatterError = "frontmatter is not a mapping";
    } else {
      doc.frontmatter = parsed as Record<string, unknown>;
    }
  } catch (e) {
    doc.frontmatterError = `frontmatter parse error: ${(e as Error).message}`;
  }
  doc.body = raw.slice(match[0].length);
  return doc;
}

function refExists(ref: string): boolean {
  return (
    existsSync(join(CONTEXT_DIR, `${ref}.md`)) ||
    existsSync(join(CONTEXT_DIR, `${ref}.mdx`))
  );
}

if (!existsSync(CONTEXT_DIR)) {
  console.error(`context directory not found: ${CONTEXT_DIR}`);
  process.exit(1);
}

const files = walk(CONTEXT_DIR).filter((f) => {
  const base = f.split("/").pop()!;
  return base !== "README.md" && !base.startsWith("_template");
});
const docs = files.map(parseDoc);
const bySlug = new Map(docs.map((d) => [d.slug, d]));
const referenced = new Set<string>();

for (const doc of docs) {
  // Domain check: every file lives directly under a known domain.
  const domain = doc.rel.split("/")[0];
  if (!DOMAINS.includes(domain)) {
    errors.push(`${doc.rel}: unknown domain "${domain}" (expected one of: ${DOMAINS.join(", ")})`);
  }

  // Frontmatter contract.
  if (doc.frontmatterError) {
    errors.push(`${doc.rel}: ${doc.frontmatterError}`);
  } else if (doc.frontmatter) {
    for (const field of ["title", "description"]) {
      const value = doc.frontmatter[field];
      if (typeof value !== "string" || value.trim() === "") {
        errors.push(`${doc.rel}: missing or empty frontmatter field "${field}"`);
      }
    }
    // references: list of domain/slug (no extension).
    const refs = doc.frontmatter["references"];
    if (refs !== undefined) {
      if (!Array.isArray(refs)) {
        errors.push(`${doc.rel}: "references" must be a list`);
      } else {
        for (const ref of refs) {
          if (typeof ref !== "string") continue;
          if (ref.endsWith(".md")) {
            errors.push(`${doc.rel}: reference "${ref}" must omit the .md extension`);
          } else if (!refExists(ref)) {
            errors.push(`${doc.rel}: broken reference "${ref}"`);
          } else {
            referenced.add(ref);
          }
        }
      }
    }
  }

  // [[wikilinks]] resolve against the context root.
  for (const m of doc.body.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) {
    const target = m[1].trim();
    if (!refExists(target)) {
      errors.push(`${doc.rel}: broken wikilink [[${target}]]`);
    } else {
      referenced.add(target);
    }
  }

  // Relative markdown links to .md files resolve from the file's directory.
  for (const m of doc.body.matchAll(/\]\(([^)]+\.mdx?)(?:#[^)]*)?\)/g)) {
    const target = m[1];
    if (/^(https?:)?\/\//.test(target)) continue;
    const abs = resolve(dirname(doc.path), target);
    if (!existsSync(abs)) {
      errors.push(`${doc.rel}: broken link (${target})`);
    } else if (abs.startsWith(CONTEXT_DIR)) {
      referenced.add(relative(CONTEXT_DIR, abs).replace(/\.mdx?$/, ""));
    }
  }
}

// Orphans: nothing references them (global/ is exempt: it is the root).
for (const doc of docs) {
  if (doc.rel.startsWith("global/")) continue;
  if (!referenced.has(doc.slug)) {
    warnings.push(`${doc.rel}: orphan (no references, wikilinks, or links point here)`);
  }
}

// Staleness: last commit touching the file, falling back to mtime.
const now = Date.now();
for (const doc of docs) {
  let lastTouched: number;
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", doc.path],
      { cwd: CONTEXT_DIR, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    lastTouched = iso ? Date.parse(iso) : statSync(doc.path).mtimeMs;
  } catch {
    lastTouched = statSync(doc.path).mtimeMs;
  }
  const days = Math.floor((now - lastTouched) / 86_400_000);
  if (days > STALE_DAYS) {
    warnings.push(`${doc.rel}: stale (untouched for ${days} days)`);
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(
  `\ncontext lint: ${docs.length} files, ${errors.length} errors, ${warnings.length} warnings`,
);
process.exit(errors.length > 0 ? 1 : 0);
