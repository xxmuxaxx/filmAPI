import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUpdateUser } from '../../../redux/actions/users';
import { Form, Radio, Input, Button } from 'antd';

const { Item } = Form;

const initialValues = {
  id: '',
  name: '',
  lastName: '',
  middleName: '',
  email: '',
  gender: '',
};

export const EditProfile = ({ user, onSubmit = () => {} }) => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [EditProfileForm] = Form.useForm();

  const onFinish = async (fields) => {
    setIsFetching(true);
    try {
      await dispatch(fetchUpdateUser(fields));
      onSubmit();
    } catch (error) {
      message.error(String(error));
    }
    setIsFetching(false);
  };

  return (
    <Form
      form={EditProfileForm}
      initialValues={{ ...initialValues, ...user }}
      onFinish={onFinish}
    >
      <Item name="id" hidden />
      <Item name="name">
        <Input placeholder="Ваше имя" />
      </Item>
      <Item name="lastName">
        <Input placeholder="Ваша фамилия" />
      </Item>
      <Item name="middleName">
        <Input placeholder="Ваше отчество" />
      </Item>
      <Item name="email">
        <Input placeholder="Ваше отчество" />
      </Item>
      <Item name="gender">
        <Radio.Group>
          <Radio value="MAN">Мужчина</Radio>
          <Radio value="WOMAN">Женщина</Radio>
        </Radio.Group>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Сохранить
        </Button>
      </Item>
    </Form>
  );
};
