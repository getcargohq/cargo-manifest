#!/usr/bin/env python3
"""Cursor beforeShellExecution guard.

Hard-blocks local `cargo-ai cdk deploy` / `cdk destroy`. Deploys happen from CI
on merge to main only. This is the Cursor equivalent of the deny list Claude
Code enforces in .claude/settings.json.

Reads the hook JSON on stdin, writes a permission decision as JSON on stdout.
"""
import json
import re
import sys

BLOCK = re.compile(r"cargo-ai\s+cdk\s+(deploy|destroy)\b")

REASON_USER = (
    "Blocked: local `cargo-ai cdk deploy` / `cdk destroy` is not allowed. "
    "Deploys run from CI on merge to main. Open a PR instead."
)
REASON_AGENT = (
    "Repo policy (AGENTS.md): never run cargo-ai cdk deploy/destroy locally. "
    "Open a PR; CI runs the plan and deploys on merge to main."
)


def emit(payload):
    print(json.dumps(payload))


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        # A matcher scopes this hook to cdk deploy/destroy commands, so failing
        # closed here only ever affects those. Stay safe and block.
        emit({
            "permission": "deny",
            "user_message": REASON_USER,
            "agent_message": "Deploy guard could not parse hook input; blocking to stay safe.",
        })
        return

    command = data.get("command", "") or ""
    if BLOCK.search(command):
        emit({
            "permission": "deny",
            "user_message": REASON_USER,
            "agent_message": REASON_AGENT,
        })
        return

    emit({"permission": "allow"})


if __name__ == "__main__":
    main()
