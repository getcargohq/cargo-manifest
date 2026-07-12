# Cadence

The operating rhythm. Your week, in writing.

The knowledge layers tell agents what is **true**. The cadence layer tells them
what matters **right now**. This is what turns the repo from a wiki into an
operating system.

```
cadence/
├── weekly/         one file per week: YYYY-Www.md (e.g. 2026-W29.md)
├── log/            one file per day: YYYY-MM-DD.md
└── carryover.md    dropped balls, visible until resolved
```

## The rhythm

- **Monday: plan the week.** Use the `plan-week` skill. It pulls from `plan/`
  and open `initiatives/`, and carries over anything unresolved from
  `carryover.md`. One theme, the outcomes it serves, the deals to move.
- **Daily: log.** Use the `log-day` skill. What happened, what moved, what is
  now stuck. Two minutes, not a status report.
- **Friday: review.** Use the `weekly-review` skill. It digests `outputs/` into
  durable knowledge, and anything unfinished lands in `carryover.md`.

## Rules

- **Absolute dates in filenames and content.** `2026-07-14`, never "Tuesday".
- **Carryover is the honesty mechanism.** An item that slips three weeks in a
  row is not a task, it is a decision you are avoiding. The `plan-week` skill
  surfaces it as such.
- Weekly plans reference the outcome they serve in `plan/outcomes.md`. A week
  that serves no outcome is a week you will not be able to defend.
- Append-only in spirit: correct a past log with a dated addendum, do not
  rewrite history.
