import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import {
  useCurrentUser,
  useSessionStore,
  endSession,
  currentUserQuery,
  isUserAdmin,
} from "entities/user";
import type { User } from "entities/user";
import { setCookie, deleteCookie } from "shared/lib/cookie";
import SessionBootstrap from "./SessionBootstrap";

const user: User = {
  id: 1,
  username: "kinoman",
  name: null,
  lastName: null,
  middleName: null,
  email: null,
  gender: null,
  theme: null,
  avatarFilename: null,
  blocked: false,
  dateCreated: "",
  roles: [
    {
      id: 1,
      name: "admin",
      description: "",
      rolePermissions: [
        { id: 1, authority: "USER_ADMIN", authorityDescription: "" },
      ],
    },
  ],
};
const server = setupServer();
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  deleteCookie("token");
  useSessionStore.getState().end();
});

const SessionView = () => {
  const phase = useSessionStore((state) => state.phase);
  const current = useCurrentUser();
  return (
    <div>
      {phase === "restoring"
        ? "Восстановление"
        : (current.data?.username ?? "Гость")}
    </div>
  );
};

it("восстанавливает сессию до отображения профиля и преобразует права", async () => {
  setCookie("token", "valid");
  useSessionStore.getState().begin();
  const client = new QueryClient();
  server.use(
    http.get("http://localhost:8082/api/v1/users/current", async () => {
      await delay(30);
      return HttpResponse.json(user);
    })
  );
  render(
    <QueryClientProvider client={client}>
      <SessionBootstrap />
      <SessionView />
    </QueryClientProvider>
  );
  expect(screen.getByText("Восстановление")).toBeInTheDocument();
  expect(await screen.findByText("kinoman")).toBeInTheDocument();
  const data = client.getQueryData(
    currentUserQuery(useSessionStore.getState().generation).queryKey
  );
  expect(isUserAdmin(data)).toBe(true);
  expect(data?.name).toBeNull();
  client.clear();
});

it("запоздалый ответ после выхода не восстанавливает пользователя", async () => {
  setCookie("token", "valid");
  const generation = useSessionStore.getState().begin();
  const client = new QueryClient();
  let started = false;
  let releaseCurrent!: () => void;
  const responseGate = new Promise<void>((resolve) => {
    releaseCurrent = resolve;
  });
  server.use(
    http.get("http://localhost:8082/api/v1/users/current", async () => {
      started = true;
      await responseGate;
      return HttpResponse.json(user);
    })
  );
  const request = client.fetchQuery(currentUserQuery(generation));
  const rejection = expect(request).rejects.toBeDefined();
  await waitFor(() => expect(started).toBe(true));
  endSession(client);
  releaseCurrent();
  await rejection;
  expect(useSessionStore.getState().phase).toBe("guest");
  expect(
    client.getQueryData(currentUserQuery(generation).queryKey)
  ).toBeUndefined();
  client.clear();
});

it("ошибка восстановления переводит сессию в гостевую", async () => {
  setCookie("token", "expired");
  useSessionStore.getState().begin();
  const client = new QueryClient();
  server.use(
    http.get(
      "http://localhost:8082/api/v1/users/current",
      () => new HttpResponse(null, { status: 401 })
    )
  );
  render(
    <QueryClientProvider client={client}>
      <SessionBootstrap />
      <SessionView />
    </QueryClientProvider>
  );
  expect(await screen.findByText("Гость")).toBeInTheDocument();
  client.clear();
});
