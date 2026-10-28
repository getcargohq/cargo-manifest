#!/usr/bin/env python3
"""Codex PreToolUse guard.

Hard-blocks local `cargo-ai project deploy|destroy` (and its `cdk` alias,
`cargo-cdk` and `npm run deploy`). Deploys happen from Cargo on merge to main
only. This mirrors the Claude Code deny list
(.claude/settings.json) and the Cursor beforeShellExecution guard.

The PreToolUse matcher only filters by tool name (Bash), so this hook runs for
every Bash command and must inspect the command text itself. It denies only on
a match and otherwise exits 0 without a decision, so unrelated commands are
untouched.
"""
import json
import re
import sys

# The CLI mounts these commands under `project` and keeps `cdk` as an alias.
# @cargo-ai/cdk ships the same commands as the `cargo-cdk` bin, and
# `npm run deploy` wraps the call. Pinned npx versions (`@latest`) and leading
# flags (`cargo-ai -v`, `npm -s run`) are covered too.
BLOCK = re.compile(
    r"(?:\bcargo-ai|@cargo-ai/cli)(?:@\S*)?(?:\s+-\S+)*\s+(?:project|cdk)\s+(?:deploy|destroy)\b"
    r"|(?:\bcargo-cdk|@cargo-ai/cdk)(?:@\S*)?(?:\s+-\S+)*\s+(?:deploy|destroy)\b"
    r"|\b(?:npm|pnpm|yarn|bun)(?:\s+-\S+)*\s+(?:run(?:-script)?(?:\s+-\S+)*\s+)?[\"']?deploy(?![\w:-])"
)


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        # Cannot parse: do not emit a decision, so we never block unrelated work.
        return

    command = ""
    tool_input = data.get("tool_input")
    if isinstance(tool_input, dict):
        command = tool_input.get("command", "") or ""

    if BLOCK.search(command):
        print(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": (
                    "Repo policy (AGENTS.md): never deploy or destroy locally "
                    "(cargo-ai project/cdk, cargo-cdk, npm run deploy). Cargo "
                    "deploys on merge to main. Open a PR instead."
                ),
            }
        }))


if __name__ == "__main__":
    main()
