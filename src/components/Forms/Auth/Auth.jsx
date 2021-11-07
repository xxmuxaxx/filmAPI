import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Row, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons/lib/icons';
import { fetchAuth } from '../../../redux/actions/users';
import { env } from '../../../services/environment';
import { selectError, selectIsFetching } from '../../../redux/selectors/users';

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

export const Auth = () => {
  const dispatch = useDispatch();
  const [authForm] = Form.useForm();
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);

  const onSubmit = async (values) => {
    await dispatch(fetchAuth(values));
  };

  return (
    <Form name="auth-form" form={authForm} size="large" onFinish={onSubmit}>
      <Title level={2}>{env.auth.title}</Title>
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
