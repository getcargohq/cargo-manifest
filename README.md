# Manifest

**Your GTM is a codebase. Own it.**

Manifest is the repo framework for GTM engineering, by [Cargo](https://getcargo.io).
It gives your go-to-market the structure of a software project: knowledge,
infrastructure, agent skills, evals, and run history in one version-controlled
repository that both humans and coding agents can operate.

A manifest is the shipping document that declares everything a vessel carries.
This repo is exactly that for your GTM engine.

## 60-second start

```bash
git clone https://github.com/getcargohq/cargo-manifest acme-gtm
cd acme-gtm
npm install
claude .        # or `cursor .`, or `codex`, or any agent that reads AGENTS.md
```

Then tell your agent: "read AGENTS.md and help me seed the context layer for my
company." Search for `ACME:` markers to find every placeholder.

Have a Cargo workspace? Wire it up:

```bash
cd infra && npm install
npx cargo-ai cdk plan     # read-only diff of code vs workspace
```

No Cargo workspace yet? Everything except `infra/` works standalone: the
context taxonomy, the linter, the skills, the outputs discipline. Add the
execution layer later at [getcargo.io](https://getcargo.io).

## The layers

| Layer | Directory | One sentence |
| --- | --- | --- |
| Context | `context/` | What the company knows. |
| Skills | `.claude/skills/` | What agents know how to do here. |
| Infra | `infra/` | What runs in production. |
| Scripts | `scripts/` | What you run by hand. |
| Evals | `evals/` | What keeps it honest. |
| Outputs | `outputs/` | What happened. |
| Scratch | `scratch/` | Yours alone, gitignored. |

The full contract lives in [AGENTS.md](AGENTS.md), which every coding agent
reads on entry.

## Shared vs personal

The shared layers stay clean because personal mess has a home. `scratch/` is
gitignored: experiments, half-baked plays, private lists. Personal skills go
in `~/.claude/skills/`, personal instructions in `CLAUDE.local.md`. Nothing
enters a shared layer except through a PR, once it has proven itself. See
[scratch/README.md](scratch/README.md).

## How changes ship

Pull requests are the unit of change, for knowledge and infrastructure alike:

- Touch `context/`: CI lints frontmatter and cross-references.
- Touch `infra/`: CI runs `cargo-ai cdk plan` and comments the diff on the PR.
  Merging to main deploys. Local deploys are denied by convention.
- Touch `infra/agents/` or `evals/`: CI runs the promptfoo suites (opt-in,
  see `.github/workflows/evals.yml`).

## Conventions this repo follows

- [AGENTS.md](https://agents.md) as the canonical, agent-agnostic instruction
  file. Claude Code, Cursor, and Codex all read it on entry (Cursor also reads
  `CLAUDE.md`, which just imports it).
- Agent Skills (`.claude/skills/*/SKILL.md`) for repo-local procedures. Cursor
  reads these too.
- Cargo CDK for declarative workspace infrastructure.
- promptfoo for prompt regression tests.

### Per-agent setup

`AGENTS.md` is the shared brain; each agent gets a thin, tool-specific layer
for the pieces `AGENTS.md` cannot express (MCP wiring, sandbox and deploy
guardrails). All three point at the same Cargo MCP server and enforce the same
"no local deploy" rule.

| Agent | Instructions | MCP server | Deploy guardrail (hard block) |
| --- | --- | --- | --- |
| Claude Code | `AGENTS.md` (via `CLAUDE.md`) | `.mcp.json` | `.claude/settings.json` denies `cdk deploy`/`destroy` |
| Cursor | `AGENTS.md` + `.cursor/rules/*.mdc` | `.cursor/mcp.json` | `beforeShellExecution` hook (`.cursor/hooks.json` + `.cursor/hooks/deny-local-deploy.py`), plus the always-applied `.cursor/rules/manifest-guardrails.mdc` |
| Codex | `AGENTS.md` | `.codex/config.toml` | `PreToolUse` hook (`.codex/config.toml` + `.codex/hooks/deny-local-deploy.py`), plus a workspace-write sandbox with on-request approvals |

Every agent hard-blocks a local `cargo-ai cdk deploy` / `cdk destroy`: deploys
run from CI on merge to main only. In Codex, run `/hooks` once to review and
trust the project hook before it takes effect.

Export `CARGO_API_KEY` in your shell so every agent can reach the Cargo MCP
server.

## License

MIT. Copy it, fork it, make it yours. That is the point.
