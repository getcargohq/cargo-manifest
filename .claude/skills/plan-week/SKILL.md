---
name: plan-week
description: Plan the coming week in the cadence layer. Use every Monday, or whenever asked what this week should focus on. Pulls from plan/ and open initiatives/, carries over unresolved items, and writes cadence/weekly/YYYY-Www.md. Escalates anything that has slipped three weeks into a decision instead of a task.
---

# Plan the week

The week is not a wish list. It is the slice of `plan/` that gets done in the
next five days.

## Steps

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

## Rules

- Absolute dates and ISO week numbers (`2026-W29`), never "this week".
- Do not invent deals or numbers. If the CRM is not readable from here, ask
  rather than fabricate.
- If the week's work does not ladder up to the one goal in
  `plan/company-plan.md`, say so plainly instead of rationalizing it.
