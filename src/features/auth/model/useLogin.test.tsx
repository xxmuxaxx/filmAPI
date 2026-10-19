import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { useSessionStore, endSession } from "entities/user";
import { getCookie, deleteCookie } from "shared/lib/cookie";
import { userFixture } from "../../../test/fixtures";
import { useLogin } from "./useLogin";
import type { ReactNode } from "react";

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  deleteCookie("token");
  useSessionStore.getState().end();
});

it("подтверждает вход только после получения текущего пользователя", async () => {
  const client = new QueryClient();
  let currentRequested = false;
  let releaseCurrent!: () => void;
  const currentResponse = new Promise<void>((resolve) => {
    releaseCurrent = resolve;
  });
  server.use(
    http.post("http://localhost:8082/api/v1/auth/login", () =>
      HttpResponse.json({ token: "valid", username: "kinoman" })
    ),
    http.get("http://localhost:8082/api/v1/users/current", async () => {
      currentRequested = true;
      await currentResponse;
      return HttpResponse.json(userFixture);
    })
  );
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const hook = renderHook(useLogin, { wrapper });
  let request!: Promise<unknown>;
  act(() => {
    request = hook.result.current.mutateAsync({
      username: "kinoman",
      password: "test-password",
    });
  });
  await waitFor(() => expect(currentRequested).toBe(true));
  expect(useSessionStore.getState().phase).not.toBe("authenticated");
  await act(async () => {
    releaseCurrent();
    await request;
  });
  expect(useSessionStore.getState().phase).toBe("authenticated");
  expect(getCookie("token")).toBe("valid");
  client.clear();
});

it("поздний ответ входа после выхода не записывает токен", async () => {
  const client = new QueryClient();
  let requested = false;
  let releaseLogin!: () => void;
  const loginResponse = new Promise<void>((resolve) => {
    releaseLogin = resolve;
  });
  server.use(
    http.post("http://localhost:8082/api/v1/auth/login", async () => {
      requested = true;
      await loginResponse;
      return HttpResponse.json({ token: "late", username: "kinoman" });
    })
  );
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const hook = renderHook(useLogin, { wrapper });
  let request!: Promise<unknown>;
  act(() => {
    request = hook.result.current.mutateAsync({
      username: "kinoman",
      password: "test-password",
    });
  });
  const rejection = expect(request).rejects.toThrow("Вход отменён");
  await waitFor(() => expect(requested).toBe(true));
  act(() => endSession(client));
  releaseLogin();
  await act(async () => {
    await rejection;
  });
  expect(getCookie("token")).toBeUndefined();
  expect(useSessionStore.getState().phase).toBe("guest");
  client.clear();
});
