## Extract your architectural drivers

| Driver | Requirement id | Why it constrains the stack |
|---|---|---|
| Must have storage that stores up to 20 artworks | FR-DATA-02, NFR-AVA-02 | Rules out storage technology that can not limit the amount of data that is uploaded to it |
| Must have a 3D gallery that must maintain at minimum for 95% of a 60 second viewing session | NFR-PERF-02 | Rules out technologies that cannot render in Chrome |
| Must delete all data when artwork is removed with one action | NFR-PRIV-01 | Rules out storage that can not remove all data and its related data at the same time |
| Must not have any 0 Supabase keys, passwords and secrets in the repository being saved from the gallery in any commit  | NFR-SEC-01 | Rules out technologies that are not updated with current common data saftey practices  |
| Must run where my grader can reach it, on Chrome on a desktop | CON-04 | Rules out other technology such as moblie devices |

## The job-board test

| Technology | The real reason driver (it serves a requirement) or résumé (it serves you) |
| Vite | It is a driver because it will run the React website on Chrome. Driver |
| React | It is a driver because it will be the interface of the website on Chrome. Driver |
| Blender | It is a driver and it serves me because I have used it before and it will help to create the 3D scene so that React Three Fiber can be used on top of that. Driver + Résumé |
| React Three Fiber | It is a driver and it serves me because it will help to have a 3D gallery that is able to render properly on Chrome and it is a new technology that I would like to try out. Driver + Résumé |
| TailwindCSS | I want to use this for my app because I have used it before and found it helpful when creating a good user experience and ui. Résumé|
| Supabase |  It is a driver because I need a database that is apply to hold up to 20 artworks and is able to remove all data and its related data at the same time. Driver |
| Vercel | It is a driver because I need a way to host the website on Chrome where my grader can reach. Driver |

## Generate the option space, then prune it

The 8 options:
1. Supabase
2. Firebase
3. PostgreSQL with object storage
4. MongoDB Atlas with object storage
5. SQLite with a server-side file directory
6. Appwrite
7. Cloudinary with metadata stored in JSON
8. Local JSON files and an uploads folder

The 4 that did not survive:
1. MongoDB Atlas with object storage - its flexible schema can allow inconsistent or missing fields unless validation is carefully implemented.
2. SQLite with a server-side file directory - it is difficult to use safely for server deployments where local files are temporary.
3. Appwrite - hosting and maintaining the Appwrite server adds operational work that I do not have time for.
4. Cloudinary with metadata stored in JSON - it is not a complete relational database, so deleting artwork and all related canvas information requires extra coordination.
5. Local JSON files and an uploads folder - deployed websites usually cannot reliably write persistent files, making it unsuitable for a dependable public gallery.

The 3 that survived:
1. Supabase - Good for a smaller web project, common failure - free plan limit - does not personally effect me as much as other database failures
2. Firebase - Best at providing a managed database, file storage, authentication, and scalable APIs with little server administration.
3. PostgreSQL with object storage - Best at storing structured canvas information reliably while using separate storage for artwork files.

## Weights before scores

The highest-weight data-store criterion is supporting the 20-artwork limit and display requirement because FR-DATA-02 and NFR-AVA-02 directly constrain the amount of artwork the gallery must store and show.

The highest-weight 3D-rendering criterion is maintaining the NFR-PERF-02 frame-rate target because the 3D scene is a must-have experience and poor performance would directly fail its measurable requirement.

The highest-weight hosting criterion is allowing the grader to reach the website in Chrome on a desktop because CON-04 is a hard delivery constraint: an otherwise functional project cannot be evaluated if it cannot be opened.

## The sensitivity pass

- The winner did not change when the heighest weight was halved and redistributed

## The seam inventory

| Seam | What has to work | Crossed before? | Risk | Spike |
|---|---|---|---|---|
| website ↔ 3D gallery | React website must be able to render the 3D gallery in Chrome and allow interactivity | no | High | SP-01 |
| website ↔ database | React website must be able to read and write the data from Supabase | yes | Medium | SP-02 |
| website ↔ deploy | The website must be able to build and run on the chosen deployment site | yes | Medium | SP-03 |
| website ↔ artwork data | The website must be able to take in .procreate files and retrieve the artwork and canvas information | no | High | SP-04 |
| database ↔ artwork data | Artwork and artwork canvas information must be able to be stored and retrieved without error | no | Medium | SP-05 |
| 3D gallery ↔ artwork data | 3D gallery must be able to get the correct artwork data for each artwork | no | High | SP-06 |

##  Count your novelty load

React Three Fiber - innovation token requirement; spiked in SP-01; it allows for an interactive 3D gallery: FR-UPL-03, FR-GALL-02, FR-TDG-01, FR-TDG-02
.procreate file Extraction

2 - They interact with each other share seam SP-06