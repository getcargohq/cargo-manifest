import { defineModel } from "@cargo-ai/cdk";

import { modelsFolder } from "../folders/gtm";

// The accounts base model. This is a NATIVE model: a workspace-owned companies
// table with no external source, so it deploys without a CRM connector and
// without any env var. `kind: "native"` + the `defineAccount` extractor give it
// the standard account schema (name, domain, industry, number_of_employees,
// annual_revenue, owner_id, ...). Domain is the identity key by convention;
// plays and segments build on this table.
//
// To source it from a CRM instead, add a connector (with `secret()` for its
// token) and switch to a connector model: `{ connector: crm, extractSlug:
// "fetchRecords", config: { objectType: "companies", ... } }`.
export const accounts = defineModel("accounts", {
  kind: "native",
  extractSlug: "defineAccount",
  folder: modelsFolder,
});
