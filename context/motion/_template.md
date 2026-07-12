---
title:
description:
kind: outreach
hypothesis:
  segment:
  angle:
  trigger:
  expected_reply_rate:
---

_kind: outreach | enrichment | scoring | routing | signal._

_Only outreach motions are campaigns, and only they must declare a `hypothesis`
before any copy exists: the segment, the angle, the trigger, and the reply rate
you expect. Writing it down first is what lets results be judged against a bar
set in advance instead of one invented afterwards. Delete the `hypothesis` block
for any other kind: enrichment, scoring, routing, and signal motions declare their
intent through the outcome they serve in `plan/outcomes.md`._

_Outreach motions may cite only validated or proven knowledge (see `confidence:`
in proof, signal, and insight files). The linter enforces this._

## Serves

_Which outcome in `plan/outcomes.md` this motion makes real._

## Trigger

_Cross-ref `signal/...`._

-

## Audience

_Cross-ref `icp/...` or `persona/...`._

-

## Channel

-

## Sequence

1.
2.
3.

## Proof

_Cross-ref `proof/...`. Validated or proven only, for outreach._

-

## Success metric

_What we measure. The bar, set in advance._

## Owner

_Role accountable for running this._

## Implementation

_The file in `infra/` that makes this real._
