# EgoIndex — Clear Roblox Avatar Version

This version adds:

- Roblox avatar loading by username
- Roblox user ID + profile link
- clearer profile card
- automatic rank from stats:
  - S = 90+
  - A = 80–89
  - B = 70–79
  - C = below 70
- reviewer name field
- average stat calculation from all feedback

## Important

Roblox avatar loading uses `/api/roblox.js`, a Vercel Serverless Function.
It works after deploying to Vercel.

If you open `index.html` directly from your computer, the avatar API will not work because `/api/roblox` does not exist locally.

## Setup

1. Copy these files into your GitHub repo.
2. Run `update_supabase_tables.sql` in Supabase SQL Editor.
3. Open `index.html`.
4. Replace:

```js
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";
```

5. Commit and push:

```bash
git add .
git commit -m "Add Roblox avatar loading and rank system"
git push
```

6. Vercel will redeploy.

## Files

- `index.html`
- `api/roblox.js`
- `update_supabase_tables.sql`
- `assets/ego-analysis.png`
