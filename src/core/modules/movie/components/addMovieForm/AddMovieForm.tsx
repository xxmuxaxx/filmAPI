import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';

import movieApi from '../../api/movieApi';
import { MovieForm } from '../../types/movieTypes';

const { Item } = Form;

const initialValues = {
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

// Todo изсправить в соответсвии с апи
const AddMovieForm = () => {
  const [createFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (values: MovieForm) => {
    setIsFetching(true);

    try {
      const genres = (values.genres as any)
        .split(', ')
        .map((genre: string) => ({ name: genre }));

      await movieApi.createMovie({
        imdbID: values.imdbID,
        title: values.title,
        description: values.description,
        country: values.country,
        genres: genres,
        poster: values.poster,
        titleEn: values.titleEn,
        type: values.type,
        video: values.video,
        year: Number(values.year),
      });
      message.success('Фильм успешно создан!');
    } catch (e) {
      console.error(e);
      message.error('Произошла ошибка при создании фильма');
    }
    createFilmForm.resetFields();
    setIsFetching(false);
  };

  return (
    <Form
      name="create-film-form"
      form={createFilmForm}
      size="large"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Item name="imdbID" rules={rules.imdbID}>
        <Input placeholder="imdbID" />
      </Item>
      <Item name="title" rules={rules.title}>
        <Input placeholder="Название" />
      </Item>
      <Item name="titleEn">
        <Input placeholder="Название на английском" />
      </Item>
      <Item name="video">
        <Input placeholder="Трейлер (youtube id)" />
      </Item>
      <Item name="country">
        <Input placeholder="Страна" />
      </Item>
      <Item name="year">
        <Input placeholder="Год" />
      </Item>
      <Item name="poster">
        <Input placeholder="Url постера" />
      </Item>
      <Item name="genres">
        <Input placeholder="Жанры через запятую" />
      </Item>
      <Item name="type">
        <Input placeholder="Тип (movie или series)" />
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

export default AddMovieForm;
