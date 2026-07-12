import { defineModel } from "@cargo-ai/cdk";

import { modelsFolder } from "../folders/gtm";

// The contacts base model. This is a NATIVE model: a workspace-owned people
// table with no external source, so it deploys without a CRM connector and
// without any env var. `kind: "native"` + the `defineContact` extractor give it
// the standard contact schema (name, email, title, department, account_id, ...).
// Email is the identity key by convention.
//
// To source it from a CRM instead, add a connector and switch to a connector
// model (see accounts.ts for the shape).
export const contacts = defineModel("contacts", {
  kind: "native",
  extractSlug: "defineContact",
  folder: modelsFolder,
});
