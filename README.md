# 🎂 WishBloom — Birthday Greeting Platform

A production-ready birthday greeting platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Firebase.

## Features

- **Email/password authentication** via Firebase Auth
- **Create birthday pages** with a name and personal message
- **Unique shareable links** — no account needed to view
- **Confetti celebration** on birthday pages
- **Responsive, mobile-first design** with smooth animations
- **Protected dashboard** — only authenticated users can create pages
- **Clean service layer** — no direct Firestore calls in components

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider + fonts
│   ├── globals.css             # Design tokens + Tailwind base
│   ├── page.tsx                # Landing / home page
│   ├── not-found.tsx           # Global 404
│   ├── auth/
│   │   ├── layout.tsx          # Shared auth card layout
│   │   ├── login/page.tsx      # Sign in
│   │   └── signup/page.tsx     # Create account
│   ├── dashboard/
│   │   └── page.tsx            # Protected: create + list birthday pages
│   └── birthday/
│       └── [id]/
│           ├── page.tsx        # Server component: fetch + metadata
│           ├── BirthdayView.tsx # Client: confetti + animations
│           └── not-found.tsx   # 404 for missing pages
├── components/
│   ├── CreateBirthdayForm.tsx  # Form for creating a birthday page
│   ├── BirthdayCard.tsx        # Dashboard list item + copy link
│   ├── NewPageBanner.tsx       # Post-creation success banner
│   └── useConfetti.ts          # Confetti animation hook
├── context/
│   └── AuthContext.tsx         # Firebase auth state + actions
├── lib/
│   └── firebase.ts             # Firebase app singleton
├── services/
│   └── birthday.ts             # Firestore service layer
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd birthday-app
npm install
```

### 2. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password provider
4. Create a **Firestore** database (start in production mode)
5. Go to Project Settings → General → Your Apps → Web App
6. Copy the config values

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your Firebase values in `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Deploy Firestore rules and indexes

```bash
# Install Firebase CLI if needed
npm install -g firebase-tools

firebase login
firebase init firestore  # Select your project

# Deploy rules
firebase deploy --only firestore:rules

# Deploy indexes
firebase deploy --only firestore:indexes
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Firestore Security Rules

```
# firestore.rules
- Public read on all birthday documents (anyone with link can view)
- Create: authenticated users only, for themselves (userId == auth.uid)
- Update/Delete: only the owner
```

## Database Design

```
Collection: birthdays
Document: {id}
Fields:
  id:        string   — nanoid (10 chars), matches doc path
  userId:    string   — Firebase Auth UID
  name:      string   — Birthday person's name
  message:   string   — Personal message
  createdAt: timestamp — Server timestamp
```

---

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run type-check # TypeScript check (no emit)
npm run lint       # ESLint
```

---

## Production Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all `NEXT_PUBLIC_FIREBASE_*` environment variables
4. Set `NEXT_PUBLIC_APP_URL` to your Vercel domain
5. Deploy

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Framework   | Next.js 14 (App Router)       |
| Language    | TypeScript                    |
| Styling     | Tailwind CSS + CSS Variables  |
| Auth        | Firebase Authentication       |
| Database    | Cloud Firestore               |
| IDs         | nanoid                        |
| Confetti    | canvas-confetti               |
| Fonts       | Playfair Display + DM Sans    |
