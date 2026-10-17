# Design Review Checklist — Capstone Baseline Gate

Six areas. Answer every item **yes / no / partial**, and write one line of *evidence* —
a section number, a requirement id, a table row, a commit. An item with no evidence
counts as **no**. These are the same six areas the Design Review Auditor uses.

Copy this file into your repo as `docs/review/design-review-checklist.md` and fill it in.

---

## Area 1 — Requirements complete and traceable

- [Yes] Every functional requirement has a unique id, an actor, an action, an object, and a condition.
    - Commit 4719071: Did stakeholders and personas on requirements.md; interviewed with stella and transcribed interview into elicitation-interview-guide.md on 2026-09-09; updated ci.yml; - Sep 9 ; 
    - Commit 96ef762: Completed all of the definitions and the functional requirements; then used the find the holes prompt on the functional requirements and fixed what it suggested - Sep 13 
    - requirements.md Section #5. Functional Requirements
- [Yes] Every functional requirement has acceptance criteria a stranger could execute without asking you a question.
    - Commit 4719071: Did stakeholders and personas on requirements.md; interviewed with stella and transcribed interview into elicitation-interview-guide.md on 2026-09-09; updated ci.yml; - Sep 9 ; 
    - Commit 96ef762: Completed all of the definitions and the functional requirements; then used the find the holes prompt on the functional requirements and fixed what it suggested - Sep 13 
    - requirements.md Section #5. Functional Requirements
- [Yes] Every requirement carries a MoSCoW priority, and the Must set is written down as a list.
    - Commit 4719071: Did stakeholders and personas on requirements.md; interviewed with stella and transcribed interview into elicitation-interview-guide.md on 2026-09-09; updated ci.yml; - Sep 9 ; 
    - Commit 96ef762: Completed all of the definitions and the functional requirements; then used the find the holes prompt on the functional requirements and fixed what it suggested - Sep 13 
    - requirements.md Section #5. Functional Requirements
- [Yes] Every non-functional requirement states a metric, a threshold, a condition, and a measurement method.
    - Commit: 3e8f653 Did rep 8-10 + updated ai-usage.md + put all the nfs into requirements.md - Sep 18
    - requirements.md Section #6. Non-Functional Requirements
- [Yes] The traceability matrix maps each Must requirement to at least one specification section.
    - Commit 60db00f: Milestone-4: NFR's, traceability-matrix, and definition of done - Sep 19
    - traceability-matrix.csv
    - FR-UPL-01,functional,Must,An artist shall be able to upload their artwork without any outside help within 5 minutes.,Interview with Stella,Upload Artworks,T-001,acceptance criteria AC-001..003,planned
- [Yes] The traceability matrix maps each Must requirement to at least one planned test.
    - Commit 60db00f: Milestone-4: NFR's, traceability-matrix, and definition of done - Sep 19
    - traceability-matrix.csv
    - FR-UPL-01,functional,Must,An artist shall be able to upload their artwork without any outside help within 5 minutes.,Interview with Stella,Upload Artworks,T-001,acceptance criteria AC-001..003,planned
- [Yes] No requirement contains the words *user-friendly*, *fast*, *robust*, *intuitive*, *scalable*, or *etc.* without a number attached.
    - requirements.md Section #5. Functional Requirements
- [Yes] The out-of-scope list exists and names at least three things you are deliberately not building.
    - requirements.md Section # 7. Out of Scope
    - User/artist account system; Artwork store; Rearranging artworks in the 3D; Light and dark mode; A place to take pictures built directly into the website

## Area 2 — Interfaces fully specified

- [Yes] Every external interface (HTTP endpoint, CLI command, queue topic, file format) is listed in one place.
    - docs/diagrams/Level2-Containers.png
- [Yes] Each interface names its inputs with types, its outputs with types, and its error responses.
    - Commit 099bf98: Finished rep 5-8 and half of rep 9 for adding in the migration decision - Oct 2
    - architecture.md Section #5. Interface Contracts
- [Yes] Status codes or exit codes are enumerated, including the failure cases, not just the happy path.
    - Commit 099bf98: Finished rep 5-8 and half of rep 9 for adding in the migration decision - Oct 2
    - architecture.md Section #5. Interface Contracts
    - 204 artwork and related files deleted successfully | 400 invalid or missing information such as invaild .png, .procreate file, gallery type, artwork id | ... etc
- [Yes] Authentication and authorization are stated per interface, not assumed globally.
    - Commit 099bf98: Finished rep 5-8 and half of rep 9 for adding in the migration decision - Oct 2
    - architecture.md Section #5. Interface Contracts
    - Uses Supabase key in .env to connect to Supabase project. The .env file is in the .gitignore so that it is not committed to the repository.
- [Yes] Every third-party service you call is named with the specific operation you call, and what you do when it is unavailable.
    - architecture.md Section #2. System Context (Level 1)
    - docs/diagrams/Level1-Context.png
- [Yes] Rate limits, quotas, timeouts, and retry behavior are stated as numbers.
    - architecture.md Section #5. Interface Contracts; #8. Error Handling and Edge Cases; #9. External and Nondeterministic Dependencies
- [Yes] Nothing in the interface section says "handle errors appropriately."
    - architecture.md Section #5. Interface Contracts

## Area 3 — Data model sound

- [Yes] Every entity has a primary key and named attributes with types.
    - architecture.md Section #6. Data Model
    - id  integer  NOT NULL  PK
- [Yes] Every relationship states its cardinality and what happens on delete.
    - architecture.md Section #6. Data Model
    - Relationships  artwork 1 ──── 0..1 procreate_data
    - Created when the artists uploads an artwork file successfully. Hard deleted with cascade when the artist deletes the artwork and the related procreate_data is deleted with it's artwork.
- [Yes] Units are explicit for every quantity, duration, money, and measurement field.
    - width integer NULL (null = width is not available from that .procreate file) ex. 4320
    - gallery_type text NOT NULL Has to be either 2D, 3D, or both - enum: '2D' | '3D' | 'Both' |
- [Yes] Time fields state a time zone policy and a storage format.
    - No time fields will be added
- [Yes] Personal data is identified as such, with a retention and deletion answer.
    - architecture.md Section #6. Data Model
    - png_name, png_path, width, height, dpi, procreate_path
    - Retained until the next version of the system comes out for when the user accounts system is added in, linking it to an actual person which is then it would implement the deletion
- [Yes] There is a migration story: how the schema changes after data exists.
    - architecture.md Section #6. Data Model
    - Mechanism: Supabase tool
    - supabase\migrations\20261003064358_0001-initial.sql
- [Yes] At least one worked example row exists for each core entity.
    - supabase\migrations\20261003064358_0001-initial.sql

## Area 4 — Risks owned

- [Yes] Every risk in the register has a likelihood, an impact, a trigger, an owner, and a response.
    - risk-register.md
    - R-01
- [Yes] The response is an action, not an attitude ("switch to library X" beats "be careful").
    - risk-register.md
    - (R-01) Mitigate by Week 10 - test the extraction on a .procreate file and ensure that it returns the wanted fields
- [Yes] Every technology you have never used before appears as a risk.
    - risk-register.md
    - R-03
- [Yes] Every free tier, trial, credit, or borrowed access appears as a risk with an expiry date.
    - risk-register.md
    - R-09, R-10
- [Yes] Every dependency on another human being appears as a risk.
    - There is no dependency on another human being for my project
- [Yes] At least one risk has already had its trigger checked this week, with the result written down.
    - risk-register.md
    - R-09 - Supabase Free Plan is still free

## Area 5 — Definition of done written

- [Yes] The definition of done is a single list that applies to every requirement.
    - definition-of-done.md
    - Section: The checklist
- [Yes] It names the test evidence required before a requirement counts as done.
    - definition-of-done.md
    - Section: The checklist
    - Every acceptance criterion for that requirement passes, checked by running it — not by reading the code.
    - At least one automated test covers the new behavior, and the whole suite passes locally.
- [Yes] It names the documentation required before a requirement counts as done.
    - definition-of-done.md
    - Section: The checklist
    - Any behavior change a stranger would need to know is reflected in `README.md`, `CHANGELOG.md`, or `docs/runbook.md`.
    - It traces to a requirement ID in `docs/requirements.md` (or a new requirement was added and the traceability matrix updated).
- [Yes] It states what "merged" means: branch, review, checks passing.
    - definition-of-done.md
    - Section: The checklist
    - The branch is merged only after the pipeline is green on the merge commit.
- [Yes] It is achievable in the hours you have — check one Must requirement against it end to end.
    - requirements.md Section #5 Functional Requirements
    - plan.md Section #3 Work breakdown
    - FR-EXT-04, it is achievable in the hours I have
    - WP-2: 14hrs

## Area 6 — Plan within budget

- [Yes] The work breakdown covers every Must requirement; no Must requirement lacks a task.
    - plan.md Section #3 Work breakdown
- [Yes] Every task has an estimate produced by a stated method, not a round number guessed at.
    - plan.md Section #3 Work breakdown
    - T-1.1
- [Yes] The total estimate for the Must set fits inside the hours remaining, with buffer left over.
    - plan.md Section #4 Roll-up
    - plan.md Section #2 Capacity — Weeks 8–16
- [Yes] The schedule names which week each work package finishes.
    - plan.md Section #5 Schedule
- [Yes] The hours log is current through this week and matches the calendar.
    - plan.md Section #5 Schedule
    - plan.md Section #2 Capacity — Weeks 8–16
    - docs\calendar\updated-october-calendar-picture.png
- [Yes] Buffer is a named, quantified line in the plan, not the hope of working faster later.
    - plan.md Section #2 Capacity — Weeks 8–16

---

## Entry criteria (the moderator refuses the review without these)

1. All six artifacts are in the repository and pushed.
2. The author has run this checklist over their own package first.
3. No load-bearing section says TBD.
4. The reviewer's brief names the time box and what kind of finding is wanted.

## Exit criteria (you may not declare a baseline until these hold)

1. Every Critical and Major defect has a written disposition.
2. Every rejected finding has a written reason.
3. Rework on Majors is verified, and the verification is recorded.
4. The review report is written, dated, and committed.