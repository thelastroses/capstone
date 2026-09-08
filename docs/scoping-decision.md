# scoping-decision — Art Gallery

**Author:** Jennifer Spencer  ·  **Date:** 2026-09-04  ·  **Course week:** 2

---

## 1. Problem

For an artist with lots of pictures that wants to show a recruiter to get a job and show their non artist friends and familiy their artwork for fun. Who needs to organize and find information about their art to show their recruiter or friends
the problem is   they do not have an impressive place to put their art with all the information about it at hand that will prevent duplicates. The problem is they do not have an impressive place to put their art with all the info about it at hand that will prevent duplicates. Which costs 30 minutes each time they try to organize and find information about their art. Today they only show their photos of their artwork which falls short because photos do not keep the artwork together with all of its details or provides an interacive way to show all their artworks.

## 2. Evidence a user exists

Interviewed Stella S. (SS) - Advanced Artist on <2026-09-03, 30 minutes, past-tense questions only.
Full write-up in `docs/interviews/2026-09-02-SS.md`.

 - Answering to question 1: "The last time I had to update my online art portfolio, I struggled. I had to go through so much more work processing images to my online art portfolio than actually making the drawings."
  - Answering to question 2: "Today, I use a scanner digital recognition tool to capture pictures of my artworks to upload it to my digital gallery. Though, it does take quite a while to process and capture every single detail of the pieces."
  - Answering to question 4: "I paid for a website modeler to create someplace I could show off my masterpieces"

## 3. Chosen scope — Must features

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
| | **Feature total** | 54 h |
| | Walking skeleton + continuous integration | 6 h |
| | Deployment + clean-machine test | 2 h |
| | **Construction total** | 60 h |


Plan: 60 hours. Hard ceiling: 75. My number: 60. It does not leave slack, if the project goes over the hours then I will cut the features that take the least amount of time first and then simplify how much is done on the larger features next.

## 4. Should features — built only if there is room

The should features that are built only if there is room and all main features are completed. A button that redirects a recuriter to send an email directly to me. It would cost an additional hour to build. Built before Week 12 is finished. A search feature that lets you search artwork by title or by specific categories. It would cost an additional 5 hours to build. Built before Week 12 is finished. If I fall behind and can not complete additional features I would first cut the search feature because it consumes more time and then the button that redirect to my email. 

## 5. Out of scope — will not be built

The project will be kept to a single user no user account system will be added · No advance AI features such as creating art with AI or an AI assistant · I will not create social media features (liking, commenting). · I will not build a store to purchase artworks. · I will not build an API · It will not be a mobile app, web only · I will not build a messaging system built directly into the program, only a link for the email is okay · I will not build both a dark and light mode only dark

## 6. Accepted tradeoffs

When I deliberately chose a cheaper design that costs the user something is when I choose to make it only for a single user. Unfortunately, this does not allow multiple people to use the site and it would have cost me over 15 hours to build. It helped to save me time from building an entire user accounts system. Allowing me to stay in the 60 hour budget. In order to revist I would need a lot more time to be a developer and for a user to request the feature. 

Another deliberate choice I chose to have a cheaper design is not to include light and dark mode only dark because it could get tricky with the 3-D element. It costs the user's user experience. It would have costed 7 hours or more if I ran into problems with the 3-D element if it could not easily switch modes. I accepted not adding this in because it helped me to stay within my 60 hour budget. In order to revist this I would need more time to be a developer and for a user to request the feature. 

## 7. Rejected candidates

**Rejected: Safe Miles.** The gate that it failed at was that it went over the ~45 hours of features. It got a 1 out of 5 because on the fits ~45 hours of features because the software will take over the hard ceiling of 75 hours. It scored the lowest on the scorecard. Additionally, even after cuting two things on the candidate scorecard it still said that I would not finish this. In order to revisit it I would need to not be in the capstone class and have a lot of my own personal time to complete it. It is not fit for this course's class week length.  

**Rejected: Baby Essentials.** The gate it failed was the Get gate because I could not find an API that did not have for example, you need to be an approved member of the Amazon Associates program in order to use it. If the API was free it did not fit exactly with what I was looking for. The dependency score on the score card got a 1 out of 5 because of this. I think that the idea is good but it fully depends on having an very good API. I could not revisit it until I found an API I could use.

## 8. Hour budget, reconciled

| Weeks | Phase | Hours |
|---|---|---:|
| 1–2 | Inception | 30 |
| 3–4 | Requirements | 30 |
| 5–6 | Design | 30 |
| 7 | Planning | 15 |
| 8 | Design review + midterm | 15 |
| 9–12 | Construction + verification | 60 |
| 13 | Documentation | 15 |
| 14 | Deployment + handoff | 15 |
| 15–16 | Presentation + delivery | 30 |
| | **Total** | **240** |

My construction total fit inside the 60/75 line being 60 hours and what I cut to make it fit was the should features and had I to accept the tradeoffs.

## 9. The one hard part

The one hard part is that ensuring that the React Three Fiber with Blender displays onto the website. Another worry is because it is a larger feature, it might consume a lot more time then I previously expected.

## 10. Risks and the scope-cut trigger

| Risk | Likelihood | What it costs me | Early warning sign |
|---|---|---|---|
| React Three Fiber and Blender does not work and properly run on the website | M | It cost time, eating into testing and documentation hours | The 3-D scene does not load properly by Week 9 |
| The .procreate extraction gets too complicated and takes longer than expected | M | It costs time and it may prevent some of the information fields from displaying, that I wanted | It takes up more time then the time that is dedicated for that week (Week 9) |

**Scope-cut trigger.** If am over the 75 hour hard ceiling by the end of Week 12 (2026-11-14), I will cut the feature that saves all the infromation into a database to keep it there for the next time you go on the website would be cut first, then the feature that uploads the .png file. Then if I am some how still in a bad position the feature that uploads the .procreate file. Decided now, in advance, so I do not have to decide it while panicking.

---

**Signed:** Jennifer Spencer, 2026-09-04
**AI use for this document:** None