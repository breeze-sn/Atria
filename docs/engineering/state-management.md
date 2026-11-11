# State Management

## 1. Overview

Atria has very little application state. There is no global store, context provider, reducer, query
cache, or persistence layer.

State sources:

| State | Owner | Type |
|---|---|---|
| Current URL / route | Browser + React Router | Navigation state |
| Active sidebar item | `NavLink` derived from URL | Derived state |
| Playground tab (`activeTab`) | `LandingPage` | Local `useState` |
| Copy feedback (`copied`) | `LandingPage` | Local `useState` |
| Clipboard content | Browser clipboard | External side effect |

---

## 2. Local state

### `activeTab`

```jsx
const [activeTab, setActiveTab] = useState('Button')
```

- Determines which playground preview renders.
- Set by clicking a tab button.
- Resets when `LandingPage` unmounts.
- Has no URL representation; refreshing returns to `Button`.

### `copied`

```jsx
const [copied, setCopied] = useState(false)
```

- Changes the copy button label to `COPIED`.
- Set after a successful clipboard write.
- Reset to `false` after 1800 ms.
- Reset to `false` on clipboard failure.
- Not persisted.

These are the only state variables in the repository.

---

## 3. Derived state

- The selected tab's class is derived from `activeTab === tab`.
- The preview content is conditionally rendered from `activeTab`.
- The sidebar active class is derived by `NavLink` from the current route.
- The copy button label is derived from `copied`.

No `useMemo` or `useCallback` is used. The render cost is negligible.

---

## 4. URL as state

Navigation state lives in the URL:

- `/` — landing;
- `/docs` — documentation hub;
- `/explore/foundations` — Foundations brief;
- `/explore/tokens` — Tokens brief;
- `/explore/components` — Components brief.

Benefits:

- sections are shareable;
- browser back/forward works;
- active sidebar state is unambiguous;
- refresh preserves the section.

Limitation:

- `/docs` is outside the router, so navigation to and from it is a full page load.

---

## 5. What is absent

| Pattern | Present |
|---|---|
| Redux | No |
| Zustand | No |
| MobX | No |
| Jotai / Recoil | No |
| React Context | No |
| `useReducer` | No |
| React Query / SWR | No |
| Apollo / GraphQL client | No |
| Local storage / IndexedDB | No |
| Cookies | No |
| Server session | No |
| URL query state | Only incidental; not used for UI state |

---

## 6. Why this is appropriate now

- The product surface is small.
- No data is shared across distant components.
- No data is fetched.
- No data is persisted.
- Local state is sufficient for the two interactive demonstrations.

Adding a store now would create indirection without solving a current problem.

---

## 7. When to introduce shared state

Consider shared state only when:

- two or more distant components need the same data;
- Studio editing produces data that multiple views must read;
- persistence or API data must be cached and invalidated;
- undo/redo, optimistic updates, or conflict resolution is required.

At that point:

1. Define the data ownership model.
2. Prefer the smallest suitable solution: lifted state, context, then a store.
3. Add an ADR explaining the choice.
4. Document the state lifecycle and failure modes.
5. Add tests for state transitions.

---

## 8. When to introduce persistence

Persistence is a separate decision from state management. It requires:

- a schema;
- validation;
- storage location;
- ownership and access rules;
- migration and deletion behaviour;
- error and offline handling;
- security review.

Read [ADR-0006](../architecture/adr/0006-static-content-no-persistence.md) and
[API reference](../features/api-reference.md).

---

## 9. State-related pitfalls

| Pitfall | Current behaviour | Guidance |
|---|---|---|
| Assuming tab state is shareable | It resets to `Button` on reload | Use URL state if shareable tabs are required |
| Timer not cleared on unmount | `setTimeout` may call `setCopied` after unmount | React ignores it in modern versions; still consider cleanup when adding effects |
| Clipboard permission denied | No visible error | Add a non-blocking message if UX requires it |
| Assuming global state exists | None does | Pass props or lift state |
| Storing secrets client-side | Not applicable; no secrets | Never add secrets to client state |

---

## 10. Related documents

- [Data flow](../architecture/data-flow.md)
- [Component architecture](../architecture/component-architecture.md)
- [Application workflows](application-workflows.md)
- [Frontend architecture](frontend-architecture.md)
- [Security and authentication](security-and-authentication.md)
