# Debugging

This page covers common problems when running or changing Atria locally.

---

## 1. The page is blank

### Checklist

1. Confirm the dev server is running (`npm run dev`).
2. Open the exact URL printed by Vite.
3. Check the browser console for errors.
4. Check the terminal for build or transform errors.
5. Confirm `index.html` contains `<div id="root"></div>`.
6. Confirm `src/main.jsx` is loading.

### Common causes

| Cause | Fix |
|---|---|
| JavaScript bundle failed to load | Restart the dev server; check the console |
| Syntax error in a source file | Fix the reported file and line |
| Wrong port or stale server | Use the printed URL; stop old servers |
| Ad blocker or privacy extension | Test in a clean profile |
| JavaScript disabled | Enable JavaScript |
| Node.js too old | Use Node.js 20+ |

Atria is client-rendered. Without JavaScript, there is no fallback content.

---

## 2. `/docs` shows the landing page

The entry branch checks for exactly `/docs`.

| URL | Behaviour |
|---|---|
| `/docs` | Docs hub |
| `/docs/` | App router → catch-all → `/` |
| `/docs/foo` | App router → catch-all → `/` |

Use `/docs` without a trailing slash. This is known behaviour, not a random bug. See
[Routing](../engineering/routing.md).

---

## 3. A direct route 404s in production

The host is not serving `index.html` for client routes.

- Confirm `vercel.json` contains the rewrite rule.
- Confirm you are testing the deployed URL, not a static file server without fallback.
- Confirm the deployment is current.

Locally, `npm run preview` provides fallback. A generic static server may not.

---

## 4. HMR does not update

- Stop the server with `Ctrl+C`.
- Restart with `npm run dev`.
- Hard-refresh the browser.
- Check the terminal for HMR errors.
- Changes to `vite.config.js` restart the server automatically.

If a component state seems stale, a full reload may be required after edits to `src/main.jsx` or route
configuration.

---

## 5. Port already in use

```bash
npm run dev -- --port 3000
```

Or stop the process using the existing port.

On Windows PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
```

Stop the owning process only if you are sure it is safe.

---

## 6. Clipboard copy does nothing

Possible causes:

- browser denied clipboard permission;
- page is not served from `localhost` or HTTPS;
- clipboard API is unsupported;
- browser requires a user gesture (the button click provides one).

Check the console and browser permission settings. The app intentionally shows no error message on
failure.

---

## 7. Fonts look different

Google Fonts may be unavailable or blocked.

- Check the network panel for failed font requests.
- The app falls back to system sans-serif and monospace fonts.
- The layout remains usable.

This is not a build failure.

---

## 8. Build fails

| Error type | Likely cause | Fix |
|---|---|---|
| Module not found | Wrong path or missing file | Check the import path and case |
| Unexpected token | Syntax error in JSX/JS | Check the reported file |
| Missing dependency | Not installed or not in `package.json` | Run `npm install`; add the dependency properly |
| Node engine error | Old Node.js | Use Node.js 20+ |
| Out of memory | Large build or constrained machine | Close other processes; retry |
| Disk full | No free space | Free disk space and retry |

### Case sensitivity

Windows filesystems are often case-insensitive; Linux CI is case-sensitive. An import that works
locally can fail in CI if the path casing is wrong. Match filenames exactly.

---

## 9. Links do not work in documentation

- Relative links are resolved from the current file's directory.
- Use `../` to move up.
- Use the exact filename casing.
- Verify anchors against headings; GitHub slugifies headings.
- External Google Docs links can require access.

See [Documentation guidelines](documentation-guidelines.md).

---

## 10. Mermaid diagram does not render

- Check the code fence language is `mermaid`.
- Check for unsupported syntax.
- Avoid special characters in node labels where possible.
- Quote labels containing parentheses or punctuation.
- Test in GitHub or a Mermaid live editor.

---

## 11. Useful commands

```bash
npm run dev
npm run build
npm run preview
npm ci
node --version
npm --version
```

---

## 12. Related documents

- [Installation](../getting-started/installation.md)
- [Local development](../getting-started/local-development.md)
- [Routing](../engineering/routing.md)
- [Deployment troubleshooting](../deployment/troubleshooting.md)
- [Testing strategy](../quality/testing-strategy.md)
