
## Rep 1 - The decision inventory

| # | Requirement | Decision that must be made first        | Section it belongs in |
|---|-------------|------------------------------------------|-----------------------|
| 1 | FR-UPL-01         | Where does the upload happen?                                                                                                     | Component             |
| 2 | FR-UPL-03         | Will this be done by dropdown or radio buttons?                                                                                   | Component             |
| 3 | FR-DATA-01        | Will the saving be done automatically or does the artist have to save manually?                                                   | Data / behavior       |
| 4 | FR-DATA-02        | How and where will the uploads be capped at 20?                                                                                   | Data / behavior       |
| 5 | FR-GALL-02        | What action will the artist do to get to the artwork overview under the 3D scene?                                                 | Component             |
| 6 | FR-TDG-02         | How closer will the viewer be able to zoom in?                                                                                    | Behavior              |
| 7 | FR-EXT-04         | How is the extract done on the .procreate file?                                                                                   | Component             |
| 8 | FR-EXT-05         | How will artworks be paired together in the database?                                                                             | Data / behavior       |
| 9 | NFR-PERF-02       | What will be done to maintain a higher FPS?                                                                                       | Data / behavior       |
| 10 | NFR-REL-01       | Will there be a default error if the predicted error paths are not the ones being hit in that situation?                          | Errors                |
| 11 | NFR-AVA-02       | Will the database be able to hold 19 artworks?                                                                                    | Data / behavior       |
| 12 | NFR-SEC-01       | Where will the sensitive data be prevented from going into the database?                                                          | Data                  |
| 13 | NFR-SEC-02       | How will the system prevent HTML and scripts from executing?                                                                      | Data                  |
| 14 | NFR-PRIV-01      | How will a delete action on a artwork delete all related data in the database and site?                                           | Behavior              |
| 15 | NFR-DATA-01      | How will corrupt and duplicate artworks be alerted so to not go into the database?                                                | Data / behavior       |
| 16 | NFR-DATA-02      | How will the upload process detect when a step if the upload process fails?                                                       | Data / behavior       |
| 17 | NFR-DATA-02      | How will the database remove incomplete records by that upload?                                                                   | Data / behavior       |
| 18 | NFR-ACC-01       | What are the components/buttons that need to be hit with the 20 tabs?                                                             | Behavior              |
| 19 | NFR-ACC-02       | How will the tab key know to move around the website's buttons?                                                                   | Behavior              |
| 20 | NFR-ACC-03       | What is the most logical tab order to go through the components and buttons?                                                      | Behavior              |
| 21 | NFR-USE-01       | What will be done to help the viewer understand the website's navigation when viewing for the first time?                         | Behavior              |
| 22 | NFR-USE-02       | How will the interface preventing clipping and overlapping of text and overlays in common Chrome viewport sizes?                  | Component             |
| 23 | NFR-MNT-01       | What goes into the README so that someone is able to build a clone in under 10 minutes?                                           | Errors                |


Which requirement generated the most decisions? That requirement is where your design risk lives, and it is almost certainly the one you should build first in Week 9.
-  The requirement that generated the most decisions is NFR-DATA-02.

## Rep 2 - Context, then containers

How many containers did you draw, and how many of them did the requirements demand versus how many you added because they felt professional? Delete the ones that fail that test and say what you deleted.
-  Level 1 - I draw 1 box for the system 
-  Level 2 - I draw 3 boxes which all of them are demanded by the requirements

## Rep 3 - The level-3 zoom, exactly once

Why did you pick that container? Name the specific thing a reviewer would otherwise have had to guess at. If you cannot name it, you picked the wrong container — or you did not need a level 3 at all, which is also a legitimate answer to write down.
-  I chose the website container because it is what connected everything in my system, it connects the database to the main part of my project and vercel to the main part of my project. Each module in the container all have their own difficulties that they bring. The Upload module will be the hardest for me personally out of all them since it helps the 3D gallery and 2D overview remember the artworks that they hold. I did not need a level 3 because the website is where all the work is done in general.

## Rep 4 - The responsibility table, and the audit that follows it

| Component | Responsibility (one sentence, starts with a verb) | Owns | Depends on | Serves |
|-----------|--------------------------------------------------|------|------------|--------|
| `gallery` | Displays the 3D gallery that allows interactions for each artwork | `selectedArtwork` | `db` | FR-TDG-01, FR-TDG-02 |
| `overview` | Displays 2D artworks and its canvas information | `allArtworks` | `db` | FR-GALL-02, FR-GALL-04 |
| `upload` | uploads artworks and stores artwork and canvas information for later in database | `files` | `db` | FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-EXT-04, FR-EXT-05, FR-DATA-01, FR-DATA-02 |
| `contact` | Opens email to message artist so that viewers can get in contact | `none` | `mail` | FR-GALL-03 |

Dependency graph is acyclic: yes
Every piece of state has exactly one owner: yes

Which test failed first? Almost everyone fails the single-owner test on their first draft. What state did you find with two owners, and what would that have cost you in Week 12?

None of my tests failed and I did not find 2 owners in any of the rows. 

## Rep 5 - One complete interface contract, for the one you understand least

GOOD: uploadArtwork(pngFile, procreateFile, galleryType)                                        (serves FR-UPL-01, FR-UPL-02, FR-UPL-03)
Auth     Uses Supabase key in .env to connect to Supabase project. The .env file is in the .gitignore so that it is not committed to the repository.
Request  { "pngFile": file           required, .png
           "procreateFile": file     optional, .procreate
           "galleryType": string     required, "2D", "3D", or "both"
         }
Success  201 Created — { "id": 123e4567-e89b-12d3-a456-789123456789, "fileName": "eye.png", "width": 4320,
         "height": 5400, "dpi": 300 }
Errors   400 invalid_png_file 400 invalid_procreate_file 400 invalid_gallery_type
         409 duplicate_artwork 500 database_error
         body: {"error":{"code":"...","field":"...","message":"..."}}
Idempotency  If the artist tries to upload the same artwork again, the system will return a 409 duplicate_artwork response and ask them if they are sure they want to replace the current artwork or to try uploading a different file
Side effects   Stores the artwork and canvas information that was extracted from the .procreate file upload into Supabase
Limits   maximum of 20 artworks with only .png and .procreate files that are accepted

GOOD: deleteArtwork(artwork_id)                                       (serves FR-UPL-02)
Auth         Uses Supabase url from the Vite environment variables to connect to Supabase project. The .env file is in the .gitignore so that it is not committed to the repository.
Request  { 
           "artwork_id": uuid        required
         }
Success  204 - Artwork and related files deleted successfully
Errors   400 invalid_artwork_id 404 the artwork could not be found 
         500 database_error
         body: {"error":{"code":"...","field":"...","message":"..."}}
Idempotency  If the artist tries to delete an artwork that has already been deleted then the system will return the 404 error and does not delete anything further
Side effects  Deletes the artworks and it's canvas information and the .procreate file from Supabase.
Limits       Only one artwork can be deleted at a time

What did you have to decide while writing this that you had been quietly leaving open? Name it. That decision is the value of the rep.
-  I defined exactly what happens when there is a duplicate artwork that it asks them if they are sure they want to replace the current artwork or to try uploading a different file.

## Rep 6 - One error envelope, one status-code policy

Error envelope used system-wide: { "error": { "code": ..., "field": ..., "message": ... } }
Status-code policy - Codes I will use and what each means in MY system:
  400 invalid or missing information such as invaild .png, .procreate file, gallery type, artwork id   401 not used, there are no user accounts
  403 not used, there are no user accounts   404 Artwork could not be found 
  409 request conflicts with current state such as duplicate artworks or there are already a maximum of 20 artworks uploaded   429 not used does not set rate limit
  500 code broke - database error   (CLI: n/a is a website des not have a command line interface)
What a user is shown for each, and what gets logged: The user will be shown a short error message that does not expose every database error detail. The system logs the error code and what interaction caused the error to happen.

| Error Number | What a user is shown for each | What gets logged | 
|---|---|---|
| 400 | The user is shown that there is an invalid or missing information based on what happened if there was an invaild .png, .procreate file, gallery type, or artwork id | The message gets logged for what was invalid or missing with code |
| 401 | n/a | n/a |
| 403 | n/a | n/a |
| 404 | The current selected artwork could not be found please try reloading or select a different artwork | The messages gets logged for what did not exist with the code |
| 409 | The action can not be done, for example, the artist tries uploading the same artwork again creating a duplicate or there are more than 20 artworks already | The message gets logged for what could not be done with code |
| 429 | n/a | n/a |
| 500 | Something went wrong. Please try again later | The message gets logged for the database error with code |

Where were you about to use two different error shapes in the same system, and why did that feel reasonable at the time?
  - I was not about to use two different error shapes in the same system it seemed like it would make things more complicated

## Rep 7 - The data model, with invariants

### Entity: artwork                                 (serves FR-UPL-01, FR-UPL-02, FR-UPL-03)
Purpose        One artwork that has been uploaded to the gallery
  id  uuid  NOT NULL  PK
  png_name  text  NOT NULL  Name of the PNG file
  gallery_type  text  NOT NULL  Has to be either 2D, 3D, or both
  png_path  text  NOT NULL  PNG file path, where it is located in the storage

Invariants     I1 Every artwork must get a unique id
               I2 Every artwork uploaded must have a PNG file 
               I3 Every artwork must have a gallery type of 2D, 3D, or both 
               I4 The gallery must not hold more than 20 artworks
               I5 There must only be one png file for a artwork
Relationships  artwork 1 ──── 0..1 procreate_data
Volume         There is a maximum of 20 artworks so at most 20 rows or under (under around there)
Lifecycle      Created when the artists uploads an artwork file successfully. Hard deleted when the artist deletes the artwork and the related procreate_data is deleted with it's artwork.

### Entity: procreate_data                                     (serves FR-UPL-01)
Purpose: One .procreate file that has been uploaded to the gallery that had its canvas information extracted from it
  id            uuid        PK
  artwork_id  uuid        NOT NULL  FK -> artwork(id) ON DELETE CASCADE
  width          integer        NULL  (null = width is not available from that .procreate file)
  height      integer     NULL  (null = width is not available from that .procreate file)
  dpi      integer     NULL  (null = dpi is not available from that .procreate file)
  procreate_path    text        NOT NULL      .procreate file path, where it is located in the storage
 
Invariants
  I1  artwork_id must reference an artwork that actually exists
  I2 There must only be one .procreate file for a artwork or none
  I3 width, height, dpi can not be negative values
Relationships  procreate_data 0..1 ──── 1 artwork
Volume         There is a maximum of 20 artworks so at most 20 rows or under (under around there) if each artwork has a .procreate file
Lifecycle      Created when the artists uploads an .procreate file successfully and its canvas information is extracted. Hard deleted when the artist deletes the artwork because the related is the procreate_data so it is deleted with it's artwork.

Which column did you almost make free text that should be constrained? Which nullable column’s meaning did you struggle to state in words? That struggle means two concepts are sharing one column — say what they are.
  - The column that I almost made free text is the gallery type but I limited it to 2D, 3D, or both as the only choices. I did not struggle to state the nullable column's meaning in words. 

### Rep 8 - Three sequence flows, and the branch that matters

### Flow 1 — Upload Artwork Flow                      (serves FR-UPL-01, FR-UPL-03, FR-DATA-01, FR-GALL-02)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1 - The artist selects an .png artwork they want to upload with its canvas information .procreate file if they chose to display canvas information. Then the artist choses the gallery type, where they want it to be displayed | A field is missing input | Does not allow the upload to go through | Artist sees a message saying what was missing |
| 2 - The upload process checks if the .png and .procreate file are all valid file types | The file types being invalid | Returns the 400 error | Artist sees the message explaining what the invalid file type was |
| 3 - The upload starts its process to upload the files and information to Supabase | The upload ends up failing | The upload gets terminated | Artist sees the message asking them to try uploading again |
| 4 - The upload stores the canvas information and artwork files into Supabase | The database gets an error | Returns the 500 error | Artist sees a message asking them to try uploading again |
| 5 - The artist sees the artwork in the correct gallery type with its canvas information | n/a |  Shows a successful upload pop up | Artist sees a pop up saying that their upload was successfully uploaded|

### Flow 2 — Extraction of the .procreate file                      (serves FR-UPL-01, FR-EXT-04, FR-EXT-05)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
|1 - The artist selects an .png artwork they want to upload with its canvas information .procreate file if they chose to display canvas information. Then the artist choses the gallery type, where they want it to be displayed | A field is missing input | Does not allow the upload to go through | Artist sees a message saying what was missing |
|2 - The upload process check if .procreate file is valid and it goes to the extraction process | The .procreate file is invalid | Returns the 400 error | Artist sees the message explaining what the .procreate file was an invalid file type |
|3 - The .procreate file gets read and extracts the width, height, and dpi | The canvas information could not be extracted | The entire extraction gets terminated | Artist sees a message asking them to try uploading again |
|4 - The extracted information gets uploaded into Supabase | The extract information failed to upload into Supabase | Returns the 500 error | Artist sees a message asking them to try uploading again |
|5 - The artist see the canvas information next the the artwork it is related to | n/a | Shows the successfully extracted canvas information | Artist sees a pop up saying that their canvas information was successfuly extracted and uploaded |

### Flow 3 — Failed extraction of the .procreate file                      (serves FR-UPL-01, FR-EXT-04)
| Step | What can go wrong | System behavior | User sees |
|1 - The artist selects an .png artwork they want to upload with its canvas information .procreate file if they chose to display canvas information. Then the artist choses the gallery type, where they want it to be displayed | A field is missing input | Does not allow the upload to go through | Artist sees a message saying what was missing |
|2 - The upload process check if .procreate file is valid and it goes to the extraction process | The .procreate file is invalid | Returns the 400 error | Artist sees the message explaining what the .procreate file was an invalid file type |
|3 - The .procreate file fails to get read and fails the extraction of the width, height, and dpi | The canvas information could not be extracted | The entire extraction gets terminated | Artist sees a message asking them to try uploading again |
|4 - The extracted information does not get uploaded into Supabase | The extract information failed to upload into Supabase | Returns the 500 error | Artist sees a message asking them to try uploading again |
|5 - The artist see an error saying that the canvas information could not be read | The extraction did not output any canvas information | No canvas information is uploaded and saved to the website | Canvas information is not there, that it is unavailable and to try uploading again |

- What did the failure branch change about your interface contract from Rep 5 or your data model from Rep 7?
The failure branch did change my interface by ensuring when a .procreate file extractiuon fails that it does not save the bad canvas information into Supabase and returns a error message to the artist.

## Rep 9 - The migration decision

1. Migration mechanism: Supabase tool
2. Forward-only or reversible: Forward-only
3. Path and runner: migrations/0001-initial.sql , applied by Supabase CLI
   (the same script the Week 14 clean-machine test will run)

What is your plan for the first schema change after you have data you care about? Write the two sentences now, while it is hypothetical and therefore easy to be honest about.
  - I will make another migration rather than changing the old migration. I will ensure that it does not delete anything that it should not or change any important data.

## Rep 10 - Error policy and the edge-case register

| Category | Example | Policy |
|---|---|---|
| Invalid input | A missing .png file, .procreate file, gallery type | |
| Not authorized | n/a because I will not have a user accounts system in the first version | n/a because I will not have a user accounts system in the first version |
| Not found | The artwork_id does not exist | Returns the 404 error of the artwork could not be found |
| Conflict | There is a duplicate artwork or there are already 20 artworks uploaded | Returns the 409 error and tells the artist what the conflict was |
| Dependency failure | Supabase times out | The artist can try uploading 3 times and if it still fails it tells the artist to come back later |
| Exhaustion | The art gallery has 20 artworks in it and there is no storage left in the database | The new upload is not uploaded and tells the artist that they have reached the artwork limit |

For every call that leaves this process:
| Call | Timeout (s) | Retries + backoff | Fallback | User is told? |
|---|---|---|---|---|
| delete artwork | 15 | 0 retries | The artwork is kept and a pop up notifying the artist that is failed to delete appears | Yes |
| upload artwork | 60 | 0 retries | A message pop up appears telling the artist that their upload failed | Yes |
| get artwork | 15 | 0 retries | A message pop up appears telling the artist that it failed to load the artwork | Yes |

Edge-case register (12+ entries; these become tests in Week 11):
| # | Edge case | Expected behavior | Becomes test |
|---|---|---|---|
| 1 | Empty state: zero artworks, first run | Shows an empty gallery and tells the artist to upload to see artworks displayed here | Week 11 |
| 2 | Exactly one artwork | Displays the one artwork in the 3D and 2D overview. | Week 11 |
| 3 | Exactly 20 artworks | Displays all 20 artworks in the 3D and 2D overview. | Week 11 |
| 4 | Uploading the 21 artworks | The upload is denied and the artist gets notified with a pop up that they can not exceed the 20 artwork limit, nothing happens to the gallery | Week 11 |
| 5 | Uploading a duplicate artwork | The upload warns the artist that they are trying to upload a duplicate artwork and are they sure they want to replace the current piece | Week 11 |
| 6 | User zooms to a certain distance in the 3D gallery | The viewer is preventing from zooming in to a particular range that is too close so that they do not get lost and forget where they are | Week 11 |
| 7 | Artist deletes every artwork that had been uploaded so there are none left | The gallery becomes empty telling the artist to upload to see artworks displayed here | Week 11 |
| 8 | Artwork file name has an emoji in it | The artwork file is allowed and uploads without problem | Week 11 |
| 9 | Artist clicks out of image in 3D gallery | The image is closed and the artist can go back to exploring the other artworks | Week 11 |
| 10 | Artist cancels the artwork deletion | The artwork is not deleted and the artwork remains the same | Week 11 |
| 11 | Artist uploads a file that is 250 characters long | The artwork is displayed without a problem in the scenes | Week 11 |
| 12 | A .png file is uploaded without its .procreate file | The upload is allowed and the canvas information is left blank saying that the artist did not upload any canvas information for this piece | Week 11 |

Which external call did you discover had no timeout at all in your plan? Look up what your client library’s default actually is and write the number down — some defaults are “forever.”
  - I did not find any external call that had no timeout and can run forever. The supabase default timeout for the anon role is 3s though. I chose a 15/60 second timeout for my calls so that they have enough time to finish.

## Rep 11 - Rewrite the vague specification

FR-07 — Expiry notifications                            Priority: Must
Owner: search   ·   Depends on: database

Definition  
A search is found when the search is in the database or when key words bring up a related find, it is not case sensitive. If there are no results then a user gets the message that there are no search results for that search. If a search is found it displays results and if it is more than 10 results it gets paginated.

Trigger  
The search runs when the users enters a search and hits the search button to begin the search query.

Behavior
  1. The user types in what they want to search and the search searches for what they wrote based off the keywords they used
  2. The query returns the result from the closest match to the farthest match
  3. It return 10 results per page, more than 10 gets paginated
  4. If the result is that there are no matching it shows no results and a message that there is no matching search results for that search.
  5. If there are over 100 results then it narrows the search down to the closet matches to only have 100 maximum.

Data  
reads search, writes nothing. No public endpoint; the search results are returned on the search page

Errors  
Search fails -> The Search failed please try again and log ERROR. 
Search is invalid -> The Search failed please try again and log ERROR, the search is not run.
Edge  
Extra spaces are added after search -> extra spaces are removed
UI  Shows the search results on the search page. If there are no search results then it says There are no search results found

Acceptance (Week 11 turns these into tests, verbatim)
  AC-12.1 search results match one item -> exactly one results appears
  AC-12.2 search results match 0 items -> 0 results appear and no search results found message appears
  AC-12.3 search results matches 100 results -> 100 results appear but with 10 per page
  AC-12.4 search results matches over 100 results -> results are narrowed down to the closest matches 100 maximum

OPEN QUESTION 
  What makes a word in the search a keyword?
  Blocked on what decides a word as a keyword in a search

  Owner: Jennifer Spencer  Decide by: end of Week 7.

Count the decisions you added.
  - I added around 7 more decisions.

## Rep 12 - Specify the dependency that can betray you

| What you call | Cost | What its limits are | Behavior when it is down | What system degrade to |
|---|---|---|---|---|
| Supabase - for the database that stores the artworks and canvas information | $0 - Free Plan | It has storage limits - Database Size 500 MB per project, Storage Size	1 GB | Uploading artworks and canvas information to the database fails, it shows the artist a message that it failed to upload the artwork and canvas information | Artworks that had already been got from the database will show or it would show a sample of artworks and canvas information but anything new will not until the database is available to start uploads again |

| Fact | Value | Source URL | Date checked |
| Supabase pricing | Free Plan | https://supabase.com/pricing | 2026-10-04 |

Describe your fallback in one sentence, then answer honestly: could you demo your project in Week 16 with that dependency switched off entirely? If not, the fallback is not real yet.
  - The failback is if Supabase is not available if there are artwork that had already been uploaded and got or a sample of artworks and canvas information then they will show correctly but anything new will not until the database is available to start uploads again. I could demo my project in Week 16 with Supabase switched off entirely because my project could use a sample set of artworks and canvas information just the uploading of new artworks and canvas information would not be available at that time.