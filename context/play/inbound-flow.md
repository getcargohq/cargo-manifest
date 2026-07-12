---
title: Inbound flow
description: The play narrative for inbound handling. Demo requests and signal-fired accounts get enriched, scored, and routed within minutes. Implementation ships as a tool in infra/tools.
references:
  - icp/mid-market-b2b-saas
  - persona/head-of-growth
  - signal/hiring-gtm-engineer
---

ACME: worked example. Every motion gets one narrative file here and one
implementation in `infra/`. A play (model watch) lives in `infra/plays/`; a
motion you run on demand, like this one, ships as a tool in `infra/tools/`.
Keep the slug aligned across the narrative and the implementation.

## Trigger

- A demo request or trial signup lands, or
- [[signal/hiring-gtm-engineer]] fires on a TAM account.

## Motion

1. Enrich the account and contact (firmographics, stack, funding).
2. Score against [[icp/mid-market-b2b-saas]] fit and signal recency.
3. Route: A-tier to an AE with a research brief, B-tier to nurture,
   disqualified to a polite decline template.

## Owner

Growth engineering owns the pipeline; sales owns the first human touch.

## Success metric

Median time from trigger to first human-quality touch under 10 minutes;
A-tier meeting rate above 30 percent.

## Implementation

`infra/tools/qualify-inbound.ts` (the `qualify-inbound` tool: enrich, score,
draft a routing note). It runs on any email you pass in, so it deploys without
a CRM connector or env var. Prompt changes there require updating `evals/`.
