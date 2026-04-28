# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern Bootstrap 5 Admin Dashboard Template (v3.4.0) using Vite, Alpine.js, and SCSS.

| Directory | Purpose |
|-----------|---------|
| `src-modern/` | Source files (Bootstrap 5.3.8, ES6+ modules) |
| `dist-modern/` | Production build output |
| `src/`, `dist/` | Legacy Bootstrap 3 code - **do not use** |

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
npm run format   # Prettier format
```

## Key Files

| File | Purpose |
|------|---------|
| `src-modern/scripts/main.js` | App entry point, initializes AdminApp class |
| `src-modern/styles/scss/main.scss` | SCSS entry point |
| `vite.config.js` | Build config with multi-page entries |
| `eslint.config.js` | ESLint v10 flat config |
| `src-modern/scripts/utils/search-component.js` | Factory for the navbar search Alpine component |
| `src-modern/scripts/utils/constants.js` | Shared timing/breakpoint constants |
| `src-modern/styles/scss/components/_a11y.scss` | Skip-link, reduced-motion, sr-only helpers |
| `src-modern/styles/scss/components/_bootstrap-icons-subset.scss` | Generated icon CSS (only the ~158 used) |

## Architecture Quick Reference

**Page Detection**: Each HTML page needs `data-page="pagename"` on `<body>` to load correct component.

**Component Loading**: Dynamic imports in `main.js` based on page:

```javascript
case 'users':
  await import('./components/users.js');
  break;
```

**Alpine.js Pattern**: Components register via `Alpine.data()`:

```javascript
Alpine.data('componentName', () => ({
  init() { /* setup */ },
  // methods and state
}));
```

## Adding a New Page

1. Create `src-modern/newpage.html` with `data-page="newpage"` on body
2. Add entry to `vite.config.js` → `rollupOptions.input`
3. Create `src-modern/scripts/components/newpage.js`
4. Add case to `initPageComponents()` in `main.js`
5. Optional: Create `src-modern/styles/scss/pages/_newpage.scss` and import in `main.scss`

## Dependencies

- **UI**: Bootstrap 5.3.8, Bootstrap Icons 1.13.1 (subset, see below)
- **Reactive**: Alpine.js 3.15.11
- **Charts**: ApexCharts 5.10.6 (single chart library — Chart.js was removed in v3.4.0)
- **Notifications**: SweetAlert2 11.26.24
- **Build**: Vite 8.0 (rolldown), Sass 1.99

## Conventions

- **One charting library.** Use ApexCharts. ApexCharts requires a `<div>` container — not `<canvas>`.
- **No `innerHTML` with interpolation.** Use `createElement` + `textContent`. Toast `action` callbacks must be functions, not strings.
- **Search inputs** use the shared factory: `Alpine.data('searchComponent', createSearchComponent({ getResults }))`. Don't paste fresh definitions per page.
- **Component cleanup.** Anything that calls `setInterval` / `setTimeout` / `addEventListener` should track the IDs and clean up in `destroy()` (called via `pagehide`).
- **Bootstrap Icons subset.** When adding an icon used in markup that wasn't in the subset, regenerate `_bootstrap-icons-subset.scss` (script in CHANGELOG 3.4.0 entry / see node script below) so the icon's `content: "\..."` rule exists.

## Documentation

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed architecture, patterns, and styling guide.
