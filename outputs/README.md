# Outputs

What happened. The append-only archive of everything the GTM engine and its
operators produced: research briefs, campaign results, list builds, weekly
reviews. This is the repo's accumulating memory.

## Conventions

- One directory per artifact: `outputs/YYYY-MM-DD-<slug>/`.
- Every entry has a `README.md` stating: what ran, the headline result, and
  where the full data lives (files in the entry, or a link).
- Append-only. Never rewrite or delete an existing entry; correct it with a
  dated addendum.
- Agents: before starting research, a campaign, or a review, read the recent
  entries here for prior art. After finishing, write your entry.
- Learning graduates upward: durable conclusions move to `context/` via the
  `weekly-review` skill, with the outputs entry as evidence.
- Large raw data (CSVs over a few MB) goes to workspace storage, not git;
  the entry links to it.
