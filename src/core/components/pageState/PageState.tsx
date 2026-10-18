import { Button } from "antd";
import { env } from "core/helpers/environment";
import { useNavigate } from "react-router";
import "./pageState.scss";

type Props = {
  title?: string;
  description?: string;
  code?: string;
  backUrl?: string;
};
const PageState = ({
  title = "Эта страница за кадром",
  description = "Проверьте адрес или вернитесь к нашей коллекции фильмов.",
  code = "404",
  backUrl = env.films.baseUrl,
}: Props) => {
  const navigate = useNavigate();

  return (
    <section className="page-state" aria-labelledby="page-state-title">
      <span className="page-state__code">{code}</span>
      <h1 id="page-state-title">{title}</h1>
      <p>{description}</p>
      <Button type="primary" onClick={() => navigate(backUrl)}>
        Вернуться в каталог
      </Button>
    </section>
  );
};

export default PageState;
