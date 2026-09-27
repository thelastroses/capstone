# Spike SP-01 — Art Gallery, Spike SP-01

<!--
a decision — never a feature. Spike code is throwaway by default; if you keep
any of it, say so in the Result section so the next reader knows.
-->

- **Unknown:** Will the blender scene be able to load onto a website and allow interactivity on the objects in it?
- **Feeds:** ADR 0001 — 3D gallery scene loading with object and interactivity vs. dropping requirements as out of scope for v1
- **Requirements at risk:** FR-UPL-03, FR-GALL-02, FR-TDG-01, FR-TDG-02, NFR-PERF-02
- **Time box:** 90 minutes
- **Run on:** 2026-09-24

## The question

 Does the React website render the frame of the 3D gallery in Chrome in under 25 seconds and allow interactivity with clicks and zooming on at least one object?

## The smallest thing that answers it

A 3D scene made with blender is able to load in with 19 objects in it and have minimual controls such as zooming and clicking with React Three Fiber. No database saving, no UI, no error handling.

## Success criterion

Gallery and object are able to be rendered within 25 seconds on the Chrome website.

## Failure criterion

Failure is that fewer than 19 of 20 object are able to be displayed, OR scene is unable to render within 25 seconds, OR scene does not render and load on the website what so ever

## Plan B if it fails

If it fails the website will lower the amount of artworks that will be shown if it just failed because it took longer. If it fails to even render in than it will drop the 3D scene requirements: FR-UPL-03, FR-GALL-02, FR-TDG-01, FR-TDG-02, NFR-PERF-02 as out of scope for v1.

## Result

Gallery scene successfully rendered with object successfully in 914ms which is under 25 seconds. Interactivity with clicks and zooming on one object worked. I am surprise by how fast the website loaded it was only 914ms!

## Decision

Proceed - worked fully. Scene rendered and objects allowed interactivity with clicks and zooming. Requirments are no longer at risk. React Three Fiber and Blender will be the used for the gallery scene. ADR 0001 written same day, risk register entry R-01 closed, and 1.5 minutes logged.

---