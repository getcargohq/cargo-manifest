---
name: new-execution
description: Declare a one-off run as code in outputs/, previewed on the pull request and run exactly once by the merge. Use whenever something should happen once rather than keep running: enroll a list into a play, run a tool over some accounts, backfill a field. Writes the entry's .ts, its data, and a README with a pending outcome, then fills the outcome once the run finishes.
---

# A one-off run, declared in outputs/

A play keeps running. An **execution** happens once: the pull request shows
what it will do, the merge does it, and Cargo's ledger makes sure it never
happens twice. It lives in `outputs/` because it is history from the moment
it merges.

## Step 0: is it really one-off?

| The user wants | Use |
| --- | --- |
| Something that keeps happening (every new lead, every week) | The `new-motion` skill: a play, tool, or agent in `infra/` |
| A run, once, over records or on one input | This skill |

## Steps

1. **Name it.** The id is `YYYY-MM-DD-<slug>`: today's absolute date and a
   kebab-case, verb-first slug (`2026-10-14-enroll-expansion-pilot`). The
   entry directory is `outputs/<id>/`, and the id inside the code is the same
   string. The outputs linter fails the PR otherwise.

2. **Pick what runs.** Import it from `infra/` by handle, never by UUID. If it
   does not exist yet, add it in the same PR (`new-motion` for a play): the
   merge deploys it before the execution starts.

   | Workflow | `defineBatch` (once per record) | `defineRun` (once) |
   | --- | --- | --- |
   | A play | Any data but a file; the model must be the play's own | No |
   | A tool | Any data | Yes |
   | `defineWorkflow(...)` inline, for logic not worth deploying | Any data | Yes |

   Enrolling into an **outreach** play is that motion's campaign. Its
   `context/motion/` file must exist with its hypothesis, and the entry's
   `serves:` names the outcome it moves.

3. **Pick the data** (a batch only). Prefer data already in Cargo over a file.

   | Kind | When |
   | --- | --- |
   | `{ kind: "segment", segment }` | A list someone built in Cargo |
   | `{ kind: "filter", model, filter, limit }` | Records matching a condition. `limit` is required |
   | `{ kind: "recordIds", model, ids }` | A handful of known records |
   | `{ kind: "form", records }` | A few rows written in the code, checked against the workflow's form |
   | `{ kind: "file", path, mappings }` | A CSV in the entry, at most 50 MB. `path` is relative to `infra/` (`"../outputs/<id>/accounts.csv"`), and `mappings` renames its columns to the workflow's inputs |

4. **Write `outputs/<id>/<slug>.ts`.**

   ```ts
   import { defineBatch } from "@cargo-ai/cdk";
   import { contacts } from "../../infra/models";
   import { expansion } from "../../infra/plays/expansion";

   export const pilot = defineBatch("2026-10-14-enroll-expansion-pilot", {
     workflow: expansion,
     data: { kind: "filter", model: contacts, filter, limit: 50 },
   });
   ```

   One execution per entry. Never put one in `_template/` or any other
   `_`-prefixed directory: the CDK finds executions anywhere, and would run it.

5. **Write `outputs/<id>/README.md`** from `outputs/_template/README.md`, with
   `outcome: pending`. Fill "What ran" now (link the `.ts` and what it runs).
   "Headline result" waits for the run.

6. **Verify.** `npm run typecheck`, then `npm run lint`, then open the PR. In
   the Cargo plan comment, the "Runs once" row should match the intent: the
   record count, what it sends, what it costs. If it needs approval, say so and
   stop. A human adds `cargo:approve-impact`; never add it yourself.

7. **After the merge, fill the outcome.** The deploy check names the batch or
   run it started. Once it finishes, read its result (the Cargo MCP's
   `get_batch` / `get_run`) and replace `outcome: pending` with what it
   produced, in numbers, plus the headline. This is the one edit an entry gets
   after it merges; anything later is a dated addendum.

   If the check says the execution was **held** (its records grew past the
   preview, or nothing approved it), it did not run and is still pending.
   Tell the user why. The next pull request previews it again.

## Rules

- **Once merged, the code is history.** Editing or deleting the `.ts` after
  the merge changes nothing: the ledger keyed on the id has it. To run
  something again, or differently, write a new entry with a new id.
- **Executions run only from Cargo's deploy**, once the repository is
  connected to the workspace. Local deploys are denied here, as for
  everything else.
- **Absolute dates**, and no em dashes, as everywhere in this repo.
