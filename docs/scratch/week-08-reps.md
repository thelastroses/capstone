## Rep 1 - Assemble the package and gate it yourself

Write: three sentences naming what you had to fix to pass your own entry criteria. If the answer is “nothing,” you did not look hard enough.
-   Included the status codes 200, 201, 204 for what I will use and what each means in my system in the architecture.md file. Added the specicifc code the getArtwork(artwork_id) hits if the artist tries to get the same artwork again in the architecture.md file. Specified what personal data is and how long it would be retained and when it is deleted in the architecture.md file. Added in 2 risks (R-09, R-10) in the risk-register.md so that it covers the risks of the Free Plans for Supabase and Vercel. Added in an updated october and november calendar picture for the updated hours to reflect actual working hours docs\calendar\updated-october-calendar-picture.png | docs\calendar\updated-november-calendar-picture.png.


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

## Rep 4 - The solo walkthrough, cold and out loud

Every time you hesitate, backtrack, or add a spoken clarification that is not written down — that is a defect. The clarification you just said out loud is information the document does not contain.

Produce: at least six findings in the log format, each with a location. 
1. DR-001,self,walkthrough,scattered throughout architecture.md,docs/architecture.md,,"words are misspelled throughout the document making it harder to read for a human review",Trivial,Fix now,"Words corrected so that sentence flow and make more sense",Jennifer Spencer,8,yes
2. DR-002,self,walkthrough,purpose and scope,docs/architecture.md In scope,All Musts and Shoulds,"Some Functional Requirements and Non Functional Requirements are missing from the in scope list",Minor,Fix now,"Added in the missing Functional Requirements and Non Functional Requirements from the inscope so that it correctly aligns with project",Jennifer Spencer,8,yes
3. DR-003,self,walkthrough,interface contracts,docs/architecture.md uploadArtwork(pngFile procreateFile galleryType) deleteArtwork(artwork_id) getArtwork(artwork_id),FR-UPL-01; FR-UPL-03; FR-DATA-01; FR-DATA-02; FR-UPL-02; FR-DATA-02; FR-GALL-02; FR-TDG-02,"error 429 was not added to each interface contract",Minor,Fix now,"Added in 429 because I realized it was needed if the artist tries to request an artwork upload or delete function to many times",Jennifer Spencer,8,yes
4. DR-004,self,walkthrough,interface contracts,docs/architecture.md Error Number,,"Error Numbers 401 and 403 are missing more information on why the error numbers are not included in specific project",Minor,Fix now,"Added in a reason for why 401 and 403 are not included in error numbers section",Jennifer Spencer,8,yes
5. DR-005,self,walkthrough,external and nondeterministic dependencies,docs/architecture.md fact and what you call,,".procreate file and vercel price was not added in to the table in the external and nondeterministic dependencies that puts a source to the price with date and the what you call table",Minor,Fix now,"Added .procreate file and vercel with price source so that it can be looked back if prices change and the what you call so that the system knowns what it degrades to",Jennifer Spencer,8,yes
6. DR-006,self,walkthrough,external and nondeterministic dependencies,docs/architecture.md fallback,,"The fallback explaination was not added into the external and nondeterministic dependencies for the .procreate file and vercel",Minor,Fix now,"Added the fallback explanation into the external and nondeterministic section for the .procreate file and vercel so that if .procreate or vercel is not available or is fully switched off the project does not fail",Jennifer Spencer,8,yes


Write: the one sentence you had to explain out loud that surprised you most.
-   What surpised me the most was the amount of spelling errors I had.

## Rep 5 - Run the Design Review Auditor

Write: your readiness score, the widget’s top three send-backs
-   100% readiness score, no send-backs because all of them were yes.

## Rep 6 - Forty-five minutes with one human being

Katie's main point: requirements.md needs to include the Supabase sample set seems to be a crucial part in the demo if the connection fails
    - effects the plan.md

Asked: “Which part would you be most nervous to build?” Katie: The extraction cause I have never done it before and the pairing the artwork and the canvas information it is just not my cup of tea. - requirements.md FR-EXT-04; FR-EXT-05

Asked: “What would you need to know that isn’t here?” Katie: It is not that things are not fully there, things like the sample set could just be added on and that will help to strength the project I feel 

Write: the finding that stung, and the honest reason it stung.
-   The finding that stung was when she mentioned to add on to a requirement because that means that one of the tasks in my WP-2 will need to be updated as well. 

## Rep 7 - The adversarial AI pass, then the verification

Write: your fabrication rate — fabricated findings over total findings — and one sentence on what that number means for how you use this tool in Week 12. Then answer the question that matters most: name one defect your human reviewer found that the assistant did not, and say why the assistant could not have found it.
-   0/16 even though it did not fabricate anything in this output does not mean it won't. I will have to continue to be careful that everything outputted is a real and verifiable result. A defect that my human reviewer found that the assistant did not is what happpens when Supabase goes down the ai did not know that I wanted it to show a sample set of canvas information.


## Rep 8 - Severity, disposition, owner, due week

Write: the counts — how many Criticals, Majors, Minors — and the one disposition you are least comfortable with.
-   I am comfortable with all of them because all of them were able to be fixed and none of them were defered, rejected, duplicate, or accepted risk.

Criticals: 0
Majors: 2
Minors: 25
Trivial: 2

# Rep 9 - Rework the Majors, then verify them separately

Write: one finding whose fix created a second finding. There is usually one, and catching it is the whole point of verifying separately.
-   The one finding whose fix created a second finding is DR-012 because it made me update my WP-2 after finding a add-on to my FR-GALL-02 requirement in requirement.md.
