import { Alert, Button, Form, Input } from "antd";
import { env } from "core/helpers/environment";
import { getErrorMessage } from "core/http";
import usersApi from "core/modules/users/api/usersApi";
import type { AuthenticationRequest } from "core/modules/users/types/usersTypes";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

type RegistrationValues = AuthenticationRequest & { confirmPassword: string };

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async ({ username, password }: RegistrationValues) => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);
    setError("");

    try {
      await usersApi.registerUser({ username, password });
      navigate(`${env.login.baseUrl}?registered=1`, { replace: true });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsFetching(false);
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
