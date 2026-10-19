import { Button } from "antd";
import "./pageState.scss";

type PageStateProps = {
  title: string;
  description: string;
  code: string;
  actionLabel: string;
  onAction: () => void;
};

const PageState = ({
  title,
  description,
  code,
  actionLabel,
  onAction,
}: PageStateProps) => (
  <section className="page-state" aria-labelledby="page-state-title">
    <span className="page-state__code">{code}</span>
    <h1 id="page-state-title">{title}</h1>
    <p>{description}</p>
    <Button type="primary" onClick={onAction}>
      {actionLabel}
    </Button>
  </section>
);
export default PageState;
