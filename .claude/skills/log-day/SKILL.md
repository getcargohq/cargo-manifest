---
name: log-day
description: Write today's entry in the cadence log. Use at the end of a working day, or when the user recaps what happened. Captures what moved, what is stuck, and anything worth remembering, then routes stuck items to carryover and repeated observations toward context.
---

# Log the day

Two minutes, not a status report. The log exists so that next Monday's plan and
next Friday's review are written from what actually happened rather than from
memory.

## Steps

1. **Write `cadence/log/YYYY-MM-DD.md`** from `cadence/log/_template.md`:
   - **What moved.** Concrete: a call happened, a play shipped, a number
     changed. Not "worked on outbound".
   - **What is stuck.** Anything that did not resolve today.
   - **Worth remembering.** A thing you heard that might become knowledge: an
     objection, a signal, a competitor mention, a reason a deal was won.

2. **Route the stuck items.** Anything under "What is stuck" that will not
   resolve tomorrow goes into `cadence/carryover.md` with today's date and a
   week count of 1. Do not let it live only in the log, where it will be
   forgotten.

3. **Route the observations.** For each item under "Worth remembering", check
   `context/` for an existing file on the same claim:
   - **Second independent occurrence?** It clears the repetition bar. Use the
     `capture-feedback` skill to promote it into `context/` with the right
     `confidence:` level.
   - **First occurrence?** Leave it in the log. One observation is an anecdote.
     Say so, and do not write it into context.

## Rules

- Append-only. Never edit yesterday's log to make it look better; add a dated
  addendum instead.
- Absolute dates in the filename and the frontmatter.
- Do not fabricate. If the user says "good call today", ask which account rather
  than inventing an outcome.
