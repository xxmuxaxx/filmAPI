import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';

import movieApi from '../../api/movieApi';

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

const DeleteMovieForm = ({ initialId = undefined, onSubmit = () => {} }) => {
  const [deleteFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onFinish = async ({ id }: { id: number }) => {
    setIsFetching(true);
    try {
      await movieApi.deleteMovie(id);
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

export default DeleteMovieForm;
