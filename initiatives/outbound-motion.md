---
title: Stand up the outbound motion
description: Build signal-led outbound to mid-market B2B SaaS from zero, and prove the reply-rate bet before scaling it.
status: active
owner: Head of Growth
deadline: 2026-09-30
serves: O2 in plan/outcomes.md
---

ACME: worked example. Replace with your own initiatives.

## Why now

Outbound is $0.8M of the H2 forecast and the only line we have never run. It is
the biggest bet in `plan/company-plan.md` and the one most likely to be wrong.
The sooner we test the hypothesis, the sooner we know whether the forecast holds
or the plan needs rewriting.

## Success criteria

- [ ] 200 signal-triggered sends shipped by 2026-09-15
- [ ] Reply rate above 8 percent across those sends, measured by 2026-09-30
- [ ] Every send traceable to a trigger in [[signal/hiring-gtm-engineer]], zero
      untriggered sends
- [ ] The play's written hypothesis (segment, angle, trigger, expected reply
      rate) is recorded before the first line of copy exists

## Approach

1. Ship the signal detection first: no copy until the trigger fires reliably.
2. Write the play hypothesis in `context/motion/`, with `kind: outreach`. The
   linter blocks it from citing anything that is not validated knowledge.
3. Send in waves of 50. Archive each wave in `outputs/` with its `outcome:`
   field, so the reply rate is judged against the 8 percent bar we set in
   advance and not against a number invented afterwards.

## Dependencies

- Signal detection running against the TAM (blocks everything else)
- [[proof/case-study-initech]] as the proof point the angle leans on

## Log

- 2026-07-14: Initiative opened. Hypothesis and bar set in `plan/strategy.md`:
  8 percent reply rate or the bet is wrong.
