# runbook

Where each credential comes from: The Supabase CLI is what creates the local key, the script/setup is what saves it to the .env.local.
How to rotate it: Update the Supabase key, run the setup, and test that the website still works
Who to tell: Tell the project maintainer (which is me (Jennifer Spencer)). Tell Dr. Litman if a key gets exposed
How long rotation takes: Takes about 30 minutes to rotate and then test to ensure that the website still works