# 🧠 Blood Pressure Tracker — Developer Setup Notes

## 📅 Project Overview
**Goal:** Create a full-stack web app for tracking and visualizing blood pressure data.  
**Architecture:**  
- **Frontend:** React (Vite), Tailwind (planned), tested with **Vitest**  
- **Backend:** Python **FastAPI**, tested with **Pytest**  
- **Docs:** PMBOK-aligned documentation stored in `/docs` (Google Drive or local sync)  
- **CI/CD:** GitHub Actions (Python + Node jobs)  
- **Environment:** WSL (Ubuntu) on Windows

---

## 🧩 Initial File & Folder Structure
Created a modern, portfolio-ready project structure:

```
blood-pressure-tracker/
├── backend/                # FastAPI backend
├── frontend/               # React frontend (Vite)
├── tests/                  # Shared tests or integration hooks
├── docs/                   # Documentation and PM artifacts
├── .github/workflows/      # CI/CD pipeline definitions
└── README.md
```

### Commands used
```bash
mkdir -p blood-pressure-tracker/{backend,frontend,tests,docs,.github/workflows}
touch blood-pressure-tracker/{backend,frontend,tests,docs}/.gitkeep
```

---

## 🐍 Backend (FastAPI + Pytest)
**Steps performed:**
1. Created and activated a virtual environment:
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Installed dependencies:
   ```bash
   pip install --upgrade pip
   pip install fastapi uvicorn pytest pytest-cov
   pip freeze > requirements.txt
   echo "pytest\npytest-cov\nruff\nmypy" > requirements-dev.txt
   ```
3. Created a sample FastAPI app and test:
   ```python
   from fastapi import FastAPI
   from fastapi.testclient import TestClient

   app = FastAPI()

   @app.get("/")
   def read_root():
       return {"message": "Hello, CI/CD"}

   client = TestClient(app)

   def test_root():
       res = client.get("/")
       assert res.status_code == 200
       assert res.json()["message"] == "Hello, CI/CD"
   ```
4. Verified tests locally:
   ```bash
   pytest -q
   ```

---

## ⚛️ Frontend (React + Vite + Vitest)
**Setup steps:**
1. Initialized Vite React app:
   ```bash
   cd frontend
   npm create vite@latest . -- --template react
   npm install
   ```
2. Installed testing dependencies:
   ```bash
   npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```
3. Added a test:
   ```bash
   mkdir -p src/__tests__
   cat > src/__tests__/App.test.jsx << 'EOF'
   import { render, screen } from '@testing-library/react'
   import '@testing-library/jest-dom'
   import App from '../App'

   test('renders the counter button', () => {
     render(<App />)
     expect(screen.getByRole('button', { name: /count/i })).toBeInTheDocument()
   })
   EOF
   ```
4. Updated **vite.config.js** for Vitest:
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       setupFiles: './vitest.setup.js',
       globals: true
     }
   })
   ```
5. Added test setup file:
   ```js
   import '@testing-library/jest-dom'
   ```
6. Verified tests:
   ```bash
   npm run test
   ```
   ✅ Output: tests passed successfully.

---

## ⚙️ .gitignore
Created a robust ignore file for Python, Node, and IDE artifacts (`blood-pressure-tracker/.gitignore`).

---

## 🧾 Version Control
Initialized and committed the repo:
```bash
git init
git add .
git commit -m "Initial working backend + frontend setup with tests passing locally"
git branch -M main
git remote add origin https://github.com/<username>/blood-pressure-tracker.git
git push -u origin main
```

---

## 🚀 CI/CD Setup
**Created:** `.github/workflows/ci.yml`

- Two jobs: **backend** (pytest) & **frontend** (Vitest)
- Uses caching for pip/npm dependencies
- Uploads test artifacts and build outputs
- Automatically cancels stale runs
- Only runs affected jobs when relevant folders change

Tested locally → ready for GitHub push.

---

## ✅ Local Tests Summary
| Component | Framework | Status | Command |
|------------|------------|---------|----------|
| Backend | pytest | ✅ Pass | `pytest -q` |
| Frontend | Vitest | ✅ Pass | `npm run test` |

---

## 🪶 Next Steps (Developer Roadmap)
- [ ] Add `main.py` and modularize backend routes, schemas, and DB models  
- [ ] Integrate SQLite → PostgreSQL later  
- [ ] Add REST endpoints for user + readings  
- [ ] Hook frontend to backend API via Axios  
- [ ] Expand tests for API integration  
- [ ] Configure GitHub Pages or Render for deployment  
- [ ] Add automated coverage reporting (Codecov)  
- [ ] Add `.env.example` and environment config management  
