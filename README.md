# 🏠 Family Meeting App v2 — With Login & Cloud Storage

---

## Step 1 — Run the database schema in Supabase

1. Go to **supabase.com** and open your project
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase_schema.sql` from this folder, copy everything, paste it in
5. Click **Run** (green button)
6. You should see "Success" — your tables are created

---

## Step 2 — Add environment variables to Vercel

1. Go to **vercel.com** and open your project
2. Click **Settings** → **Environment Variables**
3. Add these three variables one at a time:

| Name | Value |
|------|-------|
| `VITE_CLERK_PUBLISHABLE_KEY` | your Clerk publishable key |
| `VITE_SUPABASE_URL` | your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | your Supabase anon key |

4. Click **Save** after each one

---

## Step 3 — Push the new code to GitHub

Open your terminal in this folder and run:

```bash
git add .
git commit -m "Add auth and cloud storage"
git push
```

Vercel will auto-deploy in ~60 seconds.

---

## Step 4 — Add your Vercel URL to Clerk

1. Go to **clerk.com** → your app → **Configure** → **Domains**
2. Click **Add Domain**
3. Enter your Vercel URL (e.g. `family-meeting.vercel.app`)
4. Click **Add**

---

## Step 5 — Open the app and sign in!

Your app now has:
- ✅ Google / email sign-in
- ✅ Stays logged in automatically
- ✅ All data saved to the cloud per account
- ✅ Works on every phone as a PWA
