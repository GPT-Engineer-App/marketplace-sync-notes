# marketplace-sync-notes

The user should: 
Understand the value prop of the marketplace
Get a list of developers, their name, locations and their technoogies (labels)
Filter and search this list
Be able to send a message to these developers
Start persisting notes in the "notes" table in Supabase. Each note has a "note" attribute with its content
Use their REST API (DO NOT use the @supabase/supabase-js package) and 
assume I have a supabase project with following properties: 
Project URL: https://mnwefvnykbgyhbdzpleh.supabase.co/
ANON KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg

Make sure that we sync all the following actions in Supabase:
Creating notes
Editing notes
Deleting notes

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/marketplace-sync-notes.git
cd marketplace-sync-notes
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)