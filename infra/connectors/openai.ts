import { defineConnector } from "@cargo-ai/cdk";

// The LLM provider. OAuth/key-based connectors that can't be declared in code
// use `adopt: true`: the reconciler links the existing authenticated connector
// by slug instead of creating one. Agents reference it by handle.
export const openai = defineConnector("open_ai", {
  integration: "openAi",
  adopt: true,
});
