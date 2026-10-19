import { env } from "shared/config";
import { MovieType } from "../model/types";

export interface CatalogRoute {
  type: MovieType | "all";
  page: number;
  size: 12 | 24;
  q: string;
}

export const readCatalogRoute = (params: URLSearchParams): CatalogRoute => {
  const rawPage = params.get("page") ?? "1";
  const page = /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  const type = params.get("type");
  return {
    type: type === "movie" || type === "series" ? type : "all",
    page:
      Number.isSafeInteger(page) && page > 0 && page <= 2_147_483_647
        ? page
        : 1,
    size: params.get("size") === "24" ? 24 : 12,
    q: (params.get("q") ?? "").trim(),
  };
};

export const catalogParams = (route: CatalogRoute): URLSearchParams => {
  const params = new URLSearchParams();
  if (route.type !== "all") {
    params.set("type", route.type);
  }
  if (route.q) {
    params.set("q", route.q);
  }
  if (route.page !== 1) {
    params.set("page", String(route.page));
  }
  if (route.size !== 12) {
    params.set("size", String(route.size));
  }
  return params;
};

export const catalogUrl = (params: URLSearchParams): string => {
  const search = catalogParams(readCatalogRoute(params)).toString();
  return env.films.baseUrl + (search ? `?${search}` : "");
};

export const movieUrl = (title: string, params: URLSearchParams): string => {
  const search = catalogParams(readCatalogRoute(params)).toString();
  return `${env.films.baseUrl}/${encodeURIComponent(title)}${search ? `?${search}` : ""}`;
};
