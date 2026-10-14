# Film Lib App

Учебный проект с библиотекой фильмов.

Стек: React 19, TypeScript, Vite, Ant Design 6, React Router 8, Redux + redux-thunk, Sass.

Требуется Node.js 22.22+.

## Скрипты

| Команда             | Описание                                                  |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Dev-сервер на [http://localhost:3000](http://localhost:3000) (`npm start` — то же самое) |
| `npm run build`     | Проверка типов и production-сборка в папку `build`        |
| `npm run preview`   | Локальный просмотр production-сборки                      |
| `npm run typecheck` | Только проверка типов                                     |
| `npm run lint`      | ESLint                                                    |

## Конфигурация

Адрес API задаётся во время выполнения в `public/config.js` (`window._env_.api_url`),
поэтому его можно подменить на сервере без пересборки.

Импорты вида `core/...`, `modules/...` и `config` — алиасы на `src/`, они настроены
в `vite.config.ts` и `tsconfig.app.json`.
