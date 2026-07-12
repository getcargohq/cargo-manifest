# Scratch

Your personal space. Everything in this directory except this README is
gitignored: half-baked plays, personal prompt experiments, messy lists,
one-off scripts. Nobody sees it, nobody reviews it, no convention applies.

The shared repo stays curated because the mess has a home. Three rules:

- Shared layers never reference anything in `scratch/`. If a play, skill, or
  context file depends on it, it is not ready.
- When something in here proves itself, promote it: move it to the right
  layer (`context/`, `infra/`, `.claude/skills/`, `evals/`) and open a PR.
  Promotion is the only exit.
- Personal agent preferences do not belong in the repo at all: put personal
  skills in `~/.claude/skills/` (user scope), personal instructions in
  `CLAUDE.local.md` (gitignored), and personal settings in
  `.claude/settings.local.json`.
