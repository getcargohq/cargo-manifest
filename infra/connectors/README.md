# Connectors

Data sources and LLM providers (`defineConnector`): the integrations models,
tools, and agents read from. Key-based connectors wire their credential with
`secret("NAME")` so the value comes from the environment at deploy time and
never lands in code or state. OAuth connectors (and any you configure once in
the workspace UI) use `adopt: true` to link the existing authenticated instance
instead of creating one.

One file per connector. Reach for `adopt: true` first: a connector you have
already authorized in the workspace UI deploys with no env var, which is one
less thing to get wrong on the first deploy. Key-based ones look like
`defineConnector` with `config: { ..., accessToken: secret("YOUR_KEY") }`.
