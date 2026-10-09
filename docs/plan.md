# plan

# Work Breakdown, Schedule & Burn-Down — Template

---

## 1. Rules this plan obeys

- **The 100 percent rule.** The children of any node sum to *all* of that node's work — no more, no less.
  If it is not in the WBS, it is not in the plan, and it will not get done.
- **Task size: 1–6 hours.** Under one hour is noise. Over six hours means you do not yet understand it —
  split it, or write a spike for it.
- **Every task traces.** A task carries a requirement identifier from `docs/requirements.md`, or it is
  enabling work (`-`) and the plan says why it exists.
- **Every task has a done-when.** One sentence, verifiable by somebody who is not you.

## 2. Capacity — Weeks 8–16

| Week | Chapter, quiz, reps, milestone write-up | Available for this plan | 
|---|---:|---:|
| 8 | 12 | 8 |
| 9 | 7 | 13 |
| 10 | 5 | 15 |
| 11 | 7 | 13 |
| 12 | 7 | 13 |
| 13 | 7 | 13 |
| 14 | 7 | 13 |
| 15 | 7 | 13 |
| 16 | 7 | 13 |
| … | … | … |
| **Total** | **66** | **114** |

Declared project buffer: **25%** of available hours = **28.5 h**
Plannable effort (available − buffer) = **85.5 h**

## 3. Work breakdown

### WP-1 — Upload artworks  ·  requirements FR-UPL-01, FR-UPL-03, NFR-DATA-01, NFR-DATA-02, NFR-REL-01  ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-1.1 | Accepts .png and .procreate files into upload | FR-UPL-01 | 1 | 2 | 3 | 2.0 | A .png and .procreate file can both be accepted and the .procreate file must be optionally added | — |
| T-1.2 | Make sure that any other file is not accepted | FR-UPL-01 | 2 | 3 | 4 | 3.0 | No other files besides the .png and .procreate file can be accepted, all other are rejected with error message appearing | T-1.1 |
| T-1.3 | 2D, 3D, and both radio buttons for choosing gallery location | FR-UPL-03 | 1 | 2 | 3 | 2.0 | One of the 2D, 3D, or both must be chosen and it sorts it into the correct gallery based on the chosen location | T-1.2 |
| T-1.4 | Gives warning if it is duplicate file and asks them if they are sure they want to replace | NFR-DATA-01 | 1 | 2 | 3 | 2.0 | If a artist uploads a dupliate artwork it shows a warning message asking them if they are sure if they want to replace the files | T-1.3 |
| T-1.5 | If upload fails give them a failed upload message | NFR-DATA-02, NFR-REL-01 | 2 | 3 | 4 | 3.0 | After a failure an error message is shown to the artist describing something short on why it failed and what to do next | T-1.4 |

### WP-2 — Extract .procreate data  ·  requirements FR-EXT-04, FR-EXT-05, FR-GALL-02  ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-2.1 | Understand how the .procreate file is structured | FR-EXT-04 | 2 | 3 | 4 | 3.0 | Understand how and where the canvas informatin is and how to retrieve it | — |
| T-2.2 | Extract the canvas information | FR-EXT-04 | 3 | 4 | 5 | 4.0 | Canvas information such as the height, width, and dpi can be retrieved successfully | T-2.1 |
| T-2.3 | Mark the non found fields as n/a | FR-GALL-02 | 2 | 3 | 4 | 3.0 | If there is no canvas information for a specific field then it appears as n/a on the canvas information displayed side panel | T-2.2 |
| T-2.4 | Pair the canvas information .procreate file with the artwork | FR-EXT-05 | 3 | 4 | 5 | 4.0 | The .png and .procreate file that are uploaded together, there data is paired together so they are next to each other in the galleries | T-2.3 |

### WP-3 — Save artwork files into Database  ·  requirements FR-DATA-01, FR-DATA-02, NFR-DATA-01, NFR-SEC-01  ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-3.1 | Save the canvas information and artwork | FR-DATA-01 | 3 | 4 | 5 | 4.0 | The canvas information and artwork information are stored in the database and appears on the site so no reuploads need to happened | — |
| T-3.2 | Ensure that there are no more than 20 artworks | FR-DATA-02 | 1 | 2 | 3 | 2.0 | No more than 20 artworks are able to be stored in the database it prevents the artist from uploading more than 20 showing an error message if they are at there 21st | T-3.1 |
| T-3.3 | Ensure that what is being saved is not a duplicate file | NFR-DATA-01 | 2 | 3 | 4 | 3.0 | There is no duplicate files in the database, if the artist tries to reupload the same artwork only one is stored in the database | T-3.2 |
| T-3.4 | Ensure that secrets are not being exposed | NFR-SEC-01 | 1 | 2 | 3 | 2.0 | No secrets are found in the repository | T-3.3 |

### WP-4 — Make 3D gallery  ·  requirements FR-TDG-01, FR-TDG-02, FR-UPL-03, NFR-PERF-01, NFR-PERF-02, NFR-AVA-02, NFR-SEC-02   ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-4.1 | Display the artworks that were chosen to be in the 3D gallery | FR-UPL-03, NFR-SEC-02 | 2 | 3 | 4 | 3.0 | Any artwork that was selected to be in the 3D gallery in the upload process is placed in the 3D gallery | — |
| T-4.2 | Make sure that everything renders correctly by measuring performance and availability | NFR-PERF-01, NFR-PERF-02, NFR-AVA-02 | 1 | 2 | 3 | 2.0 | The website is able to load the website in a p95 under 25 seconds when there are 20 artworks in the galleries with throttled 3G internet in Chrome and maintain 30 FPS for 95% of a 60 second viewing session | T-4.1 |
| T-4.3 | Clicking on artwork shows canvas information with artwork overlay and clicking out closes it all | FR-TDG-01 | 1 | 2 | 3 | 2.0 | When a artist clicks on an artwork appears next to the canvas informatin and then clicking outside of it closes it | T-4.2 |
| T-4.4 | Zoom in and out in 3D gallery | FR-TDG-02 | 1 | 2 | 3 | 2.0 | The artist is able to zoom in and out of the 3D gallery | T-4.3 |

### WP-5 — Make 2D overview with contact section  ·  requirements FR-UPL-03, FR-GALL-02, FR-GALL-03, NFR-ACC-01, NFR-ACC-02, NFR-ACC-03, NFR-USE-02, NFR-SEC-02, NFR-AVA-02, NFR-USE-01  ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-5.1 | Display the artworks that were chosen to be in the 2D gallery | FR-UPL-03, NFR-SEC-02, FR-GALL-02, NFR-AVA-02 | 2 | 3 | 4 | 3.0 | Any artwork that was selected to be in the 2D gallery in the upload process is placed in the 2D gallery | — |
| T-5.2 | Ensure that there is no overlapping text and images | NFR-USE-02 | 1 | 2 | 3 | 2.0 | In the 2D overview the canvas information and artwork do not overlap each other in a standard Chrome screen size | T-5.1 |
| T-5.3 | Add contact component | FR-GALL-03 | 1 | 2 | 3 | 2.0 | The contact component is able to redirect the viewer to the artists email and send an email directly to them | T-5.2 |
| T-5.4 | Ensure that the overview is accessible | NFR-ACC-01, NFR-ACC-02, NFR-ACC-03 | 1 | 2 | 3 | 2.0 | The art gallery is able to be navigated with tabs and shift tab in a logical order | T-5.3 |

### WP-6 — Delete Artworks  ·  requirements NFR-PRIV-01, FR-UPL-02, NFR-REL-01, FR-DATA-02   ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-6.1 | Delete artwork and canvas information all at once | FR-UPL-02 | 3 | 4 | 5 | 4.0 | An artwork and its canvas information are able to be deleted all at once after confirming the deletion | — |
| T-6.2 | If delete fails/they cancel the delete make sure that there is a message and nothing is deleted | FR-UPL-02, NFR-REL-01 | 1 | 2 | 3 | 2.0 | If the delete fails or is canceled the database remains the same as it was before and nothing is deelted, an error message displays letting the artist know what happened | T-6.1 |
| T-6.3 | Make sure that it is still deleted even after reloading | NFR-PRIV-01 | 1 | 2 | 3 | 2.0 | An artworks and its canvas information are deleted they will not appear after reloading | T-6.2 |
| T-6.4 | Ensure that the artist can still upload another artwork and canvas information after deleting if they were at their maximum artworks | FR-DATA-02 | 1 | 2 | 3 | 2.0 | When the art gallery had a total of 20 artworks after deleting one of those it allows the artist to upload again to hit maximum 20 artwork limit | T-6.3 |

### WP-7 — Maintainability and Deployment ·  requirements NFR-MNT-01   ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-7.1 | Clean Clone Check | NFR-MNT-01 | 2 | 3 | 4 | 3.0 | A clean clone check is able to build successfully in under 10 minutes only using the README with no seeded artworks | — |
| T-7.2 | Deploy the art galleries | NFR-MNT-01 | 1 | 2 | 3 | 2.0 | When the art gallery is complete it is able to be deployed successsfully, loads and display the gallery without error | — |

`E = (O + 4M + P) / 6`  ·  spread `P / O` over 4 means: spike it or split it.

Repeat one block per work package. Then total every package into the roll-up below.

## 4. Roll-up

| Work package | Tasks | Raw E (h) | Calibrated (h) |
|---|---:|---:|---:|
| WP-1 Upload artworks | 5 | 12.0 | 13.2 |
| WP-2 Extract .procreate data | 4 | 14.0 | 15.4 |
| WP-3 Save artwork files into Database | 4 | 11.0 | 12.1 |
| WP-4 Make 3D gallery | 4 | 9.0 | 9.9 |
| WP-5 Make 2D overview with contact section | 4 | 9.0 | 9.9 |
| WP-6 Delete Artworks | 4 | 10.0 | 11.0 |
| WP-7 Maintainability and Deployment | 2 | 5.0 | 5.5 |
| … | | | |
| **Total** | | **70.0** | **77.0** |

Calibration factor from `docs/hours-log.csv`: **1.10×**
(actual hours ÷ expected hours over the tasks you have already finished)

## 5. Schedule

| Week | Work packages in flight | Planned hours | Gate / dependency |
|---|---|---:|---|
| <9> | <WP-0, WP-2> | <12> | <CI green before any feature merges> |

Rules: risky work first, integration before Week 12, nothing new starts after Week 14.

## 6. Burn-down baseline

| Week | Capacity | Ideal remaining | Projected remaining |
|---|---:|---:|---:|
| <8> | <4.0> | <65.2> | <97.9> |

First week the plan exceeds remaining capacity: **<week 8>**
Hours over plannable: **<32.7>**

## 7. The scope decision

| Cut / deferred / re-estimated | Item | Reqs | Hours recovered | MoSCoW before → after | Why |
|---|---|---|---:|---|---|
| cut | <WP-5 recipe suggestion> | <FR-031, FR-032> | <12.9> | Could → Won't | <one honest sentence> |


VERDICT: fits, with 15.5 h to spare

Signed: <your name>, <date>. Re-baselined after any change of more than <5> hours.
