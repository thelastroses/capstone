# NFR One Pager

## 3 Important NFR's

| ID | Requirement | Priority | How it is measured |
|---|---|---|---|
| NFR-SEC-01 | There must not be any/0 Supabase keys, passwords and secrets in the repository being saved from the gallery in any commit. | Must | Measured by ensuring that .env is in the .gitignore and the .env.example only has example values. Run a search on the fully history not just the working tree to ensure that there are no secrets/0 secrets.|
| NFR-PRIV-01 | When a artist uploads an artwork they must be able to delete the artworks and canvas information and it must not stay in the database, their must be 0 deleted artworks and canvas information left in the database, 0 rows, with only one action | Must | To measure this upload 20 artworks and canvas informations and ensure that all of them are deleted and delted from every table in the database, make sure that when querying every table for the artworks and canvas information their must be 0 rows |
| NFR-DATA-01 | When a artist uploads artworks into the gallery, the gallery must not save artwork files that are corrupt and duplicate artwork files, 0 corrupt and duplicate files should be saved in the database or on the website. | Must |  To measure this upload artwork files two times and make sure that the artworks and canvas information all display correctly and that the duplicate files are not kept/ 0 corrupt files are kept. |

## 1 Constraint

| ID | Constraint | Where it comes from | What it rules out |
|---|---|---|---|
| CON-01 | The amount of effort and work for this project is capped at ~240 hours across 16 weeks | course | There would be no time for two different applications such as a moblie app and no extra features such as light/darkmode, and liking/commenting features |

## 1 Assumption

| ID | Assumption | Owner | Verify by | If it is false |
|---|---|---|---|---|
| ASM-04 | Supabase will be the database used to store canvas information and artworks | me | Week 5 | I will switch to a different database if Supabase does not end up working out |

## 1 Obligation

| ID | Dependency | Version / plan pinned | Failure mode | Fallback |
|---|---|---|---|---|
| React Three Fiber | https://github.com/pmndrs/react-three-fiber/blob/master/LICENSE // https://github.com/pmndrs/react-three-fiber#readme | 2026-09-17 | Verify license requirements before distributing the application and preserve any required license and copyright notices |

## Definition of Done

### What this is

One checklist. It applies to **every** work item — every card, issue, or task — before
that item may be moved to Done. It is not a plan and it is not per-feature acceptance
criteria; those live with each requirement in `docs/requirements.md`.

### The honesty rule

If you will not do an item every single time, take it off the list. A definition of
done that you routinely skip is worse than no definition of done, because it teaches
you that written commitments are decorative.

Eight to twelve items. Every item must be answerable **yes or no** by someone who is
not you.

---

### The checklist

An item is Done when all of the following are true:

- [ ] It traces to a requirement ID in `docs/requirements.md` (or a new requirement was added and the traceability matrix updated).
- [ ] Every acceptance criterion for that requirement passes, checked by running it — not by reading the code.
- [ ] At least one automated test covers the new behavior, and the whole suite passes locally.
- [ ] The branch is merged only after the pipeline is green on the merge commit.
- [ ] No secret, key, token, or real user data was added to the repository.
- [ ] Error paths are handled: the failure a user is most likely to hit produces a message that names what failed.
- [ ] New user-facing surfaces are keyboard-operable, labeled, and pass the contrast check
- [ ] Any behavior change a stranger would need to know is reflected in `README.md`, `CHANGELOG.md`, or `docs/runbook.md`.
- [ ] Any use of an AI assistant on this item is recorded in `docs/ai-usage.md`, and every generated line was read and understood.
- [ ] Time spent is written to the hours log the same day.
- [ ] The item was demonstrated once end to end from a clean state, not from the state left over by development.

---

### What a bad definition of done looks like

Keep this next to yours as a warning:

- [ ] It works.
- [ ] Code is clean.
- [ ] Tested.
- [ ] Documented if needed.

Every one of these is unverifiable by anyone but the author, which means the list
enforces nothing. "If needed" is where documentation goes to die.

---

**Adopted:** 2026-09-19 · **Revised:** 2026-09-19, Edited Definition of Done

## Traceability Summary

There are 12 functional requirements and 15 non-functional requirements, 27 total in the traceability matrix. All functional requirements are traced to a design element in requirements.md and all tests are traced to a placeholder. All non-functional requirements are traced to a placeholder design element and test. There were 0 orphans when I did the run on the traceability-matrix.csv because all requirements I intend to build.