# Interactive Studio on small screens

Open `/studio` to build and preview a local design system.

At widths up to 800px, use the **Library**, **Canvas**, and **Inspector** controls to switch views. Library retains Add, Layers, Tokens, and Palettes. Adding a component returns to Canvas. Inspector edits the selected component; Close returns to Canvas and restores keyboard focus to the Inspector control.

The canvas scrolls horizontally inside its own viewport so fixed-width component previews remain usable. The rest of the page fits the screen. Save and Export stay in the top bar. Save retains the workspace in this browser. Export opens a keyboard-contained dialog; Escape closes it and returns focus to Export.

Above 800px the three workspace columns remain visible together.

## Projects

**Projects** in the top bar lists every design system saved in this browser. From there you can create a project (empty canvas, default tokens), open, rename, duplicate, or delete one. Creating or switching saves the open project first; edits made since the last Save are otherwise lost on reload. Delete asks for confirmation, and deleting the last project leaves an empty one.

All projects live in the `atria:builder:projects` local storage entry. A workspace saved before projects existed becomes the first project; its old `atria:builder:*` entries are read but left in place.

## Verification

- Chromium checks passed at 320×900, 375×900, 430×900, and 1280×900.
- Checked all library tools, adding and editing a component, Save/reload, a real JSON download, dialog focus/escape, and page overflow.
- `npm test` covers panel controls, inspector dismissal/focus, saving an added component, and export keyboard behavior (Node 22 used locally).

| Viewport | Before | After |
| --- | --- | --- |
| 320×900 | [Before](../assets/studio-mobile/before-320.png) | [After](../assets/studio-mobile/after-320.png) |
| 375×900 | — | [After](../assets/studio-mobile/after-375.png) |
| 430×900 | — | [After](../assets/studio-mobile/after-430.png) |
| 1280×900 | [Before](../assets/studio-mobile/before-1280.png) | [After](../assets/studio-mobile/after-1280.png) |
