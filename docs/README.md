# Documentation

- [Environment variables](#environment-variables) — names and purpose

## Environment variables

| Name | Required | Notes |
|------|----------|--------|
| `NEXT_PUBLIC_HOST_NAME` | Yes (for share URL) | Base URL with no trailing slash, e.g. `http://localhost:3000` in development. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key (client). |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key (server). |
| `NEXT_PUBLIC_NEON_DB_CONNECTION` | Yes | Neon connection string for Drizzle (`@neondatabase/serverless`). |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Yes | Google AI API key for Gemini. |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Yes | YouTube Data API v3 key (search). |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Yes | Firebase Web API key (Storage). |

Copy [.env.example](/.env.example) from the repository root to `.env.local`. Next.js loads `.env.local` automatically for local development.

**Security note:** Several values are prefixed with `NEXT_PUBLIC_`, which exposes them to the browser bundle. Prefer server-only secrets for new features; migrating existing keys is a larger change.
