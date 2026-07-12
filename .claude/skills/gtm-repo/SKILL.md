---
name: gtm-repo
description: How this GTM repository works. Load when orienting in this repo, deciding where a change belongs, or explaining the layer conventions to someone. Covers the six layers, the dependency direction, the PR workflow, and where each kind of change goes.
---

# Operating this GTM repo

This repo follows the Manifest framework (Manifest, by Cargo). Six layers,
strict dependency direction: infra reads context, skills read everything,
nothing depends on outputs.

## Where does a change go?

| You want to... | Touch |
| --- | --- |
| Update ICP, personas, positioning, objections, proof | `context/<domain>/*.md` |
| Change what runs in production (models, tools, plays, agents) | `infra/**/*.ts` |
| Add a repeatable procedure for agents working in this repo | `.claude/skills/<name>/SKILL.md` |
| Run a one-off operation against the workspace | `scripts/*.ts` |
| Guard an agent prompt against regressions | `evals/<agent>/` |
| Archive the result of a run, campaign, or research task | `outputs/YYYY-MM-DD-<slug>/` |

## Rules that are easy to miss

- `infra/cargo.state.json` is machine-owned. Never edit or resolve conflicts
  in it by hand; re-run the deploy instead.
- Context files need `title` and `description` frontmatter. Cross-reference
  with `references:` lists or `[[domain/slug]]` wikilinks; a bare path in
  prose creates no edge in the knowledge graph.
- Every domain has a `_template.md`. Copy it; do not invent new frontmatter
  fields.
- Deploys happen from CI on merge to main, never locally.
- Copy style everywhere: no em dashes.

## Checks before opening a PR

1. `npm run lint:context` if you touched `context/`.
2. `npm run typecheck` if you touched `infra/` or `scripts/`.
3. `npm run eval` if you touched a system prompt (needs OPENAI_API_KEY).
