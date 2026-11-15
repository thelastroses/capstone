## Rep 5 - Break your dependency on purpose

Pick your riskiest third-party dependency. Make it fail four ways and record what your system does:

| Failure          | How I simulated it                      | What the user saw | Acceptable? |
|------------------|------------------------------------------|-------------------|-------------|
| slow (10 s)      | In the url dev server put /?artworkFailure=timeout or /upload?artworkFailure=timeout, wait 10 seconds | Timeout message, retry connection, and sample artwork and canvas information in both the upload and home page | yes |
| down             | Block the Supabase host in the Console; Ctrl Shift P Show request conditions, Enable blocking and throttling, block the *://*.supabase.co/* | Offline message, retry connection button, sample artwork and canvas information in both the upload and home page | yes |
| rate limited     | In the url dev server put /?artworkFailure=rate-limited or /upload?artworkFailure=rate-limited | Rate limit message, retry connection button, sample artwork and canvas information in both the upload and home page | yes |
| changed response | In the url dev server put /?artworkFailure=changed-response or /upload?artworkFailure=changed-response | Changed reponse message, retry connection button, sample artwork and canvas information in both the upload and home page | yes |

Reflect: Before this rep, what did your app do when that dependency was down? Be specific — “it hung” and “it crashed” and “it showed a blank page” are three different answers, and only one of them is survivable on demo day.
-   Before this rep, the home page showed an empty 3D and 2D gallery. The upload page was empty with no message signalling a failure or retry.

## Rep 6 - The assistant as security reviewer, then the advisory database

Findings claimed:            0
Findings confirmed real:     0
Advisory IDs that existed:   0 / 0
Affected range actually included my version: 0 / 0
Real issues it MISSED that I found myself:   0

Reflect: What was its hit rate? And what class of problem did it miss entirely — was it a whole-system issue that no single file could reveal? Write one sentence on what that means for how you use it in Weeks 13–16.
-   0, there were no class of problem that it missed entirely and no whole-system issue thatt no single file revealed.

## Rep 10 — Freeze, gate, tag

Exit criteria:

[ ] every Must-have requirement has a passing acceptance test
[ ] zero open Critical or High defects
[ ] security pass complete; every finding fixed or explicitly accepted
[ ] every performance target measured; each miss has a recorded decision
[ ] a clean clone sets up, runs, and passes tests using only documented steps
Then run the gate with your real commands and tag:

TEST_CMD="./script/setup lint test build" SETUP_CMD="npm ci" sh tools/release-check.sh

git tag -a v0.9.0-rc.1 -m "Release candidate 1: integrated system, Milestone 12"
git push origin v0.9.0-rc.1

Use code/release-check.sh. If the clean-clone check fails, that failure is the most valuable output of your week — fix it before you tag.

Reflect: Which check failed first, and what undeclared state on your machine was it detecting? 
- The Working Tree check failed first because I had not yet committed some of my changes, it dectected uncommitted changes.