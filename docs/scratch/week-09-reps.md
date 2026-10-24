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

Produce: two red run URLs, the green run that followed, and the fix commits. 

Assert Fail URL (red): https://github.com/thelastroses/capstone/actions/runs/39861649300/job/120113576267
- error: 'Expected "actual" to be strictly unequal to: 9' (line 11) Error: Process completed with exit code 1. (line 33 - Test Tab)
Assert Revert URL (green): https://github.com/thelastroses/capstone/actions/runs/39862968327/job/120118021392

Lint Fail URL (red): https://github.com/thelastroses/capstone/actions/runs/39863478363/job/120119735020 
-   Lint failed: remove trailing spaces from the lines above. (line 5) Error: Process completed with exit code 1. (line 6 - Lint Tab)
Lint Revert URL (green): https://github.com/thelastroses/capstone/actions/runs/39864106153/job/120121845027

Reflect: how many scrolls did it take to find the real error in the CI log? If it was more than a few, what would you change about your test output so that future-you finds it faster at midnight in Week 12?
-   A single/no scroll. I was able to find that it hit an error very quickly after it got an error nothing needed to be changed so that future me finds it faster at midnight in Week 12.

## Rep 9 - Make the skeleton walk in CI

Produce: a passing script/smoke in CI, plus the terminal output showing it fail with the data store stopped. 
-   Passing: SMOKE OK: http://127.0.0.1:54321/rest/v1/artwork?select=png_name returned the seeded row (eye.jpg). The skeleton walks.
=   Failed with Data Stored Stopped: SMOKE FAIL: nothing answered at http://127.0.0.1:54321/rest/v1/artwork?select=png_name within 30s (client -> route hop)

Reflect: in one sentence, what exactly does your smoke test prove that a unit test of the same code does not?
-   What a smoke test proves that a unit test of the same code does not is a smoke test proves that when the app is running that it is able to get seeded artwork from the database.

## Rep 10 - Issues that point back at requirements

Reflect: which requirements have no issue, and which have nothing verifying them? Those two lists are the honest state of your project. Write them down.
-   All the requirements have an issue. 
-   All the requirements do not have anything verifying them because none of them are done.

## Rep 11 - The secrets audit and the rotation plan

-   "clean: nothing tracked"
-   "clean: nothing in history"
-   There were no secrets, keys, token, passwords committed

Reflect: if a key of yours leaked at 2 a.m. tonight, what is the first thing you would do? If your answer is “delete the file and force-push,” reread 9.7 — the answer is rotate first.
-   If a key of mine leaked at 2 a.m. tonight the first thing that I would do is to look at the runbook.md to see the steps that I would need to do, so that the Supabase key gets rotated.