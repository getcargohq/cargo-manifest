/**
 * Posts a `cargo-cdk plan` output as a sticky comment on the current PR.
 * Updates the existing comment on subsequent runs instead of stacking new ones.
 *
 * Usage (GitHub Actions): tsx scripts/ci/comment-plan.ts <plan-output-file>
 * Env: GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER
 */
import { readFileSync } from "node:fs";

const MARKER = "<!-- manifest:cargo-plan -->";

const planFile = process.argv[2];
const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const prNumber = process.env.PR_NUMBER;

if (!planFile || !token || !repo || !prNumber) {
  console.error(
    "usage: tsx scripts/ci/comment-plan.ts <plan-file> (with GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER set)",
  );
  process.exit(1);
}

const plan = readFileSync(planFile, "utf8").trim();
const truncated =
  plan.length > 60_000 ? `${plan.slice(0, 60_000)}\n... (truncated)` : plan;
const body = [
  MARKER,
  "## cargo plan",
  "",
  "```",
  truncated || "(empty plan output)",
  "```",
  "",
  "Review this like a terraform plan. Merging to main deploys it.",
].join("\n");

const api = `https://api.github.com/repos/${repo}`;
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
};

const existingRes = await fetch(
  `${api}/issues/${prNumber}/comments?per_page=100`,
  { headers },
);
if (!existingRes.ok) {
  console.error(`failed to list comments: ${existingRes.status}`);
  process.exit(1);
}
const comments = (await existingRes.json()) as Array<{
  id: number;
  body?: string;
}>;
const sticky = comments.find((c) => c.body?.includes(MARKER));

const res = sticky
  ? await fetch(`${api}/issues/comments/${sticky.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ body }),
    })
  : await fetch(`${api}/issues/${prNumber}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body }),
    });

if (!res.ok) {
  console.error(`failed to post comment: ${res.status} ${await res.text()}`);
  process.exit(1);
}
console.log(sticky ? "updated plan comment" : "created plan comment");
