# Walking Skeleton Trace — TEMPLATE

## 1. The request path

One row per hop. "Real" means the production component, not a stub, a mock, a
hard-coded fixture, or a `TODO`. A hop that is not real is a bone that is missing.

| # | Hop | Component in my system | Real? | Evidence |
|---|---|---|---|---|
| 1 | Client / entry point | A place shows an area where uploads can happen and a place to choose a scene where the artwork will display | yes | Displays the upload process area with the gallery location radio buttons |
| 2 | Route / dispatch | The upload process receives the selected selections | no | The upload process actually receives the selected selections 200 |
| 3 | Service / domain logic | Checks that it is under 20 artworks and if it is, extracts canvas information and pairs it with artwork | no | After uploading it displays correctly and at the 21srt save it does not allow and does message |
| 4 | Data store | Saves the artwork and canvas information into Supabase | no | A row appears in Supabase and its canvas information are paired together with the same artwork_id |
| 5 | Response | Receives the uploaded artwork and canvas information successfully or returns error | no | Returns the artwork and canvas information fields such as width, height, and dpi |
| 6 | Rendered result | Shows an upload success message and displays artwork and canvas information or failure message if extraction fails or does not display | no | In the UI it shows a success message and failure message; a screenshot showing it rendered |
| 7 | External integration | Supabase gets uploaded artwork and canvas information | no | Files are in the correct locations in the Supabase database tables |

**Missing bone (the next task):** Issue #1: Upload, extraction, and saving

## 2. Requirement traceability

Every requirement identifier you baselined in Week 8 gets a row. A requirement
with no issue is a promise nobody is keeping.

| Req ID | Requirement (short) | Issue | Branch | Verified by | Status |
|---|---|---|---|---|---|
| FR-UPL-01 | Upload artwork within 5 minutes | I-1 #35 | — | — | not started |
| FR-UPL-02 | Delete uploaded artworks  | I-5 #39 | — | — | not started |
| FR-UPL-03 | Choose 2D, 3D, or both | I-4 #38 | — | — | not started |
| FR-DATA-01 | Saves Artworks into Database to view later | I-2 #36 | — | — | not started |
| FR-DATA-02 | Caps Artworks saved to 20 | I-2 #36 | — | — | not started |
| FR-GALL-02 | Artwork Overview | I-4 #38 | — | — | not started |
| FR-GALL-03 | Allows viewers to contact artist | I-6 #40 | — | — | not started |
| FR-TDG-01 | Shows canvas information after clicking artwork in 3D scene | I-4 #38 | — | — | not started |
| FR-TDG-02 | Allows zooming into 3D scene | I-4 #38 | — | — | not started |
| FR-EXT-04 | Extract Procreate Canvas Information | I-3 #37 | — | — | not started |
| FR-EXT-05 | Pairs canvas information with its artwork | I-3 #37 | — | — | not started |
| NFR-PERF-01 | Loads website in p95 under 25 sections with 3G internet | I-7 #41 | — | — | not started |
| NFR-PERF-02 | 3D gallery maintain 30 fps for 95% of a 60 second viewing session | I-7 #41 | — | — | not started |
| NFR-REL-01 | Exceptions are handled with any failure | I-2 #36, I-5 #39 | — | — | not started |
| NFR-AVA-02 | 19 of 20 artworks display in the galleries | I-7 #41 | — | — | not started |
| NFR-SEC-01 | Secrets are not saved into repository | I-8 #42 | — | — | not started |
| NFR-SEC-02 | Extracted information can not execute HTML or scripts | I-4 #38 | — | — | not started |
| NFR-PRIV-01 | Artwork and canvas information are fully removed from database | I-5 #39 | — | — | not started |
| NFR-DATA-01 | Corrupt and duplicate artwork are not saved | I-1 #35 | — | — | not started |
| NFR-DATA-02 | Incomplete records are not saved | I-2 #36 | — | — | not started |
| NFR-ACC-01 | Reach core features in at most 20 tabs | I-6 #40 | — | — | not started |
| NFR-ACC-02 | Tab indicator is visible enough | I-6 #40 | — | — | not started |
| NFR-ACC-03 | Tab order is logical | I-6 #40 | — | — | not started |
| NFR-USE-01 | First time viewer is able to navigate website in 3 minutes without help | I-6 #40 | — | — | not started |
| NFR-USE-02 | Interface has no clipped, overlapping, or unusable overlays | I-6 #40 | — | — | not started |
| NFR-MNT-01 | Successful clean clone check in under 10 minutes | I-8 #42 | — | — | not started |

## 3. Skeleton acceptance record

- **Date the skeleton first walked end to end:** `2026-10-22`
- **Commit that made it walk:** `464e916`
- **CI run that proved it (URL):** `https://github.com/thelastroses/capstone/commit/464e9168a1d25f07ba75b01c9060ab2aaf67f36a`
- **One red build I caused on purpose, and the fix:** `https://github.com/thelastroses/capstone/commit/52fd643a843b4c4d59df58e0d97efe87e047f1af` -> `5fcecdf`
- **Hops still stubbed, and when they get real:** `<list, with issue numbers>`