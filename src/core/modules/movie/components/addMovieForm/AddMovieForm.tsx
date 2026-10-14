import { App, Button, Form, Input, Select } from 'antd';
import { getErrorMessage } from 'core/http';
import { useState } from 'react';

import movieApi from '../../api/movieApi';
import { movieTypeOptions, parseGenres } from '../../helpers/movieForm';
import { MovieFormValues, MovieType } from '../../types/movieTypes';

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

const AddMovieForm = () => {
  const { message } = App.useApp();
  const [createFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (values: MovieFormValues) => {
    setIsFetching(true);

    try {
      await movieApi.createMovie({
        imdbID: values.imdbID || null,
        title: values.title ?? '',
        description: values.description || null,
        country: values.country || null,
        genres: parseGenres(values.genres),
        poster: values.poster || null,
        titleEn: values.titleEn || null,
        type: values.type ?? null,
        video: values.video || null,
        year: values.year || null,
      });
      message.success('Фильм успешно создан!');
    } catch (e) {
      console.error(e);
      message.error(
        `Произошла ошибка при создании фильма: ${getErrorMessage(e)}`
      );
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
        <Select<MovieType>
          placeholder="Тип"
          options={movieTypeOptions}
          allowClear
        />
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
