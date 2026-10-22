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
| `<FR-1>` | `<one line>` | `#<n>` | `<branch>` | `<test name or "manual">` | not started / in progress / done |
| FR-4 | List items expiring within 7 days | #12 | `fr-4-expiring-list` | `tests/unit/list-expiring` | done |
| FR-7 | Add an item from the web form | #14 | `fr-7-add-item` | — | in progress |
| NFR-2 | First page paint under 2 s on 3G | #21 | — | — | not started |

## 3. Skeleton acceptance record

- **Date the skeleton first walked end to end:** `2026-10-22`
- **Commit that made it walk:** `464e916`
- **CI run that proved it (URL):** `https://github.com/thelastroses/capstone/commit/464e9168a1d25f07ba75b01c9060ab2aaf67f36a`
- **One red build I caused on purpose, and the fix:** `https://github.com/thelastroses/capstone/commit/52fd643a843b4c4d59df58e0d97efe87e047f1af` -> `5fcecdf`
- **Hops still stubbed, and when they get real:** `<list, with issue numbers>`