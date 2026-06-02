# 🏠 Family Meeting App

A Progressive Web App (PWA) for running your weekly family meeting — agenda timer, action items, Bible time, kids' lessons, vision & goals, and full theme customization.

---

## 🚀 Deploy to Vercel in ~5 minutes

### Step 1 — Put the project on GitHub

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **"New repository"** (the green button)
3. Name it `family-meeting`, keep it **Private**, click **Create**
4. On your computer, open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/family-meeting.git
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your GitHub username)*

---

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and click **"Sign Up"** → sign in with GitHub
2. Click **"Add New → Project"**
3. Find and select your `family-meeting` repository → click **Import**
4. Vercel auto-detects Vite — just click **Deploy**
5. In ~60 seconds you'll get a live URL like `family-meeting.vercel.app` 🎉

---

### Step 3 — Install on your phone as an app

**iPhone (Safari):**
1. Open your Vercel URL in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **Add** — it now lives on your home screen like a native app ✅

**Android (Chrome):**
1. Open your Vercel URL in Chrome
2. Chrome will show a banner — tap **"Add to Home Screen"**
3. Or tap the ⋮ menu → **"Add to Home Screen"**

---

## 💻 Run locally (optional)

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
family-meeting/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png   ← iOS home screen icon
│   └── icons/
│       ├── icon-192.png       ← Android icon
│       └── icon-512.png       ← Android splash icon
├── src/
│   ├── main.jsx               ← Entry point
│   ├── index.css              ← Global reset
│   └── App.jsx                ← The entire app
├── index.html
├── vite.config.js             ← Vite + PWA config
├── vercel.json                ← Vercel deploy config
└── package.json
```

---

## ✨ Features

- **Home** — next meeting overview, role assignments, agenda preview
- **Meeting Runner** — step-by-step timer for each agenda segment
- **Actions** — track family action items with owners and due dates
- **Spiritual** — log Bible reading sessions and kids' lessons
- **Vision** — family mission, values, and goals at 6 time horizons
- **Family** — manage members, roles, participation stats
- **History** — record of past meetings with ratings
- **Settings** — 6 color themes, 5 font pairings, custom accent, meeting time/day

---

## 🔄 Updating the app

Any time you push changes to GitHub, Vercel auto-deploys within ~30 seconds.

```bash
git add .
git commit -m "Update family meeting app"
git push
```
