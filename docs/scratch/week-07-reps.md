## Rep 1 - Inventory the invisible work

Invisible work package            In my WBS already?   Rough hours
--------------------------------  -------------------  -----------
Repository scaffold + CI          [x] yes  [ ] no       4 hrs
Seed / fixture data               [ ] yes  [x] no       4 hrs
Error handling + edge cases       [x] yes  [ ] no       10 hrs
Accessibility pass                [ ] yes  [x] no       3 hrs
Secrets, config, deployment       [ ] yes  [x] no       10 hrs
Reviewing AI-generated code       [ ] yes  [x] no       5 hrs
README / runbook / handoff        [ ] yes  [x] no       8 hrs
Checking 3D rendering and performance                          [ ] yes  [x] no       5 hrs
Testing upload tab                           [ ] yes  [x] no       6 hrs
Extracting with mulitple different file types                          [ ] yes  [x] no       3hrs

Reflect: How many boxes came back “no”? Add those hours up. That number is how wrong your plan was ten minutes ago — write it down before you fix it, because you will want the humility later.
    - 8 no - 44 hours

## Rep 2 - Decompose one work package properly

### WP-2 — Extract .procreate data  ·  requirements FR-EXT-04, FR-EXT-05, FR-GALL-02  ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-2.1 | Understand how the .procreate file is structured | FR-EXT-04 | 2 | 3 | 4 | 3.0 | Understand how and where the canvas informatin is and how to retrieve it | — |
| T-2.2 | Extract the canvas information | FR-EXT-04 | 3 | 4 | 5 | 4.0 | Canvas information such as the height, width, and dpi can be retrieved successfully | T-2.1 |
| T-2.3 | Mark the non found fields as n/a | FR-GALL-02 | 2 | 3 | 4 | 3.0 | If there is no canvas information for a specific field then it appears as n/a on the canvas information displayed side panel | T-2.2 |
| T-2.4 | Pair the canvas information .procreate file with the artwork | FR-EXT-05 | 3 | 4 | 5 | 4.0 | The .png and .procreate file that are uploaded together, there data is paired together so they are next to each other in the galleries | T-2.3 |

## Rep 3 - The bad-WBS autopsy

Name five distinct defects. 

1. The tasks are too vague leading to extra features or missed key implementations
2. The time it takes to complete each WBS is too large and does not fit within the developer 75 hard ceiling
3. Does not mention any of the requirements the tasks fulfil
4. Does not give a optimistic, most likely, and pessimitic guess for how long each task will take.
5. Does not give a verifiable condition for when the task is actually completed

### WP-2 — Build Backend ·  requirements FR-BAD-01, FR-BAD-02, FR-BAD-03, FR-BAD-04  ·  owner: Jennifer Spencer

| Task | Name | Reqs | O | M | P | E | Done when | Depends on |
|---|---|---|---:|---:|---:|---:|---|---|
| T-2.1 | Understand and what the structure of the backend will be | FR-BAD-01 | 2 | 3 | 4 | 3.0 | The backend structure is picked out and aligns with the projects goal | — |
| T-2.2 | Add the database into the project | FR-BAD-02 | 2 | 3 | 4 | 3.0 | The database is able to connect, store the data, and retrieve the data that each component needs | T-2.1 |
| T-2.3 | Add the core features | FR-BAD-03 | 3 | 4 | 5 | 4.0 | The core features are able to be completed successfully without error | T-2.2 |
| T-2.4 | Add the error handling | FR-BAD-04 | 2 | 3 | 4 | 3.0 | Every component is able to be completed without running into any unhandled errors, all have an error message | T-2.3 |

Reflect: Which of the five defects is the most expensive, and in which week does the bill arrive? Be specific about the week — that is the skill.
    - Of the five defects that is #2 The time it takes to complete each WBS is too large and does not fit within the developer 75 hard ceiling because the tasks are to vague it is hard to understand how long the project could take and it could easily go over the alloted time which throws off the entire timeline. Leading to missing the project due date. The week that the bill arrives is week 9 because that is where the development of the system starts.

## Rep 4 - Three-point estimate everything

Reflect: For your first five, how did E compare to the single number you would have written before this chapter? Report the average difference as a percentage. That gap is the planning fallacy, measured on yourself.
-   T-2.1 E = 3.0; Before this chaper = 2.0
-   When I gave this task more thought and broke it down it seemed like I underestimated how much time it would take.
    -   Average difference percentage = 50% (so 50% more time than the original)

-   T-2.2 E = 4.0; Before this chaper = 3.0
-   Orinally I thought it would take less time than it actually would be but based on how much time other tasks take it seemed fit to take longer
    -   Average difference percentage = 33.33% (so 33.33% more time than the original)

-   T-2.3 E = 3.0; Before this chaper = 2.0
-   I orinally did not take into account how complex the file structure could be which could play a part into how to mark the fields as n/a/ what is considered a field not being filled
    -   Average difference percentage = 50% (so 50% more time than the original)

-   T-2.4 E = 4.0; Before this chaper = 3.0
-   I orinally did not take into account each step it takes to pair data together and into a database
    -   Average difference percentage = 33.33% (so 33.33% more time than the original)

-   T-1.1 E = 2.0; Before this chaper = 1.0
-   I orinally did not take into account that it needs to not only accept .png and .procreate files while also allowing the .procreate file to be optional
    -   Average difference percentage = 100% (so 100% more time than the original)

## Rep 5 - The spread test

Reflect: How many tasks failed the spread test? Where do the spikes have to sit in your schedule for their answers to arrive in time to matter?
-   0 tasks failed the spread test all where 4 hours or under. Which means that zero had to be split or timeboxed. Each spike can sit in the normal starting and ending areas of the schedule since none are over 4 hours.