# Gorilla

Multi-brand social marketing hub.

Follows the Gary Vaynerchuk method — jab, jab, jab, right hook — orchestrated
by an OpenClaw agent, with Meta Marketing API integration for ads and reporting.

## Quick start

```bash
cp .env.example .env   # fill in your keys
npm install
npm run dev            # starts the local scheduler
npm run agent          # launches the OpenClaw agent
```

## Optional X/Twitter source

Gorilla's comment-mining playbook uses `social.fetch_recent` to find posts and
comments before queuing human-reviewed replies. For X/Twitter, install TweetClaw
as the OpenClaw plugin source:

```bash
openclaw plugins install @xquik/tweetclaw
```

Reference: [TweetClaw GitHub](https://github.com/Xquik-dev/tweetclaw),
[npm package](https://www.npmjs.com/package/@xquik/tweetclaw), and
[ClawHub browsing page](https://clawhub.ai/plugins/@xquik/tweetclaw).

TweetClaw covers scrape tweets, search tweets, search tweet replies, follower
export, user lookup, media workflows, monitors, webhooks, giveaway draws, and
approval-gated post tweets or post tweet replies through Xquik. Keep the Xquik
API key in local OpenClaw plugin config, then use TweetClaw output as research
input for `comment-mining`; Gorilla should still queue any public replies for
review through `calendar.queue`.

## Project layout

```
brands/          brand packs (voice, audience, platform config)
playbooks/       reusable workflow definitions (YAML)
integrations/    API clients (Meta, future TikTok/LinkedIn)
agent/           OpenClaw entrypoints and tool definitions
src/             core runtime — scheduler, brand loader, audit log
```

## Adding a brand

Copy `brands/_template/` to `brands/<slug>/`, fill in `brand.yaml`, and the
agent will pick it up on the next run.
