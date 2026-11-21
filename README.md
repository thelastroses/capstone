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

# Art Gallery

> {{ONE SENTENCE: what it does and who it is for. Not what you wish it did — what it does today.}}


**Status:** {{Working / Partially working — say plainly what does not work yet}}
**Built by:** {{Your name}} · {{Course, term}}

## 1. What this is and who it is for

The project is an art gallery that is able to take an artists artwork .png and its .procreate and upload it into a 3D and 2D gallery. The galllery allows interactivity and extra information from an uploaded .procreate file when the artwork is uploaded to the website.

{{2–4 sentences: the problem, the user, the thing it replaces. A reader who stops here should be able
to decide whether to keep reading.}}

**What it does not do:** {{2–3 honest non-goals. This is the part that earns trust.}}

## 2. Demo

{{Screenshot, animated GIF, or a 60–90 second recording; for a CLI, a real terminal session. Commit the
image under `docs/img/` and use a relative path so it renders on GitHub.}}

## 3. Prerequisites

| Requirement | Version built and tested on | Check it with | What breaks without it |
|---|---|---|---|
| Node.js | 22.12.0 | `node --version` | Vite/ app would not run |
| npm | 10.9.0 | `npm --version` | Depences would not be able to be installed |
| Git | 2.47.1.windows.1 | `git --version` | Cloning the repository and other git commands would not work |
| Python | 3.13.1 | `python --version` | Things like the traceability in the tools file would not be able to run |
| Docker Desktop | 29.9.2 | `docker --version` | Local database would not be able to start |
| Supabase CLI | 2.119.0 | `npm exec -- supabase --version` | Database setup would not be able to run |

## 4. Install

in Git Bash
```
git clone https://github.com/thelastroses/capstone.git 
cd capstone
Intall and Run Docker Desktop: winget install --exact --id Docker.DockerDesktop
./script/setup
```

Expected: Setup complete. Start the app with npm run dev
Takes about 1 minute on a first run.

## 5. Configure

in Git Bash
```
cp .env.example .env
```

| Variable | Required? | What it is | Default |
|---|---|---|---|
| `VITE_SUPABASE_URL` | yes | The url that connects the ap to Supabase locally | http://127.0.0.1:54321 |
| `VITE_SUPABASE_ANON_KEY` | yes | The key the app uses to connect to supabase | `Created by the setup` |

Never commit `.env`. Placeholder values only in this file and in `.env.example`.

## 6. Run

```
./script/setup - don't do if allready ran
./script/smoke
npm run dev
```

Expected: Setup complete. Start the app with npm run dev/bundling dependencies — then open http://localhost:5173/ - what the npm run dev gave and you should see the art gallery webstite.

**Verify it actually works:** Run ./scipt/smoke. It comfirms that the pumpkin.png row that was seeded is returned. Or go into the upload tab and file on the drop box zone click on a .png to upload and a .procreate file upload. Click on a gallery location and click submit, go back to home page and see it uploaded in the selected gallery.


## 7. Test

```
npm test
```

Expected: 51 tests, 51 passing, 0 skipped, about 2 seconds.
Known failing/skipped tests and why: none.

## 8. Project layout

```
src/     React app, gallery, upload, Procreate extraction, Supabase
test/     Unit and integration tests
docs/        specification, architecture, runbook, decision records
```

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Artwork not uploading? | Artwork is not a .png or .procreate file type | Choose a file type that is not a .png or .procreate |
| The `VITE_SUPABASE_ANON_KEY` is missing? | .script/setup has not been run in Git Bash | Run `.script/setup` then retry the `./script/smoke` |

## 10. License

MIT License — see `LICENSE`.

## 11. Contact and further reading

jspencer0709@gmail.com · Architecture: `docs/architecture.md` · Operations: `docs/runbook.md` ·
Decisions: `docs/adr/README.md` · New here? `docs/onboarding.md`