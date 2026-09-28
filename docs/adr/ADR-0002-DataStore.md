# ADR 0002 — Data Store for Artworks 

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Jennifer Spencer
- **Requirements affected:** FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-DATA-01, FR-DATA-02, FR-GALL-02, FR-TDG-01, FR-EXT-05, NFR-PRIV-01, NFR-DATA-01, NFR-DATA-02
- **Related ADRs:** ADR-0001 (React/Vite Primary Framework), ADR-0003 (Website Hosting), ADR-0004 (Interactive Gallery)

## Context

The data in my project relies on Supabase so that data is remembered the next time an artist goes into the website after fully leaving (FR-DATA-01). The extraction feature of the .procreate file relies on a relational database so that the canvas information and the artwork file can be paired together. Moreover, even if the Free Tier turns out not to be enough the 25 dollars for the Pro Plan is within my budget and I am more than happy to pay for this project if need be. The relational database will allow the canvas information and its matching artwork to be paired together (FR-EXT-05). The additional requirements that make this a real decision are: FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-DATA-02, FR-GALL-02, FR-TDG-01, NFR-PRIV-01, NFR-DATA-01, NFR-DATA-02.

I have worked with Supabase in a previous project and relational databases before. This makes things easier when it comes to budgeting my 240 hours because it allows me to get more done. Moreover, I chose this technology because I knew that they would work with my other technologies such as React Three Fiber which is needed to remember the canvas information in the 3D gallery, saving me from problems down the road.

## Options considered

| Option | Weighted score | The detail that decided it |
|---|---:|---|
| Supabase | 4.70 | Used for small projects, I have used it before, and it uses a relational model based on PostgreSQL to organize information |
| PostgreSQL | 4.20 | I have not shipped with it before but it uses object relational data model to store information |
| Firebase | 3.40 | I have not shipped with it before and it uses a document collection model to store and organize information |

## Decision

I will use Supabase 2.117.2 as the data store to store information about the artwork (the canvas information) and the artwork file. I am familiar with Supabase and it is my top-scored option with a score of 4.70. This will lead to less learning time which is crucial for this project's 240 work hour constraint. It also works with React/Vite, React Three Fiber, TailwindCSS, and Vercel.

## Consequences

**Positive**

- Core features will be able to have the data they hold remembered so that data does not have to be inputted everytime a artist comes back to the website (FR-DATA-01).
- The relational database will allow the canvas information and its matching artwork to be paired together (FR-EXT-05).
- Supabase works well with React/Vite, React Three Fiber, Vercel, and TailwindCSS leading to less of the 240 hours taken up allowing for more time to be spent on privacy and data nonfunctional requirements (NFR-PRIV-01, NFR-DATA-01, NFR-DATA-02).

**Negative**

- The one thing that could get expensive is if the Free Plan can not hold 20 artworks leading needing to upgrade to the Pro Plan for $25 a month. 
- Even though it costs $25 month it is something I am willing to pay for this project.
- I will learn more about how to make tables and the relationships in those tables. I have budgeted 7 hours for the data store.

## Revisit trigger

I would write a supersceding ADR if Supabase no longer works with React/Vite, Vercel, or React Three Fiber. Preventing FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-DATA-01, FR-DATA-02, FR-GALL-02, FR-TDG-01, FR-EXT-05, NFR-PRIV-01, NFR-DATA-01, NFR-DATA-02 from being completed. It would not allow canvas information that was extracted from the .procreate file to be there after coming back the next day. As well as if the Pro plan is no longer enough (one reason it could not be enough: not being able to hold 20 artworks) after switching to the Pro plan from the Free Plan or if it exceeds 50 dollars a month.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| Supabase Free Tier | https://supabase.com/pricing // https://supabase.com/docs/guides/platform/billing-on-supabase | 2026-09-27 |
| Supabase Version 2.117.2 | https://supabase.com/changelog | 2026-09-27 |
| React/Vite with Supabase | https://supabase.com/docs/guides/getting-started/quickstarts/reactjs | 2026-09-27 |
| Vercel with Supabase | https://vercel.com/marketplace/supabase | 2026-09-27 |
| React Three Fiber with Supabase | https://supabase.com/blog/interactive-constellation-threejs-react-three-fiber // https://supabase.com/docs/guides/getting-started/quickstarts/reactjs | 2026-09-27 |
| TailwindCSS with Supabase | https://tailwindcss.com/partners/supabase | 2026-09-27 |