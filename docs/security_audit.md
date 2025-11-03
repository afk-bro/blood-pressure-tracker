# Security audit — Semgrep (initial)

Date: 2025-11-03

Summary
-------
- Tool: Semgrep (OSS managed scan, `auto` rules)
- Scope: Representative frontend files and a backend test were scanned (JS/JSX, HTML, CSS, Python test).
- Result: No findings from the `auto` rule pack.

What I scanned
--------------
- `frontend/src/App.jsx`, `frontend/src/main.jsx`
- `frontend/index.html`, `frontend/vite.config.js`, `frontend/eslint.config.js`
- `frontend/src/index.css`, `frontend/src/App.css`, `frontend/src/__tests__/App.test.jsx`
- `backend/tests/test_sample.py`

Key notes & limitations
----------------------
- Semgrep OSS `auto` rules were used; this gives basic SAST coverage but is not a replacement for a full commercial rule set.
- A managed local scan attempt was blocked by environment policy; I submitted file contents to the managed scanner instead.
- The scan is not a supply-chain (SCA) vulnerability scan — dependencies (NPM/PyPI) were not fully audited by Semgrep.
- Secrets detection and high-confidence secret scans were not run. Dedicated secret-scanning tools (gitleaks, Semgrep Secrets) are recommended.
- Only a representative set of files was scanned. If you have other backend application modules, database code, or scripts, scan those too.

Actions taken in this PR
-----------------------
- Added a GitHub Actions workflow: `.github/workflows/semgrep.yml` to run Semgrep and basic dependency audits on push/PRs.
- Added this report at `docs/security_audit.md`.
- Added a minimal `semgrep.yml` placeholder at repository root for future custom rules.

Recommendations (next steps)
----------------------------
1. Run dependency scanning (SCA):
   - Frontend: `npm audit` and enable Dependabot for NPM.
   - Backend: run `pip-audit` or integrate a dependency scanning tool in CI.
2. Add secrets detection: run `gitleaks` or Semgrep Secrets in CI and scan history for committed secrets.
3. Expand Semgrep rules:
   - Add language-specific packs (`p/javascript`, `p/python`) or curated rule sets.
   - Add a `semgrep.yml` with rules and severity mappings; fail CI only for high/critical findings initially.
4. Scan additional code paths:
   - Backend application code (not just tests), infra-as-code, and any scripts or deployment manifests.
5. Consider using Semgrep Cloud or commercial rules for higher coverage if you need deeper SAST.

How to run locally
------------------
Install Semgrep and run a quick scan:

```bash
pip install semgrep
semgrep --config auto -l javascript,python frontend/ backend/
```

And run dependency checks:

```bash
# frontend
cd frontend && npm ci && npm audit

# backend (from repo root)
pip install pip-audit
pip-audit
```

Contact
-------
If you'd like, I can extend the `semgrep.yml` with recommended rules, add a secrets scan to CI, or scan additional files now.
