# architecture

# Technical Specification — Artwork Gallery

Version: v0.3   Date: 2026-10-16   Author: Jennifer Spencer   Status: Baselined
Requirements baseline this design satisfies: docs/requirements.md v1.3

## 1. Purpose and Scope
One paragraph: what this system is for. Then two lists.
This system is for artists, recruiters for the artist, friends and family to view and interact with the artworks to create a memorable experience. Artists are able to upload their artworks to a 3D and a 2D artwork overview so that artworks never get lost in their photo app again. The website offers more information by taking the extracted canvas information from the artwork and displays it next to each artwork. The artist does not need to write it themself.

In scope: FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-DATA-01, FR-DATA-02, FR-GALL-02, FR-GALL-03, FR-TDG-01, FR-TDG-02, FR-EXT-04, FR-EXT-05, NFR-SEC-01, NFR-SEC-02, NFR-PRIV-01, NFR-DATA-01, NFR-DATA-02, NFR-ACC-01, NFR-ACC-02, NFR-ACC-03, NFR-USE-01, NFR-USE-02, NFR-MNT-01
Out of scope: A user/artist account system is too much extra work that adds over 10 hours of time since I have not made one before. An artstore would be fun to look at and browse through as a viewer, however I want to focus more on showing off the artworks and it would also take a significant amount of time to complete. Rearranging artworks in the 3D scene, light and dark mode, and a place to take pictures built directly into the website are all out of bounds for this version.

## 2. System Context (Level 1)
Diagram: docs/diagrams/Level1-Context.png
| External actor / system | What it does with us | Protocol | If it is unavailable |
|---|---|---|---|
| Artist | Uploads and deletes artworks, views gallery, zooms and clicks on artworks | HTTPS | Gallery tells artist that there is an error and to come back later |
| Viewer | Views gallery, zooms and clicks on artworks | HTTPS | Gallery tells viewer that there is an error and to come back later |
| Website | Runs the entire React/Vite site, rendering the 3D and 2D gallery |  HTTPS | Website can not be accessed |
| Supabase | Stores and allows retrieval of artworks and canvas information | HTTPS | Gallery is currently unavailable and to come back later |
| Gmail | Allows viewer to contact the artist |  mailto: | That there is a problem with the email and to come back later |
| Vercel | Hosts the deployed website | HTTPS | Website can not be accessed |


## 3. Containers (Level 2)
Diagram: docs/diagrams/Level2-Containers.png
| Container | Responsibility (one sentence) | Technology | Runs where | Holds secrets? |
|---|---|---|---|---|
| Website | Takes in artist's artworks and displays them in 2 scenes a 3D and a 2D scene, the scenes pull the artwork and canvas information data to remember for later. | React + Vite | Browser | No |
| Relational Database | Stores artwork and canvas information so that when a user goes out of the website it is remembered for later. | Supabase | Supabase cloud | Yes |
| Deployment | Deploys the website so that people outside of the artist can visit the site. | Vercel | Vercel cloud | No |

Trust boundary: The website runs on the browser while the relational database runs in the Supabase cloud and the deployment runs in the Vercel cloud but Supabase is the only one that hold secrets for this project.

## 4. Components (Level 3 — for the container with the hard part only)
| Component | Responsibility (verb first) | Owns (state) | Depends on | Serves (req IDs) |
|---|---|---|---|---|
| `gallery` | Displays the 3D gallery that allows interactions for each artwork | `selectedArtwork` | `db` | FR-TDG-01, FR-TDG-02, NFR-PERF-01, NFR-PERF-02, NFR-MNT-01, NFR-USE-01, NFR-REL-01, NFR-AVA-02 |
| `overview` | Displays 2D artworks and its canvas information | `allArtworks` | `db` | FR-GALL-02, NFR-USE-02, NFR-USE-01, NFR-ACC-01, NFR-ACC-02, NFR-ACC-03, NFR-REL-01, NFR-AVA-02 |
| `upload` | uploads artworks and stores artwork and canvas information for later in database | `files` | `db` | FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-EXT-04, FR-EXT-05, FR-DATA-01, FR-DATA-02, NFR-DATA-01, NFR-DATA-02, NFR-PRIV-01, NFR-SEC-01, NFR-SEC-02 |
| `contact` | Opens email to message artist so that viewers can get in contact | `none` | `mail` | FR-GALL-03 |

Dependency graph is acyclic: Yes
Every piece of state has exactly one owner: Yes

## 5. Interface Contracts

### uploadArtwork(pngFile, procreateFile, galleryType)                                    (serves FR-UPL-01, FR-UPL-03, FR-DATA-01, FR-DATA-02)
Purpose      Uploads the artwork to the 3D gallery, 2D gallery or both
Auth         Uses Supabase key in .env to connect to Supabase project. The .env file is in the .gitignore so that it is not committed to the repository.
Request  { 
           "pngFile": file           required, .png
           "procreateFile": file     optional, .procreate
           "galleryType": string     required, "2D", "3D", or "both"
         }
Success  201 Created — { "artwork_id": 123e4567-e89b-12d3-a456-789123456789, "fileName": "eye.png", "width": 4320,
         "height": 5400, "dpi": 300 }
Errors   400 invalid_png_file 400 invalid_procreate_file 400 invalid_gallery_type
         409 duplicate_artwork 429 to_many_upload_requests 500 database_error
         body: {"error":{"code":"...","field":"...","message":"..."}}
Idempotency  If the artist tries to upload the same artwork again, the system will return a 409 duplicate_artwork response and ask them if they are sure they want to replace the current artwork or to try uploading a different file
Side effects  Stores the artwork and canvas information that was extracted from the .procreate file upload into Supabase
Limits       maximum of 20 artworks with only .png and .procreate files that are accepted; only one artwork can be uploaded at a time


### deleteArtwork(artwork_id)                                       (serves FR-UPL-02, FR-DATA-02)
Purpose      Deletes the artwork with its matching procreate file from the specific gallery
Auth         Uses Supabase url from the Vite environment variables to connect to Supabase project. The .env file is in the .gitignore so that it is not committed to the repository.
Request  { 
           "artwork_id": uuid        required
         }
Success  204 - Artwork and related files deleted successfully
Errors   400 invalid_artwork_id 404 the artwork does not exist 429 to_many_delete_requests
         500 database_error
         body: {"error":{"code":"...","field":"...","message":"..."}}
Idempotency  If the artist tries to delete an artwork that has already been deleted then the system will return the 404 error and does not delete anything further
Side effects  Deletes the artworks and its canvas information and the .procreate file from Supabase.
Limits       Only one artwork can be deleted at a time

### getArtwork(artwork_id)                                    (serves FR-GALL-02, FR-TDG-02)
Purpose      Gets the artwork for the 3D gallery, 2D gallery or both
Auth         Uses Supabase key in .env to connect to Supabase project. The .env file is in the .gitignore so that it is not committed to the repository.
Request  { 
           "artwork_id": uuid        required
         }
Success  200 OK — { "artwork_id": 123e4567-e89b-12d3-a456-789123456789, "fileName": "eye.png", "galleryType": "both", "width": 4320,
         "height": 5400, "dpi": 300 }
Errors   400 invalid_png_file 400 invalid_procreate_file 400 invalid_gallery_type 404 the artwork does not exist
         409 duplicate_artwork 429 to_many_artwork_requests 500 database_error
         body: {"error":{"code":"...","field":"...","message":"..."}}
Idempotency  If the artist tries to get the same artwork again, the system will not change how the data is saved and return the 409 error
Side effects  Gets the artwork and canvas information that was extracted from the .procreate file upload into Supabase
Limits       Only one artwork can be got at a time


### getAllArtwork()                                    (serves FR-GALL-02, FR-TDG-02)
Purpose      Gets all the artwork for the 3D gallery, 2D gallery or both
Auth         Uses Supabase key in .env to connect to Supabase project. The .env file is in the .gitignore so that it is not committed to the repository.
Request  {}
Success  200 OK — { "artwork_id": 123e4567-e89b-12d3-a456-789123456789, "fileName": "eye.png", "galleryType": "both", "width": 4320,
         "height": 5400, "dpi": 300 }, { "artwork_id": 123e4567-e89b-12d3-a456-789123456788, "fileName": "face.png", "galleryType": "2D", "width": 4320, "height": 5400, "dpi": 300 }
Errors   400 invalid_png_file 400 invalid_procreate_file 400 invalid_gallery_type 404 the artwork does not exist
         409 duplicate_artwork 429 to_many_artwork_requests 500 database_error
         body: {"error":{"code":"...","field":"...","message":"..."}}
Idempotency  If the artist tries to get all the same artworks again, the system will not change how the data is saved and return the 409 error
Side effects  Gets all the artwork and canvas information that was extracted from the .procreate file upload into Supabase
Limits       maximum of 20 artworks with only .png and .procreate files that are accepted during the upload


Error envelope used system-wide: { "error": { "code": ..., "field": ..., "message": ... } }
Status-code policy - Codes I will use and what each means in MY system:
  200 successfully got artwork and canvas information
  201 created artwork and canvas information data
  204 artwork and related files deleted successfully
  400 invalid or missing information such as invalid .png, .procreate file, gallery type, artwork id   401 not used, there are no user accounts
  403 not used, there are no user accounts   404 Artwork could not be found 
  409 request conflicts with current state such as duplicate artworks or there are already a maximum of 20 artworks uploaded   429 not used does not set rate limit
  500 code broke - database error   (CLI: n/a is a website does not have a command line interface)
What a user is shown for each, and what gets logged: The user will be shown a short error message that does not expose every database error detail. The system logs the error code and what interaction caused the error to happen.

| Error Number | What a user is shown for each | What gets logged | 
|---|---|---|
| 400 | The user is shown that there is an invalid or missing information based on what happened if there was an invalid .png, .procreate file, gallery type, or artwork id | The message gets logged for what was invalid or missing with code |
| 401 | n/a because I will not have a user accounts system in the first version | n/a because I will not have a user accounts system in the first version |
| 403 | n/a because I will not have a user accounts system in the first version | n/a because I will not have a user accounts system in the first version |
| 404 | The current selected artwork could not be found please try reloading or select a different artwork | The messages gets logged for what could not be found with the code |
| 409 | The action can not be done, for example, the artist tries uploading the same artwork again creating a duplicate or there are more than 20 artworks already | The message gets logged for what could not be done with code |
| 429 | There were to many requests, please slow down! | The message gets logged for how many requests |
| 500 | Something went wrong. Please try again later | The message gets logged for the database error with code |

Where were you about to use two different error shapes in the same system, and why did that feel reasonable at the time?
  - I was not about to use two different error shapes in the same system it seemed like it would make things more complicated

## 6. Data Model

### Entity: artwork                                 (serves FR-UPL-01, FR-UPL-02, FR-UPL-03)
Purpose        One artwork that has been uploaded to the gallery
  id  uuid  NOT NULL  PK
  png_name  text  NOT NULL  Name of the PNG file
  gallery_type  text  NOT NULL  Has to be either 2D, 3D, or both - enum: '2D' | '3D' | 'both' |
  png_path  text  NOT NULL  PNG file path, where it is located in the storage

Invariants     I1 Every artwork must get a unique id
               I2 Every artwork uploaded must have a PNG file 
               I3 Every artwork must have a gallery type of 2D, 3D, or both 
               I4 The gallery must not hold more than 20 artworks
               I5 There must only be one png file for a artwork
               I6 The gallery_type can only be typed as 2D, 3D, or both 

Relationships  artwork 1 ──── 0..1 procreate_data
Volume         There is a maximum of 20 artworks so at most 20 rows or under (under around there)
Lifecycle      Created when the artist uploads an artwork file successfully. Hard delete with cascade when the artist deletes the artwork and the related procreate_data is deleted with its artwork. 

### Entity: procreate_data                                     (serves FR-UPL-01)
Purpose: One .procreate file that has been uploaded to the gallery that had its canvas information extracted from it
  id            uuid     NOT NULL   PK
  artwork_id  uuid        NOT NULL    UNIQUE   FK -> artwork(id) ON DELETE CASCADE
  width          integer        NULL  (null = width is not available from that .procreate file) ex. 4320
         
  height      integer     NULL  (null = height is not available from that .procreate file) ex. 5400
  dpi      integer     NULL  (null = dpi is not available from that .procreate file)
  procreate_path    text        NOT NULL      .procreate file path, where it is located in the storage
 
Invariants
  I1  artwork_id must reference an artwork that actually exists
  I2 There must only be one .procreate file for an artwork or none
  I3 width, height, dpi can not be negative values
Relationships  procreate_data 0..1 ──── 1 artwork
Volume         There is a maximum of 20 artworks so at most 20 rows or under (under around there) if each artwork has a .procreate file
Lifecycle      Created when the artist uploads an .procreate file successfully and its canvas information is extracted. Hard delete with cascade when the artist deletes the artwork because the related is the procreate_data so it is deleted with its artwork.


Which column did you almost make free text that should be constrained? Which nullable column’s meaning did you struggle to state in words? That struggle means two concepts are sharing one column — say what they are.
  - The column that I almost made free text is the gallery type but I limited it to 2D, 3D, or both as the only choices. I did not struggle to state the nullable column's meaning in words.

### Migrations
Mechanism      Supabase tool
Direction      Forward-only
Path + runner  migrations/0001-initial.sql, applied by Supabase CLI
Conventions    Enums constrained - gallery_type

What is your plan for the first schema change after you have data you care about? Write the two sentences now, while it is hypothetical and therefore easy to be honest about.
  - I will make another migration rather than changing the old migration. I will ensure that it does not delete anything that it should not or change any important data.

  - png_name, png_path, width, height, dpi, procreate_path
  - Retained until the next version of the system comes out for when the user accounts system is added in, linking it to an actual person which is then it would implement the deletion

## 7. Sequence Flows

### Flow 1 — Upload Artwork Flow                      (serves FR-UPL-01, FR-UPL-03, FR-DATA-01, FR-GALL-02)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
| 1 - The artist selects an .png artwork they want to upload with its canvas information .procreate file if they chose to display canvas information. Then the artist chooses the gallery type, where they want it to be displayed | A field is missing input | Does not allow the upload to go through | Artist sees a message saying what was missing |
| 2 - The upload process checks if the .png and .procreate file are all valid file types | The file types being invalid | Returns the 400 error | Artist sees the message explaining what the invalid file type was |
| 3 - The upload starts its process to upload the files and information to Supabase | The upload ends up failing | The upload gets terminated and removes any files possible that may have been stored during the upload | Artist sees the message asking them to try uploading again |
| 4 - The upload stores the canvas information and artwork files into Supabase | The database fails after a file has been stored | Returns the 500 error and deletes the files that were created during the failed upload | Artist sees a message asking them to try uploading again |
| 5 - The artist sees the artwork in the correct gallery type with its canvas information | n/a |  Shows a successful upload pop up | Artist sees a pop up saying that their upload was successfully uploaded|

### Flow 2 — Extraction of the .procreate file                      (serves FR-UPL-01, FR-EXT-04, FR-EXT-05)
| Step | What can go wrong | System behavior | User sees |
|---|---|---|---|
|1 - The artist selects an .png artwork they want to upload with its canvas information .procreate file if they chose to display canvas information. Then the artist chooses the gallery type, where they want it to be displayed | A field is missing input | Does not allow the upload to go through | Artist sees a message saying what was missing |
|2 - The upload process check if .procreate file is valid and it goes to the extraction process | The .procreate file is invalid | Returns the 400 error | Artist sees the message explaining what the .procreate file was an invalid file type |
|3 - The .procreate file gets read and extracts the width, height, and dpi | The canvas information could not be extracted | The entire extraction gets terminated and removes any files possible that may have been stored during the upload | Artist sees a message asking them to try uploading again |
|4 - The extracted information gets uploaded into Supabase | The extract information failed to upload into Supabase | Returns the 500 error and removes any files possible that may have been stored during the upload | Artist sees a message asking them to try uploading again |
|5 - The artist see the canvas information next the the artwork it is related to | n/a | Shows the successfully extracted canvas information | Artist sees a pop up saying that their canvas information was successfully extracted and uploaded |

### Flow 3 — Failed extraction of the .procreate file                      (serves FR-UPL-01, FR-EXT-04)
| Step | What can go wrong | System behavior | User sees |
|1 - The artist selects an .png artwork they want to upload with its canvas information .procreate file if they chose to display canvas information. Then the artist chooses the gallery type, where they want it to be displayed | A field is missing input | Does not allow the upload to go through | Artist sees a message saying what was missing |
|2 - The upload process check if .procreate file is valid and it goes to the extraction process | The .procreate file is invalid | Returns the 400 error | Artist sees the message explaining what the .procreate file was an invalid file type |
|3 - The .procreate file fails to get read and fails the extraction of the width, height, and dpi | The canvas information could not be extracted | The entire extraction gets terminated and removes any files possible that may have been stored during the upload | Artist sees a message asking them to try uploading again |
|4 - The extracted information does not get uploaded into Supabase | The extract information failed to upload into Supabase | Returns the 500 error and removes any files possible that may have been stored during the upload | Artist sees a message asking them to try uploading again |
|5 - The artist see an error saying that the canvas information could not be read | The extraction did not output any canvas information | No canvas information is uploaded and saved to the website | Canvas information is not there, that it is unavailable and to try uploading again |

- What did the failure branch change about your interface contract from Rep 5 or your data model from Rep 7?
The failure branch did change my interface by ensuring when a .procreate file extraction fails that it does not save the bad canvas information into Supabase and returns a error message to the artist.

## 8. Error Handling and Edge Cases

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
| get all artworks | 15 | 0 retries | A message pop up appears telling the artist that it failed to load the artworks | Yes |

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
| 8 | Artwork file name has something such as an emoji in it | The artwork file is allowed and uploads without problem | Week 11 |
| 9 | Artist clicks out of image in 3D gallery | The image is closed and the artist can go back to exploring the other artworks | Week 11 |
| 10 | Artist cancels the artwork deletion | The artwork is not deleted and the artwork remains the same | Week 11 |
| 11 | Artist uploads a file that is 250 characters long | The artwork is displayed without a problem in the scenes | Week 11 |
| 12 | A .png file is uploaded without its .procreate file | The upload is allowed and the canvas information is left blank saying that the artist did not upload any canvas information for this piece | Week 11 |

Which external call did you discover had no timeout at all in your plan? Look up what your client library’s default actually is and write the number down — some defaults are “forever.”
  - I did not find any external call that had no timeout and can run forever. The supabase default timeout for the anon role is 3s though. 

## 9. External and Nondeterministic Dependencies
For an AI component, the prompt contract: purpose, inputs, privacy rule, prompt
template path in this repo, model identifier + date verified, parameters, output
schema + validator, behavior on invalid output, token/latency/cost budget with a
hard cap, the non-AI fallback, and the logging + retention rule.
For any other third party: what you call, cost, limits, behavior when it is down.

| What you call | Cost | What its limits are | Behavior when it is down | What system degrade to |
|---|---|---|---|---|
| Supabase - for the database that stores the artworks and canvas information | $0 - Free Plan | It has storage limits - Database Size 500 MB per project, Storage Size	1 GB | Uploading artworks and canvas information to the database fails, it shows the artist a message that it failed to upload the artwork and canvas information | Artworks that had already been got from the database will show or it would show a sample of artworks and canvas information but anything new will not until the database is available to start uploads again |
| Vercel - for the website to be hosted on and connected | $0 - Free Plan | Edge Requests 1M / month included; Fast Data Transfer 100 GB / month included | Upgrade it to the Hobby Plan if it is down because it hit the usage limits or switch it to use Netlify | Degrades to temporarily unavailable until Vercel is upgraded |
| Procreate - download the .procreate files | $12.99 | Depends on the amount of storage the artist's iPad holds and requires iPad | Use already downloaded files or have fact canvas information display for demonstration purposes | The upload feature if no .procreate files are available would not be able to show off that feature only the fake canvas information displaying next to it |

| Fact | Value | Source URL | Date checked |
| Supabase pricing | Free Plan | https://supabase.com/pricing | 2026-10-04 |
| .procreate file | $0 for me but for others $12.99 for Procreate drawing app on Apple App Store to then download the Procreate specific files | https://procreate.com/ | 2026-10-14 |
| Vercel pricing | Free Plan | https://vercel.com/pricing | 2026-10-16 |

Describe your fallback in one sentence, then answer honestly: could you demo your project in Week 16 with that dependency switched off entirely? If not, the fallback is not real yet.
  - The fallback is if Supabase is not available if there is artwork that had already been uploaded and got or a sample of artworks and canvas information then they will show correctly but anything new will not until the database is available to start uploading again. I could demo my project in Week 16 with Supabase switched off entirely because my project could use a sample set of artworks and canvas information just the uploading of new artworks and canvas information would not be available at that time.
  - I already have it downloaded - fallback: if someone can not download the app I will either provide the .procreate files for them or the canvas information will just not be available with each artwork for them. I could demo my project with this switched off because an artwork does not need canvas information extracted and canvas information extraction will not be available or it will display sample set of canvas information.
  - The failback if Vercel is not available is if the dependency switched off because it hit the usage limits, I would just upgrade to the pro plan or switch it to Netlify. For this reason I would be able to demo my project in Week 16 if I needed to upgrade it to the pro plan because that is a quick fix.

## 10. Traceability
| Requirement | Priority | Component(s) | Interface(s) | Flow |
|---|---|---|---|---|
| FR-UPL-01 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Uploads to Supabase | An artwork file is uploaded it is saved and extracted if .procreate then displayed |
| FR-UPL-03 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Uploads to Gallery and Overview | An artwork file is uploaded and artist chooses where to display it in 3D, 2D, or both |
| FR-GALL-02 | Must | overview | getArtwork(artwork_id) - Gallery gets artworks after Uploaded; getAllArtworks() - After reload gets all artworks back into scene | After artwork is uploaded and it is chosen in 2D scene it is displayed, gets all artworks after 2D scene is reloaded |
| FR-TDG-02 | Must | gallery | getArtwork(artwork_id) - Gallery gets artworks after Uploaded; getAllArtworks() - After reload gets all artworks back into scene | After artwork is uploaded and it is chosen in 3D scene it is displayed so that artist can zoom in and out, gets all artworks after 3D scene is reloaded  |
| FR-EXT-04 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Uploaded gets extracted | An .procreate file is uploaded and extracts the canvas information and displays it where chosen |
| FR-EXT-05 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Extracted gets paired in Gallery and Overview | An .procreate file is uploaded and extracts the canvas information, gets paired with artwork file and displays both together for where it is chosen |
| FR-DATA-01 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Uploaded to Supabase | An artwork file is uploaded it is saved into database so that artist can return and it be there without reuploading |
| FR-DATA-02 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Uploaded to Supabase | An artwork file is about to be uploaded and checked if it is allowed that there are less than 20 uploaded artworks, rejected if 20, accepted if less |
| NFR-PERF-01 | Should | gallery | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in any of the scenes it is displayed |
| NFR-PERF-02 | Must | gallery | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in the 3D scenes it is displayed |
| NFR-REL-01 | Must | gallery, overview | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | When an artwork is displaying in any of the scenes the viewer will not see any unhandled exceptions |
| NFR-AVA-02 | Must | gallery, overview | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in any of the scenes it is displayed |
| NFR-SEC-01 | Must | upload | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | When an artwork is uploaded 0 secrets are exposed to the viewer |
| NFR-SEC-02 | Must | upload | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | When an artwork is uploaded and extracts the canvas information 0 are able to execute HTML or scripts when displayed |
| NFR-PRIV-01 | Must | upload | deleteArtwork(artwork_id) - Artworks get deleted after confirming delete | When an artist uploads an artwork they must be able to delete the artworks and canvas information, 0 deleted artworks and canvas information left in the database, 0 rows |
| NFR-DATA-01 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Uploaded to Supabase | When an artwork is uploaded 0 corrupt or duplicate files are saved |
| NFR-DATA-02 | Must | upload | uploadArtwork(pngFile, procreateFile, galleryType) - Uploaded to Supabase | When an artwork is uploaded and fails 0 artworks and files are saved and any incomplete records are removed |
| NFR-ACC-01 | Must | overview | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in the 2D scene it is displayed, it is able to be navigated without error |
| NFR-ACC-02 | Must | overview | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in the 2D scene it is displayed, it is able to be navigated without error |
| NFR-ACC-03 | Must | overview | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in the 2D scene it is displayed, it is able to be navigated without error |
| NFR-USE-01 | Must | overview, gallery | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in any of the scenes it is displayed, it is able to be navigated without error |
| NFR-USE-02 | Must | overview | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in the 2D scene it is displayed, it is able to be navigated without error |
| NFR-MNT-01 | Must | gallery | getArtwork(artwork_id) - Gallery gets artworks after Uploaded | After artwork is uploaded and it is chosen in any of the scenes it is displayed successfully in under 10 minutes |

Deferred: FR-GALL-01, FR-GALL-04, FR-TDG-03, FR-EXT-01, FR-EXT-02, FR-EXT-03, NFR-PORT-01, FR-UPL-04, FR-UPL-05, FR-UPL-06, FR-UPL-07

## 11. Open Questions and Design Risks
| # | Open question | What it blocks | Owner | Decide by |
|---|---|---|---|---|
| 1 | Does the website take in a .procreate file and extract the artwork and canvas information from it in Chrome in under 25 seconds after uploading it in the upload tab? | FR-EXT-04; FR-EXT-05 | Jennifer Spencer | 2026-10-23 |

## 12. Change Log for This Document
| Version | Date | Change | Why |
|---|---|---|---|
| v0.1 | 2026-10-04 | technical specification | initial architecture doc creation |
| v0.2 | 2026-10-13 | comment edits | updated with missing edits and findings needed to be deferred or added to this document |
| v0.3 | 2026-10-16 | Refining edits | After doing the walkthrough, checklist, and assistant go through, minor defects needed to be updated |