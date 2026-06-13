# Zenith - Mental Wellness Tracker

A production-ready Generative AI mental wellness tracker designed for high-stakes exam students.

## Architecture
- **Frontend**: Next.js 14, React 18, TailwindCSS, Zustand.
- **Backend**: FastAPI, SQLAlchemy 2.0 (async), PostgreSQL, WebSockets.
- **AI**: Gemini 2.5 Flash (`google-genai`), Strict Prompt Guardrails, Regex Crisis Pre-filters.
- **Infrastructure**: Docker Compose (DB/Redis).

## Core Features
- Daily Wellness Check-ins (Stress, Sleep, Burnout)
- Safe Space AI Chat (Guardrailed against medical advice, embedded crisis hotline redirects)
- Real-time WebSockets
- Strict PII masking

## Getting Started
1. Start DBs: `docker-compose up -d`
2. Backend: `cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload`
3. Frontend: `cd frontend && npm install && npm run dev`
