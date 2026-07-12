# Infra

What runs in production. A self-contained Cargo CDK project: every `.ts` file
here declares a resource, and `cargo-ai cdk deploy` reconciles the workspace to
match.

## Commands (run from this directory)

```bash
npm install
npx cargo-ai cdk types    # generate per-workspace types into .cargo-ai/
npx cargo-ai cdk plan     # read-only diff: code vs live workspace
npx cargo-ai cdk deploy   # CI only; local deploy is denied by convention
```

## Rules

- `cargo.state.json` appears after the first deploy and links code to live
  UUIDs. Commit it. Never edit it by hand.
- Secrets come from the environment via `secret()`; non-secret config via
  `env()`. Values never land in code, state, or git.
- Deploys run from CI on merge to main (`.github/workflows/cargo-deploy.yml`).
- Reference resources by imported handle, never by pasted UUID. Use the
  `*Ref("uuid")` helpers only for resources that live outside this repo.
- Workflow bodies (`defineWorkflow`) are parsed and compiled to a node DAG,
  never executed at build time: no `await`, `try/catch`, closures, or
  destructuring inside the body.

## Layout

| Directory | Resource |
| --- | --- |
| `connectors/` | Data sources and LLM providers (`defineConnector`) |
| `models/` | Tables, native or connector-sourced (`defineModel`) |
| `folders/` | Workspace organization (`defineFolder`) |
| `tools/` | Workflow-backed tools (`defineTool` + `defineWorkflow`) |
| `agents/` | AI agents (`defineAgent`) |
| `plays/` | Per-row automations over models (`definePlay`) |
| `mcp/` | MCP servers exposing the stack to outside agents (`defineMcpServer`) |
| `segments/` | Saved views over models (`defineSegment`), empty until you add one |
| `workers/` | Hosted edge workers (`defineWorker`), empty until you add one |
| `apps/` | Hosted Vite apps (`defineApp`), empty until you add one |
| `context.ts` | Brings `../context` under CDK management (`defineContext`) |
