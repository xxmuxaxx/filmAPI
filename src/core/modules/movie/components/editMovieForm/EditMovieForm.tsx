import { Button, Form, Input, message } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useState, VFC } from 'react';

import movieApi from '../../api/movieApi';
import { Movie } from '../../types/movieTypes';

const { Item } = Form;

const initialValues = {
  imdbID: '',
  title: '',
  titleEn: '',
  year: '',
  country: '',
  poster: '',
  video: '',
  genres: '',
  type: '',
  description: '',
};

const rules = {
  id: [
    {
      required: true,
      message: 'Обязательное поле!',
    },
  ],
};

type EditMovieFormProps = {
  initialId?: string;
  onSubmit: (...args: any[]) => void;
};

const EditMovieForm: VFC<EditMovieFormProps> = ({
  initialId,
  onSubmit = () => {},
}) => {
  const [editFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onFinish = async (values: Movie) => {
    setIsFetching(true);
    try {
      const { id, ...data } = { ...values };

      data.genres = data?.genres
        ? (data.genres as any)
            .split(',')
            .map((g: string) => ({ name: g.trim() }))
        : [];
      data.year = Number(data.year);

      await movieApi.updateMovie(id, data);
      onSubmit();
      message.success('Изменения сохранены!');
    } catch (e) {
      console.error(e);
      message.error('Произошка ошибка при изменении фильма');
    }
    setIsFetching(false);
    editFilmForm.resetFields();
  };

  const fetchFilm = useCallback(
    _.debounce(async (id) => {
      if (!id) return editFilmForm.resetFields(Object.keys(initialValues));
      try {
        const response = await movieApi.getMovieById(id);
        editFilmForm.setFields(
          Object.entries(response).map((e) => ({
            name: e[0],
            value: Array.isArray(e[1])
              ? e[1].map((g) => g.name.trim()).join(', ')
              : e[1],
          }))
        );
      } catch (error) {
        message.error(String(error));
        editFilmForm.resetFields(Object.keys(initialValues));
      }
      setIsFetching(false);
    }, 100),
    []
  );

  useEffect(() => {
    editFilmForm.resetFields();
    if (initialId) {
      fetchFilm(initialId);
    }
  }, [initialId]);

  return (
    <Form
      name="edit-film-form"
      form={editFilmForm}
      initialValues={{ ...initialValues, id: initialId }}
      onFinish={onFinish}
    >
      <Item name="id" rules={rules.id}>
        <Input
          placeholder="ID"
          disabled={!!initialId}
          onChange={(event) => {
            setIsFetching(true);
            fetchFilm(event.target.value);
          }}
        />
      </Item>
      <Item name="imdbID">
        <Input placeholder="imdbID" />
      </Item>
      <Item name="title">
        <Input placeholder="Название" />
      </Item>
      <Item name="titleEn">
        <Input placeholder="Название на английском" />
      </Item>
      <Item name="year">
        <Input placeholder="Год" />
      </Item>
      <Item name="country">
        <Input placeholder="Страна" />
      </Item>
      <Item name="poster">
        <Input placeholder="Обложка (url)" />
      </Item>
      <Item name="video">
        <Input placeholder="Трейлер (youtube id)" />
      </Item>
      <Item name="genres">
        <Input placeholder="Жанры (через запятую)" />
      </Item>
      <Item name="type">
        <Input placeholder="Тип (movie, series)" />
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

export default EditMovieForm;
