```markdown
# Global Light — Starter Scaffold

Global Light is a multi-feature learning and community web app focused on education, Gospel/Bible content, music lessons, WASSCE/WAEC preparation, Facebook monetization tutoring, motivational bots, and communications features.

This repository contains a starter scaffold with a Next.js frontend and an Express backend. It includes example integrations with OpenAI, a scheduled motivational quote generator, and a template for SMS / virtual number integrations (using recommended paid providers).

Important: Do NOT commit real API keys or credentials. Use Render environment variables (or secrets) in production.

Creator / Founder
- Name: Akin S. Sokpah
- Email: sokpahakinsaye81@gmail.com
- Facebook page: (set your Facebook page URL in Render env)

Contents
- /frontend — Next.js app (UI + client API calls)
- /backend — Express API server (OpenAI, WASSCE endpoints, scheduler)
- .env.example — example environment variable keys

Quick start (local)
1. Clone the repo:
   - git clone https://github.com/<your-username>/global-light.git
   - cd global-light

2. Backend
   - cd backend
   - cp .env.example .env and fill with your local variables (DON'T USE PRODUCTION KEYS)
   - npm install
   - npm run dev

3. Frontend
   - cd frontend
   - cp .env.local.example .env.local (if provided)
   - npm install
   - npm run dev
   - Open http://localhost:3000

Important notes before deployment
- Rotate any exposed OpenAI (or other) API keys immediately.
- For SMS/virtual-number features, free broadly usable phone numbers for verification across platforms are not a legitimate or legal offering in general. Use paid provider APIs (Twilio, Telnyx, MessageBird) and follow WhatsApp/Facebook terms.
- For Facebook monetization and page/ads integration you must register an app with Facebook/Meta and follow their policies.

Render (deploy) — high level
1. Create GitHub repo and push code.
2. Create two Render services:
   - Backend (Node web service) — build: npm install && npm run build, start: npm start, set env vars
   - Frontend (Static/Next.js or Web Service depending on setup) — follow Next.js on Render docs
3. Configure environment variables in Render dashboard (OPENAI_API_KEY, DATABASE_URL, TWILIO_*, FACEBOOK_*, etc.)
4. Add any necessary add-ons (managed DB), and configure domains.

Security & Compliance
- Never commit secrets. Use .env.example to show variable names only.
- Rotate keys if exposed.
- For phone numbers + verification: follow laws and platform terms; do not attempt to bypass verification systems.

Roadmap (examples)
- AI Chat assistance (OpenAI) for lessons, WASSCE prep
- Live Bible tournament (live streaming integration)
- Piano / instruments course modules (lessons, video/audio)
- Motivational bot (server scheduler + in-app notifications every 30 minutes)
- Facebook monetization bootcamp module and automation guides
- Communications features (friend connections by phone, invite flows) — requires strict privacy rules and phone verification providers

Contact
- Founder: Akin S. Sokpah (sokpahakinsaye81@gmail.com)
```
