import { defineFolder } from "@cargo-ai/cdk";

// Folders are per-kind: a "models" folder and an "agents" folder are separate
// resources even when they share a display name.
export const modelsFolder = defineFolder("gtm-models", {
  kind: "model",
  name: "GTM",
});

export const agentsFolder = defineFolder("gtm-agents", {
  kind: "agent",
  name: "GTM",
});
