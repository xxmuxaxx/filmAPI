import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import { Form, Input, Button, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import usersApi from '../../../api/usersApi';
import { env } from '../../../services/environment';

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
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }

        return Promise.reject(new Error('Пароли должны совпадать!'));
      },
    }),
  ],
};

export const Registration = () => {
  const history = useHistory();
  const [registrationForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const onSubmit = async ({ username, password }) => {
    setIsFetching(true);
    try {
      const { status } = await usersApi.registerUser({ username, password });
      if (status === 201) history.push(env.auth.baseUrl);
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
            <Link to={env.auth.baseUrl}> Авторизуйтесь!</Link>
          </Text>
        </Row>
        <Row>
          {registrationError && <Text type="danger">{registrationError}</Text>}
        </Row>
      </Item>
    </Form>
  );
};
