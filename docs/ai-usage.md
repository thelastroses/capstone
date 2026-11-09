# ai-usage

# AI Usage Log — Capstone Project

**Owner:** Jennifer Spencer · **Policy set:** 2026-08-27 · **Last entry:** 2026-09-18

## Policy

**Spine rule.** The human stays in the loop where the judgment lives. AI accelerates;
I decide, I verify, and I am accountable for everything in this repository.

**The line I do not cross.** I will not delegate a judgment I cannot defend. If I
cannot explain a decision in this repository in my own words, under questions,
without the tool in front of me, it does not go in.

### Tools I have decided to use

| Tool / product | Model or version, as best I can name it | What I will use it for | What I will never use it for |
|---|---|---|---|
| Copilot | Agent/Ask/Plan Auto | I will use it to plan out a component that I already generally know how to make, one that will save me time, I will use the Ask feature to ask questions to better understand aspects that I do not understand and I will then use the Agent to build out that component; I will only use AI code that I fully understand, can defend, and explain line by line | I will not use it to write my own reflections, records, memos; I will not have it write something that I can not fully understand, defend, and explain line by line; I will not use another's private data or classmate's work |
| ChatGPT | GPT-5.6 Luna | ChatGPT will be used in the same way as Copilot | ChatGPT will not be used for the same things as what is listed in the Copilot column "What I will never use it for" |

### Zones

| Zone | Covers | What I owe |
|---|---|---|
| Green (assistive) | error-message explanation, reformatting, grammar, boilerplate I fully understand, rubber-ducking a design I already drafted | nothing; work normally |
| Amber (generative) | drafted requirements, scaffolded code I keep, generated tests, proposed architecture, documentation prose | one row in the table below, the day it happens |
| Red (prohibited) | generated decision records, memos, or reflections submitted as mine; a choice I cannot defend; another person's private data or a classmate's unsubmitted work; code I cannot explain line by line | do not |

### Disclosure

Every Amber-zone use appears below. Generated code that survives into `src/` carries a
comment naming the date of the log entry that covers it. Nothing in `docs/adr/`, the
memos, or the reflections is generated text.

## Entries

| Date | Tool / model | What I asked | What I kept | What I changed | How I verified |
|---|---|---|---|---|---|
| 2026-08-27 | Copilot Auto | "How would I go about making a .gitignore file for a next.js, typescript, and tailwind css project" |  It gave me what I would put in the gitignore (even though I never mentioned to do that) for a next.js, typescript, and tailwind css project, I kept 11 of those files | I removed 14 files: .nyc_output/, out/, and dist/ + some of the enviroment, IDE settings and all log files. Added in 3 files: .vercel/ + .env* + *.log | I looked up each file that was going to be ignored and looked if they would be necessary |
| 2026-08-27 | ChatGPT GPT-5.6 Luna | I pasted the sixteen-week table from §1.2 into the assistant and asked "Make me a calendar that is from August 24 to December 6 with 2-3 hour work blocks totaling 240 hours with week 8 and 14 being broken weeks with the hours moved foward" | I changed how it was formatted, how hours are dispersed throughout the week doing 1-5pm on the weekends and changed the hours on the weekdays to be 2-4pm | I verified with my Google Calendar and added up the hours to ensure I had 240 |
| 2026-09-04 | Copilot Auto | "It is Week 16. This project failed (The Art Gallery) and I am writing the post-mortem. Give me the three most likely causes, in order of probability, each with the earliest week it would have become visible" | I kept the main paragraph that it gave me | I changed how it was formatted and had to change 2 weeks because it did not know the order in which things will be done during the 16 week span | I verified with the calendar and the hat that would be taken on during the certain weeks |
| 2026-09-11 | Copilot Auto | "FIND THE HOLES 'Here are my 24 functional requirements. Do not rewrite them. List every situation a user could get into that none of these requirements covers, and for each, name the identifier that should have covered it.'" | I kept more so the ideas that Copilot gave and rewrote a few sentences to fill in the holes, it more so helped to point out the holes, then to write it for me | I changed how it was formatted and how sentences were laid out, I only filled in the holes that seemed the most relavent and that made sense with the requirements and the system | I verified by comparing the requirements in the sample with my requirements and then rereading my requirements with the holes listed to really make sure whatever I was adding was necessary |
| 2026-09-18 | Copilot Auto | "Act as a skeptical senior engineer reviewing this before a design review. List the NON-FUNCTIONAL requirements and external obligations I have not written
down. For each: name the category; say what about MY project triggers it; propose a measurable target with metric, threshold, condition, and measurement method; and flag anything I must verify against a primary source. Do not invent vendor limits, prices, license terms, or regulations — where a claim depends on one, say "verify" and name the source I should read." and pasted in my functional requirements and charter | I kept not even half of what Copilot Auto outputted, I kept 4 of 22 of the nfrs because a lot of them seemed rather unnecessary or talked about what I had already written in a different font. I kept 2 of the 9 obigations that it outputted because it would just rewrite what I had or do duplicates of the same obligation it already mentioned. It got wrong that it needed things like rollback procedures but this seems pretty excessive for this capstone project with a time constraint. | I changed how the sentences where structured but I did like how a lot of them where concise | I verified by comparing what I had written and what I want for my project with what Copilot outputted and really made sure that anything I added was actually necessary |
| 2026-09-22 | Copilot Auto | "For a solo developer building an artwork gallery where artists are able to input their artworks into a 3D and 2D gallery with its canvas information right next to it, over about 200 remaining hours, list eight options for [the decision]. Include at least two that are unfashionable. For each: one sentence on what it is best at, and one sentence on its most common failure mode. Do not recommend one." | I kept the 8 options that it gave me and some of the failure mode sentences it gave me because I like how it was worded. I felt it did a better job at wording it then when I did | I changed how all of it was formatted and rewrote a couple sentences and picked which would be the 3 top three for pruning | I verified by comparing it to the database I choose and to the ones that I saw while I was researching for what would be a good database for my project. I compared what I remember reading/researched and what I saw to what the AI outputted. The AI had a 5/5 hit rate, it got all 5 claims correct |
| 2026-10-04 | ChatGPT GPT-5.6 Luna | "You are the senior engineer who will inherit this project. Name the five places this design will break first, and for each, the requirement it violates and the cheapest change that would prevent it. Do not compliment the design." | There were not to many significant changes so I kept some of the formatting updates and other small updates with wording to make the statements stronger. | I changed how it worded things and shortened some of the unnessaryly long answers it had | I verified by checking with what I had written down and what I have made specific in other documents such as requirements.md |
| 2026-10-10 | ChatGPT GPT-5.6 Luna | I asked: "List every task required to deliver this, including setup, error handling, tests, and documentation. Do not estimate anything" and gave it WP-1 | I kept the ideas it gave me and added it into tasks that I had already written up | I changed how it was a seperate task and just added it into a small one since it seem worthy of a seperate task | I verified by checking my requirements I had already written in the requirements.nd and with what I had already written in the plan.md|
| 2026-10-10 | ChatGPT GPT-5.6 Luna | I asked: "Name fifteen risks for a solo nine-week build with a third-party dependency. Give each a cause, an event, and a consequence"| I kept one risk since the others were repeats or just unnecessary for my current version. | I changed how it was worded so that it to fit into my task more cleanly | I verified by checking looking at all the risks and determined if I truley needed it and I looked at everything as a whole. |
| 2026-10-17 | ChatGPT GPT-5.6 Luna | I gave it my requirements specification, technical specification, and the checklist areas and asked: "You are a skeptical senior engineer reviewing a design for a project that ONE student must finish in 90 hours. You are hunting defects, not suggesting improvements. For every finding output exactly: section |requirement id (or "none") what is wrong severity (Critical/Major/Minor) why it matters during construction. Do not propose solutions. Do not comment on style. If you are not certain a section says what you claim, mark the finding "UNVERIFIED"."| I kept every single output, 16 of them, it gave because each one needed to be logged in the review defect log even if it was going to be rejected anyways | I changed every Major into a Minor and one Trivial because it made every single output a Major even though it was a small change that would not take long to fix | I verified by checking what I had written in the requirement.md already with what the ai was saying was a defect to be fixed and determined if it was a fake request or if it actually needed to be fixed based on what my project is and the guidelines request |
| 2026-10-18 | Copilot Auto | I asked "How should I fix my ci from failing" | I kept the code it gave me because I was not expecting it to actually do code changes but what it gave me helped to fix it from failing | I changed the versions so that nothing is deprecated and no warnings pop up | I verified that the code was right by reading through it and ensuring the npm run dev still runs properly, I also looked in the GitHub Actions tab to ensure that it was successful |
| 2026-10-21 | Copilot Auto | I asked "How do I do this? Create the script/ directory (or your stack’s equivalent) with five files, each of which does its whole job in one command: Fill them in. script/setup must go from a fresh clone to a runnable project — dependencies from the lock file, database created, migrations applied, one row seeded. If that is eleven steps, then the file has eleven lines and the stranger still types one command. Produce: five executable scripts, committed, plus a ## Run it section in README.md that uses them." | I kept the five scripts that it gave me because it was something that I did not know how to write and have not done before | I did not have to change anything after reading through it, everything that it wrote made sense for why it was there and it passed the tests successfully. Only small formatting things but nothing really/major | I verified that the code was right by reading through it, looking things up the individual lines to see what it did for things that I did not fully understood and ran the commands in the readme to ensure they resulted successfully |
| 2026-10-22 | Copilot Auto | I asked "Change the three defaults to match my project, and wire it into the pipeline as the last stage." | I kept what it gave me and then modified my ci.yml based off the changes it made | I did not have to change anything after reading through it, everything that it wrote made sense for why it was there. I ran the smoke script through AI since the other scripts where made by them. I thought it was fit to do to ensure that I did not miss anything | I verified that the code was right by reading through it, looking things up the individual lines to see what it did for things that I did not fully understood |
| 2026-10-24 | ChatGPT GPT-5.6 Luna | I asked it to make the procreate Extraction for jsx and to extract as many different fields as it could. I gave it the .procreate file so that it could inspect it and see if it could get more than the dpi and fields that I had already analyzed myself that I knew it had | I kept the main extraction that it gave me but at first it wrote it in python so I had it convert it to make it jsx because I did not want to have to find a way for it to connect with my other jsx by making an api | I changed the amount of fields it gave me, it gave me a lot of unnecessary ones that would most likely only return null anytime it extracted | I verified by looking into the .procreate file and looked at what it would output with what was the in procreate canvas information settings to ensure that the fields lined up, I read through it thorughly to ensure that the code made sense and that I understood it |
| 2026-10-25 | Copilot Auto | I asked it to make the procreate extracted information be able to work with the useCallback function in Dropzone.jsx  | I kept what it gave me after reading through it thorughly | I changed the amount it gave me I removed some unnecessary if statements it gave and added in my own code so that the it updates with the png too | I verified by reading through it thoroughly and ensuring that the extracted info was the same values as what was in the procreate canvas information settings |
| 2026-10-31 | ChatGPT GPT-5.6 Luna | I gave it Dropzone.jsx and index.css then asked "On the upload page when going into it from the home page, the already uploaded artworks. I want the artworks on my upload tab page to fade in slowly when I first go into the page from the home page. I want it to be visually appealing to the eye. Call the css class selector as .smooth-load. If the images fail to fade in give error message. Only modify the index.css file, a place to put the error message, and only modify the image <img> line in the Dropzone.jsx file. Only add the most necessary lines for this task to be completed nothing extra. Then list every assumption you made that I did not state." | I kept everything but the onAnimationEnd because it did not work after testing it the rest of it survived around 15 lines of the 20 lines of code | I changed the error handling getting rid of the onAnimationEnd  because it did not work after testing it and changed the alert to a toast | I verified by reading through it thoroughly and testing what it gave me worked in the console |
| 2026-10-31 | Copilot Auto | I asked it what would unit tests for the procreate extraction file look like | I kept most of what it gave me 60 lines but had to modify a lot and add more tests | I changed it from using import test from 'node:test' to import { test } from 'vitest' so that it would work with my jsx files, I also changed the values it added, and had to fix the Invalid canvas dimensions assert so that it would pass green, I added more unit tests that were missing | I verified by reading through it thoroughly and testing that the unit tests ran green |
| 2026-11-01 | Copilot Auto | I asked it to fix the pumpkin pie image from not showing in the local database, to have it upload for me into the supabase storage | I kept what it gave me besides changing what the pumpkinpie url was | I changed the pumpkinpie url for the seed-storage.mjs | I verified by reading through it thoroughly and testing with node --env-file=.env.local script/seed-storage.mjs to see that it was successfull |
| 2026-11-05 | Copilot Auto | I asked it to create all the tests cases that are listed in the traceability.csv and ensure that it follows this: 30–60 unit tests, 5–15 integration tests, and one acceptance test per Must requirement | I kept the majority of tests that it gave me getting rid of 5 because it seemed repetitive | I changed how much information that the test cases had outputted removing extra cases that were there to make it more descriptive but that were not necessary | I verified by reading through it thoroughly and testing that all of the tests passed when running npm run test:all |
| 2026-11-05 | Copilot Auto | I asked it to generate them with a script and a fixed seed; commit both the seed and the output. Then make seeding a single command and put that command in the test plan’s Environment section. Also to run the existing suite against the hostile set. | I kept the majority of what it gave me since running npm run seed -- --set all and npm test passed | I changed the amount it gave me removing extra information it put in the README.md and removed extra tests it put in the hostileData.test.mjs | I verified by reading through it thoroughly and testing that all of the tests passed when running npm test |
| 2026-11-06 | Copilot Auto | I asked it why the integration test was failing for TC-011 | I kept the file that it made for me and the lines in the integration test | I did not have to change anything besides extra information in the readme because the tests started to pass because of what it added | I verified by reading through it thoroughly and testing that all of the tests passed when running the integrations tests in a clean clone |
| 2026-11-08 | Copilot Auto | I asked it to display one artwork at a time on a canvas in the 3D gallery | I kept 50 of the lines that made it display one artwork at a time | I had to change a lot, the ui was all messed up, the background could not be clicked off to close anymore, the sizing and positioning of the artworks where all wrong, had to make an additional test for the 3D gallery, I had to make the loading smoother | I verified by uploading artworks to the 3D gallery and ensuring that there was only one artwork that was displayed on a canvas with its paired canvas information, I read through all the code to make sure that I understood what I was looking at and that it was right |


**Log an entry whenever:** assistant-drafted code, config, schema, or prose
survived into the repository; an assistant materially shaped a decision you
kept; or an assistant did the debugging that produced a fix you committed.

**You do not need an entry for:** autocomplete of a line you were already
typing, spell-check, or a question you asked and did not use.




---

## Entry format

```
### YYYY-MM-DD — <short title>
Tool: <assistant name>, <model / version if you know it>
Asked for: <one line: the actual task, plus where the full prompt is stored>
Accepted: <file or function, and roughly how much survived>
Changed: <the edits you made, and why>
Verified: <the tests or checks that proved it works, plus the requirement id>
```

---

## Good entry

```
### 2026-03-19 — barcode lookup client
Tool: <assistant name>, <model/version if known>
Asked for: an HTTP client `lookupProduct(barcode)` for the product API, with a
  3s timeout, one retry on 5xx only, 404 => null, never throws. Full prompt in
  prompts/2026-03-19-lookup.txt.
Accepted: `pantry/barcode/client.*` — the retry loop and the response mapping;
  about 40 of 95 lines survived.
Changed: rewrote error handling to match `pantry/items` (it swallowed timeouts
  silently); replaced a hard-coded key with PANTRY_API_KEY; renamed three
  variables; deleted a caching layer I did not ask for and do not need yet.
Verified: 4 unit tests with a stubbed HTTP layer (200 / 404 / 500-then-200 /
  timeout), green in CI on feat/fr-12-barcode. Checked against FR-12 AC-1 and
  AC-3. DEF-014 filed for the retry-count edge case.
```

Why it earns points: it shows judgment (a rejected caching layer), verification
(four named cases), traceability (FR-12, DEF-014), and honest proportion
(40 of 95 lines).

---

## Bad entry

```
3/19 - used AI for the barcode stuff
```

Why it costs points: no tool, no file, no prompt, no proportion, no test, no
requirement. A grader learns nothing except that you know the word "AI" — and a
hostile reading is the only one available.

---

## Other entries worth logging (short forms)

```
### 2026-03-20 — explained an error message
Tool: <assistant name>
Asked for: what "connection reset by peer" means for my HTTP client under load.
Accepted: nothing into the repo — explanation only.
Changed: n/a
Verified: n/a. Logged because it shaped the retry decision in ADR-0004.
```

```
### 2026-03-21 — test scaffolding for FR-18
Tool: <assistant name>
Asked for: a table-driven test skeleton for the expiring-soon date rule.
Accepted: the skeleton and 2 of 7 cases.
Changed: wrote the boundary cases myself (exactly 3 days, DST change, past date)
  because the drafted cases all sat safely in the middle of the range.
Verified: all 7 pass; FR-18 AC-2 now has a test that fails if the rule flips to
  inclusive.
```

---

## End-of-term self-check

Before the Week-16 submission, read this file straight through and ask: **where
is the "Changed" line empty?** Those are the modules you accepted rather than
built. Re-read them, or rewrite them, before someone asks you about them.