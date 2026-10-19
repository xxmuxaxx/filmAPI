import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  movieQuery,
  catalogQuery,
  movieKeys,
  type Movie,
} from "entities/movie";
import { useUpdateMovie, useDeleteMovie } from "./mutations";
import type { ReactNode } from "react";

let film: Movie | null;
const server = setupServer(
  http.get("http://localhost:8082/api/v1/movies", ({ request }) => {
    const title = new URL(request.url).searchParams.get("title");
    const items = film && (!title || title === film.title) ? [film] : [];
    return HttpResponse.json({ search: items, totalResults: items.length });
  }),
  http.put("http://localhost:8082/api/v1/movies/1", async ({ request }) => {
    const body = await request.json();
    if (film) {
      film = { ...film, ...(body as Partial<Movie>) };
    }
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete("http://localhost:8082/api/v1/movies/1", () => {
    film = null;
    return new HttpResponse(null, { status: 204 });
  })
);
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("переименование инвалидирует старое название, удаление обновляет каталог и страницу", async () => {
  film = {
    id: 1,
    title: "Старое название",
    titleEn: null,
    year: null,
    type: "movie",
    poster: null,
    description: null,
    country: null,
    video: null,
    imdbID: null,
    genres: [],
  };
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const hooks = renderHook(
    () => ({ update: useUpdateMovie(), remove: useDeleteMovie() }),
    { wrapper }
  );
  await client.fetchQuery(movieQuery("Старое название"));
  client.setQueryData(movieKeys.suggestions("Старое"), [film]);
  await act(async () => {
    await hooks.result.current.update.mutateAsync({
      id: 1,
      body: { title: "Новое название" },
    });
  });
  expect(await client.fetchQuery(movieQuery("Старое название"))).toBeNull();
  expect(await client.fetchQuery(movieQuery("Новое название"))).toMatchObject({
    title: "Новое название",
  });
  expect(
    client.getQueryState(movieKeys.suggestions("Старое"))?.isInvalidated
  ).toBe(true);
  await act(async () => {
    await hooks.result.current.remove.mutateAsync(1);
  });
  expect(await client.fetchQuery(movieQuery("Новое название"))).toBeNull();
  expect(
    await client.fetchQuery(
      catalogQuery({ type: "movie", q: "", page: 2, size: 12 })
    )
  ).toEqual({ items: [], totalItems: 0, page: 1 });
  client.clear();
});
