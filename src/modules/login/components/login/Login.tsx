import { LockOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, Input, Row, Typography } from 'antd';
import { env } from 'core/helpers/environment';
import { useActions } from 'core/hooks/useActions';
import {
  selectError,
  selectIsFetching,
} from 'core/modules/users/selectors/usersSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { Item } = Form;
const { Title, Text } = Typography;

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
  ],
};

const Login = () => {
  const { fetchAuth } = useActions();
  const [authForm] = Form.useForm();
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);

  const onSubmit = async (values: any) => {
    fetchAuth(values);
  };

  return (
    <Form name="auth-form" form={authForm} size="large" onFinish={onSubmit}>
      <Title level={2}>{env.login.title}</Title>
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
          autoComplete="current-password"
        />
      </Item>
      <Item>
        <Row align="middle" justify="space-between">
          <Button type="primary" htmlType="submit" loading={isFetching}>
            Войти
          </Button>
          <Text>
            Или
            <Link to={env.registration.baseUrl}> зарегистрируйтесь</Link>
          </Text>
        </Row>
        <Row>{error && <Text type="danger">{error}</Text>}</Row>
      </Item>
    </Form>
  );
};

export default Login;
