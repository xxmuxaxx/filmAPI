import { describe, expect, it } from "vitest";
import {
  catalogParams,
  catalogUrl,
  movieUrl,
  readCatalogRoute,
} from "./catalogRouting";

describe("Состояние каталога в URL", () => {
  it("нормализует некорректные параметры", () => {
    expect(
      readCatalogRoute(
        new URLSearchParams("page=-2&size=7&type=unknown&q=%20кино%20")
      )
    ).toEqual({ page: 1, size: 12, type: "all", q: "кино" });
  });
  it("сохраняет фильтр, запрос, страницу и размер при возврате из фильма", () => {
    const params = new URLSearchParams("type=series&q=House&page=2&size=24");
    expect(catalogUrl(params)).toBe(
      "/films?type=series&q=House&page=2&size=24"
    );
    expect(movieUrl("Доктор Хаус", params)).toContain(
      "?type=series&q=House&page=2&size=24"
    );
    expect(readCatalogRoute(catalogParams(readCatalogRoute(params)))).toEqual(
      readCatalogRoute(params)
    );
  });
  it("не включает значения по умолчанию", () => {
    expect(
      catalogParams(readCatalogRoute(new URLSearchParams())).toString()
    ).toBe("");
  });
});
