---
name: seed-repo
description: Seed this template into one real company's GTM repo. Use on first run, when the repo still says Acme, or when asked to set up, seed, or personalize Manifest. Interviews in five rounds, replaces every ACME: marker and __APP_NAME__ slug, deletes the worked history, and stops for human review before the PR. Leaves TODO(owner) markers instead of inventing facts.
---

# Seed the template into a real company

The worked examples describe a company that does not exist. Replace them or
delete them; never leave an invented number sitting next to a true one.

## Step 0: has this repo been seeded already?

Grep for `ACME:` and `__APP_NAME__`, excluding `.claude` and `node_modules`
(this file names both markers and would match itself). Neither found: seeding is
done, stop and say so. Some found: an earlier run stopped early, seed only those.

## Steps

1. **Interview in five rounds, writing nothing.** Ask for the website first,
   read it, then propose answers to correct rather than asking cold. Rounds:
   identity (display name, package slug), offer (sell what, to whom, pricing,
   tone), destination (the one goal, period, forecast, bets, not-doing), buyer
   (ICP firmographics, disqualifiers, persona), evidence (one proof point).

2. **Substitute the slug.** `__APP_NAME__` in `package.json`, `manifest.json`,
   and `infra/package.json` (as `__APP_NAME__-infra`), plus four lockfile
   lines: `package-lock.json` 2 and 7, `infra/package-lock.json` 2 and 7. Skip
   the lockfiles and `npm ci` fails on a name mismatch.

3. **Rewrite the seven worked context files.** `global/company.md`,
   `icp/mid-market-b2b-saas.md`, `persona/head-of-growth.md`,
   `objection/we-already-have-dashboards.md`, `proof/case-study-initech.md`,
   `signal/hiring-gtm-engineer.md`, `motion/inbound-flow.md`. The slugs are
   Acme's: rename them, then **grep the whole repo for each old slug**. The
   linter reads only `context/`, so a stale wikilink in `plan/` breaks silently.

4. **Rewrite the narrative layers.** `plan/company-plan.md`, `plan/strategy.md`,
   `plan/outcomes.md`, `initiatives/outbound-motion.md`, and `AGENTS.md` line 1
   (the title) and line 3 (the intro). Every outcome keeps a `Becomes:`. Leave
   O2 in `plan/outcomes.md` pointing at an outreach play that does not exist yet.

5. **Rewrite the twinned prompt in one edit.** `infra/agents/sdr.ts` line 23 and
   `evals/sdr/prompt.txt` line 1 are byte-identical on purpose: the eval only
   predicts the agent because they match. Edit both, diff them, and update the
   ICP restated in `prompt.txt` line 3. Also `evals/promptfooconfig.yaml` line 5
   and `infra/mcp/gtm.ts` line 12.

6. **Delete the fictional history.** `cadence/weekly/2026-W29.md`,
   `cadence/log/2026-07-14.md`, `outputs/2026-07-10-signal-detection-first-run/`.
   Clear the rows of `cadence/carryover.md`, keep the file and its mechanism. Ask
   before deleting `outputs/2026-02-03-example-icp-list-build/`: its marker offers
   to keep it. Never touch `_template.md`, layer READMEs, or `outputs/.gitkeep`.

7. **Verify, then stop.** Run `npm run lint` and `npm --prefix infra run
   typecheck`. Report in chat: what was replaced, every `TODO(owner):` left
   standing, and the confidence of the new proof file. Open the PR and stop
   there. A human reviews the seed before anything merges or deploys.

## Rules

- Never invent a fact. A `TODO(owner):` marker is a finding, not a failure.
  Report every one you leave standing.
- Seed proof and signal at the confidence the evidence earns, not a default. A
  measured, published customer result is `proven` on day one; a belief not seen
  twice is `hypothesis`. Never round up to unblock copy.
- **A freshly seeded repo has no outreach motion, and that is correct.** New
  knowledge is `hypothesis`; outreach cites only `validated` or `proven`. Say so
  out loud: the way out is `initiatives/outbound-motion.md`, not an upgrade.
- Leave `jtbd/`, `alternative/`, `client/`, and `insight/` empty. They are
  earned, not declared: the `capture-feedback` and `weekly-review` skills fill
  them from the field.
- Do not deploy. Seeding ends at a PR.
