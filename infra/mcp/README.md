# MCP

MCP servers (`defineMcpServer`): one endpoint that bundles tools, agents, and
models so an outside assistant (Claude Code, Cursor, a rep's assistant) can use
the GTM stack. Same reference surface as an agent: list what it exposes by
handle, with `{ ref, readOnly: true }` for read-only model access.

Example here: `gtm.ts` exposes the `enrich` and `qualify-inbound` tools, the
`sdr` agent, and the `accounts` and `contacts` models (read-only).
