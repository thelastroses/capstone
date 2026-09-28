# ADR 0001 — React/Vite Primary Framework

- **Status:** Accepted
- **Date:** 2026-09-27
- **Decider:** Jennifer Spencer
- **Requirements affected:** FR-UPL-01, FR-GALL-02, NFR-PERF-01, NFR-USE-01, NFR-REL-01
- **Related ADRs:** ADR-0002 (Data Store for Artworks), ADR-0003 (Website Hosting), ADR-0004 (Interactive Gallery)

## Context

The components in my project rely on React and Vite because it is these technologies that the website is built on. It uses these technologies to build out the user interface's components and build environment. The core features such as the Artwork Overview (FR-GALL-02) and Upload Artworks (FR-UPL-01) need React and Vite for the features to be built in the first place. The additional requirements that make this a real decision are: NFR-PERF-01, NFR-USE-01, NFR-REL-01. In order to allow interactivity and allow each component to work properly these technologies are needed. 

I have worked with both React and Vite for previous projects. This makes things easier when it comes to budgeting my 240 hours because it allows me to get more done. I know that in my future too that getting an even stronger background in these two technologies will help me immensely for my work. Moreover, I chose these technologies because I knew that they would work with my other technologies such as React Three Fiber which is needed for my 3D gallery and Supabase my data store, saving me from problems down the road.

## Options considered

Did not weight other options because it will work best for my project. I am the most comfortable with these technologies and it keeps the novelty load to a 0. A fallback though would be Nuxt and Vue but that would increase hours to at least 14. Though then React Three Fiber would also need to be changed too which adds even more time. React Three Fiber and React where designed to work together.

## Decision

I will use React 19.3.0 with Vite 8.3.1 for the primary framework. I am the most familiar with both technologies leading to less learning time which is crucial for this project's 240 work hour constraint. React 19.3.0 will be my user interface for building componets while Vite 8.3.1 will be the build tool and development environment. It also works with Supabase, React Three Fiber, TailwindCSS, and Vercel.

## Consequences

**Positive**

- Making the components for the Upload tab and the Artwork Overview will be easiler because of its reusable components (FR-UPL-01, FR-GALL-02).
- React and Vite work well with Supabase, React Three Fiber, Vercel, and TailwindCSS leading to less of the 240 hours taken up allowing for more time to be spent on performance, usability, and reliablity nonfunctional requirements (NFR-PERF-01, NFR-USE-01, NFR-REL-01).

**Negative**

- Determining when information should be passed as a prop and managed as a state is something that I still do not fully understand all the time. 
- The one new thing I will have to learn is how to use React with React Three Fiber, I budgeted 15 hours for the 3D gallery aspect
- I do not have a ton of hours in React and Vite I am no pro which is why I included extra hours so that I know I would have enough time if I have to learn something.

## Revisit trigger

I would write a supersceding ADR if React/Vite no longer work together. If it can not meet a nonfunctional requirment such as NFR-PERF-01, if the website loads above 25 seconds with 20 artworks on throttled 3G in Chrome. Or could not make other core features such as FR-UPL-01, FR-GALL-02 possible. As well if React and Vite are no longer open source and they start to charge an unreasonable price such as exceeding 50 dollars a month.

## Verification

| Claim in this ADR | Source | Checked on |
|---|---|---|
| React Version 19.3.0 | https://react.dev/versions#react-19 | 2026-09-27 |
| Vite Version 8.3.1 | https://vite.dev/releases | 2026-09-27 |
| React Open Source | https://github.com/react/react/blob/main/LICENSE | 2026-09-27 |
| Vite Open Source | https://github.com/vitejs/vite/blob/main/LICENSE | 2026-09-27 |
| Supabase with React/Vite | https://supabase.com/docs/guides/getting-started/quickstarts/reactjs | 2026-09-27 |
| Vercel with React/Vite | https://vercel.com/templates/react/vite-react | 2026-09-27 |
| React Three Fiber with React/Vite | https://r3f.docs.pmnd.rs/getting-started/installation | 2026-09-27 |
| TailwindCSS with React/Vite | https://tailwindcss.com/docs/installation/using-vite | 2026-09-27 |