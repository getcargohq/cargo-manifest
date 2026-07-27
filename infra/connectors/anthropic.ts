import { defineConnector } from "@cargo-ai/cdk";

// The default LLM provider. Like `openai`, this adopts the existing
// authenticated connector by slug (`adopt: true`) rather than creating one, so
// the Anthropic key is configured once in the workspace UI. Swap any agent's
// `connector` to `openai` (see ./openai.ts) to run it on OpenAI instead: the
// two are interchangeable, which is the point.
export const anthropic = defineConnector("anthropic", {
  integration: "anthropic",
  adopt: true,
});
