# Deployment Troubleshooting

This page covers build, preview, routing, and hosting issues. For local setup problems, see
[Debugging](../contributing/debugging.md).

---

## 1. Build failures

### `npm run build` fails

Check, in order:

1. Node.js version — use Node.js 20 or newer.
2. Dependency install — run `npm install` or `npm ci`.
3. Syntax errors in edited files.
4. Missing imports or wrong file paths.
5. A dependency that was added but not installed.
6. Case-sensitive import paths (Linux CI is case-sensitive; Windows may not be).

Run the build locally with the same Node major version as CI.

### Build succeeds locally but fails in CI

Common causes:

- case-sensitive import path;
- local file not committed;
- dependency in `node_modules` but not in `package.json`;
- lockfile not updated;
- Node version difference;
- OS-specific path or script.

Fix by reproducing with `npm ci` and checking the committed tree.

---

## 2. Preview issues

### `npm run preview` shows a blank page

- Ensure `npm run build` completed successfully.
- Confirm `dist/index.html` exists.
- Check the browser console for asset loading errors.
- Confirm you are opening the preview port, not a stale server.

### Deep routes fail in preview

Vite preview normally provides SPA fallback. If a route fails:

- confirm the build is current;
- confirm you are using `npm run preview`, not a generic static server without fallback;
- test `/docs` and `/explore/tokens` directly.

---

## 3. Production routing issues

### Direct URL returns 404 on Vercel

The SPA rewrite is missing or misconfigured. Verify `vercel.json` contains:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### `/docs/` redirects home

Current known behaviour. The entry branch checks for exactly `/docs`, so `/docs/` falls through to the
app router catch-all. Use `/docs` without a trailing slash, or change the entry logic deliberately.

### A route works in dev but not production

Check:

- rewrite configuration;
- whether the path is handled by the entry branch or router;
- case sensitivity;
- cached deployment.

---

## 4. Deployment issues

### Vercel build fails

- Check the Vercel build log.
- Confirm `npm run build` succeeds locally.
- Confirm the output directory is `dist`.
- Confirm the framework preset is Vite.
- Check for environment-specific code (none should exist).

### Deployment succeeded but the site is stale

- Confirm the deployment is promoted.
- Hard-refresh the browser.
- Check asset hashes changed.
- Review Vercel deployment history.

### Rollback needed

Use Vercel's deployment history to promote a previous deployment, or revert the commit on `main`.

---

## 5. CI issues

### CI did not run

- Confirm the event is a push to `main` or a pull request targeting `main`.
- Check workflow file syntax.
- Check repository Actions settings.

### CI lint step passes without linting

Expected. There is no `lint` script, and the workflow uses `--if-present`.

### CI does not deploy

Expected. Vercel deploys independently. See [CI/CD](ci-cd.md).

---

## 6. Content and asset issues

### Fonts do not load

- Google Fonts may be blocked by network or privacy settings.
- Fallback fonts are used.
- Check the browser network panel for blocked requests.

### Documentation links 404

- Repository links may use the wrong relative depth.
- External Google Docs links may have moved or lost access.
- Verify with the [documentation checklist](../contributing/documentation-guidelines.md).

### Screenshots missing

- Confirm files exist in `docs/assets/screenshots/`.
- Confirm README paths match the actual filenames.
- Remember paths are case-sensitive on GitHub.

---

## 7. Related documents

- [Build and deployment](build-and-deployment.md)
- [CI/CD](ci-cd.md)
- [Debugging](../contributing/debugging.md)
- [Installation](../getting-started/installation.md)
