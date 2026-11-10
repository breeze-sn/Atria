# Security and Authentication

## 1. Current security posture

Atria is a **client-only static application**:

- no backend or server application;
- no API;
- no database;
- no authentication;
- no user accounts or sessions;
- no cookies or browser storage of application data;
- no secrets in the repository;
- no file uploads;
- no user-generated content rendering.

The attack surface is therefore limited to the browser, third-party links, dependencies, and the
static hosting configuration.

---

## 2. Authentication

There is no authentication.

| Capability | Status |
|---|---|
| Sign up / sign in | Not implemented |
| Password reset | Not implemented |
| Session management | Not implemented |
| OAuth / SSO | Not implemented |
| Role-based access | Not implemented |
| Protected routes | Not implemented |
| User profiles | Not implemented |
| Workspace ownership | Not implemented |

All routes are public. The Studio briefs are visible to anyone with the URL. There is no user-specific
data to protect.

Any future authentication design must include an ADR and a security review.

---

## 3. Data protection

### What data exists

- Static content embedded in the bundle.
- Public contact links.
- Public Google Docs URLs.
- Local UI state in memory.
- Clipboard content written on user action.

### What data does not exist

- Personal user records.
- Design-system data owned by users.
- Uploaded files.
- Analytics or telemetry.
- Payment information.
- Authentication secrets.

### Storage

No `localStorage`, `sessionStorage`, IndexedDB, or cookies are used by the application.

---

## 4. Client-side controls

| Control | Implementation |
|---|---|
| External links | `rel="noreferrer"` on new-tab links |
| Clipboard | User-initiated; failure handled without false success |
| Dependencies | Small runtime surface (React, React DOM, React Router, Phosphor Icons) |
| Secrets | None committed |
| Configuration | No environment variables or secret injection |
| Rendering | No `dangerouslySetInnerHTML`, `innerHTML`, or dynamic HTML evaluation |
| User input | No user input fields in the current app |

The app does not evaluate user-provided code or render untrusted HTML.

---

## 5. Third-party dependencies

### Runtime

| Package | Purpose |
|---|---|
| `react` | UI framework |
| `react-dom` | DOM renderer |
| `react-router-dom` | Routing |
| `@phosphor-icons/react` | Icons |

### Build and development

| Package | Purpose |
|---|---|
| `vite` | Dev server and bundler |
| `@vitejs/plugin-react` | JSX transform |

### External services

| Service | Data exposure |
|---|---|
| Vercel | Hosting and request metadata |
| GitHub | Public repository and outbound links |
| Google Docs | External documents; access controlled by Google |
| Google Fonts | Font request metadata |
| LinkedIn / personal site | Public contact links |

### Supply-chain practices

- `package-lock.json` is committed for reproducible installs.
- CI uses `npm install` with the lockfile.
- There is no automated dependency audit, Dependabot configuration, or SCA tool in the repository.
- Contributors should review dependency additions for necessity, maintenance, and licence.

---

## 6. Hosting and deployment

- Vercel serves static assets.
- `vercel.json` rewrites all paths to `index.html`.
- No server-side secrets or environment variables are configured in the repository.
- CI runs `npm install` and `npm run build`.
- Deployment is through Vercel's Git integration.

Recommended future hardening:

- enable dependency alerts and automated updates;
- pin CI actions to commit SHAs or trusted major versions;
- add security headers through the hosting configuration;
- add a Content Security Policy if third-party scripts are introduced;
- review external link handling and add `noopener` where relevant (note: modern browsers imply
  `noopener` for `target="_blank"`, but explicit attributes are clearer).

---

## 7. Threat considerations for future features

If Atria adds editors, persistence, and sharing, the threat model changes significantly.

| Future capability | Security requirement |
|---|---|
| User accounts | Secure authentication, session handling, password reset, MFA consideration |
| Stored design systems | Authorisation, ownership checks, tenant isolation |
| Team workspaces | Role-based permissions, invitations, audit logs |
| Component previews | Sandboxing and code execution isolation |
| User-generated content | Output encoding, XSS prevention, content security policy |
| Token exports | Validation, safe filenames, no secret leakage |
| File uploads | Type validation, size limits, malware scanning |
| API | Authentication, authorisation, rate limiting, input validation |
| Analytics | Consent, data minimisation, privacy policy |

Do not implement these without a dedicated design and security review.

---

## 8. Reporting a vulnerability

Follow [SECURITY.md](../../SECURITY.md). Do not open a public issue for security-sensitive reports.

---

## 9. Related documents

- [SECURITY.md](../../SECURITY.md)
- [System architecture](../architecture/system-architecture.md)
- [Data flow](../architecture/data-flow.md)
- [API reference](../features/api-reference.md)
- [ADR-0006: Static content and no persistence](../architecture/adr/0006-static-content-no-persistence.md)
- [Deployment](../deployment/build-and-deployment.md)
