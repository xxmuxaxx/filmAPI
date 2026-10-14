import { App, Button, Form, Input } from 'antd';
import { getErrorMessage } from 'core/http';
import { useState } from 'react';

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

type DeleteMovieFormProps = {
  initialId?: number;
  onSubmit?: () => void;
};

const DeleteMovieForm = ({
  initialId,
  onSubmit = () => {},
}: DeleteMovieFormProps) => {
  const { message } = App.useApp();
  const [deleteFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onFinish = async ({ id }: { id: number }) => {
    setIsFetching(true);
    try {
      await movieApi.deleteMovie(id);
      message.success('Фильм удален!');
      onSubmit();
    } catch (error) {
      message.error(getErrorMessage(error));
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
        <Input placeholder="ID" disabled={!!initialId} />
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
