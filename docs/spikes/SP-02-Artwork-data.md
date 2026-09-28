# Spike SP-02 — Artwork Data, Spike SP-02

- **Unknown:** Will the website be able to take in a .procreate file and retrieve the artwork and canvas information?
- **Feeds:** ADR 0002 — .procreate file extract artwork and canvas information displaying vs. dropping requirements as out of scope for v1
- **Requirements at risk:** FR-EXT-04, FR-EXT-05, ASM-02, FR-GALL-02

## The question

Does the website take in a .procreate file and extract the artwork and canvas information from it in Chrome in under 25 seconds after uploading it in the upload tab??

## The smallest thing that answers it

The .procreate file is able to extract the key information such as the canvas width, height, and dpi and display the canvas information and artwork, for 2 artworks. No database saving, no UI, no error handling.

## Success criterion

The key canvas information and artwork are able to be displayed with in 25 seconds on the Chrome website.

## Failure criterion

Failure is that it takes longer than 25 seconds to display on the website after the canvas information and artwork are done uploading, OR the canvas information and artwork do not display what so ever. 

## Plan B if it fails

If it fails then the canvas information will need to be inputted manually and it will drop FR-EXT-04, FR-EXT-05, ASM-02 as out of scope for v1.

---