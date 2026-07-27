# Agents

AI agents (`defineAgent`): an LLM connector plus everything it can read or call.
An agent references models, tools, sub-agents, and connector actions by handle,
and can carry an `evaluator` rubric. When you change an agent's system prompt,
update its suite under `../../evals/` in the same PR.

Examples here: `sdr.ts` (the main agent that qualifies inbound leads, with an
evaluator and an `evals/sdr/` suite) and `enricher.ts` (a focused sub-agent that
verifies firmographic facts). Both use the adopted `anthropic` connector on
`claude-sonnet-5`, so they deploy without an env var. Swap `connector` to
`openai` (both are adopted) to run either agent on OpenAI instead.
