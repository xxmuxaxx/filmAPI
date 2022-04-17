import { Button, Form, Input, message, Radio } from 'antd';
import { useActions } from 'core/hooks/useActions';
import usersApi from 'core/modules/users/api/usersApi';
import React, { useState, VFC } from 'react';

const { Item } = Form;

const initialValues = {
  id: '',
  name: '',
  lastName: '',
  middleName: '',
  email: '',
  gender: '',
};

type EditProfileFormProps = {
  user: any;
  onSubmit: (...args: any[]) => void;
};

const EditProfileForm: VFC<EditProfileFormProps> = ({
  user,
  onSubmit = () => {},
}) => {
  const { updateCurrentUser } = useActions();
  const [isFetching, setIsFetching] = useState(false);
  const [editProfileForm] = Form.useForm();

  const onFinish = async (fields: any) => {
    setIsFetching(true);
    try {
      await usersApi.updateUser(fields);
      updateCurrentUser(fields);
      onSubmit();
      message.success('Профиль изменен!');
    } catch (error) {
      message.error(String(error));
    }
    editProfileForm.resetFields();
    setIsFetching(false);
  };

  return (
    <Form
      form={editProfileForm}
      initialValues={{ ...initialValues, ...user }}
      onFinish={onFinish}
    >
      <Item name="id" hidden>
        <Input />
      </Item>
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

export default EditProfileForm;
