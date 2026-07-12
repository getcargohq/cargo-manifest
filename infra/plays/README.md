# Plays

Per-row automations over a model (`definePlay`): a play watches a model's rows
change and runs a workflow for each one. Empty until you add one.

A play needs a model to watch, and watching is only meaningful when something
feeds that model (a connector sync, an import, a script). Reach for a play once
you have a model that actually receives new rows. For a motion you run on demand
against any input, use a tool in `infra/tools/` instead.
