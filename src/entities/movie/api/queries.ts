import { queryOptions } from "@tanstack/react-query";
import movieApi from "./movieApi";
import type { CatalogRoute } from "../lib/catalogRouting";

export const movieKeys = {
  all: ["movies"] as const,
  catalog: (route: CatalogRoute) => ["movies", "catalog", route] as const,
  detail: (title: string) => ["movies", "detail", title] as const,
  byId: (id: number | string) => ["movies", "id", id] as const,
  suggestions: (query: string) => ["movies", "suggestions", query] as const,
};

const fetchCatalog = async (route: CatalogRoute, signal: AbortSignal) => {
  let page = route.page;
  if (route.type !== "all" || route.q) {
    const movies = route.q
      ? await movieApi.searchMoviesByTitle(route.q, signal)
      : (await movieApi.getAllMovies(signal)).search;
    const filtered = movies.filter(
      (movie) => route.type === "all" || movie.type === route.type
    );
    const totalItems = filtered.length;
    page = Math.min(page, Math.max(1, Math.ceil(totalItems / route.size)));
    return {
      items: filtered.slice((page - 1) * route.size, page * route.size),
      totalItems,
      page,
    };
  }
  let result = await movieApi.getMoviesPage(page, route.size, signal);
  page = Math.min(
    page,
    Math.max(1, Math.ceil(result.totalResults / route.size))
  );
  if (page !== route.page) {
    result = await movieApi.getMoviesPage(page, route.size, signal);
  }
  return { items: result.search, totalItems: result.totalResults, page };
};

export const catalogQuery = (route: CatalogRoute) =>
  queryOptions({
    queryKey: movieKeys.catalog(route),
    queryFn: ({ signal }) => fetchCatalog(route, signal),
  });

export const movieQuery = (title: string) =>
  queryOptions({
    queryKey: movieKeys.detail(title),
    queryFn: async ({ signal }) => {
      const movies = await movieApi.searchMoviesByTitle(title, signal);
      return (
        movies.find(
          (movie) => movie.title.toLowerCase() === title.toLowerCase()
        ) ?? null
      );
    },
  });

export const movieByIdQuery = (id: number | string) =>
  queryOptions({
    queryKey: movieKeys.byId(id),
    queryFn: ({ signal }) => movieApi.getMovieById(id, signal),
    enabled: Boolean(id),
  });

export const movieSuggestionsQuery = (query: string) =>
  queryOptions({
    queryKey: movieKeys.suggestions(query),
    queryFn: ({ signal }) =>
      movieApi.searchMoviesPageable(query, 10, 1, signal),
    enabled: Boolean(query),
  });
