import { defineAgent } from "@cargo-ai/cdk";

import { anthropic } from "../connectors/anthropic";
import { hunter } from "../connectors/hunter";
import { agentsFolder } from "../folders/gtm";
import { contacts } from "../models/contacts";
import { enrich } from "../tools/enrich";
import { enricher } from "./enricher";

// The main agent. Everything it can call or read is one `uses` array: a data
// model, a tool, a sub-agent, a connector action. Each entry is a handle, bare
// or `{ ref, ...options }` when it needs per-call options; the reconciler
// deploys dependencies first and injects their uuids.
//
// The system prompt tells it to ground every claim in the context layer; the
// context repo is deployed alongside (see ../context.ts). Prompt changes here
// require updating evals/sdr/ (see the new-motion skill).
export const sdr = defineAgent("sdr", {
  color: "blue",
  connector: anthropic,
  languageModel: "claude-sonnet-5",
  systemPrompt: [
    "You qualify inbound leads for Acme.",
    "Ground every judgment in the workspace context: the ICP definition, personas, and disqualifiers.",
    "For each lead: enrich missing info, score fit against the ICP, and recommend a route (AE, nurture, or decline) with a one-paragraph rationale.",
    "Never invent firmographic facts. If enrichment fails, route to nurture and say why.",
  ].join(" "),
  maxSteps: 12,
  capabilities: ["webSearch", "memory"],
  uses: [
    { ref: contacts, readOnly: true },
    enrich,
    { ref: enricher, waitUntilFinished: true },
    hunter.actions.findEmail,
  ],
  folder: agentsFolder,
  evaluator: {
    rubric:
      "Did it qualify the lead against the documented ICP, with verified facts and a clear routing rationale?",
    threshold: 0.8,
  },
});
