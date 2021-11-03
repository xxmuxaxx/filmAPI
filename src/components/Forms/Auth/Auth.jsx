import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons/lib/icons';
import { fetchAuth } from '../../../redux/actions/users';
import { env } from '../../../services/environment';
import './Auth.scss';

const { Item } = Form;

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
  const [authForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    // TODO Обработать различные сценарии
    setIsFetching(true);
    dispatch(fetchAuth(values));
  };

  return (
    <section className="auth">
      <div className="auth__container container">
        <div className="auth__wrapper">
          <Form
            name="auth-form"
            className="auth__form"
            form={authForm}
            size="large"
            onFinish={onSubmit}
          >
            <Item>
              <div className="auth__title">{env.auth.title}</div>
            </Item>
            <Item name="username" rules={rules.username}>
              <Input
                className="auth__form-input"
                prefix={<UserOutlined />}
                placeholder="Ваш логин"
              />
            </Item>
            <Item name="password" rules={rules.password}>
              <Input.Password
                className="auth__form-input"
                prefix={<LockOutlined />}
                placeholder="Ваш пароль"
              />
            </Item>
            <Item>
              <Row align="middle" justify="space-between">
                <Button
                  className="auth__form-button"
                  type="primary"
                  htmlType="submit"
                  loading={isFetching}
                >
                  Войти
                </Button>
                <span>
                  Или <Link to={env.films.baseUrl}>зарегистрируйтесь</Link>
                </span>
              </Row>
            </Item>
          </Form>
        </div>
      </div>
    </section>
  );
};
