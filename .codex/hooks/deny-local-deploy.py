#!/usr/bin/env python3
"""Codex PreToolUse guard.

Hard-blocks local `cargo-ai cdk deploy` / `cdk destroy`. Deploys happen from CI
on merge to main only. This mirrors the Claude Code deny list
(.claude/settings.json) and the Cursor beforeShellExecution guard.

The PreToolUse matcher only filters by tool name (Bash), so this hook runs for
every Bash command and must inspect the command text itself. It denies only on
a match and otherwise exits 0 without a decision, so unrelated commands are
untouched.
"""
import json
import re
import sys

BLOCK = re.compile(r"cargo-ai\s+cdk\s+(deploy|destroy)\b")


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
                    "Repo policy (AGENTS.md): never run cargo-ai cdk deploy/destroy "
                    "locally. Deploys happen from CI on merge to main. Open a PR instead."
                ),
            }
        }))


if __name__ == "__main__":
    main()
