---
name: gtm-repo
description: How this GTM repository works. Load when orienting in this repo, deciding where a change belongs, or explaining the layer conventions to someone. Covers the layers, the dependency direction, the PR workflow, the confidence ladder, and where each kind of change goes.
---

# Operating this GTM repo

This repo follows the Manifest framework (Manifest, by Cargo). Strict dependency
direction: infra reads context, skills read everything, nothing depends on
outputs.

## Where does a change go?

| You want to... | Touch |
| --- | --- |
| Turn this template into your company's repo (first run) | the `seed-repo` skill |
| Set the goal, the forecast, or what we are not doing | `plan/` |
| Start a bounded effort with a deadline and success criteria | `initiatives/<name>.md` |
| Plan the week, log the day, track a dropped ball | `cadence/` |
| Update ICP, personas, positioning, objections, proof | `context/<domain>/*.md` |
| Change what runs in production (models, tools, plays, agents) | `infra/**/*.ts` |
| Add a repeatable procedure for agents working in this repo | `.claude/skills/<name>/SKILL.md` |
| Run a one-off operation against the workspace | `scripts/*.ts` |
| Guard an agent prompt against regressions | `evals/<agent>/` |
| Archive the result of a run, campaign, or research task | `outputs/YYYY-MM-DD-<slug>/` |
| Keep a half-baked experiment to yourself | `scratch/` (gitignored) |

## Rules that are easy to miss

- **The confidence ladder.** Files in `proof/`, `signal/`, and `insight/` carry
  `confidence: hypothesis | validated | proven`. **Outreach motions may cite only
  `validated` or `proven`.** The linter enforces it. Use the `capture-feedback`
  skill to promote a claim, and only on a second independent occurrence.
- **Outreach motions declare a hypothesis before any copy exists**: segment,
  angle, trigger, expected_reply_rate. Enrichment, scoring, routing, and signal
  motions are not campaigns and are exempt: they declare intent through the
  outcome they serve in `plan/outcomes.md`. Set `kind:` on every motion.
- **Motion vs play.** A **motion** is the GTM move; its narrative lives in
  `context/motion/`. A **play** is a Cargo resource (`definePlay`: watches a
  data model, runs per row). A motion is implemented as a Cargo play, tool, or
  agent. Do not confuse them.
- **Every outcome in `plan/outcomes.md` names what it becomes** in `infra/`. An
  outcome with no `Becomes:` is a wish.
- **`outputs/` entries carry an `outcome:` field** (meetings, replies, pipeline
  attributed), so motions are ranked by results rather than opinions.
- **Absolute dates everywhere.** `2026-07-14`, never "last Tuesday".
- **Outputs are append-only.** Correct with a dated addendum. Major context
  rewrites archive the prior version instead of overwriting it.
- `infra/cargo.state.json` is machine-owned. Never edit it or resolve its
  conflicts by hand; re-run the deploy instead.
- Every context domain has a `_template.md`. Copy it; do not invent frontmatter
  fields.
- Deploys happen from CI on merge to main, never locally.
- Copy style everywhere: no em dashes.

## Checks before opening a PR

1. `npm run lint` (context, outputs, and copy style) if you touched `context/`,
   `outputs/`, or any prose.
2. `npm run typecheck` if you touched `infra/` or `scripts/`.
3. `npm run eval` if you touched a system prompt (needs OPENAI_API_KEY).
