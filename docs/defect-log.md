# Defect Report & Defect Log

---

## The seven required fields

1. **ID and one-line title** — `DEF-014 — Expiry warning misses items expiring today`
2. **Environment** — build/commit, OS, runtime or browser, which data set
3. **Steps to reproduce** — numbered, minimal, starting from a known state
4. **Expected vs. actual** — both stated, in that order, in the observable world
5. **Evidence** — failing test name, log excerpt, screenshot path, request/response
6. **Severity and priority** — assigned *separately*, each with a one-line reason
7. **Traceability and status** — requirement ID, test case ID, status, owner, resolution

---

## Defect report block

```
ID:          DEF-001
Title:       When uploading a file that is not a .png or a .procreate there is no toast pop up
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit ec7bfb4, Windows 11, Node runtime 22.12.0, seed data set small - 1 artwork
Requirement: FR-DATA-01 / AC1   Test case: TC-021

Steps to reproduce:
  1. Upload a file that is not a .png or .procreate file
  2. Scroll down to confirm that it put that file in the rejected list
  3. See that there is no toast pop up

Expected: A toast pop up appears at the top of the upload page
Actual:   No toast pop up. Rejected files only appear under rejected files list no extra indication occured.

Evidence: TC-009 fails; Valid artwork is not a .pdf

Severity: S4 — still has red text and puts rejected file in the rejected list but just does not have toast pop up
Priority: P1 — quick fix that it a common failure.

Status:   Fixed — commit e4f5a6b. Acceptance test: TC-009.
Owner:    Jennifer Spencer

```

ID:          DEF-002
Title:       Dropzone glitches out when dropping a file in to upload
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit -, Windows 11, Node runtime 22.12.0, seed data set small - 1 artwork
Requirement: NFR-USE-02 / AC1   Test case: TC-041

Steps to reproduce:
  1. Open file explore
  2. Choose artwork to upload
  3. Drag and drop the artwork over the dropzone upload box

Expected:  Upload box to change text and remain the same size when uploading artwork by dragging and dropping
Actual:   Upload area does not glitch out causing the page to move up and down quickly

Evidence: TC-021 fails; holding artwork over dropzone makes page go up and down quickly

Severity: S4 — simple UI fix that makes user experience worse
Priority: P1 — quick fix for a common thing to do, dragging and dropping a file directly into upload area

Status:   Fixed — commit -. Acceptance test: TC-021
Owner:    Jennifer Spencer

```

ID:          DEF-003
Title:       After deleting the 20th artwork allow another upload
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit ec7bfb4, Windows 11, Node runtime 22.12.0, seed data set small - 1 artwork
Requirement: FR-DATA-02 / AC2   Test case: TC-044

Steps to reproduce:
  1. Upload 20 artworks in upload page
  2. Remove one artwork
  3. Upload a artwork after it is removed

Expected: Upload process allows another artwork to be upload after deleting the 20th artwork
Actual:   Upload process did not allow another artwork after deleting the 20th artwork

Evidence: TC-044 fails; Toast pop up not allowing another artwork

Severity: S3 — not many would uploud 20 artworks but still is important enough to fix
Priority: P1 — quick fix needs to be done even though rarely met

Status:   Fixed — commit e4f5a6b. Unit test: TC-044.
Owner:    Jennifer Spencer

```

ID:          DEF-004
Title:       Do not allow duplicate artworks
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit ec7bfb4, Windows 11, Node runtime 22.12.0, seed data set small - 2 artworks
Requirement: FR-UPL-01 / AC2   Test case: TC-002

Steps to reproduce:
  1. Open upload page
  2. Upload a artwork
  3. Upload the same artwork file

Expected: Do not allow duplicate artwork
Actual: Allows duplicate artwork

Evidence: TC-002 fails; duplicate artwork is added to uploaded artworks and database

Severity: S3 — Not met often but still affects the whole upload process testing
Priority: P1 — easy to fix, relevant to other fixes in the area

Status:   Fixed — commit ec7bfb4. Unit test: TC-002.
Owner:    Jennifer Spencer

```
ID:          DEF-005
Title:       Selecting the both radio button uploads it to the 2D gallery as well
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit ec7bfb4, Windows 11, Node runtime 22.12.0, seed data set small - 1 artwork
Requirement: FR-UPL-03 / AC1   Test case: TC-006

Steps to reproduce:
  1. Upload an artwork in the upload page
  2. Select gallery type
  3. Go back to Home page and scroll down to 2D overview

Expected: The artwork uploaded selected into the both galleries appears in both galleries 2D and 3D
Actual:   Artwork does not appear in any gallery

Evidence: TC-006 fails; Did not upload the artwork to the 2D gallery or 3D

Severity: S3 — affects the testing of the gallery but still is able to be worked around to test the 2D by only selecting the 2D option
Priority: P1 — it is on the demo path and the fix looks like a one-line change.

Status:   Fixed — commit e4f5a6b. Acceptance test: TC-006
Owner:    Jennifer Spencer

```

ID:          DEF-006
Title:       When there are no artworks, the scroll bar is no longer there, the white space is not there on the right side of the page
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit -, Windows 11, Node runtime 22.12.0, seed data set small - 1 artwork
Requirement: NFR-USE-02 / AC1   Test case: TC-041

Steps to reproduce:
  1. Go to upload page
  2. Remove all uploaded artworks
  3. Look at the right side of the screen and see white patch

Expected: When there are no artworks upload the scroll bar is not there and has a black gray background
Actual:   When there are no artworks upload the scroll bar is not there and has a white background

Evidence: TC-041 fails; leaving white space on the right side of the screen when no artworks are uploaded

Severity: S4 — is a cosmetic change that affects the inital viewing of the website
Priority: P1 — it is on the demo path and the fix looks like a one-line change.

Status:   Fix — commit -. Acceptance test: TC-041.
Owner:    Jennifer Spencer

```

ID:          DEF-007
Title:       Limit only .png and .procreate when clicking on the drop zone to open file explorer
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit , Windows 11, Node runtime 22.12.0, seed data set small - 1 artwork
Requirement: FR-EXT-04 / AC1   Test case: TC-025

Steps to reproduce:
  1. Go to upload page
  2. Click on the upload file dashed box
  3. In file explorer custom files see what it allows when initially opening

Expected: The file explorer custom files allows one .png and one .procreate
Actual:   The file explorer custom files allows .exe, .com, .bin, and an additional .png

Evidence: TC-025 fails; Shows Custom Files allowing .exe, .com, .bin, and an additional .png

Severity: S4 — Changes what the artist views not what the artist can actually upload
Priority: P1 — is visual in any non drag and drop upload fix is simple

Status:   Fixed — commit -. Acceptance test: TC-025.
Owner:    Jennifer Spencer

```

ID:          DEF-008
Title:       TC-011 integration test failing
Reported:    2026-11-06 by Jennifer Spencer
Environment: commit ec7bfb4, Windows 11, Node runtime 22.12.0, seed data set small - 1 artwork
Requirement: FR-DATA-01 / AC1   Test case: TC-011

Steps to reproduce:
  1. Run the integration tests
  2. TC-011 pass .txt
  3. See the file get rejected before upload is tried

Expected: TC-011 stores a valid .png, storage reject, no artwork row created
Actual:   Failing CI not ok 5 - TC-011 creates no artwork when Storage rejects the PNG upload

Evidence: TC-011 fails; GitHub Actions # 104 commit ec7bfb4

Severity: S3 — test issue that prevented it from passing green
Priority: P1 — prevents the CI from running green

Status:   Fix — commit -. Integration test: TC-011; Unit test: TC-011.
Owner:    Jennifer Spencer

---

## Severity ladder (how bad is it, in the product)

| Code | Meaning | Test |
|---|---|---|
| S1 | Data loss, security exposure, or the system will not run | Would you stop a release for it? Yes. |
| S2 | A Must requirement is not met; no acceptable workaround | Yes, unless documented and accepted. |
| S3 | A requirement is partly met, or there is a real workaround | No — but it is written down. |
| S4 | Cosmetic, wording, or a Could-priority gap | No. |

## Priority ladder (when do we fix it, given the calendar)

| Code | Meaning |
|---|---|
| P1 | Fix now — next thing you touch |
| P2 | Fix this iteration |
| P3 | Fix if hours remain; otherwise ship it as a known defect |
| P4 | Will not fix — recorded, with the reason |

Severity is a fact about the product. Priority is a decision about your remaining
hours. They are set by different people in industry, and by the same person wearing
two different hats here — write down which hat you were wearing.

---

## Defect log table

| ID | Title | Req | Sev | Pri | Found by | Status | Fix commit | Test |
|---|---|---|---|---|---|---|---|---|
| DEF-001 |  |  |  |  |  |  |  |  |