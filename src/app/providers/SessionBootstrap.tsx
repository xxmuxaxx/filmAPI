import { useEffect } from "react";
import { useCurrentUser, useSessionStore, endSession } from "entities/user";
import { useQueryClient } from "@tanstack/react-query";

const SessionBootstrap = () => {
  const user = useCurrentUser();
  const client = useQueryClient();
  const generation = useSessionStore((state) => state.generation);
  const phase = useSessionStore((state) => state.phase);

  useEffect(() => {
    if (phase !== "restoring") {
      return;
    }
    if (user.isSuccess) {
      useSessionStore.getState().confirm(generation);
    }
    if (user.isError) {
      endSession(client);
    }
  }, [client, generation, phase, user.isSuccess, user.isError]);

  return null;
};
export default SessionBootstrap;
