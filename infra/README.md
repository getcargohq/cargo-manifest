# Infra

What runs in production. A self-contained Cargo CDK project: every `.ts` file
here declares a resource, and `cargo-ai cdk deploy` reconciles the workspace to
match. Importing a file IS registration; the directory layout is convention.

It ships flat and near-empty on purpose. There is no scaffolding to delete and
no folder that exists only to hold a README.

## What is here

| File | What it does |
| --- | --- |
| `context.ts` | Brings `../context` under CDK management (`defineContext`) |
| `.gitignore` | Keeps leftover `.cargo-ai/` out; `cargo.state.json` stays in |

## Adding resources

Start from a worked example:

```bash
npx cargo-ai cdk add            # pick from the catalog
npx cargo-ai cdk add cookbook/<name>
```

A cookbook drops the files (and whatever folders it needs) into this directory,
already wired together. That is where structure comes from: use cases, not an
empty tree agreed on in advance.

To write one by hand, drop a `.ts` file here and export the resource. Group into
a folder once a use case has enough files that finding one is work. When you do,
these are the conventional names, and the ones cookbooks use:

`connectors/` (`defineConnector`), `models/` (`defineModel`), `folders/`
(`defineFolder`), `tools/` (`defineTool` + `defineWorkflow`), `agents/`
(`defineAgent`), `plays/` (`definePlay`), `mcp/` (`defineMcpServer`),
`segments/` (`defineSegment`), `workers/` (`defineWorker`), `apps/`
(`defineApp`).

Picking between the three that implement a motion: a **play** watches a model
and runs per row, a **tool** runs on demand or when an agent calls it, an
**agent** reasons and calls several tools.

## Commands (run from the repo root)

Dependencies install once, at the root. This directory has no package.json of
its own: the CDK finds it by name.

```bash
npm install      # also runs `npm run types` (skips if you are not signed in)
npm run types    # regenerate per-workspace types into .cargo-ai/
npm run info     # what the project declares, offline
npm run plan     # read-only diff: code vs live workspace
npm run deploy   # CI only; local deploy is denied by convention
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
- Agents keep the narrowest set of handles that lets them work, and an MCP
  server exposes only what an outside agent needs: both are permission
  boundaries, not indexes.
- When you change an agent's system prompt, update its suite under `../evals/`
  in the same PR.
