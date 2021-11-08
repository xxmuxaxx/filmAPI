import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import filmApi from '../../../api/filmApi';
import IMDBAlternative from '../../../api/IMDBAlternative';

const { Item } = Form;

const defaultValue = {
  imdbID: '',
  title: '',
  video: '',
  description: '',
};

const rules = {
  imdbID: [
    {
      required: true,
      message: 'Обязательное поле!',
    },
  ],
  title: [
    {
      required: true,
      message: 'Обязательное поле!',
    },
  ],
};

export const CreateFilm = () => {
  const [createFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async ({ imdbID, title, video, description }) => {
    setIsFetching(true);
    try {
      const data = await IMDBAlternative.getFilm(imdbID);
      await filmApi.createFilm({
        imdbID: imdbID,
        title: title,
        description: description,
        country: data.Country,
        genres: data.Genre.split(', ').map((genre) => ({ name: genre })),
        poster: data.Poster,
        titleEn: data.Title,
        type: data.Type,
        video: video,
        year: Number(data.Year),
      });
      message.success('Фильм успешно создан!');
    } catch (e) {
      console.error(e);
      message.error('Произошка ошибка при создании фильма');
    }
    createFilmForm.resetFields();
    setIsFetching(false);
  };

  return (
    <Form
      name="create-film-form"
      form={createFilmForm}
      size="large"
      defaultValue={defaultValue}
      onFinish={onSubmit}
    >
      <Item name="imdbID" rules={rules.imdbID}>
        <Input placeholder="imdbID" />
      </Item>
      <Item name="title" rules={rules.title}>
        <Input placeholder="Название" />
      </Item>
      <Item name="video">
        <Input placeholder="Трейлер (youtube id)" />
      </Item>
      <Item name="description">
        <Input.TextArea placeholder="Описание" rows={4} />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" loading={isFetching}>
          Сохранить
        </Button>
      </Item>
    </Form>
  );
};
