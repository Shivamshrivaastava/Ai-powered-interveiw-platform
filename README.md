# MERN Interview Platform

A focused, locally runnable interview-practice MVP: authentication, courses, DSA assignments, an isolated external-code-execution adapter, AI interview flow, browser-level proctoring, a lightweight web playground, and basic admin management.

## Requirements

- Node.js 20+
- MongoDB local instance or Atlas connection string
- Optional Gemini API key for AI-generated questions and qualitative evaluation
- Optional Piston-compatible execution endpoint for real code execution

## Install and run

```bash
git clone <your-repository-url>
cd Ai-powered-interveiw-platform
cp .env.example .env
npm run install:all
npm run seed
# In two terminals:
npm run dev:server
npm run dev:client
```

The API runs on `http://localhost:5000`; Vite prints the frontend URL (normally `http://localhost:5173`). Run `npm run seed` only after MongoDB is available. The development administrator is `admin@example.com` with password `Admin123!`; change or remove it outside local development.

## Environment

| Variable | Purpose |
| --- | --- |
| `PORT` | Express API port. |
| `MONGODB_URI` | MongoDB connection string. |
| `JWT_SECRET` | Long random secret used to sign access tokens. |
| `GEMINI_API_KEY` | Backend-only optional Gemini credential. Leave blank to use safe deterministic AI fallbacks. |
| `CODE_EXECUTION_API_URL` | Piston-compatible endpoint used only when execution mode is `piston`. |
| `CODE_EXECUTION_MODE` | Set to `mock` for no-cost local demonstration; set to `piston` to call the configured external runner. |
| `MAX_VIOLATIONS` | Browser-proctoring violation threshold exposed to the authenticated frontend. |

Never put secrets in the client or commit `.env`.

## Architecture

```text
React / Vite → Express REST API → MongoDB
                       ├──────→ Gemini (optional, backend only)
                       └──────→ Piston-compatible runner (optional)
```

The runner adapter in `server/services/codeExecutionService.js` does not execute submitted code on the application server. Mock mode makes the UI demonstrable if an external runner is unavailable; it intentionally does not mark tests as passed.

## API groups

- `/api/auth` — registration, login, current user
- `/api/courses`, `/api/problems`, `/api/assignments` — learner content
- `/api/submissions` — public run, submission, stored AI evaluation
- `/api/interviews` — generate once, complete once, retrieve results
- `/api/admin` — admin-only CRUD list/create/update/delete endpoints and user list

All successful endpoints return `{ "success": true, "data": ... }`; errors return `{ "success": false, "message": "..." }`.

## Intentional MVP limitations

- Browser proctoring only observes fullscreen exit, tab visibility, and window blur; it does not record/upload media and is not professional exam proctoring.
- The web editor previews HTML/CSS and simple JavaScript in a sandboxed iframe; it is not a full VS Code or package-based React runtime.
- AI is optional. When unavailable, questions and completion feedback fall back safely so the flow remains usable.
- Admin content creation uses concise forms; advanced content editing is intentionally out of scope.
