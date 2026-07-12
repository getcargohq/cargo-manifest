# Models

Tables the workspace operates on (`defineModel`). A model is either native
(`kind: "native"`, a workspace-owned table with no external source) or
connector-backed (`connector: <handle>` + an `extractSlug`, synced from a data
source on a `schedule`). Plays, tools, agents, and segments all build on models.

Examples here: `accounts.ts` and `contacts.ts`, both native (`defineAccount` /
`defineContact`) so they deploy without a connector or env var. Each file
comments the shape to switch to a connector-backed model when you want CRM sync.
