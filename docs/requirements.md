# requirements

# Software Requirements Specification — Art Gallery

<!--
Requirement IDs are FR-<AREA>-<nn>. Assign an ID once and never reuse it.
Retire an ID by marking it Withdrawn; do not renumber.
-->

**Author:** Jennifer Spencer  **Version:** 1.0  **Date:** 2026-09-08
**Status:** Draft | In review | Baselined

---

## 1. Purpose and Scope

One paragraph: what this system is for, who it serves, and what problem it removes.

The Art Gallery system is for artists that often find it hard to share their art without searching through their entire photo app. It is for Artists that don't want to just use Instagram and want a more interactive way to share their art so that someone leaves with a lasting impression remembering them and their pieces. Moreover, this helps the artist's friends and family easily view their artwork with only a link!

One paragraph: what is explicitly *outside* the boundary of this release.

What is explicity outside the boundary of this release is a user accounts system. Since I have not made a user accounts system before and there is not a lot of time in the feature development portion of this capstone class it will not be added. Moreover, a light and dark mode will not be added while at first it seems simiple. React Three Fiber is new to me so I do not want to risk creating random time consuming bugs and focus more on the development of the other features. Moreover, a store to purchase artworks and specific area in the app for messaging directly in the website will not be added only email.

## 1.5 Feature areas and the identifier scheme

AREA CODE   AREA NAME              ONE SENTENCE OF SCOPE
DATA        Database               Every piece of data from the artworks saved in a database to store for later       
3DG         3D Gallery             Every artwork placed in a 3-D enviroment
UPL         Upload                 Uploading artwork and .procreate files           
EXT         Extracted              Canvas information extracted from .procreate file          
GALL        Gallery                Every artwork placed next to it's canvas information

## 2. Stakeholders and Personas

| Persona | Who they are | What they need from the system | Evidence they exist |
|---|---|---|---|
| Stella S., 20, Advanced Artist | Stella has been drawing since she was 10 and has gathered quite a collection of artworks | She needs the system to quickly input her artworks and easily see extra information about the artwork | Interview 2026-09-09 |
| The next maintainer | They will inherit this repository after the course ends | They should should be able to understand what each feature was for, from the document alone | Course requirement; Chapter 13 clear-machine test |

## 3. Definitions

Define every term your requirements use in a project-specific sense. If a reader
could interpret a word two ways, it belongs here.

| Term | Definition in this document |
|---|---|
| 2D /2D overview | This is the section under the 3D scene on the website, it gives a overview of each png and its canvas information if uploaded, it is meant to display the majority of the artworks that are in and are extra to the 3D gallery |
| 3D scene/gallery | This is the first thing that displays on the website, it should be a focus on the main pictures the artist wants to display, it is made up of 3D objects that will represent them on canvases in a room |
| Gallery | Gallery can mean both the 2D or 3D scene it is essentially the place wherever the artworks and its canvas information lay |
| Digital recognition tool | A digital recognition tool is a tool that helps to improve hand drawn artworks to look more detailed, sometimes to be improved with the help of AI |
| Canvas information | Canvas information refers to the extracted canvas data from the .procreate file |
| Viewer | A viewer is someone that does not upload their artworks they simply view the artworks shown to them by the artist, a viewer is typically someone such as a friend, family member, or teacher; A artist can play the role as a viewer as long as they are simple viewing it for themselves not making adjustments |
| Picture | A picture in this document is the artwork that the artist will upload to their gallery |
## 4. Assumptions and Dependencies

- **Assumption:** <something you are taking as true without proof> — *If false:* <consequence>
- **Dependency:** <an external service, dataset, device, or person you rely on> — *If unavailable:* <fallback>

## 5. Functional Requirements

### FR-UPL-01 — Upload Artworks

**Priority:** Must
**Requirement:** A artist shall be able to quickly upload their artwork without any outside help.
**Rationale:** A way complicated way to upload artworks is not worth uploading. Stella needs an easy way to upload her artworks to a website one that does not take a while to process.
**Acceptance criteria:**
- Given an artwork they want in their gallery, when the artists uploads, then it uploads for them after inputting the file it will quickly display into the website into the designated area they want.
- Given artwork failed to upload, when the artist tries to upload, then a pop up error will alert them to try again, find a different file type, or this artwork is not compatible with website try this instead...

**Source:** Interview with Stella, 2026-09-09

### FR-UPL-02 — Delete Uploaded Artworks

**Priority:** Should
**Requirement:** A artist shall be able to delete any artworks that they uploaded with just a click to an x button and a yes to an are you sure pop up
**Rationale:** Having no way to delete artworks that are uploaded can lead to a messy gallery and the artist not wanting to use the website anymore. It is my decision because it is a requirement in the upload process that should be there for an increased user experience.
**Acceptance criteria:**
- Given an artwork they want in their gallery, when the artists uploads, then it uploads for them after inputting the file it will quickly display into the website into the designated area they want.
- Given artwork failed to upload, when the artist tries to upload, then a pop up error will alert them to try again, find a different file type, or this artwork is not compatible with website try this instead...

**Source:** My decision


### FR-UPL-03 — Button to determine if it displays in the 3-D scene, 2-D overview, or both

**Priority:** Must
**Requirement:** The artist shall be able to choose wheither or not they want their artwork to be displayed in the 3D or 2D scene when click a button in the dropdown after uploading their artwork.
**Rationale:** It is important to display the most captivating pieces right when the viewer goes into the site so they are not bombarded with too much to look at. It is my decision so that viewers have a nicer viewing time and are more likely to be offered a job.
**Acceptance criteria:**
- Given an artist has a picture to upload, when the artwork is upload, then they will have a dropdown to pick wether or not they want the artwork to go in the 3D scene, 2D overview or both.
- Given that it failed to upload to the area they chose, when sumbitting their artwork to go into their chosen spot, then they will be notified to try again.

**Source:** My decision


### FR-UPL-03 — Digital Recongition Tool

**Priority:** Won't (this release)
**Requirement:** Artist shall be able to upload their hand drawn artwork into a digital recongition tool to enhance it with AI or another method.
**Rationale:** To have higher quality pictures of the artworks ensure better user experience. Stella had blurry images without an digital recongition tool.

**Source:** Interview with Stella, 2026-09-09


### FR-UPL-04 — Mutiple User Upload

**Priority:** Won't (this release)
**Requirement:** Mutiple artists shall be able to upload artworks to the same gallery or their own personal gallery.
**Rationale:** Artists that have a way to easily collabarte can show art connections and give their art gallery more reason to view. Stella often collaborates with other artists and needs an easy way to do this and upload/view shared artworks.

**Source:** Interview with Stella, 2026-09-09


### FR-UPL-05 — Rearrange artworks to change order it displays on main page in upload section that displays each artwork uploaded

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to rearrange their artworks to what ever position they chose when they are in the 2D overview or click into the 3D scene.
**Rationale:** Being able to rearrange artworks can make it more visually appealing to viewers seeing certain artworks first. It is my decision because it makes it less complicated and less uploads are needed because the artist can rearrange it however they please instead of relying on the wesite to choose a good placement randomly.

**Source:** My decision


### FR-DATA-01 — Saves Artworks into Database

**Priority:** Must
**Requirement:** The artist shall be able to come back to their website with all their artworks still their after leaving for a day.
**Rationale:** Saving artworks into the gallery saves time and ensures all artworks are there the next day, it would not be worth uploading to website otherwise. Stella had troubles ensuring that her artworks were actually upload and saved onto the website.
**Acceptance criteria:**
- Given an artwork they want in their gallery, when artist leaves the website, then the artwork should still be their the next time or next day they go into the website.
- Given it failed to save into the database, when artist uploads, then the user will be notified that it failed to save into the database and upload it again to ensure it does.

**Source:** Interview with Stella, 2026-09-09

### FR-GALL-01 — History Overview

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to see their artworks in a year timeline after uploading it and specifying to specifically put it in the timeline. 
**Rationale:** Gives an overview of the years they worked on their artwork showing the highlight pictures from each year and ensuring viewers can see the progression of their artwork throughtout the years. Stella enjoyed seeing the progress she made with her artworks and seeing how much she grew over the years.

**Source:** Interview with Stella, 2026-09-09


### FR-GALL-02 — Artwork Overview

**Priority:** Should
**Requirement:** An artist or viewer shall be able to see an overview of all their artworks under the 3D scene after uploading it.
**Rationale:** An artist that can see all their artworks after uploading can view each artwork with no duplicates for themselves or to show others easily. Stella enjoys having a way to show her teachers and friends a quick look at the all the artwork she has made.
**Acceptance criteria:**
- Given an artwork they want in their gallery, when an artist uploads and clicks the 2D scene dropdown, then the artwork will show up under the 3D scene, if it is not a duplicate and a valid artwork file.
- Given it fails to display in the 2D scene, when viewing the website, then the artist will be notified with a pop up of it's failure and be asked to try uploading again.

**Source:** Interview with Stella, 2026-09-09


### FR-GALL-03 — Contact Button

**Priority:** Should
**Requirement:** A viewer shall be able to contact the artist through a button when viewing the right bar of the 2D scene page.
**Rationale:** Communication and art often go together especially when collaborating on an art pieces. It is important for some viewers such as recruiters to get in contact with the artist for job offers. Stella often collaborates on her art pieces needing a way to get in contact with her to get a collaboration started.
**Acceptance criteria:**
- Given a viewer wants to start a collaboration or a recuriter wants to offer a job, when the viewer scrolls down into the 2D scene, then the viewer should see a component to get in contact with the artist.
- Given it does not direct the viewer to g-mail, when clicking the contact button on the component, then the viewer will be notified that it failed to open g-mail.

**Source:** Interview with Stella, 2026-09-09 & My decision - scoping-decision.md (Should features)


### FR-GALL-04 — Search Artworks

**Priority:** Could
**Requirement:** The artist and viewers shall be able to search their artworks in the 2D overview in a search box based on whatever title or by specific categories they choose. 
**Rationale:** It is important for a viewer and an artist to look up artworks if they like one in particular and want to specifically show someone else that artwork. It is my decision because it helps an artist to also understand what they have already uploaded if they do not want to test it for duplicates when uploading it a second time or look for it through the 2D overview.
**Acceptance criteria:**
- Given an artist or a viewer want to look up a specific artwork, when the artist or viewer clicks and searches in the search bar, then it will bring up the closet match if it is spelt wrong or bring up the exact piece if spelt right.
- Given the search does not show any results, when an artist or viewer searches, then they will have a text box saying that there are no artworks that match or to try searching again later if the search feature breaks.

**Source:** My decision - scoping-decision.md (Should features)


### FR-3DG-01 — Clicking on images displays canvas information

**Priority:** Should
**Requirement:** <Actor> shall be able to <action> <object> <under what condition>.
**Rationale:** Why this exists, and which persona asked for it.
**Acceptance criteria:**
- Given <starting state>, when <the actor does this>, then <this observable thing is true>.
- Given <edge or failure case>, when <trigger>, then <defined behavior>.

**Source:** My decision


### FR-3DG-02 — Zoom into 3D scene

**Priority:** Must
**Requirement:** A viewer shall be able to zoom into the 3D scene when clicking into the scene; Zooming in with the scroll bar slowly makes the scene look bigger.
**Rationale:** In order to look more closely at the 3D scene/gallery it is important for viewers to feel like they are interacting with the artwork and viewing it in a real museum. It is my decision because without the interaction then the viewer will feel less engaged and it will not be a good scene to be the first thing the viewer sees when viewing the website.
**Acceptance criteria:**
- Given the viewer wants to view the 3D scene, when the viewer clicks into the 3D scene, then they will be able to scroll back and forth to view each artworks.
- Given it fails to zoom, when clicking into the scene, then the viewer will be notified with a pop up that the zoom function is not working at the current moment and to try again later.

**Source:** My decision

### FR-3DG-03 — Rearrange artworks by clicking and dragging canvases around in 3D Scene

**Priority:** Won't (this release)
**Requirement:** <Actor> shall be able to <action> <object> <under what condition>.
**Rationale:** Why this exists, and which persona asked for it.

**Source:** My decision


### FR-EXT-01 — Edit extracted canvas information after upload

**Priority:** Won't (this release)
**Requirement:** <Actor> shall be able to <action> <object> <under what condition>.
**Rationale:** Why this exists, and which persona asked for it.

**Source:** My decision


### FR-<AREA>-<nn> — <short imperative name>

**Priority:** Must | Should | Could | Won't (this release)
**Requirement:** <Actor> shall be able to <action> <object> <under what condition>.
**Rationale:** Why this exists, and which persona asked for it.
**Acceptance criteria:**
- Given <starting state>, when <the actor does this>, then <this observable thing is true>.
- Given <edge or failure case>, when <trigger>, then <defined behavior>.

**Source:** <interview, observation, regulation, your own decision — name it>

### FR-<AREA>-<nn> — <short imperative name>

**Priority:** Must | Should | Could | Won't (this release)
**Requirement:** <Actor> shall be able to <action> <object> <under what condition>.
**Rationale:** Why this exists, and which persona asked for it.
**Acceptance criteria:**
- Given <starting state>, when <the actor does this>, then <this observable thing is true>.
- Given <edge or failure case>, when <trigger>, then <defined behavior>.

**Source:** <interview, observation, regulation, your own decision — name it>


### FR-<AREA>-<nn> — <short imperative name>

**Priority:** Must | Should | Could | Won't (this release)
**Requirement:** <Actor> shall be able to <action> <object> <under what condition>.
**Rationale:** Why this exists, and which persona asked for it.
**Acceptance criteria:**
- Given <starting state>, when <the actor does this>, then <this observable thing is true>.
- Given <edge or failure case>, when <trigger>, then <defined behavior>.

**Source:** <interview, observation, regulation, your own decision — name it>

## 6. Non-Functional Requirements

Placeholder for Week 4. Do not write vague quality words here now; write nothing
and fill it in when you can make each one measurable.

## 7. Out of Scope (the Won't-Have List)

Things a reasonable reader might expect and will not get in this release, each
with one line of reasoning. A short list here means you have not thought hard enough.

| Not building | Why not | Revisit when |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## 8. Open Questions

| # | Question | Who can answer it | Needed by |
|---|---|---|---|
| All 20 questions could be answered | 

## 9. Document Change Log

| Date | Version | Change | Reason |
|---|---|---|---|
| 2026-09-10 | 1.0 | Initial specification | Milestone 3 |
