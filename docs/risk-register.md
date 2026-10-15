# Risk Register — Template and Worked Rows

Review it every Monday.
A register you write once is a document. A register you review weekly is a control.

---

## Scales (use these exact ones so your numbers mean something week to week)

**Likelihood** — 1 rare · 2 unlikely · 3 even odds · 4 likely · 5 near certain, before you do anything about it.

**Impact** — score in *hours you would lose*, not in feelings:
1 = under 2 h · 2 = 2–5 h · 3 = 5–12 h · 4 = 12–25 h · 5 = over 25 h, or the project cannot ship.

**Exposure** = Likelihood × Impact. Order the register by exposure, descending. Work the top five.

**Response** — one of: **avoid** (change the plan so it cannot happen) · **mitigate** (reduce likelihood or
impact) · **transfer** (make it somebody else's problem — a managed service, a library) · **accept**
(name it, write the contingency, move on).

## The row format

| Field | What goes in it |
|---|---|
| ID | `R-01`, stable forever, never reused |
| Risk | **cause → uncertain event → consequence**, in one sentence |
| Category | technical · dependency · scope · schedule/personal · data/legal |
| L / I / E | likelihood, impact, exposure |
| Trigger | the *observable* thing that says it is happening — a number, a date, a log line |
| Owner | you, by name; a risk with no owner is a wish |
| Response | avoid / mitigate / transfer / accept + the concrete action, with a due week |
| Contingency | what you do if it happens anyway |
| Status | open · retired · **became an issue on <date>** |

---

## Worked rows

**R-01** — Because a file extraction is something I have never done, the .procreate extract might fail because I have not confirmed that it is fully possible making FR-EXT-04; FR-EXT-05 not possible and not able to be demonstracted in the Week 16-demo.
· technical · L 4 · I 4 · **E 16**
· **Trigger:** The extract fails not outputting anything usuable or one or two fields are not filled.
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - test the extraction on a .procreate file and ensure that it returns the wanted fields
· **Contingency:** If there are only one or two fields that are not avilable for an artwork mark it as N/A but if it is consistently no fields being fill then manual entire canvas information. 
· **Status:** open. Reviewed weekly.

**R-02** — Because there are additional optional features that seem like quick hits, if they are done before the must tasks, it will take away time for the core required features
· scope · L 4 · I 4 · **E 16**
· **Trigger:** Additional features are being completed before all of the Must features are done
· **Owner:** Jennifer Spencer · **Response:** avoid - Must features are prioritized before Shoulds and Coulds
· **Contingency:** Ensure that Must features are done first in the WP before any Shoulds and Coulds and refocus on the Must features
· **Status:** open. Reviewed weekly.

**R-03** — Because I have never used React Three Fiber because it may take far longer than the estimated hours it could lead to less time for documentation
· technical/novelty; schedule/personal · L 4 · I 3 · **E 12**
· **Trigger:** The tasks to make the 3D gallery starts to take twice as long as they where originally estimated
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - ensure that the 3D gallery shows an artwork that was retrieved from the database
· **Contingency:** Cut the low priority tasks and focus on the core high priority tasks
· **Status:** open. Reviewed weekly.

**R-04** — Because artworks need to be deleted with their canvas information, if only the artwork is deleted, it may prevent any replacement artwork from taking its place and leave the canvas information stranded 
· technical · L 3 · I 4 · **E 12**
· **Trigger:** Canvas information is seen without its paired artwork
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - test what happens if canvas information is left alone and ensure that it is deleted
· **Contingency:**  Alter how the delete process is done so that an canvas infromation with its artwork is actually deleted
· **Status:** open. Reviewed weekly.

**R-05** —  Because the 3D art gallery depends on React Three Fiber to render properly, if it does not render right, then there is no 3D gallery, preventing a core feature from functioning, WP-4.
· dependency · L 3 · I 4 · **E 12**
· **Trigger:** 3D gallery not loading and no artworks appear visually correct/they are distorted
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - ensure that if there is no gallery available to load that the artist is shown a message saying that something went wrong with the 3D gallery and to come back later to view it.
· **Contingency:**  Give a message where the 3D gallery is suppose to load to let the artist know that the 3D gallery failed to load or something went wrong and to come back later
· **Status:** open. Reviewed weekly.

**R-06** —  Because the 3D gallery could hold up to 20 artworks at one time it may take longer than expected to rearrange the artworks so that the gallery still works functionally and visually, increasing the amount of work that is needed to finish the 3D gallery
· scope · L 3 · I 4 · **E 12**
· **Trigger:** More tasks are added to the WP to fix the artwork placements
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - ensure that a small set of artworks displays properly and sizing automatically is adjusted after each artwork uploaded if needed before testing 20 artworks
· **Contingency:**  Update how the artworks are displayed but if it exceeds the tasks estimate time, then limit the amount of artworks that can appear in the 3D gallery
· **Status:** open. Reviewed weekly.

**R-07** —  Because canvas information has to be extracted from the .procreate files, the extraction might not save the correct/readable data in the fields, which causes inaccurate artwork information to be viewed.
· data/legal · L 3 · I 4 · **E 12**
· **Trigger:** The canvas information being displayed is not accurate to the artwork that is displayed and the .procreate file
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - ensure that the extracted canvas information is the same with the artwork canvas information in the Procreate settings
· **Contingency:**  Update the extraction process and test it, for any fields that can still not be extracted correctly display N/A or do not include the field.
· **Status:** open. Reviewed weekly.

**R-08** —  Because .procreate and artwork have to be stored and pair together in the database, if it fails to save properly during the upload process, it may cause only the canvas information to display in the galleries
· data/legal · L 3 · I 4 · **E 12**
· **Trigger:** When the database goes to get the artwork and canvas information to display in the galleries only the canvas information appears
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - ensure that both the artwork and the related canvas information get retrieved at the same time so that there are no stranded canvas informations without it's artwork.
· **Contingency:**  Update and fix the upload process so it only saves when both are saved properly into the database. Re test to ensure it works properly. An error message is given stating if the database could not save it.
· **Status:** open. Reviewed weekly.

## Risks that did not survive

**R-09** —  Because the project needs to be deployed with Vercel for the final project demo, significant changes with the project timeline may delay deployment, preventing the lastest art gallery from being shown
· schedule/personal · L 2 · I 4 · **E 8**
· **Trigger:** The task list for that week is not fully completed
· **Owner:** Jennifer Spencer · **Response:** Ensure that time for deployment is never cut out and ensure that the must features are always worked on before shoulds and coulds
· **Contingency:**  Readjust the schedule while focusing on must features so that there is a working project by the end of the weeks
· **Status:** open. Reviewed weekly.

**R-10** —  Because the Supabase has a storage limit and cost, it may consume more storage than the plan allows, leading to money consumed and uploads could fail
· technical · L 2 · I 4 · **E 8**
· **Trigger:** The upload fails because the database ran out of storage/ storage is almost full
· **Owner:** Jennifer Spencer · **Response:** Ensure that there is nothing interfering with the upload process and nothing is being uploaded twice
· **Contingency:**  Upgrade the database storage plan to the Pro plan
· **Status:** open. Reviewed weekly.

**R-11** — Because the uploaded artworks depends on the Supabase connection, any connection failure could stop artworks from being uploaded or retrieved preventing the art galleries from displaying the artworks
· dependency · L 2 · I 3 · **E 6**
· **Trigger:** Anytime an upload happens if it returns a database connection error
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - test that if a upload does fail that an appropriate error appears
· **Contingency:** I notify the artist with a pop up leting the artist know that their artwork failed to upload becaause the connection with the database is not currently up and to try again later. The error will be documented. If zero artworks are able to be retrieved then example artworks fill the galleries.
· **Status:** open. Reviewed weekly.

**R-12** — Because the contact component needs to redirect the viewer to the artist's email, if the component does not redirect the viewer, the viewer will not be able to contact the artist
· technical · L 2 · I 1 · **E 2**
· **Trigger:** If the contact component does not redirect the viewer
· **Owner:** Jennifer Spencer · **Response:** Mitigate by Week 10 - test what happens if the viewer does not get redirected and ensure that their is a clear message given
· **Contingency:**  Give an error message pop up with a clear message saying that the redirect failed and to try again later
· **Status:** open. Reviewed weekly.

**R-13** — Because I have other courses with projects, my available hours for that week may drop from 20 to 10, pushing work past their designated weeks.
· schedule/personal · L 1 · I 2 · **E 2**
· **Trigger:** the Week-11 hours log shows fewer than 15 hours logged.
· **Owner:** Jennifer Spencer · **Response:** avoid - it will not happen I will not allow it to I always never not prioritized enough time to get a project done, I typically always have a little time left over in a week 
· **Contingency:** I still end up losing hours in a week I will rearrange my schedule to catch up on hours and focus on core tasks
· **Status:** open. Reviewed weekly.

---

## The bad version, for contrast

> **R-04** — The project might not get finished on time. Likelihood: high. Impact: high. Mitigation: work harder.

Everything is wrong here. There is no cause and no specific event, so nobody can tell what would make it
true. There is no trigger, so it can never be detected — it can only be discovered, in Week 15, as a
catastrophe. "Work harder" is not a response; it names no action, no week, and no cost. And there is no
contingency, which means the plan has no answer if it happens. A row like this is not risk management.
It is anxiety, written down.
