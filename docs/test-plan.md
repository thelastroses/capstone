# test-plan

# Test Plan — Art Gallery

**Version:** 1.0  ·  **Author:** Jennifer Spencer  ·  **Date:** 2026-11-02  ·  **Baseline commit:** <sha>

---

## 1. Scope — what is under test

[One paragraph. Name the build (commit SHA or tag) and the requirement IDs this plan
covers. Be specific: "FR-01 through FR-14 and NFR-02, NFR-05, NFR-08, at commit a1b2c3d."]

FR-DATA-01, FR-DATA-02, NFR-DATA-01, NFR-DATA-02, FR-UPL-02, NFR-PRV-01, NFR-REL-01, NFR-AVA-02, NFR-SEC-01, NFR-SEC-02, FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-GALL-02, FR-EXT-04, FR-EXT-05 at commit 67a42da.

## 2. Out of scope — what is NOT under test, and why

Load beyond 1 user - I will not be adding a user account system in this version therefore there will only be one user at a time the artist.

Browsers I do not support - The art gallery will support the most come Chrome viewport no other browsers will deliberately support the art gallery for this version.

Unsupported file types - I will not support file types that are not png and .procreate but an error message will appear if they upload something other than a .png and .procreate

## 3. Test levels

| Level | What it covers here | How it runs | Roughly how many |
|---|---|---|---|
| Unit | Selection, validation, and Procreate metadata normalization | `npm run test:unit` | 40 |
| Integration | Local Supabase database, Storage, and seeded artwork | `npm run test:integration` after `./script/setup` | 15 |
| Acceptance | Manual Chrome checks covering every Must requirement | Follow `docs/test-cases.md` and record results in `docs/traceability.csv` | 22 |

## 4. Environment

| Item | Value |
|---|---|
| Runtime / language version | Node.js 22.12.0 or newer |
| Operating system(s) | Local development environment |
| Database / storage | Local Supabase started and seeded by `./script/setup` |
| Third-party services | None in the unit tier; local Supabase in integration tests |
| Test data set | Deterministic happy, boundary, and hostile fixtures committed under `tests/fixtures/`; regenerate with `npm run seed -- --set all` |
| Seed command | `npm run seed -- --set all` |
| Where it runs | Locally; `npm run test:all` runs both automated tiers |

## 5. Entry criteria — we may begin testing when

- [ ] The build under test is tagged and pushed; CI is green on the pipeline from Chapter 9.
- [ ] Every Must requirement has at least one written test case.
- [ ] The test data set is checked in and loads without manual steps.
- [ ] <your own>

## 6. Exit criteria — verification is DONE when

[Numbers, not adjectives. These are the criteria you will be held to in Week 16.]

- [ ] 100% of Must requirements have at least one passing acceptance test.
- [ ] 0 open defects at severity S1 or S2.
- [ ] Every open S3/S4 defect appears in `docs/defect-log.md` with a documented workaround.
- [ ] Every defect fixed this iteration has a named unit test that fails on the old code.
- [ ] The automated unit and integration tiers run from `npm run test:all`.
- [ ] Accessibility checks NFR-ACC-01 through NFR-ACC-03 are tested 3/3 passed to allow for a better user experience

## 7. Risks to the testing itself

| Risk | Trigger | Response |
|---|---|---|
| <e.g. third-party sandbox unavailable> | <how you'd notice> | <stub + a manual test before release> |

## 8. Schedule

| When | What |
|---|---|
| Week 11, days 1–2 | Test plan, test case derivation, traceability matrix |
| Week 11, days 3–5 | Write and automate the suite; first full pass |
| Week 11, days 6–7 | Triage, fix S1/S2, regression tests, log |

## 9. Approval

I have read this plan and I am accountable for the exit criteria above.

Signed: Jennifer Spencer  ·  Date: 2026-11-02
