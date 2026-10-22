# Capstone — Capstone Project

Senior capstone by Jennifer Spencer, Fall 2026. **Status: Week 9 — Walking Skeleton & Continuous Integration**

## Project idea
The project is an art gallery that is able to take artists artwork and upload it into a 3D and 2D gallery. The galllery allows interactivity and extra information from an uploaded .procreate file when the artwork is uploaded to the website.


## What is here
- `docs/charter.md` — scope, constraints, non-goals, risks, working agreement
- `docs/hours-log.csv` — every work session, logged the day it happens
- `docs/ai-usage.md` — which AI tools are used on this project, and how
- `docs/` — one document per life-cycle phase; each header says the week it is written
- `src/`, `tests/` — empty until Week 9
- `docs/definition-of-done.md` — a list of items that must be completed to be have a item considered as done

## How to run it

You need Node.js 22.12.0 or newer and Docker Desktop running. From the project folder,
run these commands in Git Bash (or WSL):

```bash
bash script/setup
bash script/lint
bash script/test
bash script/build
bash script/start
```

Open the local address that it gives, in the terminal into a Chrome tab. The website is designed to be used in Chrome.

`setup` installs the locked dependencies, starts the local Supabase database,
applies migrations, seeds one artwork, and writes the local app settings to
`.env.local`. `start` runs the app; open the local address printed in the
terminal. The database test checks that the sample artwork is available.