# Models

Tables the workspace operates on (`defineModel`). A model is either native
(`kind: "native"`, a workspace-owned table with no external source) or
connector-backed (`connector: <handle>` + an `extractSlug`, synced from a data
source on a `schedule`). Plays, tools, agents, and segments all build on models.

Start native (`defineAccount` / `defineContact`): those deploy without a
connector or an env var, so you can have a working model before you have
credentials for anything. Move to a connector-backed model when you want the
CRM to be the source.
