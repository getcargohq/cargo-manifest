# Acme GTM

This repository is Acme's GTM engine: knowledge, infrastructure, and run history
for the whole go-to-market, managed as code. It follows the Manifest framework
conventions (Manifest, by Cargo).

On first run, use the `seed-repo` skill: it interviews you and replaces every
Acme placeholder and the package-name slug with your company. To do it by hand,
grep the repo for the Acme markers (each flags a spot that needs your input) and
for the package-name placeholder in package.json.

## Layers

| Layer | Directory | What it is |
| --- | --- | --- |
| Plan | `plan/` | The destination: the one goal, the strategy, and the outcomes that must become true. Each outcome names what it becomes in `infra/`. |
| Context | `context/` | What the company knows: the durable GTM brain every agent reads before acting. |
| Initiatives | `initiatives/` | The big rocks: bounded efforts with an owner, a deadline, and success criteria checkable as true or false. |
| Cadence | `cadence/` | The operating rhythm: weekly plans, daily logs, and the carryover file that keeps dropped balls visible. Knowledge says what is true; cadence says what matters now. |
| Skills | `.claude/skills/` | What agents know how to do: procedures for operating this specific repo. |
| Infra | `infra/` | What runs in production: the deployed engine, declared in TypeScript, reconciled by the Cargo CDK. |
| Scripts | `scripts/` | What you run by hand: imperative glue for runtime-only surfaces the CDK cannot declare yet. |
| Evals | `evals/` | What keeps it honest: regression tests that gate prompt and agent changes in CI. |
| Outputs | `outputs/` | What happened: the append-only archive that gives agents accumulating memory and humans an audit trail. |
| Scratch | `scratch/` | Yours alone: gitignored personal space with no conventions. Shared layers must never reference it. |

Dependency direction is strict: infra reads context, skills read everything,
outputs are written by everything and read only as memory. Nothing depends on
outputs.

## Read order

Before acting: `plan/` (where we are going) then `cadence/` (what matters this
week) then `context/` (what we know). Then the layer you are changing. An agent
that writes copy without reading `context/` will sound like a generic bot.

## Working in each layer

- `plan/` holds three files and no more. Every outcome carries an owner, a
  measure, and a `Becomes:` naming the play, agent, or tool in `infra/` that
  makes it real. An outcome with no `Becomes:` is a wish.
- `initiatives/` is one file per bounded effort, from `_template.md`. Success
  criteria must be checkable true or false. The log is append-only.
- `cadence/` is `weekly/YYYY-Www.md`, `log/YYYY-MM-DD.md`, and `carryover.md`.
  Use the `plan-week` and `log-day` skills. An item in carryover for three weeks
  is a decision being avoided, not a task: escalate it.
- `context/` holds markdown with YAML frontmatter (`title` and `description`
  required). Domains are fixed folders (icp, persona, motion, ...); each has a
  `_template.md`. Cross-reference other files with `references:` in frontmatter
  or `[[domain/slug]]` wikilinks. Run `npm run lint:context` before committing.
- `infra/` is a self-contained Cargo CDK project. Importing a `.ts` file IS
  registration; the directory layout is convention. NEVER edit
  `infra/cargo.state.json` by hand. Secrets come from the environment via
  `secret()` and `env()`; never commit values.
- `scripts/` is for one-off imperative operations against the workspace
  (memories, users, content libraries). If the CDK can declare it, it belongs
  in `infra/` instead.
- `evals/` uses promptfoo. When you change a system prompt in `infra/agents/`,
  update or extend the matching suite in `evals/`.
- `outputs/` entries are directories named `outputs/YYYY-MM-DD-<slug>/`, each
  with a `README.md` carrying an **`outcome:`** field (meetings, replies,
  pipeline attributed, or "none" with a reason). That field is what lets motions
  be ranked by results instead of opinions. Read recent entries for memory
  before starting related work. Never rewrite an existing entry.

## Workflow

1. Change `context/` or `infra/` on a branch and open a PR.
2. CI runs `cargo-ai cdk plan` and posts the diff as a comment. Review it the
   way you would review a terraform plan.
3. Merging to main deploys. Never run `cargo-ai cdk deploy` locally against
   production. Local deploy is denied by convention and hard-blocked per agent:
   Claude Code (`.claude/settings.json`), Cursor
   (`.cursor/rules/manifest-guardrails.mdc`), and Codex (`.codex/config.toml`
   sandbox).

## Rules

- **The confidence ladder.** Files in `proof/`, `signal/`, and `insight/` carry
  `confidence: hypothesis | validated | proven`. **Outreach motions may cite only
  `validated` or `proven` knowledge**: the linter fails the PR otherwise. A
  claim earns `validated` on its second independent occurrence. Once is an
  anecdote. Use the `capture-feedback` skill; never upgrade a claim just to
  unblock copy.
- **Outreach motions declare a hypothesis before any copy exists**: segment,
  angle, trigger, expected_reply_rate. Enrichment, scoring, routing, and signal
  plays are not campaigns and are exempt: they declare intent through the
  outcome they serve in `plan/outcomes.md`. Every motion sets `kind:`.
- **Absolute dates everywhere.** `2026-07-14`, never "next quarter".
- **Append-only history.** Outputs and logs are corrected with a dated addendum,
  never rewritten. A major context rewrite archives the prior version instead of
  overwriting it.
- New motions: use the `new-motion` skill. It creates `context/motion/<name>.md`, the
  implementation in `infra/`, and `evals/<name>/` together so the three layers
  never drift apart.
- Copy style: no em dashes anywhere. Use colons, parentheses, commas, or split
  the sentence.
- When a task produces a real-world result (a list built, a campaign shipped, a
  research brief), archive it under `outputs/` before finishing.
- Personal vs shared: experiments and personal mess go in `scratch/`
  (gitignored), personal skills in `~/.claude/skills/`, personal instructions
  in `CLAUDE.local.md`. Work enters the shared layers only through a PR, once
  it has proven itself. If asked to save something and it is not clearly
  team-ready, default to `scratch/`.
