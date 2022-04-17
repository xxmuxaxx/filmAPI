import { LockOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, Input, Row, Typography } from 'antd';
import { env } from 'core/helpers/environment';
import usersApi from 'core/modules/users/api/usersApi';
import { AuthenticationRequest } from 'core/modules/users/types/usersTypes';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Item } = Form;
const { Text, Title } = Typography;

const rules = {
  username: [
    {
      required: true,
      message: 'Обязательное поле!',
    },
  ],
  password: [
    {
      required: true,
      message: 'Обязательное поле!',
    },
    {
      min: 6,
      message: 'Пароль должен быть длиннее 6 символов',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Обязательное поле!',
    },
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }

        return Promise.reject(new Error('Пароли должны совпадать!'));
      },
    }),
  ],
};

const RegistrationForm = () => {
  const history = useHistory();
  const [registrationForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const onSubmit = async ({ username, password }: AuthenticationRequest) => {
    setIsFetching(true);
    try {
      const { status } = await usersApi.registerUser({ username, password });
      if (status === 201) history.push(env.login.baseUrl);
    } catch (error) {
      setRegistrationError(String(error));
    }
    setIsFetching(false);
  };

  return (
    <Form
      name="registration-form"
      form={registrationForm}
      size="large"
      onFinish={onSubmit}
    >
      <Title level={2}>{env.registration.title}</Title>
      <Item name="username" rules={rules.username}>
        <Input
          prefix={<UserOutlined />}
          placeholder="Ваш логин"
          autoComplete="username"
        />
      </Item>
      <Item name="password" rules={rules.password}>
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Ваш пароль"
          autoComplete="new-password"
        />
      </Item>
      <Item name="confirmPassword" rules={rules.confirmPassword}>
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Повторите пароль"
          autoComplete="new-password"
        />
      </Item>
      <Item>
        <Row align="middle" justify="space-between">
          <Button type="primary" htmlType="submit" loading={isFetching}>
            Регистрация
          </Button>
          <Text>
            Есть аккаунт?
            <Link to={env.login.baseUrl}> Авторизуйтесь!</Link>
          </Text>
        </Row>
        <Row>
          {registrationError && <Text type="danger">{registrationError}</Text>}
        </Row>
      </Item>
    </Form>
  );
};

export default RegistrationForm;
