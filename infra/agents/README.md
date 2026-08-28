# Agents

AI agents (`defineAgent`): an LLM connector plus everything it can read or call.
An agent references models, tools, sub-agents, and connector actions by handle,
and can carry an `evaluator` rubric. When you change an agent's system prompt,
update its suite under `../../evals/` in the same PR.

One file per agent. Give the agent the narrowest set of handles that lets it
do its job: an agent that can reach every model and tool is one you cannot
reason about when it goes wrong. `../../evals/sdr/` is a worked suite you can
copy for your first one.
