---
title: Outcomes
description: The concrete outcomes that must become true this period, each with an owner, a number an agent can calculate, and the thing it becomes in the engine.
---

Every outcome carries eight fields. The one that matters most is **Becomes**:
the play, agent, or tool in `infra/` that turns the outcome from a sentence into
something that runs. An outcome with no `Becomes:` is a wish.

When an agent owns an outcome, it carries six more. A person given a target
fills in the gaps from experience. An agent fills them in with whatever is
cheapest: it chases a number it can calculate instead of the one you meant,
and it hits the target in ways you would never approve. The second block is
what lets an agent experiment toward the target without a person approving
every step, and what stops it from getting there the wrong way.

Number them `O1`, `O2`, `O3`. The rest of the repo cites them by that number:
`cadence/weekly/` entries and `outputs/` entries both carry
`serves: O<n> in plan/outcomes.md`, so the numbering is an interface.

---

## O1. _The outcome, as a sentence that is true or false_

- **Why:** _one or two sentences on what this outcome is for. When the plan
  meets a case it did not foresee, this is what a person or an agent falls
  back on_
- **Owner:** _one named person, not a team. The person who approves what an
  agent proposes for this outcome_
- **Metric:** _the number, defined so it can be calculated without asking
  anyone: the source, the filters, the window. "Sum of amount on CRM
  opportunities created in the window, stage Discovery or later, renewals
  excluded", never "qualified pipeline"_
- **Baseline:** _the metric over a comparable past window, with the window's
  absolute dates. Calculated, not remembered_
- **Target:** _the number and the absolute date it must be true by. "At least
  1.5x the baseline by YYYY-MM-DD", never "improve X"_
- **Verify:** _where the number is read from, so it is checkable without
  asking anyone_
- **Becomes:** _the file in `infra/` that makes it real, e.g.
  `infra/qualify-inbound.ts` plus an agent. Write "not yet built" if it is not,
  and that is the backlog. When an agent owns the outcome, name the agent and
  the plays it starts with: new plays arrive later as proposed initiatives_
- **Serves:** _which of the three moves in `company-plan.md`_

When an agent owns this outcome, add:

- **Weekly signal:** _the leading number checked every week, and the weekly
  pace the target needs. A six-month target gives clear feedback twice; this
  gives it every week. The agent reports it as an `outputs/` entry that
  serves this outcome_
- **Guardrails:** _the numbers that must not get worse while the target moves,
  each with its threshold. At least one guards against inflating the metric
  itself: for pipeline, the share that reaches the next stage_
- **Experiment budget:** _what the agent may test without asking, approved
  once: share of volume, accounts per test, minimum duration, spend. Every test
  writes its success bar down before it starts_
- **Agent may:** _what it does alone, beyond running tests inside the budget,
  e.g. reorder a queue, pause a test that breaches a guardrail_
- **Agent proposes:** _what needs the owner's approval, e.g. a new segment,
  a change to who counts as a fit, a routing rule or a message, a new
  initiative_
- **Escalate when:** _the pace below which the agent must flag the outcome as
  at risk, and the date it checks, e.g. "under 1.2x of the baseline pace at
  week 8". The agent may argue the target is wrong. It never changes it_
