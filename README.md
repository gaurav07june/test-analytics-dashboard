# Test Analytics Dashboard

## Setup

```bash
npm install
npm run dev
```

## Run

```bash
npm run dev
```

Open http://localhost:5173

## API

The app expects a backend at `/api` (e.g. `http://localhost:3001`). Configure proxy in `vite.config.js` if needed.

- `POST /api/auth/login` - Login (mock)
- `GET /api/tests` - List tests
- `POST /api/tests` - Create test
- `GET /api/tests/:id` - Get test (include `sections`)
- `GET /api/tests/:testId/sections/:sectionId` - Get section (include `questions`)
- `POST /api/tests/:testId/sections` - Create section
- `POST /api/tests/:testId/sections/:sectionId/questions` - Create question
