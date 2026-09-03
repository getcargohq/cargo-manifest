import { defineContext } from "@cargo-ai/cdk";

// Brings the repo's context/ directory (one level up: the knowledge layer)
// under CDK management. Deploys sync the markdown into the workspace context
// repo, additively: files added in the UI are left in place.
//
// v0.1 contract: this push is one-way. The git repo is the source of truth;
// treat runtime context edits made by agents in the workspace as ephemeral.
// The path is resolved from THIS file, not from the working directory, so it
// points at the repo's context/ whatever directory the command was run from.
export const context = defineContext({
  path: new URL("../context", import.meta.url).pathname,
});
