import { defineTool, defineWorkflow } from "@cargo-ai/cdk";
import { z } from "zod";

import { enricher } from "../agents/enricher";
import { hunter } from "../connectors/hunter";

// A tool is backed by a workflow. The body is parsed and lowered to workflow
// nodes, never executed at build time. `uses` forward-references other
// resources by handle so the CDK orders the deploy and injects real uuids.
const enrichFlow = defineWorkflow(
  "enrich-contact",
  {
    input: z.object({ email: z.string() }),
    output: z.object({
      company: z.string(),
      verification: z.unknown(),
      enriched: z.boolean(),
    }),
    uses: { enricher, hunter },
  },
  ({ input, uses }) => {
    const verification = uses.hunter.verifyEmail({ email: input.email });

    // Agent calls resolve to `{ answer, evaluation? }`; read `.answer`.
    const company = uses.enricher({
      prompt: `Which company owns the email domain of ${input.email}? Reply with just the company name.`,
    }).answer;

    if (!company) {
      return { company, verification, enriched: false };
    }
    return { company, verification, enriched: true };
  },
);

export const enrich = defineTool("enrich", {
  workflow: enrichFlow,
  description: "Enrich a contact with verified firmographic data.",
  emojiSlug: "mag",
});
