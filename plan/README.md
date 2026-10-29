# Plan

The destination. Three files, and no more: the number you are chasing, how
revenue actually gets won, and the concrete outcomes that must become true.

| File | Answers |
| --- | --- |
| `company-plan.md` | What is the one goal this period, what is the forecast, what are the three moves that get us there? |
| `strategy.md` | Who do we sell to, how, what are we betting on, and what are we explicitly NOT doing? |
| `outcomes.md` | What must become true, who owns it, what number proves it, and what does it become in `infra/`? When an agent owns it: what may it try alone, and when must it raise its hand? |

## Rules

- **Every outcome names what it becomes.** The `Becomes:` field points at the
  play, agent, or tool in `infra/` that makes it real. An outcome with no
  `Becomes:` is a wish, not a plan.
- **A number an agent can calculate.** The `Metric:` is defined by its source,
  filters and window, so anyone, human or agent, gets the same number. If an
  agent cannot calculate it, it will chase a number it can.
- **Test an outcome before an agent owns it.** Ask the agent to calculate the
  baseline and restate the outcome in its own words. If it cannot calculate the
  baseline, the `Metric:` is not defined yet. If its restatement differs from
  yours, the outcome is ambiguous. Fix it before anything runs.
- **One outcome per agent.** An agent serving two outcomes trades one against
  the other however it likes. If it must serve two, the outcome says which one
  wins when they conflict.
- **`plan/` is a person's decision.** An agent may propose a change to an
  outcome, with its evidence, in a pull request. It never changes its own
  target, metric or guardrails.
- **Absolute dates.** "By 2026-09-30", never "next quarter".
- This layer is the input to `cadence/`: the weekly plan pulls from here and
  from open `initiatives/`.
- Replaces the strategy deck that goes stale a week after the offsite, because
  here the plan is checked against reality continuously.
