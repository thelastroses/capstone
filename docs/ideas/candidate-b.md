# Idea Canvas — Candidate B

**Candidate name:** Safe Miles - find trails that are safe in your local area
**Date started:** 2026-08-31   **Well it came from:** campus

---

## 1. Problem statement

For              New students at a college that are also new to running
who              The new student runners try to figure out the safest trail around them that also aligns with their abilities and wants in a run
the problem is   The new student runners do not know the area around them since they have moved away from home, every new run risks running in an unsafe area and pushing themselves to an unhealthy length
which costs      They waste 30 minutes and serval runs (3) trying to firgure out where to run, which may lead them to not running at all.
Today they       ask previous runners where to go
which falls short because     those paths are not always tailored to your abilites and it doesn't always mean they are safe


## 2. Evidence a user exists

- **Person spoken to:** Paige J. - Started to get into running 1 month ago
- **Date and length:** 2026-09-02, 45 minutes>
- **Three verbatim quotes:**
  1.  Answering to question #1 "After moving on campus I was concerned because the city is dangerous so I went to the center of campus but that is getting boring quick"
  2.  Answering to question #2 "I keep running in random directions until I feel like it but it always causes me to walk at the end because I could not make it home"
  3.  Answering to question #3 "The most annoying part is I never know where to run so it makes the run a bit more complicated and have more turns than I would normally like to do."
- **The workaround they already use:** Strava - only tracks runs does not suggest trails
- **Full write-up:** `docs/interviews/2026-09-02-PJ.md`

## 3. Candidate scope (Must features only)

| # | Feature (one vertical slice each) | Hours |
|---|---|---:|
| 1 | Shows popular local trails displaying its length and difficulty | interface 3 h   handler 2 h  3 data  h   validation 1 h   error path 1 h  test 2 h      docs 2 h        subtotal 14 h |
| 2 | A place to input preferences to get personalized runs | interface 2 h   handler 2 h   data 1 h   validation 1 h   error path 1 h  test 2 h      docs 2 h        subtotal 11 h |
| 3 | Custom path maker that displays warnings for any unsafe or too difficult paths | interface 4 h   handler 4 h   data 2 h   validation 1 h   error path 3 h  test 2 h      docs 2 h        subtotal 18 h  |
| 4 | A place to save safe paths, favorite paths and past runs | interface 3  h   handler 3 h   data 1 h   validation 1 h   error path 0 h  test 1 h      docs 2 h        subtotal 11 h |
| 5 | A weekly run schedule designed for them | interface 2 h   handler 2 h   data 1 h   validation 1 h   error path 1 h   test 1 h     2 docs  h        subtotal 9 h |
| | Walking skeleton + CI | 6 h |
| | Deployment + clean-machine test | 2 h |
| | **Construction total** | 71 h |

Budget: plan on **60 hours**, hard ceiling **75**. Above 75 you are borrowing from
testing and documentation, which are graded.

## 4. Out of scope — will NOT be built

1. The project will be kept to a single user no user account system will be added
2. No advance AI features such as creating art with AI or an AI assistant
3. I will not create social media features (liking, commenting)
4. I will not build a store to purchase workout items
5. I will not build an API
6. It will not be a mobile app, web only
7. I will not build a messaging system built directly into the program, only a link for the email is okay
8. I will not build both a dark and light mode only dark

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass | Vite.js with React (known) · Google Maps API (new) · Tailwind CSS (known) |
| **Get** — every dependency exercised for real | fail | unverified - Google Maps API was free but required credit card information, did not want to put in credit card information only until it was an idea I was not going to reject. Vite and React, Tailwind CSS were all successfully installed and tested. The page loaded with styling applied, 2026-09-05 |
| **Ship** — a named deployment target, terms read | pass | Using Vercel to deploy, the project pricing page read on 2026-09-05 |
| **Show** — a stranger sees it work in 10 minutes | pass | Click on website URL, Observer inital home page, see popular local trails listed, find tab to input preferences with runs, get personalized run based of the information inputed, find custom path maker tab, make custom path, find out its warnings for the inputted path, save paths and find the saved paths on different page after navigating to it from tabs above, find weekly run schedule designed for them under popular local trails |

**Technologies:** Vite.js with React (known) · Google Maps API (new) · Tailwind CSS (known)
**Novelty load:** 1

## 6. The one hard part

The hard part is finding popular paths with the data from an API. While also ensuring that the popular path also fits their preferences and distance requirements.

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | 4 | 12 |
| Fits ~45 hours of features | 3 | 1 | 3 |
| Novelty load | 2 | 3 | 6 |
| Dependencies verified | 2 | 3 | 6 |
| Demonstrable in ten minutes | 1 | 4 | 4 |
| **Total (max 55)** | | | 31 |

## 8. If this candidate is rejected

The gate that it failed at was that it went over the ~45 hours of features. It got a 1 out of 5 because on the fits ~45 hours of features because the software will take over the hard ceiling of 75 hours. It scored the lowest on the scorecard. Additionally, even after cuting two things on the candidate scorecard it still said that I would not finish this. In order to revisit it I would need to not be in the capstone class and have a lot of my own personal time to complete it. It is not fit for this course's class week length. 