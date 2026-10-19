# AGENTS.md

Guidance for working in this repository.

## Project

Movie library «Кавказский кинопоиск». UI text and code comments are in Russian.
Stack: React 19, TypeScript 6, Vite 8, React Router 8 in declarative mode, Ant Design 6, Sass, Zustand and TanStack Query. Requires Node.js 22.22+.

## Commands

- `npm run dev` / `npm start` — dev server at http://localhost:3000.
- `npm run build` — TypeScript check and production build into `build/`.
- `npm run typecheck` — TypeScript check only.
- `npm run lint` — ESLint and architecture boundary checks.
- `npm run lint:architecture` — layer/public API checks only.
- `npm test` — Vitest, Testing Library and MSW; no real backend writes.
- `npm run format:check` — check formatting of `src/`.
- `npm run preview` — serve the production build.

Use readable multiline JSX and SCSS, meaningful names and braces for control flow. Follow `.prettierrc.json`. Do not use `any`.

## Architecture

FSD dependency direction: `app → pages → widgets → features → entities → shared`. Layers may skip intermediate layers. Slices in the same layer cannot import each other. External consumers use the slice's `index.ts`; imports inside a slice are relative. Do not create a barrel for an entire layer.

- `app/` — providers, QueryClient, session integration, router, layout, theme and global styles.
- `pages/` — lazy route components and page-specific composition. Hero and MoviesList belong to the movies page.
- `widgets/` — composed header and footer.
- `features/` — auth, search-movies, edit-profile and manage-movie user scenarios.
- `entities/movie/` — movie DTOs, HTTP functions, query options/keys, catalog URL helpers and presentation components.
- `entities/user/` — user DTOs, current-user query, role normalization and session lifecycle.
- `shared/` — transport, runtime config, route constants, technical helpers and generic UI.

Path aliases for all six layers must stay in sync in `vite.config.ts` and `tsconfig.app.json`. Import rules are checked by `scripts/check-architecture.mjs`, including dynamic imports and re-exports. Shared API/config and UI components have explicit public entry points; technical helpers can be imported as individual modules.

MovieCard receives admin actions through props; it does not import features. PageState receives its text and action through props; pages own navigation. Keep page-specific UI local until another real consumer needs it.

## State and requests

- TanStack Query owns API data, loading/error status and cache. Query keys include all parameters that affect the response. Query functions pass `signal` to Axios.
- Zustand owns only the session phase and generation in `entities/user/model/sessionStore.ts`. Subscribe to specific fields. Never copy current-user or movie query results into Zustand.
- URL owns applied catalog search, type, page and size. Input draft, dialogs and trailer state stay local; forms use Ant Design Form.
- Mutation hooks in manage-movie cancel obsolete requests and invalidate movie data. Renaming a film invalidates the old title key. Removing the last item normalizes the page through the catalog query.
- Profile mutation preserves form values on failure, updates current-user cache on success and revalidates it. Do not reset fields after a failed save.

## HTTP and session

`shared/api` exports Axios and `getErrorMessage`. It must not import app, QueryClient or Zustand. `app/api/session.ts` installs the expired-session callback before requests start.

The request interceptor reads the `token` cookie. A 401 for a request that sent a token invokes the callback and retries at most once without Authorization, guarded by an explicit retry flag. A late 401 carrying an old token must not terminate a newer session.

The session generation changes before private queries are cancelled/removed on logout. Late responses cannot restore the previous user. Startup waits for session restoration before redirecting from the protected profile route. Login confirms authentication only after `/users/current` succeeds. No refresh-token API is assumed.

`CurrentUser` flattens role names and unique authorities from the backend DTO. Admin authority is `USER_ADMIN`; use `isUserAdmin`. Backend authorization remains mandatory for writes.

Use `getErrorMessage` for API errors. Get Ant Design notifications with `App.useApp()`, not the static message API.

## Runtime configuration and backend contract

- `public/config.js` sets `window._env_.api_url`; `index.html` loads it before the bundle. `shared/config/runtime.ts` reads it. Keep it runtime-configurable; do not move to `import.meta.env`.
- Route paths live in `shared/config/routes.ts` as `env.*.baseUrl`.
- Backend source, when available, is the sibling Spring Boot project `../filmapi`. Check DTOs there when changing API contracts.
- Many DTO fields are nullable. Preserve nullability and string movie years. Movie type is `movie | series`.
- Call `/movies` without a trailing slash. Use Axios `params` for URL encoding. Title search is a case-insensitive substring match; detail links require exact title matching on the client.
- Preserve existing title URLs and catalog return parameters; ID routes require a separate compatibility change.
- `PUT /movies/{id}` and `PUT /users/{id}` update sent, non-null fields.
- Parse/format comma-separated genres with helpers exported from `entities/movie`.

## Styling and verification

Page styles use CSS modules; shared/layout components use global BEM SCSS. Global theme/styles are in `app/styles/`; account form styles are in `shared/ui/account.scss`.

Tests are colocated, shared setup/fixtures are in `src/test/`. Use MSW to check network/session races without changing real accounts. Run typecheck, lint, tests and build for architecture changes. Visual checks at 390/768/1440 px remain necessary when browser access is available; report unavailable checks honestly.

The migration plan and verification notes are in `docs/architecture-migration.md`.
