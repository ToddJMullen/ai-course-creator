# AI course creator (tut-course-generator)

Next.js app for building courses with AI (Google Gemini), optional YouTube video picks, file storage on Firebase, and signed-in users via Clerk. Data lives in [Neon](https://neon.tech) Postgres through [Drizzle ORM](https://orm.drizzle.team).

## Documentation

Configuration and env var reference: [docs/README.md](docs/README.md).

## Prerequisites

- [Node.js](https://nodejs.org/) LTS (aligned with Next.js 15)
- npm (this repo ships [package-lock.json](package-lock.json); use `npm ci` for a clean install)
- Accounts / keys: [Clerk](https://clerk.com), [Neon](https://console.neon.tech), [Google AI Studio](https://aistudio.google.com/) (Gemini), [Google Cloud](https://console.cloud.google.com/) (YouTube Data API v3), [Firebase](https://console.firebase.google.com/) (Storage)

## Setup

1. **Install dependencies**

   ```bash
   npm ci
   ```

   Use `npm install` if you do not need an exact lockfile match.

2. **Environment variables**

   Copy the example file and edit values:

   ```bash
   cp .env.example .env.local
   ```

   See [docs/README.md](docs/README.md) for what each variable does.

3. **Database**

   Schema and Drizzle config live under `configs/`. After Neon is configured in `.env.local`, apply schema with:

   ```bash
   npm run db:push
   ```

   Optional: open Drizzle Studio with `npm run db:studio`.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Routes under `/dashboard` require sign-in (Clerk middleware in [middleware.js](middleware.js)).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:push` | Push Drizzle schema to Neon |
| `npm run db:studio` | Drizzle Kit Studio |

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19
- **Auth:** Clerk
- **Database:** Neon + Drizzle ORM
- **AI:** `@google/generative-ai` (Gemini)
- **Media / APIs:** YouTube Data API v3, Firebase Storage
- **UI:** Tailwind CSS 4, Radix UI, Lucide

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
