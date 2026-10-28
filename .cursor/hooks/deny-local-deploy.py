#!/usr/bin/env python3
"""Cursor beforeShellExecution guard.

Hard-blocks local `cargo-ai project deploy|destroy` (and its `cdk` alias,
`cargo-cdk` and `npm run deploy`). Deploys happen from Cargo on merge to main
only. This is the Cursor equivalent of the deny list Claude
Code enforces in .claude/settings.json.

Reads the hook JSON on stdin, writes a permission decision as JSON on stdout.
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

REASON_USER = (
    "Blocked: local deploy/destroy (`cargo-ai project deploy` and its aliases) "
    "is not allowed. "
    "Cargo deploys on merge to main. Open a PR instead."
)
REASON_AGENT = (
    "Repo policy (AGENTS.md): never deploy or destroy locally (cargo-ai "
    "project/cdk, cargo-cdk, npm run deploy). "
    "Open a PR; Cargo plans it and deploys on merge to main."
)


def emit(payload):
    print(json.dumps(payload))


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        # A matcher scopes this hook to local deploy/destroy commands, so failing
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
