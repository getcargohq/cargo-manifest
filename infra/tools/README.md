# Tools

Workflow-backed tools (`defineTool` + `defineWorkflow`): a named, callable
capability an agent, an MCP client, or a person can invoke on demand. The
`defineWorkflow` body is parsed and compiled to a node DAG, never executed at
build time, so keep it to the supported subset (no `await`, `try/catch`,
closures, or destructuring inside the body).

Examples here: `enrich.ts` (verify + enrich a contact) and `qualify-inbound.ts`
(the inbound flow as an on-demand tool: enrich, score against the ICP, draft a
routing note). A tool is the right home for a motion you run per input; reach
for a play (`../plays/`) when you want it to fire as a model's rows change.
