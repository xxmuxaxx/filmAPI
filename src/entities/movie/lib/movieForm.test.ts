import { expect, it } from "vitest";
import { formatGenres, parseGenres } from "./movieForm";

it("преобразует жанры и допускает отсутствующие значения", () => {
  expect(parseGenres(" драма, , комедия ")).toEqual([
    { name: "драма" },
    { name: "комедия" },
  ]);
  expect(parseGenres(null)).toEqual([]);
  expect(formatGenres(null)).toBe("");
  expect(formatGenres(parseGenres("драма, комедия"))).toBe("драма, комедия");
});
