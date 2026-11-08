# Capstone — Capstone Project

Senior capstone by Jennifer Spencer, Fall 2026. **Status: Week 9 — Walking Skeleton & Continuous Integration**

## Project idea
The project is an art gallery that is able to take artists artwork and upload it into a 3D and 2D gallery. The galllery allows interactivity and extra information from an uploaded .procreate file when the artwork is uploaded to the website.


## What is here
- `docs/charter.md` — scope, constraints, non-goals, risks, working agreement
- `docs/hours-log.csv` — every work session, logged the day it happens
- `docs/ai-usage.md` — which AI tools are used on this project, and how
- `docs/` — one document per life-cycle phase; each header says the week it is written
- `src/`, `tests/` — application source and automated tests
- `docs/definition-of-done.md` — a list of items that must be completed to be have a item considered as done

## How to run it

You need Node.js 22.12.0 or newer and Docker Desktop running. From the project folder,
run these commands in Git Bash (or WSL):

```bash
./script/setup
./script/lint
./script/test
./script/build
./script/smoke
./script/start
```

Open the local address that it gives, in the terminal into a Chrome tab. The website is designed to be used in Chrome.

`setup` installs the locked dependencies, starts the local Supabase database,
applies migrations, seeds one artwork, and writes the local app settings to
`.env.local`. After setup, `npm run dev` restores the sample PNG in Supabase
Storage before starting Vite, so the demo image is repaired if its storage
object is missing. `./script/start` is also available as a wrapper around
`npm run dev`. Open the local address printed in the terminal. The database
test checks that the sample artwork is available.

## Testing

Regenerate the deterministic happy, boundary, and hostile test data with the
fixed seed in `tests/fixtures/test-data.seed.json`:

```bash
npm run seed -- --set all
```

This writes the generated fixture files under `tests/fixtures/`; it does not
seed the local Supabase database. The unit suite includes tests against the
hostile fixture set. To regenerate the data and verify it in PowerShell, run:

```powershell
npm.cmd run seed -- --set all
npm.cmd test
```

In Git Bash or WSL, use `npm run seed -- --set all` and `npm test`.

Run the unit tests:

```bash
npm test
```

Run the 15 integration tests after `./script/setup` has started local Supabase
and configured the environment:

```bash
npm run test:integration
```

Run both automated tiers with one command:

```bash
npm run test:all
```

The manual acceptance cases in `docs/test-cases.md` cover all 22 Must
requirements. Run them in Chrome and record results in `docs/traceability.csv`.
The traceability report reads that file; it does not run tests or update statuses:

```bash
python tools/coverage_report.py docs/traceability.csv
```