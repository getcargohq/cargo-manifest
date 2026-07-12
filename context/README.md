# Context

What the company knows. Every agent reads this layer before acting; every file
here is a claim you are willing to let an agent act on.

## Domains

| Domain | Holds |
| --- | --- |
| `global/` | Company, product, pricing, tone of voice, positioning |
| `icp/` | Ideal customer profiles: firmographics, pains, triggers, disqualifiers |
| `persona/` | The people inside the ICP: role, KPIs, motivations, channels |
| `jtbd/` | Jobs to be done the product is hired for |
| `alternative/` | Competitors and status-quo alternatives, with honest battlecards |
| `objection/` | Objections heard in the field and how to handle them |
| `proof/` | Case studies, quotes, numbers that back the claims |
| `signal/` | Buying signals worth monitoring and what they predict |
| `play/` | Play narratives: trigger, motion, owner, metric (code lives in `infra/plays/`) |
| `client/` | Accounts of record: won, lost, and why |
| `insight/` | Durable observations that do not fit elsewhere yet |

## Authoring rules

- One file per fact-cluster, `kebab-case.md`, inside the right domain.
- YAML frontmatter with `title` and `description` is required. Optional
  `references:` lists related files as `domain/slug` (no `.md`).
- Cross-reference with `references:`, markdown links, or `[[domain/slug]]`
  wikilinks. A bare path in prose creates no edge in the knowledge graph.
- Copy `_template.md` in each domain; do not invent frontmatter fields.
- A claim earns its place after showing up independently at least twice
  (calls, deals, campaigns). Once is an anecdote; put it in `insight/`.
- Run `npm run lint:context` before committing.
