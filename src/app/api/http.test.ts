import { useSessionStore } from "entities/user";
import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import "app/api/session";
import { api } from "shared/api";
import { deleteCookie, setCookie } from "shared/lib/cookie";

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  deleteCookie("token");
});

it("повторяет публичный запрос без истёкшего токена", async () => {
  const authorizations: (string | null)[] = [];
  setCookie("token", "expired");
  server.use(
    http.get("http://localhost:8082/api/v1/movies", ({ request }) => {
      const token = request.headers.get("Authorization");
      authorizations.push(token);
      return token
        ? new HttpResponse(null, { status: 401 })
        : HttpResponse.json({ search: [] });
    })
  );
  await expect(api.get("/movies")).resolves.toMatchObject({
    data: { search: [] },
  });
  expect(authorizations).toEqual(["Bearer expired", null]);
});

it("не повторяет анонимный 401 бесконечно", async () => {
  let requests = 0;
  server.use(
    http.get("http://localhost:8082/api/v1/movies", () => {
      requests++;
      return new HttpResponse(null, { status: 401 });
    })
  );
  await expect(api.get("/movies")).rejects.toMatchObject({
    response: { status: 401 },
  });
  expect(requests).toBe(1);
});

it("параллельные 401 завершают одну сессию один раз", async () => {
  setCookie("token", "expired");
  const generation = useSessionStore.getState().generation;
  server.use(
    http.get("http://localhost:8082/api/v1/movies", async ({ request }) => {
      if (!request.headers.get("Authorization")) {
        return HttpResponse.json({ search: [] });
      }
      await delay(20);
      return new HttpResponse(null, { status: 401 });
    })
  );
  await Promise.all([api.get("/movies"), api.get("/movies")]);
  expect(useSessionStore.getState().generation).toBe(generation + 1);
});

it("401 старого запроса не завершает новую сессию", async () => {
  setCookie("token", "old");
  const generation = useSessionStore.getState().generation;
  server.use(
    http.get("http://localhost:8082/api/v1/movies", async ({ request }) => {
      if (request.headers.get("Authorization") === "Bearer old") {
        setCookie("token", "new");
        return new HttpResponse(null, { status: 401 });
      }
      return HttpResponse.json({ search: [] });
    })
  );
  await api.get("/movies");
  expect(useSessionStore.getState().generation).toBe(generation);
});
