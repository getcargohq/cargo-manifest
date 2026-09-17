---
title: Outcomes
description: The concrete outcomes that must become true this period, each with an owner, a measure, and the thing it becomes in the engine.
---

Every outcome carries five fields. The one that matters most is **Becomes**: the
play, agent, or tool in `infra/` that turns the outcome from a sentence into
something that runs. An outcome with no `Becomes:` is a wish.

Number them `O1`, `O2`, `O3`. The rest of the repo cites them by that number:
`cadence/weekly/` entries and `outputs/` entries both carry
`serves: O<n> in plan/outcomes.md`, so the numbering is an interface.

---

## O1. _The outcome, as a sentence that is true or false_

- **Owner:** _one named person, not a team_
- **Measure:** _a number and an absolute date. "Median X under Y by
  YYYY-MM-DD", never "improve X"_
- **Verify:** _where the number is read from, so it is checkable without
  asking anyone_
- **Becomes:** _the file in `infra/` that makes it real, e.g.
  `infra/qualify-inbound.ts` plus an agent. Write "not yet built" if it is not,
  and that is the backlog_
- **Serves:** _which of the three moves in `company-plan.md`_
