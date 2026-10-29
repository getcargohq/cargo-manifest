---
name: context-hygiene
description: Audit and repair the context layer. Use when asked to clean up context, before a quarterly review, or when the knowledge graph feels stale. Finds missing frontmatter, broken references, orphan files, and stale content, then fixes them file by file.
---

# Context hygiene pass

The context layer is only useful if agents can trust it. Run this audit
periodically or when onboarding a new team member.

## Steps

1. **Mechanical lint.** Run `npm run lint:context`. Fix every error (missing
   `title`/`description`, broken `references:` entries, broken wikilinks or
   relative links). Errors block CI; do these first.

2. **Orphans.** The linter warns about files nothing references. For each
   orphan, decide: link it from the file that should own the relationship,
   or delete it if it no longer earns its place. Do not leave orphans standing.

3. **Staleness.** The linter warns about files untouched for more than 90
   days. For each, check it against reality: recent won/lost deals in
   `context/client/`, current pricing, live positioning. Update the file or
   add a dated note explaining why it is still accurate.

4. **Contradictions.** Read `global/` and `icp/` together and flag claims that
   conflict (two different ICPs, outdated competitor claims in
   `alternative/`). Surface contradictions to the team in the PR description
   rather than silently picking a side.

5. **Ship it.** One PR titled `context: hygiene pass YYYY-MM-DD`, with a
   summary table: files fixed, orphans resolved, stale files refreshed,
   contradictions flagged.

## Rules

- Never invent facts to fill a template. An honest gap beats a plausible lie;
  leave the section empty with a `TODO(owner):` marker.
- Preserve frontmatter fields you do not understand.
