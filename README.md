# Munchies

A restaurant browser built for Umain's Work Test — browse restaurants, filter
by food category, delivery time, and price range, from either a desktop
sidebar or a mobile top bar.

**Live:** _add your deployed URL here_

## Stack

- SvelteKit + Svelte 5 (runes), TypeScript
- Tailwind CSS v4
- Vitest + `vitest-browser-svelte` (unit + component tests), Playwright (e2e)
- Prettier + ESLint

The app fetches restaurants, filters, and price ranges from the
[Munchies API](https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api-docs/)
at build time (`src/routes/+page.ts`, prerendered) and ships as a fully
static site — there's no server-side runtime.

## Setup

Requires Node.js and npm.

```sh
npm install
```

## Developing

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

```sh
npm run build
```

This prerenders the app against the live API, so an internet connection is
required at build time. Preview the production build with:

```sh
npm run preview
```

## Testing

```sh
npm run test:unit    # unit + component tests (Vitest)
npm run test:e2e     # end-to-end tests (Playwright)
npm run test         # both
```

## Linting & formatting

```sh
npm run lint     # prettier --check + eslint
npm run format   # prettier --write
```

## Project structure

- `src/lib/features/api/` — the API client (one function per endpoint,
  runtime response-shape validation)
- `src/lib/features/domain/` — pure filtering logic and the reactive
  filter-selection state, both framework-independent and unit-tested
- `src/lib/components/` — presentational Svelte components (filter chips,
  category cards, restaurant cards/list, empty/error states, the mobile
  welcome overlay)
- `src/routes/` — the single page: loads data at build time and renders the
  restaurant browser
