# Connectors

Data sources and LLM providers (`defineConnector`): the integrations models,
tools, and agents read from. Key-based connectors wire their credential with
`secret("NAME")` so the value comes from the environment at deploy time and
never lands in code or state. OAuth connectors (and any you configure once in
the workspace UI) use `adopt: true` to link the existing authenticated instance
instead of creating one.

Examples here: `openai.ts` (LLM provider, adopted) and `hunter.ts` (enrichment,
adopted). Both are env-var-free. Add a CRM the same way: `defineConnector` with
`config: { ..., accessToken: secret("YOUR_KEY") }`.
