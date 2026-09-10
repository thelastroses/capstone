# Elicitation Interview Guide

A thirty-minute script for the one conversation Milestone 3 requires. Print it,
fill it in by hand, then transcribe the notes into your repository the same day.
Memory decays faster than you think it does.

---

## Before you sit down

- **Pick a real human** who has the problem. Not a classmate being polite. Not you.
- **Say the boundary out loud:** "I am not going to build everything you say. I am
  trying to understand what actually happens today." This buys you honest answers
  instead of a wish list.
- **Bring nothing to show.** A prototype turns an interview into a review. Later.
- **Record the date.** A requirement without a date is a rumor.

**Interviewee:** Stella S.  **Role:** Advanced Artist
**Date:** 2026-09-09  **Duration:** 30 minutes  **Consent to quote (y/n):** yes
---

## The eight questions

Ask them in this order. The order matters: present tense before future tense,
behavior before opinion.

1. **"Walk me through the last time you did this. Start from the beginning."**
   You want the *episode*, not the summary. Interrupt only to ask "and then what?"
   
   "So, I have an online portfolio and it has been quite a struggle because of how the processing works. O I have to take pictures and upload them to my website, it is quite hard. O I cried because it was too complicated. O I was alone and I needed external help to help speed up the process to make it easier so I can focus on making new pieces instead of waiting on the process. F It was hard the first time doing this because I did not know how to collect them into pochette" (Jenny: she is French Canadian the word translates to big pouch) "that I could bring with me to art conventions or to show art critics or to make it more online so that anyone could access it from anywhere. W So people that do not have the time to meet me at least they could get a quick look at the work I do. W

2. **"What did you use to do it?"**
   A spreadsheet, a whiteboard, a group chat, a paper list, nothing. Whatever it
   is, that is your competition and your data model.

   "I used my phone to collect pictures and then I would upload them though my phone to my website but the pictures would be blurry. O Which is why I asked for help from a developer. F He gave me a scan that uses digital recognition that captures every single detail that is almost like a copy and paste from real life to an online one so I could upload it to my art gallery. F I had the idea of having a website with all of my art work but since I had never made a website I thought I could maybe hire someone to do it for me and give them the idea of roughly what I wanted and I paid them for the work. F"

3. **"Where did that go wrong the last time?"**
   Failures are specific; satisfaction is vague. This question produces requirements.

    "Where it went wrong is that it took a while to process but I am still actively working with a developer. F I give them suggestions on performance but other than speed it has been a very great tool. O The last time that something went wrong with the website was when it accidentally deleted certain pictures that I had put up there. F"

4. **"What did you do when it went wrong?"**
    The workaround is a feature request wearing a disguise.
   
    "I evaluated what the problem was and then I sent a report to the developer. F I didn't actually realize until one of my teachers pointed it out when I tried showing them, so I immediately contacted the guy who made it and asked for an appointment to stop it from happening. F"

5. **"How often does this happen? How long does it take?"**
   Numbers. Push for a number even if it is a guess, then write "estimated."

   "In the last year it happened once and it stayed like that for two or three days but eventually I caught it and he fixed it for me. F When I communicate my issues they fix it starting in around 40 minutes. F"

6. **"Who else touches this?"**
   You have just found a stakeholder you had not listed.

    "I share it with other artists, the developer, I show my teachers and people around me. F I use it for myself not only to upload it but to also look at my art and get inspiration to know that I've done it. F I have it in my social media profiles linked, anyone can click on the link and go see what my artwork is. F There is also a review and private message section if anyone wants to collaborate with me they can go through that. F Anyone would has access to post on it is me and then I collaborate on certain pieces with other artists and then I send problems to my developer. F"

7. **"If this problem disappeared tomorrow, what would change about your day?"**
   The answer is the rationale line for half your requirements.

   "If the problem was erased I wouldn't need to pay for someone to make and fix the website, it would save me about a 1,000 dollars. F If the whole problem disappeared I would have a lot more free time and less stress of worry if everything is working and in order and I can focus on my art. W"

8. **"What is the part I have not asked about?"**
   Ask it. Then be quiet for a full ten seconds. The silence does the work.

    "The website and gathering everything I have done since I started this journey it reminds me how far I have went and how much better I have gotten. F It is a great reminder. O I hope everyone gets this feeling at least once in their life. O It's a lot easier to have it digital then physical but having a physical copy in case something goes wrong with the digital. O"

---

## Questions to avoid, and why

| Do not ask | Why | Ask instead |
|---|---|---|
| "Would you use an app that…?" | Everyone says yes to a hypothetical. | "What do you do today?" |
| "Do you want feature X?" | You have handed them your design to rubber-stamp. | "Where does it go wrong?" |
| "How should this work?" | You are outsourcing the job you are being graded on. | "What has to be true for this to be worth opening?" |
| "Is this important?" | Every feature is important in the abstract. | "If you could only have one of these two, which?" |

---

## After the interview — same day, within an hour

- [X] Transcribe raw notes. Do not clean them up yet; keep the words they used.
- [X] Mark every sentence as **F** (a fact about today), **W** (a want), or **O** (an opinion).
      Facts become requirements first. Wants get triaged. Opinions get a rationale line.
- [X] Circle every noun they used more than twice. Those nouns are your data model.
   - portolio, pictures, website, art, work, phone, developer, gallery, teachers, artists
- [X] Write down the three things you assumed before the interview that are now wrong.
   - I assumed that artists work alone not collaborating with others on a piece
   - I assumed that an artist mainly wants a website for showing to others and forgot that sometimes the artist just wants to look back on their artworks
   - I assumed that a website was easy to manage but after the interviews it seems like when a change needs to be made some have difficulties doing so
- [X] Add one row to the Open Questions table for anything you could not answer.
- [X] Commit the notes with a dated message.

---

## The observation pass (do this too, if you can)

Twenty minutes of watching beats an hour of asking. Sit with them while they do
the task. Write down only what you see:

| Could not do this |

The "what surprised me" column is where the requirements nobody would have
thought to ask for come from.