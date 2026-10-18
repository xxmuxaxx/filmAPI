# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project

Frontend for a learning project — a movie library ("Film Lib App"). UI text and code comments are in Russian. Stack: React 19, TypeScript 6, Vite 8, Ant Design 6, React Router 8 (declarative mode), plain Redux + redux-thunk, Sass. Requires Node.js 22.22+.

## Commands

- `npm run dev` (or `npm start`) — dev server on http://localhost:3000
- `npm run build` — `tsc -b` type check, then `vite build` into `build/`
- `npm run typecheck` — type check only
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run preview` — serve the production build

There is no test runner and there are no tests.

## Configuration

- The API base URL is set at **runtime**, not build time: `public/config.js` sets `window._env_.api_url`. `index.html` loads it before the app bundle. `src/config.ts` reads it, and its type is declared in `src/vite-env.d.ts`. Don't move it to `import.meta.env`, because the point is to change it on the server without rebuilding.
- Non-relative imports `core/...`, `modules/...` and `config` are path aliases to `src/`. They are defined twice and must stay in sync: `resolve.alias` in `vite.config.ts` and `paths` in `tsconfig.app.json` (there is no `baseUrl`).
- `@typescript-eslint/no-explicit-any` is an error. Don't use `any`.

## Architecture

There are two top-level source areas:

- `src/core/` — app shell and shared code: store setup, routing, HTTP client, helpers, shared components, plus the domain modules (`core/modules/movie`, `core/modules/users`) that own state and API calls. `core/modules/app` holds the `App` root and the layout (header with search, footer).
- `src/modules/` — route-level pages (`movies`, `movie`, `login`, `registration`, `profile`). Each page is lazy-loaded in `core/routing/AppRouting.tsx`. Route paths and page titles live in `core/helpers/environment.ts` (`env`), so use `env.*.baseUrl` instead of hard-coded paths.

### State (Redux, no Toolkit)

- `core/configureStore.ts` uses `legacy_createStore` with the thunk middleware and devtools. `core/coreReducers.ts` combines the `movie` and `users` slices and exports `RootState`.
- Each domain module under `core/modules/<domain>/` has the same layout: `actions/`, `api/`, `reducers/`, `selectors/`, `types/` (and `movie` also has `components/` for its add/edit/delete forms).
- Each reducer file defines a string `enum` of action types, a state interface and a discriminated union of actions. The action creators in `actions/` are a mix of plain action creators and thunks typed with `Dispatch<...Action>`.
- Components get actions through the `useActions()` hook (`core/hooks/useActions.ts`). It merges **all** action creators from `movieActions` and `usersActions` into one object bound with `bindActionCreators`, so an action name must be unique across both modules. Components read state through the selectors and `useSelector`.
- The current user is stored as `CurrentUser`: the user fetched from `/users/current`, with `roles` reduced to role names and `rolePermissions` reduced to a flat list of authorities. A user is an admin if `rolePermissions` contains `USER_ADMIN` (`selectCurrentUserIsAdmin`).

### HTTP and auth

- `core/http/index.ts` exports a shared axios instance (`api`) with `baseURL` set to the runtime API URL. A request interceptor adds `Authorization: Bearer <token>` from the `token` cookie.
- The backend answers 401 to **any** request carrying an expired token, public ones included. A response interceptor in the same file handles this: on a 401 for a request that sent a token, it deletes the cookie, clears the current user and retries the request without the token.
- Show API errors with `getErrorMessage(error)` from `core/http`. It returns `message` from the backend's `ErrorMessage` (or a plain-text body) instead of the generic Axios text.
- On login, `fetchAuth` stores the token in that cookie and then dispatches `fetchCurrentUser`. On startup, `App` calls `fetchCurrentUser` if the cookie exists. If that call fails, the cookie is deleted. `logout` deletes the cookie and clears the user.
- The login and profile pages redirect each other based on whether `currentUser` is set.

### UI conventions

- The antd `ConfigProvider` (locale `ru_RU`) and antd `<App>` wrap the app. In components, get notifications from `App.useApp()` (`const { message } = App.useApp()`), not from the static `message` import.
- Styles: page-level styles use CSS modules (`*.module.scss`, imported as `classes`). Shared and layout components use global BEM-style SCSS imported for its side effects (`import './header.scss'`). Global styles and the `.container` class are in `core/modules/app/App.scss`.
### Backend contract

The backend is the Spring Boot project in the sibling folder `../filmapi`. The types in `core/modules/*/types` follow its DTOs (`MovieItem`, `MoviesPageDTO`, `UserDTO`, `UserBaseForm`), so check them there when changing API code.

- Most DTO fields can be `null` (for example the user's name, email and gender, or a movie's poster, year and type), and the types say so.
- Call `/movies` without a trailing slash. The backend's anonymous whitelist is an exact match on `/api/v1/movies`. Pass query values through axios `params` so they are URL-encoded.
- `GET /movies?title=` matches a substring, case-insensitively.
- `PUT /movies/{id}` and `PUT /users/{id}` change only the fields that are sent and not `null`.
- A movie's `year` is a string. Its `type` is the enum `movie | series`, and the forms pick it from a `Select`.
- Forms enter genres as a comma-separated string. Convert them with `parseGenres` and `formatGenres` from `core/modules/movie/helpers/movieForm.ts`; the backend creates any genre name it doesn't know yet.
