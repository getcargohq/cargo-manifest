/**
 * Example of the scripts-layer pattern: a thin wrapper over the cargo-ai CLI
 * for a runtime surface the CDK cannot declare (agent memories are created at
 * run time; the CLI can list, update, and remove them).
 *
 * Usage: npx tsx scripts/list-memories.ts [agent-uuid]
 */
import { execFileSync } from "node:child_process";

const args = ["ai", "memory", "list"];
const agentUuid = process.argv[2];
if (agentUuid) args.push("--agent", agentUuid);

try {
  const out = execFileSync("cargo-ai", args, { encoding: "utf8" });
  console.log(out);
} catch (e) {
  console.error(
    "cargo-ai failed. Is the CLI installed and CARGO_API_KEY set? Run `cargo-ai ai memory list --help` for options.",
  );
  console.error((e as Error).message);
  process.exit(1);
}
