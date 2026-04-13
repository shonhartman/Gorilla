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
