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
