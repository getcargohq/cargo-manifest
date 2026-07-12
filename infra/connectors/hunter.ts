import { defineConnector } from "@cargo-ai/cdk";

// An enrichment connector. Its actions are exposed under `hunter.actions.*`
// (findEmail, verifyEmail, ...) so agents and workflows can call them.
// Adopted: the key is configured once in the workspace UI.
export const hunter = defineConnector("hunter", {
  integration: "hunter",
  adopt: true,
});
