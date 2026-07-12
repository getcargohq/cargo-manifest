---
title: Signal detection, first run against the TAM
description: First live run of hiring-signal detection across the 340-account TAM list. Three accounts fired, all genuine.
outcome: 3 accounts triggered, 0 meetings yet (detection only, no outreach sent)
date: 2026-07-10
serves: O2 in plan/outcomes.md
---

ACME: worked example. Delete it and archive your own runs here.

## What ran

Hiring-signal detection ([[signal/hiring-gtm-engineer]]) across the 340-account
TAM list, one pass.

## Result

| Metric | Value |
| --- | --- |
| Accounts scanned | 340 |
| Triggers fired | 3 |
| False positives on manual review | 0 |
| Outreach sent | 0 (detection only, by design) |

The `outcome:` field above is what makes this entry rankable later: it states
what the run produced, not what it did. A run that produced nothing says so, and
says why.

## What we learned

Three fires out of 340 is a lower rate than the 2 to 3 percent assumed in
`initiatives/outbound-motion.md`. Not yet a problem: one pass is not a trend. If
the rate holds under 1 percent for a month, the trigger is too narrow to carry
$0.8M of the forecast, and the initiative needs a second signal.

Not promoted to context: one observation is an anecdote. See the repetition rule
in `context/README.md`.

## Where the data lives

Workspace storage, `signals` model. Not committed: raw run data does not belong
in git.
