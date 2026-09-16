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

