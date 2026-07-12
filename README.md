# Manifest

**Your GTM is a codebase. Own it.**

Manifest is a free, open-source template for running your go-to-market the way
engineers run software: everything your company knows, everything it's trying to
do, and everything that runs in production, in one repository that you own and
that AI agents can operate.

Clone it, tell your AI agent to read it, and you have a revenue engine with a
memory.

## The problem this solves

Your GTM knowledge is scattered: the ICP lives in your head, the objection
answers live in a rep's notes, the positioning lives in a deck from two quarters
ago, and the automations live in tools nobody can audit. Every time you open an
AI assistant, you re-explain your company from zero. Every time someone leaves,
knowledge walks out the door.

Software teams solved this decades ago: one repository, version-controlled,
where every change is reviewed and nothing is lost. Manifest applies that
structure to revenue.

## What is Cargo?

Manifest is built by [Cargo](https://getcargo.io), the platform GTM teams use to
run their revenue engine. Cargo unifies your GTM data into one clean set of
account and contact tables: the outcome that used to require a dbt project or a
CDP, delivered as ready-made primitives. On top of that unified data it runs
everything the engine needs: waterfall enrichment, scoring, routing, a context
graph your agents reason from, and AI agents executing automated plays. You
define the whole workspace as code and deploy it with one command, the way
engineers deploy cloud infrastructure.

Manifest is the repo structure Cargo's own GTM team runs on, extracted into a
template anyone can use.

## Why trust this repo

- It is the working structure behind Cargo's own go-to-market, not a thought
  experiment.
- Cargo runs millions of executions every month for revenue teams at Braintrust,
  Augment Code, Descript, and WorkOS.
- Everything here is inspectable. No black box: every file is plain text you can
  read, edit, and delete.
- MIT licensed. Fork it, gut it, make it yours. Cargo is optional (see below).

## Is this for me? (I'm not an engineer)

Yes. Manifest is for GTM people: founders doing founder-sales, heads of growth,
RevOps, sales leaders. Here's the honest deal:

- **You never write code.** The files you touch are plain text: your ICP, your
  weekly plan, your objection answers. If you can write a Notion page, you can
  write these.
- **Your AI agent does the technical part.** Open this folder in Claude Code (or
  Cursor), and the agent reads the operating manual ([AGENTS.md](AGENTS.md)) and
  handles git, deploys, and file conventions for you. You review its work like
  you'd review a campaign brief.
- **You should still understand every folder.** Forking something you don't
  understand is how you end up with someone else's engine. The section below
  explains each layer in plain language: read it once and the whole repo makes
  sense.

## What's inside, explained properly

**[`plan/`](plan/README.md): the destination.** Three files. The number you're
chasing this period and the three moves that get you there
([`company-plan.md`](plan/company-plan.md)). How revenue actually gets won: your
ICP, your motions, the bets you're making and what you're explicitly not doing
([`strategy.md`](plan/strategy.md)). And the concrete outcomes that must become
true, each with an owner, a way to verify it, and what it becomes in the engine:
a play, an agent, a report ([`outcomes.md`](plan/outcomes.md)). This replaces the
strategy deck that goes stale a week after the offsite, because here the plan is
checked against reality continuously.

**[`context/`](context/README.md): what your company knows.** The single source
of truth for your market knowledge, split into folders a rep would recognize:
`icp/`, `persona/`, `objection/`, `proof/`, `signal/`, `alternative/`
(competitors), `motion/`, `client/`. One claim per file, in plain text. Every AI
agent reads this layer before writing a single email on your behalf: this is why
an agent working from this repo sounds like your best rep instead of a generic
bot. If you run Cargo, this same knowledge can live in your workspace's context
graph, where your production agents reason from it. One rule keeps it honest: a
claim enters context after it shows up twice in the real world. Once is an
anecdote.

**[`cadence/`](cadence/README.md): the operating rhythm.** Your week, in writing.
A weekly plan (theme, outcomes, deals to move), a daily log, and a carryover file
that keeps dropped balls visible until they're resolved. This is what turns the
repo from a wiki into an operating system: knowledge layers tell agents what's
true, the cadence layer tells them what matters right now.

**[`initiatives/`](initiatives/README.md): the big rocks.** One file per bounded
effort ("stand up the outbound motion by end of Q3") with an owner, a deadline,
and success criteria you can check as true or false. The connective tissue
between the plan and the day-to-day.

**[`infra/`](infra/README.md): what actually runs.** Your live engine, declared
as code: Connectors to your CRM and data providers, Models (your unified account
and contact tables), Segments, Tools, Agents, and Plays. It deploys to your Cargo
workspace with one command, and every change is previewed as a diff before it
touches production, the way engineers review infrastructure changes. You don't
write this code: you describe what you want, your agent drafts it, and you review
the plan. And you rarely start from a blank file: scaffold a prebuilt cookbook
(deduplication, contact sourcing, routing, meeting prep) straight into `infra/`
and edit its placeholders. The
[cookbooks](https://github.com/getcargohq/cargo-cookbooks) are the menu; the
manifest is where they land.

**[`.claude/skills/`](.claude/skills): what your agent knows how to do here.**
Standard operating procedures your agent actually executes: plan my week, create
a new motion, run the weekly review, clean up the context layer. Written once,
executed the same way every time, by anyone on the team.

**[`evals/`](evals): what keeps it honest.** Test cases that catch a prompt change
making your agents worse before it ships. Change how your qualification agent
thinks, and the evals tell you whether it still qualifies correctly.

**[`outputs/`](outputs/README.md): what happened.** The receipts. Every list
built, campaign shipped, and research brief lands here, dated, append-only,
tagged with the outcome it produced. Agents read recent entries before starting
related work, so the engine learns from what happened instead of repeating it.

**[`scratch/`](scratch/README.md): yours alone.** Experiments and half-baked
ideas, invisible to the shared repo. The engine stays clean because the mess has
a home.

## The loop that makes it compound

1. **Plan** the week in `cadence/`, pulled from `plan/` and open `initiatives/`.
2. **Run** the engine: enrichment, scoring, routing, and signal plays run
   continuously; outreach campaigns ship with a written hypothesis (segment,
   angle, trigger, expected reply rate) so results are judged against a bar you
   set in advance.
3. **Archive** results in `outputs/`, with outcomes attached.
4. **Review** weekly: what worked graduates into `context/` as validated
   knowledge; what failed is recorded so it isn't retried blind.

Run this loop for a quarter and you have something no tool subscription gives
you: a revenue engine that provably gets smarter every week, and that belongs to
you.

## 60-second start

```bash
git clone https://github.com/getcargohq/cargo-manifest acme-gtm
cd acme-gtm && npm install
claude .   # or cursor, or any agent that reads AGENTS.md
```

Then tell your agent: "Read AGENTS.md and help me seed this repo for my company."
It will interview you and fill the layers.

Have a Cargo workspace? Wire the engine: `cd infra && npx cargo-ai cdk plan`. No
workspace yet? Everything except `infra/` works standalone today; add the
execution layer at [getcargo.io](https://getcargo.io) when you're ready.
