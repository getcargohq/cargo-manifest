---
name: new-play
description: Scaffold a new GTM play end to end across all three layers. Use whenever creating a new play, automation, or motion in this repo, so the narrative (context), the implementation (infra), and the regression suite (evals) ship together and never drift apart.
---

# New play, three layers at once

A play is not just the automation. It is the narrative, the code, and the
guardrail. Create all three in one PR.

## Steps

1. **Context first.** Copy `context/play/_template.md` to
   `context/play/<name>.md`. Fill in: the trigger, the motion, the owner, the
   success metric. Reference the ICP and personas it targets with
   `[[icp/<slug>]]` and `[[persona/<slug>]]` wikilinks.

2. **Infra second.** Create `infra/plays/<name>.ts`:
   - `defineWorkflow` for the per-row logic (parsed, not executed: no await,
     no try/catch, no closures in the body).
   - `definePlay` binding it to a model with `changeKinds` and a `schedule`.
   - Reference existing handles (models, tools, agents) by import. Never paste
     UUIDs; use `*Ref("uuid")` helpers only for resources not defined in code.
   - Run `npm --prefix infra run typecheck`.

3. **Eval third.** If the play calls an agent or `ai()` step whose prompt you
   wrote, add `evals/<name>/` with representative cases and wire it into
   `evals/promptfooconfig.yaml`.

4. **Verify.** Open the PR. Confirm the `cargo plan` comment shows only the
   resources you intended to add. The play narrative and the plan diff should
   tell the same story.

## Naming

Kebab-case, verb-first where possible: `inbound-router`, `churn-winback`,
`signal-to-sequence`. Same slug across all three layers.
