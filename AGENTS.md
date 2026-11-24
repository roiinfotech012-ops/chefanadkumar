<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Mandatory Deployment & Environment Rules (Strictly Enforced)

1. **Port Numbers Strictly Managed by `.env`**:
   - Port numbers for the server and proxy (`PORT`, `PROXY_PORT`, `HOSTNAME`) must **only** be managed by `.env` (via `scripts/start-server.mjs`). Never hardcode port numbers in code or package scripts.
2. **Zero Vulnerable Modules**:
   - Ensure no modules with security vulnerabilities are used (`npm audit` must always report `0 vulnerabilities`).
3. **Allowed Hosts Mapped via `.env`**:
   - Prevent any `"Blocked request. This host is not allowed"` issue across all environments by mapping `ALLOWED_HOSTS` directly from `.env` in `next.config.mjs` (`allowedDevOrigins` and `experimental.serverActions.allowedOrigins`) and `vite.config.js` (`server.allowedHosts`) if Vite is ever used.
4. **Mandatory Production Verification (`npm install` -> `npm run build` -> `npm start`)**:
   - Before sending or completing any deployment, always test and verify the full production sequence:
     1. `npm install` (and `npm audit`)
     2. `npm run build`
     3. `npm start` (making the production code live on the port defined in `.env`).
