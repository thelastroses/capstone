# Week 4 Reps


## Rep 1 - Five adjectives, four fields

| Adjective | Metric | Threshold | Condition | Measurement method |
|---|---|---|---|---|
| interactive | Successful gallery interactions | 2 interactions fully successful | 20 seeded artworks, throttled "Fast 3G", Chrome | 2 interactions, clicking into 3D and onto artwork and scroll to view the artworks up close in the gallery, recorded successes in log |
| convenient | Upload artwork without assistance  | 2 interactions fully successful | 1 seeded artwork .png and .procreate file, throttled "Fast 3G", Chrome | uploaded artwork files without assistance, recorded uploaded artwork files in log |
| clean | Successful clean clone check  | 1 build fully successful under 10 minutes | 0 seeded artworks, throttled "Fast 3G", Chrome | Clone the repository following the README, record results |
| organized | Correct artworks and canvas information being displayed  | 20 artworks display properly | 20 seeded artworks, throttled "Fast 3G", Chrome | Ensure all 20 artworks are the ones that were intended to be there and there are no duplicates or missing, record results |
| captivating | Viewers interact with main artworks displayed in gallery  | majority of viewers 3 out of 4 | 5 seeded artworks, throttled "Fast 3G", Chrome | Viewers interact with gallery scenes without instruction record how many times they wanted to interact with scenes (clicks, zooms, etc) |

- The adjective that was hardest to convert was "captivating" because it is harder to record what is considered captivating for a viewer. What that difficulty told me about how well I understand my own system is that it will be harder to gauge whether our not something was captivating and enjoyable rather than if a certain thing is interactive or convenient.


## Rep 2 - The percentile drill

0.38 0.41 0.39 0.44 0.40 0.42 0.37 0.45 0.41 0.39 0.43 0.40 0.38 0.46 0.42 0.41 0.39 0.44 2.90 9.20

0.38 + 0.41 + 0.39 + 0.44 + 0.40 + 0.42 + 0.37 + 0.45 + 0.41 + 0.39 + 0.43 + 0.40 + 0.38 + 0.46 + 0.42 + 0.41 + 0.39 + 0.44 + 2.90 + 9.20 = 19.49 

19.49 / 20 = 0.9745
Mean = 0.97 seconds

0.37, 0.38, 0.38, 0.39, 0.39, 0.39, 0.40, 0.40, 0.41, 0.41, 0.41, 0.42, 0.42, 0.43, 0.44, 0.44, 0.45, 0.46, 2.90, 9.20

0.95 x 20 = 19

19th number is 2.90 => p95 = 2.90 seconds

Max = 9.20 seconds

Summary
Mean = 0.97 seconds
p95 = 2.90 seconds
Max = 9.20 seconds


Which of the three numbers you would put in a requirement, and why. 
- Out of the 3 numbers I would put in a requirment it would be p95 = 2.90 because the mean can be really low if there are many fast loads. p95 shows how 95% are at or below 2.90 which helps to show the bigger picture of load times while showing how some may get slower loading time. 


If your requirement said “average page load under 1.5 seconds,” would this system pass? Would your users agree?
- Yes the system would pass if the requirement said that the average page load was under 1.5 seconds because the average load time was 0.97 which is under 1.5 seconds. The users would not agree because sometimes a load could take up to 2.90 seconds and another could take up to 9.20 seconds which is significantly slower.


One more thing to notice, and it matters for your document: percentile has more than one definition — nearest-rank and interpolated methods give different answers on small samples. That is exactly why the method field exists. Write down which one you used.
- I used the nearest rank because I sorted the 20 times into ascending order and then did 0.95 x 20 which equals 19. The 19th number was 2.90 seconds so p95 was 2.90 seconds.


## Rep 3 — Diagnose and rewrite

NFR-1  The application should have good performance.
- unmeasurable, missing condition, aspirational - not verifiable, no measurement method
- NFR-PERF-01 Should An artist when running the application shall load the website in a p95 under 25 seconds when there are 20 artworks in the galleries with throttled 3G internet in Chrome. Measured with 20 artworks in the gallery loaded and it's nearest rank p95.

NFR-2  The system must be highly available and scalable.
- unmeasurable, missing condition, compound (two or more requirements in one), aspirational - not verifiable, no measurement method
- NFR-AVA-02 Must An artist when running the system shall have 19 of the 20 artworks display when viewing 20 artworks in the galleries with throttled 3G internet in Chrome. Measured with successful artworks displayed and results recorded.

NFR-2  The system must be highly available and scalable.
- unmeasurable, missing condition, compound (two or more requirements in one), aspirational - not verifiable, no measurement method
- NFR-SCAL-03 Must The artist when running the system shall be able to display 20 artworks without duplicate artworks in the gallery with throttled 3G internet in Chrome. Measured with previous artworks uploaded in upload tab with what is uploaded.

NFR-3  The UI shall be intuitive.
- unmeasurable, missing condition, aspirational - not verifiable
- NFR-INT-03 Must A viewer when running the website shall be able to navigate the artwork galleries with any component in 3 minutes without outside help with throttled 3G internet in Chrome. Measured with if the viewer is able navigate without outside help, record if completed successfully.

NFR-4  User data will be kept safe.
- unmeasurable, missing condition, aspirational - not verifiable
- NFR-DATA-04 Must A artist when uploading their artworks shall be able to comeback with their artworks in their gallery the next time they go into the website with throttled 3G internet in Chrome. Measured if all the artist's artworks saved and record if all saved successfully.

NFR-5  The code should follow best practices.
- unmeasurable, aspirational - not verifiable
- NFR-PRACT-05 Must A viewer will not see any unhandled exceptions, anything that fails they will get a message what happened and what to do next with throttled 3G internet in Chrome. Measured if there is a message for every failure and record results.

NFR-6  The app should work on mobile.
- unmeasurable, missing condition, solution-biased
- NFR-MOB-06 Won't (this release) The artist shall be able to open the website on a mobile device with throttled 3G internet in Chrome. Measured if the artist is able to open the website on a mobile device, record if it was successful.

Which of the six you found hardest to rewrite, and whether the difficulty was in the metric, the threshold, the condition, or the method?
- Out of the six I found hardest to rewrite was NFR-PERF-01 it was because the difficulty was in the condition I did not know whether the load should be under 25 seconds for if there were 20 artworks in the gallery or if that should be for an empty gallery.

Rep 4 — The data inventory

| Data element | Why you need it | Where it lives | How long you keep it | How a user gets rid of it |
|---|---|---|---|---|
| Canvas Information | Remember's artwork details when leaving and coming back to website | canvas_information table in Supabase | Until artwork deletion | Artwork deletion |
| Artwork Files | Used to display artworks in gallery | artwork_files table in Supabase | Until artwork deletion | Artwork deletion |
| Email address | Lets viewers contact someone about the artist's artwork | Not stored in gallery database or in gallery but is outside email website | Verify g-mail terms | N/A |

Name the two rows where you genuinely do not know the answer. For each, name the primary source you would read to find out — a vendor’s terms page, your hosting provider’s docs — and put it on your Week-5 list. Do not guess. Do not ask a chatbot and write down what it says.
- The row: email address, where I genuinely did not know what to answer was how long you kept and how a user gets rid of it. Since I am not saving the email address into my Supabase I wasn't sure what to put N/A or something else for the how a user gets rid of it. Then for the how long you keep it since I am not saving that data would I need to put or read g-mail's terms or do would I just put N/A again?

## Rep 5 - The mouse-unplugged pass

- I could not figure out how to get to compose button on the g-mail page until I switched over to my laptop keyboard instead of the keyboard I had plugged in. For some reason it would only work in that circumstance. 
- It took a lot of tabbing to get back to the place I actually wanted to use if I had tabbed too much out of one section.
- Getting to the settings icon was also hard/ time consuming because it required a lot of tabbing, I feel like it should have taken less takes to get there.

| ID | Requirement (metric · threshold · condition) | Priority | How it is measured |
|---|---|---|---|
| NFR-ACC-01 | A viewer must be able to move around each component in at most 20 tabs total with only using a keyboard, no mouse on Chrome | Must | Only using a keyboard a viewer should be able to reach the gallery and the upload tab in at most 20 tabs, record if each spot was reached |
| NFR-ACC-02 | When using the tab key the viewer should not lose their place on the website, the indicator should be at least 50% opacity of a black when something has been tab to and it is hovering over a button/component it should be visible on the website on Chrome | Must | When using tab to go through the website each component and button tabbed to, should be outlined of a 50% opacity of a black for key indication that it has been tabbed too |
| NFR-ACC-03 | A viewer must be able to tab through the website in a logical order with 0 components and buttons skipped when using tab and shift + tab on Chrome | Must | Using the tab key to move foward and shift + tab to move backwards it goes in a logical order missing 0/not missing any component or button, record if it was clear to do so |

## Rep 6 - Contrast and grayscale

Does not make sense for current state of project because the page is only one color and does not have other components or core features added in yet.

## Rep 7 - The prohibitions, and the history check

Five security requirements as prohibition:

- There must not be any Supabase keys, passwords and secrets in the repository being saved from the gallery. Ensure that .env is in the .gitignore and the .env.example only has example values. Run a search on the fully history not just the working tree to ensure that there are no secrets.

- The gallery must not have any security vulnerabilites and must be deployed using HTTPS. Ensure that there are no vulnerabilites by running npm audit in CI and that the deloped website uses HTTPS not HTTP. 

- A viewer and artist must not be able to input an artwork file that changes a query or command. It is measured by ensuring that no input from the artwork files is put into the database query or HTML and that there are no injection attacks possible.

- If there are anys failure to upload artwork and database errors they must be recorded and they should not be seen by the viewer and artist. To ensure that the website is safe test in the upload tab by uploading a invaild artwork file type and test a failure to the database. Make sure that each error is logged and is not shown directly to the viewer and artist only a simple error message.

- A gallery must not save artwork files that are corrupt and duplicate artwork files. To ensure this upload artwork files two times and make sure that the artwork can canvas information all display correcly and that the duplicate files are not kept.

## Rep 8 - Sort the pile

Here are twelve items from a real student’s “notes” section. Sort each into constraint, assumption, or dependency. Some are trickier than they look.

Constraints:
a. The course ends in Week 16.
c. I have no administrator rights on my laptop.
f. I can only work about 15 hours a week.
h. The charting library I want to use is GPL-licensed. (h) is a dependency and an obligation: you depend on the library, and its license imposes conditions on how you may distribute what you build with it.
j. I must demo live in a 30-minute session.

Assumptions:
b. The barcode API's free tier allows 1,000 calls per day.
d. The hosting provider will still have a free tier in December.
g. My roommates will test the app in Week 11.
k. Two hundred pantry items is a realistic maximum for one household.
l. The framework's auth module handles password hashing for me. (l) is an assumption right now and becomes a dependency the moment you verify it in the docs — which is a good picture of how assumptions are supposed to die.

Dependencies:
e. The app needs a hosted database.
h. The charting library I want to use is GPL-licensed.
i. CI minutes on my provider's free plan.


Constraints: a, c, f, j — you did not choose them and cannot change them. 
Assumptions: b, d, g, k, l — every one could turn out false, and each needs an owner and a verify-by date. 
Dependencies: e, i — outside your control, needing a pinned plan, a failure mode, and a fallback.

Rest of rep 8 is in requirements.md

## Rep 9 - Verify one obligation at the source

Write: did the primary source say what you expected? Name one thing you learned that you would not have guessed. If it said exactly what you expected, say so plainly — that is a real result too.

The one thing that I learned that I would not have guessed is that Supabase allows you to set a maximum upload size so that it prevents "users from uploading and then downloading excessively large files". This is good to know because it will help to manage how much is being uploaded into the database since artworks are typically not a set size and artworks can get pretty big if they include a lot of layers, strokes, or is a larger canvas size. It seemed like an obvious thing at after I read it, that Supabase would let you set an image but that simple detail is easy to forget when it comes to images.

Storage Docs:
https://supabase.com/docs/guides/storage/production/scaling 

Rest of rep 9 is in requirements.md

## Rep 10 - The enumeration pass, and the cull

Rep 10 is in requirements.md and ai-usage.md

## Rep 11 - Break it, then fix it

ORPHAN REQUIREMENT (2)
  - FR-005: no design element -- nothing in the system is responsible for it
    - Demote FR-005 to Could and record the decision
  - NFR-PRIV-02: no design element -- nothing in the system is responsible for it
    - Add design element such as a item name and identifier remover that removes identification fields before being sent to a third party model

UNTESTED REQUIREMENT (3)
  - FR-004: no test -- you cannot show it works, so it does not count
    - Test if the user is able to get back the right item by testing both the scanning and typing a barcode
  - FR-005: no test -- you cannot show it works, so it does not count
    - Test if more than one account can use the same household pantry and access its items
  - NFR-PRIV-02: no test -- you cannot show it works, so it does not count
    - Test sending in a item name and a user identifier to ensure that both can not be sent to a third-party model

UNMEASURABLE NFR (1)
  - NFR-PERF-02: no measurement method -- this is a wish, not a requirement
    - Use the barcode look up 5 times and record results if it able to return or time out within 3s

UNREQUESTED WORK (1)
  - ExportToCsvButton: built or planned with no requirement behind it -- cut it, or write the requirement and get it prioritized
    - Cut the ExportToCsvButton because there is no requirement behind it and record the decision

DUPLICATE ID (1)
  - NFR-ACC-02: appears 2 times; identifiers must be unique and stable
    - Delete duplicate row so that identifiers remain unique and stable, if it is truly a duplicate row with the same information. If it is not a duplicate row increment the id, log as modified, and record the decision.

Clean. Every requirement is designed, tested, and measurable.

Requirments listed in traceability-matrix.csv

Write: how many orphans you had on the first run, and whether any of them were requirements you had quietly stopped intending to build.
  - There were 0 orphans when I did the first run on the traceability-matrix.csv. All requirements I intend to build.

## Rep 12 - Write it then cut it

Write: which items you cut and why. Then a harder sentence: name the one item you kept that you are least sure you will honor, and say what you will change about your workflow to make it survive Week 12.
  - I did not cut any items the only one I edited was I got rid of, (or, for a CLI, remain readable with color disabled), because I will not be making a project that is for the terminal. The one item I kept that I am least sure that I will honor is having at least one automated test that covers the new behavior, and the whole suite passes locally because I feel like when I write the code and the feature works that testing it further, I might forget to do it or I get lazy and just want to move on. What I will change about my workflow to make it survive week 12 is that I will get ahead in days so that even if I am lazy or forget, I will have time to go back and time to motivate myself to test.