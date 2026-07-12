# Initiatives

The big rocks. One file per bounded effort, with an owner, a deadline, and
success criteria you can check as true or false.

This is the connective tissue between `plan/` (the destination) and `cadence/`
(the week). An initiative is bounded: it ends. If it never ends, it is not an
initiative, it is a motion, and it belongs in `plan/strategy.md`.

## Conventions

- One file per initiative, `kebab-case.md`, from `_template.md`.
- `status: proposed | active | blocked | done | abandoned` in frontmatter. The
  lifecycle is one-way except `blocked`, which returns to `active`.
- **Success criteria must be checkable true or false.** "Improve outbound" is
  not a criterion. "Reply rate above 8 percent on 200 sends by 2026-09-30" is.
- Absolute dates everywhere.
- Every initiative names the outcome it serves in `plan/outcomes.md`.
- The log at the bottom is append-only: add dated entries, never rewrite them.
  An abandoned initiative keeps its log and records why.
