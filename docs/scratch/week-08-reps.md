## Rep 1 - Assemble the package and gate it yourself

Write: three sentences naming what you had to fix to pass your own entry criteria. If the answer is “nothing,” you did not look hard enough.
-   Included the status codes 200, 201, 204 for what I will use and what each means in my system in the architecture.md file. Added the specicifc code the getArtwork(artwork_id) hits if the artist tries to get the same artwork again in the architecture.md file. Specified what personal data is and how long it would be retained and when it is deleted in the architecture.md file. Added in 2 risks (R-09, R-10) in the risk-register.md so that it covers the risks of the Free Plans for Supabase and Vercel. Added in an updated october calendar picture for the updated hours to reflect actual working hours docs\calendar\updated-october-calendar-picture.png.


## Rep 2 - The traceability spot-check

| Req id | Spec section that designs it | Task/work package that builds it | How it will be verified | Verdict |
| FR-UPL-01 | requirements.md - Upload Artworks | T-1.1, T-1.2, T-7.2 | 1st and 3rd acceptance criteria in requirements.md for the requirement | complete |
| FR-UPL-03 | requirements.md - Choose where the artwork displays: in the 3-D scene, 2-D overview, or both | T-1.3, T-4.2, T-5.1 | 1st acceptance criteria in requirements.md for the requirement | complete |
| FR-GALL-02 | requirements.md - Artwork Overview | T-2.3, T-5.1 | 1st and 2nd acceptance criteria in requirements.md for the requirement | complete |
| FR-TDG-02 | requirements.md - Zoom into 3D scene | T-4.5 | 1st acceptance criteria in requirements.md for the requirement | complete |
| FR-EXT-04 | requirements.md - Extract Canvas Information from Artwork .procreate file | T-2.1, T-2.2 | 1st acceptance criteria in requirements.md for the requirement | complete |
| FR-EXT-05 | requirements.md - Pair the extracted canvas information with the uploaded artwork | T-2.4 | 1st acceptance criteria in requirements.md for the requirement | complete |
| FR-DATA-01 | requirements.md - Saves Artworks into Database | T-3.1 | 1st acceptance criteria in requirements.md for the requirement | complete |
| FR-DATA-02 | requirements.md - The amount of artworks an artist can save and upload into the database will be capped. | T-3.2, T-6.4 | 1st acceptance criteria in requirements.md for the requirement | complete |
| FR-UPL-02 | requirements.md - Delete Uploaded Artworks | T-6.1, T-6.2 | 1st acceptance criteria in requirements.md for the requirement | complete |
| FR-GALL-03 | requirements.md - Contact Component | T-5.3 | 1st acceptance criteria in requirements.md for the requirement | complete |

- I have no orphans

## Rep 3 - Write the reviewer’s brief

Design review: Art Gallery, senior capstone, baseline gate.

What I need (45 minutes, please do not go over):
  1. Read docs/requirements.md section 5 (the Must set, 22 requirements)
     and docs/architecture.md sections 5-7 (interfaces, data model, flows).
  2. Use docs/review/design-review-checklist.md, areas 1-3.
  3. I am specifically asking: is there a Must requirement this design does
     not satisfy, and is there anything in the interface section a developer
     could not build from?

NOT asking for: wording, formatting, or whether the idea is good. Settled.
Format: one line per finding, with the section number. Do not soften it.
I will not argue in the meeting; I will log it.

Materials: tag spec-review-candidate, commit d956d5b.
Time box: 45 minutes reading, 45 minutes together Friday.
