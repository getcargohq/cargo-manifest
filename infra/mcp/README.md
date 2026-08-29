# MCP

MCP servers (`defineMcpServer`): one endpoint that bundles tools, agents, and
models so an outside assistant (Claude Code, Cursor, a rep's assistant) can use
the GTM stack. Same reference surface as an agent: list what it exposes by
handle, with `{ ref, readOnly: true }` for read-only model access.

One server is usually enough. Expose the handful of tools and models an
outside agent actually needs rather than everything the workspace holds: this
file is a permission boundary, not an index.
