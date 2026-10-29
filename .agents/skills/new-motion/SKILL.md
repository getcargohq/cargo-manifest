---
name: new-motion
description: Scaffold a new GTM motion end to end across all three layers. Use whenever creating a new motion, campaign, play, or automation in this repo, so the narrative (context), the implementation (infra), and the regression suite (evals) ship together and never drift apart. Enforces the outreach hypothesis rule.
---

# New motion, three layers at once

A motion is not just the automation. It is the narrative, the code, and the
guardrail. Create all three in one PR.

**On vocabulary:** a **motion** is the go-to-market move, and its narrative
lives in `context/motion/`. A **play** is a specific Cargo resource
(`definePlay`: an automation that watches a data model and runs per row). A
motion is implemented as a Cargo play, a Cargo tool, or an agent, depending on
how it is triggered. Do not confuse the two.

## Step 0: is this a campaign?

Set `kind:` in the narrative's frontmatter. It changes what you must declare.

| kind | What it is | Must declare a hypothesis? |
| --- | --- | --- |
| `outreach` | A campaign: it sends messages to humans | **Yes** |
| `enrichment` | Fills in data | No |
| `scoring` | Ranks records | No |
| `routing` | Assigns records to people | No |
| `signal` | Detects a trigger | No |

Only outreach motions are campaigns. The others declare their intent through the
outcome they serve in `plan/outcomes.md`.

## Steps

1. **Context first.** Copy `context/motion/_template.md` to
   `context/motion/<name>.md`. Fill in the trigger, the sequence, the owner, the
   success metric, and `serves:` (the outcome in `plan/outcomes.md` this makes
   real). Reference the ICP and personas with `[[icp/<slug>]]` and
   `[[persona/<slug>]]` wikilinks.

   **If `kind: outreach`, write the hypothesis before a single line of copy
   exists**: segment, angle, trigger, expected_reply_rate. This is what lets the
   result be judged against a bar set in advance rather than one invented
   afterwards. The linter fails the PR if it is missing.

   **Outreach motions may cite only `validated` or `proven` knowledge.** If the
   angle leans on a claim that is still `confidence: hypothesis`, there are two
   honest options: validate the claim first (see the `capture-feedback` skill),
   or change the angle. Never upgrade a claim just to unblock the copy.

2. **Infra second.** Pick the implementation by how it is triggered:
   - Watches a data model, runs per row: `definePlay` + `defineWorkflow`.
   - Runs on demand, or called by an agent: `defineTool` + `defineWorkflow`.
   - Reasons, decides, and calls several tools: `defineAgent`.

   The file goes in `infra/` as `<name>.ts`. `infra/` is flat by default: only
   nest (`infra/plays/`, `infra/tools/`, `infra/agents/`) once a use case has
   enough files that finding one is work, or because a cookbook you installed
   already nests. Check `infra/README.md` for what the directory looks like now
   before you decide.

   Workflow bodies are parsed, not executed: no await, no try/catch, no
   closures, no destructuring inside the body. Reference existing resources by
   imported handle, never by pasted UUID. Run `npm run typecheck`.

3. **Eval third.** If the motion calls an agent or an `ai()` step whose prompt
   you wrote, add `evals/<name>/` with representative cases and wire it into
   `evals/promptfooconfig.yaml`.

4. **Verify.** Run `npm run lint`, then open the PR. Confirm the cargo plan
   comment shows only the resources you intended to add. The narrative and the
   plan diff should tell the same story.

## Naming

Kebab-case, verb-first where possible: `inbound-router`, `churn-winback`,
`signal-to-sequence`. Same slug across all three layers.
