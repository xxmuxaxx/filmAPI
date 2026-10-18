import { Alert, Button, Form, Input } from "antd";
import { env } from "core/helpers/environment";
import { useActions } from "core/hooks/useActions";
import {
  selectError,
  selectIsFetching,
} from "core/modules/users/selectors/usersSelectors";
import type { AuthenticationRequest } from "core/modules/users/types/usersTypes";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router";

const Login = () => {
  const { fetchAuth } = useActions();
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);
  const [params] = useSearchParams();
  const isRegistrationComplete = params.get("registered") === "1";

  const handleSubmit = (values: AuthenticationRequest) => {
    if (!isFetching) {
      fetchAuth(values);
    }
  };

  return (
    <Form<AuthenticationRequest>
      name="auth-form"
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmit}
      className="account-form"
    >
      <div className="account-form__intro">
        <h1>С возвращением</h1>
        <p>Войдите, чтобы управлять своим профилем.</p>
      </div>
      {isRegistrationComplete && (
        <Alert
          type="success"
          title="Аккаунт создан. Войдите с вашим логином и паролем."
          showIcon
        />
      )}
      {error && <Alert type="error" title={error} showIcon role="alert" />}
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, whitespace: true, message: "Введите логин" }]}
      >
        <Input
          placeholder="Ваш логин"
          autoComplete="username"
          disabled={isFetching}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password
          placeholder="Ваш пароль"
          autoComplete="current-password"
          disabled={isFetching}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isFetching} block>
        {isFetching ? "Входим…" : "Войти"}
      </Button>
      <p className="account-form__footer">
        Нет аккаунта?{" "}
        <Link to={env.registration.baseUrl}>Зарегистрироваться</Link>
      </p>
    </Form>
  );
};

export default Login;
