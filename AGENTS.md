# Acme GTM

This repository is Acme's GTM engine: knowledge, infrastructure, and run history
for the whole go-to-market, managed as code. It follows the Manifest framework
conventions (Manifest, by Cargo).

Replace "Acme" with your company everywhere. Search for `ACME:` markers to find
every placeholder that needs your input.

## Layers

| Layer | Directory | What it is |
| --- | --- | --- |
| Context | `context/` | What the company knows: the durable GTM brain every agent reads before acting. |
| Skills | `.claude/skills/` | What agents know how to do: procedures for operating this specific repo. |
| Infra | `infra/` | What runs in production: the deployed engine, declared in TypeScript, reconciled by the Cargo CDK. |
| Scripts | `scripts/` | What you run by hand: imperative glue for runtime-only surfaces the CDK cannot declare yet. |
| Evals | `evals/` | What keeps it honest: regression tests that gate prompt and agent changes in CI. |
| Outputs | `outputs/` | What happened: the append-only archive that gives agents accumulating memory and humans an audit trail. |
| Scratch | `scratch/` | Yours alone: gitignored personal space with no conventions. Shared layers must never reference it. |

Dependency direction is strict: infra reads context, skills read everything,
outputs are written by everything and read only as memory. Nothing depends on
outputs.

## Working in each layer

- `context/` holds markdown with YAML frontmatter (`title` and `description`
  required). Domains are fixed folders (icp, persona, play, ...); each has a
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
- `outputs/` entries are directories named `outputs/YYYY-MM-DD-<slug>/`. Write
  results of research, campaigns, and reviews there. Read recent entries for
  memory before starting related work. Never rewrite an existing entry.

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

- New plays: use the `new-play` skill. It creates `context/play/<name>.md`,
  `infra/plays/<name>.ts`, and `evals/<name>/` together so the three layers
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
