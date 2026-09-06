# Idea Canvas — Candidate A

**Candidate name:** Art Gallery - a place to keep all your artworks and their information in an interactive space
**Date started:** 2026-08-31   **Well it came from:** hobby

---

## 1. Problem statement

For              An artist with lots of pictures that wants to show a recruiter to get a job and show their non artist friends and familiy their artwork for fun. 
who              who needs to organize and find information about their art to show their recruiter or friends
the problem is   they do not have an impressive place to put their art with all the information about it at hand that will prevent duplicates. 
which costs      30 minutes each time they try to organize and find information about their art. 
Today they       only show their photos of their artwork
which falls short because     photos do not keep the artwork together with all of its details or provides an interactive way to show all their artworks.

## 2. Evidence a user exists

- **Person spoken to:** Stella S. (SS) - Advanced Artist
- **Date and length:** 2026-09-03, 30 minutes
- **Three verbatim quotes:**
  1. Answering to question 1: "The last time I had to update my online art portfolio, I struggled. I had to go through so much more work processing images to my online art portfolio than actually making the drawings."
  2. Answering to question 2: "Today, I use a scanner digital recognition tool to capture pictures of my artworks to upload it to my digital gallery. Though, it does take quite a while to process and capture every single detail of the pieces."
  3. Answering to question 4: "I paid for a website modeler to create someplace I could show off my masterpieces"
- **The workaround they already use:** Paid a website developer to make a website for her
- **Full write-up:** `docs/interviews/2026-09-02-SS.md`

## 3. Candidate scope (Must features only)

| # | Feature (one vertical slice each) | Hours |
|---|---|---:|
| 1 | 2-D element - displaying artwork and listing canvas information from .procreate file (under the 2-d element) (have to write something that will extract it from the file) | interface 3 h   handler 3 h   data 5 h   validation 2 h   error path 2 h  test 2 h      docs 1 h        subtotal 18 h |
| 2 | 3-D element - using blender with react three fiber to create dynamic enviroment that someone can easily go through each art work| interface 4 h   handler 3 h   data 2 h   validation 1 h   error path 1 h  test 3 h      docs 1 h        subtotal 15 h |
| 3 | A way to upload the .procreate file of the artwork | interface 1 h   handler 1 h   data 0 h   validation 1 h   error path 1 h  test 1 h      docs 1 h        subtotal 6 h  |
| 4 | A way to upload the .png of the artwork | interface 1 h   handler 1 h   data 0 h   validation 1 h   error path 1 h  test 1 h      docs 1 h        subtotal 6 h |
| 5 | The website saves the data uploaded and extracted in to a database | interface 1 h   handler 1 h   data 1 h   validation 1 h   error path 1 h  test 1 h      docs 1 h        subtotal 7 h |
| | Walking skeleton + CI | 6 h |
| | Deployment + clean-machine test | 2 h |
| | **Construction total** | 60 h |

Budget: plan on **60 hours**, hard ceiling **75**. Above 75 you are borrowing from
testing and documentation, which are graded.

## 3.5. Reconcile the 2 estimates

Bottom-up (Rep 7): 60 h        Sizer (Rep 8): 74 h
Gap: 23.3 %      The assumption that differs: The sizer looked at more on how integrations, more  tech, etc. would effect the budget and it also estimated that the features would take longer than the bottom-up but it did not consider that three of the five features in my Rep 7 are smaller leading it too take less time, bottom-up mainly focused on just the features
The number I will plan against: 60 h     because I should stay in the budgeted plan of 60 hours so that I do not need to borrow from testing and documentation

## 4. Out of scope — will NOT be built

1. The project will be kept to a single user no user account system will be added
2. No advance AI features such as creating art with AI or an AI assistant
3. I will not create social media features (liking, commenting)
4. I will not build a store to purchase artworks
5. I will not build an API
6. It will not be a mobile app, web only
7. I will not build a messaging system built directly into the program, only a link for the email is okay
8. I will not build both a dark and light mode only dark

- Which of the eight will be hardest to keep out at 11 p.m. in Week 10? Write one sentence to your future self explaining why it stays out. That sentence is the whole point of this rep.
  - Number 8 will be the hardest because I love the idea of having both a light and dark option but the 3-D element would make it hard to have both and it could take up a lot of time for what seems like a relatively small thing.

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass | Vite.js with React (known) · React Three Fiber with Blender (new) · Tailwind CSS (known) |
| **Get** — every dependency exercised for real | pass | Vite and React, Tailwind CSS, React Three Fiber with Blender were all successfully installed and tested. The page loaded with styling applied, 2026-09-05 |
| **Ship** — a named deployment target, terms read | pass | Using Vercel to deploy, the project pricing page read on 2026-09-05 |
| **Show** — a stranger sees it work in 10 minutes | pass | Click on website URL, Observer inital home page, find upload tab in navigation, upload artworks, upload .procreate file in seperate upload box, click into 3-D scene, observe the world and its canvas that were uploaded, see canvas information extract and listed next to it, click out of 3-D scene, scroll down and see individual artworks and its information for people that perfer a 2-D element  |

**Technologies:** Vite.js with React (known) · React Three Fiber with Blender (new) · Tailwind CSS (known)
**Novelty load:** 1

## 6. The one hard part

The one hard part is that ensuring that the React Three Fiber with Blender displays onto the website. Another worry about it is because it is a larger feature, it might consume a lot more time then I previously expected.

## 6.5. The pre-mortem

Failure Mine / Earliest visible week / The trigger that would catch it
1. Features start to take longer then I expected / Week 9 / When work goes over the hard ceiling of 75 hours
2. React Three Fiber with Blender does not work and run on the website / Week 9 / After running a small 3-D scene in the website to ensure that it all loads and works properly without errors.
3. Extracting the .procreate data got too complicated / Week 9 / Using a test .procreate file to see if the extractor works and gets all the canvas information desired but the time it takes goes over the dedicated time for the week.

Failure / model / Earliest visible week	/ The trigger that would catch it
1. The scope exceeded the 60-hour budget / Copilot Auto / Week 2 / Five features included two high-risk integrations, yet the estimates already differed by 23.3%. The first missed milestone or task running over estimate would expose this
2. The 3-D gallery consumed the schedule / Copilot Auto / Week 10 / Blender plus React Three Fiber was the project’s main new technology and included navigation, artwork presentation, and environment work. A usable prototype by Week 10 would reveal whether performance, assets, or interaction problems were leaving too little time for the remaining features.
3. .procreate metadata extraction proved impractical / Copilot Auto / Week 11 / The project depended on extracting canvas information from a proprietary file format. Testing real files late in implementation could reveal unsupported or incomplete metadata before the database and final demonstration were ready.

Notes: When I compare the two it seems as though we both have similar concerns. However, the AI thinks that everything will take a lot longer than I think it will.

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | 5 | 15 |
| Fits ~45 hours of features | 3 | 3 | 9 |
| Novelty load | 2 | 3 | 6 |
| Dependencies verified | 2 | 5 | 10 |
| Demonstrable in ten minutes | 1 | 5 | 5 |
| **Total (max 55)** | | | 45 |

## 8. If this candidate is rejected

Not rejected