Notes and future improvements

- If you see `backend/requirements-dev.txt` containing literal `\\n` characters, replace it with one package per line (e.g., `pytest`, `pytest-cov`, `ruff`, `mypy`).
- Consider introducing minimal app structure for the backend (`app/`, `routes/`, `schemas/`, `services/`).
- Consider adding TypeScript to the frontend later; if introduced, update ESLint and Vitest configs accordingly.
