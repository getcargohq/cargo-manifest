---
title: Outcomes
description: The concrete outcomes that must become true this period, each with an owner, a measure, and the thing it becomes in the engine.
---

ACME: worked example. Replace with your own.

Every outcome carries four fields. The one that matters most is **Becomes**: the
play, agent, or tool in `infra/` that turns the outcome from a sentence into
something that runs. An outcome with no `Becomes:` is a wish.

---

## O1. Every inbound lead is qualified and routed within 10 minutes

- **Owner:** Head of Growth
- **Measure:** median trigger-to-first-human-touch under 10 minutes; A-tier
  meeting rate above 30 percent
- **Verify:** `outputs/` weekly review reports the median from run history
- **Becomes:** `infra/qualify-inbound.ts` plus the `sdr` agent
  (`infra/sdr.ts`). Narrative: [[motion/inbound-flow]]
- **Serves:** move 2 (make the trial convert)

## O2. Outbound to mid-market runs on signals, not lists

- **Owner:** Head of Growth
- **Measure:** reply rate above 8 percent on signal-triggered outreach by
  2026-09-30. Below that, the bet in `strategy.md` is wrong.
- **Verify:** the play declares its hypothesis up front; `outputs/` entries carry
  the `outcome:` field, so results are judged against the bar we set in advance
- **Becomes:** a signal-triggered outreach play (not yet built). Trigger:
  [[signal/hiring-gtm-engineer]]
- **Serves:** move 1 (stand up outbound). Tracked in
  `initiatives/outbound-motion.md`

## O3. Account data is never the reason a rep loses time

- **Owner:** RevOps
- **Measure:** zero accounts in the qualified segment missing firmographics
- **Verify:** a stale-records segment stays empty
- **Becomes:** `infra/enrich.ts` on a refresh schedule
- **Serves:** all three moves (hygiene, not a move of its own)
