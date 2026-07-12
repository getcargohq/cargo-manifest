# Example: ICP list build (2026-02-03)

ACME: this is a worked example showing the shape of an outputs entry. Delete it
once you have real entries, or keep it as a reference. Everything below is
fictional.

## What ran

The `inbound-flow` play was run manually against a fresh import of 240 inbound
signups from January, to qualify them against the mid-market B2B SaaS ICP and
route each to AE, nurture, or decline.

- Play: [[play/inbound-flow]] (code in `infra/plays/inbound-flow.ts`)
- Trigger: manual batch (one-off backfill, not the scheduled run)
- Context used: [[icp/mid-market-b2b-saas]], [[persona/head-of-growth]]

## Headline result

- 240 leads processed, 233 enriched (97%), 7 failed enrichment and routed to
  nurture by rule.
- 41 routed to AE (17%), 168 to nurture, 31 declined (below employee-count floor
  or consumer domains).
- Cost: 1,180 credits, roughly 4.9 per lead.

## Where the full data lives

- Scored records: workspace storage, `contacts` model, segment "Jan inbound
  backfill" (240 rows). Not committed to git (see outputs conventions).
- Run trace and per-step spans: Cargo run history, batch id in the play's run
  log.

## What we learned (candidate for context/)

Two thirds of declines were consumer email domains, not firmographic misses.
That points at a form-capture gap upstream, not an ICP problem. If this repeats
in the next backfill, it graduates to an `insight/` note via the weekly-review
skill, with this entry as the first observation.
