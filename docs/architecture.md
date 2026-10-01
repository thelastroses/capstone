# architecture

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
| `gallery` | Displays the 3D gallery that allows interactions for each artwork | `selectedArtworks` | `db` | FR-TDG-01, FR-TDG-02 |
| `overview` | Displays 2D artworks and its canvas information | `allArtworks` | `db` | FR-GALL-02, FR-GALL-04 |
| `upload` | uploads artworks and stores artwork and canvas information for later in database | `files` | `db` | FR-UPL-01, FR-UPL-02, FR-UPL-03 |
| `contact` | Opens email to message artist so that viewers can get in contact | `none` | `mail` | FR-GALL-03 |

Dependency graph is acyclic: yes
Every piece of state has exactly one owner: yes

Which test failed first? Almost everyone fails the single-owner test on their first draft. What state did you find with two owners, and what would that have cost you in Week 12?

None of my tests failed and I did not find 2 owners in any of the rows. 


