## Rep 1 - Scope, out of scope, and six exit criteria

Reflect: Read criterion 6 back. Could a grader check it without you in the room? If not, it is an adjective wearing a number’s clothes — rewrite it.
-   A grader can check it without me in the room.

## Rep 2 - One acceptance criterion, one test case

Confident 

TC-01  Verifies: FR-DATA-02-AC-02   Level: Unit   Data: 20 artworks
Preconditions: 20 artworks are already saved
Steps:  1. Open the upload tab and see that there are 20 artworks already uploaded  2. Try to upload a artwork "daphne" 3. Upload process checks current artwork count images.length and sees its hit the limit and a toast pops up notifying that the artist reached their upload limit
Expected: A toast notifies artist saying the 20 artwork limit has been reached the artwork count does not increase and does not allow any database row or artwork stored in storage. 
Fails if: The upload is not rejected the artwork count goes over 20, a database row for daphne is  added and an artwork for daphne is stored in storage.

Unsure

TC-02  Verifies: FR-UPL-03-AC-01   Level: Unit   Data: 1 artwork
Preconditions: At most 19 artworks are uploaded already and the artist is going to select the both radio button
Steps:  1. Open the upload tab and upload artwork  2. Click on the radio button for the both galleries 3. Upload process uploads the gallery_type and the 3D gallery and the 2D overview filter for the both artwork gallery_type so that it can be displayed in both the 2D and 3D gallery.
Expected: A toast notifies artist saying the artwork has been successfully uploaded to both galleries. When going to view both galleries the artwork is seen in both scenes.
Fails if: The process only puts the artwork in one gallery or nether.

Never exercised

TC-03  Verifies: FR-GALL-02-AC-01  Level: Unit   Data: 2 artworks
Preconditions: Uploaded one artwork
Steps:  1. Artwork is uploaded into 2D overview, "daphne" 2. Check that only one artwork appears of that artwork "daphne" 3. Only one artwork is seen in the 2D overview.
Expected: A toast notifies artist saying the artwork is a duplicate with the same name file name and if they are sure they want to replace the old artwork. If they do it gets replaced, if they don't the artwork is not added to the galleries, 0 rows in the database and storage.
Fails if: The artwork with the same file name is added allowing there to be 2 of the same artworks.

Reflect: Which of the three was hardest to write, and why? A criterion you cannot turn into a test case is usually a criterion that was never testable — that is a Week-3 defect you just found for free.
-   The hardest to write was the never exercised test case because it was tricky to remember what was considered a duplicate file.

## Rep 3 - Partitions and boundaries

Take one requirement that contains a number, a date, a length, or a count. Produce the full partition table, then write a test at every boundary value.

| Partition          | Representative |         Boundary values worth a test     |
|--------------------|----------------|------------------------------------------|
| below the range    |  -1 artworks   |           -1 artwork for the invalid     |
| inside the range   |  10 artworks   |    0 for the first artwork; 19 for the   |
| above the range    |  21 artworks   |     21 artworks for the over limit       |
| absent / null      |      null      |                       null               |

## Rep 6 - Three families of test data

seed --set happy    -> 10 records
seed --set boundary -> 7 records   (empty, one, max, zero, negative, earliest, latest)
seed --set hostile  -> 7 records   (unicode, emoji, apostrophes, 10k chars, injection
                                       strings, path traversal, wrong file type)

