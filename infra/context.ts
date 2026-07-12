import { defineContext } from "@cargo-ai/cdk";

// Brings the repo's context/ directory (one level up: the knowledge layer)
// under CDK management. Deploys sync the markdown into the workspace context
// repo, additively: files added in the UI are left in place.
//
// v0.1 contract: this push is one-way. The git repo is the source of truth;
// treat runtime context edits made by agents in the workspace as ephemeral.
export const context = defineContext({ dir: "../context" });
