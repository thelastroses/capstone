## Rep 1 - Draw the request path, honestly

Which hop is the first no? Were you tempted to write yes for any of them, and what were you telling yourself when you were?
 -  The first hope that I had to say no to was the first on: Client / entry point. This is where a place shows an area where uploads can happen and a place to choose a scene where the artwork will display. I was not tempted to write yes for any of them because I knew that in realtity nothing could be marked as yes yet.I knew that if I did mark one as yes that it would leave my project in complete or in a worse position for Week 11.

 ## Rep 2 - Kill the first mock

Reflect: how long did it take, versus your Week-7 estimate for the same work? Write the delta into your hours log with a one-line note about why.
- How long it took to do the first hope is 2 hours which is the same for the estimate that I did in Week 7.

## Rep 3 - Rewrite five bad commit messages

These are real, and you have written all five. Rewrite each into a subject line under about fifty characters, imperative mood, with a one-sentence body explaining why:

1. fix
-   Fixed the request path 
-   Fixed the request path for #1 to more appropriately fit hop 1
2. update code
-   Updated the code in the 3D gallery
-   Updated the code in the 3D gallery to allow clicking and interactivity onto the artworks
3. WIP
-   The 3D gallery section is a work in progress
-   The 3D gallery section is a work in progress not yet including any canvas information data
4. Final version 2 FINAL
-   Added in the final version of the plan.md
-   Added in the final version of the plan.md so that it fulfills the Final Week requirements
5. changes requested by prof
-   Added in the requested changes by professor from Week 8
-   Added in the requested changes by professor from Week 8 for fixing the tracebility-matrix.csv

Produce: ten rewritten messages in your notes; then use the good form for the rest of the week. 

1. Updated CI
-   Updated the CI to have the lastest versions
-   Updated the CI to have the lastest versions so that there are no warnings in the console
2. Fix artwork not loading
-   Changed how the artwork location was being displayed
-   Changed how the artwork location was being displayed so that the deployed version is able to get it
3. Completed reps 6-8 and did half or rep 9
-   Completed work for reps 6-8 and finished half of rep 9 for declaring the buffer and find the gap for Week 7
-   6: Compute your calibration factor; 7: Run the checker; 8: Build the capacity table you will actually live in; 9: Declare the buffer and find the gap
4. Completed reps 1-5 for Week 7
-   Completed work for reps 1-5 for Week 7
-   1: Inventory the invisible work; 2: Decompose one work package properly; 3: The bad-WBS autopsy; 4: Three-point estimate everything; 5: The spread test
5. Leftover commits that did not get commited
-   Commited the pace-audit.py and package-lock.json
-   Commited the pace-audit.py and package-lock.json that did not get commited with previous commit
6. Testing CI changes
-   Added in code to ci.yml
-   Added in code to ci.yml to replace the npm run dev
7. Moved the 3D scene to a public folder
-   Moved over the 3D scene to a public folder so that the deployed version can access it
-   Moved over the 3D scene to a public folder so that the deployed version can access it and the 3D scene can be displayed
8. Updated wording
-   Updated wording in plan.md
-   Updated wording in plan.md to add in the completed tasks and factor
9. Finished rep 5-8 and half of rep 9 for adding in the migration decision
-   Completed work for reps 5-8 and half of rep 9 for adding in the migration decision in Week 6
-   5: One complete interface contract, for the one you understand least; 6: One error envelope, one status-code policy; 7: The data model, with invariants; rep 8: Three sequence flows, and the branch that matters; rep 9: The migration decision
10. Sentence fix
-   Updated a sentence in architecture.md
-   Updated a sentence in architecture.md to fit the question asked

Reflect: read your last ten subject lines as a list. Do they read like the changelog of a project or the diary of a tired person? Be specific about what gave it away.
-   Before it read like a diary of a tired person because it only says what rep it is sometimes which does not give a lot of context to what actually happened. Now they read like the changelog of a project. What gave it away was the lack of detail for what specifically happened with that commit.

## Rep 4 - Build the script contract

Reflect: which script was hardest to write, and what does that tell you about which part of your setup is not actually reproducible yet?
-   The setup script was the hardest to write because it has to install packages, start the database, apply migrations, and add sample data. That shows the database setup is the part that is hardest to reproduce on a new machine.

## Rep 5 - The stranger's machine

Time took: 6 minutes after adding the fixes below

Fixes made:
-   Changed 2D to 3D in supabase.test.mjs to match what is in the seed.sql
-   Added in a explanation into the README.md to give more details on how to run it in Chrome

Reflect: how many times did you restart? Every restart is a defect a grader would have hit in Week 16 — and you just found it for free.
I only had to restart once.

## Rep 6 - Pin everything

Reflect: if a dependency of yours published a breaking release tonight, would your build still pass tomorrow? Answer with evidence, not optimism.
-   If a dependency of mine published a breaking release tonight, my build would still pass tomorrow. This is because my package-lock.json does not change the version to the new released ones it keeps the versions the same as what it is in that file. Moreover, the .nvmrc states which Node version (22.12.0) to use so if there is a new release it does not get the latest breaking change. The npm ci is what installs the versions I have set specifically.

## Rep 7 - Ship the pipeline

Reflect: list every failure it took to get green. For each one, say whether it was a real portability problem or a workflow-syntax problem. The first kind is the valuable one — name what your laptop had that a clean machine does not.
- It failed because the build, lint, setup, start, and test where not executable - all that was done was made it executable; fixing it for a clean machine test
    - Portability problem because the scrips were not able to run because they were not marked as executable.
- Failed because it had the smoke test - commented it because the smoke file had not been made yet, that it for rep 9
    - Workflow-syntax problem the ci tried running the script/smoke even though it did not exist yet

## Rep 8 - Break it on purpose, twice

Push a deliberately failing assertion. Confirm the build goes red, open the log, and find the exact line that reports the failure.
Revert it. Now push a deliberate lint error — an unused import, a bad format. Confirm red again.
Fix both and get back to green.
If either push stayed green, your pipeline is decorative. Find out why before you go further; the usual culprits are || true, a suite collecting zero tests, or a lint config with everything disabled.

Produce: two red run URLs, the green run that followed, and the fix commits. 

Assert Fail URL (red): https://github.com/thelastroses/capstone/commit/ebad102d0250d9293e3a6da3c905a62e516e3694
Assert Revert URL (green): https://github.com/thelastroses/capstone/commit/58d50250236a37f4c0acdd738ee03776104d2dde

Lint Fail URL (red): 
Lint Revert URL (green): 

Reflect: how many scrolls did it take to find the real error in the CI log? If it was more than a few, what would you change about your test output so that future-you finds it faster at midnight in Week 12?