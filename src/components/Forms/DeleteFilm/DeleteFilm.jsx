import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import filmApi from '../../../api/filmApi';

const { Item } = Form;

const initialValues = {
  id: '',
};

const rules = {
  id: [
    {
      required: true,
      message: 'Обязательное поле!',
    },
  ],
};

export const DeleteFilm = ({ initialId = null, onSubmit = () => {} }) => {
  const [deleteFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onFinish = async ({ id }) => {
    setIsFetching(true);
    try {
      await filmApi.deleteFilm(id);
      message.success('Фильм удален!');
      onSubmit();
    } catch (error) {
      message.error(String(error));
    }
    deleteFilmForm.resetFields();
    setIsFetching(false);
  };

  return (
    <Form
      name="delete-film-form"
      form={deleteFilmForm}
      initialValues={{ ...initialValues, id: initialId }}
      onFinish={onFinish}
    >
      <Item name="id" rules={rules.id}>
        <Input placeholder="ID" disabled={initialId} />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Удалить
        </Button>
      </Item>
    </Form>
  );
};
