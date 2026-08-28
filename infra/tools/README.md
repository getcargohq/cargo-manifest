# Tools

Workflow-backed tools (`defineTool` + `defineWorkflow`): a named, callable
capability an agent, an MCP client, or a person can invoke on demand. The
`defineWorkflow` body is parsed and compiled to a node DAG, never executed at
build time, so keep it to the supported subset (no `await`, `try/catch`,
closures, or destructuring inside the body).

A tool is the right home for a motion you run per input; reach for a play
(`../plays/`) when you want it to fire as a model's rows change. That choice is
worth making deliberately — it is the difference between something you invoke
and something that invokes itself.
