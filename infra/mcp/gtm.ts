import { defineMcpServer } from "@cargo-ai/cdk";

import { sdr } from "../agents/sdr";
import { accounts } from "../models/accounts";
import { contacts } from "../models/contacts";
import { enrich } from "../tools/enrich";
import { qualifyInbound } from "../tools/qualify-inbound";

// One MCP endpoint exposing the GTM stack to any outside agent (Claude Code,
// Cursor, a rep's assistant). Same `uses` surface as an agent.
export const gtmServer = defineMcpServer("gtm", {
  description: "Acme GTM tools and data for assistants.",
  uses: [
    enrich,
    qualifyInbound,
    sdr,
    { ref: accounts, readOnly: true },
    { ref: contacts, readOnly: true },
  ],
});
