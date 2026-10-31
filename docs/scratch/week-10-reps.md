## Rep 1 - Cut this week’s slices

SLICE: FR-DATA-02 — The amount of artworks an artist can save and upload into the database will be capped.
Layers:       In the upload tab gives limit message if at limit and stop the upload → Checks if artworks are under 20 → Supabase database and storage → Supabase saves artwork and canvas information
Demo in one sentence: The artworks an artist can upload and save into the database to be displayed in the galleries will be limited to 20, if over gets a limit message.
Acceptance criteria to satisfy: AC-01, AC-02
Estimate (three-point):  optimistic 1 h | likely 2 h | pessimistic 3 h
Riskiest unknown: If two artworks, the 20th and 21st, are uploaded at the same time will it still prevent the 21st artwork from uploading?

SLICE: FR-GALL-02 — Artwork overview that display the 2D artworks.
Layers:       The 2D arwork overview → retrieves all the saved artworks and with their canvas information → Supabase database and storage → Supabase gets the artwork and canvas information
Demo in one sentence: The artwork overview gets the artworks when the 2D overview is selected in the upload process which then displays it with its artwork and canvas information.
Acceptance criteria to satisfy: AC-01, AC-02
Estimate (three-point):  optimistic 2 h | likely 3 h | pessimistic 4 h
Riskiest unknown:  Can the 2D overview get all the artworks at once?

SLICE: FR-UPL-03 — Choose where the artwork displays: in the 3-D scene, 2-D overview, or both.
Layers:       The radio buttons for the gallery selection in the upload tab → Checks that what is selected is 2D, 3D, or both saved the selected gallery type → Supabase database → Supabase saves the gallery type
Demo in one sentence: In the upload tab the artist chooses where they want their artwork with its canvas information optionally to be displayed in 2D, 3D, or both galleries.
Acceptance criteria to satisfy: AC-01, AC-02
Estimate (three-point):  optimistic 1 h | likely 2 h | pessimistic 3 h
Riskiest unknown:  Will the artwork display in the current gallery based on the selection?


Reflect: Which slice did you put first, and is it first because it is the riskiest or because it is the most fun? If those are different slices, say why you are overruling the rule — or reorder.
-   The slice that I put first is for the FR-DATA-02 — The amount of artworks an artist can save and upload into the database will be capped because it is the riskiest of the rest of the Must have functional requirements that has not been started. It is not because it is the most fun. Even though it will not take the most amount of time, with the risk it may be tricky to get the logic working.

## Rep 2 - Find the horizontal task hiding on your board

V = 13; H = 7 
-   Folded all H's into a V slice.

Reflect: How many H tasks did you have? Horizontal tasks are not evil — a migration is a migration — but a board that is mostly H is a board that cannot demo anything in Week 15. What is your V-to-H ratio?
-   I had 7 H tasks. My V-to-H-ratio is 13:7 = 1.86.