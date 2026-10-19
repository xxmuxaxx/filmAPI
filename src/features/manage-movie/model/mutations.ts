import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import {
  movieApi,
  movieKeys,
  type Movie,
  type MovieForm,
} from "entities/movie";

export const refreshMovies = async (client: QueryClient) => {
  // Отменяем старые ответы перед обновлением, чтобы они не вернули удалённые данные.
  await client.cancelQueries({ queryKey: movieKeys.all });
  client.removeQueries({ queryKey: ["movies", "detail"], type: "inactive" });
  client.removeQueries({ queryKey: ["movies", "id"], type: "inactive" });
  await client.invalidateQueries({ queryKey: movieKeys.all });
};

export const useCreateMovie = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (body: MovieForm) => movieApi.createMovie(body),
    onSuccess: () => refreshMovies(client),
  });
};

export const useUpdateMovie = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<MovieForm> }) =>
      movieApi.updateMovie(id, body),
    onSuccess: () => refreshMovies(client),
  });
};

export const useDeleteMovie = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => movieApi.deleteMovie(id),
    onSuccess: async (_, id) => {
      await client.cancelQueries({ queryKey: movieKeys.all });
      client.setQueriesData<Movie | null>(
        { queryKey: ["movies", "detail"] },
        (previous) => (previous?.id === id ? null : previous)
      );
      await refreshMovies(client);
    },
  });
};
