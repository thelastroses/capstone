# ADR 0004 — Interactive Gallery

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Jennifer Spencer
- **Requirements affected:** FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-DATA-01, FR-DATA-02, FR-GALL-02, FR-GALL-03, FR-TDG-01, FR-TDG-02, NFR-PERF-02
- **Related ADRs:** ADR-0001 (React/Vite Primary Framework), ADR-0002 (Data Store for Artworks), ADR-0003 (Website Hosting)

## Context

The 3D gallery relies on React Three Fiber for interactivity allowing such as clicking that shows canvas information and zooming on artworks (FR-TDG-01, FR-TDG-02). With React Three Fiber it allows the scene to render and maintain at minimum 30 FPS for 95% of a 60 second viewing session with 20 artworks in Chrome (NFR-PERF-02) and allows the reuse of React components (FR-GALL-02). The core idea of the project relies on React Three Fiber so that viewers are drawn in. The additional requirements that make this a real decision are: FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-DATA-01, FR-DATA-02, FR-GALL-03, NFR-PERF-02. 

I have not worked with React Three Fiber in any previous projects. This means that the learning process of it wil take some time but I have budgeted extra hours with this in mind, 15 hours. I am very interested in learning React Three Fiber because it involves Blender which is a technology that I want to dive deeper in. Moreover, I chose this technology because I knew that it would work with my other technologies such as React/Vite and TailwindCSS to create a 3D gallery on Chrome, saving me from other problems down the road.

## Options considered

| Option | Weighted score | The detail that decided it |
|---|---:|---|
| React Three Fiber | 5.00 | Works with a React website and on Chrome to display a 3D scene |
| Three.js | 4.75 | Can work on React website on chrome displaying 3D scene but needs extra work on integrating React with it |
| A-Frame | 4.75 | Made for 3D enviroments on browsers and works with VR and websites that are in Chrome |

## Decision

I will use React Three Fiber 9.8.1 for the interactive gallery. I am not familiar with React Three Fiber which is why it is apart of my novelty load. However, I did budget 15 hours because of this factor. React Three Fiber was my top-scored option with a score of 5.00. React Three Fiber 9.8.1 will be used for my 3D gallery allowing for interactivity such as clicking and zooming. It also works with Supabase, React/Vite, TailwindCSS, and Vercel.

## Consequences

**Positive**

- Works extermely well with React since it was made for it, is able to reuse React components (FR-GALL-02).
- Creating interactions with the 3D scene such as clicking and zooming on artworks is made possible (FR-TDG-01, FR-TDG-02).

**Negative**

- The new thing that I have to learn is the entire React Three Fiber. 
- I have not used React Three Fiber so there will be some learning in that aspect. It will consume more hours so I budgeted 15 hours for it.
- The thing that becomes harder is how React Three Fiber works with the other technologies such as Supabase, TailwindCSS and React/Vite


## Revisit trigger

I would write a supersceding ADR if React Three Fiber no longer works with React/Vite, Vercel, or Supabase. Preventing FR-UPL-01, FR-UPL-02, FR-UPL-03, FR-DATA-01, FR-DATA-02, FR-GALL-02, FR-TDG-01, FR-TDG-02, NFR-PERF-02 from being completed. It would not allow the 3D gallery to be created which is a core feature that draws the artist in, in the first place. They would not be able to make a 3D gallery that has interactivity to show viewers. Additionally, I would write a supersceding ADR if React Three Fiber is no longer open source and they start to charge an unreasonable price such as exceeding 50 dollars a month. If React Three Fiber is not there than the gallery would not be able to maintain at minimum 30 FPS for 95% of a 60 second viewing session with 20 artworks in Chrome making NFR-PERF-02 not possible.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| React Three Fiber Open Source | https://github.com/pmndrs/react-three-fiber/blob/master/LICENSE | 2026-09-27 |
| React Three Fiber Version 9.8.1 | https://r3f.docs.pmnd.rs/getting-started/installation // https://r3f.docs.pmnd.rs/getting-started/introduction | 2026-09-27 |
| React/Vite with React Three Fiber | https://r3f.docs.pmnd.rs/getting-started/installation | 2026-09-27 |
| Supabase with React Three Fiber | https://supabase.com/blog/interactive-constellation-threejs-react-three-fiber // https://supabase.com/docs/guides/getting-started/quickstarts/reactjs | 2026-09-27 |
| Vercel with React Three Fiber | https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber // https://vercel.com/blog/add-3d-to-your-web-projects-with-v0-and-react-three-fiber | 2026-09-27 |
| TailwindCSS with React Three Fiber | https://www.jogdigitalinnovations.com/blogs/3d-ui-design-with-react-three-fiber-tailwind-bridging-web-design-and-3d-experiences // https://dev.to/saloship/base-setup-for-3-d-web-dev-30h5 | 2026-09-27 |