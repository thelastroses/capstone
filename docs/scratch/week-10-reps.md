## Rep 1 - Cut this week’s slices

SLICE: FR-DATA-02 — The amount of artworks an artist can save and upload into the database will be capped.
Layers:       In the upload tab gives limit message if at limit and stop the upload → Checks if artworks are under 20 → Supabase database and storage → Supabase saves artwork and canvas information
Demo in one sentence: The artworks an artist can upload and save into the database to be displayed in the galleries will be limited to 20, if over gets a limit message.
Acceptance criteria to satisfy: AC-01, AC-02
Estimate (three-point):  optimistic 1 h | likely 2 h | pessimistic 3 h
Riskiest unknown: If two artworks, the 20th and 21st, are uploaded at the same time will it still prevent the 21st artwork from uploading?

SLICE: FR-GALL-02 — Artwork overview that display the 2D artworks.
Layers:       The 2D arwork overview → retrieves all the saved artworks and with their canvas information → Supabase database and storage → Supabase gets the artwork and canvas information
Demo in one sentence: The artwork overview gets the artworks when the 2D overview is selected in the upload process which then displays it with its artwork and canvas information.
Acceptance criteria to satisfy: AC-01, AC-02
Estimate (three-point):  optimistic 2 h | likely 3 h | pessimistic 4 h
Riskiest unknown:  Can the 2D overview get all the artworks at once?

SLICE: FR-UPL-03 — Choose where the artwork displays: in the 3-D scene, 2-D overview, or both.
Layers:       The radio buttons for the gallery selection in the upload tab → Checks that what is selected is 2D, 3D, or both saved the selected gallery type → Supabase database → Supabase saves the gallery type
Demo in one sentence: In the upload tab the artist chooses where they want their artwork with its canvas information optionally to be displayed in 2D, 3D, or both galleries.
Acceptance criteria to satisfy: AC-01, AC-02
Estimate (three-point):  optimistic 1 h | likely 2 h | pessimistic 3 h
Riskiest unknown:  Will the artwork display in the current gallery based on the selection?


Reflect: Which slice did you put first, and is it first because it is the riskiest or because it is the most fun? If those are different slices, say why you are overruling the rule — or reorder.
-   The slice that I put first is for the FR-DATA-02 — The amount of artworks an artist can save and upload into the database will be capped because it is the riskiest of the rest of the Must have functional requirements that has not been started. It is not because it is the most fun. Even though it will not take the most amount of time, with the risk it may be tricky to get the logic working.

## Rep 2 - Find the horizontal task hiding on your board

V = 13; H = 7 
-   Folded all H's into a V slice.

Reflect: How many H tasks did you have? Horizontal tasks are not evil — a migration is a migration — but a board that is mostly H is a board that cannot demo anything in Week 15. What is your V-to-H ratio?
-   I had 7 H tasks. My V-to-H-ratio is 13:7 = 1.86.

## Rep 3 - Adapt the definition of done, then use it as a weapon

Task: I-2 - [FR-DATA-01] Save Artworks Successfully and Ensure 20 Artwork Limit   Checks passed: 7/10   Checks that fail: #2, #4, #5

What I am doing about it: fix now

Reflect: Which check failed first? Almost every student fails on the same one — the test, the docs update, or the log entry. That is your personal weak point for the next six weeks; name it out loud.
-   The check that failed first was #2 because I do not have any automated tests. My personal weak point for the next six weeks is needing to add in more tests.

## Rep 4 - The four passes on your ugliest file

Pick the file in your repository you least want someone else to read. 
Record what each pass found:

Dropzone.jsx

| Pass | Findings | Fixed / logged / accepted |
| 1 Diff | 0 | n/a |
| 2 Stranger | 0 | n/a |
| 3 Adversary | 6 | Fixed |	
| 4 Contract | 0 | n/a |

Reflect: Which pass found the most? Pass 3 usually wins, and pass 4 usually finds the one that matters.
-   The pass that found the most was #3 Adversary. 


## Rep 5 - Open a pull request to yourself

Branch, push, open a pull request in the web interface, review your own diff there, leave at least two review comments on your own code, then merge. Confirm CI ran on the branch before the merge.

Branch: 

Reflect: Did the web diff view show you anything the editor did not? Most students find at least one thing - unfamiliar presentation is a cheap substitute for a second pair of eyes.
-   No, it did not reveal any problems I am familiar with the diff view

## Rep 6 - A prompt contract, not a wish

Wish prompt: When I click on the upload button on the home page to go to the upload page I want the images to appear slowly.
Contract prompt:  saved at prompts/2026-10-31-image-prompt.txt
Assumptions the model listed that I had not stated: How long the fade duration should be, it should be on repeated visits not just a one time thing, animation timing, and the animation should not change the layout or upload behavior. 

Reflect: Compare the two outputs. What did the wish version assume about your project that is not true? Those assumptions are the two hours of reconciliation you just avoided.
-   The wish version did not give me what happens if it does not load and it gave me an optional change. The wish version assumed what I wanted to name my class selectors and that I would want to change how my dropzone.jsx code was.


## Rep 7 - Explain it, break it, rewrite it

Lines I stalled on:        I did not stall on any lines
What broke it:             If image is not there or valid it gives artwork failed to load.
Could I rewrite it?        yes

Reflect: If you could not rewrite it, you have found the module you do not own yet. What are you going to do about that this week — study it, or replace it?
-   I could rewrite it.

## Rep 8 - Write both ai-usage entries

Reflect: Read the bad one as if you were a grader who has never met you. What would you assume about the student who wrote it? That assumption is exactly what a thin log buys you.
-   I would assume that they did not read the code that was generated and did not test that it worked.

## Rep 9 — Rewrite five bad commit messages

| Actual message | What it should have said |
|---|---|
| Updated sql name | Updated sql name 20261026035805_0006-create_artworks_bucket.sql to add the 0006 for order |
| Updated migrations for local database | Updated migrations for local database for the seed.sql and added create_artworks_bucket.sql for the policies |
| Changed eye jpg to pumpkinpie .png | Changed eye jpg to pumpkinpie .png in App.jsx to test change that the pumpkin image would appear |
| Changed eye jpg to pumpkinPieImage.png | Changed eye jpg to pumpkinPieImage.png in ci.yml, script/smoke, supabase.test.mjs to test change that the pumpkin image would appear |
| Rep 12 Clean Clone | Updated skeleton-trace.md with the commit that made it walked and added in rep 12 to the weeks scratch file and images to show that it passed the clean clone for rep 12 |

Reflect: How much of why is recoverable from your history right now — say, three weeks from now, when you need to know why you chose the retry count you chose? Be honest.
-   I feel like it is much more recoverable now then it was 2 weeks ago I feel like I have gotten better at adding in details that help to explain the changes; though it can always be improved.

## Rep 10 - Reconstruct one honest day, then run the report

Reflect: What did the report flag? And separately: what does your phase distribution say about where the semester actually went? If Construction is 15% of your hours in Week 10, that is not a scandal — it is a fact you now have to plan around.
-   It only flagged one of my logged hours which was for a day I worked for 11 hours which makes sense that it would think it was backfill but for me and knowing how I am, I was suprised there weren't more long hour days like that. It only flagged one which I think is pretty good and realistic and it made me realize that I should take more breaks. The phase distribution says that most of the time went to the inception stage: 23.9% and construction: 22.1%, which makes sense.

## Rep 11 — The secret you almost committed

Whatever you find, decide in writing: rotate now, or confirm it was always a placeholder. Then verify your ignore file covers the real config file, and confirm every credential your project needs is read from an environment variable and documented — by name only — in README.md.

Credentials my project uses:  VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
Read from:                    env var
In history?                   no
Ignore file covers:           .env, .env*, .env.local, *.pem, *.key, credentials.json, service-account*.json

Reflect: If a real key were in your history right now, what would your next four steps be, in order? Write them down. The reason to write them today is that the day you need them you will be panicking.
-   Follow the runbook.md - Where each credential comes from, How to rotate it, Who to tell, How long rotation takes.

## Rep 12 — The five-minute demo, rehearsed and recorded

Write the demo script — literal clicks or commands, in order, with the exact input values — commit your seed data, and rehearse the three acts on a timer: the claim (45 s), the software (3 min), the evidence and the gap (75 s). Then record it.

Act 1 opening line (write it verbatim): ________________________
Act 2 script steps: 1. ______ 2. ______ 3. ______ 4. ______
Act 2 failure path shown: ______________________________________
Act 3 what is NOT done, and when it is scheduled: ______________
Recorded fallback saved at: ____________________________________

Reflect: Time the first run. Where did you go over? The overrun is almost always in Act 2, and almost always because you improvised instead of following the script. What are you cutting?