# Idea Canvas — Candidate C

**Candidate name:** Baby Essentials - find items based on your and your baby's needs in a personalized list 
**Date started:** 2026-08-31   **Well it came from:** client

---

## 1. Problem statement

For              About to be mothers with no family support
who              About to be mothers need to buy specific items for the baby that also aligns with their material preferences, money sitation, wants, needs, and baby complications/no complications situation
the problem is   When a women gives birth she does not always have all the items she needs, she is are already in pain and does not have the time or energy to find the items that are right for her
which costs      Mothers buy unnessary items trying to find what is right for their babies costing them thousands, wasting at least 3 hours a week trying to find the right items, forgetting to buy at least 5 items because their is no specifc list made for them at hand
Today they       make a baby registery adding items from other stores and then comparing prices.
which falls short because     the list is not always based on their preferences, needs, and situation


## 2. Evidence a user exists

- **Person spoken to:** Tristen N (TN) - About to be mother
- **Date and length:** 2026-09-02, 30 minutes>
- **Three verbatim quotes:**
  1. Answering to question #1 "The last time I had troubles deciding what to buy for my soon to be baby, the amount of diapers I needed to buy and what brand."
  2. Answering to question #2 "I continue to deep dive research about any struggles I have"
  3. Answering to question #3 "I'd say the most annoying thing is looking at videos of other moms who make it seem like their life is so easy with their babies and buying a bunch of unnecessary things claiming that every mom needs."
- **The workaround they already use:** Fully deep diving into research and watching YouTube videos
- **Full write-up:** `docs/interviews/2026-09-02-TN.md`

## 3. Candidate scope (Must features only)

| # | Feature (one vertical slice each) | Hours |
|---|---|---:|
| 1 | Compare updated prices from different stores | interface 3 h   handler 1 h   data 3 h   validation 1 h   error path 1 h  test 2 h      docs 2 h        subtotal 13 h |
| 2 | A place to input preferences and then the personalized list from that | interface 4 h   handler 3 h   data 2 h   validation 1 h   error path 1 h  test 2 h      docs 2 h        subtotal 15 h |
| 3 | Search feature that allows a user to directly add a item to their list | interface 2 h   handler  1 h   data 1 h   validation 1 h   error path 1 h  test 1 h      docs 2 h        subtotal 9 h  |
| 4 | A favorites tab to remember what items they like but didn't directly add to their list | interface 1 h   handler 1 h   data 1 h   validation 1 h   error path 1 h  test 1 h      docs 2 h        subtotal 8 h |
| 5 | A vague essential item list that most mother's think are necessary items to buy  | interface 1 h   handler 1 h   data 1 h   validation 1 h   error path 1 h  test 1 h      docs 1 h        subtotal 7 h |
| | Walking skeleton + CI | 6 h |
| | Deployment + clean-machine test | 2 h |
| | **Construction total** | 60 h |

Budget: plan on **60 hours**, hard ceiling **75**. Above 75 you are borrowing from
testing and documentation, which are graded.

## 4. Out of scope — will NOT be built

1. The project will be kept to a single user no user account system will be added
2. No advance AI features such as creating art with AI or an AI assistant
3. I will not create social media features (liking, commenting)
4. I will not build a store to purchase baby items
5. I will not build an API
6. It will not be a mobile app, web only
7. I will not build a messaging system built directly into the program, only a link for the email is okay
8. I will not build both a dark and light mode only dark

## 5. Feasibility screen

| Gate | Verdict | Evidence (dated) |
|---|---|---|
| **Build** — novelty load ≤ 2 | pass | Vite.js with React (known) · API like Amazon Creators API but do not need to be a approved member of Amazon Associates program (new) · Tailwind CSS (known) |
| **Get** — every dependency exercised for real | fail | unverified - could not find an API that did not have for example, you need to be an approved member of the Amazon Associates program in order to use it. If the API was free it did not fit exactly with what I was looking for. Vite and React, Tailwind CSS were all successfully installed and tested. The page loaded with styling applied, 2026-09-05 |
| **Ship** — a named deployment target, terms read | pass | Using Vercel to deploy, the project pricing page read on 2026-09-05 |
| **Show** — a stranger sees it work in 10 minutes | pass | <the ten steps, written down> |

**Technologies:** Vite.js with React (known) · API like Amazon Creators API but do not need to be a approved member of Amazon Associates program (new) · Tailwind CSS (known)
**Novelty load:** 1

## 6. The one hard part

The one hard part is finding a good API that does not require you to be an approved member of a program. Then using that API to compare prices live from different stores where the purchase relies on that API's data.

## 7. Scorecard (1–5 each; weight in parentheses)

| Criterion | (w) | Score | Weighted |
|---|---:|---:|---:|
| Evidence a user exists | 3 | 4 | 12 |
| Fits ~45 hours of features | 3 | 3 | 9 |
| Novelty load | 2 | 5 | 10 |
| Dependencies verified | 2 | 1 | 2 |
| Demonstrable in ten minutes | 1 | 5 | 5 |
| **Total (max 55)** | | | 38 |

## 8. If this candidate is rejected

The gate it failed was the Get gate because I could not find an API that did not have for example, you need to be an approved member of the Amazon Associates program in order to use it. If the API was free it did not fit exactly with what I was looking for. The dependency score on the score card got a 1 out of 5 because of this. I think that the idea is good but it fully depends on having an very good API. I could not revisit it until I found an API I could use.