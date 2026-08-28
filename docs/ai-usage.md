# ai-usage

# AI Usage Log — <project name>

<!--
  Milestone 1 template. Copy this file into your repository as docs/ai-usage.md.
  The policy header is written ONCE, in Week 1, before you need it. The table
  grows one row per Amber-zone use, all semester, written the day it happens.
  This file is a required artifact in the Week 16 submission.
-->

**Owner:** Jennifer Spencer · **Policy set:** 2026-08-27 · **Last entry:** 2026-08-27

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
| 2026-08-27 | ChatGPT GPT-5.6 Luna | I pasted the sixteen-week table from §1.2 into the assistant and asked "Make me a calendar that is from August 24 to December 6 with 2-3 hour work blocks totaling 240 hours with week 8 and 14 being broken weeks with the hours moved foward" | I changed how it was formated, how hours are dispersed throughout the week doing 1-5pm on the weekends and changed the hours on the weekdays to be 2-4pm | I verified with my Google Calendar and added up the hours to ensure I had 240 |

<!--
  A BAD entry (do not imitate):
    | Week 3 | ChatGPT | requirements | most of it | some | looked fine |

  A GOOD entry:
    | 2026-09-22 | <assistant + the model version you actually used>
    | "Interview me about a household food-tracking app and list functional requirements."
    | 6 of 19 proposed requirements, as raw material only.
    | Rewrote all 6 into FR form with actor + condition; deleted 13 as out of scope
      (it invented multi-household sharing and a mobile app I never mentioned).
    | Checked each against my Week-2 scoping decision; confirmed FR-004's "3 days"
      threshold with my actual user instead of accepting the model's default.

  The good entry takes ninety seconds and is evidence of judgment.
  The bad one is evidence of nothing.
-->
