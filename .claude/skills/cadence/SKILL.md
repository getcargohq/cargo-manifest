---
name: cadence
description: Run the operating rhythm in cadence/. Use on Monday to plan the week, at the end of a day to log it, and on Friday to review the week and digest outputs into context. Writes cadence/weekly/YYYY-Www.md, cadence/log/YYYY-MM-DD.md, and cadence/carryover.md, and enforces the three-week escalation and the repetition rule.
---

# The operating rhythm

`cadence/` says what matters now. Three modes, one rhythm: plan on Monday, log
each day, review on Friday. Pick the mode from what the user asked for; if it is
ambiguous, ask rather than doing all three.

| Mode | When | Writes |
| --- | --- | --- |
| Plan the week | Monday, or "what should this week focus on" | `cadence/weekly/YYYY-Www.md` |
| Log the day | End of day, or a recap of what happened | `cadence/log/YYYY-MM-DD.md` |
| Review the week | Friday, or "what happened recently and what did we learn" | `outputs/YYYY-MM-DD-weekly-review/README.md` plus context edits |

## Mode: plan the week

The week is not a wish list. It is the slice of `plan/` that gets done in the
next five days.

1. **Read the destination.** `plan/company-plan.md` (the one goal, the three
   moves) and `plan/outcomes.md` (what must become true, and what each outcome
   becomes in `infra/`).

2. **Read what is already in flight.** Every `initiatives/*.md` with
   `status: active`. Note their deadlines and unmet success criteria.

3. **Read what was dropped.** `cadence/carryover.md`. For each item, bump the
   week count. **If an item has now slipped three weeks or more, do not re-list
   it as a task.** Surface it as a decision: either it gets an owner and a date
   this week, or it gets killed and moved to Resolved with the reason. An item
   that keeps slipping is a decision being avoided.

4. **Read what just happened.** The last week of `cadence/log/` entries and any
   new `outputs/` entries. What moved, what got stuck.

5. **Write `cadence/weekly/YYYY-Www.md`** from `cadence/weekly/_template.md`:
   - One **theme**. A week with two themes is two weeks pretending to be one.
   - The **outcomes** it serves, referencing `plan/outcomes.md` by id. A week
     that serves no outcome needs a very good explanation.
   - **Deals to move**, with the specific next move per account.
   - **Shipping**: what leaves the building.
   - **Carried over**, pulled from step 3.

6. **Report** the plan back in chat: theme, outcomes served, and any item you
   escalated from carryover into a decision.

If the week's work does not ladder up to the one goal in
`plan/company-plan.md`, say so plainly instead of rationalizing it.

## Mode: log the day

Two minutes, not a status report. The log exists so that next Monday's plan and
next Friday's review are written from what actually happened rather than from
memory.

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

## Mode: review the week

`outputs/` is what happened. `context/` is what we know. This mode moves
learning from the first to the second, so the repo gets smarter every week.

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

If nothing meets the repetition bar, say so; an empty context diff is a valid
review.

## Rules (all three modes)

- **Absolute dates** and ISO week numbers (`2026-W29`), never "this week".
- **Append-only.** Never edit yesterday's log or last week's outputs entry to
  make it look better; add a dated addendum instead.
- **Do not fabricate.** If the user says "good call today", ask which account
  rather than inventing an outcome. If the CRM is not readable from here, ask
  rather than invent deals or numbers.
