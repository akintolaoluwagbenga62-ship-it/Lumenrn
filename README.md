# Lumen — JAMB Study App (React Native / Expo)

A JAMB study companion for Nigerian candidates. Built with Expo (React Native) and TypeScript.

## Features

- **Authentication** — local accounts with admin role for `admin@lumen.ng`
- **Practice quizzes** — 120+ JAMB-style questions across English, Mathematics, Physics, Chemistry, Biology
- **Flashcards** — quick revision cards across all subjects
- **News feed** — JAMB updates, study tips, scholarships, and announcements (admin can post)
- **Study groups & chat** — create groups, join others, and chat with members
- **Leaderboard** — see top performers
- **Notifications** — admin can broadcast to all users
- **Paywall** — 7-day free trial then premium upgrade (demo: free unlock)
- **Admin panel** — add custom questions, publish news, send notifications

Default admin login: register with `admin@lumen.ng` and any password — your account becomes admin automatically.

## Build the APK with GitHub Actions

1. Create a new public GitHub repo and upload **the contents of this folder** (not the folder itself).
2. GitHub Actions will run automatically. Open the **Actions** tab and wait ~10 minutes for the green checkmark.
3. Open the run, scroll to **Artifacts**, and download `lumen-rn-apk`.
4. Unzip — install `app-release.apk` on your Android phone.

## Run locally (optional)

Requires Node 20+ and Android Studio with an emulator or device.

```bash
npm install
npx expo run:android
```

## Project structure

```
.
├── App.tsx
├── app.json                   # Expo config (icons, splash, package name)
├── index.ts                   # entry point
├── assets/                    # icons & splash
├── src/
│   ├── components/UI.tsx      # shared UI primitives
│   ├── context/AppContext.tsx # global state, AsyncStorage persistence
│   ├── data/                  # question bank, flashcards, seed news
│   ├── navigation/            # tab + stack navigators
│   ├── screens/               # one file per screen
│   ├── services/storage.ts    # AsyncStorage wrapper
│   └── theme.ts               # colors, spacing, radius
└── .github/workflows/build-apk.yml
```
