import { defineAgent } from "@cargo-ai/cdk";

import { openai } from "../connectors/openai";

// A focused sub-agent: one job, few steps. The LLM is wired by `connector`
// plus a `languageModel` slug.
export const enricher = defineAgent("enricher", {
  connector: openai,
  languageModel: "gpt-4o",
  systemPrompt:
    "You find and verify firmographic facts about a company or contact. Be precise. If you cannot verify a fact, say so instead of guessing.",
  maxSteps: 6,
  capabilities: ["webSearch"],
});
