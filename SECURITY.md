# Security Policy

## Supported versions

Atria is an early-stage project. Security fixes are applied to the latest code on `main`.

| Version | Supported |
|---|---|
| 0.1.x | Yes |
| < 0.1 | No |

---

## Reporting a vulnerability

**Do not open a public issue for a security vulnerability.**

Preferred channel: open a private security advisory on GitHub:

https://github.com/breeze-sn/Atria/security/advisories/new

If private advisories are unavailable, contact the maintainer privately:

- GitHub: [@breeze-sn](https://github.com/breeze-sn)
- Email: nagekarsimran@outlook.com

Please include:

- a clear description of the issue;
- affected URL, route, or file;
- steps to reproduce;
- potential impact;
- any suggested fix;
- whether you wish to be credited.

Do not include live secrets, personal data, or destructive payloads.

---

## What to expect

- The maintainer will acknowledge the report as soon as practical.
- The report will be investigated and validated.
- You will be kept informed of significant progress.
- A fix will be prepared and released on `main`.
- Public disclosure should wait until a fix is available, unless there is an active exploitation concern.

This is a volunteer-run open-source project. There is no bug bounty programme and no guaranteed
response time.

---

## Scope

Atria is a client-side React application. Relevant areas include:

- cross-site scripting through rendered content;
- unsafe handling of user input;
- dependency vulnerabilities;
- exposed secrets in the repository or build output;
- malicious links or redirects;
- privacy issues in analytics or third-party requests;
- supply-chain risks in the build.

## Out of scope

- The absence of authentication. Atria has no accounts, backend, or protected data.
- The absence of a backend API. There is no server-side application to attack.
- Self-XSS that requires the victim to paste code into their own console.
- Reports requiring physical access to a user's device.
- Social engineering.
- Denial-of-service through unrealistic resource exhaustion.
- Issues in third-party services outside the project's control.
- Automated scanner output without a demonstrated impact.

---

## Security model

Atria currently has:

- no authentication;
- no authorisation;
- no database;
- no server-side API;
- no file uploads;
- no payment processing;
- no user-generated content storage.

Content is static and bundled at build time. “Copy” actions write recognised design values to the
clipboard. “Open in Google Docs” actions open public Google Docs URLs in a new tab.

This model may change as the project evolves. This document should be updated when it does.

---

## Safe harbour

We will not pursue or support legal action against researchers who:

- act in good faith;
- avoid privacy violations, data destruction, and service disruption;
- report findings privately;
- give the maintainer reasonable time to respond before disclosure.

---

## Related documents

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security and authentication](docs/engineering/security-and-authentication.md)
- [Contribution workflow](docs/contributing/contribution-workflow.md)
