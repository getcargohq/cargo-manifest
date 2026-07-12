import { defineTool, defineWorkflow } from "@cargo-ai/cdk";
import { z } from "zod";

import { enrich } from "./enrich";

// The inbound flow, implemented as an on-demand TOOL instead of a model-watch
// play. A play watches a data model's rows change, which in practice means a
// connector-fed model (and the env var behind its CRM). A tool has no such
// dependency: it runs the same qualify motion on any email you pass in, so it
// deploys env-var-free and can be called from an agent, the GTM MCP server, or
// by hand.
//
// Narrative: context/play/inbound-flow.md (same story, tool implementation).
// The body is compiled to a node graph, never executed here.
const qualifyInboundFlow = defineWorkflow(
  "qualify-inbound-contact",
  {
    input: z.object({ email: z.string() }),
    output: z.object({ qualified: z.boolean(), note: z.string() }),
    uses: { enrich },
  },
  ({ input, uses, ai }) => {
    const enriched = uses.enrich({ email: input.email });

    const note = ai(
      `Write a three-sentence qualification note for ${input.email} at ${enriched.company}. State the likely ICP fit and the recommended route (AE, nurture, or decline).`,
    );

    if (!enriched.enriched) {
      return { qualified: false, note };
    }
    return { qualified: true, note };
  },
);

export const qualifyInbound = defineTool("qualify-inbound", {
  workflow: qualifyInboundFlow,
  description:
    "Qualify an inbound contact by email: enrich, score against the ICP, and draft a routing note.",
  emojiSlug: "inbox_tray",
});
