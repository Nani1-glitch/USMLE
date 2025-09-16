# USMLE Tutor (Private)

World-class USMLE prep app with GPT-4o-mini, RAG, adaptive quizzes, and analytics.

## Quickstart

1. Clone and install
```bash
npm install
```

2. Environment
Copy `.env.example` to `.env.local` and fill in values.

3. Dev server
```bash
npm run dev
```

4. Build & start
```bash
npm run build && npm start
```

## Environment variables
See `.env.example` for required keys:
- OPENAI_API_KEY, OPENAI_MODEL, EMBEDDING_MODEL
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- DATABASE_URL (Postgres with pgvector)

## Tech
- Next.js App Router + Tailwind
- OpenAI (GPT-4o-mini + text-embedding-3-large)
- Supabase (Auth, Postgres, Storage), pgvector, Drizzle ORM
- UploadThing (file uploads)
- Recharts/Chart.js (analytics)

## Disclaimer
Educational use only. Not medical advice. Verify critical decisions with licensed clinicians and primary sources.
