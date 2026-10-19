import { useNavigate } from "react-router";
import { PageState } from "shared/ui/pageState";
import { env } from "shared/config";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <PageState
      code="404"
      title="Эта страница за кадром"
      description="Проверьте адрес или вернитесь к нашей коллекции фильмов."
      actionLabel="Вернуться в каталог"
      onAction={() => navigate(env.films.baseUrl)}
    />
  );
};
