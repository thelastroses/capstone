# requirements

# Software Requirements Specification — Art Gallery

**Author:** Jennifer Spencer  **Version:** 1.0  **Date:** 2026-09-12
**Status:** Baselined

---

## 1. Purpose and Scope

One paragraph: what this system is for, who it serves, and what problem it removes.

The Art Gallery system is for artists that often find it hard to share their art without searching through their entire photo app. It is for Artists that don't want to just use Instagram and want a more interactive way to share their art so that someone leaves with a lasting impression remembering them and their pieces. Moreover, this helps the artist's friends and family easily view their artwork with only a link!

One paragraph: what is explicitly *outside* the boundary of this release.

What is explicitly outside the boundary of this release is a user/artist accounts system. Since I have not made a user/artist accounts system before and there is not a lot of time in the feature development portion of this capstone class it will not be added. Moreover, a light and dark mode will not be added while at first it seems simple. React Three Fiber is new to me so I do not want to risk creating random time consuming bugs and focus more on the development of the other features. Moreover, a store to purchase artworks and specific areas in the app for messaging directly in the website will not be added, only an email component.

## 1.5 Feature areas and the identifier scheme

AREA CODE   AREA NAME              ONE SENTENCE OF SCOPE
DATA        Database               Every piece of data from the artworks saved in a database to store for later       
TDG         3D Gallery             Every artwork placed in a 3-D environment
UPL         Upload                 Uploading artwork and .procreate files           
EXT         Extracted              Canvas information extracted from .procreate file          
GALL        Gallery                Every artwork placed next to its  canvas information

## 2. Stakeholders and Personas

| Persona | Who they are | What they need from the system | Evidence they exist |
|---|---|---|---|
| Stella S., 20, Advanced Artist | Stella has been drawing since she was 10 and has gathered quite a collection of artworks | She needs the system to input her artworks in a reasonable time such as within 5 minutes and see extra information about the artwork in a organized way | Interview 2026-09-09 |
| The next maintainer | They will inherit this repository after the course ends | They should should be able to understand what each feature was for, from the document alone | Course requirement; Chapter 13 clear-machine test |

## 3. Definitions

Define every term your requirements use in a project-specific sense. If a reader
could interpret a word two ways, it belongs here.

| Term | Definition in this document |
|---|---|
| 2D /2D overview | This is the section under the 3D scene on the website, it gives an overview of each png and its canvas information if uploaded, it is meant to display the majority of the artworks that are in and are extra to the 3D gallery |
| 3D scene/gallery | This is the first thing that displays on the website, it should be a focus on the main pictures the artist wants to display, it is made up of 3D objects that will represent them on canvases in a room |
| Gallery | Gallery can mean both the 2D or 3D scene it is essentially the place wherever the artworks and its canvas information lay |
| Digital recognition tool | A digital recognition tool is a tool that helps to improve hand drawn artworks to look more detailed, sometimes to be improved with the help of AI |
| Canvas information | Canvas information refers to the extracted canvas data from the .procreate file |
| Viewer | A viewer is someone that does not upload their artworks they simply view the artworks shown to them by the artist, a viewer is typically someone such as a friend, family member, or teacher; An artist can play the role as a viewer as long as they are simply viewing it for themselves not making adjustments |
| Picture | A picture in this document is the artwork that the artist will upload to their gallery |
| Overlay | An overlay is when an artwork with its canvas information covers a viewer's screen and in order to get out of the overlay they have to click out of it |
| Pop up | A pop up can be something as big as an overlay or as small as a text box component that appears at the top of a viewers or artist screen to let them know of any urgent information or limitations they have met |
| Fields | A field is each text category that displays with the artwork from when the canvas information has been extracted |
| Procreate | Procreate is a digital drawing app that allows artists to draw for free and download the .procreate file for its data |

## 4. Assumptions and Dependencies

- **Assumption:** The artist will upload artwork files and primarily use Procreate as their art drawing app — *If false:* the artist will not have the canvas information feature work/ will not display any canvas information next to their artworks. If they do not upload artworks then nothing will display besides empty canvases in the 3D scene and a text box in the 2D overview saying that nothing has been uploaded yet.
- **Dependency:** Supabase database as the artwork storage — *If unavailable:* The artist will be asked to come back tomorrow and that the storage system used at the moment is down for today.

## 5. Functional Requirements

### FR-UPL-01 — Upload Artworks

**Priority:** Must
**Requirement:** An artist shall be able to upload their artwork without any outside help within 5 minutes.
**Rationale:** A complicated way to upload artworks is not worth uploading. Stella needs a convenient way to upload her artworks to a website that does not take a while to process.
**Acceptance criteria:**
- Given an artwork they want in their gallery, when the artist uploads, then it uploads for them after inputting the file, it will display into the website within 5 minutes into the designated area they want.
- Given artwork failed to upload, when the artist tries to upload, then a pop up error will alert them to try again in 5 seconds, to find a different file type, that this artwork is a duplicate and are they sure they want to add to their art gallery, or this artwork is not compatible with the website try uploading a .png instead.
- Given artwork takes longer than five minutes to load or gets stuck halfway, when the artist tries to upload, then they will be advised to reload the website and to try again in 10 minutes or if this is their second attempt in uploading to try to upload it as a different file type or that the file may be not be compatible with the website.

**Source:** Interview with Stella, 2026-09-09


### FR-UPL-02 — Delete Uploaded Artworks

**Priority:** Should 
**Requirement:** An artist shall be able to delete any artworks that they uploaded after choosing to delete it.
**Rationale:** Having no way to delete artworks that are uploaded can lead to a messy gallery and the artist not wanting to use the website anymore. It is my decision because it is a requirement in the upload process that should be there so that the artist does not have to put pressure on themselves to make sure every upload is right for their gallery in the upload tab.
**Acceptance criteria:**
- Given an artwork they want to delete in their gallery, when the artist deletes the uploaded artwork, then it will delete it within 5 minutes and will remove the artwork and canvas information from the database as well.
- Given artwork failed to delete, when the artist tries to delete it, then a pop up error will alert them to try deleting it again.

**Source:** My decision


### FR-UPL-03 — Choose where the artwork displays: in the 3-D scene, 2-D overview, or both

**Priority:** Must
**Requirement:** The artist shall be able to choose whether or not they want their artwork to be displayed in the 3D or 2D scene after uploading their artwork.
**Rationale:** It is important to display the most captivating pieces right when the viewer goes into the site so they are not bombarded with too much to look at. It is my decision so that viewers have a nicer viewing time and are more likely to be offered a job.
**Acceptance criteria:**
- Given an artist has a picture to upload, when the artwork is uploaded, then the artwork will appear in the 3D scene, 2D overview or both for whichever location they choose.
- Given that the artwork failed to upload to the area they chose, when submitting their artwork to go into their chosen spot, then they will be notified to try again.
- Given that the artist failed to choose an area for where the artwork should display, when submitting their artwork then they will be notified that they have to pick at least one of the three options to continue: 3-D scene, 2-D overview, or both.

**Source:** My decision



### FR-UPL-04 — Multiple Artist Upload

**Priority:** Won't (this release)
**Requirement:** Multiple artists shall be able to upload artworks to the same gallery or their own personal gallery.
**Rationale:** Artists that have a way to collaborate can show art connections on artworks and give their art gallery more reason to view. Stella often collaborates with other artists and needs a convenient way to do this and upload/view shared artworks.

**Source:** Interview with Stella, 2026-09-09


### FR-UPL-05 — Rearrange artworks to change order it displays on main page in upload section that displays each artwork uploaded

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to rearrange their artworks to whatever position they chose when they are in the 2D overview or click into the 3D scene.
**Rationale:** Being able to rearrange artworks can make it more visually appealing to viewers seeing certain artworks first. It is my decision because it makes it less complicated and less uploads are needed because the artist can rearrange it however they please instead of relying on the website to choose a good placement randomly.

**Source:** My decision


### FR-UPL-06 — A place to take pictures built directly into the website

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to take pictures of their artworks in the upload tab after using the website's built in camera function and have it upload the artwork into the gallery without needing to leave the website.
**Rationale:** Having a place to take pictures built directly into the website will allow artists that hand draw their artworks to do so with more convenience. Stella always struggled with the uploading process of artworks and by having a way to upload and take a picture directly built into the app would save her a lot of time and hassle.

**Source:** Interview with Stella, 2026-09-09


### FR-UPL-07 — Digital Recognition Tool

**Priority:** Won't (this release)
**Requirement:** Artists shall be able to upload their hand drawn artwork into a digital recognition tool to enhance it with AI or another method.
**Rationale:** To have higher quality pictures of the artworks makes the viewing process in the gallery more enjoyable because each pixel is more defined ensuring that it is not blurry. Stella had blurry images without a digital recognition tool.

**Source:** Interview with Stella, 2026-09-09


### FR-DATA-01 — Saves Artworks into Database

**Priority:** Must
**Requirement:** The artist shall be able to come back to their website with all their artworks still there after leaving for a day.
**Rationale:** Saving artworks into the gallery saves time and ensures all artworks are there the next day, it would not be worth uploading to a website otherwise. Stella had troubles ensuring that her artworks were actually uploaded and saved onto the website.
**Acceptance criteria:**
- Given an artwork they want in their gallery, when the artist leaves the website, then the artwork should still be there the next time or next day they go into the website.
- Given it failed to save into the database, when the artist uploads, then the viewer will be notified with a pop up for 5 seconds that it failed to save into the database and upload it again to ensure it does.
- Given it failed to save only the artwork or only the canvas information into the database, when the artist uploads, then the viewer will be notified the entire process failed and to try again because for whichever one failed it caused the entire process to fail.
- Given it failed to load the artworks that are in the database, when the artist is looking at the gallery, then the viewer will be notified to come back tomorrow that the database is down at the moment.

**Source:** Interview with Stella, 2026-09-09


### FR-DATA-02 — The amount of artworks an artist can save and upload into the database will be capped.

**Priority:** Must
**Requirement:** Artist's artworks shall be able to save into the database but will be capped at 20 uploads of artworks which means 20 artworks can be displayed total on the website to save space and the amount of money spent on the database.
**Rationale:** It is important to limit the amount that can be saved into the database so that an artist can not use the gallery as a photo app database when they run out of space on their computers. It is my decision because in this current release I have a limited amount of money that I can spend. The uploading of artworks needs a way to not get out of hand and used for its intended purpose.
**Acceptance criteria:**
- Given an artist, when they upload an artwork in the upload tab, then if they have under 20 artworks then they will be able to upload their artwork and save it successfully into the database.
- Given artist, when they upload and it fails to save into the database because they have used up the 20 maximum they can save into the database, then they will be notified that they have reached the 20 limit in the amount of artworks they are allowed to upload in the upload tab and that they are no longer able to upload anymore artworks unless they have deleted one that is already displaying in the gallery.

**Source:** My decision


### FR-GALL-01 — History Overview

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to see their artworks in a year's timeline after uploading it and specifically put it in the timeline. 
**Rationale:** Gives an overview of the years they worked on their artwork showing the highlight pictures from each year and ensuring viewers can see the progression of their artwork throughout the years. Stella enjoyed seeing the progress she made with her artworks and seeing how much she grew over the years.

**Source:** Interview with Stella, 2026-09-09


### FR-GALL-02 — Artwork Overview

**Priority:** Must
**Requirement:** An artist shall be able to see an overview of all their artworks under the 3D scene after uploading it.
**Rationale:** An artist that can see all their artworks after uploading can view each artwork with no duplicates for themselves or to show others easily. Stella enjoys having a way to show her teachers and friends all the artwork she has made in one view.
**Acceptance criteria:**
- Given an artwork they want in their gallery, when an artist uploads and clicks the 2D scene selection, then the artwork will show up under the 3D scene, if it is not a duplicate and a valid artwork file such as a .png.
- Given an artist wants to view their gallery for the first time, when they look at the 3D or 2D overview, then they will either see empty canvases displayed or text saying that no artwork has been uploaded yet and to get started by going in the upload tab and uploading an artwork.
- Given the artwork fails to display in the 2D scene, when viewing the website, then the artist will be notified with a pop up for 5 seconds of its failure and be asked to try uploading again.
- Given the artwork fails to display all the canvas information in the gallery scenes, when viewing the canvas information, then the artist or viewer will see a N/A next to each field that could not be extracted from the uploaded file or if the artists/viewer sees no canvas information next to the artwork that means that they did not upload a .procreate file when they uploaded their artwork in the upload tab and there will be text under the artwork saying that the artist did not upload canvas information with their artwork.

**Source:** Interview with Stella, 2026-09-09


### FR-GALL-03 — Contact Component

**Priority:** Should
**Requirement:** A viewer shall be able to contact the artist through a link in the 2D gallery that will open the artist's email address in the user's g-mail.
**Rationale:** Communication and art often go together especially when collaborating on an art piece. It is important for some viewers such as recruiters to get in contact with the artist for job offers. Stella often collaborates on her art pieces needing a way to get in contact with her to get a collaboration started.
**Acceptance criteria:**
- Given a viewer wants to start a collaboration or a recruiter wants to offer a job, when the viewer scrolls down into the 2D scene, then the viewer should see a component to get in contact with the artist in the 2D scene.
- Given it does not direct the viewer to g-mail, when clicking the contact component in the 2D scene, then the viewer will be notified with a pop up for 5 seconds that it failed to open g-mail or that the device they are on will not allow them to be redirected.

**Source:** Interview with Stella, 2026-09-09 & My decision - scoping-decision.md (Should features)


### FR-GALL-04 — Search Artworks

**Priority:** Could
**Requirement:** The artist and viewers shall be able to search their artworks in the 2D overview in a search box based on whatever title or by specific categories they choose. 
**Rationale:** It is important for a viewer and an artist to look up artworks if they like one in particular and want to specifically show someone else that artwork. It is my decision because it helps an artist to also understand what they have already uploaded if they do not want to test it for duplicates when uploading it a second time or look for it through the 2D overview.
**Acceptance criteria:**
- Given an artist or a viewer wants to look up a specific artwork, when the artist or viewer clicks and searches in the search bar in the 2D overview, then it will bring up the closest match if it is spelt wrong or bring up the exact piece if spelt right.
- Given the search does not show any results in the 2D overview, when an artist or viewer searches, then they will have a text box saying that there are no artworks that match their search, try a different spelling, or to try searching again later if the search feature breaks.

**Source:** My decision - scoping-decision.md (Should features)


### FR-TDG-01 — Clicking on images displays canvas information

**Priority:** Should
**Requirement:** A viewer shall be able to click on the artwork images to display the canvas information when in the 3D scene.
**Rationale:** When exploring a gallery it is important to have ways for viewers to get to know the artist's work in interactive ways to keep them engaged and wowed. It is my decision because I find it extremely important to have this aspect in the 3D environment so that there are more layers to the website that makes it engaging.
**Acceptance criteria:**
- Given a viewer has clicked into the 3D scene, when viewing an artwork, then they should be able to click on the artwork to bring the image to as static display overlay/pop up with the canvas information right next to it, if they want to exit the overlay then they can click outside of the overlay.
- Given it fails to bring them into the overlay, when clicking on the artwork in the 3D scene, then a pop up saying that it failed to display the overlay and to please try again later will appear on the screen for 5 seconds.

**Source:** My decision


### FR-TDG-02 — Zoom into 3D scene

**Priority:** Must
**Requirement:** A viewer shall be able to zoom into the 3D scene when clicking into the scene; Zooming in with the scroll bar slowly making the 3D scene look bigger increasing the size of the artworks in the scene.
**Rationale:** In order to look more closely at the 3D scene/gallery it is important for viewers to feel like they are interacting with the artwork and viewing it in a real museum. It is my decision because without the interaction then the viewer will feel less engaged and it will not be a good scene to be the first thing the viewer sees when viewing the website.
**Acceptance criteria:**
- Given the viewer wants to view the 3D scene, when the viewer clicks into the 3D scene, then they will be able to scroll back and forth to view each artworks in the 3D scene.
- Given it fails to zoom, when clicking into the scene, then the viewer will be notified with a pop up that the zoom function is not working at the current moment and to try again later.

**Source:** My decision

### FR-TDG-03 — Rearrange artworks by clicking and dragging canvases around in 3D Scene

**Priority:** Won't (this release)
**Requirement:** The artist shall be able to rearrange artworks by clicking and dragging the artwork canvases around when clicked in the 3D scene.
**Rationale:** This function in the 3D scene would make it easy for an artist to rearrange their artworks without needing to upload them over and over trying to get the arrangement they like best. It is my decision because often an artist will have more than one art style or art themes. It would allow them to move pictures related to each other to be next to each other and make groupings to make it visually easier for viewers to see these intentional arrangements.

**Source:** My decision


### FR-EXT-01 — Edit extracted canvas information after upload

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to edit extracted canvas information after uploading their artwork's .procreate file.
**Rationale:** Sometimes artists will regret the title they give to their artwork and will want to change it over years or they may want to update numbers that have changed so they do not have to reupload. It is my decision because not all artists will agree or think the information extracted fits their artworks allowing them to make it N/A or change it to whatever they think is appropriate for their artwork.

**Source:** My decision


### FR-EXT-02 — Remove extracted canvas information fields after upload

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to remove canvas information fields that were extracted from the .procreate file in the upload tab.
**Rationale:** Some artists think that the extracted canvas information is enough information about their piece but others may want to remove certain fields such as the dpi because it may not be important to them as an artist. This is my decision because in a future release multiple artists will have their own galleries and not everyone wants to display the same information. Depending on the artwork some may think some information such as the width and height of the canvas is not as needed then others such as the title.

**Source:** My decision

### FR-EXT-03 — Add extracted canvas information fields after upload

**Priority:** Won't (this release)
**Requirement:** An artist shall be able to add canvas information fields that were extracted from the .procreate file in the upload tab.
**Rationale:** Some artists think that the extracted canvas information is enough information about their piece but others may want to add in a field such as a description to describe more about the artwork. This is my decision because in a future release multiple artists will have their own galleries and not everyone wants to display the same information. Depending on the artwork some may think extra information such as a color palette description field is crucial to have displayed next to their artworks in the gallery scenes.

**Source:** My decision

### FR-EXT-04 — Extract Canvas Information from Artwork .procreate file

**Priority:** Must
**Requirement:** An artist shall be able to extract canvas information from the .procreate file after uploading it in the upload tab. The canvas information has to be uploaded with an artwork file at the same time so that the system knows which artwork the canvas information belongs to. 
**Rationale:** In order to know more about an artwork without needing the artist to input fields themselves, having a way to upload it to extract the canvas information saves over 10 minutes. It is my decision because without needing the artists to upload the canvas information themselves then viewers will have more to look at without needing the artist to input all the fields which can get boring and repetitive.
**Acceptance criteria:**
- Given the artist wants canvas information to be displayed next to their artwork, when the artist/viewer views the artwork in the gallery scenes, then they will be able to read all the information being displayed next to each artwork if they had uploaded a .procreate file with their artwork upload.
- Given it fails to display the canvas information, when clicking or viewing each artwork in the gallery scenes after uploading it in the upload tab, then the artist/viewer will see text saying that no canvas information was added after the upload, additionally the artist should be notified with a pop up for 5 seconds that it failed to extract the canvas information and will not display next the the artwork it belonged too after it had been uploaded in the upload tab and to try uploading the entire artwork and .procreate file again.

**Source:** My decision

## 6. Non-Functional Requirements

Placeholder for Week 4. Do not write vague quality words here now; write nothing
and fill it in when you can make each one measurable.

## 7. Out of Scope (the Won't-Have List)

Things a reasonable reader might expect and will not get in this release, each
with one line of reasoning. A short list here means you have not thought hard enough.

| Not building | Why not | Revisit when |
|---|---|---|
| User/artist account system | It is too much extra work that adds over 10 hours of time since I have not made one before | I would need to revisit it after the capstone in the future when I have a lot of extra time, it would probably be one of the first things I'd revisit |
| Artwork store | An artstore would be fun to look and browser through as a viewer, viewing the artists artworks as prints that they have displayed in the gallery scenes. However I want to focus more of the showing off the artworks and it would also take a significant amount of time to complete | I would need to revisit when I have more viewers looking at the gallery and when I have people specifically tell me they want to buy the artwork shown; and of course I would need the time to implement it in the future|
| Rearranging artworks in the 3D | I want enough time to make the main components of the gallery first and ensure it is not rushed through, I would also preferably want more time to make sure it is thoroughly tested | I would revisit when the capstone is done and in the future when I have the time after making the user/artist account system |
|  Light and dark mode | While this function seems easy to implement at first there can be small bugs and mistakes that take up an unknown amount of time where I could be using that time to implement core features further | I would do this right after the capstone when I had time to mess around with the different light and dark color schemes and weird bugs |
| A place to take pictures built directly into the website | This would require the viewer to allow access to their camera which not many want to do nowadays and it would probably work better for a website that is built specifically for mobile devices since the camera is better. It would also require a lot of time to implement. |  I would revisit when the website is more prepared for mobile devices and when more time is available after all the other features listed above were done too. |


## 8. Open Questions

| # | Question | Who can answer it | Needed by |
|---|---|---|---|
| All 20 questions could be answered | 

## 9. Document Change Log

| Date | Version | Change | Reason |
|---|---|---|---|
| 2026-09-11 | 1.0 | Initial specification | Milestone 3 |
| 2026-09-12 | 1.0 | Edited 6 sentences that could be inferred that two different programs could satisfy it | Ambiguity pass after external read |