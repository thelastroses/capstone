# ADR 0003 — Website Hosting

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Jennifer Spencer
- **Requirements affected:** FR-UPL-01, FR-DATA-01, FR-GALL-02, NFR-PERF-01, NFR-USE-01, NFR-REL-01
- **Related ADRs:** ADR-0001 (React/Vite Primary Framework), ADR-0002 (Data Store for Artworks), ADR-0004 (Interactive Gallery)

## Context

The deployment of my project relies on Vercel so that an artist, viewer, and grader can reach the entire system (every requirement: R-UPL-01, FR-DATA-01, FR-GALL-02, NFR-PERF-01, NFR-USE-01, NFR-REL-01). With Vercel it allows the 3D scene to be viewed on the website browser (FR-GALL-02). Moreover, the website when deployed is able to get the artwork information from Supabase (FR-DATA-01). Moreover, even if the Hobby Plan turns out not to be enough the 20 dollars for the Pro Plan is within my budget and I am more than happy to pay for this project if need be.

I have deployed with Vercel in previous projects and has never been a problem before. This makes things easier when it comes to budgeting my 240 hours because it allows me to get more done. Moreover, I chose this technology because I knew that they would work with my other technologies such as React/Vite and TailwindCSS to deploy my website properly on Chrome, saving me from problems down the road.

## Options considered

| Option | Weighted score | The detail that decided it |
|---|---:|---|
| Vercel | 4.65 | I have deployed a website with Vercel before and can connect to Git repository automatically building and deloying the Vite project |
| Netlify | 3.90 | I have not deployed to Netlify before but can connect to Git repository automatically building and deloying a project |
| GitHub Pages | 3.60 | I have not deployed to Netlify before and can deploy a static website from a GitHub repository |

## Decision

I will use Vercel to deploy the project so that an artist, viewer, and grader can access the website. I am the most familiar with Vercel as I have deployed mutiple projects with it before. It is also my top-scored option with a score of 4.65. This will lead to less learning time which is crucial for this project's 240 work hour constraint. It also works with React/Vite, React Three Fiber, TailwindCSS, and Supabase.

## Consequences

**Positive**

- It allows the 3D scene to be viewed on the website browser (FR-GALL-02).
- The website when deployed is able to get the artwork information from Supabase (FR-DATA-01).
- Vercel works well with React/Vite, React Three Fiber, Supabase, and TailwindCSS leading to less of the 240 hours taken up allowing for more time to be spent on performance, usability, and reliablity nonfunctional requirements (NFR-PERF-01, NFR-USE-01, NFR-REL-01).

**Negative**

- The one thing that could get expensive is if the Hobby Plan goes past the usage limit leading to needing to upgrade to the Pro Plan for $20 a month. 
- Even though it costs $20 month it is something I am willing to pay for this project.
- I will learn more about what goes into deploying a website with Vercel. I have budgeted 2 hours for hosting.

## Revisit trigger

I would write a supersceding ADR if Vercel no longer allows my website to be deployed. Moreover, if it no longer works with React/Vite, Supabase, or React Three Fiber. As well if Vercel after switching to the Pro plan from the Free Plan is no longer enough or exceeds 50 dollars a month. This would prevent me from meeting the requirements: NFR-PERF-01, NFR-USE-01, NFR-REL-01. If the website does not load in a p95 under 25 seconds when there are 20 artworks in the galleries with throttled 3G internet in Chrome.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| Vercel Free Tier | https://vercel.com/pricing | 2026-09-27 |
| Vercel Version | https://vercel.com/changelog | 2026-09-27 |
| React/Vite with Vercel | https://vercel.com/templates/react/vite-react | 2026-09-27 |
| Supabase with Vercel | https://vercel.com/marketplace/supabase | 2026-09-27 |
| React Three Fiber with Vercel | https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber // https://vercel.com/blog/add-3d-to-your-web-projects-with-v0-and-react-three-fiber | 2026-09-27 |
| TailwindCSS with Vercel | https://tailwindcss.com/partners/vercel | 2026-09-27 |