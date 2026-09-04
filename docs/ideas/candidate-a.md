# Idea Canvas — Candidate A

**Candidate name:** Art Gallery, a place to keep all your artworks and their information in an interactive space
**Date started:** 2026-08-31   **Well it came from:** hobby

---

## 1. Problem statement

For              A artist with lots of pictures wants to show their non artist friends and familiy their artwork. 
who              An artist downloads and tries to find information about their art to show their recruiter or friends, after already having it downloaded, it creates duplicates. 
the problem is   They do not have an impressive place to put their art with all the info about it at hand that will prevent duplicates.
which costs      30 minutes each time they try to download and find information about their art
Today they       They could upload their photos to Instagram
which falls short because     Not everyone wants to download a large app to see their art and they want something that is more interacive with specifically the art and its details, not just commenting and liking.


## 2. Evidence a user exists

- **Person spoken to:** Stella S. (SS) - Advanced Artist
- **Date and length:** 2026-09-03, 30 minutes>
- **Three verbatim quotes:**
  1. Answering to question 1: "The last time I had to update my online art portfolio, I struggled. I had to go through so much more work processing images to my online art portfolio than actually making the drawings."
  2. Answering to question 2: "Today, I use a scanner digital recognition tool to capture pictures of my artworks to upload it to my digital gallery. Though, it does take quite a while to process and capture every single detail of the pieces."
  3. Answering to question 4: "I paid for a website modeler to create someplace I could show off my masterpieces"
- **The workaround they already use:** Paid a website developer to make a website for her
- **Full write-up:** `docs/interviews/2026-09-02-SS.md`

## 3. Candidate scope (Must features only)

| # | Feature (one vertical slice each) | Hours |
|---|---|---:|
| 1 | 2-D element - displaying artwork and listing canvas information from .procreate file (under the 2-d element) (have to write something that will extract it from the file) | interface 3 h   handler 3 h   data 6 h   validation 2 h error path 2 h  test 3 h      docs 1 h        subtotal 20 h |
| 2 | 3-D element - using blender with react three fiber to create dynamic enviroment that someone can easily go through each art work| interface 4 h   handler 3 h   data 2 h   validation 1 h error path 1 h  test 3 h      docs 1 h        subtotal 15 h |
| 3 | A way to upload the .procreate file of the artwork | interface 2 h   handler 1 h   data 0 h   validation 1 h
  error path 0 h  test 1 h      docs 1 h        subtotal 6 h  |
| 4 | A way to upload the .png of the artwork | interface 1 h   handler 1 h   data 0 h   validation 1 h
  error path 0 h  test 1 h      docs 1 h        subtotal 5 h |
| 5 | The website saves the data uploaded and extracted in to a database | interface 1 h   handler 1 h   data 1 h   validation 1 h
  error path 0 h  test 1 h      docs 1 h        subtotal 6 h |
| | Walking skeleton + CI | 6 h |
| | Deployment + clean-machine test | 2 h |
| | **Construction total** | 60 h|

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
  - Number 8 will be the hardest because I love the idea of having both a light and dark option but the 3-D element would make it hard to have both and it could take up a lot of time for what seems like a relativity small thing.

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass / fail | <technology list, each marked known/new> |
| **Get** — every dependency exercised for real | pass / fail | <status code, saved response, date> |
| **Ship** — a named deployment target, terms read | pass / fail | <target + pricing page read on YYYY-MM-DD> |
| **Show** — a stranger sees it work in 10 minutes | pass / fail | <the ten steps, written down> |

**Technologies:** Next.js (known) · React Three Fiber with Blender (new) · Tailwind CSS (known)
**Novelty load:** 1

## 6. The one hard part

<Name exactly one. Say what makes it hard in two sentences. If you can name three,
you have three projects.>

## 6.5. The pre-mortem
Two versions, and do them in this order.

Yours first. Write, by hand, the three most likely ways this project fails. Then ask an assistant: “It is Week 16. This project failed and I am writing the post-mortem. Give me the three most likely causes, in order of probability, each with the earliest week it would have become visible.” Compare.

Failure Mine / Earliest visible week / The trigger that would catch it
1. 
2. 
3. 

Failure / model / Earliest visible week	/ The trigger that would catch it
1. 
2. 
3. 

Log the prompt and what you kept in docs/ai-usage.md.

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | | |
| Fits ~45 hours of features | 3 | | |
| Novelty load | 2 | | |
| Dependencies verified | 2 | | |
| Demonstrable in ten minutes | 1 | | |
| **Total (max 55)** | | | |

## 8. If this candidate is rejected

<Write the rejection paragraph NOW, while you still like the idea. Name the gate it
failed, the number that killed it, and the condition under which you would revisit
it — or say plainly that it is closed, not deferred.>