import { Alert, Button, Form, Input } from "antd";
import { env } from "shared/config";
import { getErrorMessage } from "shared/api";
import { userApi } from "entities/user";
import { useMutation } from "@tanstack/react-query";
import type { AuthenticationRequest } from "entities/user";
import { Link, useNavigate } from "react-router";

type RegistrationValues = AuthenticationRequest & { confirmPassword: string };

const RegistrationForm = () => {
  const navigate = useNavigate();
  const registration = useMutation({
    mutationFn: ({ username, password }: RegistrationValues) =>
      userApi.register({ username, password }),
    onSuccess: () =>
      navigate(`${env.login.baseUrl}?registered=1`, { replace: true }),
  });
  const isFetching = registration.isPending;
  const error = registration.error
    ? getErrorMessage(registration.error)
    : undefined;
  const onSubmit = (values: RegistrationValues) => {
    if (!isFetching) {
      registration.mutate(values);
    }
  };

  return (
    <Form<RegistrationValues>
      name="registration-form"
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
      className="account-form"
    >
      <div className="account-form__intro">
        <h1>Регистрация</h1>
        <p>Создайте аккаунт в нашей кинотеке.</p>
      </div>
      {error && <Alert type="error" title={error} showIcon role="alert" />}
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, whitespace: true, message: "Введите логин" }]}
      >
        <Input
          placeholder="Придумайте логин"
          autoComplete="username"
          disabled={isFetching}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        extra="Не менее 6 символов"
        rules={[
          { required: true, message: "Введите пароль" },
          { min: 6, message: "Не менее 6 символов" },
        ]}
      >
        <Input.Password
          placeholder="Придумайте пароль"
          autoComplete="new-password"
          disabled={isFetching}
        />
      </Form.Item>
      <Form.Item
        label="Повторите пароль"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Повторите пароль" },
          ({ getFieldValue }) => ({
            validator(_, value: string | undefined) {
              if (!value || value === getFieldValue("password")) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Пароли должны совпадать"));
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Повторите пароль"
          autoComplete="new-password"
          disabled={isFetching}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isFetching} block>
        {isFetching ? "Создаём аккаунт…" : "Зарегистрироваться"}
      </Button>
      <p className="account-form__footer">
        Уже есть аккаунт? <Link to={env.login.baseUrl}>Войти</Link>
      </p>
    </Form>
  );
};

export default RegistrationForm;
