## Rep 1 - Score your README before you touch it

 1. What it is / who it is for     1
 2. Demo (screenshot, GIF, session) 0
 3. Prerequisites with versions     1
 4. Install                         2
 5. Configure                       1
 6. Run (+ the action that proves it works) 2
 7. Test                            2
 8. Project layout                  2
 9. Troubleshooting                 0
10. License                         0
11. Contact / further reading       1
                            TOTAL: 12 / 22


## Rep 2 - Pin what you actually have

node --version ; npm --version ; python --version ; git --version; docker --version; npm exec -- supabase --version

Paste the real output into a prerequisites table with three columns: requirement, tested-on version, check command. Then add the row nobody writes: for each prerequisite, what breaks and how the reader will recognize it.

node --version
v22.12.0

npm --version
10.9.0

git --version
git version 2.47.1.windows.1

python --version
Python 3.13.1

docker --version
docker 29.9.2

npm exec -- supabase --version
2.119.0


Reflect: Which prerequisite did you almost forget because it has been installed on your machine since freshman year? Those are the ones a stranger cannot guess.
-   I almost forgot about Python and Git because those were the ones I installed a long time ago.


## Rep - 3 Find the invisible accounts and the personal paths

grep -rnE "/Users/|/jspen/[a-z]|C:\\Users|localhost:[0-9]{4}|127\.0\.0\.1" README.md docs/
docs/scratch/week-09-reps.md:114:-   Passing: SMOKE OK: http://127.0.0.1:54321/rest/v1/artwork?select=png_name returned the seeded row (eye.jpg). The skeleton walks.

docs/scratch/week-09-reps.md:115:=   Failed with Data Stored Stopped: SMOKE FAIL: nothing answered at http://127.0.0.1:54321/rest/v1/artwork?select=png_name within 30s (client -> route hop)

docs/secrets-checklist.md:53:APP_BASE_URL=http://127.0.0.1:8080

-   The addess do not expose any personal usernames or paths.

## Rep - 7 The feature-to-code map and one real first issue

-   Table in onboarding file

## Rep 9 - Run the linter, then argue with it

Reflect: Name one thing it flagged that you decided was a false positive, and defend the decision in two sentences. A tool you obey blindly is as bad as a tool you ignore.
- It flagged my ##3 prerequisties table because it thought there were no versions but it is just broken up by a |. The file contains the version so it is a false positive.