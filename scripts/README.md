# Scripts

What you run by hand. The rule: if the CDK can declare it, it belongs in
`infra/`; scripts are only for runtime surfaces the CDK cannot manage yet
(agent memories, workspace users, content libraries) and for CI glue.

All scripts are thin wrappers around the `cargo-ai` CLI. Run with
`npx tsx scripts/<name>.ts` from the repo root; they read credentials from
the environment (see `.env.example`).

| Script | Purpose |
| --- | --- |
| `list-memories.ts` | List an agent's runtime memories (the example wrapper) |
| `ci/lint-context.ts` | Context layer linter (also runs in CI) |
| `ci/comment-plan.ts` | Post a `cdk plan` diff as a sticky PR comment |
