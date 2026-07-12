---
name: weekly-review
description: Digest the outputs archive into durable context. Use for the weekly GTM review, or whenever asked what happened recently and what we learned. Reads recent outputs entries, summarizes results, and proposes context updates as a PR. This is the repo's memory flywheel.
---

# Weekly review: outputs to context

`outputs/` is what happened. `context/` is what we know. This skill moves
learning from the first to the second, so the repo gets smarter every week.

## Steps

1. **Collect.** List `outputs/` entries from the last 7 days (directory names
   start with the date). Read each entry's summary.

2. **Summarize.** Write `outputs/YYYY-MM-DD-weekly-review/README.md` with:
   - What ran (plays, campaigns, research) and headline numbers.
   - What worked, what failed, with evidence.
   - Open questions.

3. **Extract durable learning.** For each finding that changes what we know,
   propose the matching context edit:
   - A new objection heard twice or more: `context/objection/<slug>.md`.
   - A win or loss with a clear reason: update `context/client/` and
     `context/proof/`.
   - A signal that predicted a conversion: `context/signal/<slug>.md`.
   - Messaging that outperformed: note it in the relevant `context/motion/`.
   Apply the repetition rule: a claim goes into context after it shows up
   independently at least twice. Once is an anecdote.

4. **Ship.** One PR: the review entry in `outputs/` plus the proposed context
   edits. The PR description separates "observed" (outputs) from "concluded"
   (context changes) so reviewers can push back on conclusions.

## Rules

- Outputs entries are append-only. Never rewrite last week's entry.
- If nothing meets the repetition bar, say so; an empty context diff is a
  valid review.
