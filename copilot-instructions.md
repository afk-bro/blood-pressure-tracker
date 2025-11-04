# Copilot Instructions for Blood Pressure Tracker

These instructions tune Copilot (and human contributors) to work effectively in this repository. They capture the current tech stack, architecture, coding style, testing approach, and CI/CD expectations so generated changes are correct, consistent, and shippable.

## Mandatory

As an autonomous agent you will:
1. Call vibe_check after planning and before major actions.
2. Provide the full user request and your current plan.
3. Optionally, record resolved issues with vibe_learn.

## Repo map and responsibilities

- `frontend/` — React app (Vite). Tests with Vitest + Testing Library.
- `backend/` — FastAPI app (Python 3.11). Tests with pytest.
- `docs/` — Developer notes and project documentation.
- `.github/workflows/ci.yml` — CI for both frontend and backend, with path-based job filtering.
- `README.md` — brief project overview.

## Tech stack (as-implemented)

Frontend
- React 19, Vite 7
- Vitest 4, jsdom, @testing-library/react, @testing-library/jest-dom
- ESLint 9 (flat config) with react-hooks and react-refresh plugins
- Node 20 in CI

Backend
- Python 3.11
- FastAPI 0.120, Starlette 0.48, Uvicorn 0.38
- Pytest 8, pytest-cov
- Pydantic v2

CI/CD
- GitHub Actions matrix of two jobs: backend (pytest) and frontend (Vitest)
- dorny/paths-filter determines which job runs based on changed folders
- Node setup uses caching keyed by `frontend/package-lock.json`
- Python setup uses pip cache, optionally Poetry if `pyproject.toml` exists

## Conventions and style

General
- Prefer small, focused PRs with tests. Update docs if behavior changes.
- Keep secrets out of the repo. Use `.env` locally and add `.env.example` templates.
- Do not invent files/paths — verify with a repository search before referencing.
- Use deterministic installs: commit `frontend/package-lock.json` (allowed via `.gitignore` negation).

Frontend (React + Vite)
- Use function components and React hooks. Avoid class components.
- Co-locate tests under `src/__tests__` or alongside files as `*.test.jsx`.
- Testing: use Testing Library queries (role/name/label) over brittle selectors.
- Lint: respect `frontend/eslint.config.js` (flat config). Fix lint issues as part of your change.
- Vitest config is in `frontend/vite.config.js` (test.environment=jsdom, setupFiles=vitest.setup.js).
 - Keep imports ESM-only; the frontend uses ESM with `"type": "module"` in `package.json`.
 - Prefer `fetch` for HTTP in the frontend (no axios installed yet). If you add a client, install and wire tests.

Backend (FastAPI)
- Organize app code under `backend/`. Tests live under `backend/tests/`.
- Prefer creating an `app/main.py` with the FastAPI instance and modular routes.
- Use Pydantic v2 models for request/response schemas.
- Write pytest tests using `TestClient` from `fastapi.testclient`.
- Keep dependencies pinned in `requirements.txt`. If you add dev tools, put them in `requirements-dev.txt` (one package per line).

## Testing policy

- Every feature or bugfix should include at least 1-2 tests (happy path + one edge case).
- Frontend tests use Vitest + Testing Library and run in jsdom.
- Backend tests use pytest; avoid hitting the network or real databases in unit tests.
- If you add a new public API (route/component), add a test demonstrating its contract.

## CI/CD expectations and gotchas

- Jobs are filtered by path changes:
	- Changes under `frontend/**` trigger the frontend job.
	- Changes under `backend/**` trigger the backend job.
	- If you add shared paths that should trigger both, extend the `filters` block in `.github/workflows/ci.yml`.
- Frontend dependency caching uses `frontend/package-lock.json`. Ensure it is committed.
- Node runs on version 20; keep local Node in the same major version for parity.
- Python runs on 3.11; use that locally when possible.
- If CI fails with "Some specified paths were not resolved, unable to cache dependencies":
	- Confirm `frontend/package-lock.json` is present in the commit.
	- Ensure `cache-dependency-path` points to `frontend/package-lock.json`.

## Available MCP servers

Only the top-level MCP servers are listed here. Use the server name when requesting integrations or automations.

- GitHub MCP
- Linear MCP
- Browser MCP
- Perplexity MCP
- Semgrep MCP
- Supabase MCP
- Python Environment MCP
- shadcn MCP
- Vibecheck MCP
- Time Management MCP
- Library Documentation MCP

## Local development

Frontend
- Install deps: `npm ci` (from `frontend/`)
- Run dev server: `npm run dev`
- Run tests: `npm run test`
- Lint: `npm run lint` (or run ESLint via your editor)

Backend
- Create a venv in `backend/` and install `requirements.txt`.
- Run tests: `pytest -q` (from `backend/`)
- Run server locally (example): `uvicorn main:app --reload` once `app/main.py` exists.

## Common tasks (playbook with acceptance criteria)

Add a React component
- Place it under `frontend/src/components/Name/Name.jsx` (create folder if missing).
- Include a test `Name.test.jsx` under `frontend/src/__tests__/` or alongside the component.
- Use Testing Library and semantic queries. Ensure the test passes.
- Acceptance: tests and lint pass, component is exported and used (if applicable).

Add a FastAPI route
- Define a Pydantic model if the route has a payload.
- Add the route handler and include it via a router in `app/main.py`.
- Write pytest tests using `TestClient` that cover 200 and at least one error case.
- Acceptance: pytest passes locally and in CI.

Wire frontend to backend
- Use `fetch` from the frontend to call the API (default). Handle JSON and HTTP errors.
- Add a simple integration-style test with msw or mock `fetch` (optional to start).
- Acceptance: a small UI renders data or confirms submission with a mocked call; tests pass.

## Commit / PR guidance

- Prefer Conventional Commits (e.g., `feat: add reading form`, `fix: handle network error`).
- Keep PRs under ~300 lines of diff when possible; include tests and screenshots for UI changes.
- Update docs (`README.md` or `/docs`) when behavior or setup changes.

## Definition of Done

- Lint passes with configured rules.
- All tests pass locally and in CI.
- For new features: adequate test coverage and updated docs.
- No secrets or environment-specific paths committed.

## Copilot prompts that work well here

- "Add a FastAPI route POST /readings that validates systolic/diastolic and returns 201; include pytest tests."
- "Create a React component for adding a blood pressure reading with controlled inputs and a submit handler; add a Vitest test."
- "Refactor frontend API calls into a small client module using fetch with JSON helper and error handling; test the helper."
- "Update CI to run code coverage for Vitest and upload artifact; keep the existing job structure."

