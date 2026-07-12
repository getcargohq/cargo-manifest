# Plan

The destination. Three files, and no more: the number you are chasing, how
revenue actually gets won, and the concrete outcomes that must become true.

| File | Answers |
| --- | --- |
| `company-plan.md` | What is the one goal this period, what is the forecast, what are the three moves that get us there? |
| `strategy.md` | Who do we sell to, how, what are we betting on, and what are we explicitly NOT doing? |
| `outcomes.md` | What must become true, who owns it, how do we verify it, and what does it become in `infra/`? |

## Rules

- **Every outcome names what it becomes.** The `Becomes:` field points at the
  play, agent, or tool in `infra/` that makes it real. An outcome with no
  `Becomes:` is a wish, not a plan.
- **Absolute dates.** "By 2026-09-30", never "next quarter".
- This layer is the input to `cadence/`: the weekly plan pulls from here and
  from open `initiatives/`.
- Replaces the strategy deck that goes stale a week after the offsite, because
  here the plan is checked against reality continuously.
