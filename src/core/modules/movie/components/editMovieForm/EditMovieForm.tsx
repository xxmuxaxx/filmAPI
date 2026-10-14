import { App, Button, Form, Input, Select } from "antd";
import { getErrorMessage } from "core/http";
import { debounce } from "lodash-es";
import { FC, useEffect, useMemo, useState } from "react";

import movieApi from "../../api/movieApi";
import {
  formatGenres,
  movieTypeOptions,
  parseGenres,
} from "../../helpers/movieForm";
import { MovieFormValues, MovieType } from "../../types/movieTypes";

const { Item } = Form;

const initialValues = {
  imdbID: "",
  title: "",
  titleEn: "",
  year: "",
  country: "",
  poster: "",
  video: "",
  genres: "",
  type: undefined,
  description: "",
};

const rules = {
  id: [
    {
      required: true,
      message: "Обязательное поле!",
    },
  ],
};

type EditMovieFormProps = {
  initialId?: number;
  onSubmit?: () => void;
};

const EditMovieForm: FC<EditMovieFormProps> = ({
  initialId,
  onSubmit = () => {},
}) => {
  const { message } = App.useApp();
  const [editFilmForm] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onFinish = async ({
    id,
    genres,
    ...data
  }: MovieFormValues & { id: number }) => {
    setIsFetching(true);
    try {
      // Бэкенд меняет только переданные не-null поля
      await movieApi.updateMovie(id, { ...data, genres: parseGenres(genres) });
      onSubmit();
      message.success("Изменения сохранены!");
    } catch (e) {
      console.error(e);
      message.error(
        `Произошла ошибка при изменении фильма: ${getErrorMessage(e)}`
      );
    }
    setIsFetching(false);
    editFilmForm.resetFields();
  };

  const fetchFilm = useMemo(
    () => debounce(async (id: number | string) => {
      if (!id) return editFilmForm.resetFields(Object.keys(initialValues));
      try {
        const response = await movieApi.getMovieById(id);
        editFilmForm.setFieldsValue({
          ...response,
          genres: formatGenres(response.genres),
          type: response.type ?? undefined,
        });
      } catch (error) {
        message.error(getErrorMessage(error));
        editFilmForm.resetFields(Object.keys(initialValues));
      }
      setIsFetching(false);
    }, 100),
    [editFilmForm, message]
  );

  useEffect(() => {
    editFilmForm.resetFields();
    if (initialId) {
      fetchFilm(initialId);
    }
  }, [editFilmForm, fetchFilm, initialId]);

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

export default EditMovieForm;
