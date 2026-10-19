import { userFixture } from "../test/fixtures";
import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import { queryClient } from "./providers/queryClient";
import { useSessionStore } from "entities/user";
import { deleteCookie, setCookie } from "shared/lib/cookie";

const server = setupServer(
  http.get("http://localhost:8082/api/v1/movies", () =>
    HttpResponse.json({ search: [], totalResults: 0 })
  )
);
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
  deleteCookie("token");
  useSessionStore.getState().end();
});

it("прямая ссылка поиска показывает пустое состояние и сбрасывает запрос", async () => {
  window.history.replaceState(null, "", "/films?q=неизвестный");
  render(<App />);
  expect(
    await screen.findByRole("heading", { name: "Ничего не нашлось" })
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Сбросить поиск" }));
  await waitFor(() => expect(window.location.search).toBe(""));
  expect(
    await screen.findByRole("heading", { name: "Фильмы пока за кадром" })
  ).toBeInTheDocument();
});

it("неизвестный маршрут показывает самостоятельную 404", async () => {
  window.history.replaceState(null, "", "/неизвестная-страница");
  render(<App />);
  expect(
    await screen.findByRole("heading", { name: "Эта страница за кадром" })
  ).toBeInTheDocument();
  expect(window.location.pathname).not.toBe("/films");
});

it("гость переходит из профиля на вход, форма проверяет обязательные поля", async () => {
  useSessionStore.getState().end();
  window.history.replaceState(null, "", "/profile");
  render(<App />);
  expect(
    await screen.findByRole("heading", { name: "С возвращением" })
  ).toBeInTheDocument();
  expect(window.location.pathname).toBe("/login");
  fireEvent.click(screen.getByRole("button", { name: "Войти" }));
  expect(await screen.findByText("Введите логин")).toBeInTheDocument();
  expect(await screen.findByText("Введите пароль")).toBeInTheDocument();
});

it("профиль обычного пользователя скрывает админские действия и сохраняет поля при ошибке", async () => {
  setCookie("token", "valid");
  useSessionStore.getState().begin();
  server.use(
    http.get("http://localhost:8082/api/v1/users/current", () =>
      HttpResponse.json(userFixture)
    ),
    http.put("http://localhost:8082/api/v1/users/1", () =>
      HttpResponse.json({ message: "Не удалось сохранить" }, { status: 400 })
    )
  );
  window.history.replaceState(null, "", "/profile");
  render(<App />);
  expect(
    await screen.findByRole("heading", { name: "Мой профиль" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Добавить фильм" })
  ).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Редактировать профиль" })
  );
  const name = await screen.findByLabelText("Имя");
  fireEvent.change(name, { target: { value: "Новое имя" } });
  fireEvent.click(screen.getByRole("button", { name: "Сохранить" }));
  expect(await screen.findByText("Не удалось сохранить")).toBeInTheDocument();
  expect(name).toHaveValue("Новое имя");
});
