---
name: capture-feedback
description: Turn something heard in the field into durable context, at the right confidence level. Use when the user relays an objection, a competitor mention, a win or loss reason, a signal, or any claim from a call, and asks to remember it. Enforces the repetition rule and the confidence ladder.
---

# Capture feedback into context

The context layer is only worth what its weakest claim is worth. This skill is
the gate.

## The two rules this enforces

1. **Repetition.** A claim enters `context/` after it shows up **twice,
   independently**. Once is an anecdote and belongs in `cadence/log/` or
   `context/insight/` at `confidence: hypothesis`.
2. **The confidence ladder.** Every file in `proof/`, `signal/`, and `insight/`
   carries `confidence:`:
   - `hypothesis` : we think so. Readable, but **outreach plays may not cite
     it**. The linter blocks that.
   - `validated` : seen at least twice, independently, in the real world.
   - `proven` : measured and repeatable, with the number to show.

## Steps

1. **Classify what you heard.** Which domain does it belong in?
   - A pushback in a sales conversation → `objection/`
   - A number, quote, or customer result → `proof/`
   - A buying trigger → `signal/`
   - A market observation that fits nowhere else → `insight/`
   - A competitor or status-quo alternative → `alternative/`
   - A won or lost deal and why → `client/`

2. **Search for prior occurrences.** Grep `context/`, recent `cadence/log/`
   entries, and `outputs/`. Has this shown up before?

3. **Decide the confidence level, honestly.**
   - Second independent occurrence, no numbers → create or upgrade to
     `validated`, and cite both occurrences in the body.
   - You have a measured, repeatable number → `proven`.
   - First occurrence → either log it (preferred) or write it at
     `hypothesis`. Say out loud that it is not yet citable by outreach.

4. **Write it.** New file from the domain's `_template.md`, or upgrade the
   existing file's `confidence:` and add the new evidence. Cross-reference
   related files with `[[domain/slug]]` wikilinks so the knowledge graph
   connects.

5. **Never overwrite a major claim silently.** If you are rewriting an existing
   position, archive the prior version rather than deleting it.

6. **Lint.** Run `npm run lint:context`. Then report what you wrote and at what
   confidence.

## Rules

- Do not invent evidence to justify an upgrade. An honest `hypothesis` beats a
  fabricated `validated`.
- Upgrading a claim to `validated` unlocks it for outreach copy. Treat that as
  the consequential act it is.
