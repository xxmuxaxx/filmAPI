import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { QueryClient } from "@tanstack/react-query";
import { catalogQuery, movieQuery } from "./queries";
import type { Movie } from "../model/types";

const film: Movie = {
  id: 1,
  title: "Хаус",
  titleEn: null,
  year: null,
  type: "series",
  poster: null,
  description: null,
  country: null,
  video: null,
  imdbID: null,
  genres: [],
};
const server = setupServer(
  http.get("http://localhost:8082/api/v1/movies", () =>
    HttpResponse.json({ search: [film], totalResults: 1 })
  )
);
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("корректирует страницу фильтрованного каталога и сохраняет nullable поля", async () => {
  const client = new QueryClient();
  const result = await client.fetchQuery(
    catalogQuery({ type: "series", page: 99, size: 12, q: "" })
  );
  expect(result).toEqual({ items: [film], page: 1, totalItems: 1 });
  client.clear();
});

it("не открывает первое частичное совпадение вместо запрошенного фильма", async () => {
  const client = new QueryClient();
  expect(await client.fetchQuery(movieQuery("Ха"))).toBeNull();
  expect(await client.fetchQuery(movieQuery("хаус"))).toEqual(film);
  client.clear();
});
